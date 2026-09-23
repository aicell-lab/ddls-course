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
   - **Build it as a FastAPI + Tailwind app** (this is the recommended stack — decide now, switching
     late costs time): a small **FastAPI** backend that loads the `.h5ad` once with scanpy and exposes
     a couple of endpoints the page calls (`/api/umap`, `/api/gene/{name}`, `/api/cluster/{id}`), and
     one **Tailwind CSS** page it serves. Tailwind goes in via the CDN `<script>` tag — no build step,
     no npm. Keeping scanpy on the server is the point: any gene, any cluster, computed live, instead
     of guessing which ~14k genes to bake into a file.
   - **Make it work on a phone.** The owner may well open your link on their phone — so the layout has
     to reflow, the plot has to fit the screen, and the controls have to be tappable. Tailwind gives
     you that almost for free (`sm:` / `md:` breakpoints, a stacked layout that becomes side-by-side
     on a wide screen). Check it yourself: narrow your browser window to phone width, or just open
     your tunnel link on your own phone.
2. **A GitHub repo** with the app in it and a **clear, well-structured `README.md`** — what the
   navigator does, how to run it, and your one-paragraph answer to the owner's question. The repo +
   README *is* the deliverable; make it something you'd be happy to send a collaborator. You can
   *optionally* also publish a written report or a project intro page from the repo — see below.

{{< spoiler text="Optional — publish a report or project page on GitHub Pages" >}}
Your FastAPI app itself can't run on GitHub Pages (Pages only serves static files, and your app is a
Python server). But anything *static* can live there, and it's a free, permanent link — unlike the
tunnel. Worth it if the owner wants something to read when your app isn't running:

- a written **report** of your findings — the cluster, its markers, the identity, the caveats;
- the **figures** you'd show the owner, exported from your navigator;
- a small **intro page** for the project: what the navigator does, a screenshot or a short
  screen-recording, and a link to the repo and to how to run it.

Tell Pi roughly:

> *"Write the report as a static site in `docs/` (an `index.html` plus the figures), commit and push
> it, then enable GitHub Pages from the `docs/` folder on `main`."*

It ends up at `https://<your-user>.github.io/<repo>/`. Skip this if you're short on time — the repo +
README is what's required.
{{< /spoiler >}}

Submit the **GitHub repo URL** (plus your tunnel link if it's live, and the Pages link if you made
one) in the portal, along with your interview and Pi transcripts. In your README (or the app), **name the cluster in question, its top marker genes, and
the cell type they point to** — the answer is the identity, not just "keep/delete" or "novel/known".

## Time budget (≈3 hours — leave yourself time for the final project)

| | Step | ~time |
|---|---|---|
| 1 | **Interview** the data owner until the question and the "done" test are sharp | 40 min |
| 2 | **Build the navigator** — get the cells on screen, colourable by gene + quality | 70 min |
| 3 | **Read the cells** — use your navigator to answer the owner's question | 40 min |
| 4 | **Ship** — push to GitHub with a clean README, submit the links (share via a tunnel if you want) | 30 min |

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

A prompt that gets you a skeleton in one shot:

> *"Build a FastAPI app that loads `<file>.h5ad` with scanpy once at startup. Serve one Tailwind
> (CDN) page that plots the UMAP with Plotly, plus JSON endpoints for the UMAP coordinates, per-gene
> expression, and per-cluster top markers + quality. Mobile-first layout: controls stack above the
> plot on narrow screens, side-by-side on wide. Run it with uvicorn on port 8000."*

Then iterate on it — you're the one who can see the screen.

**Spend some of your time on how it looks and feels.** This app is the thing a non-computational
researcher actually holds; if it's confusing, your correct answer doesn't land. You don't need to be
a designer — ask Pi for a variant and judge it:

- **Legible before pretty.** Readable labels, a colour scale that shows the signal (and doesn't
  mislead), units and gene names spelled out, a title that says what you're looking at.
- **Obvious next click.** Someone who has never seen your app should know what to type in the box and
  what the button does — placeholder text, a sensible default gene, a short line of help.
- **Tell them what's happening.** A loading state on Run, and a real message when a gene isn't in the
  dataset — not a silent empty plot.
- **Try more than one layout.** Ask Pi for two versions of the controls panel and keep the one that's
  faster for *you* to use; you'll use it dozens of times in step 3.

Don't gold-plate it — the core has to work first. But a navigator that's pleasant to use is part of
the deliverable, not decoration.

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

## Share it — a link the owner can actually open (optional)

Your app runs on **your** laptop, and `localhost` means nothing to anyone else. If you want the data
owner — or the seminar room on Friday — to open it themselves, put it behind a free **Cloudflare
quick tunnel**: no account, no signup, one command. Optional, but it's what turns your app from
something you demo into something they use.

{{< spoiler text="Optional — share your app with a Cloudflare tunnel (why it's needed, and the commands)" >}}
**Why you can't just send them the link you see.**
When you start a web app it listens on a **port** on your own machine, and your browser reaches it at
`http://localhost:8000`. `localhost` literally means *this computer* — it resolves to your own
machine on whoever's laptop it's typed into. Send that link to the data owner and their browser will
look for the app **on their machine**, find nothing, and show a connection error.

Your laptop also doesn't have an address the outside internet can dial: it sits behind your
university/home router (NAT) and a firewall, so there is nothing for them to connect *to*, even if
you found your IP address. Opening a port for real would mean router config and exposing your machine
— not something to do for a lab.

A **tunnel** solves it from the inside out. `cloudflared` makes an **outbound** connection from your
laptop to Cloudflare's network (outbound is always allowed — it's the same kind of connection your
browser makes) and Cloudflare hands you a public `https://….trycloudflare.com` address. When the
owner opens that address, the request arrives at Cloudflare and is pushed back down the connection
your laptop already opened, to your port 8000. Nothing is uploaded and nothing is installed on their
side: your app still runs on your laptop, the tunnel just gives it a front door on the public
internet. That's also why the link dies the moment you stop the command — the door only exists while
the connection does.

**Ask Pi for it:**

> *"Install `cloudflared` and run a quick tunnel to the port my FastAPI app is on, so I get a public
> https URL. Print the URL and keep it running."*

Roughly what it will do:

```bash
# 1. your app is already running locally
uvicorn app:app --port 8000

# 2. expose that port publicly (installs cloudflared if needed), in a second terminal
cloudflared tunnel --url http://localhost:8000
# → prints something like  https://random-words-here.trycloudflare.com
```

Open that URL yourself first — **and on your phone**, which is the fastest way to see whether your
layout really reflows — then share it. Three things to know:

- **It lives only while the command runs.** Close the terminal or sleep your laptop and the link
  dies; restart it and you get a *new* URL. Fine for a demo, an owner call or Friday's seminar, not a
  permanent home — so start the tunnel *just before* you need it and re-run it next time.
- **Anyone with the link can open it** — so don't tunnel anything beyond this lab's dataset, and stop
  the tunnel when you're done.
- **The repo is the durable deliverable.** A FastAPI app can't live on GitHub Pages, so what you hand
  in is the **repo + a README that says exactly how to run it** (`pip install -r requirements.txt`,
  `uvicorn app:app`, where to put the `.h5ad`) — plus a tunnel link when you want someone to see it
  live. Submit the tunnel URL too if yours is up; note in the portal that it's temporary.
{{< /spoiler >}}

## Getting unstuck (read this before you panic)

- **Pi or the portal hiccups?** Re-send your last message; if it's really stuck, restart Pi and tell
  it "read the files in this folder and continue." Your files on disk are safe.
- **The app won't render / a colour looks wrong?** Open it in your browser, read the actual error,
  and paste the *whole* error back to Pi — not a paraphrase. Check **both** sides: the uvicorn
  terminal (a 500 with a Python traceback) and the browser's dev-tools console (a failing `fetch`, a
  404 on an endpoint). Open your `.html` file by double-clicking and nothing will work — it has to be
  served by FastAPI, at `http://localhost:8000`.
- **Reloading the `.h5ad` on every request makes it crawl.** Load it **once at startup** into a
  module-level variable, not inside the endpoint.
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
Pi installs whatever it needs: **scanpy** for the analysis, **fastapi + uvicorn** for the app, and
**Tailwind via its CDN `<script>` tag** for the styling (no npm, no build step). For the plot,
**Plotly.js** in the browser is the easy default — any chart library you prefer is fine.
{{< /spoiler >}}

{{< spoiler text="Never used FastAPI? (open for a 20-line starting point)" >}}
That's fine — you don't have to write this, Pi does. It's here so you can *read* what it gives you and
tell whether it's sane.

```python
# app.py  →  run with:  uvicorn app:app --port 8000
import scanpy as sc
from fastapi import FastAPI
from fastapi.responses import FileResponse

app = FastAPI()
adata = sc.read_h5ad("data.h5ad")          # loaded ONCE, at startup

@app.get("/")                               # your Tailwind page
def home():
    return FileResponse("index.html")

@app.get("/api/umap")                       # cells + cluster labels
def umap():
    xy = adata.obsm["X_umap"]
    return {"x": xy[:, 0].tolist(), "y": xy[:, 1].tolist(),
            "cluster": adata.obs["leiden"].astype(str).tolist()}

@app.get("/api/gene/{name}")                # colour the map by one gene
def gene(name: str):
    if name not in adata.var_names:
        return {"error": f"{name} not in dataset"}
    return {"values": adata[:, name].X.toarray().ravel().tolist()}
```

The page then does `fetch("/api/gene/CD3E")` and recolours the plot. Those key names (`X_umap`,
`leiden`, and `pct_mito` / `n_genes` / `total_counts` for quality) are the ones in this week's file —
but always print `adata` first and check rather than trusting a snippet.
{{< /spoiler >}}

## Access the portal

{{< cta cta_text="Open the DDLS course portal" cta_link="https://ddls-portal-6228434e.svc.hypha.aicell.io/" >}}

Interview your data owner, download the dataset, generate your Pi key, and submit your app link +
GitHub URL there. See you at Friday's seminar, where a few of you will show your navigator live.
