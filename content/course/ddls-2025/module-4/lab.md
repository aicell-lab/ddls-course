---
title: "Computer Lab 4: scRNASeq — Classic and MCP/Gemini"
linkTitle: "Computer Lab 4"
weight: 10
type: book
---
Module 4 Computer Lab: Single-Cell RNA-Seq of COVID vs Controls

🌍 Introduction
===============

In this lab, you will explore **single-cell RNA sequencing (scRNASeq) data** from patients with COVID compared to healthy controls. The main goal is to **identify gene expression differences at the single-cell level** between these groups.

You will perform a standard scRNASeq analysis using **Scanpy** in a Jupyter notebook, followed by repackaging the workflow into **MCP tools** and orchestrating it with the **Gemini CLI**.

🧪 Data Description
-------------------

- **Samples:** 4 patients with COVID and 4 healthy controls  
- **Cells:** Each sample has been subsampled to ~1500 cells

This dataset is small enough to run quickly during class, but still captures the essential features of a real scRNASeq study.

### Open the Module 4 lab notebook in Google Colab:

[<img style="display: inline" src="https://colab.research.google.com/assets/colab-badge.svg">](https://colab.research.google.com/github/aicell-lab/ddls-course/blob/main/static/notebooks/ddls-2025-module-4-computer-lab-scRNASeq.ipynb)

Notes:
- Runtime can be CPU; GPU is not necessary.
- You can run a cell with Shift+Enter.


**Alternative option (if VS Code in Colab does not work for you):**

If the VS Code-in-Colab setup fails or you prefer a different setup, please try to setup a google colab local runtime by following the [instructions here](https://research.google.com/colaboratory/local-runtimes.html). You may need to download and setup Docker locally, then run a docker image.

* * * * *

Part I — Classic scRNASeq Workflow in Jupyter
=============================================

In this section, you will use the notebook like a bioinformatician at the bench, running cells step by step to build an analysis using Scanpy.

### Work on your notebook

You’ll follow a standard Scanpy pipeline: load the .h5ad dataset with metadata, run QC (including doublet detection and optional cell-cycle regression), normalize and select HVGs, integrate batches, embed (PCA/UMAP), cluster (Leiden).

At the end of Part I, you will have processed the data as part of a basic scRNASeq pipeline using Scanpy inside Jupyter.

* * * * *

🧩 Part II — Building an AI Agent for Differential Gene Expression with MCP Tools
===================================================

### Why Part II?

In Part I, you explored a typical single-cell RNA-seq workflow step by step.
Now we move from **manual analysis** to **system design**: you will build a set of MCP tools, describe them in a `GEMINI.md` file, and let an AI agent (via the Gemini CLI) use these tools to perform a real biological task.

This teaches you how to **design workflows that an AI can reason about and execute automatically**.

---

### Setting up

For this part, we will:

* Start a **VS Code Tunnel** from the current notebook (environment already has all required packages installed).

* Switch to the Module4 Folder
Open a terminal in VS Code (View -> Terminal). Move working directory to folder on Google Drive and use this folder as your workspace.

```
cd /content/drive/MyDrive/DDLS-Course/Module4/
code .

```

* Continue the work inside VS Code, where you will develop MCP tools and interact with the Gemini CLI agent.

---

### What is MCP?

[MCP (Model Context Protocol)](https://modelcontextprotocol.io/docs/getting-started/intro) lets you wrap analysis steps as **tools** that an AI agent can call.

* Each tool has a clear **name, input, and output**.
* The agent can decide how to combine tools to solve a task.
* Instead of one long script, you provide **modular building blocks** that the AI can orchestrate.

Think of it as teaching the agent how to **press the right buttons in your analysis pipeline**.

---

### Task: Differential Gene Expression (DGE)

Now that we have preprocessed our PBMC dataset (Covid vs Control) in Part I, we will analyze **Differential Gene Expression**.

DGE in scRNA-seq is used to:

* Identify **gene markers** that distinguish cell populations.
* Identify **differentially regulated genes across conditions** (Covid vs Control).

**Your agent should be able to:**

1. Load the processed AnnData file.
2. Select a cluster or cell type.
3. Compare gene expression between **Covid and Control** cells within that cluster.
4. Run DGE tests (parametric and non-parametric):

   * *t-test*
   * *Wilcoxon rank-sum*
   * (Optionally: *logreg*)
5. Compare results between the tests.
6. Visualize the results (volcano, dotplot, violin, UMAP overlays).
7. Extend the comparison:

   * Between clusters (marker discovery)
   * Between conditions (Covid vs Control)
   * Between samples (consistency check)
8. Summarize results in a short report.

📌 **Hint:** By default, Scanpy uses `.raw` in AnnData for DGE; this can be changed with `use_raw=False`. The dataset contains >19,000 genes after filtering.

---

### Step 1: Build MCP Tools

Now to allow the AI agent to perform the task, you need to build a set of MCP tools. A minimal MCP server template is provided in the starter notebook.

Minimal MCP server pattern (example):

```bash
pip install mcp
```

```python
"""
FastMCP quickstart example.
"""

from mcp.server.fastmcp import FastMCP

# Create an MCP server
mcp = FastMCP("Demo")


# Add an addition tool
@mcp.tool()
def add(a: int, b: int) -> int:
    """Add two numbers"""
    return a + b


if __name__ == "__main__":
   # Run as an MCP stdio server (no prints to stdout!)
   mcp.run(transport="stdio")
```


You can refer to full documentation to [MCP SDK](https://github.com/modelcontextprotocol/python-sdk)
This skeleton demonstrates the pattern only. In your real server, use an MCP library that implements the protocol and wire real functions that call Scanpy.

Suggested tools for this task are (you may adjust, add, or remove):

* `load_anndata(path)` – load dataset
* `subset_cells(query)` – select cluster or type
* `check_group_sizes(groupby="condition")` – confirm enough cells per group
* `run_dge(groupby, case, ref, method)` – perform test
* `plot_volcano(dge_results)` – visualize top DEGs
* `plot_umap(genes)` – show expression on UMAP
* `compare_tests(results1, results2)` – overlap between methods
* `save_table(results)` – export DEG table
* `generate_report(dge_results, plots)` – assemble Markdown report

📌 Write **clear documentation** for each tool (inputs, outputs, usage). This is what enables the AI agent to reason correctly.

Hint: The input arguments and returned types for the MCP tool functions should be primitive Python types (str, int, float, bool, list, dict). Complex objects like AnnData should be handled inside the tool and saved as a file and returned as a file path (str).

Save this MCP server script as `sc_mcp_server.py` in your Google Drive folder `/content/drive/MyDrive/DDLS-Course/Module4/`.

Before you try your MCP tools with Gemini, you should test each function directly. You can do this by importing the functions in a separate Python script or Jupyter notebook cell. For example, create a new cell in your notebook and run:

```python
from sc_mcp_server import add

result = add(2, 3)  # should return 5
print(result)
```

If this doesn't through any errors, your MCP server is ready to be wired into Gemini CLI.

### Step 2: Wire the server into Gemini CLI

Create a new file named `settings.json` and add an `mcpServers` entry like this:

```json
{
   "mcpServers": {
      "sc-mcp": {
         "type": "stdio",
         "command": "/usr/local/bin/python",
         "args": ["/content/drive/MyDrive/DDLS-Course/Module4/sc_mcp_server.py"]
      }
   }
}
```

Then move this file to the Gemini config directory. WARNING: This will overwrite any existing `settings.json` file, so back it up if needed.
```bash
mv /content/drive/MyDrive/DDLS-Course/Module4/settings.json /root/.gemini/settings.json
```

Tips: Gemini CLI discovers MCP servers from this file; use `/mcp list` in the chat to list available tools.

---

### Step 3: Write `GEMINI.md`

This file tells the AI agent:

* **Context**: Covid PBMC dataset, processed and clustered in Part I.
* **Goal**: Perform DGE analysis to identify marker genes and condition-specific genes.
* **Instructions**:
   * Outline how the agent should perform the task step by step
   * Specify what output the agent is expected to produce
   * Define the data path (`/content/drive/MyDrive/DDLS-Course/Module4/data/covid/`)
   * How the agent should use the MCP tools

---

### Step 4: Run Gemini CLI Agent

* Launch the Gemini CLI agent with your `GEMINI.md`. Make sure the `GEMINI.md` file is discovered by Gemini CLI. You should see this on top of the input box in Gemini CLI: `Using: 1 GEMINI.md file | 1 MCP server (ctrl+t to view)`
* Run the command `/mcp list` to check if all your MCP tools are available. You should see a list of all your configured MCP tools.
* The agent will call your MCP tools when needed to perform the task.

---

### Step 5: Generate the Report

Finally, use the agent to produce a **Markdown report** `REPORT.md` file that includes:

* Which clusters you analyzed
* A table of top DEGs with statistics
* At least one visualization

Add a short interpretation of the results in **your own words** to the report.

* * * * *

✅ Deliverables:
==============

Your final submission in Google Drive folder should include:

1. Notebook for Part I.
   - You might need to move the notebook to folder 'module4', or download the notebook and upload to your google drive folder.

2. MCP Tools + Orchestration (Part II)
   - MCP tool scripts or server (source code).  
   - A Gemini CLI transcript showing your tool calls and results summaries.

3. GEMINI.md — Plan
   - Short plan of your MCP tool surface, parameters, and I/O contracts.  

4. README.md — Submission Guide
   - Folder structure, how to reproduce, dependencies, known limitations.

5. A Markdown report `REPORT.md` with DEGs, figures, and interpretation.

## Submission Tips:

### Save Your Gemini Chat History

```bash
/chat save computer-lab-4
```

### Copy the Checkpoint File

```bash
cd /content/drive/MyDrive/DDLS-Course/Module4/
cp /root/.gemini/tmp/*/checkpoint-computer-lab-4.json .
```

### Add a README.md

Explain the folder structure and how to run your tools or notebook.

### Verify and Share Your Folder

Ensure your Google Drive DDLS-Course/Module4 folder contains all deliverables. Then:
1. Right-click the Module4 folder and select Share.
2. Set permissions to "Anyone with the link can view and comment".
3. Copy the sharing link.

### Submit the Form

{{< cta cta_text="Click Here to Upload" cta_link="https://forms.gle/d9Q5uvUWbgMRNvTN7" >}}

**Submission Deadline: 24h after the computer lab ends**

## Grading

Pass/Fail based on:

- Completion: Core workflow executed and deliverables submitted.  
- Engagement: Notebooks or tools fully executed; evidence of iteration and troubleshooting.  
- Clarity: Organized Module4 folder; clear README.md.  
- Reproducibility: Tool I/O is explicit; intermediate files saved; report generated.