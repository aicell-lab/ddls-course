---
title: "Computer Lab 6: Automating Science with Opentrons & Code Agents"
linkTitle: "Computer Lab 6"
date: '2025-10-01'
weight: 11
type: book
---

🌍 Introduction
===============

In this lab, you will explore **automation of science experiments** using the Opentrons API for pipetting robots. You will first practice running **protocols in simulation mode** to understand how the API works.

Then, you will move to **Code Agents**: integrating the lab context into a Hypha MCP endpoint, configuring Gemini CLI with your MCP tool, and letting an AI agent design and execute experiments.

This lab combines **programming, robotics simulation, and AI orchestration**.

* * * * *

Part I --- Getting Started with Opentrons in Google Colab
-------------------------------------------------------

### Step 1: Open the Module 6 Notebook in Colab

[<img style="display: inline" src="https://colab.research.google.com/assets/colab-badge.svg">](https://colab.research.google.com/github/aicell-lab/ddls-course/blob/main/static/notebooks/ddls-2025-module-6-computer-lab-automating-science.ipynb)

Notes:
- Runtime: CPU is sufficient.
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

### Step 2: Install and Import the Opentrons API

The notebook will guide you through installing the Opentrons package and setting up a **ProtocolContext**.

### Step 3: Practice with the Opentrons API

You will:
- Load labware (`96-well plate`, `reservoir`, `tiprack`).
- Load an instrument (`p1000_single` pipette).
- Write and run a **serial dilution protocol** in simulation.
- Inspect the output log from the simulator to confirm your steps.

By the end of Part I, you will:
- Understand how the Opentrons API structures labware, wells, and pipettes.
- Be able to write short protocols for common lab tasks (aspirate, dispense, mix, transfer).

* * * * *

Part II --- From Simulation to AI Agents
--------------------------------------
🤖 What is a Code Agent?
------------------------

A **Code Agent** is an AI agent that doesn't just *call tools* --- it can also **generate, execute, and adapt code** to solve problems. Instead of relying only on predefined MCP tools (e.g., "train BINN model," "plot SHAP values"), a code agent works in a more open-ended way:

1.  **Writes Python snippets** in response to your request.

2.  **Executes them** in a controlled environment (e.g., Google Colab).

3.  **Observes the results** (success, error, printed logs).

4.  **Improves or retries** the code if needed.

This loop is similar to how a human scientist programs: write → run → debug → refine.

* * * * *

💡 Why do we need Code Agents?
------------------------------

-   **Flexibility**: In real experiments, not everything can be wrapped into fixed MCP tools. Sometimes you just need quick logic (loops, conditions, data munging).

-   **Exploration**: Scientists often *don't know in advance* what exact steps are needed. Code agents allow the AI to try things and refine them.

-   **Automation**: Instead of giving you a "template," the agent can adaptively build a protocol (e.g., change pipetting volumes, add new mix steps, generate a serial dilution loop).

In short: **MCP tools are like predefined functions. Code Agents are like giving the agent a Jupyter cell to think in.**

### Related Materials
This approach is inspired by research on [Code Agents](https://arxiv.org/abs/2401.07339) and practical tutorials from Hugging Face's [Agents Course](https://huggingface.co/learn/agents-course/en/unit2/smolagents/code_agents).

* * * * *

Task 2: Code Agents for Automated Protocol Design
-------------------------------------------------

### Step 2.1 --- Set up a Hypha MCP Endpoint

In Colab, you will:
- Create a **Python interpreter MCP tool** exposing the Opentrons `protocol`, `plate`, `reservoir`, and `pipette` objects.
- Register it on Hypha so it is accessible as an MCP service.

At the end of this step, you will see a URL for your MCP endpoint, e.g.:

`https://hypha.aicell.io/<workspace>/mcp/<service-id>/mcp`

Keep this URL --- you'll need it for Gemini.

* * * * *

### Step 2.2 --- Configure Gemini MCP Settings & `GEMINI.md`

1. Create a `GEMINI.md` file describing:
   - The role of the agent (designing Opentrons experiments).
   - Instructions for using the `pipette`, `plate`, and `reservoir`.
   - Guardrails (no large prints, no external commands).
   - Example snippets (e.g. serial dilution, column dosing).

2. Configure Gemini CLI to point to your MCP service:

   ```bash
   gemini \
     --config GEMINI.md \
     --mcp-server python-interpreter:https://hypha.aicell.io/<workspace>/mcp/<service-id>/mcp
   ```

* * * * *

### Step 2.3 --- Start Gemini in Colab Terminal and Run Experiments

- Open a Colab terminal.
- Change to the Module6 directory:
  ```bash
  cd /content/drive/MyDrive/DDLS-Course/Module6/
  ```
- Launch Gemini with the above command.
- Chat with the agent:
  - *"Add 100 µL media from reservoir A1 into wells A2--A11, then perform a serial dilution from A1 to A10."*
  - *"Dose full column 3 (A3--H3) with 50 µL media."*
- Gemini will generate code, send it to your MCP tool, and you will see simulation outputs.

* * * * *

Deliverables
------------

At the end of this lab, submit in your Google Drive folder:

1. **Completed Notebook** from Part I.
2. **MCP Tool + GEMINI.md** (Part II).
3. **Gemini Chat History** showing your designed experiment.
4. **Short Markdown Report (`REPORT.md`)** summarizing:
   - What protocol you designed.
   - Example output from the agent.
   - Your own reflection: how did the agent help?

* * * * *

Submission Tips
---------------

- Save Gemini chat history regularly:
  ```
  /chat save computer-lab-6
  ```

- Copy checkpoint files from Colab runtime:
  ```bash
  cp /root/.gemini/tmp/*/checkpoint-computer-lab-6.json .
  ```

- **Important**: Copy your completed notebook to your Google Drive folder at `DDLS-Course/Module6/` after finishing the lab.

- Share your Google Drive folder with "Anyone with the link can view and comment."
- Submit via the course form: [https://forms.gle/EHnrmGksJZD3aVx2A](https://forms.gle/EHnrmGksJZD3aVx2A)

* * * * *

✅ **Grading**
Pass/Fail based on:

- Completion: Notebook + MCP tool + GEMINI.md + Report.
- Engagement: Evidence of running both simulation and agent workflows.
- Clarity: Organized folder, clear report.
- Reproducibility: All steps can be re-run from your materials.