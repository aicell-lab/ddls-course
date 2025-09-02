---
title: "Computer Lab 1: Introduction to Machine Learning"
linkTitle: "Computer Lab 1"
weight: 10
type: book
---

Welcome to the first computer lab. This session is designed to get everyone—regardless of prior experience—up to speed with the core concepts and coding practices in machine learning needed for the rest of the course. You will interact with an AI tutor via the Gemini CLI while implementing small machine learning exercises (PyTorch) in VS Code connected to Google Colab.

You do not need previous ML experience. Come curious and ready to experiment.

## Learning Goals

By the end of this lab you should be able to:

* Set up a reproducible workspace using VS Code connected to Google Colab.
* Create and organize your work in a structured folder system on Google Drive.
* Use the Gemini CLI to follow an interactive AI‑guided tutorial and ask effective follow‑up questions.
* Run, adapt, and re‑run Python / PyTorch code blocks in VS Code notebooks.
* Save and submit both: (a) your AI chat history, and (b) your executed notebook (`.ipynb`).

## Overview of the Workflow

1. Launch the course starter notebook in Google Colab.
2. Set up VS Code tunnel and connect to it.
3. Create the DDLS-Course folder structure in Google Drive.
4. Download the `GEMINI.md` file to your Module1 folder.
5. Create `computer-lab-1.ipynb` in VS Code.
6. Start the Gemini CLI and run the interactive tutorial.
7. Complete exercises and save all work in Module1 folder.
8. Create README.md and submit folder link via the form.

## Before Start

Make sure you registered a Google account and a Github account.

**Note: For students from SciLifeLab, you will likely need to use your personal Gmail account instead of the SciLifeLab account.**

## Getting Started

### Launch the Course Starter Notebook

Click the button below to open the course starter notebook in Google Colab:

[<img style="display: inline" src="https://colab.research.google.com/assets/colab-badge.svg">](https://colab.research.google.com/github/aicell-lab/ddls-course/blob/main/static/notebooks/ddls-course-starter.ipynb)

On the upper right corner, make sure the user icon is your personal Gmail account icon (instead of, e.g. SciLifeLab account if you have one).

This notebook will guide you through setting up VS Code for the lab.

### Step-by-step Setup

#### 1. Set up VS Code Tunnel

Tips: In a Google Colab, you can select a cell with code, and press `shift+Enter` to run it.

In the starter notebook:
1. Run the cells to mount Google Drive (grant permission when prompted)
2. Run the cell to install and start VS Code tunnel
3. You'll see a URL printed - this is your VS Code access point
4. Open the URL in your browser or connect via your local VS Code

#### 2. Create Folder Structure

Open the VS Code terminal from the menu `View -> Terminal` (upper left corner). In the terminal, create the course folder structure by typing:

```bash
mkdir -p /content/drive/MyDrive/DDLS-Course/Module1/

```

Now, let's restart VS Code in this `Module1` folder:
```
cd /content/drive/MyDrive/DDLS-Course/Module1/
code .
```
This should open another VS Code browser tab or window and you can close the older one. Further operations will be done in the new window. This is an important step to ensure the VS Code opens in your `Module1` folder, you can verify this by checking your browser address bar, it should become something like: `https://vscode.dev/tunnel/colab/content/drive/MyDrive/DDLS-Course/Module1`.

#### 3. Switch Working Folder and Download GEMINI.md

Open the VS Code terminal again from the menu `View -> Terminal` (upper left corner), then let's download the Gemini CLI instructions file:

```bash
wget -O GEMINI.md https://raw.githubusercontent.com/aicell-lab/ddls-course/main/static/uploads/ddls_2025_lab1_GEMINI.md
```

#### 4. Create Your Notebook

In VS Code:
1. Create a new file named `computer-lab-1.ipynb` by running the following command:
```bash
touch computer-lab-1.ipynb
```
3. Now in the files side bar, you should be able to see the file `computer-lab-1.ipynb`, click that and you should be able to open a juptyer notebook.
4. Wait for a while until the detect kernel finish in the upper right corner, then click it to choose "Python Enviornments" then choose "Python 3.12.11" (or something similar).
5. To verify if the notebook environment is working, click + Code, and type:
```python
print("hello world")
```
then press shift + Enter make sure you see "hello world" printed.

Now let's move on.

#### 5. Install and Start the Gemini CLI

In the VS Code terminal, run the following command to install gemini-cli:
```
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.3/install.sh | bash
source /root/.bashrc
nvm install 21
nvm use 21
npm install -g @google/gemini-cli
```

Now you can start gemini cli by typing:

```bash
gemini
```

Log in with your Google account when prompted, follow the instructions, select your google account, then login, copy the code and paste it back to the terminal, and press Enter.

If the CLI exits after login, run `gemini` again. The interface should display: `Using: 1 GEMINI.md file`.

#### 6. Launch the Tutorial

At the Gemini prompt, type:

```
Start
```

This launches the interactive tutorial. Follow the AI tutor's instructions carefully. Answer the questions and press Enter.

Note, if you want to enter a new line, type `\` then press Enter, or use `Ctrl+J`.

At any time, you can use `Ctrl+C` to quite gemini.

If you want to learn more about the gemini options, take a look at this [cheatsheet](https://www.philschmid.de/gemini-cli-cheatsheet).

Note: The gemini CLI window is programmed to guide you through a curriculum, so it's better to not distract the session, if you need to ask question, you can open the Github Copilot by press Command+Shift+P or Ctrl+Shift+P to get the command pallete, then type `Open Chat`, you should then see the Github Copilot on the side. You can then ask questions with the Copilot. To make it aware that you are doing the module, you can click the "Add Context" button, to select the `GEMINI.md` file. Then you can ask specific questions (e.g., *"Why do we zero gradients in PyTorch?"* etc.

Alternatively, if you don't like the command line interface, you can also try to install the [Gemini extension for VS Code](https://marketplace.visualstudio.com/items?itemName=Google.geminicodeassist). You can find it in the VS Code marketplace. It provide ChatGPT or Copilot Chat-like experience.

#### 7. Working with Generated Code

- The Gemini CLI generates Python code files in your Module1 folder
- Type your code into cells in your `computer-lab-1.ipynb` notebook
- Run and experiment with the code in VS Code
- All outputs are automatically saved to Google Drive
- Feel free to modify hyperparameters, add print statements, or explore variations

After completing the tutorial (or reaching the session time limit), proceed to the submission steps below.

> IMPORTANT: Do NOT close or exit the Gemini CLI (e.g. with `/exit` or Ctrl+C) before you save your chat history with `/chat save computer-lab-1` and copy the checkpoint file. If you exit first, the temporary session data can be lost and you will not be able to submit your chat transcript.

### Periodic Saving & Crash Recovery

Save your chat regularly during the session:

```bash
/chat save computer-lab-1
```

Periodically copy the checkpoint to your Module1 folder:

```bash
cp -i /root/.gemini/tmp/*/checkpoint-computer-lab-1.json /content/drive/MyDrive/DDLS-Course/Module1/
```

**Important:** 
- VS Code automatically saves your notebook to Google Drive
- If disconnected, reconnect to the same Colab runtime via the starter notebook
- Your work in the DDLS-Course folder is preserved even if the runtime restarts


## Important tips for the computer lab

* Everyone starts from a different point—progress matters more than prior knowledge.
* Practice *learning how to learn*: formulate precise questions and iterate.
* Provide context when you ask the AI tutor (e.g., include error messages or the code snippet you changed).
* Ask for deeper or advanced topics if you finish early (e.g., *"Show me how to implement a custom PyTorch Dataset"*).
* Try independently first; if blocked, refine your prompt; then consult a TA.
* TAs will guide on process, tooling, or debugging strategy—not hand you final code.
* You can also ask for feedback on your prompts to improve your interaction technique.
* Keep your notebook tidy: interleave short markdown explanations of what each code block does.


### Tips for Working in VS Code

**Notebook Basics:**
- Create cells using the toolbar or keyboard shortcuts
- Run cells with Shift+Enter or the play button
- Switch between code and markdown cells as needed

**Terminal Commands:**
- Use the integrated terminal for Gemini CLI and file operations
- Install packages with `pip install` in terminal or notebook cells

**File Management:**
- All files saved in `/content/drive/MyDrive/DDLS-Course/` persist
- Use the file explorer sidebar to navigate your folder structure
- VS Code auto-saves your work to Google Drive

**Resource Management:**
- Your code runs on Google's servers (Colab backend)
- GPU can be enabled in the original Colab notebook if needed (Runtime > Change runtime type)
- Package installations are temporary per session

## Deliverables

You must submit BOTH of the following:

1. Gemini CLI chat history (saved using the command below).
2. Your executed notebook `computer-lab-1.ipynb` with outputs visible (created and saved in VS Code).

### Submission Instructions

All submission steps are completed in VS Code:

#### 1. Save your Gemini CLI chat history
Inside the Gemini CLI (running in VS Code terminal), type the command below BEFORE exiting:

```bash
/chat save computer-lab-1
```

You should see a confirmation message that a checkpoint file was written. Only AFTER that, end the session (`/exit` or Ctrl+C twice) if you wish.

#### 2. Copy the checkpoint to your Module1 folder
In the VS Code terminal, navigate to your Module1 folder and copy the checkpoint:

```bash
cd /content/drive/MyDrive/DDLS-Course/Module1/
cp /root/.gemini/tmp/*/checkpoint-computer-lab-1.json .
```

Verify it is present:

```bash
ls -l checkpoint-computer-lab-1.json
```

#### 3. Create a README.md for your submission
In VS Code, create a `README.md` file in your Module1 folder that includes:
- Brief description of what the folder contains
- List of all completed exercises and topics covered
- Instructions for reviewers on how to evaluate your work
- Any challenges you faced and how you resolved them
- Notable achievements or extra work you completed

#### 4. Verify your submission folder
Your `/content/drive/MyDrive/DDLS-Course/Module1/` folder should contain:
- `README.md` (overview of the work)
- `computer-lab-1.ipynb` (your notebook created in VS Code with all exercises)
- `checkpoint-computer-lab-1.json` (your Gemini CLI chat history)
- `GEMINI.md` (the instruction file)
- `initial_assessment.txt`
- `learning_plan.md`
- Any additional code files and outputs from exercises
- `outputs/` folder with figures and data

#### 5. Share your Module1 folder
1. In Google Drive, navigate to your DDLS-Course/Module1 folder
2. Right-click and select "Share"
3. Set permissions to "Anyone with the link can view and comment"
4. Copy the sharing link

Then submit your work by clicking the button below and providing the sharing link to your Module1 folder:

{{< cta cta_text="Click Here to Upload" cta_link="https://docs.google.com/forms/d/e/1FAIpQLScG4443UzCp5sTtSo_fpQRED7KN_vacXo4xP92lgX_0H7cOCg/viewform?usp=header" >}}

We would also appreciate if you can provide some feedback via the form to help us improve the course design.

### Submission Deadline

* Standard: submit before the end of the lab session.
* Grace period: you may submit within 24 hours after the session ends if you need additional time.
* Absence: if you cannot attend, obtain prior approval and still submit within 24 hours of the scheduled end.

## Grading

This lab is assessed on a Pass / Fail basis. A **Pass** requires substantive engagement, not just minimal submission. Treat the criteria below as the *baseline*; exceeding them strengthens your foundation for later modules.

Evaluation components (all are expected for a Pass):

* **Completion**: All core workflow steps demonstrably executed (Drive mount, Gemini tutorial run, code executed, checkpoint + notebook submitted).
* **Engagement**: Evidence you explored beyond pure copy/paste (e.g. parameter tweaks, added diagnostics, short markdown reflections on what changed / why).
* **Clarity**: Notebook is organized (section headers, concise explanations, cleaned redundant cells, outputs visible where meaningful).
* **Peer Review Commitment**: After the deadline you will review two assigned notebooks and provide constructive, specific feedback (details forthcoming). Submitting your own lab but skipping peer reviews can jeopardize a Pass.

What strengthens your submission (recommended, not strictly required): brief rationale notes before larger code blocks; experiments comparing two settings; clear reporting of observations (loss trends, speed differences, etc.).

Common reasons for a **Fail**:
* Missing one or both deliverables (checkpoint JSON or executed notebook).
* Notebook shows little or no execution / outputs (e.g. only un‑run cells, or wholesale copy without adaptation).
* No attempt to clarify or reflect (pure raw code dump).
* Ignoring required process (submitting an empty / corrupted checkpoint).
* Failure to complete assigned peer reviews (without prior approval).

Initial mistakes are fine. Iterate, annotate what you learned, and move forward. Depth of engagement matters more than perfection.

---
Questions during the lab? First try refining your prompt to the AI tutor. Still stuck? Then ask a TA with a concise summary: what you tried, what you expected, what happened.

Good luck and have fun exploring machine learning!
