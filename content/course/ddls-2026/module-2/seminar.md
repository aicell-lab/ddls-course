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
analysis, **screen-share your interactive viewer**, and the room questions it. The format is
the same as every seminar in the course (weeks 1–6); this page tunes it to Week 2's image work.

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
- **You present by screen-sharing your `viewer.html`** — the gallery, an overlay or two, and the
  metrics panel — and walk the room through what it shows.
- The rest of the room (and the teaching team) asks questions. Being able to answer them *is*
  the exam.

> **Being drawn with nothing prepared is a fail for that seminar.** The random draw is the whole
> point: it means **everyone** spends Thursday thinking critically about their own work, not just
> the volunteers.

## What to present — four things

You have 7 minutes. Don't narrate the whole afternoon; make these four points land, **using your
viewer as the visual**.

1. **The problem — the question behind the question.** What did the image data owner *actually*
   want? What decision changes when they know the answer? Show that you found the real question
   (segment what, count what, classify which classes) — not the vague one they opened with.
2. **What you built.** How you translated the interview into a brief (`AGENTS.md` / `spec.md`)
   and directed the analyst agent — which pretrained model (Cellpose, a CNN feature extractor,
   thresholding…) and why. The shape of the pipeline, not every command.
3. **A critical read of your own method — show it in the viewer.** Open an **overlay**: does the
   segmentation actually sit on the cells? Show your **metric against its baseline**. Which
   controls did you run (held-out split, class-balance check, a trivial baseline)? And,
   crucially, **what did you refuse to claim?**
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
> join the live seminar, you must still upload your `viewer.html` (with your lab work) through the
> **Hand in** button in the [course portal](https://ddls-portal-6228434e.svc.hypha.aicell.io/)
> **before the deadline: Friday 10:00 CEST, before the seminar starts.** Missing the session
> (with notice) is excused; a missing submission is not.

## How to prepare (Thursday, ~30–45 minutes — NOT in the lab window)

**Do this on Thursday, after the lab — not squeezed into Wednesday's four hours.** This is the
deliberate fix for last week's "too intense" feedback: the 13:00–17:00 lab is for the interview,
the analysis and building the viewer; **seminar prep is a separate, later job.** You already did
the work in the lab, so preparing to defend it is quick:

- **Open your `viewer.html`** and decide the two or three views you'll show live: the gallery,
  one good overlay, and the metrics panel. Know how to get to each in a few clicks — practise the
  screen-share once so you're not hunting for the tab on Friday.
- **Pull your artefacts** from the lab if you need them: the interview transcript (Agent A), the
  analysis transcript (Agent B / Pi, saved as `.jsonl` under `~/.pi/agent/sessions/`), and your
  `AGENTS.md` / `spec.md`.
- **Draft a few slides *or* just present from the viewer.** Slides are optional this week — the
  viewer is your main visual. If you want slides around the four points above, your agent can
  draft them from your summary; then fix them.
- **Rehearse the 7 minutes once, out loud.** If you run long, cut the "what I built" detail
  first — the problem, the overlay and the caveat matter most.
- **Have one concrete answer ready** for the discussion: if someone asks "how do you know the
  segmentation is right?", you should be able to click straight to the overlay and the baseline.

You hand in the seminar via the portal's **Seminar** card. This week you may submit your
self-contained **`viewer.html`** as your deck (or a separate `slides.html` if you built one) —
one self-contained HTML file, everything inlined, so it opens straight from a browser with no
other files. We may pull it up on screen and present *from your file*, so keep it
self-contained. Everyone submits, since presenters are drawn at random.
**Deadline: Friday 10:00 CEST, before the seminar** — a live countdown is shown on the page.

---

This week's lab sets up everything you'll present. If you haven't done it yet, start there:

{{< cta cta_text="Go to Computer Lab 2" cta_link="../lab/" >}}
