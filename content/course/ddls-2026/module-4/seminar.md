---
title: "Seminar 4: Defend Your Structure"
linkTitle: "Seminar 4"
summary: ""
weight: 20
type: book
---

**Friday 10:00–12:00 CEST · live on Zoom · mandatory.**

The Friday seminar is where you **defend the structural analysis you did in Wednesday's computer lab**.
It is not a lecture and it is not a paper-reading club — you present *your own* analysis from a **short
slide deck you built from your results**, and the room questions it. The format is the same as every
seminar in the course (weeks 1–6); this page tunes it to Week 4's work.

{{< toc >}}

## What the seminar is

This year the course trains you to be a **forward-deployed scientist** — to take someone else's
problem, direct an AI agent to solve it, and **own every number that comes back**. Owning a result
means being able to stand behind it out loud, so the seminar is your own work, defended. This week the
thing you defend is a **claim about a protein structure** — and, specifically, whether the confident,
good-looking AlphaFold model your owner trusted actually **answers their question**, or only *looks*
like it does.

Think of it as the weekly checkpoint for the skill the labs build: not "did the code run" but **did
you interview well, direct clearly, and verify honestly** — and, this week, **did you read the
confidence that matches the claim, check the model is really their protein, and catch the trap before
you believed the picture.**

## How it runs

- **Presenters are drawn at random.** Each week we pick **7–10 students** live. Everyone must arrive
  ready — there is no volunteering-only and no opting out.
- **7 minutes to present + 3 minutes of discussion**, per person. Keep to time; we will.
- **We show your submitted `slides.html` deck on screen** when you're drawn, and you talk to it —
  the structure coloured by confidence, the pLDDT track or PAE heatmap, the answer, all embedded in the
  deck. (You don't screen-share your own machine; the portal drives your deck, so it must stand alone.
  You may live-demo the running viewer in the 3-minute discussion if you like.)
- The rest of the room (and the teaching team) asks questions. Being able to answer them *is* the exam.

> **Being drawn with nothing prepared is a fail for that seminar.** The random draw is the whole point:
> it means **everyone** spends Thursday thinking critically about their own work, not just the
> volunteers.

## What to present — four things

You have 7 minutes. Don't narrate the whole afternoon; make these four points land, **using the
visuals in your deck**.

1. **The problem — the question behind the question.** What did the structural-biology data owner
   *actually* want — to target a region, find a pocket, tighten a binder, pick residues to mutate — and
   **what part of the model were they already relying on and proud of?** Show that you found the real
   question, and the confident picture you had to interrogate.
2. **What you built.** How you translated the interview into a brief (`AGENTS.md` / `spec.md`) and
   directed the analyst agent — how you fetched or read the structure, and *which* confidence you
   decided the claim actually needed. The shape of the analysis, not every command.
3. **The right confidence and the trap — show it on a slide.** Put up your **confidence panel**: the
   structure coloured by pLDDT (with the residues the owner cares about marked), *and* the confidence
   that matches the claim — the per-residue pLDDT for the claimed region, or the interface PAE for a
   binding claim. Then name the **trap you checked** (an induced/disordered region read as a solid fold;
   per-chain confidence mistaken for binding; a model of the canonical sequence that isn't their mutant;
   a monomer whose "surface" is a buried dimer interface) and **what it did to the answer**. And,
   crucially, **what did you refuse to claim?**
4. **The caveat.** Name the one biological caveat you'd flag — a single-sequence prediction that ignores
   ligands/cofactors/partners, an AF-DB monomer that says nothing about the assembly, a confident fold
   that could still be the wrong conformational state — and how it could bias the answer. This is the
   point the room will push on hardest.

The single best thing you can say in a DDLS seminar this week is *"the model looked confident, but the
confidence that actually backs their claim isn't there — here's the structure, here's the right number,
and here's what I would not claim."* That is what we are listening for.

### Two more things every deck must do this week

Carried over from Week 3 — small, but we look for them explicitly and the room will ask:

5. **Disclose your AI use — on a slide.** One line or a small panel: **which agent did what** (the
   interview owner, Pi for the analysis and the viewer, Pi/other for the deck) and, crucially, **what
   *you* checked yourself**. "Pi read the pLDDT track; I re-plotted the claimed residues by hand and
   confirmed they sit in the low-confidence dip" is exactly the disclosure we want. Owning the work
   means being open about how it was made — a course non-negotiable, not a confession.
6. **State your limitations — and what you'd do with another week.** Don't oversell. Name what your
   result does *not* establish, the check you didn't have time to run, and the one thing you'd do next
   (fold the actual construct, run a proper complex predictor with interface confidence, find an
   experimental structure). A presenter who names their own limitations is trusted more, not less — and
   it's the difference between a student and someone who just ran a script.

## Give a good talk: structure and delivery

A defence is a *talk*, not a data dump. You have seven minutes; spend them deliberately. This is the
structure we're looking for — roughly one idea per slide, ~1 minute each:

| Slide | ~time | What it does |
|---|---|---|
| **1 · The question** | 1 min | The owner, their protein, the decision that hangs on it — and the confident model you had to interrogate. Land *why anyone should care.* |
| **2 · What you built** | 1 min | Interview → `AGENTS.md`/`spec.md` → how you read the structure and which confidence the claim needed. The *shape*, not the commands. |
| **3 · The right confidence** | 1.5 min | The panel: the structure coloured by pLDDT and the confidence that matches the claim (per-residue for a region, interface PAE for binding). This is the heart — slow down here. |
| **4 · The trap** | 1.5 min | Name it, show what it did to the answer, and say what you *refused* to claim. |
| **5 · The answer** | 1 min | The residues they can trust, or the honest "the model doesn't support that — here's what to do instead." The deliverable, not a picture. |
| **6 · Limitations + AI use** | 1 min | The one caveat, what you'd do next, and your AI-use disclosure. End here — don't trail off. |

Delivery habits that separate a strong defence from a nervous read:

- **One idea per slide.** If a slide has two arguments, it's two slides. No wall of text — a slide is a
  prompt for *you*, not a document for the reader.
- **Lead with the point, then the evidence.** "The helix they want to target is low-confidence — here's
  the track," not a build-up that hides the finding on the last line.
- **Talk to your figure.** When the structure or the PAE heatmap is up, point at the residues and the
  numbers out loud. Let people read a figure *while* you explain it; don't read bullets at them.
- **Rehearse once, out loud, against the clock.** Seven minutes is short. If you run long, cut the "what
  I built" detail first — the question, the confidence panel, the trap and the caveat are what matter.
- **Have one hard answer ready.** The room *will* ask "how do you know the model doesn't support that?"
  — point to the per-residue confidence or the interface PAE, and the structure check. Anticipate the
  one question you'd least like to get and prepare for it.

## How you're assessed

Seminars are graded **pass/fail** on preparation and critical engagement — not on getting a "good"
result. **A modest, honest finding that survived the confidence check passes easily** — in fact it's
the whole point this week. A polished 3D cartoon with no per-residue confidence and no structure check
does not.

We are specifically listening for:

- Did you find the **question behind the question** — including *which part of the model the owner
  intended to trust, and for what*?
- Did you **read the confidence that matches the claim** (not the global score) and **check the
  structure is actually their protein and their assembly**?
- Where did you **refuse** what the agent (or the owner) handed you, and report the honest truth?
- Did you **disclose your AI use** and **name your limitations** honestly, rather than overselling?
- Is the deck **clearly yours** — a structure you thought about and a look you chose — not a stock
  template pasted from a prompt?

For Master's students, the **course grade (A–F) comes from the final oral defence**, not the weekly
seminars — but the seminars are where you rehearse exactly that skill. Treat every Friday as a
low-stakes run at the exam.

## Attendance

Labs and seminars are the mandatory, live core of the course. **You may miss one mandatory session in
total** — a lab *or* a seminar, not one of each. If you must miss the seminar, email
[ddls-course@scilifelab.se](mailto:ddls-course@scilifelab.se) **before** the session, not after.

> **Attending and submitting are separate — the hand-in is always required.** Even if you can't join
> the live seminar, you must still hand in **both** your lab work (the viewer app, transcripts,
> report — via the **Computer-lab** card) **and** your **`slides.html`** deck (via the **Seminar**
> card) in the [course portal](https://ddls-portal-6228434e.svc.hypha.aicell.io/) **before the
> deadline: Friday 10:00 CEST, before the seminar starts.** Missing the session (with notice) is
> excused; a missing submission is not.

## How to prepare (Thursday, ~30–45 minutes — NOT in the lab window)

**Do this on Thursday, after the lab — not squeezed into Wednesday's four hours.** The 13:00–17:00 lab
is for the interview, the analysis and building the viewer; **seminar prep is a separate, later job.**
You already did the work in the lab, so preparing to defend it is quick.

**What you present from: a single self-contained `slides.html` deck.** When you're drawn, the portal
loads *your* deck on the shared screen — so it has to stand on its own. Two rules, and nothing more:

1. **One self-contained `.html` file.** Everything inlined — CSS and JS in the file, images as `data:`
   URIs or absolute `https://` links. No separate image files, no PDF, no PPTX (the portal serves the
   file alone, so relative links to your laptop won't resolve). *(A quick way to embed your 3D view:
   screenshot the viewer coloured by pLDDT and inline it as a `data:` URI — you don't need a live
   3Dmol.js widget in the deck.)*
2. **Slides advance with the ← / → arrow keys.** The portal drives your deck with the arrow keys, so any
   deck that responds to them works. Easiest path: **Reveal.js from a CDN** (arrow-key navigation out of
   the box) — or a simple keyboard-driven deck if you prefer.

> **Make it yours — don't ship the default.** Last year every deck looked identical because everyone
> pasted the same prompt. This year, **decide your own visual style first**, then tell the agent. Pick a
> direction and a couple of specifics — for example: a **mood** (clean lab-notebook · bold data-viz on
> dark · editorial/print · minimal monochrome · conference-poster), **2–3 colours** you like, a **font
> pairing** (e.g. a serif headline with a mono caption), and **one layout habit** (big figure left /
> text right, a running footer with your headline finding). A deck that looks like *yours* is part of
> owning the work.
>
> **See a deck or figure whose look you love?** Give the agent the file (or a screenshot) and say *"use
> this as a style reference"* — a concrete example steers the look far better than adjectives. The goal
> is to **raise the quality and make it distinctly yours**, not just fill six slides.

Your agent can build this from your `report.md` — **but hand it your style**, not the default. **Make
the 3D structure a live, spinning viewer** embedded right in the deck (3Dmol.js, coloured by pLDDT) —
a rotating model reads far better on screen than a static screenshot, and it's the centrepiece of your
talk. Fill in the `STYLE:` line, then paste into **Pi** (adjust file names):

```text
Build a single self-contained slides.html presentation for a 7-minute seminar, using Reveal.js loaded
from a CDN. Content comes from report.md and my results/. Make ~6 slides:
(1) title + the question behind the question, and which part of the model the owner was relying on;
(2) what I built — interview → AGENTS.md/spec.md → how I read the structure and which confidence the
claim needed; (3) a LIVE, auto-rotating 3D viewer of the structure embedded in the slide (3Dmol.js from
a CDN), coloured by pLDDT with the residues the owner cares about highlighted, next to the confidence
that matches the claim (a per-residue pLDDT track for a region, or the interface PAE heatmap for a
binding claim); (4) the trap I checked and what it
did to the answer; (5) the honest answer — the residues they can trust, or why the model doesn't support
the claim; (6) limitations + what I'd do with another week + my AI-use disclosure (which agent did what,
and what I checked myself).
STYLE: <describe your look — mood, 2–3 colours, font pairing, layout habit. Make it distinctive, not a
stock template.>
Embed every figure directly in the HTML (inline SVG or a base64 data URI) — the file must work with NO
other files next to it. For the 3D viewer on slide 3: load 3Dmol.js from a CDN and paste my structure's
PDB text straight into the HTML (a JS string or a hidden <script type="text/plain"> block — no external
file); render it coloured by B-factor (= pLDDT) with my target residues highlighted, and call
viewer.spin(true) so it ROTATES on its own during the talk. Initialise and resize the viewer when its
slide becomes active (Reveal's 'ready' and 'slidechanged' events) so it shows up and keeps spinning.
Slides must advance with the left/right arrow keys. Output only slides.html.
```

**Don't ship the agent's first draft — iterate at least one round.** The single biggest difference
between a forgettable deck and a good one is that you *looked at it and fixed it*. Run this loop:

1. **Build** the first draft (the prompt above).
2. **Open it and arrow through it** as if presenting. Where do you stumble? Which slide has two ideas?
   Where is there a wall of text? Is the confidence panel the clear centre, or buried?
3. **Critique it** — yours and the agent's. Ask Pi to be a tough reviewer:
   *"You are a strict presentation coach. Look at slides.html and tell me the three weakest slides and
   exactly why — too much text, no clear point, a figure that doesn't support the claim — then propose
   specific fixes. Don't rewrite yet."* Read its critique, decide what you agree with, and only then
   direct the fixes.
4. **Revise and check every number by hand** — the confidence numbers, the trap and the caveat are
   yours, not the agent's. A confident wrong number on a slide is worse than no slide.
5. **Rehearse once, out loud, against the clock.** If you run long, cut the "what I built" detail first
   — the problem, the confidence panel, the trap and the caveat matter most. Have one concrete answer
   ready for the discussion (e.g. "how do you know the model doesn't support that?" → point to the
   per-residue confidence or the interface PAE, and the structure check).

That back-and-forth *is* the forward-deployed skill applied to a presentation: you direct, you judge,
you own the result.

> **Want to go further on design? (optional)** If you'd like a sharper, more distinctive deck, there are
> "design skills" you can add to a coding agent that has filesystem access (Claude Code, Cursor, Codex,
> Gemini CLI — not the plain Pi/Reveal.js path above). Two that work well:
>
> - **[frontend-slides](https://github.com/zarazhangrui/frontend-slides)** — *generates* a whole
>   distinctive deck from your `report.md`, with a menu of styles (built to avoid the generic "AI-slop"
>   look, which is exactly the diversity we want). In Claude Code:
>   `/plugin marketplace add https://github.com/zarazhangrui/frontend-slides` then
>   `/plugin install frontend-slides@frontend-slides`; or point any coding agent at the repo's
>   `SKILL.md` and ask it to build your `slides.html`. It emits one self-contained file that advances
>   with the arrow keys — so it works with the seminar screen out of the box. *(We tested this.)*
> - **[Impeccable](https://impeccable.style/tutorials/getting-started/)** — *polishes* a deck you
>   already have: `npx impeccable install`, then `/impeccable polish slides.html` makes small, targeted
>   fixes to spacing, type and colour.
>
> Both are purely optional and not needed to pass — a plain, honest deck in your own style is completely
> fine. Whatever you use, keep the two rules above (one self-contained `.html`, arrow-key nav) and
> **check every number yourself**.

You hand in the deck via the portal's **Seminar** card: upload your **`slides.html`**. Your viewer app
and transcripts are already handed in with your lab work, so the Seminar card is just the deck. Everyone
submits, since presenters are drawn at random. **Deadline: Friday 10:00 CEST, before the seminar** — a
live countdown is shown on the page.

---

This week's lab sets up everything you'll present. If you haven't done it yet, start there:

{{< cta cta_text="Go to Computer Lab 4" cta_link="../lab/" >}}
