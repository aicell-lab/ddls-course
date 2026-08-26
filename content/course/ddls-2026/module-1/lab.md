---
title: "Computer Lab 1: Interview a Data Owner, Direct an Analyst Agent"
linkTitle: "Computer Lab 1"
weight: 10
type: book
---

Welcome to the first computer lab. Today you rehearse the whole job this course trains you
for — the **forward-deployed scientist**: sit down with someone else's biological problem,
interview them until the question is precise, and come back with a working, checked answer,
with an AI agent doing the labour and you supplying the judgement.

You will talk to **two** agents, and you are the only link between them:

- **Agent A — the data owner.** A simulated scientist who owns a real dataset and a real
  question. You **interview** it. It answers a good question honestly and a vague one
  uselessly — just like a real collaborator.
- **Agent B — the analyst.** A coding agent that starts as an *empty folder*. You
  **configure** and **direct** it to actually solve the problem.

Nothing passes between A and B except what **you** write down. That channel — you — is
exactly the skill being examined.

{{< toc >}}

## Learning goals

By the end of this lab you should be able to:

- Run a structured **interview** with a data owner using the four probes
  (GOAL · DATA · WHAT YOU TRIED · WHAT DONE LOOKS LIKE), and steer vague answers into
  definite ones.
- **Translate** an interview transcript into two working documents: an `AGENTS.md` (the
  brief) and a `spec.md` (every detail, number, path and trap).
- Set up a local **analyst agent** and point it at the course portal.
- **Direct** the agent to build an analysis, and **validate** it like a scientist — with
  controls, not vibes.
- Produce a short **report** you own, and prepare to defend it at Friday's seminar.

### The one rule: it must be someone else's problem

Many of you have your own dataset. Using it is the **worst** way to learn this. When the
problem is already in your head, you never have to say the things that matter out loud —
"plate 3 was re-imaged", "column 24 is buffer", "obviously means log₂" — so the agent
never hears them and quietly guesses. Being the **outsider** forces that hidden context
into the open, where the agent can read it. That is why, today, you work Agent A's
problem, not your own.

## Before you start

**Prerequisites — you don't need to write much code, but you must be able to read it.**
You will read what the analyst agent writes and decide whether it is right. If you are shaky
on reading Python, skim the [prerequisites](../../prerequisites/) first.

**Bring a laptop you can install software on.** You will install a command-line agent and
set two environment variables. If your machine is locked down, sort that out before the
session — not during it.

**Have an agent running already helps.** If you got Codex, Claude Code, Gemini CLI or Cursor
working after the lecture, great — you'll reuse that muscle here. If not, Part 3 walks you
through it from zero.

## Access the portal

Everything for today lives behind one course portal. It hosts Agent A (the data-owner
chatbot), issues the **API key** your local analyst agent will use, and lets you
**download** both the dataset and your interview transcript.

{{< cta cta_text="Open the course portal" cta_link="https://ddls-portal-6228434e.svc.hypha.aicell.io" >}}

**First time — activate your account** (do this once):

1. Go to the portal at `https://ddls-portal-6228434e.svc.hypha.aicell.io` and choose **Activate account**.
2. Enter **the email you registered for the course with** and the **course code** we sent
   you by email.
3. **Choose a password.** That's it — you're in.

**Coming back later** (e.g. after closing the tab): use **Sign in** with the same **email +
the password you just set** — not the course code. The code is only for first activation.

If the email or code is not recognised, tell a TA in the chat — don't burn lab time on it.

What the portal gives you (four things, and only these):

- **Chat with the data owner** (Agent A) — your interview happens here, in the browser.
- **Download your interview transcript** — the full chat, to feed into Part 2.
- **Generate an API key** — for your local analyst agent (Part 3).
- **Download the dataset** — the real files Agent A is talking about (Part 4).

## Part 1 — The interview (Agent A)

Open the **chat with the data owner** in the portal. Agent A is playing a busy scientist
who has data and a question but has not thought hard about either. Your job is not to fill
in a form — it is to **steer a conversation** until you could hand the whole thing to
someone who has never met this person.

> The entire chat is **logged server-side** — there is no separate "submit interview" step.
> But at the end, **download the transcript**: you need it for Part 2, and the agent reads
> the transcript, never your notes.

### The four probes — what you must come back with

If you cannot answer all four of these afterwards, you have not finished the interview.
Keep going.

- **THE GOAL** — What decision changes when you know the answer? What would convince you
  it's real? Who reads the answer, and in what form?
- **THE DATA** — Table, images, sequences, something else? How much, and where does it
  live? What's in the metadata, and who typed it in? **How do I load it — is there a parser
  already?**
- **WHAT YOU TRIED** — What have you already run? What worked, what failed, and why do you
  think it failed?
- **WHAT DONE LOOKS LIKE** — What outcome do you expect? Is there a hypothesis, or is this
  open? What would make you *distrust* the result?

**Spend the longest on THE DATA.** "How do I load it, is there a parser already?" is the
question students never think to ask and the one that otherwise costs them a whole
afternoon.

### Steering — every vague answer has one follow-up that fixes it

Data owners speak their own language. Assume nothing is defined until *you* have made it
definite. When you get a hedge, ask the one question that pins it down:

| What they say | What you ask back |
|---|---|
| "It's just some imaging data." | "How many files, what format, and can you send me one right now?" |
| "We tried machine learning, it didn't work." | "Which method, on which subset, and what did the output actually look like?" |
| "We want to know if the treatment does anything." | "Anything compared to what — and measured how?" |
| "The metadata's in the spreadsheet." | "Who fills it in, and has the format changed over the years?" |

**The practical rule: ask for one real file before the interview ends.** Everything you
were told will turn out to be slightly different from what is actually in the data — every
time. In this lab, that means: make sure you know exactly what the dataset contains before
you move on.

### Practice: sharpen these answers

Before you start the real interview, warm up. For each vague answer below, write the sharp
follow-up you'd ask. Then check yourself.

**1.** *"The results are in a bunch of folders, one per experiment."*

{{< spoiler text="Show a model follow-up" >}}
"How many folders, how are they named, and are they all the same layout inside? Can you
send me one folder so I can see the structure — and which file in it holds the numbers I
care about?"
{{< /spoiler >}}

**2.** *"We just want to see if the two groups are different."*

{{< spoiler text="Show a model follow-up" >}}
"Different in *what* measured quantity, and different by how much would matter to you? What
defines group A vs group B in the data — is it a column, a filename, or something you carry
in your head? And is anything else different *between* the groups besides the treatment —
different day, different machine, different operator?"
{{< /spoiler >}}

**3.** *"The labels are in the file names, it's obvious."*

{{< spoiler text="Show a model follow-up" >}}
"Walk me through one real filename and tell me what each part means. Is that convention the
same across every file, or did it change partway through? What happens for the controls —
do they follow the same naming, or are they the exception?"
{{< /spoiler >}}

Notice the pattern: you turn an adjective ("different", "obvious", "didn't work") into a
number, a column, a file, or a comparison. That's the whole move.

When you're satisfied you have all four probes covered and have "seen a file", **download
the transcript** and move on.

## Part 2 — Translate: build `AGENTS.md` and `spec.md`

You have a transcript. It is human-shaped: hedged, out of order, full of throwaway
sentences (one of which is probably the whole problem). Now make it machine-shaped.

For this drafting step you can use **any** chatbot (ChatGPT, Claude, or the local analyst
agent once you set it up in Part 3). Work *from the transcript*, never from memory.

### Step 1 — review it back as prose first

Ask the agent to read the transcript and produce a **human-readable summary** — a short
HTML page or plain write-up — of: the goal, the data and where it lives, what's been tried,
what "done" looks like, and every trap or caveat it can find. **Read this carefully and
correct it.** This is your chance to catch where the agent misheard the scientist before
those errors get baked into the brief.

### Step 2 — distill into two documents

Once the summary is right, have the agent split it into two files, and then **edit both by
hand** against the criteria below.

**`AGENTS.md` — the brief the agent reads at the start of every session.** It is loaded
*every turn*, so it holds only what *always* applies. Keep it tight.

A good `AGENTS.md`:

- [ ] Is **under ~200 lines** (those tokens are spent before you've even asked a question).
- [ ] States the **GOAL** in a sentence or two — the actual question, made definite.
- [ ] Says **where the data lives** and how to load it (pointer, not the whole data
      dictionary).
- [ ] Lists the **MUST-NOTs** — the rules the agent would otherwise break
      (e.g. "don't pool the batches without correcting", "don't drop rows silently").
- [ ] **Points to `spec.md`** for everything detailed, instead of inlining it.

**`spec.md` — every detail behind the brief.** This is where the throwaway sentence about
"plate 3" lives. Nothing is too small.

A good `spec.md` captures:

- [ ] Every **number, path, filename convention and column meaning** mentioned.
- [ ] Every **trap and exception** ("column 24 is buffer", "the format changed in 2023",
      "replicate 2 is bad").
- [ ] The **metric and comparison** — what is measured, against what baseline/control.
- [ ] The **controls / splits** you intend to run (from Part 5).
- [ ] What **"done" looks like** and what would make you distrust the result.

> **The test:** could a competent stranger, with only these two files and the data, produce
> what the scientist wants — without asking you a single question? If not, keep editing.
> Nothing should be *added* that wasn't implied by the transcript; you are making the
> implicit **explicit**, not inventing.

> **Your spec is a draft until you've opened the file.** Everything the data owner told you
> will be *slightly* wrong — a row count that doesn't match, a "unit" that isn't, a control
> well they misremembered. That's not a failure of your interview; it's the nature of the
> job. After you load the data in Part 4, **come back and correct `spec.md`** against what
> the file actually contains. Interview → draft spec → *load data* → fix spec is the loop.

## Part 3 — Set up the analyst agent (Agent B) locally

The analyst is a coding agent running **on your own machine**, pointed at the course
portal for its model. Pick **one** of the two options below. Both are terminal agents that
read an `AGENTS.md` and can run code, read files and write output.

> **New to the terminal? Two minutes of setup first.** These agents run in a **terminal**
> (macOS: *Terminal.app*; Windows: *PowerShell*; Linux: your shell). You install them with
> **npm**, which comes with **Node.js** — you need **version 22 or newer**. Check what you
> have by running `node --version`. If it prints nothing, or a number below 22, install the
> latest LTS from <https://nodejs.org> first, then reopen the terminal. Everything below is
> copy-paste — you won't be writing code, just running commands.

### Option A — OpenAI Codex CLI

Lightweight coding agent that runs in your terminal.

- Docs and install: <https://github.com/openai/codex>
- npm package: <https://www.npmjs.com/package/@openai/codex>

Install (needs Node.js 22+):

```bash
npm install -g @openai/codex
```

### Option B — Pi (open-source coding agent)

Minimal, fully open-source terminal agent. It uses an `agents.md` context file, which
matches this lab nicely.

- Docs and install: <https://github.com/earendil-works/pi>

Install (needs Node.js):

```bash
npm install -g --ignore-scripts @earendil-works/pi-coding-agent
```

### Point the agent at the portal

The portal exposes an **OpenAI-compatible API**, so any OpenAI-style agent can use it. You
just override two environment variables so the agent talks to the portal instead of
OpenAI.

1. In the portal, open **Generate API key** and create a key. Copy it — you may not be able
   to see it again.
2. In your terminal, set the two variables (Mac/Linux `bash`/`zsh`):

```bash
export OPENAI_API_KEY="paste-your-portal-key-here"
export OPENAI_BASE_URL="https://ddls-portal-6228434e.svc.hypha.aicell.io/v1"
```

On Windows PowerShell:

```powershell
$env:OPENAI_API_KEY = "paste-your-portal-key-here"
$env:OPENAI_BASE_URL = "https://ddls-portal-6228434e.svc.hypha.aicell.io/v1"
```

The portal serves **one** model, **`gpt-5.6-luna`** — that's the model name to use if your
agent asks for one (most default to whatever `OPENAI_BASE_URL` offers). A full lab's worth
of calls costs only a few cents against your budget, so don't ration your prompts — but do
keep an eye on the usage meter on your portal dashboard.

3. Start the agent in the folder you'll work in:

```bash
codex        # if you chose Option A
# or
pi           # if you chose Option B
```

Ask it something small first — "list the files in this folder and tell me what you see" —
to confirm it's talking to the portal before you hand it the real task.

> If the agent errors on the model or endpoint, check that `OPENAI_BASE_URL` ends in `/v1`
> and that you're in a **new** terminal where the `export` actually took effect. Ask a TA
> if it persists.

## Part 4 — Direct the agent to solve the problem

Now you have a briefed analyst and a real problem. Time to build.

1. **Download the dataset** from the portal into your working folder.
2. Put your `AGENTS.md` and `spec.md` in the **same folder** so the agent reads them.
3. Point the agent at the task and let it work — then iterate.

**How to prompt (build the smallest thing that works first):**

- Ask it to **explain the data back to you** before it analyses anything: "Load the data,
  and tell me what you actually see — shapes, columns, ranges, anything surprising."
  Compare that to what the interview told you. Mismatches here are gold.
- Start with **one slice** — one file, one group, a stupid baseline — end to end, *before*
  good. Get a full pipeline running, then improve it.
- When it goes off track, don't argue in chat — **fix the file**. If it keeps forgetting a
  rule, that rule belongs in `AGENTS.md` or `spec.md`, not in the conversation (the chat
  gets compacted away; the files don't).
- Read the code where the data is **filtered and joined**. That's where silent errors live.
- **Profile your controls before you rank anything.** If the data has known controls or was
  collected in batches (plates, days, machines, patients), have the agent show you those
  controls *across every batch* first. If a control that should read the same everywhere
  doesn't, you've found something that will contaminate every comparison downstream — deal
  with it before you trust a single "hit".

## Part 5 — Validate & verify (think like a scientist)

**Code that runs is not code that's right.** The agent is an unreliable instrument that
will happily report a beautiful p-value driven entirely by a batch effect, and *nothing
will turn red*. You already know how to handle an unreliable instrument — point those
habits at this one.

Run controls. Don't trust a result until it survives them:

- **Shuffle the labels.** Re-run with the group labels randomly permuted. The effect should
  **vanish**. If it survives, you have a leak.
- **Beat a dumb baseline.** Mean predictor, majority class. If your clever analysis can't
  beat "always guess the average", something is off.
- **Check the split.** Is the same sample / batch / patient on both sides of your
  comparison? That's the classic disaster.
- **Ask it to argue against itself.** "Give me three reasons this result is an artefact."
  Then go check whether any of them bite.

Also sanity-check the obvious: do the numbers have the right order of magnitude? Did any
rows get silently dropped in a join? Does the effect hold if you remove one group?

**Design at least one test of your own** — a criterion you decide *in advance* that the
result must pass to be believable — and write it into `spec.md`. Then iterate: fix, re-run,
re-check.

## Part 6 — Produce results and a short report

Once the analysis survives your controls, produce the deliverable:

- Have the agent train/run whatever models are needed and **generate the plots** the data
  owner asked for.
- Write a **short report**: the question, what you built, what you found, the controls you
  ran, and — crucially — **what you would *not* claim**.

Two non-negotiables (they are the course AI policy):

- **Own every number.** If a figure in your report is wrong, it's wrong under *your* name.
  "The agent said so" is not a methods section. Check every number you report.
- **Disclose the AI use.** Say how you worked and attach your chat history. Use is expected;
  hiding it is not.

## Part 7 — Prepare your seminar presentation

At **Friday's seminar (10:00–12:00)** we draw presenters **at random**, and everyone must
be ready. Format: **7 minutes + 3 minutes discussion.** You present the work from *this*
lab:

- **The problem** — what the data owner actually wanted (the question behind the question).
- **What you built** — how you translated it and directed the agent.
- **A critical read of the method** — where it could be wrong, what you checked, what you
  refused to claim.
- **What the literature says** — how others have approached this kind of problem.

Being drawn with nothing prepared is a fail for that seminar. It exists so that **everyone**
spends Thursday thinking critically about their own work.

## What to hand in — and what we look at

Your submission is your **transcript plus your report**:

- **The interview transcript** (your conversation with Agent A) — downloaded from the
  portal.
- **The analysis transcript** (your conversation with Agent B) — the chat history from your
  local agent.
- **The report** (AI-assisted, checked by you), with `AGENTS.md` and `spec.md` alongside.

This lab is graded **pass/fail**. And the thing that changes how you should work all
term: **we read the transcript.** Specifically, we read it for —

- Did you find the **question behind the question**?
- Where did you **refuse** what the agent handed you?
- What did you **check**, and what did you take on faith?

A polished result on top of a transcript that shows no steering and no skepticism is not a
pass. A modest result with a transcript that shows real interviewing, translation and
verification is exactly what we're after.

---

Stuck during the lab? First try sharpening your prompt — that's the skill. Still stuck?
Ask a TA with a concise summary: what you tried, what you expected, what happened. Good luck,
and have fun — this is the job.
