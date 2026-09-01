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

The lab runs **13:00–17:00 (4 hours)**. Week 1 was too intense and gave you no timing — this
week fixes that. The table below is a **guide**, not a stopwatch: work at your own pace, but
**do not run past 17:00**, and treat the 16:30 line as hard.

| Time | Duration | What you're doing |
|---|---|---|
| 13:00–13:15 | 15 min | Set up: start the environment install (it runs while you interview), open the portal, generate your API key |
| 13:15–13:45 | 30 min | **Interview** the data owner (Agent A) — get the image facts |
| 13:45–14:05 | 20 min | **Translate** the interview into goal · data · traps; write `AGENTS.md` / `spec.md` |
| 14:05–14:20 | 15 min | **Configure** the analyst (Agent B / Pi) in an empty folder |
| 14:20–15:50 | 90 min | **Direct** the analyst: run a pretrained model on a small image subset |
| 15:50–16:30 | 40 min | **Validate**: overlays, a held-out check or class balance, name one imaging caveat |
| 16:30–17:00 | 30 min | **Hard switch → build your deliverable** (the interactive viewer app + short write-up) |

> **At 16:30, stop analysing and start packaging** — whatever state you're in. A checked
> partial result beats an unfinished perfect one. Reserve the last half hour for the viewer
> and the short summary; that is what you present on Friday.
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
  path, channel, pixel size and trap).
- **Direct** the agent to run a **pretrained** model on a small image subset — no training
  from scratch — and **validate** it with overlays and a baseline, not vibes.
- Build a small **interactive viewer** (`viewer.html`) so you and the seminar audience can
  *see* the images and the results, and defend them on Friday.

> **What "good" means today.** The win is **completing the whole loop once** — interview →
> translate → direct → verify → build the viewer — with a result you actually checked and can
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

## Part 2 — Set up your environment (start this FIRST, at 13:00)

Kick off the install **before** the interview so it downloads while you talk to Agent A. It
pulls a **few hundred MB** (the CPU build of PyTorch is the big one), so it is not instant.

**No GPU is needed or expected** — everything in this lab runs on a laptop **CPU**, *provided
you work on a small subset of images*: **a handful (6–15) of images** for segmentation — each
one takes ~1–2 min on CPU — or a few hundred to a few thousand small **crops** for a
feature-based classifier. Do not try to process a whole dataset on a laptop.

Create a working folder for this lab (say `ddls-week2`), open a terminal inside it, and run:

```bash
python3 -m venv .venv && source .venv/bin/activate
pip install torch torchvision --index-url https://download.pytorch.org/whl/cpu
pip install timm "cellpose>=4.2,<5" scikit-image scikit-learn numpy pillow tifffile matplotlib
```

> **Windows PowerShell:** activate the venv with `.\.venv\Scripts\Activate.ps1` instead of the
> `source` line; the two `pip install` lines are identical. If PowerShell blocks the activate
> script, see the execution-policy fix in [Computer Lab 1, Part 2](../../module-1/lab/#part-2--set-up-your-analyst-agent--grab-your-materials).

While that installs, **download both of these** from this week's lab page in the portal into
your `ddls-week2` folder:

- **Your interview transcript** — the full chat with Agent A (`.md`). The analyst reads the
  transcript, never your notes.
- **The image dataset** — the real image file(s) Agent A was talking about. As in Week 1 the
  download is deliberately bare: the pixels and nothing that explains them. Everything a data
  dictionary *would* tell you — channels, pixel size, what's labelled — has to come from your
  interview and from opening the images.

### Set up Pi (the analyst agent)

This is the **same Pi setup as Week 1** — if you already have `~/.pi/agent/models.json` from
last week, it still works and you can skip to Part 3. If you joined this week, do it now; it is
repeated here in full so you don't need to flip back.

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

> **Run Pi inside the activated venv.** Launch `pi` from the same terminal where you ran
> `source .venv/bin/activate`, so the Python packages you installed (Cellpose, timm,
> scikit-image…) are on the path when Pi runs its code.

## Part 3 — Configure and direct the analyst (Agent B / Pi)

Same shape as Week 1: an **empty folder** → write `AGENTS.md` and `spec.md` from the interview
→ run Pi and direct it. Your transcript and the images are already in the folder from Part 2.

### Translate: build `AGENTS.md` and `spec.md`

Do this drafting **inside Pi**. Have it read your transcript and draft the two files; then
**review and correct** everything, working *from the transcript*, never from memory. As in
Week 1:

- **`AGENTS.md`** — the brief loaded every turn. Keep it under ~200 lines: the **GOAL** in a
  sentence or two, **where the images live and how to load them**, the **MUST-NOTs** (e.g.
  "don't rescale 16-bit images as if they were 8-bit", "don't mix channels"), and a pointer to
  `spec.md`.
- **`spec.md`** — every detail: **format, pixel dimensions, bit depth, channels and what each
  is, pixel size / µm-per-pixel, magnification, modality**, every trap (out-of-focus fields,
  illumination, batch variation), the **metric and baseline**, and what "done" looks like. In
  effect `spec.md` **is the data dictionary the download didn't come with** — you rebuild it
  from the interview and from opening the images.

> **Your spec is a draft until you've opened the images.** Everything the owner told you will
> be *slightly* wrong — a channel order, a stated pixel size, an image that's actually 16-bit.
> After Pi loads the images, **come back and correct `spec.md`** against what the files actually
> contain. Interview → draft spec → *load images* → fix spec is the loop. For the full
> translation method (review-as-prose, then split, then iterate), see
> [Part 3 of Computer Lab 1](../../module-1/lab/#part-3--translate-build-agentsmd-and-specmd).

### Direct: run a pretrained model on a small subset

Point Pi at the task and iterate. Make it **explain the images back to you first** — shapes,
dtype, channel count, intensity ranges, anything that contradicts the spec — *before* it
analyses anything. Mismatches here are gold. Then have it **plan before it codes**, and start
on **one slice**: a handful of images, end to end, before scaling.

**A starting prompt you can paste** (adapt the last line to your task):

```text
Read AGENTS.md and spec.md, then load a FEW images from the dataset in this folder.
First, tell me what you actually see — image shape, dtype/bit depth, number of channels,
intensity ranges per channel, pixel size if in the metadata, anything that contradicts the
spec. Do NOT analyse yet. Save one raw image (and each channel) as a PNG so I can look at it.
Then give me a numbered plan for answering the question in spec.md, name the pretrained model
you'd use and why, and flag the two places the plan is most likely to be wrong.
Wait for me to approve the plan before you write any analysis code.
```

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

## Part 4 — Validate (the raised bar)

**Code that runs is not code that's right.** This week the bar is explicit — you must do **all
four** of these:

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
4. **Name one imaging caveat and how it could bias the result.** Choose a real one from your
   interview: **pixel size / magnification** differences, **staining or illumination
   variation** between sessions, or **class imbalance** — and say concretely how it could push
   the number the wrong way.

If a check fails, that's a finding, not a failure: *"here's the result, here's the overlay that
showed the model missing the dim cells, here's what I'd do next"* is a **stronger** outcome
than a polished number you never looked at. For the full five-family verification toolkit
(smell test, triangulation, adversarial prompting, show-its-work, controls), see
[Part 5 of Computer Lab 1](../../module-1/lab/#part-5--validate--verify-think-like-a-scientist).

## Part 5 — Build your deliverable: an interactive image-and-results viewer

**This is new this week, and it matters.** Pi is a command-line agent — it **cannot show you
images**. But microscopy work is fundamentally visual: a segmentation is only trustworthy once
you *see* the outlines on the cells, and a classifier is only convincing once you *see* which
images it got right. So this week your deliverable is not just a written report — it is a small
**interactive web app** that lets you, and Friday's audience, **browse the images and see the
analysis results overlaid**.

Build it as a **single self-contained `viewer.html`** — plain HTML + JavaScript, **no build
step**, opens by double-click in any browser. Keep it **lightweight**: an afternoon-sized
artifact, not a framework app. **Direct Pi to build it from your results** (Pi writes the
HTML/JS and can embed images as data-URIs or reference the local image files), then **open it
yourself and check it** — the whole point is that you look at your own results.

**A concrete spec you can hand to Pi:**

```text
Build me a single self-contained viewer.html — plain HTML + vanilla JavaScript, CSS in a
<style> tag, no CDN links, no build step. It must open from a double-click and work offline.

It shows my microscopy analysis so a seminar audience can SEE the results:
1. A gallery/grid of image thumbnails.
2. Click a thumbnail to open that image large, with the model's result OVERLAID — for
   segmentation, the predicted outlines/mask on top of the raw image (a toggle to show/hide
   the overlay is a plus); for classification, the predicted class + confidence shown beside
   the image.
3. A summary panel with the HEADLINE metric and the BASELINE it beats
   (e.g. "accuracy 0.82 vs 0.55 majority-class baseline", or "mean IoU 0.71 vs 0.20 threshold").
4. A short caveats note: the one imaging caveat I identified and how it could bias the result.

Embed the images with a script, not by hand: write the HTML referencing PNG filenames first,
then run a short Python script that rewrites each src into a base64 data URI inside the file.
Do NOT print base64 into the chat, and do NOT fetch images at runtime (that breaks from disk).
Use only numbers that appear in my actual results files. Keep it to one file.
```

Then **open `viewer.html` and check it** against your own output — every overlay, every number.
If an overlay looks wrong, that's exactly the kind of thing the room will catch on Friday, so
catch it now.

**A short written summary accompanies the viewer** (a paragraph or a small section is fine): the
**goal**, the **result vs its baseline**, the **imaging caveat**, and your **AI-use disclosure**
(which agent did what, and what you verified yourself). The two course non-negotiables still
apply: **own every number** (if it's wrong, it's wrong under your name) and **disclose the AI
use**. You can ask Pi to fold this summary into the top of `viewer.html`, or keep it as a short
`summary.md` — either is fine.

## What to hand in — and what we look at

Your submission is your **transcript(s) plus your analysis and your deliverable**:

- **The interview transcript** (Agent A) — downloaded from the portal as Markdown (`.md`).
- **The analysis transcript(s)** (Agent B / Pi) — Pi records each run as `.jsonl` under
  `~/.pi/agent/sessions/` (on Windows `C:\Users\<you>\.pi\agent\sessions\`). Hand in **either**
  the raw `.jsonl` **or** a readable `.md` / `.txt` log — we accept all three, and prefer a
  readable Markdown version. Include one per run if you launched Pi more than once. Include the
  analysis **code** Pi wrote.
- **`viewer.html`** — your self-contained interactive deliverable.
- **The short written summary** — goal, result vs baseline, caveat, and AI-use disclosure
  (`summary.md`, or embedded at the top of the viewer).
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
> Make a folder called submissions/ in my current working directory. Copy my viewer.html,
> summary.md, AGENTS.md and spec.md into it. Then read every Pi session transcript from TODAY
> under ~/.pi/agent/sessions/ and, for each run, write a clean Markdown log of the whole
> conversation (my messages and your replies, in order) to submissions/analysis-transcript-1.md,
> analysis-transcript-2.md, … — plain readable text, not JSON. Finally, list exactly what you
> copied so I can check nothing is missing.
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

A polished viewer on top of a transcript that shows no steering and no skepticism is not a
pass. A modest result with a transcript that shows real interviewing, translation and
verification is exactly what we're after.

---

Good luck, and have fun — this is the job. Remember the hard line: **at 16:30, stop analysing
and build the viewer.** A checked partial result you can *show* beats an unfinished perfect one.
