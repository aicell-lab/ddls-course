---
title: "Computer Lab 3: Interview an Omics Data Owner, Direct an Analyst on Molecular Data"
linkTitle: "Computer Lab 3"
summary: ""
weight: 10
type: book
---

Welcome to the third computer lab. You run the **exact same job** as weeks 1 and 2 — the
**forward-deployed scientist**: take someone else's biological problem, interview them until the
question is precise, and come back with a working, checked answer, with an AI agent doing the
labour and you supplying the judgement. What changes this week is the data — it is now
**high-dimensional molecular tables (omics)**, sometimes paired with a **biological network** —
and, more importantly, the **bar goes up in a specific way**: this week the obvious pipeline
produces a number that looks *great* and is *misleading*, and the data owner is **excited about
exactly the wrong thing**.

You still talk to **two** agents, and you are still the only link between them:

- **Agent A — the omics data owner.** A simulated researcher who owns a real molecular dataset and
  a real clinical or biological question — and who has already tried something and is proud of the
  result. You **interview** it. It answers a good question honestly and a vague one uselessly, and
  it will happily confirm the flashy finding it likes. It will **not** tell you what's wrong with
  it — that's your job.
- **Agent B — the analyst.** Your local coding agent, **Pi**, which starts as an *empty folder*.
  You **configure** and **direct** it to establish an honest baseline, catch the trap, and return
  an interpretable shortlist you can defend.

Nothing passes between A and B except what **you** write down. That channel — you — is exactly the
skill being examined.

> **New to the toolchain? Do [Computer Lab 1](../../module-1/lab/) first.** This page assumes you
> already know the base Pi setup from weeks 1–2. If you joined this week, the full Pi install and
> gateway config is repeated in **Part 2** below so you can follow it standalone.

{{< toc >}}

## Suggested time budget

The lab runs **13:00–17:00 (4 hours)**. The table below is a **guide**, not a stopwatch: work at
your own pace, but **do not run past 17:00**, and treat the 15:45 switch to building as hard.

| Time | Duration | What you're doing |
|---|---|---|
| 13:15–13:30 | 15 min | Set up **Pi**, point it at the gateway, open the portal, generate your API key |
| 13:30–14:00 | 30 min | **Interview** the data owner (Agent A) — get the data facts *and* what they already tried |
| 14:00–14:30 | 30 min | **Translate**: have Pi draft `AGENTS.md` / `spec.md`, **review them by hand**, then have **Pi set up the Python environment** |
| 14:30–15:45 | 75 min | **Direct** the analyst with the recipe: **baseline first**, then a model, then the **trap check** — and the interpretable shortlist |
| 15:45–16:45 | 60 min | **Build your deliverable** — the FastAPI + Tailwind results dashboard; open it and check every number |
| 16:45–17:00 | 15 min | Write the short summary and **gather your submission** folder |

> **Treat 15:45 as a hard switch: stop analysing and build the dashboard** — whatever state your
> analysis is in. A checked partial result you can *show* beats an unfinished perfect one. In our
> own timed run the whole analysis loop (draft → baseline → model → trap check) took the agent
> **about a minute of work and roughly $0.025** — the clock goes to *your* thinking, reviewing and
> checking, not to waiting on Pi. Reserve the last stretch for the dashboard and the summary; that
> is what you present on Friday.
>
> **Seminar preparation is separate.** You prepare the seminar *later* — on Thursday, ~30–45
> minutes — not inside these four hours (see the [Seminar 3](../seminar/) page). Don't try to build
> slides today.

## Learning goals

By the end of this lab you should be able to:

- Run a structured **interview** with an *omics* data owner, surfacing not just the data facts
  (what the rows and columns are, the label, the covariates) but **what the owner already tried and
  is proud of** — because that is usually where the trap lives.
- Reuse **Pi**, your local analyst agent, pointed at the course portal.
- **Translate** the interview into an `AGENTS.md` (the brief) and a `spec.md` (every detail: the
  decision, the data dictionary, the metric, the baseline, and the trap to check) — and **review
  them by hand** before you run anything.
- Direct the agent with the **escalated prompt recipe** — the same four-part recipe as weeks 1–2,
  now with two new clauses: **BASELINE FIRST** and **TRAP CHECK**.
- **Establish an honest baseline before any model**, and report *how much a model really beats
  trivial* — not the headline number in isolation.
- **Catch a planted trap** (a single dominating feature, a confounder / batch leakage, a
  gene-length artefact, a network-hub / study-bias artefact) and report the **humble true answer**
  even when it disappoints the owner.
- Deliver an **interpretable, actionable shortlist** (the genes or pathways a wet-lab client could
  actually pursue), with the one caveat stated plainly — in a small **deployable dashboard**
  (FastAPI + Tailwind) built as an **interrogation instrument**: baseline next to model, a
  feature-importance / contribution matrix, and an interactive gene-network or drill-down view you and
  Friday's audience can *probe*, not just read.
- Write a **structured, professional report** that leads with the answer, states every number next to
  its baseline, names the trap and the humble truth, and discloses the AI use — the document you'd
  actually hand a client.

> **What "good" means today.** The win is **completing the whole loop once** — interview →
> translate → baseline → model → trap check → shortlist → dashboard — with a result you actually
> checked and can *defend*. **A modest, honest answer that survives the trap check beats an
> impressive number that doesn't.** The skill on trial is whether you can tell the difference.

### The one rule: it must be someone else's problem

As every week, you work **Agent A's** problem, not your own. With omics this matters even more:
when the biology is already familiar, you *know* which gene "should" come out on top, so you never
ask whether the pipeline is finding it for the right reason — you just nod at the famous name and
ship it. Being the outsider forces you to ask *"how many patients is that gene actually mutated in?
would one gene alone do just as well? is that accuracy real or is a batch leaking the label?"* Do
not use your own omics data.

### The raised bar this week: the number that's too good to be true

Weeks 1–2 had no clean ground truth, so the skill was *constructing* a defensible check. This week
is different and harder. The naive pipeline your owner is excited about produces an **impressive
but misleading** result:

- a classifier hits **~95%** — but a **single gene** alone hits the same, so the fancy model adds
  nothing and just risks overfitting;
- a cancer-vs-normal accuracy looks spectacular — because **batch is confounded with the label**,
  not because the biology is strong;
- a mutation ranking's top genes are **the longest genes in the genome** (they collect passenger
  mutations by sheer size), not the drivers;
- a "sophisticated" network ranking just re-surfaces the **most-studied hub genes** and buries the
  real low-frequency drivers.

Your owner will be **confidently wrong** — proud of the flashy result, and unable to see the trap.
The examined skill climbs to three things: **(1)** establish an honest baseline *before* any model
and say how much better than trivial the result really is; **(2)** catch the trap and report the
humble true answer; **(3)** hand back an interpretable shortlist the owner can act on. That is the
whole lab.

## Access the portal

Everything for today lives behind one course portal. It hosts Agent A (the omics data-owner
chatbot), issues the **API key** your local analyst agent will use, and lets you **download** both
the dataset and your interview transcript.

{{< cta cta_text="Open the course portal" cta_link="https://ddls-portal-6228434e.svc.hypha.aicell.io" >}}

**Already activated?** Just **Sign in** with your email and password. **First time?** Choose
**Activate account**, enter the email you registered with plus the course code we sent you, and set
a password. If the email or code is not recognised, tell a TA in the chat — don't burn lab time on
it.

What the portal gives you (the same four things as every week, now for omics data):

- **Chat with the data owner** (Agent A) — your interview happens here, in the browser.
- **Download your interview transcript** — the full chat, to feed into Part 3.
- **Generate an API key** — for your local analyst agent (Part 2), on your **dashboard**.
- **Download the dataset** — the real data file(s) Agent A is talking about.

> **You are assigned one data owner.** As in Week 2, the portal gives you **one** owner with one
> dataset and one problem — you might get a gene-expression cohort with a clinical label, or a
> tumour mutation table with a gene-interaction network. Work the one you're given; you don't
> choose, exactly as a real client lands on your desk.

## Part 1 — Interview the omics data owner (Agent A)

> **⏱ 13:30–14:00 · finish interviewing by 14:00.** (Kick off the Part 2 setup first, at 13:15 —
> Pi installs and the dataset downloads while you interview.)

Open the **chat with the data owner** in the portal. Agent A is playing a researcher who has a
molecular dataset, a real question, and **something they already tried and like**. Your job is to
**steer a conversation** until you could hand the whole thing to someone who has never seen this
data — *and* until you understand the thing they're proud of well enough to check it.

> The entire chat is **logged server-side** — there is no separate "submit interview" step. But at
> the end, **download the transcript**: you need it for Part 3, and the analyst reads the
> transcript, never your notes.

**The two coaching helpers work exactly as in weeks 1–2.** On every message you send there is a
**wand — "Coach me"** (hints on how your question could have been sharper — never a rewrite; use it
early and often) and a **pencil — "Edit"** (pull the message back, rephrase, and get a fresh
answer). Beside the Send button there is a second **wand** (💡 lightbulb, the "suggest a question"
helper) that proposes questions aimed at the gaps you haven't covered — suggestions are **free**, so
press it whenever you stall. For the full explanation see
[Part 1 of Computer Lab 1](../../module-1/lab/#part-1--the-interview-agent-a).

### This interview is harder than weeks 1–2 — raise your game

Weeks 1–2 taught you to make a vague brief definite. This week the owner is not just vague — they are
**confidently wrong**, and a warm, cooperative owner who *sounds* certain is the hardest kind to
interview. Three techniques move you up a level:

- **Funnel, don't wander.** Open wide ("walk me through the data and what you're trying to decide"),
  then narrow on the one thing that decides the analysis — the label, the covariates, and *the number
  they're proud of*. Every follow-up should make something that was fuzzy definite. If a question
  doesn't remove an ambiguity, don't ask it.
- **Mine the pride, don't share it.** The owner's favourite result is your single best clue to the
  trap — so get them to describe it in full (method, top genes, the exact accuracy) **without tipping
  them off** that you doubt it. If you telegraph "that sounds like a batch effect," a good owner just
  gets defensive; a real one wouldn't know the term anyway. Ask *what* they did and *why they trust
  it*, and keep your diagnosis to yourself.
- **Play it back.** Before you leave the chat, say the whole thing back in two sentences — "so you
  want a shortlist of ~15 genes for a CRISPR screen, ranked so the famous-but-rarely-mutated ones
  don't crowd out the real drivers" — and let them correct you. A playback that the owner signs off on
  is the strongest evidence your interview actually landed, and the teaching team reads for it.

### The checklist: what to pin down with molecular data

A spreadsheet of omics is not self-explanatory. The same table can be expression or mutations,
log-scaled or raw, one cohort or five batches — and the analysis is completely different in each
case. Walk the checklist below; if you cannot answer a group afterwards, you have not finished the
interview.

**THE DATA**
- What **kind of measurement** is each number — gene **expression** (continuous, often log2), a
  **binary mutation** call (mutated / not), something else?
- What are the **rows** (patients? tumours? samples?) and the **columns** (genes? features?), and
  **how many of each**?
- Is there a **label / target column** — and what exactly is it (ER status, cancer vs normal, a
  subtype)? How is it encoded?
- What **other columns** ride along — clinical covariates (hospital, grade, age), a **batch / study
  identifier**, a processing date? *(These are where confounders hide.)*

**THE QUESTION**
- **What decision hangs on the answer?** (As always: if nothing changes, it isn't yet a question
  worth analysing.) Do they need a **prediction** (does this tumour read ER+?) or a **ranked
  shortlist** (which genes should my collaborator knock out)?
- **How will the answer be used and by whom** — a tumour board, a wet-lab CRISPR screen, a paper? A
  shortlist for a **costly experiment** must be *short and trustworthy*, not long.

**WHAT THEY ALREADY TRIED — ask this explicitly**
- **What have you done with this so far, and what did you find?** Owners this week have a favourite
  result. Get them to describe it: which method, which top genes, what accuracy.
- **Why do you trust it?** Their answer often *is* the trap ("I ranked by how connected each gene
  is", "the accuracy was 96%", "these are all famous cancer genes").

**GROUND TRUTH & TRAPS**
- Is there any **held-out truth** you can check a ranking against (a known driver-gene catalogue, a
  clinical gold standard)? Or is the label itself the only truth?
- Any **class imbalance** (one label far commoner)? A **dominant single feature**? Were samples run
  in **different batches / on different days / at different sites**? For gene rankings: were
  **gene length** or **how well-studied a gene is** ever accounted for?

> **Ask what the owner already did, and why they believe it.** Everything you were told will turn
> out to be slightly too good to be true — every time. Their pride in a result is the single best
> clue to where the trap is.

### Steering — every vague answer has one follow-up that fixes it

Assume nothing is defined until *you* have made it definite. When you get a hedge or a boast, ask
the one question that pins it down:

| What they say | What you ask back |
|---|---|
| "It's just some gene-expression data." | "Expression or mutation? How many samples and how many genes, and what's the label I'm predicting?" |
| "The model gets about 95% accuracy." | "95% against what baseline — and would a single gene alone get the same? What's the commonest class?" |
| "It separates cancer from normal really cleanly." | "Were all samples run in one batch, or several? Is any batch almost all one class?" |
| "I ranked the genes and the top ones are the famous cancer genes." | "Ranked how — by mutation count, or by network connectivity? And in how many patients is each of those top genes actually mutated here?" |
| "These are the most connected genes in the network." | "Connected in a network built from what? Could that just be the best-studied genes rather than this cohort's drivers?" |

## Part 2 — Set up Pi and grab your materials (start this FIRST, at 13:15)

> **⏱ 13:15–13:30 · be set up by 13:30.** Do this before Part 1, so Pi is ready the moment your
> interview ends. **You don't install the Python analysis packages here** — you'll direct **Pi** to
> do that in Part 3, once the interview tells you what the task actually needs.

**No GPU is needed.** This week's data are small tables — a few hundred samples by one to two
thousand columns, well under 2 MB. Everything runs on a laptop **CPU in seconds** with pandas +
scikit-learn. (If you take the optional *strong* path and train a real biologically-informed neural
network, that's heavier — see the note in Part 3 — but the required bar is CPU-only and fast.)

Create a working folder for this lab and open a terminal inside it — this is the empty room your
analyst agent will work in:

```bash
mkdir ddls-week3 && cd ddls-week3
```

**Download the dataset now** from this week's lab page in the portal into that folder. As every
week the download is deliberately bare: the numbers and nothing that explains them. Everything a
data dictionary *would* tell you — what the columns are, what the label means, which column is the
batch — has to come from your interview and from opening the file.

> **Your interview transcript comes later.** You download it from the portal at the **end of Part
> 1** (once you've actually interviewed Agent A) — it doesn't exist yet. Save it into this same
> `ddls-week3` folder so both the transcript and the dataset sit together for Part 3.

### Set up Pi (the analyst agent)

**Did [Computer Lab 1](../../module-1/lab/) or 2?** Your Pi still works — **nothing to change this
week** (the tables are read as text, so you don't need vision). Skip straight to
[Part 3](#part-3--configure-and-direct-the-analyst-agent-b--pi). **New this week?** Expand **Full Pi
setup** and do it once.

<details>
<summary><b>Full Pi setup</b> — expand only if you don't have Pi yet (new this week)</summary>

Your analyst agent is **Pi**, a lightweight coding agent. It runs **on your own machine** and talks
to the course model **through the portal gateway** — so every call counts against your portal
budget, and the teaching team sees the transcript. Pi reads an `AGENTS.md` context file and can run
code, read files and write output.

**1. Install Node.js 22+** (this also installs `npm`). Check first:

```bash
node --version
```

If that prints **22.0 or higher**, skip to step 2. Otherwise install the **LTS** build from
**<https://nodejs.org/en/download>** (Windows/macOS installer, or your distro's package manager on
Linux), then reopen the terminal. Node 18/20 is **not enough** — Pi needs 22+.

**2. Install Pi:**

```bash
npm install -g @earendil-works/pi-coding-agent
```

(Hit an `EACCES` permission error on macOS/Linux, or a "running scripts is disabled" error on
Windows? Both fixes are in [Computer Lab 1, Part 2](../../module-1/lab/#part-2--set-up-your-analyst-agent--grab-your-materials).)

**3. Point Pi at the DDLS gateway.** Pi ignores `OPENAI_BASE_URL`, so it needs a custom provider
file. Create `~/.pi/agent/models.json` with exactly this:

```json
{
  "providers": {
    "ddls": {
      "baseUrl": "https://ddls-portal-6228434e.svc.hypha.aicell.io/v1",
      "api": "openai-completions",
      "apiKey": "$DDLS_API_KEY",
      "models": [
        { "id": "gpt-5.6-luna", "reasoning": false, "input": ["text"],
          "samplingParams": { "reasoning_effort": "none" } }
      ]
    }
  }
}
```

> The `samplingParams` line is **required** — it's what lets the course model use tools. Don't try
> to set `OPENAI_BASE_URL`; Pi won't read it. (Did Week 2? Your file may say
> `"input": ["text", "image"]` — that's fine, leave it; this week's data is tabular so vision isn't
> needed either way.)

<details>
<summary><b>How to create that file — per system</b> (the folder starts with a dot, which trips up every file manager)</summary>

Pi always looks in a `.pi` folder inside your home folder — **including on Windows**, where the full
path is `C:\Users\<you>\.pi\agent\models.json`.

**Windows (PowerShell):**
```powershell
mkdir -Force "$env:USERPROFILE\.pi\agent"
notepad "$env:USERPROFILE\.pi\agent\models.json"
```
Notepad asks *"Do you want to create a new file?"* — click **Yes**, paste, then **Ctrl + S**. Don't
create the folder in File Explorer (it refuses names starting with a dot), and don't use *Save as* —
that would save it as `models.json.txt`.

**macOS:**
```bash
mkdir -p ~/.pi/agent
touch ~/.pi/agent/models.json
open -e ~/.pi/agent/models.json
```
The `touch` line matters: `open -e` refuses a file that doesn't exist yet. TextEdit opens it —
paste, **⌘ S**, close. (`~` is your home folder; Finder hides it — press **⌘ ⇧ .** to see it.)

**Linux:**
```bash
mkdir -p ~/.pi/agent
nano ~/.pi/agent/models.json
```
Paste, then **Ctrl + O**, **Enter** to save and **Ctrl + X** to quit.

**Prefer an editor you already use?** `code ~/.pi/agent/models.json` opens it in VS Code on any OS.
Or, on macOS/Linux, write the whole file in one go with a heredoc (the quotes around `JSON` keep
`$DDLS_API_KEY` literal):
```bash
mkdir -p ~/.pi/agent
cat > ~/.pi/agent/models.json <<'JSON'
{
  "providers": {
    "ddls": {
      "baseUrl": "https://ddls-portal-6228434e.svc.hypha.aicell.io/v1",
      "api": "openai-completions",
      "apiKey": "$DDLS_API_KEY",
      "models": [
        { "id": "gpt-5.6-luna", "reasoning": false, "input": ["text"],
          "samplingParams": { "reasoning_effort": "none" } }
      ]
    }
  }
}
JSON
```

**Confirm it's really there** before moving on — this should print the JSON back:
```bash
cat ~/.pi/agent/models.json                          # macOS / Linux
```
On Windows PowerShell: `Get-Content "$env:USERPROFILE\.pi\agent\models.json"`.

</details>

**4. Save your portal API key to a `.env` file.** Generate a key in the portal (**Generate API
key** on your dashboard). **The portal shows the key only once**, so save it immediately. Inside
your `ddls-week3` folder, create a file called `.env` with a single line:

```
DDLS_API_KEY=paste-your-portal-key-here
```

> **Key hygiene.** Treat this key like a password: never commit it or share it. Add `.env` to
> `.gitignore` (`echo ".env" >> .gitignore`). On Windows, create the file with
> `Set-Content .env "DDLS_API_KEY=paste-your-portal-key-here"` (File Explorer refuses dot-files).

**5. Load the key before every Pi run** — each time you open a new terminal:

- **macOS / Linux (bash / zsh):**
  ```bash
  set -a; source .env; set +a
  ```
- **Windows PowerShell:**
  ```powershell
  Get-Content .env | ForEach-Object { if ($_ -match '^\s*([^#][^=]*)=(.*)$') { [Environment]::SetEnvironmentVariable($matches[1].Trim(), $matches[2].Trim()) } }
  ```

**6. Run Pi** from your working folder:

```bash
pi --provider ddls --model gpt-5.6-luna
```

Ask it something small first — "list the files in this folder and tell me what you see" — to confirm
it's talking to the portal. Pi can read/write files and run shell commands in that folder. It has
**no built-in web search**. Keep an eye on the usage meter on your dashboard.

</details>

> **You haven't installed the Python analysis packages yet — that's deliberate.** In Part 3 you'll
> direct Pi to set up the environment (with `uv`) and install exactly what your task needs. For now,
> just confirm Pi runs and can see your transcript and dataset.

## Part 3 — Configure and direct the analyst (Agent B / Pi)

> **⏱ 14:00–15:45 · finish directing by 15:45.** Steps 1–4 (draft, review, set up the environment)
> by ~14:30; Step 5 (direct the analysis) 14:30–15:45. At **15:45 you stop analysing**, whatever
> state you're in, and move to Part 5.

This is where the real skill lives, and it is the **way of working you reuse every week of the
course**: you don't do the analysis — you **direct** an agent to do it and you **judge** what comes
back. Same shape as weeks 1–2 (an empty folder → `AGENTS.md` + `spec.md` → run Pi). Work through the
steps in order.

### Step 1 — Get your inputs in the folder

You already have both: your **interview transcript** (downloaded at the end of Part 1) and the
**dataset** (downloaded in Part 2), sitting together in your `ddls-week3` folder, with Pi able to
see them. Nothing else.

### Step 2 — Draft `AGENTS.md` and `spec.md` *with* Pi

Launch Pi and have it read the transcript and the files and draft both, so you start from a real
draft, not a blank page:

```text
Read my interview transcript (the .md file in this folder) and look at the data file(s). From ONLY
what the transcript and the files actually show, write two files, then stop — do not analyse
anything yet:

1. AGENTS.md — how you operate here: the environment (use uv — create it with `uv venv` and run all
   Python with `uv run`, which works the same on every OS), where the data lives and how to load it,
   where to write outputs (results/), and the rule that every number you report must be checked
   against an honest baseline before you trust it.
2. spec.md — the problem: the exact decision the owner needs, the data (rows, columns, what the
   label is, which columns are covariates or a batch identifier), the metric, THE BASELINE to beat,
   what "done" looks like, and the single trap this result is most likely to hide.

Then give me a 3-line summary of what you wrote.
```

- **`AGENTS.md`** is the brief loaded every turn: the **GOAL** in a sentence or two, **where the
  data lives and how to load it**, the **MUST-NOTs** ("never report an accuracy without its
  baseline", "don't trust a raw ranking before checking the obvious artefact"), and a pointer to
  `spec.md`.
- **`spec.md`** is every detail: the rows and columns, the label and how it's encoded, every
  covariate and any **batch / study column**, the **metric and the baseline**, the trap to check,
  and what "done" looks like. It **is the data dictionary the download didn't come with** — you
  rebuild it from the interview and from opening the file.

### Step 3 — Review them by hand (the gate)

**This is the manual step that separates a pass from a fail.** The agent's draft is a *proposal*.
Read both files line by line and correct them **against the transcript and the actual file — never
from memory.** Tick off:

- [ ] The **goal** is the owner's real decision (a trustworthy shortlist / a defensible prediction),
      not "train a classifier" or "rank the genes".
- [ ] The **label** and every **covariate** are named correctly, and any **batch / study column** is
      flagged — this is the one most likely to leak.
- [ ] There is an explicit **baseline** written down (majority class; single best feature; raw
      mutation frequency) — the thing your model must beat.
- [ ] The **trap** from the interview is named (a dominant single gene, batch confounding, gene
      length, network-hub / study bias) — whatever the owner was proud of.
- [ ] The agent hasn't invented an "owner-approved" accuracy threshold or a gene list the owner
      never gave.

Fix what's wrong, then move on. For the full translation method (review-as-prose, then split, then
iterate) see [Part 3 of Computer Lab 1](../../module-1/lab/#part-3--translate-build-agentsmd-and-specmd).

### Step 4 — Let Pi set up the Python environment (with `uv`)

You don't hand-install packages — **you direct Pi to set up the environment from the spec.** We use
**[uv](https://docs.astral.sh/uv/)**, a fast Python manager that behaves the **same on macOS, Linux
and Windows** and needs **no "activate" step** — you and Pi just prefix commands with `uv run`.
Paste:

```text
Set up the Python environment for this task using uv (install uv first if it isn't available; if
Python itself is missing, use `uv python install`). Create the environment with `uv venv`, then
`uv pip install` ONLY the packages your approach in spec.md actually needs — for a standard analysis
that's pandas, numpy, scikit-learn (and matplotlib if you'll draw a chart). Also install fastapi,
uvicorn[standard] and python-multipart for the results dashboard I'll build later. Verify each
package imports with `uv run python -c "import ..."`, and tell me exactly what you installed and why.
From now on, run all Python with `uv run` (e.g. `uv run python script.py`).
```

While it installs, re-read your `spec.md`.

> **Why uv?** A plain `venv` leaks OS differences (`.venv/bin` vs `.venv\Scripts`, `python` vs
> `python3`) and needs an activate step that doesn't survive an agent's separate commands. `uv run`
> sidesteps all of that. (Prefer not to install uv? `python -m venv .venv` still works; you'd just
> use `.venv/bin/python` — or `.venv\Scripts\python` on Windows — instead of `uv run python`.)

### Step 5 — Direct with the escalated prompt recipe

Now direct the analysis. Use the **same four-part recipe** as weeks 1–2 — this term and beyond —
now with **two new clauses** (BASELINE FIRST and TRAP CHECK) that carry this week's whole lesson:

> **GOAL** — one line. Point at the spec: *"answer the question in `spec.md`."*
> **METHOD (a direction, not an order) + humble fallback + optional HINT** — suggest an approach,
> then license the agent to overrule you: *"I suggest X; if that's a poor fit, say so and propose
> something better **before** you write code."* Add a **HINT** only where you know something it
> can't guess.
> **BASELINE FIRST** — *"Before any model, compute and report the trivial baseline — the
> majority-class accuracy and the single best feature alone, or the raw-frequency ranking. Only
> then fit a model, and tell me in plain numbers how much it actually beats the baseline. If it
> doesn't meaningfully beat it, say so."*
> **TRAP CHECK** — *"State the single biggest reason this result could be misleading — a dominant
> single gene, a confounder or batch leaking the label, gene length, network-hub / study bias —
> test it, and report the honest answer even if it's less impressive than the owner hoped."*
> **STOPPING CRITERION** — *"plan before you code; stop and show me once you have the baseline, the
> model's honest margin over it, the trap-check result, and the interpretable shortlist. Don't chase
> a bigger number past that point."*

**A paste-ready example** (this is an *expression-classifier* example — network-flavor students swap
the baseline to a raw-frequency ranking and the trap to gene length / network hubs; adapt the
method, hint and metric to **your** task and dataset):

```text
GOAL: Answer the question in spec.md — give a trustworthy, interpretable readout of the label from
the expression data, and the short list of genes that carry the signal.

METHOD (a direction, not an order): I suggest a regularised logistic regression with proper
cross-validation; if that's a poor fit here, say so and propose something better BEFORE you write
code. HINT: the label and the covariates are in named columns — do not use a covariate as a
feature; predict from the expression columns only.

BASELINE FIRST: before any model, report (a) the majority-class accuracy, and (b) the accuracy of
the single best gene alone (one column, simple threshold). Name that gene. THEN fit the full model
with held-out cross-validation and tell me, in accuracy points, how much it beats both baselines.

TRAP CHECK: state the single biggest reason the headline number could mislead, test it, and report
it honestly: is the whole signal riding on one dominant gene (compare one-gene vs all-genes CV)?
could a covariate like batch/hospital/grade be leaking the label (check the cross-tab)? are you
accidentally scoring on training data (use held-out CV, never resubstitution)?

STOPPING CRITERION: plan before coding; stop and show me the baseline table, the model's honest
margin, the trap-check finding, and the ranked gene shortlist. Don't chase a bigger number.
```

Make Pi **describe the data back to you first** (shapes, dtypes, the label balance, which columns
are covariates — mismatches with the spec are gold), **plan before it codes**, and **report the
baseline before the model**. When we ran exactly this recipe, the agent computed the majority-class
and single-gene baselines first, found the full model **did not beat the single gene**, and said so
plainly — then checked the obvious confounder and correctly reported it was *not* leaking — in about
a minute and for roughly $0.025. That honest "the model adds nothing over one gene" **is the pass**,
not a failure.

> **Direct in rounds — don't fire one giant prompt and walk away.** The skill this week is the
> *back-and-forth*, not the paste. Gate the agent at each stage and read what comes back before you
> let it go on:
>
> 1. **Data readback → you confirm.** Make it print shapes, dtypes and the label balance and *stop*.
>    If its picture of the data disagrees with your `spec.md`, one of you is wrong — resolve it now,
>    before any modelling.
> 2. **Baseline table → you confirm.** Only after you've *seen* the majority-class and single-feature
>    (or raw-frequency) numbers do you let it fit a model. Never let "the model" arrive before the
>    thing it must beat.
> 3. **Model margin → you push.** If it reports a big number, push back: *"beats what, exactly? show
>    me the held-out margin over the baseline, not the training score."* If it's small, that's your
>    finding — don't let the agent bury it.
> 4. **Trap check → you name it if it doesn't.** If the agent hasn't volunteered the single biggest
>    reason the result could mislead, tell it the one you suspect from the interview and make it test
>    that specifically.
>
> Each round is cheap (cents, seconds); the expensive resource is *your* attention. Spending it here —
> reading, disagreeing, re-directing — is exactly the examined skill.

### Analyst toolkit — method is your choice

The default below is deliberately light so the whole loop fits the afternoon on a laptop CPU. **But
the method is yours** — any approach that beats the honest baseline and survives the trap check is
valid, and a stronger one is encouraged if you have the time. What is *not* optional is the baseline
and the trap check.

- **Expression → interpretable classifier (default).** A regularised **logistic regression** or a
  small **random forest** (`scikit-learn`) on the expression columns, honest cross-validation, then
  read off the **coefficients / feature importances** for the gene shortlist. Baseline: majority
  class **and** the single best gene alone.
- **Mutation matrix + network → driver-gene ranking (default).** Rank genes by **recurrence**
  (patients mutated), **corrected for gene length**, then use the interaction network only to
  *corroborate*. Baseline: the raw-frequency ranking (or the owner's network-degree ranking).
  Metric: precision against a known driver catalogue if one ships, otherwise a sanity-check against
  well-known biology.
- **(Strong, encouraged) A real biologically-informed neural network.** If you're on the expression
  flavour and ahead of the clock, you can build an interpretable **BINN** — a network whose
  architecture *is* a pathway graph (Reactome), read out with **SHAP** to see which genes and
  pathways drive the prediction. That is exactly this module's lecture made runnable. Last year's
  lab is a complete, working starting point — the `binn` Python package and a Colab notebook:
  [open the 2025 BINN notebook in Colab](https://colab.research.google.com/github/aicell-lab/ddls-course/blob/main/static/notebooks/ddls-2025-module-5-computer-lab.ipynb).
  **Honest caveat:** training a BINN is heavier than the default and can eat your afternoon on a
  laptop — it is a strong path, not the bar. **It still has to beat the honest baseline**, or the
  humble one-gene answer wins.
- **(Strong, encouraged) Graph machine learning on the network** (network flavour) — a
  network-propagation or graph score that spreads mutation evidence over the interaction graph.
  Same rule: it must **beat** the length-corrected recurrence baseline, or ship the simpler ranking.

Emphasis: the point is **not** a fancy model. It is that you **established an honest baseline, caught
the trap, and returned a shortlist you can defend** — with whatever method does that best.

## Part 4 — Validate (the raised bar): the honest-baseline gate + the trap check

> **⏱ No separate slot — do this *inside* Part 3's Direct block (14:30–15:45).** Validation is part
> of directing the agent, not a step you bolt on afterwards.

**A number that looks good is not a number that's right.** This week the bar is explicit — you must
do **all four** of these, and the first two are what make this week harder than last:

1. **Report the honest baseline, before the model.** The majority-class accuracy and the single-best
   feature (expression) or the raw-frequency ranking (mutations). A model's number means nothing
   until it is stated **next to** the trivial number it must beat. *This is this week's version of
   Week 2's vision check: the gate you cannot skip.*
2. **Run the trap check and report the humble truth.** Name the single biggest reason the result
   could mislead — a dominant single gene, a batch/covariate confounder, gene length, network-hub
   bias — **test it**, and write down the honest answer even when it deflates the headline. "The
   fancy model doesn't beat one gene" and "leave-one-batch-out halves the accuracy" are **wins**, not
   failures.
3. **Show the model's real margin over the baseline**, in plain numbers — accuracy points, or
   precision@k against a driver catalogue. If the margin is small or zero, that *is* the finding.
4. **Name one biological caveat and how it could bias the result.** Class imbalance; a confounder
   you couldn't fully rule out; genes that act by amplification/expression rather than point
   mutation and so won't show in a mutation matrix; a study-biased truth set. Say concretely how it
   could push the number the wrong way.

If a check deflates the headline, that's a **finding, not a failure**: *"the owner's 95% is real but
one gene alone matches it, so I'd hand the board that single interpretable marker, not a black box"*
is a **stronger** outcome than a polished number you never interrogated.

> **You are the human in the loop — and in the final project, so is a real client.** No metric
> replaces a person asking "beats *what*, exactly?" That is why your deliverable in Part 5 puts the
> baseline **next to** the model and states the caveat in plain language: this week you are that
> sceptical reader; in the final project the data owner will be.

For the full five-family verification toolkit (smell test, triangulation, adversarial prompting,
show-its-work, controls), see
[Part 5 of Computer Lab 1](../../module-1/lab/#part-5--validate--verify-think-like-a-scientist).

## Part 5 — Build your deliverable: a results dashboard

> **⏱ 15:45–16:45 · start building at 15:45 no matter what; have the dashboard running by 16:45.**
> Build the **Core** app first; reach for **Strong** only if it's running and time is left.

Pi is a command-line agent — it returns numbers in a chat. But a forward-deployed scientist ships a
**thing the problem-owner can open and read**, where the honest baseline sits right next to the
headline and the shortlist is there to act on. So this week your deliverable is a small **deployable
web app** — a **FastAPI** backend serving your results, with a **Tailwind** frontend.

> **The dashboard is not decoration — it is an interrogation instrument.** Its first job is to help
> *you* interrogate your own result, and its second is to let the owner do the same. A number in a
> chat is easy to believe; the same number sitting next to its baseline, its per-gene contributions
> and the interaction network is where a shaky result gives itself away. Build it so that a sceptic —
> you first, the owner on Friday — can *see* whether the answer holds up, not just read that it does.

You **direct Pi to build it** and then **open it yourself and interrogate every panel.** There are two
tiers — do the **Core** first; reach for **Strong** only once Core runs.

**Core (required).** A FastAPI app that reads your analysis output from disk and shows, on one
Tailwind page:

1. the **headline** result;
2. an **honest baseline-vs-model** panel — the trivial number and the model's number side by side,
   with the real margin between them;
3. the **interpretable ranked shortlist** (top ~15 genes) with a **feature-importance / score bar
   chart**;
4. a **contribution matrix** — a compact heatmap of your top ~15 features against what they
   contribute, so a reader can *see the structure of the evidence*, not just a ranked list. For an
   **expression** task: genes (rows) × class or coefficient sign/magnitude (columns) — where each gene
   pushes the prediction, and how hard. For a **network** task: genes (rows) × the signals that put
   them on the list (columns: recurrence, length-corrected score, network support) — so it's obvious a
   gene earned its place on the cohort's own evidence and not on fame alone. This is the panel that
   turns "here's a list" into "here's *why* each one is on the list";
5. **the one caveat** — the trap — stated plainly.

It runs with `uvicorn app:app`.

```text
Package this work as a small deployable product so a human can READ and TRUST the results. Build a
FastAPI + Tailwind app in this folder:

- app.py (FastAPI) that reads results/results.json (and any CSV your analysis wrote) from disk — no
  database.
- A single-page Tailwind frontend at "/" (Tailwind via CDN) with:
  - a summary panel at the top: the headline result AND, right next to it, the baseline it must beat
    (majority class / single best gene / raw-frequency ranking) and the real margin between them;
  - the ranked gene shortlist as a table, each with its importance/score and a one-line reason;
  - a bar chart of the shortlist scores (a simple inline SVG or Chart.js from CDN is fine);
  - a contribution-matrix heatmap of the top ~15 features: for an expression task, genes × class /
    coefficient sign+magnitude (which way and how hard each gene pushes the prediction); for a network
    task, genes × the signals that ranked them (recurrence, length-corrected score, network support).
    Colour by contribution so the structure of the evidence is visible at a glance;
  - one plain-language caveat sentence — the trap — in a callout box.
- Use real inline SVG icons, not emoji.
- requirements.txt and a short README with the exact run command.

When done, tell me the exact command and port to run it, then stop.
```

Then run it and **look at your own work** (`uv run` uses the env Pi built — same command on every
OS; Pi will also tell you the exact command):

```bash
uv run uvicorn app:app --reload --port 8000    # then open http://localhost:8000
```

**Strong (encouraged, only after Core runs).** Each option below is an **interrogation tool** — it
lets a human *probe* the result interactively, not just look at it. Pick the one that fits your flavour:

- **Network flavour — an interactive network view.** Add a **[cytoscape.js](https://js.cytoscape.org/)**
  (from CDN) graph of your shortlist genes and their interactions, with the shortlist highlighted and
  the buried-but-rescued real drivers marked. Make it *interactive*: click a gene to see how many
  patients carry it, its length-corrected score and its network degree side by side — so a sceptic can
  poke the graph and confirm the ranking now reflects the cohort, not the study-bias hubs. The point is
  that someone can *catch you out* if a famous-but-rarely-mutated hub sneaked back onto the list.
- **Expression flavour — a per-patient / per-gene drill-down.** Click a gene to see its expression
  split by the label (a small box/violin), or click a sample to see where it falls. This is the surface
  a clinician uses to sanity-check a call — and the surface *you* use to check whether the whole signal
  is riding on one gene: if hiding your top gene collapses the separation, this view shows it at a
  glance.

```text
Now add the strong tier — an interactive panel a sceptic can probe. [Network flavour:] add a
cytoscape.js view (from CDN) of my shortlist genes and their STRING interactions, highlighting the
shortlist and marking the real drivers the naive ranking buried; clicking a gene must show its patient
count, length-corrected score and network degree together. [Expression flavour:] add a detail view
where clicking a gene shows its expression distribution split by the label, and a toggle that recomputes
the headline separation with my top gene removed. Keep using Tailwind; no database — read from the
JSON/CSV my analysis already wrote.
```

> **On libraries:** cytoscape.js is a good, light choice for the network view and Chart.js for the
> bars — name them explicitly in the prompt if you want them, or let Pi propose the lightest thing
> that works. Either passes; don't burn the clock fighting a library.

**Deploying it (optional, if you're ahead).** Because it's a normal FastAPI app, it deploys like any
web service — a `Dockerfile` and `uvicorn`, or a free host. You don't have to deploy today, but
building it *deployable* is the point: this is the artifact you hand a client.

### The report — write it like you'd hand it to the client

The dashboard shows the result; the **report** is where you *explain and defend* it. This is the
document the owner (and, in the final project, a real client) actually reads to decide whether to trust
you — so this week we ask for more than Week 2's paragraph. Write a `report.md` (a page or two; the
agent can draft it from your `summary.md` and results, then **you** fix every line) with this structure:

1. **The question** — one or two sentences, in the owner's terms: the decision that hangs on this, and
   who acts on it. If a reader can't tell what changes because of your answer, start here again.
2. **The data** — what you were given (rows, columns, label, covariates, any batch/network file), in
   plain language. One line on anything that limited the analysis (a 400-patient subsample, a
   frequency-filtered gene set, ~100 genes that failed the length join).
3. **The honest baseline** — the trivial number *first*: majority-class accuracy, the single best
   feature, or the raw-frequency / network-degree ranking. State it before you mention any model.
4. **What you did and what it gave** — the method, and the result stated **as a margin over the
   baseline**, not in isolation ("the model reaches 96% but a single gene, ESR1, already reaches 95% —
   so the model adds ~1 point"). Numbers only; no adjectives doing the work.
5. **The trap and the humble truth** — name the single biggest reason the headline could mislead, say
   how you tested it, and give the honest answer even when it deflates the result. This is the section
   the teaching team reads most closely.
6. **The shortlist / recommendation** — the interpretable, actionable output (the ~15 genes, or the
   call), with a one-line reason each, and an explicit statement of how far it can be trusted.
7. **Caveats & next steps** — the one biological caveat, and what you'd check next given more time.
8. **AI-use disclosure** — which agent did what, what *you* verified by hand, and a pointer to the
   attached transcripts.

**Hints for a report that reads as professional, not AI-slop:**

- **Lead with the answer, then support it.** A busy owner reads the first paragraph and the shortlist;
  everything else is there to be checked. Don't bury the finding under method.
- **Every number carries its comparator.** "96%" means nothing; "96% vs a 95% single-gene baseline"
  means everything. Never let a bare number stand alone.
- **Say the uncomfortable thing plainly.** "The fancy model adds nothing over one gene" is a *stronger*
  report than a polished number you never interrogated — write it in the owner's language, without
  hedging.
- **Cut the filler.** Strike "it is important to note", "leveraging", "in the realm of", empty
  transitions and restated headings. Agents pad; you trim. A tight page beats a padded three.
- **Reference the figures.** Point at your dashboard panels ("see the baseline-vs-model panel", "the
  contribution matrix shows GATA3 and MAP3K1 carrying the signal") so the prose and the app agree.
- **No fake precision, no invented citations.** Round honestly; if you name a driver catalogue or a
  paper, it must be real (a plausible DOI is not a real one — the course AI policy).

The two course non-negotiables still apply: **own every number** (if it's wrong, it's wrong under your
name) and **disclose the AI use**.

## What to hand in — and what we look at

> **⏱ 16:45–17:00 · write the summary, gather the folder, and upload by 17:00.** Don't run past
> 17:00; seminar prep is a separate job on Thursday (see the [Seminar 3](../seminar/) page).

Your submission is your **transcript(s) plus your analysis and your deliverable**:

- **The interview transcript** (Agent A) — downloaded from the portal as Markdown (`.md`).
- **The analysis transcript(s)** (Agent B / Pi) — Pi records each run as `.jsonl` under
  `~/.pi/agent/sessions/` (on Windows `C:\Users\<you>\.pi\agent\sessions\`). Hand in **either** the
  raw `.jsonl` **or** a readable `.md` / `.txt` log — we accept all three, and prefer a readable
  Markdown version. Include one per run if you launched Pi more than once. Include the analysis
  **code** Pi wrote.
- **Your app** — the deliverable folder (`app.py`, any templates/static, your `results/` with
  `results.json`, `requirements.txt`, and the short README), **zipped into a single `app.zip`** (the
  **App** button takes one `.zip`).
- **The report** — the structured write-up from Part 5 (`report.md`): question, data, honest baseline,
  what you did and its margin, the trap and the humble truth, the shortlist, caveats, and AI-use
  disclosure.
- **`AGENTS.md`** and **`spec.md`** — the brief and the spec you wrote.

**How to submit — all in the portal.** Open your week in the
[course portal](https://ddls-portal-6228434e.svc.hypha.aicell.io/) and click **Hand in** (also on
each week card and at the top of the week page). The **Computer-lab** card has **one upload button
per file**, so each lands under the right name on our server. Put your **name** in the field at the
top, and a short **note to the teachers** if you like. Re-submit any time — we always grade your
most recent upload. Please also fill the short **feedback panel** (a few 1–5 sliders plus boxes for
ideas to improve the course and the portal) — it genuinely shapes what we do next.

> **Gather everything in one place.** Let the agent collect your files. Paste this into **Pi** at
> the end of your run:
>
> ```text
> Make a folder called submissions/ in my current working directory. Zip my app folder (app.py, any
> templates/static, results/, requirements.txt, README) into submissions/app.zip. Copy report.md,
> AGENTS.md and spec.md into submissions/. Then read every Pi session transcript from TODAY under
> ~/.pi/agent/sessions/ and, for each run, write a clean Markdown log of the whole conversation (my
> messages and your replies, in order) to submissions/analysis-transcript-1.md,
> analysis-transcript-2.md, … — plain readable text, not JSON. Finally, list exactly what you copied
> so I can check nothing is missing.
> ```
>
> Then download the **interview** transcript from the portal into the same `submissions/` folder,
> open the folder, and drag each file to its upload button.

**Deadline: Friday 10:00 CEST, before the seminar** — and you must submit **even if you can't
attend** the lab or seminar. The seminar deck is handed in separately via the **Seminar** card (see
the [Seminar 3](../seminar/) page). Missing a session with notice (email
[ddls-course@scilifelab.se](mailto:ddls-course@scilifelab.se) **before** the session) is excused; a
missing submission is not.

This lab is graded **pass/fail**, and — as all term — **we read the transcript.** We read it for:

- Did you find the **question behind the question** — including *what the owner already tried and why
  they trusted it*?
- Did you **establish the honest baseline before the model**, and did you **catch the trap**?
- Where did you **refuse** what the agent (or the owner) handed you, and report the humble truth?

A polished dashboard on top of a transcript that never questioned the flashy number is not a pass. A
modest result — "the model adds nothing over one gene", "the top genes were just the longest ones" —
with a transcript that shows real interviewing, an honest baseline and a caught trap is exactly what
we're after.

## Next: prepare for the seminar

Wednesday's lab produced the work; **Friday's [seminar](../seminar/) is where you defend it.**
Presenters are **drawn at random**, so everyone prepares. On Thursday (not squeezed into the lab):

1. **Understand your own results.** Be able to say — without notes — what your headline number is,
   **what baseline it beats and by how much**, the trap you checked, and the one caveat you'd flag.
   You own every number; the seminar is where you prove it.
2. **Build a short presentation** — a single self-contained **`slides.html`** deck **in your own
   visual style**, with your key visuals (the baseline-vs-model panel, the shortlist, the caveat)
   embedded right in the file. Your agent can draft it from your `report.md`; then you fix it. The
   [Seminar 3](../seminar/) page has the format, a style menu, and a paste-ready prompt.
3. **Submit `slides.html` before the seminar** via the **Seminar** card in the portal — **deadline
   Friday 10:00 CEST**, required even if you can't attend.
4. **Be ready to be presented.** If you're drawn, we show your submitted deck on screen and you talk
   to it, so it must stand on its own and advance with the **← / → arrow keys**.

{{< cta cta_text="Prepare for Seminar 3" cta_link="../seminar/" >}}

## Looking ahead: start lining up a real data owner for your final project

{{% callout note %}}
**Your final project needs a *real* data owner — start looking now.** The labs use simulated owners;
the final project does not. You'll take on a **real researcher's** biological question (someone else's,
never your own) and hand back an answer they can use. The strongest projects come from owners *you* help
us find — so get your team ready and start asking around now, before the pool fills.

**What you're offering a researcher** (use these numbers when you invite one): about **2 hours of their
time over ~3 weeks** — a **first 1-hour meeting** where they hand over the data and explain the question,
you **build for 2–3 days**, then a **second 1-hour meeting** where they tell you what's wrong; further
rounds are optional by agreement. They get back a **short report plus a runnable app / analysis code**.
**Every project gets an answer** — if nobody on the course is free to take one, the course's own AI
data scientist does.

**Know someone with a biological question and some data?** Send them the call, or use your **personal
invite link** — on your portal dashboard as `/data-owner?ref=<your-code>`. A project that signs up
through your link gives **you first claim** on it.

{{< cta cta_text="See the call for projects" cta_link="https://ddls.aicell.io/call-for-projects-2026/" >}}

**Owner sign-up deadline: Friday 25 September 2026.** Full final-project instructions (format,
deliverables, dates) will follow — this is your heads-up to line a data owner up early.
{{% /callout %}}

---

Good luck, and have fun — this is the job. Remember this week's hard line: **the number that's too
good to be true usually is.** Establish the baseline first, catch the trap, and hand back the humble
answer you can defend.
