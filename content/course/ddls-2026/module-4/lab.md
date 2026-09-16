---
title: "Computer Lab 4: Interview a Structural-Biology Data Owner, Direct an Analyst to Trust a Protein Structure"
linkTitle: "Computer Lab 4"
summary: ""
weight: 10
type: book
---

Welcome to the fourth computer lab. You run the **exact same job** as weeks 1–3 — the
**forward-deployed scientist**: take someone else's biological problem, interview them until the
question is precise, and come back with a working, checked answer, with an AI agent doing the labour
and you supplying the judgement. What changes this week is the data: it is now a **protein — a
sequence and a 3D structure that comes with a confidence score** (an AlphaFold model). And the
**bar goes up in a specific way**: this week the owner has a structure that *looks* convincing, and
they are about to trust it for **exactly the wrong question**.

You still talk to **two** agents, and you are still the only link between them:

- **Agent A — the structural-biology data owner.** A simulated researcher who has a protein, an
  AlphaFold model, and a real decision to make — and who is **already sure the model tells them what
  they need**. You **interview** it. It answers a good question honestly and a vague one uselessly,
  and it will happily confirm the confident-looking picture it likes. It will **not** tell you what's
  wrong with it — that's your job.
- **Agent B — the analyst.** Your local coding agent, **Pi**, which starts as an *empty folder*. You
  **configure** and **direct** it to fetch the structure, read the **right** confidence for the claim,
  check the structure actually *is* the owner's protein, and return an answer you can defend.

Nothing passes between A and B except what **you** write down. That channel — you — is exactly the
skill being examined.

> **New to the toolchain? Do [Computer Lab 1](../../module-1/lab/) first.** This page assumes you
> already know the base Pi setup from weeks 1–3. If you joined this week, the full Pi install and
> gateway config is repeated in **Part 2** below so you can follow it standalone.

{{< toc >}}

## Suggested time budget

The lab runs **13:00–17:00 (4 hours)**. The table below is a **guide**, not a stopwatch: work at
your own pace, but **do not run past 17:00**, and treat the 15:45 switch to building as hard.

| Time | Duration | What you're doing |
|---|---|---|
| 13:15–13:30 | 15 min | Set up **Pi**, point it at the gateway, open the portal, generate your API key, and **`git init`** your working folder |
| 13:30–14:00 | 30 min | **Interview** the data owner (Agent A) — the molecule, the files, the question, and *what they're sure of* |
| 14:00–14:30 | 30 min | **Translate**: have Pi draft `AGENTS.md` / `spec.md`, **review them by hand**, then have **Pi set up the Python environment** |
| 14:30–15:45 | 75 min | **Direct** the analyst: fetch from AlphaFold DB **and** fold the construct on our service, read the **right** confidence, run the **structure check** — and **commit a snapshot** each time something works |
| 15:45–16:45 | 60 min | **Build your deliverable** — the 3D structure + confidence viewer; open it and check every number |
| 16:45–17:00 | 15 min | Write the short summary and **gather your submission** folder |

> **No local GPU needed.** This week's examined path uses **two** structure sources — the **AlphaFold
> Database** (the owner's downloaded model) *and* folding the owner's **actual construct** on the
> **course GPU fold service** — and neither runs on your laptop. The database model is already computed;
> the fold service runs on **our** GPUs, is **free**, and returns in seconds. If it's briefly busy you
> wait and retry, so **you are never blocked by compute**. See the two required sources in
> [Part 2](#getting-a-structure--two-required-sources-plus-optional-extras).

> **Treat 15:45 as a hard switch: stop analysing and build the viewer** — whatever state your
> analysis is in. A checked partial result you can *show* beats an unfinished perfect one. The
> analysis loop itself is cheap — a couple of minutes of agent work for a few cents — so the clock
> goes to *your* thinking, reviewing and checking, not to waiting on Pi. Reserve the last stretch for
> the viewer and the summary; that is what you present on Friday.
>
> **Seminar preparation is separate.** You prepare the seminar *later* — on Thursday, ~30–45 minutes —
> not inside these four hours (see the [Seminar 4](../seminar/) page). Don't try to build slides today.

## Learning goals

By the end of this lab you should be able to:

- Run a structured **interview** with a *structural-biology* data owner, surfacing not just the data
  facts (what the protein is, the sequence, how long, one chain or a complex, predicted or
  experimental) but **exactly which part of the structure they intend to trust, and for what
  decision** — because that is where the trap lives.
- Reuse **Pi**, your local analyst agent, pointed at the course portal.
- **Work with 3D structural data and external resources**: direct Pi to fetch a pre-computed model
  from the **AlphaFold Database** by accession, read its **per-residue confidence (pLDDT)** and its
  **error matrix (PAE)**, and **fold the owner's actual construct or complex** on the course's **GPU
  fold service** — the sequence that isn't in the database in the form you need — reading *its*
  confidence too.
- **Translate** the interview into an `AGENTS.md` (the brief) and a `spec.md` (the protein, the files,
  the exact claim to test, the confidence that matches it, and the check that could break it) — and
  **review them by hand** before you run anything.
- Direct the agent with the **escalated prompt recipe** — the same four-part recipe as weeks 1–3, now
  with two new clauses: **CONFIDENCE CHECK** and **STRUCTURE CHECK**.
- **Read the confidence that matches the claim** — per-residue pLDDT for a claim about a fold or a
  region; PAE / interface error for a claim about how two chains or domains sit together — and refuse
  a confident-looking cartoon when the relevant confidence isn't there.
- **Catch a planted trap** (a disordered region read as a solid fold; high per-chain confidence
  mistaken for evidence of binding; a model of the canonical sequence that isn't the owner's mutant
  construct; a monomer model whose "surface" is really a buried dimer interface) and report the
  **honest answer** even when it disappoints the owner.
- **Use git as a safety net** — direct Pi to commit a working snapshot so you can recover when the
  agent breaks something.
- Deliver a **3D structure + confidence viewer** (FastAPI + Tailwind, structure rendered with
  3Dmol.js, coloured by confidence, with a PAE heatmap) and a **structured, professional report** that
  leads with the answer, states the right confidence next to the claim, names the trap and the honest
  truth, and discloses the AI use.

> **What "good" means today.** The win is **completing the whole loop once** — interview → translate →
> fetch → read the right confidence → structure check → answer → viewer — with a result you actually
> checked and can *defend*. **An honest "the model doesn't support that claim — here's what it does
> support" beats a confident answer read off the wrong number.** The skill on trial is whether you can
> tell the difference.

### The one rule: it must be someone else's problem

As every week, you work **Agent A's** problem, not your own. With protein structure this matters just
as much: if it's your own protein, you already "know" what the fold looks like and you never stop to
ask whether the model is confident *there*, or whether it's even the right sequence. Being the
outsider forces you to ask *"how sure is the model about exactly these residues? is this the same
construct you use at the bench? is the working enzyme really a single chain?"* Do not use your own
protein.

### The raised bar this week: the confident structure that answers the wrong question

Weeks 1–3 taught you to make a vague brief definite and to tell a flashy number from a true one. This
week the object of suspicion is a **3D structure**, and the trap is subtler: the model is often
genuinely good — high confidence, a clean cartoon — but it is confident about **the wrong thing for
the owner's question**, or it isn't even a model of **their** protein:

- a region **looks** like a neat folded helix in the viewer, but the **per-residue confidence there is
  low** — it's a floppy, induced-fit motif, not a stable domain you can design against;
- two proteins each fold at **high per-chain confidence**, and the owner reads that as *"so they
  bind"* — but the **interface error is huge**: the model has no idea how the two chains sit together;
- the owner hands you "the AlphaFold structure for my protein", but the model is the **canonical
  sequence** and their construct is a **mutant, or truncated** — the structure isn't their protein at
  the one position that matters;
- a **beautiful, high-confidence monomer** — but the functional enzyme is a **dimer**, so the "surface"
  residues the owner wants to mutate are partly the **buried interface** the model doesn't even show.

Your owner will be **confidently wrong** — reassured by a picture — and unable to see it. The examined
skill climbs to three things: **(1)** read the confidence that *matches the claim*, not the global
score; **(2)** confirm the structure actually represents their protein and their assembly; **(3)** hand
back the honest answer — the residues they can trust, or the plain statement that the model doesn't
support what they want to do. That is the whole lab.

## Access the portal

Everything for today lives behind one course portal. It hosts Agent A (the structural-biology
data-owner chatbot), issues the **API key** your local analyst agent will use (and which also unlocks
the GPU folding service), and lets you **download** both the data bundle and your interview transcript.

{{< cta cta_text="Open the course portal" cta_link="https://ddls-portal-6228434e.svc.hypha.aicell.io" >}}

**Already activated?** Just **Sign in** with your email and password. **First time?** Choose
**Activate account**, enter the email you registered with plus the course code we sent you, and set a
password. If the email or code is not recognised, tell a TA in the chat — don't burn lab time on it.

What the portal gives you (the same four things as every week, now for a protein):

- **Chat with the data owner** (Agent A) — your interview happens here, in the browser.
- **Download your interview transcript** — the full chat, to feed into Part 3.
- **Generate an API key** — for your local analyst agent (Part 2) *and* the GPU folding service, on
  your **dashboard**.
- **Download the data bundle** — the real file(s) Agent A is talking about (a FASTA, the AlphaFold
  model, its confidence files).

> **You are assigned one data owner.** As in weeks 2–3, the portal gives you **one** owner with one
> protein and one decision — you work the one you're given; you don't choose, exactly as a real client
> lands on your desk.

## Part 1 — Interview the structural-biology data owner (Agent A)

> **⏱ 13:30–14:00 · finish interviewing by 14:00.** (Kick off the Part 2 setup first, at 13:15 — Pi
> installs and the data bundle downloads while you interview.)

Open the **chat with the data owner** in the portal. Agent A is playing a researcher who has a
protein, an AlphaFold model, a real question, and **a part of that model they are already relying on**.
Your job is to **steer a conversation** until you could hand the whole thing to someone who has never
seen this protein — *and* until you understand what they intend to trust well enough to check it.

> The entire chat is **logged server-side** — there is no separate "submit interview" step. But at the
> end, **download the transcript**: you need it for Part 3, and the analyst reads the transcript, never
> your notes.

> **Heads-up: your owner is a *person*, and we simulate different personalities on purpose.** Some are
> warm and chatty, some are terse, impatient, or defensive, some are anxious and want to rush you past
> the checks. This is deliberate — a real data owner has a temperament too, and part of the skill is
> getting a *complete, honest* answer regardless of how the conversation feels. Don't be thrown by a
> blunt "why does that matter?" or a proud "it looks great, just read me the residues": stay calm,
> ask one sharp, specific question at a time, and a difficult owner will still give you the truth. If
> an owner is prickly, that's the simulation, not you — adapt your manner and keep steering.

**The two coaching helpers work exactly as in weeks 1–3.** On every message you send there is a
**wand — "Coach me"** (hints on how your question could have been sharper — never a rewrite; use it
early and often) and a **pencil — "Edit"** (pull the message back, rephrase, and get a fresh answer).
Beside the Send button there is a second **wand** (💡 lightbulb, the "suggest a question" helper) that
proposes questions aimed at the gaps you haven't covered — suggestions are **free**, so press it
whenever you stall. For the full explanation see
[Part 1 of Computer Lab 1](../../module-1/lab/#part-1--the-interview-agent-a).

### This interview is about what they intend to *trust* — raise your game

The owner isn't hiding anything on purpose. They are **confidently wrong** because a structure viewer
makes everything look solid, and a confident picture is the most disarming thing to interview around.
Three techniques move you up a level:

- **Funnel to the exact residues and the exact claim.** Open wide ("walk me through the protein and
  what you're trying to decide"), then narrow relentlessly onto the *one part of the model they will
  act on* — which residues, for what (design a binder here? mutate this surface? find this pocket?).
  A model can be excellent overall and wrong exactly where they're pointing. If a question doesn't pin
  down *what they'll trust and where*, don't ask it.
- **Mine the confidence, don't share your doubt.** The owner's certainty is your best clue to the trap
  — so get them to describe *why* they trust the model ("it looks great", "it's 98", "both chains
  fold") **without tipping them off** that you doubt it. A real bench scientist doesn't think in pLDDT
  or PAE and will get defensive if you lecture them. Ask *what they see* and *what they'll do with it*,
  and keep your diagnosis to yourself.
- **Play it back.** Before you leave the chat, say the whole thing back in two sentences — "so you want
  the residues that line the nucleotide pocket in *your* G12D construct, to aim an inhibitor at" — and
  let them correct you. A playback the owner signs off on is the strongest evidence your interview
  landed, and the teaching team reads for it.

### The checklist: what to pin down with a protein structure

A structure file is not self-explanatory, and a confident cartoon is actively misleading if you don't
know what it represents. Walk the checklist below; if you cannot answer a group afterwards, you have
not finished the interview.

**THE MOLECULE**
- What **is** it — one protein, or several chains that act together? Roughly **how many residues**? Do
  they have the **sequence (FASTA)**?
- Is there an **experimental** structure, or only a **prediction**? Whose prediction — the **AlphaFold
  Database**, or something they ran themselves?
- Is the model a **single chain**, or an **assembly** (a dimer / a complex)? What is the **functional
  unit** in the cell — does this protein work alone, or does it partner up?

**THE FILES & FORMATS**
- Which files do they have — **FASTA** (sequence), **PDB / mmCIF** (structure)? What's in each?
- Does the structure carry a **per-residue confidence** score, and is there a **PAE / error matrix**?
  *(You'll read these in Part 3 — the interview is where you learn they exist.)*
- Does the model's **sequence match the exact construct** they use at the bench — same length, any
  **mutations**, any **tags or truncations**?

**THE QUESTION**
- What do they actually want to know — *is this region a real, stable fold? where's the pocket? does
  this binder bind? which residues should I mutate?* — and **what wet-lab decision hangs on it**?
- **Who acts on the answer, and how costly is being wrong** — which mutations they'll make, which
  molecule they'll synthesise, which experiment they'll spend a month on.

**CONFIDENCE & TRUTH**
- **How sure are they** the model is right *for the part they care about*? Do they know what the
  confidence score actually means, or are they going on the picture?
- Is there any **experimental check** — a crystal structure, an assay, established biology — you could
  triangulate against?

**TRAPS — for you, never say these aloud**
- a region that looks folded but is only **confident on average** (a disordered / induced-fit motif);
- **high per-chain confidence** read as evidence of **binding** (the interface error ignored);
- the model is the **canonical sequence**, not their **mutant / truncated** construct;
- the model is a **monomer** but the real enzyme is a **dimer**, so the "surface" is partly buried.

> **Get them to describe the model and what they'll do with it — then keep your doubts to yourself.**
> The thing they're most reassured by is almost always the thing to check. Their confidence is the
> single best clue to where the trap is.

### Steering — every vague answer has one follow-up that fixes it

Assume nothing is defined until *you* have made it definite. When you get a boast or a hand-wave, ask
the one question that pins it down:

| What they say | What you ask back |
|---|---|
| "AlphaFold gave me a structure and it looks great." | "Great how — is it confident *everywhere*, or only in parts? Which exact residues are you going to rely on?" |
| "There's a nice helix right here I want to target." | "How confident is the model for *exactly those* residues? And is that region structured on its own, or only when it grabs onto something?" |
| "Both my proteins fold really well, so they form a complex." | "Folding well on their own says each is a real fold — but how sure is the model about *how they sit together*? Any experimental sign they actually bind?" |
| "Here's the structure for my construct." | "Is your construct identical to the standard sequence — same length, any mutations? Where did the sequence in this model come from?" |
| "I'll just mutate these surface residues to kill the activity." | "Is the working enzyme a single chain, or does it assemble? Could any of those 'surface' residues be buried where two copies meet?" |

## Part 2 — Set up Pi and grab your materials (start this FIRST, at 13:15)

> **⏱ 13:15–13:30 · be set up by 13:30.** Do this before Part 1, so Pi is ready the moment your
> interview ends. **You don't install the Python analysis packages here** — you'll direct **Pi** to do
> that in Part 3, once the interview tells you what the task actually needs.

**No GPU is needed on *your* machine.** You **download** the owner's AlphaFold model (small — all under
~400 residues) and read it on a laptop CPU in seconds with biotite/biopython + numpy. And when you
**fold the owner's actual construct** — a required step this week — that runs on the **course GPU fold
service** over a single HTTPS call, not on your laptop. See the two required sources below.

Create a working folder for this lab and open a terminal inside it — this is the empty room your
analyst agent will work in:

```bash
mkdir ddls-week4 && cd ddls-week4
```

**Download the data bundle now** from this week's lab page in the portal into that folder. As every
week the download is deliberately bare: the file(s) and nothing that explains them. Everything a data
dictionary *would* tell you — what the model represents, whether it matches their construct, whether
it's the whole assembly — has to come from your interview and from opening the files.

> **Your interview transcript comes later.** You download it from the portal at the **end of Part 1**
> (once you've actually interviewed Agent A) — it doesn't exist yet. Save it into this same
> `ddls-week4` folder so the transcript and the data sit together for Part 3.

### Put your folder under version control (new this week)

This week you add **one** new habit, and it will save you at least once today: **git**. Not as a
ceremony — as an **undo button for your agent**. Pi is fast and mostly right, but occasionally it will
"fix" something and break three others, or overwrite a file that was working. A committed snapshot lets
you jump back to the last good state instead of re-doing an hour of work.

**You don't run git by hand — you *tell Pi* to set it up**, the same way you direct everything else.
When you launch Pi in [Step 2](#step-2--draft-agentsmd-and-specmd-with-pi), include this in your first
instruction:

> *"Initialise this folder as a git repository. Create a `.gitignore` that excludes `.env`, `.venv/`,
> `__pycache__/` and `*.pyc` so my key is never committed, and make one initial commit. Then add a
> **Version control** rule to `AGENTS.md`: **before any big change** — installing packages, rewriting a
> working file, a large refactor — **commit the current state first**, and **commit again whenever
> something starts working**, with short, clear messages, so we always have history to roll back to."*

That last part is the trick: the rule lives in **`AGENTS.md`**, so Pi follows it **every turn without
you re-asking**. You *direct* the agent to protect your work once, and then it keeps doing it on its
own. You'll still nudge it to commit at the obvious milestones (below) — but the safety net is now a
standing rule, not something you have to remember.

### Set up Pi (the analyst agent)

**Did [Computer Lab 1](../../module-1/lab/), 2 or 3?** Your Pi still works — one small tweak this week:
make sure vision is on, because reading a structure is partly *looking* at it (the coloured model, the
PAE heatmap). Open `~/.pi/agent/models.json` and confirm the model's `input` line reads
`["text", "image"]` (Week 2 already set this; if yours says `["text"]`, change it). Then skip straight
to [Part 3](#part-3--configure-and-direct-the-analyst-agent-b--pi). **New this week?** Expand **Full Pi
setup** and do it once.

<details>
<summary><b>Full Pi setup</b> — expand only if you don't have Pi yet (new this week)</summary>

Your analyst agent is **Pi**, a lightweight coding agent. It runs **on your own machine** and talks to
the course model **through the portal gateway** — so every call counts against your portal budget, and
the teaching team sees the transcript. Pi reads an `AGENTS.md` context file and can run code, read
files and write output.

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

(Hit an `EACCES` permission error on macOS/Linux, or a "running scripts is disabled" error on Windows?
Both fixes are in [Computer Lab 1, Part 2](../../module-1/lab/#part-2--set-up-your-analyst-agent--grab-your-materials).)

**3. Point Pi at the DDLS gateway.** Pi ignores `OPENAI_BASE_URL`, so it needs a custom provider file.
Create `~/.pi/agent/models.json` with exactly this:

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

> The `samplingParams` line is **required** — it's what lets the course model use tools. `input` is
> `["text", "image"]` so Pi can *look* at a structure image or a PAE heatmap this week. Don't try to
> set `OPENAI_BASE_URL`; Pi won't read it.

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
The `touch` line matters: `open -e` refuses a file that doesn't exist yet. TextEdit opens it — paste,
**⌘ S**, close. (`~` is your home folder; Finder hides it — press **⌘ ⇧ .** to see it.)

**Linux:**
```bash
mkdir -p ~/.pi/agent
nano ~/.pi/agent/models.json
```
Paste, then **Ctrl + O**, **Enter** to save and **Ctrl + X** to quit.

**Prefer an editor you already use?** `code ~/.pi/agent/models.json` opens it in VS Code on any OS. Or,
on macOS/Linux, write the whole file in one go with a heredoc (the quotes around `JSON` keep
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

**4. Save your portal API key to a `.env` file.** Generate a key in the portal (**Generate API key** on
your dashboard). **The portal shows the key only once**, so save it immediately. Inside your
`ddls-week4` folder, create a file called `.env` with a single line:

```
DDLS_API_KEY=paste-your-portal-key-here
```

> **Key hygiene.** Treat this key like a password: never commit it or share it. You already added
> `.env` to `.gitignore` above. On Windows, create the file with
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
it's talking to the portal. Pi can read/write files and run shell commands in that folder. It has **no
built-in web search**. Keep an eye on the usage meter on your dashboard.

</details>

### Level up Pi with extensions (optional)

> **EXPLORE IF YOU HAVE TIME — none of these are required to pass.** Pi does everything today's lab needs
> out of the box, so you can skip this entirely. But it's worth knowing how Pi is built: it is
> **minimal by design** — a small, fast core. To make it match the bigger commercial agent harnesses
> (web browsing, richer code tools, sub-agents, and more), you add **extensions**. Browse and try what's
> useful at **<https://pi.dev/packages>** — at least **bookmark it for later**. Install through Pi's own
> package mechanism; open each page for the exact command (don't guess). A few worth knowing:
>
> - **[`pi-web-search`](https://pi.dev/packages/pi-web-search)** — gives Pi **web search**. Pi has
>   *none* built in, so this is the handy one this week: looking up a **UniProt accession**, checking
>   what a domain does, or confirming a method.
> - **[`pi-code`](https://pi.dev/packages/pi-code)** — **stronger code tooling** for the analyst.
> - **[`pi-subagent`](https://pi.dev/packages/@arcanemachine/pi-subagent)** — lets Pi **spawn
>   sub-agents** to run **parallel subtasks** (e.g. fold a batch while it reads the PAE).
>
> Think of these as **power-ups for fast finishers** — skip them and you can still ace the lab.

### Getting a structure — two required sources, plus optional extras

A protein structure has to *come from* somewhere, and this week the examined path uses **two** sources,
**both required**: you fetch the owner's protein from the **AlphaFold Database** *and* you fold their
**actual construct/complex** on the course's GPU fold service — then you read the confidence that
matches the claim on each and compare. Neither needs a GPU on *your* laptop.

- **AlphaFold Database — REQUIRED (cross-check, zero GPU).** This is the owner's **downloaded
  structure** — their starting point, the thing they've been staring at. The owner's protein is a real
  UniProt entry, so its full-length model is **already computed and free**. Direct Pi to fetch it by
  accession from the EBI API — resolve the file URLs through
  `https://alphafold.ebi.ac.uk/api/prediction/<ACCESSION>` (it returns `cifUrl` and `paeDocUrl`), then
  download the **mmCIF** (the per-residue **pLDDT** confidence is stored in the *B-factor column*) and
  the **PAE** JSON (the pairwise error matrix). Use it as your **cross-check**: it's the model the owner
  trusts, and half the job is showing where that trust is misplaced. *(If the owner's protein is already
  in the bundle as a `.cif`, you can read that directly — but knowing how to fetch by accession is part
  of the skill.)*

- **Our GPU fold service — REQUIRED (fold the owner's actual construct/complex).** The AlphaFold DB
  holds the **canonical, full-length** protein. Most owners hand you a sequence that **isn't there in
  the form you need** — a **designed construct**, a **mutant or truncation**, or a **two-chain
  complex**. You must fold **that exact sequence** on our service and read *its* confidence, then compare
  it against the database model. The course hosts a small **key-gated ESMFold** service on our own GPUs;
  there are **two ways** to use it.

  - **Easiest (recommended): the skill doc.** On your week page in the portal, open the **"Fold a
    structure on our GPU"** card and click **Copy skill** — it copies a single `/skill.md?token=…` URL
    that already carries your key. Paste it to your analyst (Pi): *"read this and use it to fold
    sequences that aren't in the AlphaFold DB."* Pi fetches it and learns the whole API — endpoint,
    body, limits — **by itself**. You never hand-write the request.
  - **By hand.** Copy the **endpoint** and **fold key** from the same card and POST directly:

    ```bash
    curl -s -X POST <fold endpoint from the portal card> \
      -H "Authorization: Bearer <fold key from the portal card>" -H "Content-Type: application/json" \
      -d '{"sequences": ["<chain A sequence>", "<chain B sequence>"]}'
    ```

    (Use `{"sequence": "<one sequence>"}` for a single chain.) It returns `{pdb, plddt, mean_plddt, pae,
    ptm, chain_lengths, interface_pae_mean, ...}` — everything you need to read per-residue confidence
    and, for a complex, the interface error.
  - **Limits & reliability.** **≤ 400 residues total, ≤ 2 chains, one fold at a time, 40 folds/hour**,
    and a fold takes **~1–5 seconds**. **Folds are FREE** — they don't touch your portal budget. If a
    call comes back **HTTP 429 or 503 with a `Retry-After` header**, the service is **up** but busy or
    loading a model — **wait those seconds and retry**. A connection error / **502 / 504** means it's
    unreachable — then fall back to any structure file already in your bundle, or tell the teaching team.
    Don't let a busy queue stall your afternoon.

  > **How we run this service (transparency).** It's a small **FastAPI** service running the open-source
  > **ESMFold** model (`facebook/esmfold_v1`) on the course's own GPUs — **2× NVIDIA RTX 5090** — behind
  > a shared key. Your request queues for the next free GPU and comes back in seconds; folds are free
  > because it's *our* hardware, not a paid API. This is exactly the pattern the whole course is about:
  > **wrap a model behind an API your agent can call** — you just get to use ours instead of building it
  > today.

- **Google Colab CLI — EXPLORE IF YOU HAVE TIME (optional).** Run ESMFold / ColabFold yourself on a
  free Colab **T4** GPU. This teaches the general "offload to a cloud GPU" skill, but it is **fragile
  and time-boxed** (quotas, timeouts; on Windows you'll want WSL, or just use the fold service above).
  **For the curious, never required — don't let it eat your afternoon.**

<details>
<summary><b>Run your own fold service</b> — EXPLORE IF YOU HAVE TIME (optional, needs a GPU)</summary>

You can **self-host the exact same thing** — it's not magic. Install the deps
(`pip install torch transformers fastapi uvicorn`), load the model once at startup with
`EsmForProteinFolding.from_pretrained("facebook/esmfold_v1")`, and wrap a tiny FastAPI `POST /fold`
that takes a sequence and returns the PDB + pLDDT + PAE — the same shape our service returns. That's the
whole service, and it's the same "wrap a model behind an API" pattern you're using today.

**You need a CUDA GPU with ~16 GB of VRAM.** ESMFold will **not** run on a laptop CPU in any reasonable
time, so treat this as a "try it if you have a GPU" pointer, not a step in today's lab. Model card and
usage: **<https://huggingface.co/facebook/esmfold_v1>**.

</details>

> **Direct, don't do.** Whichever source you use, *you* tell Pi what to fetch or fold and *you* judge
> what comes back — you don't hand-run the download. The skill is the direction and the check, not the
> curl.

> **You haven't installed the Python analysis packages yet — that's deliberate.** In Part 3 you'll
> direct Pi to set up the environment (with `uv`) and install exactly what your task needs
> (biotite/biopython, numpy, matplotlib). For now, just confirm Pi runs and can see your transcript and
> the data bundle.

## Part 3 — Configure and direct the analyst (Agent B / Pi)

> **⏱ 14:00–15:45 · finish directing by 15:45.** Steps 1–4 (draft, review, set up the environment) by
> ~14:30; Step 5 (direct the analysis) 14:30–15:45. At **15:45 you stop analysing**, whatever state
> you're in, and move to Part 5.

This is where the real skill lives, and it is the **way of working you reuse every week of the
course**: you don't do the analysis — you **direct** an agent to do it and you **judge** what comes
back. Same shape as weeks 1–3 (an empty folder → `AGENTS.md` + `spec.md` → run Pi). Work through the
steps in order.

### Step 1 — Get your inputs in the folder

You already have both: your **interview transcript** (downloaded at the end of Part 1) and the **data
bundle** (downloaded in Part 2), sitting together in your `ddls-week4` folder, with Pi able to see
them. Nothing else.

### Step 2 — Draft `AGENTS.md` and `spec.md` *with* Pi

Launch Pi and have it read the transcript and the files and draft both, so you start from a real draft,
not a blank page:

```text
Read my interview transcript (the .md file in this folder) and look at the data file(s) — there is a
protein sequence (FASTA) and/or a structure (.cif/.pdb) with confidence files. First set up version
control: initialise this folder as a git repository, add a .gitignore that excludes .env, .venv/,
__pycache__/ and *.pyc (so my key is never committed), and make one initial commit. Then, from ONLY
what the transcript and the files actually show, write two files, then stop — do not analyse anything yet:

1. AGENTS.md — how you operate here: the environment (use uv — create it with `uv venv` and run all
   Python with `uv run`, which works the same on every OS), where the data lives and how to load a
   structure (pLDDT is in the B-factor column of the mmCIF; PAE is in the JSON), where to write
   outputs (results/), a **Version control** rule (this folder is a git repo — commit the current state
   *before* any big change, and commit again whenever something starts working, with short clear
   messages), and the rule that you never report an answer about a structure without first reporting the
   confidence that matches the claim AND confirming the model is actually this protein.
2. spec.md — the problem: the exact decision the owner needs, the protein (how many chains/residues,
   predicted or experimental, monomer or assembly), the files and what each is, the EXACT claim the
   owner is making and which residues/parts it concerns, the confidence that matches that claim
   (per-residue pLDDT for a fold/region; PAE/interface for how parts sit together), the sequence/
   assembly check that could break it, and what "done" looks like.

Then give me a 3-line summary of what you wrote.
```

- **`AGENTS.md`** is the brief loaded every turn: the **GOAL** in a sentence or two, **where the data
  lives and how to load a structure**, the **MUST-NOTs** ("never report a fold as solid without the
  per-residue confidence there", "never read a binding interface off a model without the interface
  error", "confirm the model's sequence matches the owner's construct first"), the **Version control
  rule** (commit *before* any big change and again whenever something works), and a pointer to
  `spec.md`. Because the rule lives here, Pi keeps taking snapshots on its own — you don't have to
  remember.
- **`spec.md`** is every detail: the protein, the files, the exact claim and the residues it touches,
  the **right confidence for that claim**, the **structure/sequence/assembly check**, and what "done"
  looks like. It **is the data dictionary the download didn't come with** — you rebuild it from the
  interview and from opening the files.

### Step 3 — Review them by hand (the gate)

**This is the manual step that separates a pass from a fail.** The agent's draft is a *proposal*. Read
both files line by line and correct them **against the transcript and the actual files — never from
memory.** Tick off:

- [ ] The **goal** is the owner's real decision (which residues can they trust for *this* action), not
      "look at the structure" or "find the pocket" in the abstract.
- [ ] The **exact claim** and the **residues/parts** it concerns are written down — a claim about a
      *fold/region* (→ per-residue pLDDT) is not the same as a claim about *how two parts sit together*
      (→ PAE / interface error). The spec must name **which confidence** applies.
- [ ] There is an explicit **structure check**: does the model's sequence match the owner's construct
      (length, mutations, truncation)? Is the **assembly state** right (monomer vs the functional
      dimer/complex)?
- [ ] The **trap** the interview hinted at is named (a low-confidence region read as a fold; per-chain
      confidence mistaken for binding; a canonical model that isn't their mutant; a monomer whose
      "surface" is a buried interface).
- [ ] The agent hasn't invented a confidence number, a residue range, or a fact the owner never gave.

Fix what's wrong, then move on. For the full translation method (review-as-prose, then split, then
iterate) see [Part 3 of Computer Lab 1](../../module-1/lab/#part-3--translate-build-agentsmd-and-specmd).

### Step 4 — Let Pi set up the Python environment (with `uv`)

You don't hand-install packages — **you direct Pi to set up the environment from the spec.** We use
**[uv](https://docs.astral.sh/uv/)**, a fast Python manager that behaves the **same on macOS, Linux and
Windows** and needs **no "activate" step** — you and Pi just prefix commands with `uv run`. Paste:

```text
Set up the Python environment for this task using uv (install uv first if it isn't available; if
Python itself is missing, use `uv python install`). Create the environment with `uv venv`, then
`uv pip install` ONLY the packages your approach in spec.md actually needs — for reading a structure
that's typically biotite (or biopython), numpy, and matplotlib for a PAE heatmap. Also install fastapi,
uvicorn[standard] and python-multipart for the viewer I'll build later. Verify each package imports
with `uv run python -c "import ..."`, and tell me exactly what you installed and why. From now on, run
all Python with `uv run` (e.g. `uv run python script.py`).
```

While it installs, re-read your `spec.md`.

> **Why uv?** A plain `venv` leaks OS differences (`.venv/bin` vs `.venv\Scripts`, `python` vs
> `python3`) and needs an activate step that doesn't survive an agent's separate commands. `uv run`
> sidesteps all of that. (Prefer not to install uv? `python -m venv .venv` still works; you'd just use
> `.venv/bin/python` — or `.venv\Scripts\python` on Windows — instead of `uv run python`.)

> **Take your first snapshot now.** Once the env is set up and `AGENTS.md`/`spec.md` are reviewed, tell
> Pi: *"Commit everything so far with git (a clear message like 'setup: env + reviewed spec'). Make
> sure .env is gitignored and never committed."* That's your first restore point.

### Step 5 — Direct with the escalated prompt recipe

Now direct the analysis. Use the **same four-part recipe** as weeks 1–3 — this term and beyond — now
with **two new clauses** (CONFIDENCE CHECK and STRUCTURE CHECK) that carry this week's whole lesson:

> **GOAL** — one line. Point at the spec: *"answer the question in `spec.md`."*
> **METHOD (a direction, not an order) + humble fallback + optional HINT** — suggest an approach, then
> license the agent to overrule you: *"I suggest X; if that's a poor fit, say so and propose something
> better **before** you write code."* Add a **HINT** only where you know something it can't guess (e.g.
> *"pLDDT is the B-factor column of the mmCIF; the PAE is in the JSON"*).
> **CONFIDENCE CHECK** — *"Report the confidence that matches the claim, not the whole-protein average.
> For a claim about a fold or a specific region, print the **per-residue pLDDT** for exactly those
> residues and give me the min and mean there. For a claim about how two chains or domains sit together
> — binding, an interface, a domain arrangement — read the **PAE / interface error** between those
> parts. High per-residue confidence is **not** evidence the parts are placed correctly. Say clearly
> where the model is uncertain."*
> **STRUCTURE CHECK** — *"Before you answer, confirm the model actually represents the owner's protein:
> extract the sequence from the model and align it to the FASTA I was given (same length? any differing
> residues at positions that matter?), and state the assembly (is the functional unit a monomer, or
> something the model doesn't include?). If the structure doesn't match their construct or their
> assembly, that mismatch **is** the answer."*
> **STOPPING CRITERION** — *"plan before you code; stop and show me the confidence readout, the
> structure/sequence check, and the honest answer to the owner's question. Don't dress up an uncertain
> region as a solid one."*

**A paste-ready example** (adapt the method, hint and claim to **your** protein and question):

```text
GOAL: Answer the question in spec.md — say whether the structure actually supports the owner's claim,
using the confidence that matches that claim, and give them the specific residues/answer they can act
on (or the plain statement that the model doesn't support it).

METHOD (a direction, not an order): use BOTH structure sources. (1) Fetch the AlphaFold DB model for the
accession in spec.md via the EBI prediction API (the owner's downloaded, canonical model) — or load it
from this folder if it's here. (2) Fold the owner's ACTUAL construct/complex (the sequence(s) in this
folder) on the course fold service and read its confidence — the database holds the canonical protein,
but the claim is about THEIR exact sequence. Then compare the two. If a different approach fits better,
say so BEFORE you write code.
HINT: pLDDT is the B-factor column of the mmCIF and the PAE matrix is in the JSON; the fold service
returns `plddt[]`, `pae[][]` (and `interface_pae_mean` for a complex) directly — read its skill doc at
the /skill.md URL on the portal card.

CONFIDENCE CHECK: report the confidence that matches the claim, not the whole-protein average. For a
claim about a specific region or fold, print the per-residue pLDDT for exactly those residues (min and
mean), and compare it to a clearly-folded part of the same protein for context. For a claim about how
two chains/domains sit together, read the interface PAE between them — per-chain confidence is NOT
evidence they are placed correctly.

STRUCTURE CHECK: confirm the model is actually this owner's protein before answering. Extract the
model's sequence and align it to the FASTA in the folder — same length? any differing residues at
positions that matter (e.g. an active-site residue)? State the assembly: is the functional unit a
monomer, or something the model doesn't include? If it doesn't match, that mismatch is the finding.

STOPPING CRITERION: plan before you code; stop and show me the confidence readout, the structure/
sequence check, and the honest answer. Don't chase a prettier picture past that point.
```

Make Pi **describe the structure back to you first** (how many chains and residues, the confidence
range, whether its sequence matches your FASTA — mismatches with the spec are gold), **plan before it
codes**, and **report the right confidence before it answers the owner's question.**

> **Direct in rounds — don't fire one giant prompt and walk away.** The skill this week is the
> *back-and-forth*, not the paste. Gate the agent at each stage and read what comes back before you let
> it go on:
>
> 1. **Structure readback → you confirm.** Make it print the chain/residue count, the overall
>    confidence range, and **whether the model's sequence matches your FASTA**, then *stop*. If its
>    picture disagrees with your `spec.md`, resolve it now, before any interpretation.
> 2. **Right confidence → you confirm.** Only after you've *seen* the per-residue pLDDT for the claimed
>    residues (or the interface PAE for a binding claim) do you let it draw a conclusion. Never let "the
>    answer" arrive before the confidence that must back it.
> 3. **Structure/assembly check → you push.** Did it actually align the sequences and state the
>    assembly? If it skipped it, make it do it — this is where three of the four traps live.
> 4. **The honest answer → you name the trap if it doesn't.** If the agent hasn't volunteered the
>    single biggest reason the owner's plan could be wrong, tell it the one you suspect from the
>    interview and make it test that specifically.
>
> Each round is cheap (cents, seconds); the expensive resource is *your* attention. Spending it here —
> reading, disagreeing, re-directing — is exactly the examined skill.

### git as your undo button — snapshot as you go, recover when Pi breaks something

New this week, and worth the two minutes it takes to build the habit: **commit a snapshot each time
something works**, so a later mistake can't cost you the good state. If you added the **Version control
rule** to `AGENTS.md` (Part 2), Pi is *already* committing before big changes on its own — the nudges
below are just the manual reminders at the milestones, plus how to recover when something breaks. You
don't manage git by hand — you **direct Pi** to do it, just like the analysis:

```text
Commit the current state with git. Use a short, clear message describing what works now (e.g.
"analysis: per-residue pLDDT read + sequence check"). First confirm .env is gitignored and NOT staged;
never commit the key. Then show me `git log --oneline` so I can see my restore points.
```

Do that after the environment is set up, after the confidence readout works, and after the viewer
runs — three or four commits across the afternoon is plenty.

**When Pi breaks something** — a file it "fixed" no longer runs, an edit cascaded into three new errors
— you have a clean way back instead of a panic:

```text
Something is broken and I want to go back to my last working commit. Show me `git status` and
`git stash list`. Then restore the tracked files to the last commit (stash or discard my uncommitted
changes first if needed) and confirm the app runs again. Don't delete results/ that isn't tracked.
```

That is the real lesson: **an agent is fastest when you can let it try things — and you can only let it
try things freely if you can undo them.** git is what makes bold direction safe.

> **Optional — put it on GitHub (a real handover).** So far git lives only on your laptop. To *share* a
> repo — with a teammate, a client, or us — you push it to **GitHub**, and again you can have Pi do the
> mechanical parts. **EXPLORE IF YOU HAVE TIME — not required today**, but you'll want this for your
> **final-project** handover, so it's worth trying once now:
> 1. Create a free account at <https://github.com> and make a **new empty repository** (no README) —
>    that part is a web form, so do it yourself.
> 2. Then tell Pi: *"Add this GitHub repo as the remote `origin` — here's the URL — first double-check
>    `.env` is gitignored and not in any commit, then push my `main` branch."* If it needs
>    authentication it will walk you through a personal-access-token or the `gh` CLI.
> 3. Open the repo in your browser and confirm your **key is not there** — a public repo is public.

> **And when something breaks that git can't fix — paste the *whole* error back to Pi.** The other
> meta-skill this week: when a script errors or the viewer won't start, don't paraphrase ("it didn't
> work"). Copy the **entire** stack trace / terminal output and give it to Pi verbatim — the real
> error message is usually the answer. Describing a bug precisely, in the machine's own words, is half
> of debugging with an agent.

## Part 4 — Validate (the raised bar): the confidence gate + the structure trap

> **⏱ No separate slot — do this *inside* Part 3's Direct block (14:30–15:45).** Validation is part of
> directing the agent, not a step you bolt on afterwards.

**A structure that looks right is not a structure that answers your question.** This week the bar is
explicit — you must do **all four** of these, and the first two are what make this week harder than
last:

1. **Read the confidence that matches the claim — before you answer.** Per-residue **pLDDT** for a
   claim about a fold or a region; **PAE / interface error** for a claim about how two chains or
   domains sit together. A confident-looking cartoon means nothing until you've checked the *right*
   confidence *for the exact residues the owner cares about.* *This is this week's version of Week 3's
   baseline: the gate you cannot skip.*
2. **Run the structure check and report the honest truth.** Confirm the model **is** the owner's
   protein — align its sequence to their FASTA (length, mutations, truncation) — and confirm the
   **assembly state** (monomer vs the functional dimer/complex). "This model is the wild-type, not your
   G12D construct" and "the working enzyme is a dimer, so half those surface residues are buried" are
   **wins**, not failures.
3. **Look at the model, not just the numbers.** Have Pi render the structure coloured by pLDDT and the
   PAE as a heatmap, and *look* at them (vision is on). A low-confidence region and a high-error
   interface are obvious at a glance once you know to look — and seeing it is how you catch the agent
   if it narrates something the picture contradicts.
4. **Name one biological caveat and how it could bias the answer.** A single-sequence prediction has no
   information about ligands, cofactors, post-translational modifications or partners; an AlphaFold-DB
   monomer says nothing about the assembly; a confident fold can still be the wrong *conformational
   state*. Say concretely how your caveat could push the conclusion the wrong way.

If a check deflates the owner's plan, that's a **finding, not a failure**: *"the helix you want to
target is real in the picture but low-confidence — it's an induced fold, so I'd validate it
experimentally before designing against a fixed template"* is a **stronger** outcome than a confident
residue list you read off a cartoon you never interrogated.

> **You are the human in the loop — and in the final project, so is a real client.** No viewer replaces
> a person asking "confident about *what*, exactly?" That is why your deliverable in Part 5 puts the
> right confidence **next to** the claim and states the caveat in plain language: this week you are that
> sceptical reader; in the final project the data owner will be.

For the full five-family verification toolkit (smell test, triangulation, adversarial prompting,
show-its-work, controls), see
[Part 5 of Computer Lab 1](../../module-1/lab/#part-5--validate--verify-think-like-a-scientist).

## Part 5 — Build your deliverable: a structure + confidence viewer

> **⏱ 15:45–16:45 · start building at 15:45 no matter what; have the viewer running by 16:45.** Build
> the **Core** app first; reach for **Strong** only if it's running and time is left.
>
> **Commit the moment the viewer first renders** — tell Pi *"commit this, the viewer works"* before you
> ask for any change to it. That's your restore point if a later tweak breaks the layout.

Pi is a command-line agent — it returns numbers in a chat. But a forward-deployed scientist ships a
**thing the problem-owner can open and read**, where the structure sits right next to the confidence
that governs it and the answer is there to act on. So this week your deliverable is a small **deployable
web app** — a **FastAPI** backend serving your results, with a **Tailwind** frontend and an interactive
**3D structure viewer**.

> **The viewer is not decoration — it is an interrogation instrument.** Its first job is to help *you*
> check your own conclusion, and its second is to let the owner do the same. A confident sentence in a
> chat is easy to believe; the same claim sitting next to a structure coloured by confidence and a PAE
> heatmap is where a shaky reading gives itself away. Build it so a sceptic — you first, the owner on
> Friday — can *see* whether the model supports the claim, not just read that it does.

You **direct Pi to build it** and then **open it yourself and interrogate every panel.** There are two
tiers — do the **Core** first; reach for **Strong** only once Core runs.

**Core (required).** A FastAPI app that reads your analysis output from disk and shows, on one Tailwind
page:

1. the **headline answer** — in the owner's terms (the residues they can trust, or the plain statement
   that the model doesn't support their claim);
2. a **3D structure viewer** — the model rendered with **[3Dmol.js](https://3dmol.csb.pitt.edu/)** (from
   CDN), **coloured by pLDDT** (per-residue confidence), with the residues the owner cares about
   highlighted so a reader can *see* whether they sit in a confident or a shaky region;
3. a **confidence panel that matches the claim** — for a fold/region claim, the **per-residue pLDDT**
   across the sequence (a small line/bar chart) with the claimed residues marked and their min/mean
   called out; for a binding/interface claim, the **PAE heatmap** with the inter-chain block called
   out. This is the panel that turns "it looks folded" into "here's how confident the model actually is,
   right here";
4. a **structure-check line** — a one-line statement that the model's sequence **does / does not** match
   the owner's construct (with the mismatch shown if any), and the assembly state;
5. **the one caveat** — the trap — stated plainly.

It runs with `uvicorn app:app`.

```text
Package this work as a small deployable product so a human can READ and TRUST the result. Build a
FastAPI + Tailwind app in this folder:

- app.py (FastAPI) that reads results/results.json (and serves the .pdb/.cif structure and the PAE
  values my analysis wrote) from disk — no database.
- A single-page Tailwind frontend at "/" (Tailwind via CDN) with:
  - a summary panel at the top: the headline answer in plain language, and the one-line structure check
    (does the model's sequence match the owner's construct? monomer or the functional assembly?);
  - a 3D viewer using 3Dmol.js (from CDN) showing the structure coloured by pLDDT (B-factor), with the
    residues the owner cares about highlighted;
  - a confidence panel that matches the claim: for a fold/region claim, a per-residue pLDDT chart with
    the claimed residues marked and their min/mean; for a binding/interface claim, a PAE heatmap with
    the inter-chain block highlighted (inline SVG or a small canvas is fine);
  - one plain-language caveat sentence — the trap — in a callout box.
- Use real inline SVG icons, not emoji.
- requirements.txt and a short README with the exact run command.

When done, tell me the exact command and port to run it, then stop.
```

Then run it and **look at your own work** (`uv run` uses the env Pi built — same command on every OS;
Pi will also tell you the exact command):

```bash
uv run uvicorn app:app --reload --port 8000    # then open http://localhost:8000
```

**Strong (encouraged, only after Core runs).** Each option below is an **interrogation tool** — it lets
a human *probe* the reading, not just look at it. Pick the one that fits your protein:

- **A confidence toggle on the 3D model.** Let the viewer switch the colouring between **pLDDT** and a
  simple **"trust / don't trust" threshold** (e.g. green ≥ 70, amber 50–70, red < 50), and let the
  reader click a residue to see its exact pLDDT. For a region claim, this makes "the part you want to
  target is the red part" impossible to miss.
- **An interface probe (binding/complex proteins).** Render the two chains in the 3D viewer and, on
  click, show the **PAE between the selected residue and the other chain** — so a sceptic can confirm
  the interface really is uncertain, chain-wide, and the "binding pose" isn't supported. Mark the
  inter-chain block on the PAE heatmap.
- **A side-by-side sequence check.** Show the model's sequence aligned to the owner's FASTA with the
  differing residues (and any length overhang) highlighted — the panel that proves, at a glance, the
  structure is or isn't their protein.

```text
Now add the strong tier — an interactive panel a sceptic can probe. [Region flavour:] add a colour
toggle on the 3Dmol viewer between raw pLDDT and a trust/amber/don't-trust threshold, and show a
residue's exact pLDDT on click. [Binding flavour:] render both chains and, on residue click, show the
PAE between that residue and the other chain, and mark the inter-chain block on the PAE heatmap.
[Mismatch flavour:] add a side-by-side view of the model sequence vs my FASTA with differing residues
and any length overhang highlighted. Keep using Tailwind; no database — read from the JSON/structure my
analysis already wrote.
```

> **On libraries:** 3Dmol.js is a light, CDN-friendly choice that colours by B-factor (= pLDDT) in a
> couple of lines; Mol* is heavier but fine if you prefer it. Name the one you want in the prompt, or
> let Pi propose the lightest thing that works. Either passes; don't burn the clock fighting a library.

**Deploying it (optional, if you're ahead).** Because it's a normal FastAPI app, it deploys like any
web service — a `Dockerfile` and `uvicorn`, or a free host. You don't have to deploy today, but building
it *deployable* is the point: this is the artifact you hand a client. And because your folder is now a
git repo, it's already in a shape you could push.

### The report — write it like you'd hand it to the client

The viewer shows the result; the **report** is where you *explain and defend* it. This is the document
the owner (and, in the final project, a real client) actually reads to decide whether to trust you.
Write a `report.md` (a page or two; the agent can draft it from your results and the analysis
transcript, then **you** fix every line) with this structure:

1. **The question** — one or two sentences, in the owner's terms: the decision that hangs on this, and
   who acts on it. If a reader can't tell what changes because of your answer, start here again.
2. **The protein & the files** — what you were given (the protein, how many chains/residues, predicted
   or experimental, the FASTA and structure files), in plain language. One line on anything that
   limited the analysis.
3. **The right confidence, stated plainly** — the confidence that matches the claim, *first*: the
   per-residue pLDDT for the residues in question (min/mean), or the interface PAE for a binding claim.
   State it before you give the answer.
4. **The structure check** — does the model's sequence match the owner's construct (length, mutations,
   truncation)? Is the assembly state right (monomer vs the functional dimer)? Show the mismatch if
   there is one.
5. **The trap and the honest truth** — name the single biggest reason the owner's plan could be wrong,
   say how you tested it, and give the honest answer even when it deflates the picture. This is the
   section the teaching team reads most closely.
6. **The answer / recommendation** — the interpretable, actionable output (the residues they can trust,
   the pocket with its caveat, the mutation plan corrected for the assembly, or "predict the mutant /
   the dimer first"), with an explicit statement of how far it can be trusted.
7. **Caveats & next steps** — the one biological caveat, and what you'd check next given more time (a
   fold of the actual construct, a proper complex prediction with interface confidence, an experimental
   structure).
8. **AI-use disclosure** — which agent did what, what *you* verified by hand, and a pointer to the
   attached transcripts.

**Hints for a report that reads as professional, not AI-slop:**

- **Lead with the answer, then support it.** A busy owner reads the first paragraph and the
  recommendation; everything else is there to be checked. Don't bury the finding under method.
- **Every claim carries its confidence.** "The helix is a good target" means nothing; "the helix is
  real in the model but its per-residue confidence is ~65, versus ~91 for the folded core, so treat it
  as an induced fold, not a fixed template" means everything. Never let a structural claim stand
  without the confidence that governs it.
- **Say the uncomfortable thing plainly.** "This model is the wild-type, not your mutant" is a
  *stronger* report than a confident pocket you read off the wrong sequence — write it in the owner's
  language, without hedging.
- **Cut the filler.** Strike "it is important to note", "leveraging", "in the realm of", empty
  transitions and restated headings. Agents pad; you trim.
- **Reference the figures.** Point at your viewer panels ("see the pLDDT track — the claimed residues
  sit in the amber dip", "the PAE heatmap's inter-chain block is uniformly high") so the prose and the
  app agree.
- **No fake precision, no invented citations.** Round honestly; if you name a structure, an assembly or
  a paper, it must be real (a plausible PDB ID or DOI is not a real one — the course AI policy).

The two course non-negotiables still apply: **own every number** (if it's wrong, it's wrong under your
name) and **disclose the AI use**.

## What to hand in — and what we look at

> **⏱ 16:45–17:00 · write the summary, gather the folder, and upload by 17:00.** Don't run past 17:00;
> seminar prep is a separate job on Thursday (see the [Seminar 4](../seminar/) page).

Your submission is your **transcript(s) plus your analysis and your deliverable**:

- **The interview transcript** (Agent A) — downloaded from the portal as Markdown (`.md`).
- **The analysis transcript(s)** (Agent B / Pi) — Pi records each run as `.jsonl` under
  `~/.pi/agent/sessions/` (on Windows `C:\Users\<you>\.pi\agent\sessions\`). Hand in **either** the raw
  `.jsonl` **or** a readable `.md` / `.txt` log — we accept all three, and prefer a readable Markdown
  version. Include one per run if you launched Pi more than once. Include the analysis **code** Pi wrote.
- **Your app** — the deliverable folder (`app.py`, any templates/static, your `results/` with
  `results.json` and the structure/PAE files, `requirements.txt`, and the short README), **zipped into a
  single `app.zip`** (the **App** button takes one `.zip`). *(A `git log --oneline` of your snapshots is
  a nice touch — it shows how you worked — but isn't required.)*
- **The report** — the structured write-up from Part 5 (`report.md`): question, protein & files, the
  right confidence, the structure check, the trap and the honest truth, the answer, caveats, and AI-use
  disclosure.
- **`AGENTS.md`** and **`spec.md`** — the brief and the spec you wrote.

**How to submit — all in the portal.** Open your week in the
[course portal](https://ddls-portal-6228434e.svc.hypha.aicell.io/) and click **Hand in** (also on each
week card and at the top of the week page). The **Computer-lab** card has **one upload button per
file**, so each lands under the right name on our server. Put your **name** in the field at the top, and
a short **note to the teachers** if you like. Re-submit any time — we always grade your most recent
upload. Please also fill the short **feedback panel** (a few 1–5 sliders plus boxes for ideas to improve
the course and the portal) — it genuinely shapes what we do next.

> **Gather everything in one place.** Let the agent collect your files. Paste this into **Pi** at the
> end of your run:
>
> ```text
> Make a folder called submissions/ in my current working directory. Zip my app folder (app.py, any
> templates/static, results/, requirements.txt, README) into submissions/app.zip. Copy report.md,
> AGENTS.md and spec.md into submissions/. Then read every Pi session transcript from TODAY under
> ~/.pi/agent/sessions/ and, for each run, write a clean Markdown log of the whole conversation (my
> messages and your replies, in order) to submissions/analysis-transcript-1.md,
> analysis-transcript-2.md, … — plain readable text, not JSON. Finally, list exactly what you copied so
> I can check nothing is missing.
> ```
>
> Then download the **interview** transcript from the portal into the same `submissions/` folder, open
> the folder, and drag each file to its upload button.

**Deadline: Friday 10:00 CEST, before the seminar** — and you must submit **even if you can't attend**
the lab or seminar. The seminar deck is handed in separately via the **Seminar** card (see the
[Seminar 4](../seminar/) page). Missing a session with notice (email
[ddls-course@scilifelab.se](mailto:ddls-course@scilifelab.se) **before** the session) is excused; a
missing submission is not.

This lab is graded **pass/fail**, and — as all term — **we read the transcript.** We read it for:

- Did you find the **question behind the question** — including *which part of the model the owner
  intended to trust, and for what*?
- Did you **read the confidence that matches the claim** (not the global score), and did you **check the
  structure is actually their protein and their assembly**?
- Where did you **refuse** what the agent (or the owner) handed you, and report the honest truth?

A polished viewer on top of a transcript that never checked the right confidence is not a pass. A modest
result — "the helix is low-confidence, so I wouldn't design against it as a fixed target", "this is the
wild-type structure, not your mutant" — with a transcript that shows real interviewing, the right
confidence read, and the structure check done is exactly what we're after.

## Next: prepare for the seminar

Wednesday's lab produced the work; **Friday's [seminar](../seminar/) is where you defend it.**
Presenters are **drawn at random**, so everyone prepares. On Thursday (not squeezed into the lab):

1. **Understand your own results.** Be able to say — without notes — what the owner wanted to trust,
   **the confidence that actually backs it** (per-residue pLDDT or interface PAE), whether the model is
   even their protein, and the one caveat you'd flag. You own every number; the seminar is where you
   prove it.
2. **Build a short presentation** — a single self-contained **`slides.html`** deck **in your own visual
   style**, with your key visuals (the structure coloured by confidence, the pLDDT track or PAE heatmap,
   the answer) embedded right in the file. Your agent can draft it from your `report.md`; then you fix
   it. The [Seminar 4](../seminar/) page has the format, a style menu, and a paste-ready prompt.
3. **Submit `slides.html` before the seminar** via the **Seminar** card in the portal — **deadline
   Friday 10:00 CEST**, required even if you can't attend.
4. **Be ready to be presented.** If you're drawn, we show your submitted deck on screen and you talk to
   it, so it must stand on its own and advance with the **← / → arrow keys**.

{{< cta cta_text="Prepare for Seminar 4" cta_link="../seminar/" >}}

## Looking ahead: your final-project data owner is due at the end of next week

{{% callout note %}}
**Your final project needs a *real* data owner — and the deadline is the end of Week 5 (Friday 25
September 2026).** The labs use simulated owners; the final project does not. You'll take on a **real
researcher's** biological question (someone else's, never your own) and hand back an answer they can
use. The strongest projects come from owners *you* help us find, so get your team together and ask
around **this week** — don't wait for the pool to fill.

**Read the final-project page now and start planning** — it has the whole format, what you're offering a
researcher, the deliverables and the dates. Know someone with a biological question and some data? Point
them there, or use your **personal invite link** (on your portal dashboard, `/signup-projects?ref=<your-code>`)
— a project that signs up through your link gives **you first claim** on it.

{{< cta cta_text="Read the final-project brief" cta_link="https://ddls.aicell.io/course/ddls-2026/final-project/" >}}
{{% /callout %}}

---

Good luck, and have fun — this is the job. Remember this week's hard line: **a confident structure is
not the same as an answer to your question.** Read the confidence that matches the claim, check the
model is really their protein, and hand back the honest truth — even when the picture looked perfect.
