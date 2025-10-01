---
title: "Computer Lab 6: Automating Science with Opentrons & Code Agents"
linkTitle: "Computer Lab 6"
date: '2025-11-01'
weight: 11
type: book
---

🌍 Introduction
===============

We will build a **virtual laboratory** equipped with automated liquid handling robots to simulate real wetlab operations. Our primary tool is the **Opentrons Flex**, a state-of-the-art liquid handling robot that can perform precise pipetting, sample preparation, and protocol execution. The ultimate goal is to develop **AI agents that can autonomously design and control wetlab operations**, bridging the gap between computational intelligence and physical laboratory automation.

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

### The Three Key Components for Building AI Agents

Building effective AI agents requires three essential components:

1. **Environment**: The computational context where the agent operates (e.g., Google Colab with Opentrons API, labware, and instruments)
2. **Tools**: The capabilities the agent can use (e.g., MCP tools for executing Python code, controlling lab equipment)
3. **Prompt**: Clear instructions and guardrails that guide the agent's behavior and decision-making

In this lab, you'll learn to design all three components to create agents that can autonomously design and execute laboratory protocols.

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

### Step 2.1 --- Define Lab Equipment

In the notebook, you will define the labware and instruments you will use for this task. You can refer to the [Opentrons labware library](https://labware.opentrons.com/) and [hardware modules](https://docs.opentrons.com/v2/new_modules.html#) to find the appropriate definitions.

The notebook will guide you through:
- Loading labwares
- Loading instruments
- Setting up the protocol context

* * * * *

### Step 2.2 --- Set up a Hypha MCP Endpoint

In Colab, you will:
- Create a **Python interpreter MCP tool** exposing the Opentrons `protocol`, `plate`, `reservoir`, and `pipette` objects.
- Register it on Hypha so it is accessible as an MCP service.

At the end of this step, you will see a URL for your MCP endpoint, e.g.:

`https://hypha.aicell.io/<workspace>/mcp/<service-id>/mcp`

Keep this URL --- you'll need it for Gemini.

* * * * *

### Step 2.3 --- Configure Gemini MCP Settings & `GEMINI.md`

1. Create a `GEMINI.md` file describing:
   - The role of the agent (designing Opentrons experiments).
   - Instructions for using the `pipette`, `plate`, and `reservoir`.
   - Guardrails (no large prints, no external commands).
   - Example snippets (e.g. serial dilution, column dosing).

2. Create a `settings.json` file and add an `mcpServers` entry like this:

   ```json
{
  "mcpServers": {
    "opentrons-mcp": {
      "httpUrl": "your url link"
    }
  }
}
   ```

   Then move this file to the Gemini config directory:
   ```bash
   mkdir -p /root/.gemini
   mv /content/drive/MyDrive/DDLS-Course/Module6/settings.json /root/.gemini/settings.json
   ```

   Tips: Gemini CLI discovers MCP servers from this file; use `/mcp list` in the chat to list available tools.

   **Important Note**: To ensure your actions are properly recorded and to prevent system issues, include the following critical tips in your GEMINI.md file:

   ```
   **Critical Tips**
   -------------
   -   ⚠️ When running Opentrons protocol scripts, add print() statements to show progress and confirm actions like loading labware and instruments.
   ```

* * * * *

### Step 2.4 --- Start Gemini in VS Code and Run Experiments

**Set up VS Code Tunnel (Optional but Recommended)**

For better code editing and debugging experience, you can set up a VS Code tunnel to work with your Colab environment:

1. **Install VS Code CLI** in the Colab terminal:
   ```bash
   curl -Lk 'https://code.visualstudio.com/sha/download?build=stable&os=cli-alpine-x64' --output vscode_cli.tar.gz
   tar -xf vscode_cli.tar.gz
   ```

2. **Start the tunnel**:
   ```bash
   ./code tunnel
   ```
   Follow the authentication steps using your GitHub account, then name your machine "colab".

3. **Open VS Code** in your browser using the provided link and navigate to your Module6 folder:
   ```bash
   cd /content/drive/MyDrive/DDLS-Course/Module6/
   code .
   ```

**Start Gemini CLI and Verify Setup**

1. **Launch Gemini CLI** in your terminal (either in Colab or VS Code):
   ```bash
   gemini
   ```

2. **Verify MCP server discovery**: You should see this message at the top of the Gemini input box: `Using: 1 GEMINI.md file | 1 MCP server (ctrl+t to view)`

3. **Check available tools**: Enter `/mcp list` in the chat interface to see all your configured MCP tools.

4. **Begin experimenting**: Ask Gemini to design and execute Opentrons protocols using your MCP tools!
* * * * *

Deliverables
------------

At the end of this lab, submit in your Google Drive folder:

1. **Completed Notebook**
2. **GEMINI.md**
3. **Gemini Chat History** showing your designed experiment.
4. **Markdown Report (`REPORT.md`)** summarizing:
   - What protocol you designed.
   - Example output from the agent.
   - Your own reflection: how did the agent help?
5. **README.md** — Submission Guide
   - Folder structure, how to reproduce.

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
- Submit via the course form:

{{< cta cta_text="Click Here to Upload" cta_link="https://forms.gle/EHnrmGksJZD3aVx2A" >}}

* * * * *

✅ **Grading**
Pass/Fail based on:

- Completion: Notebook + MCP tool + GEMINI.md + Report.
- Engagement: Evidence of running both simulation and agent workflows.
- Clarity: Organized folder, clear report.
- Reproducibility: All steps can be re-run from your materials.