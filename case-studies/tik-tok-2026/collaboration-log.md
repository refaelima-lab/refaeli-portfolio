# TikTok Design Challenge — How We Worked With AI (Collaboration Log)

A running record of the human + AI process behind this submission. Rari drove the product thinking; Claude acted as a skeptical design/strategy partner, researcher, and builder.

## 1. Framing the challenge
- Rari shared the TikTok design-challenge brief ("Common App Optimization" — pick TikTok / CapCut / IG, find a design problem, redesign one key point, submit as an AI-coded prototype within a week).
- Claude's read: the prompt is really a **scoping test**. Reward depth on one defensible problem over a grand feed redesign. Flagged that "AI coding submission" means a working high-fidelity prototype + analysis, and that "explain the reasons" rewards understanding *why* the current design exists (Chesterton's fence).

## 2. Rari's core insight
- Most users are **not creators** — they consume and *share* (memes/posts to friends and group chats). Rari + friends semi-compete: "let me see if you sent anything good."
- Proposed a light, group-scoped **"vote"/reaction game** rewarding great *discoverers* — monthly "meme-god" recognition. Gives the silent majority status through taste.
- Rari deliberately avoided a full feed redesign, reasoning the team has likely already tried and settled on current designs with data we don't have.

## 3. Claude's sharpening
- Reframed "vote system" → **status layer for curators** (reactions already exist; the novelty is persistent, low-stakes status for taste).
- Reframed "more engagement" → **which relationship is underserved**: the feed over-optimizes you→stranger; you→friends (friend-graph density) is the retention gold.
- Recommended picking **one** platform (lean TikTok) to avoid diluting the prototype.

## 4. Pressure test (skeptical staff-designer lens)
Five challenges raised, to be answered before committing:
1. **Distribution** — real group chats live in iMessage/WhatsApp/Snapchat, not TikTok DMs. Biggest hole.
2. **Differentiation** — Snapchat already is private friend-sharing + status; TikTok Now/Friends tab were lukewarm. Why does ours live?
3. **Goodhart** — scoring casual sharing may kill the authenticity it depends on.
4. **Business fit** — private engagement barely monetizes vs. feed ads; must tie to retention.
5. **n=1** — is the "competition" instinct general, or specific to Rari's friend group? Deeper need may be *recognition for taste*, not competition.

## 5. Decision: research before committing
- Rari asked to deep-research three questions before answering the pressure test, staying open to pivoting if a stronger problem emerges:
  1. Similar features TikTok has built/killed before.
  2. Usage data + evidence dark social is real and TikTok cares.
  3. Other major TikTok pain points / complaints.

## 6. Deep research pass (5 parallel research agents)
Claude ran five concurrent research agents (feature graveyard, dark-social/sharing data, usage/retention data, pain points, IG/Snapchat models) and graded every claim verified vs. uncertain. Key findings:

**Dark-social thesis — VALIDATED and strikingly timely:**
- Instagram's Adam Mosseri, Dec 31 2025 memo: "That feed is dead. People stopped sharing personal moments to feed years ago… The primary way people share now is in DMs." "Sends per reach" is one of IG's biggest ranking signals.
- TikTok shipped **Shared Feed + Shared Collections + DM greeting cards (Dec 2025)**, explicitly because "most people share Reels/TikToks with friends via DM." Group chats (32-person) added Aug 2024.
- "Share" is a documented For You ranking signal (TikTok Newsroom, 2020). Dark social = 84% of outbound sharing (RadiumOne 2016); 100% of TikTok referral traffic is invisible/"direct" (SparkToro 2023).
- Participation inequality: only ~52% of US adult TikTok users have EVER posted; 98% of public videos come from the top 25% most active (Pew 2024). The non-creator majority is real and quantified.

**Two walls the "competition/meme-god" mechanism hits:**
1. **The graveyard.** TikTok's new-social-surface bets all died fast: TikTok Now (BeReal clone) killed <1yr (2023), Friends tab reconsidered within a year (2023), TikTok Notes killed <1yr (2025), Stories faded. The survivor is **Repost** — a lightweight action layered on the algorithm, not a new graph/feed. Lesson: *new social surfaces die; enhancements to the existing share act live.*
2. **Wellbeing / Goodhart.** Snap Streaks are linked to documented teen anxiety (Bureau of Investigative Journalism, Dec 2025; peer-reviewed CHB study). TikTok itself shipped anti-doomscroll wellbeing features (Nov 2025). A competitive leaderboard pushes *against* TikTok's current design direction and invites the Goodhart critique (scoring a social act makes it performative/anxious).

**Pivot candidate that emerged — "great discovery, terrible retrieval":**
- Highly-designable, well-documented pain cluster: Favorites/Collections has no search, sorts only by date, one-at-a-time organizing, in-video metadata trapped; Watch History was removed in 2024 to user backlash; search widely called "broken"; CHI 2025 documents "algorithmic persistence" (users can't remove unwanted FYP content).

**Strategic read:** keep Rari's validated dark-social frame, but move the mechanism away from competitive scoring (graveyard + wellbeing risk) toward either (a) enhancing the existing share/receive act, or (b) the retrieval gap. Decision pending with Rari.

## 7. Competitive check — Instagram Blend
Rari flagged Instagram Blend (algorithmic shared Reels feed for friends, launched Apr 2025). Claude verified the facts and reframed it as *supporting* evidence: Blend + TikTok Shared Feed both keep the algorithm as curator and the human as passive consumer. Neither honors deliberate human curation. That's the whitespace — sharpened the positioning to "algorithmic co-consumption vs. active human curation with identity."

## 8. Direction locked (pending Rari's final nod) + PRD
Chose Direction A (taste-graph), mechanism = human curation, NOT competitive scoring. Key architecture decision: **revive TikTok's abandoned "Friends" feed** at the top-of-Home toggle (sibling to For You) — redeem a dead surface with human intent rather than replace FYP (naive) or bury it in DMs (backwater). Claude drafted PRD-friends-feed.md: problem/insight, send→receive→recognize→reciprocate loop, three pillars (Send composer / Receive Friends-feed [hero] / Recognition identity), user stories, wellbeing guardrails, placement decision, success metrics.

## 9. Architecture fully locked (PRD v2)
Iterated the placement with Rari through several rounds:
- **Swipe interaction (Rari's idea):** received videos become a Tinder-style swipe stack, but positive-only — swipe right = "this is so me" (credit to sender), swipe up = next, no negative gesture. Reframed via the "friends as matchmakers" metaphor. Research check: swipe-to-curate exists for movies/music/books (Swipe with Friends, Swipefy, Lit Hit) but not for friend-sent short video; Tinder Matchmaker (2023) validates the metaphor.
- **Principles (Rari):** increase engagement without pressure; credit invisible; positive-only notifications ("Mario's been vibing with your shares"); private party, not competition/spam. Opt-in Curator/meme-god badge kept as recognition (not ranking) — comparison-free, group-scoped and rotating as the safe home.
- **Placement (revised together):** moved OFF the Home top-toggle (gesture conflict with sacred FYP) INTO the Inbox — validated by TikTok's own Shared Feed living in DMs. A segmented toggle "From Friends" | "Chats," defaulting to the feed (Rari's call — bold/on-thesis). Insight: the inbox is a chat UI wrapped around a sharing behavior; we redesign it for what it's actually used for.
- **Feed structure:** one meshed aggregate feed, cards tagged by sender + optional caption; per-chat archives = Phase 2.
- **Added:** "What's New" quick tour (orients users to the new default view + teases the badge).

PRD updated to v2 with locked architecture, MVP/Phase 2/Phase 3 roadmap, events-to-track table, and an Impact & Value section (user / creator / business + the business-vs-wellbeing balance). Ready to build the case-study page + prototype.

## 10. Prototype v1 + gesture refinement
Claude built a polished standalone HTML prototype (TikTok aesthetic): "What's New" tour, From Friends/Chats toggle, swipe feed with sender-tagged cards, swipe-right "this is so me" (stamp + heart burst + sender ping), and simulated incoming recognition banners. Rari reviewed and caught two issues:
- **"Not now" button was redundant** (same as Next) and implied a soft negative — violating the positive-only principle. Removed. Now only two actions: move on (neutral/invisible) or "this is so me" (positive).
- **Gesture model:** locked to TikTok convention — swipe **up** = next (down = previous), swipe **right** = "this is so me" (reads as "like"). Vertical = navigate, right = the one new positive gesture.

## 11. Real video + more posts
Added `<video>` autoplay support (muted/loop/playsinline), expanded to 12 posts, and added first-run coach marks (blinking up = next, right = so me) that fade after first use, plus a confetti/ring/sparkle burst on every "this is so me" (fixed a z-index bug that was hiding it behind the deck). Rari supplied 12 vertical HD clips (Artlist, royalty-free) — bundled into `videos/` with web-safe names (01-noodles … 12-matterhorn) and remapped each card's sender/caption to match the real footage. Deploy structure is now `prototype.html` + `videos/`.

## 12. Case-study page built
Built `index.html` — the full narrative case study in TikTok aesthetic: hero → brief → insight (with stat cards) → validation (Mosseri quote, sends/retention) → why-it-doesn't-exist (graveyard timeline + 5 pressure-test objections + trade-off) → differentiation table (Blend/Shared Feed vs. ours) → the idea (loop + placement/gesture/guardrail) → embedded prototype (iframe) → impact (user/creator/business + wellbeing balance) → roadmap (MVP/P2/P3 + events to track) → how-it-was-made (human vs. AI split) → sourced footer. Deploy folder: index.html + prototype.html + videos/.

*(Log continues as we go.)*
