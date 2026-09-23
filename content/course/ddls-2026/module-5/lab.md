---
title: "Computer Lab 5: Interview a Single-Cell Data Owner, Build a Navigator, Read the Cells"
linkTitle: "Computer Lab 5"
summary: ""
weight: 10
type: book
---

Same job as every week — the **forward-deployed scientist**: take someone else's biological problem,
interview them until the real question is sharp, then direct an AI agent to do the work while you
supply the judgement. This week the data is **single-cell RNA-seq**: one blood sample turned into
thousands of immune cells, already sorted into **unnamed clusters**. Your owner is sure about one
cluster — it's junk to throw away, or it's a thrilling new cell type. **They are probably wrong, and
the data can settle it.** Your move: build a little **data navigator** you can look at, and let it
answer.

> **New here?** Do [Computer Lab 1](../../module-1/lab/) first — it explains the two agents, the
> interview, and the portal. This page assumes that setup.

> **30-second on-ramp to single-cell data (no prior experience needed).** Each **cell** got its own
> gene readout; cells with similar readouts are grouped into **clusters** (numbered, *not* named) and
> placed on a 2-D **map** so similar cells sit together. The one term you need: a **marker gene** is a
> gene switched on in a particular cell type — reading a cluster's top marker genes is how you name
> it. Your first three questions on any cluster: *what is it?* (markers) · *is it real or a quality
> artifact?* (the per-cell quality numbers) · *does it answer the owner's question?*

## The one rule

**Use someone else's problem, not your own.** You interview the data owner in the portal; you don't
supply the data or the question.

## What you hand in (two things — no written report this week)

1. **A live single-cell data navigator** — a small web app you can open and click around in.
   - **Core (required):** the cells on their map, **colour by any gene and by the cell-quality
     numbers**, each cluster's top genes to hand, **plus one interactive control** — a box/picker
     and a **Run button** that computes something live (e.g. pick a cluster → show its top markers +
     quality). That one control is what turns the viewer into a tool you use to **test and check the
     analyst's answer**, not a static screenshot.
   - **Stretch (optional, only if you have time):** more controls — filters, a two-cluster
     comparison, a mini-report, even a small model. Don't start here; get the core working first.
   - **Two ways to build it** (pick one early — deciding late costs time): a **self-contained HTML**
     with a *curated* set of genes baked in (you can't ship all ~14k genes to a browser — a good set
     is the **union of every cluster's top ~8 marker genes**, which scanpy gives you in one call), or
     a **tiny Python backend** (scanpy) with a Run endpoint the page calls. Either counts.
2. **A GitHub repo** with the app in it and a **clear, well-structured `README.md`** — what the
   navigator does, how to run it, and your one-paragraph answer to the owner's question. The repo +
   README *is* the deliverable; make it something you'd be happy to send a collaborator.

Submit the **live app link** and the **GitHub repo URL** in the portal, plus your interview and Pi
transcripts. In your README (or the app), **name the cluster in question, its top marker genes, and
the cell type they point to** — the answer is the identity, not just "keep/delete" or "novel/known".

## Time budget (≈3 hours — leave yourself time for the final project)

| | Step | ~time |
|---|---|---|
| 1 | **Interview** the data owner until the question and the "done" test are sharp | 40 min |
| 2 | **Build the navigator** — get the cells on screen, colourable by gene + quality | 70 min |
| 3 | **Read the cells** — use your navigator to answer the owner's question | 40 min |
| 4 | **Ship** — push to GitHub with a clean README, put the app live, submit the links | 30 min |

Hard switch to building at the 70-minute mark, like every week. If you're deep in the interview at
that point, stop and start the navigator — you can always ask one more question later.

## The interview — cover four things, then stop

Your coach (the panel beside the chat) will push you on *how* you ask. Aim to leave the interview
knowing:

- **GOAL** — the one decision the owner must make, and what changes once they know.
- **DATA** — what the file is, what one row (cell) and the numbers mean, how big it is.
- **DONE** — what a good answer looks like *to them*, and what would make it useless.
- **TRAPS** — the thing they're taking on faith. (What are they sure about that they haven't checked?)

When those four are solid, you're done interviewing — don't over-run.

## Build the navigator first, then interrogate it

You direct Pi; Pi writes the code. Point it at the data file the owner gave you and get the cells on
screen **before** you try to answer anything — a map where similar cells sit together, that you can
recolour by any gene you name and by the quality numbers, and that shows a cluster's strongest genes.
Then **grow the app toward the owner's question**: each time you need to check something, add a
control for it — a gene box, a cluster picker, a Run button that computes and draws the thing you
want to see. Let the app do the looking *and* let it check the analyst: when Pi hands you an answer,
you should be able to click something in your own tool and confirm (or break) it.

**Three hints that get you through fast:**
- **Build the cluster → top-marker-genes table early.** It's the quickest way to identify a cluster,
  and it's what turns "a blob on a map" into "this is *X*." Colouring by one gene at a time is slow;
  the table gives you all clusters at once.
- **Trust markers over geometry — and over the owner.** Which cluster is which is settled by marker
  genes and the quality numbers, not by where a blob sits or by the number the owner quotes (they may
  be slightly off). Confirm the cluster identity yourself before you answer.
- **The agent can't reliably see your rendered app.** Keep it open in your own browser and judge the
  visuals yourself; tell Pi *what to change*, don't ask it to eyeball the result. (The single biggest
  time-sink last week.) Also have Pi **reproduce the app's numbers in plain Python and print them** —
  if the app says a cluster's top gene is X, a 3-line script should agree. That's how you check the
  app is telling the truth without staring at it.

**Three ways a cluster fools you (don't get caught):**
- **Low gene count ≠ junk.** Some real cell types are genuinely RNA-sparse. Before you bin a
  low-count cluster, check its **% mito** and its **marker genes**. As a rough scale for these cells,
  healthy sits around **1–3% mito** and dying cells run **high (≳10–15%)** — so a *low*-mito cluster
  is evidence *against* "dead cells", not for it. A real type has a clean marker signature; debris doesn't.
- **Unusually high counts/genes can be a doublet** — two cells captured together — masquerading as a
  new type. Two tells: its "markers" are **housekeeping / ribosomal / cell-cycle** genes rather than a
  clean lineage, and it **co-expresses two lineages' markers** (check that on the raw `counts` layer,
  not the normalised values, which are noisy near zero).
- **"Sits apart on the map" ≠ novel.** A well-known cell type can form its own distinct cluster.
  Distinctness is not discovery; only the markers decide.

## Getting unstuck (read this before you panic)

- **Pi or the portal hiccups?** Re-send your last message; if it's really stuck, restart Pi and tell
  it "read the files in this folder and continue." Your files on disk are safe.
- **The app won't render / a colour looks wrong?** Open it in your browser, read the actual error,
  and paste the *whole* error back to Pi — not a paraphrase. If the page loads data with `fetch()`,
  it must be **served** (`python -m http.server`) — it won't work from a double-clicked file. Simplest
  fix: have Pi inline the (curated) data into one HTML file so it opens anywhere.
- **Don't know what the genes mean?** That's expected — you're not a single-cell biologist. Paste a
  cluster's **top 5 marker genes** into ChatGPT/Claude and ask *"what cell type is this in PBMC?"* —
  that's how you turn a gene list into a name. Using another AI or googling to *understand* what
  you're looking at is not cheating; it's exactly what a forward-deployed scientist does. Disclose it
  and move on.

{{< spoiler text="Reference — Pi setup + tools (same as every week)" >}}
Generate a portal API key, then point your local Pi at `<portal>/v1` with that key (the
`~/.pi/agent/models.json` custom-provider block from Lab 1). Nothing new this week. Download the
dataset from the week page; it's a single `.h5ad` file you open in Python with `scanpy`/`anndata`
(it already has clusters, a UMAP, per-cell quality, and a raw counts layer — inspect `.obs` first).
Pi installs whatever it needs: **scanpy** for the analysis, and **plotly / a JS chart library / or
matplotlib** for the app — your choice.
{{< /spoiler >}}

## Access the portal

{{< cta cta_text="Open the DDLS course portal" cta_link="https://ddls-portal-6228434e.svc.hypha.aicell.io/" >}}

Interview your data owner, download the dataset, generate your Pi key, and submit your app link +
GitHub URL there. See you at Friday's seminar, where a few of you will show your navigator live.
