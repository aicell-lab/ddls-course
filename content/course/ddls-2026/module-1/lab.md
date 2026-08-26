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

## Watch it first — the whole lab in about six minutes

Never opened a terminal before? Start here. This walkthrough is a real run of everything
below: activating the portal, interviewing the data owner, downloading the transcript and
data, installing and configuring Pi, and directing it at the problem — with **Windows,
macOS and Linux shown side by side** for every step that differs. Use the chapter buttons
to jump, or the **Show:** filter to keep only your own operating system on screen.

{{< htmlvideo src="/lab1-onboarding/" title="DDLS Lab 1 — the whole run-through" caption="Everything in it really happened: the interview is a real transcript from the portal, and in step 12 the agent really does catch the data owner being wrong. Names and keys are stand-ins." >}}

## Learning goals

By the end of this lab you should be able to:

- Run a structured **interview** with a data owner using the four probes
  (GOAL · DATA · WHAT YOU TRIED · WHAT DONE LOOKS LIKE), and steer vague answers into
  definite ones.
- Set up **Pi**, your local **analyst agent**, and point it at the course portal.
- **Translate** an interview transcript into two working documents: an `AGENTS.md` (the
  brief) and a `spec.md` (every detail, number, path and trap).
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

**You don't need to be a programmer.** You won't be writing the analysis — the agent does
that. Your job is to *read* what it produces and judge whether it's right, the way you'd
sanity-check any instrument you didn't build. If reading code is new to you, skim the
[prerequisites](../../prerequisites/) first — that's all the coding background this lab asks for.

**Bring a laptop you can install software on.** You will install a command-line agent and
generate one API key. If your machine is locked down, sort that out before the session —
not during it.

**Having an agent running already helps.** If you got a coding agent working after the
lecture, great — you'll reuse that muscle here. If not, Part 2 walks you through it from zero.

> **When you get stuck — and you will.** That's the lab, not a failure. Do this, in order:
> **first sharpen your prompt** — being stuck is usually the agent doing exactly what you
> asked, so re-read your own words and make them precise; that *is* the skill this course
> trains. **Still stuck? Ask a TA** in the chat with a concise summary — what you tried, what
> you expected, what happened. Don't burn lab time silently.

## Access the portal

Everything for today lives behind one course portal. It hosts Agent A (the data-owner
chatbot), issues the **API key** your local analyst agent will use, and lets you
**download** both the dataset and your interview transcript.

{{< cta cta_text="Open the course portal" cta_link="https://ddls-portal-6228434e.svc.hypha.aicell.io" >}}

> **Prefer to watch?** [Step 1 of the walkthrough](/lab1-onboarding/?c=2) shows activation end to end.

**First time — activate your account** (do this once):

1. Go to the portal at `https://ddls-portal-6228434e.svc.hypha.aicell.io` and choose **Activate account**.
2. Enter **the email you registered for the course with** and the **course code** we sent
   you by email.
3. **Choose a password** (and confirm it in the second box). That's it — you're in.

**Coming back later** (e.g. after closing the tab): use **Sign in** with the same **email +
the password you just set** — not the course code. The code is only for first activation.

If the email or code is not recognised, tell a TA in the chat — don't burn lab time on it.

What the portal gives you (four things, and only these):

- **Chat with the data owner** (Agent A) — your interview happens here, in the browser.
- **Download your interview transcript** — the full chat, to feed into Part 3.
- **Generate an API key** — for your local analyst agent (Part 2).
- **Download the dataset** — the real files Agent A is talking about (Part 2).

> **Where to find each:** the chat, the transcript and the dataset are all on **this week's
> lab page** inside the portal; the **API key** is generated on your **dashboard**
> (the landing page after you sign in).

## Part 1 — The interview (Agent A)

> **Prefer to watch?** [Step 2 of the walkthrough](/lab1-onboarding/?c=3) shows a real interview, three questions deep.

Open the **chat with the data owner** in the portal. Agent A is playing a busy scientist
who has data and a question but has not thought hard about either. Your job is not to fill
in a form — it is to **steer a conversation** until you could hand the whole thing to
someone who has never met this person.

> The entire chat is **logged server-side** — there is no separate "submit interview" step.
> But at the end, **download the transcript**: you need it for Part 3, and the agent reads
> the transcript, never your notes.

**Two buttons on every message you send.** Hover any of your own messages in the chat and a
small toolbar appears to its left — [watch it in step 4 of the walkthrough](/lab1-onboarding/?c=4):

- **The wand — "Coach me".** A *separate* coach reads your question in the context of the
  conversation so far and tells you how it could have been sharper. It gives **hints, never a
  rewrite** — the asking is the skill being examined, so it will not hand you the question.
  It costs a fraction of a cent and it is the only feedback you get before Friday's seminar.
  **Use it early and often, especially on your first two or three questions.**
- **The bin — delete from here.** Deletes that message *and everything after it*, from the chat
  **and from the data owner's memory**. So a vague question is not a permanent stain on your
  transcript: delete it, ask it properly, and get a genuinely fresh answer. (Budget already
  spent is not refunded, and the deletion cannot be undone.)

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

## Part 2 — Set up your analyst agent & grab your materials

Your analyst agent is **Pi**, a lightweight coding agent. It runs **on your own machine**
and talks to the course model **through the portal gateway** — so every call counts against
your portal budget, and the teaching team sees the transcript. Pi reads an `AGENTS.md`
context file and can run code, read files and write output.

By the end of this part you'll have four things ready: a **working folder**, your
**interview transcript** and the **dataset file(s)** saved inside it, and **Pi installed and
pointed at the portal** — everything you need before you translate (Part 3) and direct (Part 4).

{{< spoiler text="**Why Pi, and not Codex or another agent?**" >}}
We benchmarked Pi head-to-head against OpenAI's Codex CLI on a real week-1 task, both driven
through this exact course gateway. Three things decided it:

- **It works through our portal today.** Pi reaches the course model over the standard
  chat-completions API with a one-line config change. Codex needs a different API mode the
  course gateway doesn't serve, so it couldn't complete the task through the portal.
- **It's cheaper and faster.** Roughly **4× lower cost** per task and **~3× faster** in our
  test — which matters when a fixed budget has to stretch across six lab weeks and a project.
- **Quality was a wash.** Both produced a solid analysis and avoided the same traps.

**Use Pi for this course even if you already have Codex or Claude Code.** Pi is deliberately
**minimal** — a small, transparent surface — and that is exactly why it's the right tool for
*learning*: you can see what the agent is actually doing, which is the whole point here (the
skill is the harness and your judgement, not a heavyweight tool). Independent benchmarks of
coding agents on large, real codebases — see [Databricks' write-up](https://www.databricks.com/blog/benchmarking-coding-agents-databricks-multi-million-line-codebase) —
reinforce that agent choice genuinely matters and how to measure it; for the labs we simply
want the agent that keeps the mechanics visible.

**One model, on purpose.** The portal serves a single, deliberately small and cheap model,
`gpt-5.6-luna` — for two reasons. First, budget: every call is metered in real dollars against
your quota. Second, and more important, **a weaker model is the better teacher.** A powerful
model papers over a vague spec — it silently guesses what you meant, so you never find out
where your direction was ambiguous. On a small model, imprecise instructions produce visibly
wrong or subtly-off results, and *that* feedback is what trains the
specification-and-verification skill this course is about. Treat the weak model as a feature:
it makes the quality of **your** direction visible.

So the course standardises on Pi. The skill you're building — *directing and checking* an
agent — carries over to any agent; Pi is simply the one we support in the labs.
{{< /spoiler >}}

> **Prefer to watch?** Steps [5–10 of the walkthrough](/lab1-onboarding/?c=6) do this whole
> setup on Windows, macOS and Linux side by side — folder, terminal, Node, Pi, config file,
> API key, first run.

### Grab your materials and make a working folder

Make a folder for this lab (say `ddls-week1`) and, from **this week's lab page in the
portal**, download **both** of these into it:

- **Your interview transcript** — the full chat with Agent A, saved from the portal. This is
  what you'll translate in Part 3; the analyst reads the transcript, never your notes.
- **The dataset** — the real file(s) Agent A was talking about.

> **The download is deliberately bare — just the raw data file(s).** No README, no data
> dictionary, no column guide. That is exactly what a real data owner drops in your inbox:
> the numbers, and nothing that explains them. Everything a data dictionary *would* have told
> you — what each column means, its units, how missing values are marked, which fields to
> trust — has to come from **your interview transcript** and from **reading the file itself**
> (Part 4's first prompt below). That reconstructed knowledge is precisely what `spec.md` is
> for. If you find yourself wishing the download had a readme, go back to your transcript: the
> answer is either in there, or it's a question you didn't ask.

### Install and configure Pi

> **Never opened a terminal before? Start here — this assumes zero experience.**
> Pi is a program you run by typing commands into a **terminal**: a plain text window where you
> type instructions and press Enter instead of clicking buttons. You'll open it once and paste in
> the commands below — you won't be writing any code yourself.
>
> **Open a terminal:**
> - **Windows:** click the **Start** button, type `PowerShell`, and open **Windows PowerShell**.
> - **macOS:** press **⌘ Command + Space**, type `Terminal`, and press **Return**.
> - **Linux:** open your applications menu and search for **Terminal** (or press **Ctrl + Alt + T**).
>
> A window with a blinking cursor appears. To run a command, type (or paste) it and press
> **Enter / Return**.
>
> **Better: open it _inside_ your lab folder**, so you don't have to type any paths. Make the
> folder first (say `ddls-week1`), put both downloads in it, then:
> - **Windows 11:** right-click the folder ▸ **Open in Terminal**. (Windows 10: hold **Shift**,
>   right-click ▸ *Open PowerShell window here*. Or click Explorer's address bar, type
>   `powershell`, press Enter.)
> - **macOS:** right-click the folder ▸ **Services ▸ New Terminal at Folder**. It ships with
>   macOS but is **off by default** — turn it on in **System Settings ▸ Keyboard ▸ Keyboard
>   Shortcuts ▸ Services ▸ Files and Folders**.
> - **Linux (Ubuntu/GNOME):** right-click inside the folder ▸ **Open in Terminal**. Missing?
>   `sudo apt install nautilus-extension-gnome-terminal`.
>
> **Works everywhere, if none of that does:** open a terminal any way you like, type `cd` and a
> space, then **drag the folder into the terminal window** — the path types itself. On Windows,
> right-click the folder ▸ *Copy as path* and paste it after `cd `.
>
> Then work through the numbered steps below, in order — they're all copy-paste. Still stuck?
> Bring it to the start of the lab; the first part of the live session is exactly for getting
> everyone set up.

**1. Install Node.js** (this also installs `npm`, the tool that installs Pi). **Everyone needs
this** — Pi is an npm package, so without Node the next step fails. First check whether you
already have it:

```bash
node --version
```

If that prints **18.0 or higher**, skip to step 2. Otherwise install the **LTS** build:

- **Windows & macOS (easiest):** download the installer from **<https://nodejs.org/en/download>**
  — pick the **LTS** build (the page detects your system), run the downloaded file, and click
  through the defaults (an `.msi` on Windows, a `.pkg` on macOS).
- **macOS with Homebrew** (optional): `brew install node`
- **Linux:** use your distro's package manager — official commands per distro are at
  **<https://nodejs.org/en/download/package-manager/all>**.

Then **close and reopen the terminal** and confirm both tools are ready:

```bash
node --version
npm --version
```

Both should print a version number. Full official walkthrough: **<https://nodejs.org/learn>**.

**2. Install Pi:**

```bash
npm install -g @earendil-works/pi-coding-agent
```

**3. Point Pi at the DDLS gateway.** Pi ignores `OPENAI_BASE_URL`, so it needs a custom
provider file. Create `~/.pi/agent/models.json` with exactly this:

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

> The `samplingParams` line is **required** — it's what lets the course model use tools.
> Don't try to set `OPENAI_BASE_URL`; Pi won't read it.

<details>
<summary><b>How to create that file — per system</b> (the folder starts with a dot, which trips up every file manager)</summary>

Pi always looks in a `.pi` folder inside your home folder — **including on Windows**, where the
full path is `C:\Users\<you>\.pi\agent\models.json`.

**Windows (PowerShell):**
```powershell
mkdir -Force "$env:USERPROFILE\.pi\agent"
notepad "$env:USERPROFILE\.pi\agent\models.json"
```
Notepad asks *"Do you want to create a new file?"* — click **Yes**, paste, then **Ctrl + S**.
Don't create the folder in File Explorer (it refuses names starting with a dot), and don't use
*Save as* — that would save it as `models.json.txt`.

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
Paste, then **Ctrl + O**, **Enter** to save and **Ctrl + X** to quit. Pasting into nano is
usually **Ctrl + Shift + V**, not Ctrl + V.

**Prefer an editor you already use?** `code ~/.pi/agent/models.json` opens it in VS Code on any
OS. Or, on macOS/Linux, skip the editor entirely and write the whole file in one go with a
heredoc (the quotes around `JSON` keep `$DDLS_API_KEY` literal, which is what you want):
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
On Windows PowerShell: `Get-Content "$env:USERPROFILE\.pi\agent\models.json"`. If it errors or
comes back empty, the file didn't save where Pi looks — redo this step.

</details>

**4. Put your portal API key in the environment.** Generate a key in the portal (**Generate
API key** on your dashboard — copy it, you may not see it again), then:

```bash
export DDLS_API_KEY="paste-your-portal-key-here"
```

On Windows PowerShell:

```powershell
$env:DDLS_API_KEY = "paste-your-portal-key-here"
```

**5. Run Pi** from the folder you'll work in:

```bash
pi --provider ddls --model gpt-5.6-luna
```

Ask it something small first — "list the files in this folder and tell me what you see" —
to confirm it's talking to the portal before you hand it the real task. Pi can read/write
files and run shell commands in that folder. It has **no built-in web search** — if you need
the web, ask it to fetch pages with `curl`/`wget` via its shell tool. A full lab's worth of
calls costs only a few cents, so don't ration your prompts — but keep an eye on the usage
meter on your portal dashboard.

> If Pi errors on the model or endpoint, check that `~/.pi/agent/models.json` matches the
> block above exactly and that `DDLS_API_KEY` is set in the **same** terminal you launched
> `pi` from. Ask a TA if it persists.

## Part 3 — Translate: build `AGENTS.md` and `spec.md`

You have a transcript. It is human-shaped: hedged, out of order, full of throwaway
sentences (one of which is probably the whole problem). Now make it machine-shaped.

Do this drafting **inside Pi** — the analyst agent you just set up in Part 2. Your transcript
is already sitting in the working folder, so launch Pi there and have it **read the
transcript** and draft these documents; you then **review and correct** everything it
produces. Work *from the transcript*, never from memory.

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
"plate 3" lives. Nothing is too small. In effect, `spec.md` **is the data dictionary the
download didn't come with** — the one you rebuild from the interview and from opening the
file. Nobody hands it to you; you write it.

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

## Part 4 — Direct the agent to solve the problem

Now you have a briefed analyst, the dataset already sitting in your working folder, and a
real problem. Time to build.

> **Prefer to watch?** [Steps 11–12 of the walkthrough](/lab1-onboarding/?c=12) show the brief
> sitting next to the data, and the agent reading the data back — including the moment it
> catches a mistake in the spec.

1. Make sure your `AGENTS.md` and `spec.md` sit in the **same folder** as the dataset, so the
   agent reads them all together.
2. Point the agent at the task and let it work — then iterate.

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
  local agent. Pi saves each run as a `.jsonl` file under `~/.pi/agent/sessions/` (on Windows, `C:\Users\<you>\.pi\agent\sessions\`); if you ran
  Pi more than once, include them all.
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

Good luck, and have fun — this is the job. (Stuck? See
[**When you get stuck**](#before-you-start) up top: sharpen your prompt first, then ask a TA.)
