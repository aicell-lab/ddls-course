---
title: "Seminar 1: Defend Your Analysis"
linkTitle: "Seminar 1"
weight: 20
type: book
---

**Friday 10:00–12:00 CEST · live on Zoom · mandatory.**

The Friday seminar is where you **defend the work you did in Wednesday's computer lab**. It
is not a lecture and it is not a paper-reading club — you present *your own* analysis, and
the room questions it. This page explains how every seminar in the course works; the format
below is the same in weeks 1–6.

{{< toc >}}

## What the seminar is (and why it replaced the journal club)

In previous years this slot was a journal club where we read someone else's paper. This year
the course trains you to be a **forward-deployed scientist** — to take someone else's problem,
direct an AI agent to solve it, and **own every number that comes back**. Owning a result
means being able to stand behind it out loud, so the seminar is now your own work, defended.

Think of it as the weekly checkpoint for the skill the labs build: not "did the code run"
but **did you interview well, direct clearly, and verify honestly.**

## How it runs

- **Presenters are drawn at random.** Each week we pick **7–10 students** live. Everyone
  must arrive ready — there is no volunteering-only and no opting out.
- **7 minutes to present + 3 minutes of discussion**, per person. Keep to time; we will.
- **You present the work from *this* week's lab** — the problem you were handed, what you
  built, and how you checked it.
- The rest of the room (and the teaching team) asks questions. Being able to answer them *is*
  the exam.

> **Being drawn with nothing prepared is a fail for that seminar.** The random draw is the
> whole point: it means **everyone** spends Thursday thinking critically about their own work,
> not just the volunteers.

## What to present — four things

You have 7 minutes. Don't narrate the whole afternoon; make these four points land.

1. **The problem — the question behind the question.** What did the data owner *actually*
   want? What decision changes when they know the answer? Show that you found the real
   question, not the vague one they opened with.
2. **What you built.** How you translated the interview into a brief (`AGENTS.md` / `spec.md`)
   and directed the analyst agent. One or two slides — the shape of the pipeline, not every
   command.
3. **A critical read of your own method.** Where could it be wrong? What did you check —
   which controls did you run (shuffled labels, dumb baseline, batch/split check)? And,
   crucially, **what did you refuse to claim?**
4. **What the literature says.** How have others approached this kind of problem? One or two
   references is enough — it shows you placed your result in context rather than in a vacuum.

The single best thing you can say in a DDLS seminar is *"here is the result, here is the
control that could have killed it, and here is what I still would not claim."* That sentence
is what we are listening for.

## How you're assessed

Seminars are graded **pass/fail** on preparation and critical engagement — not on getting a
"good" result. A modest finding, honestly interrogated, passes easily. A polished number with
no controls and no caveats does not.

We are specifically listening for:

- Did you find the **question behind the question**?
- Where did you **refuse** what the agent handed you?
- What did you **check**, and what did you take on faith?

For Master's students, the **course grade (A–F) comes from the final oral defence**, not the
weekly seminars — but the seminars are where you rehearse exactly that skill. Treat every
Friday as a low-stakes run at the exam.

## Attendance

Labs and seminars are the mandatory, live core of the course. **You may miss one mandatory
session in total** — a lab *or* a seminar, not one of each. If you must miss the seminar,
email [ddls-course@scilifelab.se](mailto:ddls-course@scilifelab.se) **before** the session,
not after.

> **Attending and submitting are separate — the hand-in is always required.** Even if you can't
> join the live seminar, you must still upload your `slides.html` deck through the **Hand in**
> button in the [course portal](https://ddls-portal-6228434e.svc.hypha.aicell.io/) **before the
> deadline: Friday 10:00 CEST, before the seminar starts.** Missing the session (with notice) is
> excused; a missing submission is not.

## How to prepare (Thursday, ~30 minutes)

You already did the work in the lab; preparing to defend it is quick:

- **Pull your three artefacts** from the lab: the interview transcript (Agent A), the analysis
  transcript (Agent B), and your short report with `AGENTS.md` / `spec.md`. Pi saves each run
  as a `.jsonl` file under `~/.pi/agent/sessions/` — if you launched Pi more than once, collect
  them all; together they are your Agent-B transcript.
- **Draft 4–5 slides** around the four points above. Slides optional but recommended — you can
  even have your agent draft them from your report, then fix them.
- **Upload your deck in the [course portal](https://ddls-portal-6228434e.svc.hypha.aicell.io/)**
  — click **Hand in**, use the **Seminar** card. Submit **one self-contained `.html` file** and
  nothing else: a single HTML page with everything (styles, and any images inlined as data URIs)
  embedded, so it opens straight from a browser with no other files. Your agent can build this
  for you from your report in a few minutes. We may pull it up on screen and present *from your
  file*, so keep it self-contained — everyone submits, since presenters are drawn at random.
  **Deadline: Friday 10:00 CEST, before the seminar** — a live countdown is shown on the page.
- **Rehearse the 7 minutes once, out loud.** If you run long, cut the "what I built" detail
  first — the problem and the verification matter most.
- **Look up one or two references** on how your problem is usually approached, for point 4.
  Pi has no web search, so use your own browser — or have Pi fetch a citation from its shell
  (e.g. `curl 'https://api.crossref.org/works?query=YOUR+TOPIC'`). Never let the agent invent a
  DOI: check that every reference actually resolves before you cite it.

---

This week's lab sets up everything you'll present. If you haven't done it yet, start there:

{{< cta cta_text="Go to Computer Lab 1" cta_link="../lab/" >}}
