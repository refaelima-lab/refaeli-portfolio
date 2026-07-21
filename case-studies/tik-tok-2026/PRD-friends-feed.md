# PRD — "For You, From Friends"
### Turning TikTok's inbox into a human-curated, taste-graph feed

**Status:** v2 — architecture locked · **Owner:** Rari · **Last updated:** July 2026

---

## 1. TL;DR
TikTok mastered the **interest graph** (what people like you watch) and ignored the **taste graph** (what your specific friends know *you* would love). The most valuable, least algorithm-replicable signal on the platform — a friend deliberately picking a video and saying *"this is so you"* — is thrown away the instant it happens, dying as a gray bubble in an inbox nobody treats as a feed.

**"For You, From Friends"** transforms the TikTok inbox into what it's actually used for. Today the inbox is a chat UI wrapped around a behavior that isn't chatting — it's mostly videos friends sent you. We split it into **"From Friends"** (a swipeable feed of everything friends hand-picked for you, tagged by sender) and **"Chats"** (real conversations). A single positive gesture — **swipe right = "this is so me"** — sends warm, private recognition back to the curator. It gives the ~half of users who never post a real creative identity: the **curator**.

---

## 2. Problem & background

**The behavioral truth.** Most users are not creators. Only ~52% of US adult TikTok users have *ever* posted a video; 98% of public videos come from the top 25% most active (Pew, 2024). The dominant creative act for everyone else is the **send** — passing a video to a friend or group ("this is so you").

**The gap.** That send is a dead-end. The sender gets no signal their taste landed; the received video is flattened into a message bubble and forgotten. TikTok knows your interests perfectly but is blind to the fact that *you* know exactly what your friend would find hilarious.

**Why it exists (Chesterton's fence).** TikTok's DNA is the algorithmic interest graph — a zero-follower creator can go viral because the machine, not the social graph, does distribution. The human curation layer was never the point, so it was never designed for.

**Why now.** The whole industry just pivoted here. Instagram's Adam Mosseri (Dec 2025): *"That feed is dead… the primary way people share now is in DMs,"* and "sends per reach" is a top ranking signal. TikTok shipped **Shared Feed** (Dec 2025, inside DMs); Instagram shipped **Blend** (Apr 2025). But **all of these keep the algorithm as the curator and the human as a passive consumer.** None honor the deliberate human act of choosing something for a specific person. That whitespace is the opportunity.

---

## 3. Insight
> **Interest graph vs. taste graph.** The For You page optimizes *"what will this person watch."* A friend optimizes *"what will land for this specific person I know."* The second is the one thing the world's best recommendation engine cannot do — and TikTok treats it as trash. The metaphor: **your friends are matchmakers, and every video they send is a setup.**

---

## 4. Goals & non-goals

**Goals**
- Give the non-creator majority a durable creative identity (the *curator*).
- Turn the one-way "send" into a closed loop: **send → receive → recognize → reciprocate.**
- Grow two metrics TikTok's business cares about: **sends** (a ranking signal) and **friend-graph density** (a retention driver).

**Non-goals**
- Not replacing or reordering the For You page.
- Not a new bottom-nav tab (that's the graveyard: TikTok Now took a nav slot and died).
- No public leaderboard, ranking, streak, or negative/dislike signal (see §8).
- Not a new algorithmic co-recommendation feed (Shared Feed / Blend already do that).

---

## 5. The core loop
1. **Send** — a curator picks a video and sends it, optionally with a caption ("this is so you").
2. **Receive** — it lands in the **"From Friends"** feed: full-screen, swipeable, tagged with who sent it.
3. **Recognize** — swipe right = "this is so me" → a warm, private ping to the sender ("Mario's been vibing with your shares").
4. **Reciprocate** — one tap to send something back, closing the loop and strengthening the tie.

---

## 6. Architecture & placement (LOCKED)
**The feed lives inside the existing Inbox tab as a segmented view — it replaces nothing and adds no nav item.**

- **Segmented toggle at the top of the inbox: "From Friends" | "Chats."** "From Friends" is the **default** view (the inbox is really a share pile, so we make it a feed); "Chats" is the traditional message list, one tap away, with all text messages fully readable.
- Activity notifications stay where they are, above the toggle.
- **"From Friends" is a *meshed* aggregate feed** — everything everyone sent you, pooled into one swipeable stack. Each card is tagged: **"Milo sent you this · 'this is so you'"** or **"From group 'the boys'"**, with the caption shown when the sender added one (video speaks for itself when they didn't).
- **Interaction:** swipe **up** = next (preserves TikTok muscle memory); swipe **right** = "this is so me" (the only judgment gesture, positive only); no left/negative gesture ever.
- Per-chat shared archives (open Milo's chat → your shared history together) are **Phase 2**.

**Why the inbox and not the Home tabs:** putting a swipe-to-match gesture in the main feed fights the sacred FYP vertical scroll. TikTok's own Shared Feed already lives inside DMs — the platform is telling us the friend layer belongs in the messaging surface. Narrative: *the Friends tab failed as an algorithmic top-level feed; the friend layer's real home was always the inbox, and we're completing the messaging surface TikTok is already building.*

---

## 7. Onboarding — "What's New" quick tour (in MVP)
Because the default view changes, a lightweight first-run tour orients the user (3 steps, skippable):
1. **"Your inbox is now a feed."** Everything friends sent you, in one place — swipe up to browse.
2. **"Swipe right to give credit."** Loved a friend's pick? Swipe right — they'll get a warm little note. No dislikes, ever.
3. **"Switch anytime."** Tap "Chats" for your text conversations. *(Teaser: earn an optional Curator badge when friends keep vibing with your taste.)*

---

## 8. Guardrails — the "private party" principle
The closest analog — Snapchat Streaks — is now linked to documented teen anxiety, and TikTok itself shipped anti-doomscrolling features in Nov 2025. This feature is deliberately built to avoid scoring social behavior into pressure.
- **Positive-only.** The system *only ever* notifies you of good news ("Mario's vibing with your shares"). There is no negative signal anywhere to farm anxiety from.
- **Invisible by default.** Credit is private between friends — no public counts, no global rank.
- **No streaks, no decay, no loss aversion.** Nothing expires to manufacture compulsion.
- **Recognition, not comparison.** Status rewards *quality* of taste, never a ranking against others.
- **Opt-in and reversible** at every step.

---

## 9. Roadmap — MVP / Phase 2 / Phase 3

**MVP (what we prototype)**
- Inbox with "From Friends" (default) | "Chats" toggle.
- Meshed "From Friends" swipe feed with per-card sender tags + optional captions.
- Swipe-right "this is so me" → private positive ping back to sender.
- Send composer with optional caption.
- "What's New" quick tour (incl. teaser of the Curator badge).

**Phase 2**
- **Opt-in Curator badge:** earned when *multiple distinct friends* recognize your picks (un-spammable — credit comes only from a real person's genuine swipe-right). Display is optional. Comparison-free — an identity marker, not a rank.
- **Group "meme-god":** a *celebratory, rotating* monthly nod inside a group chat (dethronable, playful, opt-in) — the safest home for the competitive energy.
- Per-chat shared archives; curator identity on profile; richer reactions.

**Phase 3**
- **Taste-graph flywheel:** human "this is so me" labels are a high-quality signal that improves recommendations (framed as *better experience*; ad relevance is a downstream benefit, gated by privacy guardrails).
- **Creator ecosystem:** "send this to someone it reminds you of" CTAs; resonant content travels through *trusted* human curation, giving smaller creators a discovery path that isn't purely algorithmic.

---

## 10. Events to track
| Event | Why it matters |
|---|---|
| `tour_step_viewed` / `tour_completed` | Onboarding comprehension of the new default view. |
| `inbox_default_view` (from_friends) | Are users staying in the feed or switching to Chats? |
| `toggle_switch` (from_friends ↔ chats) | Balance of feed vs. conversation use. |
| `video_share_sent`, `caption_added` | Core input; does the caption prompt lift personalization? |
| `share_watched` | Receive→watch rate (is the feed compelling?). |
| **`swipe_right_this_is_so_me`** | **The key signal** — taste landing; powers recognition + the taste graph. |
| `recognition_notif_sent` / `_opened` | Is positive feedback closing the loop? |
| `reciprocal_send` | A send that earns a send back (relationship deepening). |
| `badge_earned`, `badge_display_opt_in` | Phase 2 — curator identity uptake. |
| Guardrail: (no negative-signal events exist by design) | Proof we didn't build a pressure mechanic. |

**Derived metrics:** sends per active user/week (north star), non-poster activation rate, receive→watch rate, reciprocity rate, friend-graph density → D30/D90 retention (cf. Facebook "7 friends").

---

## 11. Impact & value (who wins, and the balance)

**For the user.** The ~half who never post gain a creative identity as *curators*. Received shares stop dying in the inbox. Recognition is warm and pressure-free. And there's a reason to open the app that is connection, not solo doomscrolling.

**For the creator.** Human curation becomes a new, high-trust distribution channel. "Send this to someone" CTAs get a real destination. Content that genuinely resonates travels through friend networks — giving smaller creators a discovery path the pure algorithm doesn't offer.

**For the business.** Grows **sends** (a documented ranking signal) and **friend-graph density** (a leading retention indicator). The human "this is so me" label is a higher-quality taste signal than watch-time, improving recommendations and, downstream, ad relevance. It deepens the friend-layer moat that Blend and Shared Feed only half-built — and it does so with *healthier* engagement, aligned with regulatory and wellbeing pressure.

**Balancing business needs vs. user wellbeing.** The engagement gains are designed to come from *connection*, not manufactured anxiety. We deliberately chose recognition over competition, positive-only over dislikes, invisible-by-default over public scores, and capped data use at "better experience" with privacy guardrails. That is the proof this isn't just a DAU grab.

---

## 12. Open questions
- Naming of the badge (Curator? Taste-maker?) and whether the group meme-god nod is monthly or event-based.
- Cold-start: seed the feed from existing DM-shared videos for users whose friends aren't sending yet?
- Group sends: land in each person's meshed feed, a shared group lane, or both?
