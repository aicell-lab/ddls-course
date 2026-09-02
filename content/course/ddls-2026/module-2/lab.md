---
title: "Computer Lab 2: Interview an Image Data Owner, Direct an Analyst on Microscopy Data"
linkTitle: "Computer Lab 2"
summary: ""
weight: 10
type: book
---

Welcome to the second computer lab. This week you run the **exact same job** as Week 1 — the
**forward-deployed scientist**: take someone else's biological problem, interview them until
the question is precise, and come back with a working, checked answer, with an AI agent doing
the labour and you supplying the judgement. What changes this week is the data: it is now
**microscopy images**, and the bar is higher.

You still talk to **two** agents, and you are still the only link between them:

- **Agent A — the image data owner.** A simulated microscopist who owns real image data and a
  real question. You **interview** it. This week it can even **show you example micrographs**
  in the chat. It answers a good question honestly and a vague one uselessly.
- **Agent B — the analyst.** Your local coding agent, **Pi**, which starts as an *empty folder*.
  You **configure** and **direct** it to run a pretrained model on the images and check the result.

Nothing passes between A and B except what **you** write down. That channel — you — is exactly
the skill being examined.

> **New to the toolchain? Do [Computer Lab 1](../../module-1/lab/) first.** This page assumes you already
> know the base Pi setup from Week 1. If you joined this week, the full Pi install and gateway
> config is repeated in **Part 2** below so you can follow it standalone.

{{< toc >}}

## Suggested time budget

The lab runs **13:00–17:00 (4 hours)**. The table below is a **guide**, not a stopwatch: work
at your own pace, but **do not run past 17:00**, and treat the 15:45 switch to building as hard.

| Time | Duration | What you're doing |
|---|---|---|
| 13:15–13:30 | 15 min | Set up **Pi**: install Node + Pi, point it at the gateway (vision on), open the portal, generate your API key |
| 13:30–14:00 | 30 min | **Interview** the data owner (Agent A) — get the image facts |
| 14:00–14:30 | 30 min | **Translate**: have Pi draft `AGENTS.md` / `spec.md`, **review them by hand**, then have **Pi set up the Python environment** for the task |
| 14:30–15:45 | 75 min | **Direct** the analyst with the prompt recipe: run a pretrained model on a small subset, overlays, a metric vs a baseline, a vision check |
| 15:45–16:45 | 60 min | **Build your deliverable** — the FastAPI + Tailwind results app; open it and check every overlay and number |
| 16:45–17:00 | 15 min | Write the short summary and **gather your submission** folder |

> **Treat 15:45 as a hard switch: stop analysing and build the app** — whatever state your
> analysis is in. A checked partial result you can *show* beats an unfinished perfect one. In
> our own timed run the whole loop (draft → analyse 22 fields → build the app) took the agent
> under two minutes of work and about **$0.02** — the clock goes to *your* thinking, reviewing
> and checking, not to waiting on Pi. Reserve the last stretch for the app and the summary;
> that is what you present on Friday.
>
> **Seminar preparation is separate.** You prepare the seminar *later* — on Thursday, ~30–45
> minutes — not inside these four hours (see the [Seminar 2](../seminar/) page). Don't try to
> build slides today.

## Learning goals

By the end of this lab you should be able to:

- Run a structured **interview** with an *image* data owner, surfacing the image-specific
  facts (format, scale, modality, labels, traps) that tabular data never has.
- Reuse **Pi**, your local analyst agent, pointed at the course portal.
- **Translate** the interview into an `AGENTS.md` (the brief) and a `spec.md` (every detail,
  path, channel, pixel size and trap) — and **review them by hand** before you run anything.
- **Direct** the agent with a reusable **prompt recipe** (a clear goal · a loose method with a
  humble fallback · explicit validation, verification and stopping criteria) — a way of working
  you will reuse every week of the course.
- Run a **pretrained** model on a small image subset — no training from scratch — and
  **validate** it with a baseline, overlays, and Pi's own **vision** (ask it to *look* at the
  output image), not vibes.
- Build a small **deployable app** (FastAPI + Tailwind) so you and the seminar audience can
  *see* the images and results, mark what's wrong, and defend them on Friday.

> **What "good" means today.** The win is **completing the whole loop once** — interview →
> translate → direct → verify → build the app — with a result you actually checked and can
> *show*. A modest, verified result you can display on screen beats an ambitious one you never
> finished. The skill on trial is how you **steer, translate and check** — not how
> sophisticated the model is.

### The one rule: it must be someone else's problem

As in Week 1, you work **Agent A's** problem, not your own. When the images are already
familiar, you never say the things that matter out loud — "channel 2 is the nuclear stain",
"the last plate was imaged on a different scope", "ignore the edge fields, they're out of
focus" — so the agent never hears them and quietly guesses. Being the outsider forces that
hidden context into the open. Do not use your own microscopy data.

## Access the portal

Everything for today lives behind one course portal. It hosts Agent A (the image data-owner
chatbot), issues the **API key** your local analyst agent will use, and lets you **download**
both the image dataset and your interview transcript.

{{< cta cta_text="Open the course portal" cta_link="https://ddls-portal-6228434e.svc.hypha.aicell.io" >}}

**Already activated in Week 1?** Just **Sign in** with your email and password. **First time?**
Choose **Activate account**, enter the email you registered with plus the course code we sent
you, and set a password. If the email or code is not recognised, tell a TA in the chat — don't
burn lab time on it.

What the portal gives you (the same four things as Week 1, now for image data):

- **Chat with the data owner** (Agent A) — your interview happens here, in the browser.
- **Download your interview transcript** — the full chat, to feed into Part 3.
- **Generate an API key** — for your local analyst agent (Part 2), on your **dashboard**.
- **Download the dataset** — the real image file(s) Agent A is talking about.

## Part 1 — Interview the image data owner (Agent A)

> **⏱ 13:30–14:00 · finish interviewing by 14:00.** (Kick off the Part 2 setup first, at
> 13:15 — Pi installs and the dataset downloads while you interview.)

Open the **chat with the data owner** in the portal. This week Agent A is playing a
microscopist who has images and a question but has not thought hard about either. Your job is
to **steer a conversation** until you could hand the whole thing to someone who has never seen
these images.

> The entire chat is **logged server-side** — there is no separate "submit interview" step.
> But at the end, **download the transcript**: you need it for Part 3, and the analyst reads
> the transcript, never your notes.

**The two coaching helpers work exactly as in Week 1.** On every message you send there is a
**wand — "Coach me"** (hints on how your question could have been sharper — never a rewrite;
use it early and often) and a **pencil — "Edit"** (pull the message back, rephrase, and get a
fresh answer). Beside the Send button there is a second **wand** (💡 / lightbulb, the
"suggest a question" helper) that proposes two to four questions aimed at the gaps you haven't
covered — suggestions are **free**, so press it whenever you stall. If you need the full
explanation of these, see [Part 1 of Computer Lab 1](../../module-1/lab/#part-1--the-interview-agent-a).

### The raised bar: images have far more to pin down

Week 1 was tabular; a spreadsheet mostly explains itself once you know the columns. **Images
do not.** The same pixels can be 8-bit or 16-bit, one channel or five, a nucleus or a whole
tissue section — and the analysis is completely different in each case. So this week the
interview must surface **image-specific facts**. Walk the checklist below; if you cannot answer
a group afterwards, you have not finished the interview.

**FORMAT & SCALE**
- What **file format** are the images — TIFF, PNG, JPEG, something proprietary?
- What are the **image dimensions in pixels** (and are all images the same size)?
- What is the **bit depth** — 8-bit (0–255) or 16-bit? (This changes how you scale intensities.)
- How many **channels**, and **what is each channel**? (e.g. channel 0 = DAPI/nuclei,
  channel 1 = actin.)
- What is the **pixel size / physical scale** — µm per pixel — and at what **magnification**?

**CONTENT**
- What **imaging modality** — brightfield, fluorescence, phase contrast, H&E histology, EM?
- What **staining or labels** were used, and what do they mark?
- What **biological object** must be identified (nuclei, cells, colonies, a tissue region)?
- Roughly **how many objects per image**?

**TASK**
- Is this **classification, segmentation, counting, or detection**? Be precise — these need
  different tools.
- **What decision hangs on the answer?** (As in Week 1: if nothing changes, it isn't yet a
  question worth analysing.)

**LABELS / GROUND TRUTH**
- Are there **annotations or masks**? How many, and **how were they made** (hand-drawn,
  another tool, an earlier model)?
- Is there a **class imbalance** — one class far rarer than the others?

**TRAPS**
- **Out-of-focus fields**, **uneven illumination / vignetting**, **staining or batch
  variation** between sessions, **scale differences** between images, **very rare classes**.

> **Ask for one or two example images before you leave the interview.** Agent A can show you
> micrographs in chat. Everything you were told will turn out to be slightly different from
> what is actually in the pixels — every time. Seeing a real image (and the dataset download
> in Part 2) is how you catch it.

### Steering — every vague answer has one follow-up that fixes it

Assume nothing is defined until *you* have made it definite. When you get a hedge, ask the one
question that pins it down:

| What they say | What you ask back |
|---|---|
| "It's just some microscopy images." | "What format, what pixel dimensions, how many channels, and can you show me one right now?" |
| "The cells are stained." | "Stained with what, in which channel, and what does each channel mark?" |
| "We want to count the cells." | "Count which object exactly — nuclei or whole cells — and do you have any masks to check against?" |
| "We tried deep learning, it didn't work." | "Which model, on how many images, and what did the output actually look like on one field?" |
| "The images are all similar." | "Same scope, same day, same magnification? Or were some sessions different?" |

## Part 2 — Set up Pi and grab your materials (start this FIRST, at 13:15)

> **⏱ 13:15–13:30 · be set up by 13:30.** Do this before Part 1, so Pi is ready the moment your
> interview ends. **You don't install the Python analysis packages here** — you'll direct **Pi**
> to do that in Part 3, once the interview tells you what the task actually needs.

**No GPU is needed** — everything in this lab runs on a laptop **CPU**, *provided
you work on a small subset of images*: **a handful (6–15) of images** for segmentation — each
one takes ~1–2 min on CPU — or a few hundred to a few thousand small **crops** for a
feature-based classifier. Do not try to process a whole dataset on a laptop. (If you finish early
and want to run something heavier on a free cloud GPU, there's an optional Pi-driven Colab path at
the end of Part 3 — but the whole lab passes on CPU.)

Create a working folder for this lab and open a terminal inside it — this is the empty room your
analyst agent will work in:

```bash
mkdir ddls-week2 && cd ddls-week2
```

**Download the image dataset now** from this week's lab page in the portal into that folder:

- **The image dataset** — the real image file(s) Agent A was talking about. As in Week 1 the
  download is deliberately bare: the pixels and nothing that explains them. Everything a data
  dictionary *would* tell you — channels, pixel size, what's labelled — has to come from your
  interview and from opening the images.

> **Your interview transcript comes later.** You download it from the portal at the **end of
> Part 1** (once you've actually interviewed Agent A) — it doesn't exist yet. Save it into this
> same `ddls-week2` folder so both the transcript and the dataset sit together for Part 3.

### Set up Pi (the analyst agent)

**Did [Computer Lab 1](../../module-1/lab/)?** Your Pi still works — you only need this week's
**one-line vision change** just below, then skip to [Part 3](#part-3--configure-and-direct-the-analyst-agent-b--pi).
**New this week?** Expand **Full Pi setup** and do it once.

> **New this week — let Pi *see* images.** Open `~/.pi/agent/models.json` and change the model's
> `"input"` line from `["text"]` to `["text", "image"]`. That one word turns on the model's
> **vision** — Pi can now open a PNG and actually *look* at it, which you use in Part 4 to have it
> check its own overlays. It's cheap (about **$0.0003** per image) and one of the most useful
> checks you have on image work. *(New this week? The file in the setup below already has this.)*

<details>
<summary><b>Full Pi setup</b> — expand only if you don't have Pi yet (new this week)</summary>

Your analyst agent is **Pi**, a lightweight coding agent. It runs **on your own machine** and
talks to the course model **through the portal gateway** — so every call counts against your
portal budget, and the teaching team sees the transcript. Pi reads an `AGENTS.md` context file
and can run code, read files and write output.

**1. Install Node.js 22+** (this also installs `npm`). Check first:

```bash
node --version
```

If that prints **22.0 or higher**, skip to step 2. Otherwise install the **LTS** build from
**<https://nodejs.org/en/download>** (Windows/macOS installer, or your distro's package manager
on Linux), then reopen the terminal. Node 18/20 is **not enough** — Pi needs 22+.

**2. Install Pi:**

```bash
npm install -g @earendil-works/pi-coding-agent
```

(Hit an `EACCES` permission error on macOS/Linux, or a "running scripts is disabled" error on
Windows? Both fixes are in [Computer Lab 1, Part 2](../../module-1/lab/#part-2--set-up-your-analyst-agent--grab-your-materials).)

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
        { "id": "gpt-5.6-luna", "reasoning": false, "input": ["text", "image"],
          "samplingParams": { "reasoning_effort": "none" } }
      ]
    }
  }
}
```

> The `samplingParams` line is **required** — it's what lets the course model use tools.
> Don't try to set `OPENAI_BASE_URL`; Pi won't read it. The `"input": ["text", "image"]` above
> is this week's vision change — leave it as shown.

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
Paste, then **Ctrl + O**, **Enter** to save and **Ctrl + X** to quit.

**Prefer an editor you already use?** `code ~/.pi/agent/models.json` opens it in VS Code on any
OS. Or, on macOS/Linux, write the whole file in one go with a heredoc (the quotes around `JSON`
keep `$DDLS_API_KEY` literal):
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
        { "id": "gpt-5.6-luna", "reasoning": false, "input": ["text", "image"],
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

**4. Save your portal API key to a `.env` file.** Generate a key in the portal (**Generate
API key** on your dashboard). **The portal shows the key only once**, so save it immediately.
Inside your `ddls-week2` folder, create a file called `.env` with a single line:

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

Ask it something small first — "list the files in this folder and tell me what you see" — to
confirm it's talking to the portal. Pi can read/write files and run shell commands in that
folder. It has **no built-in web search**. Keep an eye on the usage meter on your dashboard.

</details>

> **You haven't installed the Python analysis packages yet — that's deliberate.** In Part 3
> you'll direct Pi to set up the environment (with `uv`) and install exactly what your task
> needs. For now, just confirm Pi runs and can see your transcript and dataset.

## Part 3 — Configure and direct the analyst (Agent B / Pi)

> **⏱ 14:00–15:45 · finish directing by 15:45.** Steps 1–4 (draft, review, set up the
> environment) by ~14:30; Step 5 (direct the analysis) 14:30–15:45. At **15:45 you stop
> analysing**, whatever state you're in, and move to Part 5.

This is where the real skill lives, and it is the **way of working you reuse every week of the
course**: you don't do the analysis — you **direct** an agent to do it and you **judge** what
comes back. Same shape as Week 1 (an empty folder → `AGENTS.md` + `spec.md` → run Pi), but this
week we make the steps explicit. Work through them in order.

### Step 1 — Get your inputs in the folder

You already have both: your **interview transcript** (downloaded at the end of Part 1) and the
**image dataset** (downloaded in Part 2), sitting together in your `ddls-week2` folder, with Pi
able to see them. Nothing else.

### Step 2 — Draft `AGENTS.md` and `spec.md` *with* Pi

Launch Pi and have it read the transcript and the files and draft both, so you start from a
real draft, not a blank page:

```text
Read my interview transcript (the .md file in this folder) and look at the data/ folder. From
ONLY what the transcript and the files actually show, write two files, then stop — do not
analyse anything yet:

1. AGENTS.md — how you operate here: the environment (use uv — create it with `uv venv` and run
   all Python with `uv run`, which works the same on every OS), where the data lives and how to
   load it, where to write outputs (results/), and the rule that every number you report must be
   checked against the ground truth.
2. spec.md — the problem: the exact decision the owner needs, the data (paths, dimensions,
   bit depth, channel/stain, how any masks/labels are encoded), the definition of "done", the
   metric and the baseline to beat, and the traps to watch.

Then give me a 3-line summary of what you wrote.
```

- **`AGENTS.md`** is the brief loaded every turn: the **GOAL** in a sentence or two, **where
  the images live and how to load them**, the **MUST-NOTs** ("don't rescale 16-bit as if it
  were 8-bit", "don't mix channels"), and a pointer to `spec.md`.
- **`spec.md`** is every detail: **format, pixel dimensions, bit depth, channels and what each
  is, pixel size / µm-per-pixel, magnification, modality**, every trap, the **metric and
  baseline**, and what "done" looks like. It **is the data dictionary the download didn't come
  with** — you rebuild it from the interview and from opening the images.

### Step 3 — Review them by hand (the gate)

**This is the manual step that separates a pass from a fail.** The agent's draft is a
*proposal*. Read both files line by line and correct them **against the transcript and the
actual files — never from memory.** Tick off:

- [ ] The **goal** is the owner's real decision, not "segment the images". (In our test run the
      owner needed a *field-by-field trust decision*, not one average — the agent got that only
      because the transcript did.)
- [ ] Every **path** is right and the images load.
- [ ] **Bit depth, channels and what each channel is** match what the files actually contain.
- [ ] **Pixel size / magnification** is stated (or explicitly marked *unknown* — don't let the
      agent invent it).
- [ ] The **traps** from the interview are all listed (blank/edge fields, touching objects,
      dim fields, debris, batch variation).
- [ ] The **metric and baseline** are concrete, and the agent hasn't invented an
      "owner-approved" acceptance threshold the owner never gave.

Fix what's wrong, then move on. For the full translation method (review-as-prose, then split,
then iterate) see [Part 3 of Computer Lab 1](../../module-1/lab/#part-3--translate-build-agentsmd-and-specmd).

### Step 4 — Let Pi set up the Python environment (with `uv`)

You don't hand-install packages — **you direct Pi to set up the environment from the spec.** It
knows the task now, so it can install exactly what's needed (a segmentation job needs different
tools than a classifier) and nothing you won't use. We use **[uv](https://docs.astral.sh/uv/)**,
a fast Python manager that behaves the **same on macOS, Linux and Windows** and needs **no
"activate" step** — you and Pi just prefix commands with `uv run`. Paste:

```text
Set up the Python environment for this task using uv (install uv first if it isn't available; if
Python itself is missing, use `uv python install`). Create the environment with `uv venv`, then
`uv pip install` ONLY the packages your approach in spec.md actually needs. This is a CPU-only
laptop — if you need PyTorch, install the CPU build (--index-url
https://download.pytorch.org/whl/cpu). Also install fastapi, uvicorn[standard] and
python-multipart for the results app I'll build later. Verify each package imports with
`uv run python -c "import ..."`, and tell me exactly what you installed and why. From now on, run
all Python with `uv run` (e.g. `uv run python script.py`).
```

The heavy one is the CPU PyTorch build (a few hundred MB) **if** your task needs it — Cellpose
and `timm` do; segmentation with `scikit-image` alone skips it. The first Cellpose run later also
downloads its model weights (~1.2 GB, one-time). So let Pi pick the lightest tool that fits.
While it installs, re-read your `spec.md`.

> **Why uv?** A plain `venv` leaks OS differences (`.venv/bin` vs `.venv\Scripts`, `python` vs
> `python3`) and needs an activate step that doesn't survive an agent's separate commands.
> `uv run` sidesteps all of that — one command that behaves identically everywhere. (Prefer not
> to install uv? `python -m venv .venv` still works; you'd just use `.venv/bin/python` — or
> `.venv\Scripts\python` on Windows — instead of `uv run python`.)

### Step 5 — Direct with the prompt recipe

Now direct the analysis. Use this **four-part recipe every time you ask an agent to do real
work** — this term and beyond. It is what turns a vague ask into a directed, checkable job:

> **GOAL** — one line. Point at the spec: *"answer the question in `spec.md`."*
> **METHOD (a direction, not an order) + humble fallback + optional HINT** — suggest an
> approach, then explicitly license the agent to overrule you: *"I suggest X; if that's a poor
> fit for this data, say so and propose something better **before** you write code."* Add a
> **HINT** only where you know something it can't guess (the one channel, the pixel size, the
> trap).
> **VALIDATION & VERIFICATION** — the concrete checks that make the result trustworthy: a
> **baseline to beat**, an **overlay / held-out split / class-balance** check, **and a vision
> check** — *"then open the overlay yourself and tell me whether the outlines actually sit on
> the cells."*
> **STOPPING CRITERION** — when to stop: *"plan before you code; stop and show me once you have
> the per-field table and your overlay judgement; if the error is large, surface it plainly
> rather than tuning parameters forever."*

**A paste-ready example** (this is a *counting/segmentation* example — adapt the method, hint
and metric to **your** task and dataset):

```text
GOAL: Answer the question in spec.md — for each field, count the nuclei and decide whether the
count is safe to use, checked against the ground-truth masks.

METHOD (a direction, not an order): I suggest Cellpose (a general pretrained nucleus model);
if that's a poor fit here, say so and propose something better BEFORE you write code. HINT:
the masks label each nucleus as a distinct integer, so the ground-truth count = number of
unique nonzero labels; one field is essentially blank and must come out ~0.

VALIDATION & VERIFICATION: process a handful of fields first. For each, report your machine
count, the ground-truth count, the signed difference, and a SAFE / SET-ASIDE decision, and
write these to results/results.json, plus one overlay PNG per field (your outlines drawn on
the image) into results/overlays/. Print the mean absolute error.
THEN use your vision: open 2–3 overlays (include a crowded one) and tell me honestly whether
the outlines sit on real objects or are off — don't just trust the numbers.

STOPPING CRITERION: plan before coding; stop and show me the table + your vision judgement.
If the error is large or an overlay looks wrong, surface it rather than endlessly tuning.
```

Make Pi **explain the images back to you first** (shapes, dtype, channels, intensity ranges —
mismatches with the spec are gold), **plan before it codes**, and start on **one slice** — a
handful of images end to end — before scaling. When we ran exactly this recipe, the agent
planned, wrote the pipeline, processed the fields, produced the table and overlays, **and
caught its own failures** (a false count on the blank field, over-splitting in the crowded one)
when it looked at the overlays — in about 25 seconds.

### Analyst toolkit — CPU-only, pretrained, no training from scratch

Discuss the right tool with Pi, **matched to the task type** from your interview. In every
case: run on a **subset** first, sanity-check, then scale only if the laptop can take it.

- **Segmentation** → **Cellpose** on a handful of images. The current Cellpose (v4, "Cellpose-SAM")
  exposes one general model — no `model_type` to choose: `from cellpose import models; m =
  models.CellposeModel(gpu=False); masks, flows, styles = m.eval(img)`. **The first call downloads
  the model weights (~1.2 GB, one-time) and each field then takes roughly 1–2 minutes on a laptop
  CPU** — the **very first field is the slowest (~2 min as the model warms up), so don't assume it
  has hung.** Start with **5–8 images** (≈8–15 min), confirm it works, and only scale up if the
  clock allows — processing a whole dataset (20+ fields ≈ 30+ min) will eat your whole Direct block.
  Evaluate with **IoU / F1** (or, for a counting task, **predicted count vs the mask count**) against
  provided masks if there are any; otherwise a **visual overlay** of the predicted outlines on the raw image.
- **Classification** → extract features from a **pretrained CNN** (MobileNet or ResNet via
  `timm` or `torchvision`) on image crops, then fit a **simple head** — kNN or logistic
  regression (`scikit-learn`). **No fine-tuning.** Evaluate accuracy on a held-out split
  against a majority-class baseline. **Feature extraction is the slow step** (roughly
  0.3–1 s per image on a laptop CPU) — so **tell Pi to cache the extracted features to disk**
  (e.g. `np.savez`) before it fits the classifier. Then every time you re-tune the head or
  re-draw a plot it reloads features in under a second instead of re-running the CNN, and a
  subset of **≤ ~600 images** stays comfortably inside the time budget.
- **Counting / detection** → **segment then count** the objects, or **threshold** and label
  connected components with `skimage.measure.label` / `regionprops`.
- **(Optional, advanced)** **Segment Anything (SAM)** — powerful but **heavy on CPU**; only try
  it if you're ahead of the clock.

Emphasis: the point is not a fancy model. It is that you **ran a real pretrained model on real
images, on a subset you could actually process, and checked the result.**

> **No GPU needed.** This lab is built to finish on a laptop **CPU** *as long as you work on a
> small subset* (a handful of fields for segmentation; cached features for a classifier). Do the
> whole lab on CPU first — a working result on 10 images beats a stalled GPU setup. Only if you
> are **well ahead of the clock** and want to run something heavier (Cellpose on more fields, SAM)
> is the optional free-GPU path below worth it.

<details>
<summary><strong>Optional (only if you're ahead): offload heavy runs to a free Colab T4 GPU, driven by Pi</strong></summary>

<br>

**Skip this unless you're ahead of the clock.** It is a convenience, not part of the required bar,
and it adds a one-time sign-in. The lab is designed to pass entirely on CPU with a small subset —
keep the subset small either way.

Google ships an official **[Colab command-line tool](https://github.com/googlecolab/google-colab-cli)**
that spins up a free cloud VM with a **T4 GPU** and runs your local scripts on it. Once you've
signed in once, **Pi can drive the whole thing** — provision, install, upload your images, run,
download the results, shut down — so the GPU is just faster compute behind your agent, not another
tool for you to babysit.

**Two things to know before you decide:**

- **macOS / Linux only.** The CLI does not support Windows — if you're on Windows, skip this and
  stay on CPU.
- **One human step, once.** *You* run the first command and do a normal Google sign-in (copy a URL
  into your browser, sign in, paste the code back — no Cloud project, no OAuth setup; it uses
  Google's built-in sign-in and caches the token). Everything after that is Pi's job.

**Step 1 — install it and sign in (you, once):**

```bash
# uv manages its own Python, so this works even on an older system Python.
# The extra pin avoids a current dependency bug — see the note below.
uv tool install google-colab-cli --with "jupyter-kernel-client<1.0"
# First run prints a Google sign-in URL — sign in, paste the code back ONCE. Token is cached.
colab new -s ddls-gpu --gpu T4
```

> **Why the `--with` pin?** As of this writing a plain `uv tool install google-colab-cli` pulls a
> too-new `jupyter-kernel-client`, and running code on the VM then fails with
> `module 'jupyter_kernel_client' has no attribute 'KernelClient'`. Pinning `<1.0` fixes it. If a
> future version has resolved this, the pin is harmless.

> T4 is Colab's **standard free-tier GPU** and needs no paid compute units. Our lab slot
> (Wed afternoon in Europe) is early morning in the US — **off-peak, when free GPUs are most
> available** — but availability is never guaranteed. If you don't get a T4, just fall back to CPU
> with a small subset; don't lose lab time fighting it.

**Step 2 — hand the rest to Pi.** The one catch: `colab upload` / `colab download` move **a single
file at a time — they do not take folders**. So the pattern is **zip → upload → unzip on the VM →
run → zip results → download → unzip locally**. Pi handles all of it; paste this in (adjust paths
and the analysis to your task):

```text
I have a running Colab GPU session named "ddls-gpu" (via the `colab` CLI). Offload the heavy run
to it, then bring the results back so I can inspect them locally. IMPORTANT: `colab upload` and
`colab download` only move ONE FILE at a time, so use zip archives for folders. Do this with shell
commands:
  1. Install what the analysis needs on the VM:   colab install -s ddls-gpu cellpose tifffile
     (torch is already installed on Colab — no need to reinstall it.)
  2. Zip my images and upload the single zip:
        zip -r images.zip images
        colab upload -s ddls-gpu images.zip /content/images.zip
  3. Run my analysis ON THE VM by sending a local script. `colab exec` DEFAULTS TO A 30s TIMEOUT,
     so pass a generous --timeout for a real model run (kernel state persists between exec calls):
        colab exec -s ddls-gpu -f run_gpu.py --timeout 1200
     Write run_gpu.py so that it: unzips /content/images.zip, runs the model on the GPU, writes
     masks + overlays + metrics.json into /content/results/, and then zips that folder to
     /content/results.zip.
  4. Download the single results zip and unzip it locally:
        colab download -s ddls-gpu /content/results.zip ./results.zip
        unzip -o results.zip
  5. Shut the VM down when done:                   colab stop -s ddls-gpu
Report the metric and confirm the overlays are in ./results so I can open them in my viewer app.
```

Two things I verified will bite you otherwise: **`upload`/`download` are single-file only** (zip
your folders), and **`colab exec` defaults to a 30-second timeout** — pass `--timeout` for any real
model run (this is why the script goes via `exec -f`, not `colab run`, which has the same short
default). The VM is **ephemeral**: deps and model weights download fresh each session (a minute or
two), and anything not `download`ed is lost when you `colab stop`. Your validation, vision check and
app (Parts 4–5) still run **locally** on the results you pulled back.

</details>

## Part 4 — Validate (the raised bar)

> **⏱ No separate slot — do this *inside* Part 3's Direct block (14:30–15:45).** Validation is
> part of directing the agent, not a step you bolt on afterwards.

**Code that runs is not code that's right.** This week the bar is explicit — you must do **all
five** of these:

1. **Actually run a pretrained model on the images.** Not a plan, not a description — a real
   run that produced predictions on real image data.
2. **Report a quantitative result *with a baseline / control*.** A number alone is not enough;
   it needs something to beat. For example: classification **accuracy vs a majority-class
   baseline**; segmentation **IoU vs a trivial global-threshold baseline**; a count **vs a
   manual count on 2–3 images**.
3. **Do at least one image-specific validation.** Pick one: a **visual overlay** of the
   predictions on the raw image (the single most convincing check for image work), a
   **held-out evaluation** on images the model's head never saw, or a **class-balance check**
   (how many of each class — is the "accuracy" just the majority class?).
4. **Have Pi *look* at its own output (the vision check).** This is new this week and it is
   powerful: because you turned on vision in Part 2, Pi can open its overlays/montages and
   judge them. Ask it plainly — *"open the overlay for the crowded field and tell me whether
   the outlines actually sit on the cells or are off."* In our run this is exactly how the agent
   caught outlines drawn over a blank field and touching nuclei split in two — errors the count
   number alone hid. **Then look yourself** and see if you agree.
5. **Name one imaging caveat and how it could bias the result.** Choose a real one from your
   interview: **pixel size / magnification** differences, **staining or illumination
   variation** between sessions, or **class imbalance** — and say concretely how it could push
   the number the wrong way.

If a check fails, that's a finding, not a failure: *"here's the result, here's the overlay that
showed the model missing the dim cells, here's what I'd do next"* is a **stronger** outcome
than a polished number you never looked at.

> **You are the human in the loop — and in the final project, so is a real client.** No metric
> replaces a person looking at the picture. That is exactly why your deliverable in Part 5 is a
> viewer you can *see* results in and **mark what's wrong**: this week you are that reviewer;
> in the final project the data owner will be. Build the surface that lets a human catch what
> the numbers miss.

For the full five-family verification toolkit (smell test, triangulation, adversarial
prompting, show-its-work, controls), see
[Part 5 of Computer Lab 1](../../module-1/lab/#part-5--validate--verify-think-like-a-scientist).

## Part 5 — Build your deliverable: a deployable results app

> **⏱ 15:45–16:45 · start building at 15:45 no matter what; have the app running by 16:45.**
> Build the **Core** app first; reach for **Strong** only if it's running and time is left.

**This is new this week, and it matters.** Pi is a command-line agent — it **cannot show you
images**. But microscopy work is visual: a segmentation is only trustworthy once you *see* the
outlines on the cells. So this week your deliverable is a small **deployable web app** — a
**FastAPI** backend serving your images and results, with a **Tailwind** frontend — that lets
you, Friday's audience, and (in the final project) a real client **browse the images, see the
results overlaid, and mark what's wrong.** This is the product a forward-deployed scientist
ships: not a number in a chat, but a thing the problem-owner can open and use.

You **direct Pi to build it** and then **open it yourself and check every overlay and number.**
There are two tiers — do the **Core** first; reach for **Strong** only once Core runs.

**Core (required).** A FastAPI app that serves your field images, your overlay PNGs and your
`results.json`, with a Tailwind gallery: every field as a card showing the overlay, the
headline numbers, a **SAFE / SET-ASIDE** badge, and a summary panel on top (the headline metric
vs its baseline, plus the one caveat). It runs with `uvicorn app:app`.

```text
Package this work as a small deployable product so a human can SEE and CHECK the results.
Build a FastAPI + Tailwind app in this folder:

- app.py (FastAPI) that serves the field images, the overlay PNGs in results/overlays/, and
  results/results.json.
- A single-page Tailwind frontend at "/" (Tailwind via CDN): a gallery of all fields. Each
  card shows the overlay image, the machine result and the ground-truth result, the signed
  difference, and a colored SAFE / SET-ASIDE badge from the per-field decision.
- A summary panel at the top: number of fields, the headline metric vs its baseline, and one
  plain-language caveat sentence.
- requirements.txt and a short README with the exact run command.

Read everything from disk (no database). When done, tell me the exact command and port to run
it, then stop.
```

Then run it and **look at your own work** (`uv run` uses the env Pi built — same command on every
OS; Pi will also tell you the exact command):

```bash
uv run uvicorn app:app --reload --port 8000    # then open http://localhost:8000
```

**Strong (encouraged, only after Core runs).** Add a detail view where a human can **zoom into
one field and mark what the model got wrong** — the surface a real client uses to give you
feedback. This is the forward-deployed loop in miniature.

```text
Now add a detail view: click a field to open it large in a zoomable / pannable viewer with the
overlay on top, and a simple draw-annotation layer (click to drop points, or drag a box) with
a Save button that POSTs the annotations to FastAPI and writes results/annotations.json. This
is where a human marks the objects the model missed or invented. Keep using Tailwind; no
database — just append to the JSON file.
```

> **On the viewer library:** a zoomable canvas is all Core needs, and an agent will usually
> build one from plain JS. If you want true map-style zoom over a large field, **OpenLayers**
> (an image layer + a `Vector` draw interaction) is a good choice — name it explicitly in the
> prompt if you want it, or let Pi propose the lightest thing that works. Either passes; don't
> burn the clock fighting a library.

**Deploying it (optional, if you're ahead).** Because it's a normal FastAPI app, it deploys
like any web service — a `Dockerfile` and `uvicorn`, or a free host. You don't have to deploy
today, but building it *deployable* is the point: this is the artifact you hand a client.

**A short written summary accompanies the app** (a paragraph or small `summary.md` is fine):
the **goal**, the **result vs its baseline**, the **imaging caveat**, and your **AI-use
disclosure** (which agent did what, and what you verified yourself). The two course
non-negotiables still apply: **own every number** (if it's wrong, it's wrong under your name)
and **disclose the AI use**.

## What to hand in — and what we look at

> **⏱ 16:45–17:00 · write the summary, gather the folder, and upload by 17:00.** Don't run past
> 17:00; seminar prep is a separate job on Thursday (see the [Seminar 2](../seminar/) page).

Your submission is your **transcript(s) plus your analysis and your deliverable**:

- **The interview transcript** (Agent A) — downloaded from the portal as Markdown (`.md`).
- **The analysis transcript(s)** (Agent B / Pi) — Pi records each run as `.jsonl` under
  `~/.pi/agent/sessions/` (on Windows `C:\Users\<you>\.pi\agent\sessions\`). Hand in **either**
  the raw `.jsonl` **or** a readable `.md` / `.txt` log — we accept all three, and prefer a
  readable Markdown version. Include one per run if you launched Pi more than once. Include the
  analysis **code** Pi wrote.
- **Your app** — the deliverable folder (`app.py`, any templates/static, your `results/` with
  the overlays and `results.json`, `requirements.txt`, and the short README), **zipped into a
  single `app.zip`** (the **App** button takes one `.zip`).
- **The short written summary** — goal, result vs baseline, caveat, and AI-use disclosure
  (`summary.md`).
- **`AGENTS.md`** and **`spec.md`** — the brief and the spec you wrote.

**How to submit — all in the portal.** Open your week in the
[course portal](https://ddls-portal-6228434e.svc.hypha.aicell.io/) and click **Hand in** (also
on each week card and at the top of the week page). The **Computer-lab** card has **one upload
button per file**, so each lands under the right name on our server. Put your **name** in the
field at the top, and a short **note to the teachers** if you like. Re-submit any time — we
always grade your most recent upload. Please also fill the short **feedback panel** (a few 1–5
sliders plus boxes for ideas to improve the course and the portal) — it genuinely shapes what
we do next.

> **Gather everything in one place.** Let the agent collect your files. Paste this into **Pi**
> at the end of your run:
>
> ```text
> Make a folder called submissions/ in my current working directory. Zip my app folder (app.py,
> any templates/static, results/, requirements.txt, README) into submissions/app.zip. Copy
> summary.md, AGENTS.md and spec.md into submissions/. Then read every Pi session transcript
> from TODAY under ~/.pi/agent/sessions/ and, for each run, write a clean Markdown log of the
> whole conversation (my messages and your replies, in order) to
> submissions/analysis-transcript-1.md, analysis-transcript-2.md, … — plain readable text, not
> JSON. Finally, list exactly what you copied so I can check nothing is missing.
> ```
>
> Then download the **interview** transcript from the portal into the same `submissions/`
> folder, open the folder, and drag each file to its upload button.

**Deadline: Friday 10:00 CEST, before the seminar** — and you must submit **even if you can't
attend** the lab or seminar. The seminar deck is handed in separately via the **Seminar** card
(see the [Seminar 2](../seminar/) page). Missing a session with notice (email
[ddls-course@scilifelab.se](mailto:ddls-course@scilifelab.se) **before** the session) is
excused; a missing submission is not.

This lab is graded **pass/fail**, and — as all term — **we read the transcript.** We read it
for:

- Did you find the **question behind the question** (including the image-specific facts)?
- Where did you **refuse** what the agent handed you?
- What did you **check** — the overlay, the baseline, the caveat — and what did you take on
  faith?

A polished app on top of a transcript that shows no steering and no skepticism is not a pass. A
modest result with a transcript that shows real interviewing, translation and verification is
exactly what we're after.

## Next: prepare for the seminar

Wednesday's lab produced the work; **Friday's [seminar](../seminar/) is where you defend it.**
Presenters are **drawn at random**, so everyone prepares. On Thursday (not squeezed into the lab):

1. **Understand your own results.** Be able to say — without notes — what your headline number
   means, whether it beat the baseline, what the overlay shows, and the one caveat you'd flag.
   You own every number; the seminar is where you prove it.
2. **Build a short presentation** — a single self-contained **`slides.html`** deck **in your own
   visual style**, with your key visuals (an overlay or two, the metric-vs-baseline, the caveat)
   embedded right in the file. Your agent can draft it from your `summary.md`; then you fix it.
   The [Seminar 2](../seminar/) page has the format, a style menu, and a paste-ready prompt.
3. **Submit `slides.html` before the seminar** via the **Seminar** card in the portal —
   **deadline Friday 10:00 CEST**, required even if you can't attend.
4. **Be ready to be presented.** If you're drawn, we show your submitted deck on screen and you
   talk to it, so it must stand on its own and advance with the **← / → arrow keys**.

{{< cta cta_text="Prepare for Seminar 2" cta_link="../seminar/" >}}

---

Good luck, and have fun — this is the job. Remember the hard line: **at 15:45, stop analysing
and build the app.** A checked partial result you can *show* beats an unfinished perfect one.
