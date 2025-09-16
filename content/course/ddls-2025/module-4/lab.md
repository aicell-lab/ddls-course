---
title: "Computer Lab 4: scRNASeq — Classic and MCP/Gemini"
date: '2025-09-21'
linkTitle: "Computer Lab 4"
weight: 10
type: book
---
Module 4 Computer Lab: Single-Cell RNA-Seq of Lung Inflammation vs Controls

🌍 Introduction
===============

In this lab, you will explore **single-cell RNA sequencing (scRNASeq) data** from patients with severe lung inflammation compared to healthy controls. The main goal is to **identify gene expression differences at the single-cell level** between these groups, with a focus on elderly patients.

🧪 Data Description
-------------------

- **Samples:** 4 patients with lung inflammation and 4 healthy controls  
- **Cells:** Each sample has been subsampled to ~1500 cells

This dataset is small enough to run quickly during class, but still captures the essential features of a real scRNASeq study.

* * * * *

Part I — Classic scRNASeq Workflow in Jupyter
=============================================

In this section, you will use the notebook like a bioinformatician at the bench—running cells step by step to build an analysis using Scanpy.

### Option 1. Run locally on your computer

For the most stable experience, we recommend running the analysis locally on your computer with a Python environment.

- Requirements: Python 3.10+ (or Conda/Mamba), 8+ GB RAM recommended
- Create a clean environment

Then follow the steps in “4. Workflow Steps (Scanpy)” below using a local notebook or script in your project folder.

If you cannot run locally or prefer a cloud environment, use option 2 (Colab) below.

### Option 2. Launch the Course Starter Notebook (Google Colab option)

#### 2.1. Open the Module 4 starter notebook in Google Colab:

(Notebook not available yet)[<img style="display: inline" src="https://colab.research.google.com/assets/colab-badge.svg">](https://colab.research.google.com/github/aicell-lab/ddls-course/blob/main/static/notebooks/ddls-scrna-starter.ipynb)

Notes:
- Runtime can be CPU; GPU is not necessary.
- You can run a cell with Shift+Enter.

#### 2.2. Set up VS Code Tunnel (optional, Google Colab)

In a Colab terminal, start the VS Code tunnel:

```bash
# In a Colab terminal
curl -Lk 'https://code.visualstudio.com/sha/download?build=stable&os=cli-alpine-x64' --output vscode_cli.tar.gz
tar -xf vscode_cli.tar.gz
./code tunnel
```

Open the URL provided to launch VS Code in your browser.

Create the course folder:

```bash
mkdir -p /content/drive/MyDrive/DDLS-Course/Module4/
```

Switch to Module4 and use it as your workspace:

```bash
cd /content/drive/MyDrive/DDLS-Course/Module4/
code .
```

### 4. Work on your notebook

You’ll follow a standard Scanpy pipeline: load the .h5ad dataset with metadata, run QC (including doublet detection and optional cell-cycle regression), normalize and select HVGs, integrate batches, embed (PCA/UMAP), cluster (Leiden), and perform differential expression for key comparisons (e.g., inflamed vs control, elderly focus). The starter notebook provides step-by-step instructions and automatically saves intermediate .h5ad files, plots, and DE tables so you can resume at any step.

At the end of Part I, you will have completed a standard scRNASeq pipeline using Scanpy inside Jupyter.

* * * * *

Part II — MCP + Gemini CLI: Analysis as a "Manager"
===================================================

In this part, you will repackage the same workflow into **MCP tools** and orchestrate it using the **Gemini CLI**.

- **MCP (Model Context Protocol):** Turn analysis functions into callable tools (e.g., scanpy_run_qc, scanpy_integrate, scanpy_embed_cluster, scanpy_rank_genes, report_build).  
- **Gemini CLI:** A conversational interface where you plan, call tools, and summarize results directly in chat.

Why?
- In Jupyter, you act as the worker (run cells, fix errors, plot).
- With MCP + Gemini CLI, you act as the manager (instruct the AI to run QC, clustering, marker detection, and report generation).
- This makes workflows more reproducible and shareable: each tool writes explicit outputs (.h5ad, .json, .csv, .pdf).

### 1. Install and Start the Gemini CLI

```bash
# In Colab terminal
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.3/install.sh | bash
source /root/.bashrc
nvm install 21
nvm use 21
npm install -g @google/gemini-cli
gemini
```

Log in with your Google account if prompted. If the CLI exits after login, run `gemini` again.

### 2. Package Your Workflow as Tools

In your Module4 workspace, create small Python scripts that:

- Reads an input .h5ad and writes an output .h5ad after each step.
- Accepts parameters via CLI or JSON (thresholds, batch keys, resolution).
- Produces side outputs: plots (.pdf/.png) and DE tables (.csv).

Suggested tool surface (I/O contracts):
- scanpy_run_qc(in_h5ad, out_h5ad, qc_params_json) → .h5ad + QC summary .json
- scanpy_integrate(in_h5ad, out_h5ad, method, key) → .h5ad
- scanpy_embed_cluster(in_h5ad, out_h5ad, neighbors_k, leiden_res) → .h5ad + UMAP .pdf
- scanpy_rank_genes(in_h5ad, out_dir, groupby, comparison) → DE .csv + volcano/heatmap .pdf
- report_build(in_dir, out_md_or_pdf) → README.md or PDF summary

Expose these as MCP tools (function signatures + JSON schemas). A minimal MCP server template is provided in the starter notebook.

Minimal MCP server pattern (example):

```python
# sc_mcp_server.py
# Minimal MCP stdio server exposing two placeholder tools.
from typing import Any, Dict
import json

MCP = FastMCP("sc-mcp")
#...

@MCP.tool("scanpy_run_qc")
def scanpy_run_qc(in_h5ad: str, out_h5ad: str, qc_params_json: str = "{}"):
   params = json.loads(qc_params_json or "{}")
   # ... load AnnData, run QC, write out_h5ad, emit a small summary JSON ...
   return {"ok": True, "written": out_h5ad, "params": params}


@MCP.tool("scanpy_embed_cluster")
def scanpy_embed_cluster(in_h5ad: str, out_h5ad: str, neighbors_k: int = 15, leiden_res: float = 0.5):
   # ... compute neighbors/UMAP, Leiden clustering, write out_h5ad ...
   return {"ok": True, "written": out_h5ad, "k": neighbors_k, "res": leiden_res}


if __name__ == "__main__":
   # Run as an MCP stdio server (no prints to stdout!)
   MCP.run(transport="stdio")
```

This skeleton demonstrates the pattern only. In your real server, use an MCP library that implements the protocol and wire real functions that call Scanpy.

### 3. Wire the server into Gemini CLI

Create or edit `~/.gemini/settings.json` and add an `mcpServers` entry like this:

```json
{
   "mcpServers": {
      "sc-mcp": {
         "type": "stdio",
         "command": "/FULL/PATH/TO/conda/envs/sc-mcp/bin/python",
         "args": ["/FULL/PATH/TO/sc_mcp_server.py"],
         "env": {
            "SC_MCP_WORKDIR": "/FULL/PATH/TO/work"
         }
      }
   }
}
```

Tip (macOS + conda): after `conda activate sc-mcp`, run `which python` to get the full Python path. Gemini CLI discovers MCP servers from this file; use `/mcp` in the chat to list available tools.

### 4. Orchestrate with Gemini

From Gemini CLI:

- Create a GEMINI.md plan document (task introduction + pipeline plan). Ask Gemini/ChatGPT to draft it and iterate until it’s clear and actionable.

- Call your MCP tools in order, passing file paths between steps.
- Ask Gemini to summarize key results (top markers per cluster, UMAP interpretation).
- Generate a one-page Markdown or PDF report at the end.

Notes:
- Each step writes files; tools do not share in-memory state.
- Prefer deterministic parameters for reproducibility.

Generate PDF or README.md summary

* * * * *

📌 Notes
-------

- Save intermediate files after each step so you can restart mid-pipeline.  
- With MCP, file paths (e.g., lung8.qc.h5ad) are how steps pass results. Variables are not persisted between tool calls.

* * * * *

✅ Deliverables
==============

Your final submission should include:

1. Notebooks — Part I and (optionally) a helper notebook for Part II
   - Part I: Demonstrates the full Scanpy workflow (QC, doublets, cell cycle, integration, UMAP, clustering, DE).  
   - Includes saved intermediate .h5ad files and exported plots/tables.

2. MCP Tools + Orchestration (Part II)
   - MCP tool scripts or server (source code).  
   - A Gemini CLI transcript showing your tool calls and results summaries.  
   - A generated README.md or PDF report with key figures and findings.

3. GEMINI.md — Plan
   - Short plan of your MCP tool surface, parameters, and I/O contracts.  
   - Which comparisons (e.g., inflamed vs control, elderly focus) you will run.

4. README.md — Submission Guide
   - Folder structure, how to reproduce, dependencies, known limitations.

## Submission Instructions

### 1. Save Your Gemini Chat History

```bash
/chat save computer-lab-4
```

### 2. Copy the Checkpoint File

```bash
cd /content/drive/MyDrive/DDLS-Course/Module4/
cp /root/.gemini/tmp/*/checkpoint-computer-lab-4.json .
```

### 3. Add a README.md

Explain the folder structure and how to run your tools or notebook.

### 4. Verify and Share Your Folder

Ensure your Google Drive DDLS-Course/Module4 folder contains all deliverables. Then:
1. Right-click the Module4 folder and select Share.
2. Set permissions to "Anyone with the link can view and comment".
3. Copy the sharing link.

### 5. Submit the Form

{{< cta cta_text="Click Here to Upload" cta_link="/submit-module4/" >}}

**Submission Deadline: 24h after the computer lab ends**

## Grading

Pass/Fail based on:

- Completion: Core workflow executed and deliverables submitted.  
- Engagement: Notebooks or tools fully executed; evidence of iteration and troubleshooting.  
- Clarity: Organized Module4 folder; clear README.md.  
- Reproducibility: Tool I/O is explicit; intermediate files saved; report generated.