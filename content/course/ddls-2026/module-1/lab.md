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

## Watch it first — the whole lab in about six and a half minutes

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

> **What "good" means today.** The win is **completing the whole loop once** — interview →
> translate → direct → verify → report — with a result you actually checked. A modest answer
> you *verified* beats an ambitious one you never finished, every time. Don't chase a deep or
> perfect analysis: if you walk out with one clean, defensible result and a short report, you
> have passed the lab and you have something real to present on Friday. The skill on trial is
> how you **steer, translate and check** — not how sophisticated the analysis is.

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

**Install a code editor before the session — we recommend [VS Code](https://code.visualstudio.com/).**
This lab has you *looking at* files (the dataset, your transcript), *editing* two short text files
(`AGENTS.md` and `spec.md` in Part 3), and *typing commands*. VS Code does all three in one window:
a file tree on the left, an editor in the middle, and a built-in terminal at the bottom
(**Terminal ▸ New Terminal**, or `` Ctrl+` ``) — so you can run every command in this lab without
leaving the editor. Any editor works, but if you don't have a favourite, install VS Code and open
your lab folder with **File ▸ Open Folder**.

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

**Two buttons on every message you send.** Your most recent question keeps them visible;
on older ones they appear when you hover — [watch it in step 4 of the walkthrough](/lab1-onboarding/?c=4):

- **The wand — "Coach me".** A *separate* coach reads your question in the context of the
  conversation so far and tells you how it could have been sharper. It gives **hints, never a
  rewrite** — the asking is the skill being examined, so it will not hand you the question.
  It costs a fraction of a cent and it is the only feedback you get before Friday's seminar.
  **Use it early and often, especially on your first two or three questions.**
- **The pencil — "Edit".** Pulls that message back into the input box so you can rephrase it,
  and deletes it *and everything after it* from the chat **and from the data owner's memory**.
  So a vague question is not a permanent stain on your transcript: edit it, ask it properly,
  and get a genuinely fresh answer. Editing your **latest** question applies straight away;
  editing an **older** one asks you to confirm first, because every turn after it is lost.
  (Budget already spent is not refunded, and it cannot be undone.)

**Stuck on what to ask next?** There is a third wand **next to the Send button** —
[step 5 of the walkthrough](/lab1-onboarding/?c=5). It reads your interview so far and proposes
**two to four questions** aimed at the gaps you have not covered (goal, data, provenance, traps,
definition of done). Tap one and it drops into the input box — it is *not* sent, so rewrite it
in your own words first. **Suggestions are free**: they are not billed against your $5. Press it
whenever you stall.

> Don't confuse the two wands: the one **on a message** grades a question you already asked;
> the one **beside Send** proposes the next one.

### How a good interview flows

You're not filling in a form top to bottom — you're steering a conversation through five moves,
roughly in order. Twenty to twenty-five minutes of this and you'll have everything Part 3 needs.

1. **Frame it, then find the real decision.** Open by saying you're here to *understand the
   problem, not solve it live* — you're the apprentice, they're the expert. Then, before any data
   talk: *"What decision changes once you know the answer, and what happens if it comes back
   wrong?"* If nothing changes and nothing breaks, it isn't yet a question worth analysing — keep
   digging until you find the one that is.
2. **Turn the vague ask into one precise question.** Don't accept the headline ("we want to know
   if the treatment works"). Force a concrete, recent example: *"Tell me about the last time this
   came up — what did you actually look at?"* Pin down what counts as **one row**, what exactly is
   measured or compared, and over which population.
3. **Walk the data column by column.** For each field: what it literally means, its units, and —
   the part everyone skips — *how it was collected*. Provenance is where the traps hide. "Who
   typed this in, and when?" surfaces more problems than any other question.
4. **Hunt the traps and hidden constraints.** How are missing values marked? Did any definition
   change over time? Are there duplicates? How did rows *end up* in this set (selection bias)? And
   is there anything you're **not allowed** to do with the data?
5. **Play it back.** Say your whole understanding in a short paragraph — goal, question, data,
   traps, what "done" looks like — and let them correct you. That correction is usually the single
   most valuable minute of the interview.

The checklist below is *what you must walk away with*; the five moves above are *how you get there*.

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

> **Four ways an interview quietly goes useless — and the fix:**
> - **You accept jargon you didn't ground.** → Whenever a word is doing real work ("hit",
>   "positive", "clean"), ask *"what does that mean here?"* and get one concrete example.
> - **You start solutioning** ("I'll train a classifier that…"). → Stay in *their* world. You're
>   here to understand the problem; picking the method is Part 4's job, not the interview's.
> - **You ask leading questions** ("so data quality is the main issue, right?"). → Ask open, and
>   let *them* supply the framing. A leading question just gets your own guess echoed back.
> - **You skip how the data was made.** → Always ask how it was collected and what a blank or a
>   zero actually means. The answer is almost never "nothing".

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

> **Prefer to watch?** Steps [7–13 of the walkthrough](/lab1-onboarding/?c=folder) do this whole
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
> **Easiest — use VS Code.** If you installed VS Code (see *Before you start*), open your lab
> folder with **File ▸ Open Folder**, then open a terminal *inside it* with **Terminal ▸ New
> Terminal** (or `` Ctrl+` ``). You get the file tree, the editor, and a terminal already pointed
> at the right folder — all in one window, so you can skip the OS-specific steps below.
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

If that prints **22.0 or higher**, you're set — **skip to step 2**. Otherwise expand the
installer instructions for your system:

> **Node 18 or 20 is not enough — and it fails in a way that looks like something else.** Pi
> needs Node **22+**. On an older Node, `npm install` still "succeeds" (you'll see only an
> `EBADENGINE` *warning*, not an error), and then Pi dies on its first run with a message about
> `globSync` / `does not provide an export named 'globSync'`. If you see that, your Node is too
> old — upgrade to 22+ and reinstall Pi.

<details>
<summary><b>Install Node.js (LTS) — per system</b> (only if <code>node --version</code> is missing or below 22)</summary>

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

</details>

**2. Install Pi:**

```bash
npm install -g @earendil-works/pi-coding-agent
```

<details>
<summary><b>Got a permission error (<code>EACCES</code> / "permission denied") on macOS or Linux?</b></summary>

A global npm install can fail with `EACCES` because npm's default folder isn't writable by you.
**Don't `sudo npm install`, and don't reinstall Node from nodejs.org** — the `.pkg`/installer
puts Node back in the same protected location, so the error just comes back. Fix it properly by
pointing npm's global folder at your home directory:

```bash
npm config set prefix ~/.npm-global
export PATH="$HOME/.npm-global/bin:$PATH"      # add this line to ~/.zshrc or ~/.bashrc too
npm install -g @earendil-works/pi-coding-agent
```

(The cleanest long-term fix is a version manager like [nvm](https://github.com/nvm-sh/nvm),
which installs Node entirely inside your home folder and sidesteps the problem for good.)

</details>

<details>
<summary><b>Windows: <code>npm</code> won't run — "running scripts is disabled on this system"?</b></summary>

If `npm --version` (or `npm install`) fails with a red error about **`npm.ps1` cannot be loaded
because running scripts is disabled** (`UnauthorizedAccess` / `PSSecurityException`), PowerShell's
execution policy is blocking npm's script. Node is fine — you just need to allow signed scripts:

1. **Open Windows PowerShell as Administrator** — click **Start**, type `PowerShell`, right-click
   **Windows PowerShell** ▸ **Run as administrator**.
2. Run:
   ```powershell
   Set-ExecutionPolicy -Scope CurrentUser -ExecutionPolicy RemoteSigned
   ```
3. It asks you to confirm. **Type `Y` and press Enter** (on a non-English Windows the choice may be
   `S`/`Sì` or `J`/`Ja` — pick *Yes*; the default is *No*, so just pressing Enter does nothing).

Now `npm --version` prints a version number and `npm install -g @earendil-works/pi-coding-agent`
works. `RemoteSigned` only allows scripts you write locally plus signed ones from the internet — it
does **not** turn off Windows' script protection wholesale.

</details>

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

**Pick your operating system below:**

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

One-liner that creates the folder **and** the file and opens it for editing in one go:
```powershell
New-Item -ItemType Directory -Force "$HOME\.pi\agent" | Out-Null; New-Item -ItemType File -Force "$HOME\.pi\agent\models.json" | Out-Null; notepad "$HOME\.pi\agent\models.json"
```

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

**4. Save your portal API key to a `.env` file.** Generate a key in the portal (**Generate
API key** on your dashboard). **The portal shows the key only once**, so save it *immediately* —
if you lose it, your only option is to generate a fresh one. Inside your `ddls-week1` folder
(the working folder from earlier in this part), create a file called `.env` with a single line:

```
DDLS_API_KEY=paste-your-portal-key-here
```

No quotes are needed around the value. Saving it here — instead of just typing an `export` that
dies when you close the terminal — means you can re-load it every time without going back to the
portal (which won't show you the key again).

> **Windows: File Explorer won't let you name a file `.env`** (the same dot-file trap as the
> `.pi` folder). Create it from PowerShell instead — from inside your `ddls-week1` folder:
> ```powershell
> Set-Content .env "DDLS_API_KEY=paste-your-portal-key-here"
> ```
> (Or run `notepad .env`, click **Yes** to create it, paste the line, and **Ctrl + S**.)

> **Key hygiene.** Treat this key like a password: **never commit it or share it.** Add `.env`
> to your `.gitignore` so it can never be pushed to git — from inside the folder:
> ```bash
> echo ".env" >> .gitignore
> ```

**5. Load the key before every Pi run.** A `.env` file just sits on disk — you have to load it
into the environment of the terminal you launch Pi from, **each time you open a new terminal**:

- **macOS / Linux (bash / zsh):**
  ```bash
  set -a; source .env; set +a
  ```
  (Equivalently: `export $(grep -v '^#' .env | xargs)`.)
- **Windows PowerShell:**
  ```powershell
  Get-Content .env | ForEach-Object { if ($_ -match '^\s*([^#][^=]*)=(.*)$') { [Environment]::SetEnvironmentVariable($matches[1].Trim(), $matches[2].Trim()) } }
  ```

**6. Run Pi** from the folder you'll work in:

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

> **"You can outsource your thinking, but you can't outsource your understanding."**
> — Andrej Karpathy
>
> This is the step it's most tempting to skip — let Pi spit out two tidy files and move on. **Don't.**
> The agent will faithfully build whatever these files say, *including the misunderstandings you
> didn't catch* — so an auto-generated spec you never read doesn't save you the work, it just
> hides the moment your confusion quietly became the data owner's broken result. These two files
> are where **you** do the thinking. That understanding is the one thing you cannot hand to the
> agent, and it is exactly what this course examines. **You will not leave this part quickly:**
> you will read, question, and rewrite `AGENTS.md` and `spec.md` several times before they're
> right — and every later part inherits their quality.

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

### Step 3 — read every line, then iterate (this is the real work)

A first draft — yours or Pi's — is a *starting point*, never a finished product. This is the loop
that actually builds the understanding the course is grading. Do it inside Pi:

1. **Read every line yourself.** Not skim — read. For each sentence ask: *do I actually know this
   is true, or did the agent guess it?* Mark everything you couldn't defend to the data owner.
2. **Hunt what's wrong or missing.** AI drafts are *confidently incomplete*: they nail the obvious
   path and go silent on the edge cases, invent a column name or a threshold that was never said,
   or contradict themselves two paragraphs apart. Those gaps are what you're here to close.
3. **Make Pi interrogate _you_.** Turn the tables: *"Ask me about anything ambiguous or missing in
   this spec, and list every assumption you'd have to make to run it."* Answer from **your**
   understanding, then fold those answers back into the files. If you can't answer, that's a
   question you still owe the transcript.
4. **Refine, tighten, delete.** Fix the wrong claim, add the missing trap, cut the vague filler
   that sounds good but tells the agent nothing.
5. **Re-read the whole thing.** Each pass you understand the problem a little better — so a file
   that looked finished last round now reads as sloppy. That discomfort *is* the learning; don't
   stop at "looks plausible", stop at "accurately describes the real project".

Fifteen minutes iterating here saves hours of confidently-wrong analysis later. Only when the two
files would let a competent stranger reproduce the work — do you hand them to Agent B in Part 4.

## Part 4 — Direct the agent to solve the problem

Now you have a briefed analyst, the dataset already sitting in your working folder, and a
real problem. Time to build.

> **Prefer to watch?** [Steps 14–15 of the walkthrough](/lab1-onboarding/?c=brief) show the brief
> sitting next to the data, and the agent reading the data back — including the moment it
> catches a mistake in the spec.

1. Make sure your `AGENTS.md` and `spec.md` sit in the **same folder** as the dataset, so the
   agent reads them all together.
2. Point the agent at the task and let it work — then iterate.

**How to prompt (build the smallest thing that works first):**

- Ask it to **explain the data back to you** before it analyses anything: "Load the data,
  and tell me what you actually see — shapes, columns, ranges, anything surprising."
  Compare that to what the interview told you. Mismatches here are gold.
- **Make it plan before it codes.** "Before you write any code, give me your plan as numbered
  steps and tell me where it could go wrong." Correcting a plan costs one sentence; correcting a
  finished analysis costs a rerun. This is the cheapest place to catch a wrong turn.
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

**A starting prompt you can paste** (adapt the last line to your task):

```text
Read AGENTS.md and spec.md, then load the dataset in this folder.
First, tell me what you actually see in the data — shapes, columns, units, ranges,
missing values, anything that contradicts the spec. Do NOT analyse yet.
Then give me a numbered plan for answering the question in spec.md, and flag the two
places the plan is most likely to be wrong.
Wait for me to approve the plan before you write any analysis code.
```

Everything after that is a conversation: approve or correct the plan, ask for one small result,
check it (Part 5), then advance. You are the director — Pi doesn't move to the next step until you
say so.

> **The one loop everyone finishes — even if you're behind.** If the interview ran long or Pi
> fought you during setup, do **not** chase the most complete analysis. A simple result you
> *verified* beats an ambitious one you never finished. As soon as Pi is running, work in this
> rhythm instead:
>
> 1. **One simple go.** Ask for one basic answer against the data — the smallest end-to-end
>    result you can get (a single number, a single group comparison). Nothing clever yet.
> 2. **One straightforward check.** Before you believe it, verify that one result — pick a single
>    quick check from Part 5: a **smell test** (is the number's order of magnitude even sane?), a
>    **negative control** (shuffle the labels — the effect should vanish), or a **second method**
>    that ought to agree. If it doesn't survive, good — you learned something; fix and re-run.
> 3. **Iterate the two.** Advance the analysis a little, verify again — repeat as far as time
>    allows. Every loop leaves you with a complete, defensible result you could present.
>
> **Reserve the last 30 minutes for the report — be in Part 6 by 16:30.** The computer lab runs
> **13:00–17:00**, so when the clock reaches **16:30**, whatever state you're in, stop advancing
> and switch to *Part 6 — Produce results and a short report*: make the plot(s) and write the
> short summary. That report is the basis for Friday's seminar presentation. Walking out with **one
> verified result and a written summary is a finished lab**; a half-built "perfect" analysis
> with no report is not.

## Part 5 — Validate & verify (think like a scientist)

**Code that runs is not code that's right.** The agent is an unreliable instrument that will
happily report a beautiful result driven entirely by a batch effect, a mislabelled column, or an
answer that leaked into its own inputs — and *nothing will turn red*. Your job here is the heart of
the whole course: **you verify the *answer*, not the machine.**

You can't read the agent's mind, and you don't need to. The reliable way to trust a black-box
result is to **corner it from several independent directions and only believe it when they agree**:
get to the same answer another way, stress the agent to prove itself wrong, and check the result
against what's already known about the world. One warning runs through all of it — **a fluent
explanation is not proof.** A language model will narrate a confident, plausible story for a wrong
answer, and it tends to fold the instant you push back. So every challenge below has to end in
something *you can check*, not just a reassuring reply.

Below are five families of check. **Pick at least one move from each family.** In Week 1, running
this loop **once** — one independent recompute, one adversarial prompt, one reality check — is the
win. You don't need all of it.

**1 · Does it pass the smell test?** — *cheap plausibility; rule out the obviously-wrong first*
- Eyeball the numbers: are they in a sane range? An average age of 350, a negative count, or
  "99.8% accurate on messy real data" is a bug, not a triumph.
- Check the **direction and the size**: does the sign match intuition, and is the effect a
  believable magnitude — or suspiciously huge?
- Check the totals: "40,000 responders" out of 20,000 rows means something is double-counted.
- Ask for a quick summary/histogram of each key column — a spike at zero or every value identical
  is usually an encoding problem, not a finding.

**2 · Can you get there another way?** — *independent triangulation; the strongest evidence there is*
- **Estimate it yourself first**, by hand, from a few rows — *then* read the agent's number. If
  it's off by 10×, investigate. (Guess before you look, so its answer doesn't anchor yours.)
- Ask the agent to **redo it with a completely different method** — ideally a simpler one you can
  follow — and show both answers side by side. Agreement across methods is hard to fake.
- **Spot-check one case by hand:** pick 3 rows, compute the result yourself, confirm it matches.
- Does the finding **hold on an independent slice** — the other half of the data, another batch,
  another site? A real effect travels; an artefact usually doesn't.

**3 · Stress the agent to prove it.** — *adversarial prompting; surfaces weak spots, doesn't certify*
- *"I don't believe this is right — **prove it**, with the actual numbers and the exact code you ran."*
- *"**Argue the opposite:** give me the three strongest reasons this conclusion could be false, and
  exactly what I'd check to rule each one out."*
- *"What is the **smallest change** to the data or settings that flips this result? Make that
  change and show me."*
- *"What **boring alternative** — a batch effect, the order of the rows, a confounder — could
  produce this same result?"*

**4 · Make it show its work.** — *open the box; inspect the process, not just the answer*
- *"Show me the **exact code** you ran to get this number."*
- *"Take **5 real rows** and show every intermediate value, from raw data to final result."*
- *"Draw a **flow diagram**: input data → each transformation → output."* A diagram makes a missing
  step or a wrong join visible at a glance, where prose hides it.
- *"List every **assumption** you made about this data to get this answer."*

**5 · Check against what's known.** — *domain plausibility & controls; reality is the referee*
- **Known-fact check.** Does the result agree with something you can look up? If it flags markers
  for a disease, are any *already-known* ones in the list? If it contradicts settled biology, the
  burden of proof is on the result, not the textbook.
- **Positive control.** Run it on a case where you already know the answer — does it recover it?
- **Negative control.** Run it on two groups that *should* look the same (e.g. shuffle the group
  labels, or split one group in half and compare the halves). It should find **nothing**. If it
  "discovers" an effect there, your method is inventing signal — this is the honest version of the
  old "shuffle test", and it matters because it catches a method that's fooling itself.
- **Too good to be true = leakage.** Near-perfect results almost always mean the answer leaked into
  the inputs. Ask *"is any column secretly a stand-in for the thing we're predicting?"*, remove it,
  and see whether the result collapses.

> **Design one test of your own, in advance.** Before you run anything, decide a single criterion
> the result *must* pass to be believable — and write it into `spec.md`. A check you commit to
> beforehand is worth ten you rationalise afterwards. Then iterate: fix, re-run, re-check.

**The bottom line.** You will rarely *prove* a black-box result correct. What you can do — and what
this lab trains — is **triangulate** (two independent routes to the same answer), **stress-test**
(actively try to break it), and **reality-check** (does it fit what's known). When all three point
the same way, you can stand behind the number at Friday's seminar. When they don't, you've found
something — and saying *"here's the result, here's the one check it failed, here's what I'd do
next"* is a **stronger** outcome than a polished result you never questioned.

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

### Ask for it as one HTML file

Don't take the report as Markdown, and don't fight a Word document. Ask for **one
self-contained `report.html`** — the styling and the figures embedded *inside* that single
file. Double-click and it opens; email it to the data owner and it still works on their
machine, with no attachments to lose and nothing to install. Need paper? **Ctrl+P** turns it
into a clean PDF.

The reason isn't decoration. HTML is the one format where the agent can put a table *as* a
table, a figure *as* a figure, and your caveats somewhere your eye actually lands — instead of
flattening all three into the same grey wall of text. Anthropic's
[*The unreasonable effectiveness of HTML*](https://claude.com/blog/using-claude-code-the-unreasonable-effectiveness-of-html)
makes the case at length and lands on the point that matters here: the real win is that **you
start reading the output properly again**. An unread report is an unchecked report — and
Part 5 was entirely about checking.

**Copy this into Pi** (adjust the section list if your run needs different sections):

```text
Write my lab report as ONE self-contained HTML file called report.html — CSS in a <style>
tag, no external files, no CDN links. It has to open from a double-click and still work when
I email it to the data owner.

Embed the figures with a script, never by hand: write the HTML with plain <img> tags pointing
at the PNG filenames first, then run a short Python script that rewrites each src into a
base64 data URI. Don't print base64 into the chat.

Read spec.md, my results file and the analysis code first, then write these sections:
1. The question the data owner actually asked — in their words.
2. What I built — the analysis in plain language a biologist can follow.
3. What I found — the numbers, with the figure(s).
4. What I checked — every control I ran, and whether it passed.
5. What I would NOT claim — what this data cannot answer, what would change the conclusion,
   where I'm unsure. Be blunt; don't soften this section.
6. AI disclosure — which agent did what, and what I verified myself.

Style: clean and typographic, not a dashboard. Single column, max-width about 46em, generous
line height, system font stack, one restrained accent colour, real <table> elements for
numbers. Add a @media print block so Ctrl+P gives a clean PDF.

Every number must come from my actual output files. Don't invent or re-round anything — if a
number isn't in the files, leave a visible TODO instead.
```

> **Why the "embed with a script" line is in there.** Left to itself the agent will happily
> dump 150 kB of base64 through the conversation to get the picture into the file — it works,
> but it burns your budget on a blob neither of you will ever read. Telling it to do the
> substitution *in a script* keeps the image out of the chat entirely.

Then **open the file and read it** — that is the entire point of asking for something readable.
Check every number against your own output. If section 5 has gone soft ("further work is
needed"), push back: *"You hedged. What specifically can this dataset not answer?"* On the
course gateway a run of this prompt takes well under a minute.

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

### Build the deck as one HTML file too

Same move, same reason: **one `slides.html`**, opened in your browser, arrow keys to advance.
Nothing to install, no font gone missing on someone else's laptop, and **Ctrl+P** prints one
slide per page if you want a PDF on a USB stick as backup.

**Copy this into Pi:**

```text
Make my seminar deck as ONE self-contained HTML file called slides.html. One <section> per
slide, each filling the viewport with its content vertically centred; arrow keys and space
advance.

Embed the figure with a script: write a plain <img> tag pointing at the PNG first, then run a
short Python script that rewrites that src into a base64 data URI inside the file. Do NOT load
the image at runtime with fetch() or XHR — that breaks when the file is opened from disk.

Eight slides, no more. I get 7 minutes, so that's about 45 seconds each:
1. Title: the question, who the data owner is, my name.
2. The question behind the question: what they asked vs what they actually needed.
3. The data: what I was given, and what was missing from it.
4. What I built: how I briefed the agent (AGENTS.md / spec.md).
5. The result: the main figure, large, and one sentence of claim.
6. What I checked: each control, and what it ruled out.
7. What I would NOT claim: the honest limits.
8. What I'd do next, and what I'd ask the owner.

Style: high contrast, big type (body at least 28px, slide titles 3rem+), at most ~40 words on
a slide, one accent colour, generous margins. No bullet walls — if a slide needs a paragraph,
it's two slides. Under each <section>, put an HTML comment with the speaker notes: what I
should actually say out loud for those 45 seconds. Add a @media print rule that puts one slide
per page, so I have a PDF backup.

Use only numbers that appear in my results file.

Then check your own work and fix what fails: confirm the file has a data:image/ src, no
fetch(, no http:// or https:// links, and that the inline JavaScript parses.
```

That last paragraph is doing real work: without it the agent tends to fetch the image at
runtime, which looks fine on its machine and shows a broken box on yours. Making it check its
own output is cheaper than finding out on Friday morning.

Then rehearse once against a clock. Seven minutes is eight slides at roughly 45 seconds each —
and the two the room will actually push on are **what you checked** and **what you would not
claim**. Know those cold.

<details>
<summary><b>Optional — an agent skill that makes these pages look genuinely good</b></summary>

If you want more than clean typography — a pipeline diagram, a sidebar you can navigate, a
properly rendered comparison table — there's a Pi extension for it. From inside your lab
folder:

```bash
pi install git:github.com/nicobailon/visual-explainer -l
```

The `-l` keeps it local to this folder rather than installing it for everything you ever do.
Restart Pi, then ask in plain words: *"Use the visual-explainer skill to build a page in this
folder that explains what the analysis did, the batch structure of the data, and the control I
ran."*

We tested this against the course gateway on `gpt-5.6-luna`: it installs and runs. Two things
to know before you lean on it:

- It pulls its fonts from a CDN, so the page is **not** fully offline — it still opens without
  a connection, it just falls back to a system font. For the report you actually hand in, the
  plain prompt in Part 6 is the safer choice.
- It also drops a copy of the page in `~/.agent/diagrams/`. Harmless, but don't be surprised.

This is enrichment, not a requirement. A plain, honest `report.html` passes this lab; a
beautiful one that you didn't check does not.

</details>

## What to hand in — and what we look at

Your submission is your **transcript plus your report**:

- **The interview transcript** (your conversation with Agent A) — downloaded from the
  portal as a Markdown (`.md`) file.
- **The analysis transcript** (your conversation with Agent B) — a log of your Pi session. Pi
  records each run as `.jsonl` under `~/.pi/agent/sessions/` (on Windows,
  `C:\Users\<you>\.pi\agent\sessions\`). You can hand in **either** the raw **`.jsonl`** file
  **or** a readable **`.md` / `.txt`** log — we accept all three. We *prefer* a readable Markdown
  version (just ask Pi to write it out — prompt below), but the raw `.jsonl` is fine. If you ran
  Pi more than once, include one per run.
- **The report** (AI-assisted, checked by you), with `AGENTS.md` and `spec.md` alongside.

**How to submit — all in the portal, no Google Forms.** Open your week in the
[course portal](https://ddls-portal-6228434e.svc.hypha.aicell.io/) and click **Hand in**
(also on each week card and at the top of the week page). The **Computer-lab** card has **one
upload button per file**, so each lands under the right name on our server:

- **Report** — your one self-contained `report.html`.
- **Interview transcript** — your chat with Agent A, downloaded from the portal (`.md`).
- **Analysis transcript(s)** — your Pi session as **`.md`, `.txt`, or the raw `.jsonl`** Pi
  writes; add as many as you launched.
- **`AGENTS.md`** — the brief you wrote for the analyst.
- **`spec.md`** — your task spec for the analyst (goal · data · traps). Plus one **extra** slot
  for anything else you want us to see.

> **Gather everything in one place — and, if you like, turn the Pi log into readable Markdown.**
> The raw `.jsonl` is fine to hand in, but you don't have to dig through the terminal for it — let
> the agent gather your files (and, optionally, rewrite the log as plain Markdown). Paste this into
> **Pi** at the end of your run:
>
> ```text
> Make a folder called submissions/ in my current working directory. Copy my report.html,
> AGENTS.md and spec.md into it. Then read every Pi session transcript from TODAY under
> ~/.pi/agent/sessions/ and, for each run, write a clean Markdown log of the whole conversation
> (my messages and your replies, in order) to submissions/analysis-transcript-1.md,
> analysis-transcript-2.md, … — plain readable text, not JSON. Finally, list exactly what you
> copied so I can check nothing is missing.
> ```
>
> Now every file except the **interview** transcript (download that from the portal into the same
> `submissions/` folder) is in one place — open the folder and drag each file to its upload button.

Put your **name** in the field at the top (so we can match your work even if you signed in with
an unusual email), and a short **note to the teachers** if you like. Re-submit any time — we
always grade your most recent upload. A **countdown to the deadline** is shown right on the page.
Please also fill the short **feedback panel** (it's open by default and *recommended*): a few
1–5 sliders plus boxes for ideas to improve **the course** and **the portal** — it genuinely
shapes what we do next. **Due Friday 10:00, before the seminar.**

The **Seminar** card takes a single **self-contained `.html` deck** and nothing else (see the
[seminar page](../seminar/) for how to build one). Same deadline: **Friday 10:00.**

> **Submitting is required even if you can't attend.** The lab and seminar are live and
> mandatory, but *attending* and *handing in* are separate obligations. If you have to miss the
> Wednesday lab or the Friday seminar (email
> [ddls-course@scilifelab.se](mailto:ddls-course@scilifelab.se) **before** the session), you must
> **still upload your report, transcripts and seminar deck through the portal before the deadline —
> Friday 10:00 CEST, before the seminar starts.** A missed session with notice is excused; a
> missing submission is not.

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
