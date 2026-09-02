---
title: "Seminar 2: Defend Your Analysis"
linkTitle: "Seminar 2"
summary: ""
weight: 20
type: book
---

**Friday 10:00–12:00 CEST · live on Zoom · mandatory.**

The Friday seminar is where you **defend the microscopy work you did in Wednesday's computer
lab**. It is not a lecture and it is not a paper-reading club — you present *your own* image
analysis from a **short slide deck you built from your results**, and the room questions it. The
format is the same as every seminar in the course (weeks 1–6); this page tunes it to Week 2's
image work.

{{< toc >}}

## What the seminar is

This year the course trains you to be a **forward-deployed scientist** — to take someone else's
problem, direct an AI agent to solve it, and **own every number that comes back**. Owning a
result means being able to stand behind it out loud, so the seminar is your own work, defended.
This week the "result" is visual, so you don't just talk about it — you **show it on screen**.

Think of it as the weekly checkpoint for the skill the labs build: not "did the code run" but
**did you interview well, direct clearly, and verify honestly** — and, this week, **can you see
that your model actually worked on the images.**

## How it runs

- **Presenters are drawn at random.** Each week we pick **7–10 students** live. Everyone must
  arrive ready — there is no volunteering-only and no opting out.
- **7 minutes to present + 3 minutes of discussion**, per person. Keep to time; we will.
- **We show your submitted `slides.html` deck on screen** when you're drawn, and you talk to it —
  the overlay, the metric-vs-baseline, the caveat, all embedded in the deck. (You don't screen-
  share your own machine; the portal drives your deck, so it must stand alone. You may live-demo
  the running app in the 3-minute discussion if you like.)
- The rest of the room (and the teaching team) asks questions. Being able to answer them *is*
  the exam.

> **Being drawn with nothing prepared is a fail for that seminar.** The random draw is the whole
> point: it means **everyone** spends Thursday thinking critically about their own work, not just
> the volunteers.

## What to present — four things

You have 7 minutes. Don't narrate the whole afternoon; make these four points land, **using the
visuals in your deck**.

1. **The problem — the question behind the question.** What did the image data owner *actually*
   want? What decision changes when they know the answer? Show that you found the real question
   (segment what, count what, classify which classes) — not the vague one they opened with.
2. **What you built.** How you translated the interview into a brief (`AGENTS.md` / `spec.md`)
   and directed the analyst agent — which pretrained model (Cellpose, a CNN feature extractor,
   thresholding…) and why. The shape of the pipeline, not every command.
3. **A critical read of your own method — show it on a slide.** Put up an **overlay**: does the
   segmentation actually sit on the cells? Show your **metric against its baseline**. Which
   controls did you run (held-out split, class-balance check, a trivial baseline)? Mention the
   **vision check** — where you had Pi *look* at its own overlays — and whether you agreed with
   it. And, crucially, **what did you refuse to claim?**
4. **The imaging caveat.** Name the one image-specific trap you identified — pixel size /
   magnification, staining or illumination variation, class imbalance — and how it could bias
   the result. This replaces last week's "what the literature says" as the point the room will
   push on hardest.

The single best thing you can say in a DDLS seminar is *"here is the overlay, here is the metric
that beats the baseline, and here is the imaging artefact that means I would not yet claim X."*
That is what we are listening for.

## How you're assessed

Seminars are graded **pass/fail** on preparation and critical engagement — not on getting a
"good" result. A modest finding, honestly interrogated and clearly shown, passes easily. A
polished number with no overlay, no baseline and no caveat does not.

We are specifically listening for:

- Did you find the **question behind the question**?
- Where did you **refuse** what the agent handed you?
- What did you **check** — the overlay, the baseline, the caveat — and what did you take on faith?

For Master's students, the **course grade (A–F) comes from the final oral defence**, not the
weekly seminars — but the seminars are where you rehearse exactly that skill. Treat every Friday
as a low-stakes run at the exam.

## Attendance

Labs and seminars are the mandatory, live core of the course. **You may miss one mandatory
session in total** — a lab *or* a seminar, not one of each. If you must miss the seminar, email
[ddls-course@scilifelab.se](mailto:ddls-course@scilifelab.se) **before** the session, not after.

> **Attending and submitting are separate — the hand-in is always required.** Even if you can't
> join the live seminar, you must still hand in **both** your lab work (the app, transcripts,
> summary — via the **Computer-lab** card) **and** your **`slides.html`** deck (via the
> **Seminar** card) in the [course portal](https://ddls-portal-6228434e.svc.hypha.aicell.io/)
> **before the deadline: Friday 10:00 CEST, before the seminar starts.** Missing the session
> (with notice) is excused; a missing submission is not.

## How to prepare (Thursday, ~30–45 minutes — NOT in the lab window)

**Do this on Thursday, after the lab — not squeezed into Wednesday's four hours.** This is the
deliberate fix for last week's "too intense" feedback: the 13:00–17:00 lab is for the interview,
the analysis and building the app; **seminar prep is a separate, later job.** You already did
the work in the lab, so preparing to defend it is quick.

**What you present from: a single self-contained `slides.html` deck.** When you're drawn, the
portal loads *your* deck on the shared screen — so it has to stand on its own. Two rules, and
nothing more:

1. **One self-contained `.html` file.** Everything inlined — CSS and JS in the file, images as
   `data:` URIs or absolute `https://` links. No separate image files, no PDF, no PPTX (the
   portal serves the file alone, so relative links to your laptop won't resolve).
2. **Slides advance with the ← / → arrow keys.** The portal drives your deck with the arrow keys,
   so any deck that responds to them works. Easiest path: **Reveal.js from a CDN** (arrow-key
   navigation out of the box) — or a simple keyboard-driven deck if you prefer.

> **Make it yours — don't ship the default.** Last year every deck looked identical because
> everyone pasted the same prompt. This year, **decide your own visual style first**, then tell
> the agent. Pick a direction and a couple of specifics — for example:
> a **mood** (clean lab-notebook · bold data-viz on dark · editorial/print · minimal monochrome ·
> conference-poster), **2–3 colours** you like, a **font pairing** (e.g. a serif headline with a
> mono caption), and **one layout habit** (big image left / text right, full-bleed overlays, a
> running footer with your metric). A deck that looks like *yours* is part of owning the work.

Your agent can build this from your `summary.md` and your overlay images — **but hand it your
style**, not the default. Fill in the `STYLE:` line, then paste into **Pi** (adjust file names):

```text
Build a single self-contained slides.html presentation for a 7-minute seminar, using Reveal.js
loaded from a CDN. Content comes from summary.md and my results/ overlays. Make ~6 slides:
(1) title + the question behind the question; (2) what I built — interview → AGENTS.md/spec.md →
which model and why; (3) an overlay showing the segmentation on the cells; (4) my metric vs the
baseline; (5) the vision check and what I refused to claim; (6) the one imaging caveat.
STYLE: <describe your look — mood, 2–3 colours, font pairing, layout habit. Make it distinctive,
not a stock template.>
Embed every image directly in the HTML as a base64 data URI — the file must work with NO other
files next to it. Slides must advance with the left/right arrow keys. Output only slides.html.
```

Then **open `slides.html` in your browser, arrow through it, and fix it** — the numbers and the
caveat are yours, not the agent's. Rehearse the 7 minutes once out loud; if you run long, cut the
"what I built" detail first — the problem, the overlay and the caveat matter most. Have one
concrete answer ready for the discussion (e.g. "how do you know the segmentation is right?" →
point to the overlay, the baseline, and your vision check).

> **Want to go further on design? (optional)** If you'd like a sharper, more distinctive deck,
> there are "design skills" you can add to a coding agent that has filesystem access (Claude Code,
> Cursor, Codex, Gemini CLI — not the plain Pi/Reveal.js path above). Two that work well:
>
> - **[frontend-slides](https://github.com/zarazhangrui/frontend-slides)** — *generates* a whole
>   distinctive deck from your `summary.md`, with a menu of styles (it's built to avoid the
>   generic "AI-slop" look, which is exactly the diversity we want). In Claude Code:
>   `/plugin marketplace add https://github.com/zarazhangrui/frontend-slides` then
>   `/plugin install frontend-slides@frontend-slides`; or point any coding agent at the repo's
>   `SKILL.md` and ask it to build your `slides.html`. It emits one self-contained file that
>   advances with the arrow keys — so it works with the seminar screen out of the box. *(We
>   tested this.)*
> - **[Impeccable](https://impeccable.style/tutorials/getting-started/)** — *polishes* a deck you
>   already have: `npx impeccable install`, then `/impeccable polish slides.html` makes small,
>   targeted fixes to spacing, type and colour.
>
> Both are purely optional and not needed to pass — a plain, honest deck in your own style is
> completely fine. Whatever you use, keep the two rules above (one self-contained `.html`,
> arrow-key nav) and **check every number yourself**.

You hand in the deck via the portal's **Seminar** card: upload your **`slides.html`**. Your app
and transcripts are already handed in with your lab work, so the Seminar card is just the deck.
Everyone submits, since presenters are drawn at random.
**Deadline: Friday 10:00 CEST, before the seminar** — a live countdown is shown on the page.

---

This week's lab sets up everything you'll present. If you haven't done it yet, start there:

{{< cta cta_text="Go to Computer Lab 2" cta_link="../lab/" >}}
