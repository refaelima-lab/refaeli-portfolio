(() => {
  const ACCENT = '#3C49FF';
  const ACCENT_MID = '#8D94FF';
  const SIZE = 32;
  const FPS = 12;

  const canvas = document.createElement('canvas');
  canvas.width = SIZE;
  canvas.height = SIZE;
  const ctx = canvas.getContext('2d');

  let link = document.querySelector('link[rel="icon"]');
  if (!link) {
    link = document.createElement('link');
    link.rel = 'icon';
    document.head.appendChild(link);
  }

  const start = performance.now();
  let lastUpdate = 0;
  const frameInterval = 1000 / FPS;

  function render(t) {
    ctx.clearRect(0, 0, SIZE, SIZE);
    const cx = SIZE / 2, cy = SIZE / 2;
    const r = SIZE * 0.3;

    const halo = ctx.createRadialGradient(cx, cy, r * 0.9, cx, cy, r * 1.8);
    halo.addColorStop(0, 'rgba(141,148,255,0.55)');
    halo.addColorStop(1, 'rgba(141,148,255,0)');
    ctx.fillStyle = halo;
    ctx.fillRect(0, 0, SIZE, SIZE);

    const grad = ctx.createRadialGradient(cx - r * 0.2, cy - r * 0.2, r * 0.1, cx, cy, r);
    grad.addColorStop(0, ACCENT_MID);
    grad.addColorStop(1, ACCENT);
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.arc(cx, cy, r, 0, Math.PI * 2);
    ctx.fill();

    const period = 5;
    const phase = (t % period) / period;
    const mx = cx - r * 2 + phase * r * 4;
    ctx.fillStyle = '#0a0b14';
    ctx.beginPath();
    ctx.arc(mx, cy, r * 0.85, 0, Math.PI * 2);
    ctx.fill();
  }

  function tick(now) {
    if (document.hidden) {
      requestAnimationFrame(tick);
      return;
    }
    if (now - lastUpdate >= frameInterval) {
      lastUpdate = now;
      render((now - start) / 1000);
      link.href = canvas.toDataURL('image/png');
    }
    requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
})();
