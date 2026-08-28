---
title: 'DDLS 2026 — Seminar 1'
summary: 'Week 1 seminar: computer-lab debrief, your feedback, and how the seminar works'
authors: []
tags: []
categories: []
date: '2026-08-25T00:00:00Z'
slides:
  theme: white
  highlight_style: dracula
---

## Welcome to Seminar 1

**Data-Driven Life Sciences 2026**

* Good morning — and welcome to our first live seminar.
* You made it through the first computer lab yesterday. That was a real lift.
* This morning: what the lab was for, **what you told us**, and how these seminars work.
* We're figuring this out together — bring your questions.

-----

## Agenda

* **Part 1 — The computer lab:** what it trained, what the goal really was, and a full debrief of **your feedback**.
* **Part 2 — The seminar:** what it's for, how presentations work, and how to prepare.
* Plenty of room for **questions** along the way.

-----

## What this course actually trains

* We are training the **forward-deployed scientist**.
* You take **someone else's** biological problem.
* You **interview** them until the question is precise.
* You **direct an AI agent** to do the labour — while **you** supply the judgement.
* The loop: **specify → direct → verify.**
* The scarce skill is **specification, direction and verification** — *the harness, not the model.*

-----

## The two-agent lab (recap)

* **Agent A — the data owner.** You **interview** it to pin down a precise question. It answers a good question honestly and a vague one uselessly.
* **Agent B — Pi, the analyst.** You **direct** it via `AGENTS.md` / spec to do the actual work.
* **You are the only channel between them.** Nothing passes from A to B except what you write down.
* That channel **is** the examined skill.

-----

## What the goal of Lab 1 REALLY was

* To go through the **whole loop once** and get comfortable with the machinery:
* **Interview** Agent A → **use the portal** → **set up Pi** locally → **direct** it → produce **something** end to end.
* That's it. One full pass, hands on every part.
* The aim was **familiarity with the pipeline** — not the result at the end of it.

-----

## What the goal was NOT

* **NOT** a deep, polished, or publication-grade analysis.
* **NOT** finishing with time to spare.
* **NOT** completing every validation step.
* A **rough, rushed, incomplete-feeling** first pass is completely fine — and expected.
* **Week-1 quality is not graded.**

-----

## Lab 1 — by the numbers

* **20 of you handed in a full lab** — the whole loop, interview to delivered report.
* **16 seminar decks** prepared for today.
* **16 of you left detailed feedback ratings** — thank you, we read every word.
* How you rated it (out of 5):
  * **Portal — 4.3**  ·  **Design — 4.2**  ·  **Instructions — 4.0**
  * **Overall — 3.6**
* A hard, deliberately-stretchy first lab landing around **3.6 overall** is a **healthy, honest** signal — not a disappointing one.

-----

## What you did remarkably well

* You **refused vague words.** You made Agent A define "trustworthy", "unusable", "scaffold class" instead of guessing.
* You asked the **killer question** — *"what would make you NOT trust this result?"* — and turned the answer into your must-nots.
* You **read the brief back** to Agent A to check your own understanding.
* You caught **data traps**: CSV headers that didn't match the description, leakage (island / sample-id → species), temporal splits, "blanks are never zero".
* You wrote honest **"what I would NOT claim"** sections.
* You **directed** Pi rather than trusting it — pushing back on odd rankings, auditing its own spec.

-----

## What you told us — the honest feedback

We grouped everything you wrote. Five themes came back again and again:

* **Setup ate the clock** — installing Pi, the terminal, Windows especially.
* **Time vs. careful checking** — "I had to rush the validation steps."
* **A confusing start** — "at first I wasn't sure what to even ask."
* **It felt stressful** — "a lot of us didn't finish in time."
* **Online, it's hard to know** you're on the right track.

Let's take them one at a time.

-----

## "Setup ate the clock"

* By far the most common note — Pi, the terminal, permissions, **Windows** in particular.
* You're right, and it's a **one-time cost**: Pi and the portal are set up **now**. Next week you walk in already installed.
* **What we're doing:** an OS-by-OS **setup checklist** (incl. Windows) so the lab window goes to *thinking*, not *installing*.
* The skill we're grading was never "can you install a CLI tool."

-----

## "Not enough time to check carefully"

* Several of you felt the tension between the clock and doing verification properly. That tension is **real**.
* But remember: **Week-1 quality is not graded.** Rushing the last validation step in week 1 is **expected**, not a failure.
* As setup time disappears, **more of the window goes to the actual loop** — interview, direct, verify.
* Noticing *"I didn't have time to check this"* and **writing it down** is itself the skill. Many of you did exactly that.

-----

## "I wasn't sure what to even ask"

* A confusing start — *"what do I ask Agent A?"* — came up a lot.
* Here's the thing: **that confusion IS the job.** Sitting with someone else's problem and not yet knowing the right question is what a forward-deployed scientist does every day.
* It is **the hardest part**, and it is **the point**. It gets easier fast.
* **What we're doing:** tightening the lab's opening instructions so the *first move* is clearer — without removing the productive struggle.

-----

## If it felt too long — that's okay

* Feeling rushed was **never the bar**. The point was the **process**, not the polish.
* Struggling to ask Agent A the **right question** at first? That is exactly the skill we're practising — **not a failing**.
* You are supposed to be a bit uncomfortable in week 1. **It gets easier.**

-----

## A bit of stress — on purpose

* We hear that this is **more intense** than a slow, week-long lab. That is a **deliberate design choice**, not an oversight.
* We believe **dedicated, focused time — plus a little pressure — is how this skill actually sticks.** Comfortable and diffuse doesn't build it.
* But we also **care that it's manageable**: you may **miss one** mandatory session (a lab *or* a seminar). Just email **ddls-course@scilifelab.se** *before* the session.
* If it tips from stretching into overwhelming, **tell us** — that's data too.

-----

## Why the lab comes out the same week

* A few of you asked us to release the material a week early. We thought about it — and we keep to **same-week release on purpose.**
* Each week's lab is shaped by the **previous week's feedback** — so *when* we release is itself a **data-driven decision**. We'd rather not release it blindly.
* Some weeks bring a **live guest lecture** — handing out the lab before the topic is introduced wouldn't make sense.
* The lab runs on the **live portal** — we can watch it and keep it healthy in the **fixed lab window**, not around the clock for a week.
* And yes, it's **more intense** than having days to prepare. That part is deliberate: **focused time + a bit of pressure is how this skill sticks.**

-----

## "Online, it's hard to know if I'm on track"

* Real, and worth naming: no one is leaning over your shoulder.
* That's exactly what the **live lab window**, this **seminar**, the **portal coach**, and us **watching the portal** are for.
* **Ask early and ask often** — in the lab window, in chat, here. If you hit it, others did too.

-----

## Small things you asked for

You gave us concrete portal ideas. A few we're taking away:

* A **"explain this simply"** helper / glossary for jargon in Agent A's replies.
* A **stopping point** for the suggestion "wand" so it doesn't loop forever.
* Clearer signals that you're **on the right track** during the lab.

Keep them coming — the portal is **ours to shape together**.

-----

## Where the labs stand — your feedback

* **We read every submission.** All of them.
* We're sending each of you **individualised written feedback** on your lab:
  * what you did well,
  * what to improve,
  * what to be aware of.
* It's **AI-drafted** from your actual interview + files, then **reviewed by the teaching team** before it reaches you.
* Watch your **portal bell / dashboard**.

-----

## Questions about the lab?

* Let's talk.
* What got stuck? What was confusing? What surprised you?
* No question is too basic — if you hit it, others did too.

-----

## Part 2 — The seminar

**How this Friday session works**

-----

## What the seminar is for

* First, to **review the computer lab together** — a shared debrief (that's what we just did).
* We look at what worked, what tripped people up, and what to carry into next week.
* **Then** we move on to selected presentations.
* Think of it as a weekly checkpoint, not an exam.

-----

## How presentations work

* Each week, **~7–10 students are drawn at random** to present.
* You present the work **you** did in **that week's** computer lab.
* **7 minutes + 3 minutes** of discussion.
* This **replaced** the old "journal club" — you present your own work, not a paper.

-----

## The core idea

## *"You can outsource your thinking, but not your understanding."*

-----

## Outsource the doing, not the knowing

* We made it **easy to produce** things — the AI writes the report, even makes the slides.
* That does **not** make it any easier to **understand** what was done.
* To present it **orally**, you have to actually understand it.
* So preparing a talk starts from **understanding your own work** — not from the slides the AI made.

-----

## What this means for you

* **Before** the seminar, spend time understanding **your own report**.
* Be ready to explain:
  * your **question**,
  * your **data**,
  * what the **analysis** actually did,
  * what you **would** and **would not** trust.
* **To pass the seminar you must be able to present your work if you are selected.**

-----

## Let's begin

* You did the hard first pass. Well done.
* Today: debrief together, then a few of you present.
* Bring your questions — this room is for figuring it out.
* Let's get started.
