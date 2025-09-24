---
title: "Computer Lab 5: Biologically Informed Neural Networks (BINNs) — Classic and MCP/Gemini"
linkTitle: "Computer Lab 5"
weight: 10
type: book
---

Module 5 Computer Lab: Biologically Informed Neural Networks (BINNs)

🌍 Introduction
===============

In this lab, you will explore **Biologically Informed Neural Networks (BINNs)**, a deep learning architecture that integrates biological pathway knowledge into the structure of neural networks. The main goal is to **build, train, and interpret BINNs** for biological data analysis.

You will work with the `binn` Python package to create BINNs, followed by repackaging the workflow into **MCP tools** and orchestrating it with the **Gemini CLI**.

🧪 What are BINNs?
-------------------

**Biologically Informed Neural Networks (BINNs)** are designed to capture biological complexity while remaining interpretable. Unlike standard neural networks, BINNs are built from biological graphs that define network connections and node annotations.

- **Graph Sources**: Public resources like [Reactome](https://reactome.org/), [KEGG](https://www.genome.jp/kegg/), [Gene Ontology](http://geneontology.org/), or custom pathway data
- **Input Layer**: Maps features (gene expression, protein abundance) to pathway graphs
- **Interpretation**: Uses **SHAP values** to identify which genes, proteins, or pathways contribute most to predictions
- **Visualization**: Built-in plotting functions to visualize node importance on the network

### Open the Module 5 lab notebook in Google Colab:

[<img style="display: inline" src="https://colab.research.google.com/assets/colab-badge.svg">](https://colab.research.google.com/github/aicell-lab/ddls-course/blob/main/static/notebooks/ddls-2025-module-5-computer-lab.ipynb)

Notes:
- Runtime can be CPU; GPU is not necessary.
- You can run a cell with Shift+Enter.

#### Install Gemini CLI in Colab

Go to the terminal in Google Colab and run the following commands to install Gemini CLI:

```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.3/install.sh | bash
source /root/.bashrc
nvm install 21
nvm use 21
npm install -g @google/gemini-cli
```

**Alternative option (if VS Code in Colab does not work for you):**

If the VS Code-in-Colab setup fails or you prefer a different setup, please try to setup a google colab local runtime by following the [instructions here](https://research.google.com/colaboratory/local-runtimes.html). You may need to download and setup Docker locally, then run a docker image.

* * * * *

Part I — Classic BINN Workflow in Jupyter
==========================================

In this section, you will use the notebook like a computational biologist, running cells step by step to build and analyze BINNs using the `binn` package.

### Work on your notebook

You'll follow a standard BINN pipeline: install the BINN package, load biological pathway data, build the network architecture, train the model, and interpret results using SHAP values and visualization tools.

The notebook includes:
- BINN package installation and setup
- Data loading and preprocessing  
- Network architecture building
- Model training and evaluation
- SHAP value generation and interpretation
- Visualization of results

At the end of Part I, you will have:
- Built and trained a BINN model
- Analyzed the network architecture and learned parameters
- Generated SHAP explanations for model predictions
- Created visualizations of node importance

* * * * *

🧩 Part II — Building an AI Agent for BINN Analysis with MCP Tools
===================================================

### Why Part II?

In Part I, you explored a typical BINN workflow step by step.
Now we move from **manual analysis** to **system design**: you will build a set of MCP tools, describe them in a `GEMINI.md` file, and let an AI agent (via the Gemini CLI) use these tools to perform biological analysis tasks.

This teaches you how to **design workflows that an AI can reason about and execute automatically**.

---

### Setting up

For this part, we will:

* Start a **VS Code Tunnel** from the current notebook (environment already has all required packages installed).

* Switch to the Module5 Folder
Open a terminal in VS Code (View -> Terminal). Move working directory to folder on Google Drive and use this folder as your workspace.

```
cd /content/drive/MyDrive/DDLS-Course/Module5/
code .
```

* Continue the work inside VS Code, where you will develop MCP tools and interact with the Gemini CLI agent.

---

### Task: BINN Model Analysis and Interpretation

Now that we have built and trained a BINN model in Part I, we will create an AI agent to perform comprehensive **BINN analysis and interpretation**.

**Suggested functionalities for your agent:**

1. Load and initialize BINN models from saved checkpoints.
2. Analyze network architecture and parameter statistics.
3. Generate SHAP explanations for model predictions.
4. Create various visualizations:
   - Network structure plots
   - Node importance heatmaps
   - SHAP value distributions
   - Pathway-level summaries
5. Generate comprehensive analysis reports.
6. Export results in multiple formats (plots, tables, summaries).

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
This skeleton demonstrates the pattern only. In your real server, use an MCP library that implements the protocol and wire real functions that call the BINN package.

Suggested tools for this task are (you may adjust, add, or remove):

* `load_binn_model(path)` – load saved BINN model
* `analyze_architecture(model)` – get network structure info
* `generate_shap_explanations(model, data)` – compute SHAP values
* `plot_network_structure(model)` – visualize network graph
* `plot_node_importance(shap_values)` – create importance heatmap
* `plot_shap_distribution(shap_values)` – show SHAP value distributions
* `export_results(results, format)` – save analysis outputs
* `generate_analysis_report(model, shap_values, plots)` – create comprehensive report

📌 Write **clear documentation** for each tool (inputs, outputs, usage). This is what enables the AI agent to reason correctly.

Hint: The input arguments and returned types for the MCP tool functions should be primitive Python types (str, int, float, bool, list, dict). Complex objects like BINN models should be handled inside the tool and saved as files, returning file paths (str).

Save this MCP server script as `binn_mcp_server.py` in your Google Drive folder `/content/drive/MyDrive/DDLS-Course/Module5/`.

Before you try your MCP tools with Gemini, you should test each function directly. You can do this by importing the functions in a separate Python script or Jupyter notebook cell. For example, create a new cell in your notebook and run:

```python
from binn_mcp_server import add

result = add(2, 3)  # should return 5
print(result)
```

If this doesn't throw any errors, your MCP server is ready to be wired into Gemini CLI.

### Step 2: Wire the server into Gemini CLI

Create a new file named `settings.json` and add an `mcpServers` entry like this:

```json
{
   "mcpServers": {
      "binn-mcp": {
         "type": "stdio",
         "command": "/usr/local/bin/python",
         "args": ["/content/drive/MyDrive/DDLS-Course/Module5/binn_mcp_server.py"]
      }
   }
}
```

Then move this file to the Gemini config directory. WARNING: This will overwrite any existing `settings.json` file, so back it up if needed.
```bash
mv /content/drive/MyDrive/DDLS-Course/Module5/settings.json /root/.gemini/settings.json
```

Tips: Gemini CLI discovers MCP servers from this file; use `/mcp list` in the chat to list available tools.

---

### Step 3: Write the `GEMINI.md`

Create a new file named `GEMINI.md` in your Google Drive folder `/content/drive/MyDrive/DDLS-Course/Module5/`.

This file should describe the overall plan for the agent, including:

* **Context**: BINN model trained in Part I, ready for analysis and interpretation.
* **Goal**: Perform comprehensive BINN analysis including architecture analysis, SHAP explanations, and visualization.
* **Instructions**:
   * Outline how the agent should perform the task step by step
   * Specify what output the agent is expected to produce

---

### Step 4: Run the BINN analysis with your Gemini CLI Agent

Important: In order for Gemini CLI to discover your `GEMINI.md` file and MCP server, you need to start a new Gemini CLI session.

Note: If you are already in Gemini CLI, save your chat history `/chat save computer-lab-5` and then exit Gemini CLI.

Ensure you are in the correct folder:
```bash
cd /content/drive/MyDrive/DDLS-Course/Module5/
```

Then start a new Gemini CLI session:
```bash
gemini
```

If you saved a previous chat session, you can continue that session by loading the saved history `/chat load computer-lab-5`.

Make sure the `GEMINI.md` file and the MCP server are discovered by Gemini CLI. You should see this on top of the input box in Gemini CLI: `Using: 1 GEMINI.md file | 1 MCP server (ctrl+t to view)`

To check if all your MCP tools are available, enter the command `/mcp list` in the chat interface. You should see a list of all your configured MCP tools.

Now that everything is set up, you can instruct the agent to perform the BINN analysis. The agent will call your MCP tools when needed to perform the task.

#### How to know if the agent is calling your MCP tools?

When Gemini first uses your MCP tool, it will ask you whether to allow the tool call. You should see a prompt like this:

```bash
 ╭─────────────────────────────────────────────────────────────────────────────────────╮
 │ ?  add (binn-mcp MCP Server) {"a":5,"b":3} ←                                          │
 │                                                                                     │
 │   MCP Server: binn-mcp                                                              │
 │   Tool: add                                                                         │
 │                                                                                     │
 │ Allow execution of MCP tool "add" from server "binn-mcp"?                             │
 │                                                                                     │
 │ ● 1. Yes, allow once                                                                │
 │   2. Yes, always allow tool "add" from server "binn-mcp"                              │
 │   3. Yes, always allow all tools from server "binn-mcp"                               │
 │   4. No, suggest changes (esc)                                                      │
 ╰─────────────────────────────────────────────────────────────────────────────────────╯
 ```
If you allow the tool call only once, you will also see this message the next time the agent calls the same tool.

After your MCP tool has been executed, you should see which tool was called with what arguments, and the returned result, like this:
```
╭──────────────────────────────────────╮
│  > Add the number 5 to the number 3  │
╰──────────────────────────────────────╯

 ╭───────────────────────────────────────────────────────────────────────────────╮
 │ ✓  add (binn-mcp MCP Server) {"a":5,"b":3}                                      │
 │                                                                               │
 │    8                                                                          │
 ╰───────────────────────────────────────────────────────────────────────────────╯
✦ 8
```

You can also find the same information in your Gemini chat history:

```json
{
   "role": "model",
   "parts": [
   {
      "functionCall": {
         "name": "add",
         "args": {
         "a": 5,
         "b": 3
         }
      }
   }
   ]
}
```

---

### Step 5: Generate the Report

Finally, use the agent to produce a **Markdown report** `REPORT.md` file that includes:

* BINN architecture analysis and statistics
* SHAP value interpretations and key findings
* Visualizations of network structure and node importance
* Biological insights and pathway-level analysis

Add a short interpretation of the results in **your own words** to the report.

* * * * *

✅ Deliverables:
==============

Your final submission in Google Drive folder should include:

1. Notebook for Part I.
   - The completed and executed Jupyter notebook from Part I, saved as `.ipynb`.

2. MCP Tools + Orchestration (Part II)
   - MCP tool scripts or server (source code).  
   - A Gemini CLI chat history showing your tool calls and results summaries.

3. GEMINI.md — Plan
   - Short plan of your MCP tool surface, parameters, and I/O contracts.

4. README.md — Submission Guide
   - Folder structure, how to reproduce, dependencies, known limitations.

5. A Markdown report `REPORT.md` with BINN analysis, figures, and your own interpretation.

## Submission Tips:

### Save Your Gemini Chat History

Regularly save your Gemini chat history to avoid losing records of your work. In the Gemini CLI, run:
```
/chat save computer-lab-5
```

### Copy the Checkpoint File

After you closed the Gemini CLI, copy the checkpoint file from the temporary Gemini directory to your Google Drive folder.
```bash
cd /content/drive/MyDrive/DDLS-Course/Module5/
cp /root/.gemini/tmp/*/checkpoint-computer-lab-5.json .
```

You can also instruct Gemini to copy the checkpoint file to your Google Drive folder while you are still in the Gemini CLI:
```
Please run this command: `cp /root/.gemini/tmp/*/checkpoint-computer-lab-5.json .
```

This will prevent the loss of your chat history if runtime in Google Colab disconnects and gets reset.

### Add a README.md

Explain the folder structure and how to run your tools or notebook.

### Verify and Share Your Folder

Ensure your Google Drive DDLS-Course/Module5 folder contains all deliverables. Then:
1. Right-click the Module5 folder and select Share.
2. Set permissions to "Anyone with the link can view and comment".
3. Copy the sharing link.

### Submit the Form

{{< cta cta_text="Click Here to Upload" cta_link="https://forms.gle/frcw772cxngQ4WxC9" >}}

**Submission Deadline: 24h after the computer lab ends**

## Grading

Pass/Fail based on:

- Completion: Core workflow executed and deliverables submitted.  
- Engagement: Notebooks or tools fully executed; evidence of iteration and troubleshooting.  
- Clarity: Organized Module5 folder; clear README.md.  
- Reproducibility: Tool I/O is explicit; intermediate files saved; report generated.
