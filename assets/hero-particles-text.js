/* Hero particle text — vanilla port of 21st.dev's ParticleTextEffect.
   Draws each word into an offscreen canvas, samples opaque pixels at a
   stride to get target positions, then has a swarm of particles drift
   toward those positions. Particles enter from outside the viewport
   each time the word changes. Layered above the WebGL hero background
   on a transparent canvas — uses destination-out fade for trails so
   the bg shows through cleanly. */
(function heroParticlesText() {
  const canvas = document.getElementById('hero-text-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  const WORDS = ['NOISE', 'SIGNAL', 'PATTERN', 'SYSTEM', 'EXPERIENCE'];
  const PIXEL_STEPS  = 6;     /* sampling stride — every Nth pixel becomes a target (lower = denser text) */
  const HOLD_FRAMES = 180;          /* ~3s static hold after the word has formed */
  const MAX_FORMATION_FRAMES = 360; /* ~6s safety cap — force-advance even if settle detection misses */
  const SETTLE_RADIUS_SQ = 25;      /* particles within sqrt(25) = 5px of target count as settled */
  const SETTLED_THRESHOLD = 0.85;   /* fraction of non-churning pool that must be settled */
  const TRAIL_FADE   = 0.10;  /* alpha erased per frame (higher = shorter trails) */
  const CHURN_RATIO  = 0.01;  /* fraction of pool that takes the scenic route (fly off → fly back in) at each word change */
  const FONT_STACK   = "Arial, sans-serif";

  let W = 0, H = 0, DPR = 1;
  const particles = [];
  let frameCount = 0;
  let wordIndex  = 0;
  let cycleStartFrame = 0;          /* frame when the current word's cycle began */
  let formedFrame = -1;              /* frame when the current word counted as settled; -1 = still forming */
  let isFirstFormation = true;  /* true until NOISE has cycled out — drives the one-time slowdown */
  let offscreen = null;
  let maxParticleCount = 0;  /* fixed at the densest word, set in resize() */

  class Particle {
    constructor() {
      this.pos = { x: 0, y: 0 };
      this.vel = { x: 0, y: 0 };
      this.acc = { x: 0, y: 0 };
      this.target = { x: 0, y: 0 };
      /* If set, the particle treats `target` as a waypoint — once it
         arrives there it teleports to a fresh edge and heads to this
         pending position. Used by the 10% "scenic route" churn each
         word change so some particles visibly fly off-canvas and
         re-enter from a different edge. */
      this.pendingTarget = null;
      this.maxSpeed = 1;
      this.maxForce = 0.1;
      this.closeEnoughTarget = 100;
    }

    move() {
      const distance = Math.hypot(this.pos.x - this.target.x, this.pos.y - this.target.y);

      if (distance < 0.5) {
        if (this.pendingTarget) {
          /* Reached the off-canvas waypoint — teleport to a random
             fresh edge and head to the real (in-text) destination.
             The teleport itself is invisible since both positions
             are off-screen. */
          const fresh = randomEdgePos(W / 2, H / 2, (W + H) / 2);
          this.pos.x = fresh.x;
          this.pos.y = fresh.y;
          this.vel.x = 0;
          this.vel.y = 0;
          this.acc.x = 0;
          this.acc.y = 0;
          this.target.x = this.pendingTarget.x;
          this.target.y = this.pendingTarget.y;
          this.pendingTarget = null;
          return;
        }
        /* Final destination: snap and settle. */
        this.pos.x = this.target.x;
        this.pos.y = this.target.y;
        this.vel.x = 0;
        this.vel.y = 0;
        this.acc.x = 0;
        this.acc.y = 0;
        return;
      }

      let proximityMult = 1;
      if (distance < this.closeEnoughTarget) {
        proximityMult = distance / this.closeEnoughTarget;
      }

      const towards = { x: this.target.x - this.pos.x, y: this.target.y - this.pos.y };
      const tmag = Math.hypot(towards.x, towards.y);
      if (tmag > 0) {
        towards.x = (towards.x / tmag) * this.maxSpeed * proximityMult;
        towards.y = (towards.y / tmag) * this.maxSpeed * proximityMult;
      }

      const steer = { x: towards.x - this.vel.x, y: towards.y - this.vel.y };
      const smag = Math.hypot(steer.x, steer.y);
      if (smag > 0) {
        steer.x = (steer.x / smag) * this.maxForce;
        steer.y = (steer.y / smag) * this.maxForce;
      }

      this.acc.x += steer.x;
      this.acc.y += steer.y;
      this.vel.x += this.acc.x;
      this.vel.y += this.acc.y;
      this.pos.x += this.vel.x;
      this.pos.y += this.vel.y;
      this.acc.x = 0;
      this.acc.y = 0;
    }

    draw() {
      ctx.fillRect(this.pos.x, this.pos.y, 2, 2);
    }
  }

  /* Random position on a ring outside the canvas — used both for
     spawning particles and as the "fly off" target for killed ones. */
  function randomEdgePos(cx, cy, mag) {
    const rx = Math.random() * W;
    const ry = Math.random() * H;
    const dx = rx - cx;
    const dy = ry - cy;
    const m = Math.hypot(dx, dy);
    if (m > 0) {
      return { x: cx + (dx / m) * mag, y: cy + (dy / m) * mag };
    }
    return { x: cx, y: cy };
  }

  /* Pick a font size that lets the longest word fit comfortably
     across viewports. Capped so it doesn't get huge on wide screens. */
  function fontSizeForViewport() {
    return Math.min(W * 0.065, H * 0.14, 110);
  }

  /* Render `word` into the offscreen canvas and return the list of
     opaque pixel positions we'd want particles to occupy (sampled at
     PIXEL_STEPS stride). Used both by the initial pre-measure and by
     each word transition. */
  function collectTargets(word) {
    if (!offscreen || offscreen.width !== W || offscreen.height !== H) {
      offscreen = document.createElement('canvas');
      offscreen.width = Math.max(1, W);
      offscreen.height = Math.max(1, H);
    }
    const off = offscreen.getContext('2d');
    off.clearRect(0, 0, W, H);
    off.fillStyle = '#fff';
    off.font = `700 ${fontSizeForViewport()}px ${FONT_STACK}`;
    off.textAlign = 'center';
    off.textBaseline = 'middle';
    off.fillText(word, W / 2, H / 2);

    const data = off.getImageData(0, 0, W, H).data;
    const targets = [];
    for (let i = 0; i < data.length; i += PIXEL_STEPS * 4) {
      if (data[i + 3] > 0) {
        targets.push({ x: (i / 4) % W, y: Math.floor(i / 4 / W) });
      }
    }
    /* Shuffle so the assignment to particles is random rather than
       reading-order — gives the formation a more organic feel. */
    for (let i = targets.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const tmp = targets[i]; targets[i] = targets[j]; targets[j] = tmp;
    }
    return targets;
  }

  /* Walk every word once at the current viewport size and find the
     densest particle count. This becomes the fixed pool size — no
     particle is ever spawned or destroyed after init, so there's
     nothing flying off between words. */
  function measureMaxParticles() {
    let max = 0;
    for (const w of WORDS) {
      const t = collectTargets(w).length;
      if (t > max) max = t;
    }
    return max;
  }

  /* Allocate the fixed particle pool. Each particle starts at a
     random off-canvas point so the first word swarms in from the
     edges (the only flight you see in the lifetime of the scene). */
  function initParticles(count) {
    particles.length = 0;
    for (let i = 0; i < count; i++) {
      const p = new Particle();
      const start = randomEdgePos(W / 2, H / 2, (W + H) / 2);
      p.pos.x = start.x;
      p.pos.y = start.y;
      /* Faster speeds for the initial swarm-in only, so NOISE forms
         in ~2s and gets visible static-hold time before SIGNAL fires.
         Switched back to a calmer 2–5 range after the first word — see
         the slowdown step in tick(). */
      p.maxSpeed = Math.random() * 4 + 6;
      p.maxForce = p.maxSpeed * 0.05;
      particles.push(p);
    }
  }

  /* Reassign every particle in the pool to a position in the new
     word. If the word has fewer targets than the pool size, extras
     wrap onto random in-text positions — they end up piled on top of
     other particles, invisible and motionless. A small fraction
     (CHURN_RATIO) is sent on a "scenic route" instead: fly off-canvas
     first via a waypoint, then teleport to a fresh edge and fly in to
     the assigned text position. That gives the user-visible flying
     particles between words without the original's uncontrolled
     count. */
  function nextWord(word) {
    const targets = collectTargets(word);
    if (targets.length === 0) return;

    const churnCount = Math.floor(particles.length * CHURN_RATIO);
    const churnSet = new Set();
    while (churnSet.size < churnCount && churnSet.size < particles.length) {
      churnSet.add(Math.floor(Math.random() * particles.length));
    }

    for (let i = 0; i < particles.length; i++) {
      const t = (i < targets.length)
        ? targets[i]
        : targets[Math.floor(Math.random() * targets.length)];

      if (churnSet.has(i)) {
        const off = randomEdgePos(W / 2, H / 2, (W + H) / 2);
        particles[i].target.x = off.x;
        particles[i].target.y = off.y;
        particles[i].pendingTarget = { x: t.x, y: t.y };
      } else {
        particles[i].target.x = t.x;
        particles[i].target.y = t.y;
        particles[i].pendingTarget = null;
      }
    }
  }

  function resize() {
    const rect = canvas.getBoundingClientRect();
    W = rect.width;
    H = rect.height;
    if (W < 2 || H < 2) return;
    DPR = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.ceil(W * DPR);
    canvas.height = Math.ceil(H * DPR);
    ctx.setTransform(DPR, 0, 0, DPR, 0, 0);

    /* Particle pool is sized to the densest word at the current
       viewport size. On viewport resize we redo the measurement and
       re-allocate (resetting positions to the edges for a fresh
       swarm-in to the current word). */
    maxParticleCount = measureMaxParticles();
    initParticles(maxParticleCount);
    nextWord(WORDS[wordIndex]);
  }

  function tick() {
    if (document.hidden) {
      requestAnimationFrame(tick);
      return;
    }

    /* Motion-blur trails on a transparent canvas: erase `TRAIL_FADE`
       of every existing pixel's alpha each frame. */
    ctx.globalCompositeOperation = 'destination-out';
    ctx.fillStyle = `rgba(0,0,0,${TRAIL_FADE})`;
    ctx.fillRect(0, 0, W, H);
    ctx.globalCompositeOperation = 'source-over';

    ctx.fillStyle = '#fff';
    for (let i = 0; i < particles.length; i++) {
      particles[i].move();
      particles[i].draw();
    }

    frameCount++;

    /* Settle detection: once 85% of the non-churning pool is within
       5px of its target — OR we hit the safety cap — call this word
       formed. The distance check is robust against the velocity
       oscillation that froze the previous version; the safety cap
       guarantees forward progress regardless. */
    if (formedFrame === -1) {
      let settled = 0;
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        if (p.pendingTarget) continue;
        const dx = p.pos.x - p.target.x;
        const dy = p.pos.y - p.target.y;
        if (dx * dx + dy * dy < SETTLE_RADIUS_SQ) settled++;
      }
      const formationElapsed = frameCount - cycleStartFrame;
      if (settled / particles.length >= SETTLED_THRESHOLD ||
          formationElapsed >= MAX_FORMATION_FRAMES) {
        formedFrame = frameCount;
      }
    }

    /* Hold for HOLD_FRAMES after settling, then advance. */
    if (formedFrame !== -1 && (frameCount - formedFrame) >= HOLD_FRAMES) {
      wordIndex = (wordIndex + 1) % WORDS.length;
      /* Once the initial swarm-in to NOISE has had its moment, drop
         all particles to a calmer 2–5 speed range so the remaining
         word-to-word transitions feel measured. */
      if (isFirstFormation) {
        for (let i = 0; i < particles.length; i++) {
          particles[i].maxSpeed = Math.random() * 3 + 2;
          particles[i].maxForce = particles[i].maxSpeed * 0.04;
        }
        isFirstFormation = false;
      }
      nextWord(WORDS[wordIndex]);
      cycleStartFrame = frameCount;
      formedFrame = -1;
    }

    requestAnimationFrame(tick);
  }

  window.addEventListener('resize', resize);

  function start() {
    resize();
    requestAnimationFrame(tick);
  }

  /* Don't start swarming particles in until the hero's other elements
     (nav, corner text) have finished revealing. .hero-role gets the
     `.is-revealed` class from the welcome-overlay reveal flow; its CSS
     transition runs for 1.0s after a 2.2s delay, so we wait 3.2s after
     the class lands plus a 300ms cushion for the user to register the
     hero before particles arrive. */
  function waitForRevealAndStart() {
    const role = document.querySelector('.hero-role');
    if (!role) {
      setTimeout(waitForRevealAndStart, 200);
      return;
    }
    const POST_REVEAL_BUFFER = 3500;
    if (role.classList.contains('is-revealed')) {
      setTimeout(start, POST_REVEAL_BUFFER);
      return;
    }
    const obs = new MutationObserver(() => {
      if (role.classList.contains('is-revealed')) {
        obs.disconnect();
        setTimeout(start, POST_REVEAL_BUFFER);
      }
    });
    obs.observe(role, { attributes: true, attributeFilter: ['class'] });
  }

  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(waitForRevealAndStart);
  } else {
    waitForRevealAndStart();
  }
})();
