---
title: "Computer Lab 2: AI-Powered Image Segmentation & Web App Deployment with Your AI Agent"
linkTitle: "Computer Lab 2"
weight: 10
type: book
---

Welcome to the second computer lab. This session is divided into two parts. First, you will train a U-Net model for cell segmentation in a guided Jupyter notebook. Second, you will use an AI agent to build and deploy a web application that uses your trained model.

## Learning Goals

By the end of this lab you should be able to:

*   Train a U-Net model for image segmentation using TensorFlow and Keras.
*   Understand the key components of an image segmentation workflow.
*   Use an AI agent (Gemini CLI) to guide the creation of a web application.
*   Deploy a simple web app.
*   Package and submit a multi-part project including a notebook, web app code, and AI chat history.

## Overview of the Workflow

1. Launch the course starter notebook in Google Colab.
2. Set up VS Code tunnel and connect to it.
3. Create the DDLS-Course folder structure in Google Drive.
4. Download the `GEMINI.md` file to your Module2 folder.
5. Open the U-Net training notebook and save a copy to your `Module2` folder for model training.
6. **Part 1: Model Training.** Work through the U-Net training exercises in your notebook.
7. **Part 2: AI-driven Development.** Use the Gemini AI agent to build a Flask web application for your model.
8. Test the web application with a sample image.
9. Take a screenshot or short video to show your web app.

## Before You Start

Make sure you registered a Google account and a Github account.

## Getting Started

### Launch the Course Starter Notebook

Click the button below to open the course starter notebook in Google Colab:

[<img style="display: inline" src="https://colab.research.google.com/assets/colab-badge.svg">](https://colab.research.google.com/github/aicell-lab/ddls-course/blob/main/static/notebooks/ddls-course-starter.ipynb)

In the upper-right corner, make sure the user icon is your personal Gmail account.
This notebook will guide you through setting up VS Code for the lab.

### Enable GPU (optional)
You can enable a GPU in the original Colab notebook if needed (Runtime > Change runtime type).

### Step-by-step Setup

#### 1. Set up VS Code Tunnel

Tips: In Google Colab, select a code cell and press Shift+Enter to run it.

In the starter notebook:
1. Run the cells to mount Google Drive (grant permission when prompted)
2. Run the cell to install and start VS Code tunnel
3. You'll see a URL printed - this is your VS Code access point
4. Open the URL in your browser or connect via your local VS Code

#### 2. Create Folder Structure

Open the VS Code terminal from the menu `View -> Terminal` (upper left corner). In the terminal, create the course folder structure by typing:

```bash
mkdir -p /content/drive/MyDrive/DDLS-Course/Module2/
```

Now, let's restart VS Code in this `Module2` folder:
```
cd /content/drive/MyDrive/DDLS-Course/Module2/
code .
```
This opens another VS Code browser tab or window; you can close the older one. Continue working in the new window. This ensures VS Code opens in your `Module2` folder. You can verify this by checking the browser address bar; it should look like: `https://vscode.dev/tunnel/colab/content/drive/MyDrive/DDLS-Course/Module2`.

#### 3. Switch Working Folder and Download GEMINI.md

Open the VS Code terminal again from the menu `View -> Terminal` (upper left corner), then let's download the Gemini CLI instructions file:

```bash
wget -O GEMINI.md https://raw.githubusercontent.com/aicell-lab/ddls-course/main/static/uploads/ddls_2025_lab2_GEMINI.md
```

#### 4. Create a Notebook (optional)



#### Access the U-Net Training Notebook and Launch the U-Net Training Tutorial

1. **Open the Training Notebook:** Click the link below to open the U-Net training notebook in Google Colab:

[<img style="display: inline" src="https://colab.research.google.com/assets/colab-badge.svg">](https://colab.research.google.com/drive/16Z9reacXGbrAFFDjfDq6p5-fvZJRfzVU?usp=sharing)

2. **Save a Copy to Your Working Directory:** In the notebook, click **File → Save a copy in Drive** to create your own editable version.

3. **Move to Module2 Folder:** In Google Drive, locate your newly saved copy (it will have "Copy of" in the name). Right-click on it and select **Organize → Move**. Navigate to your `/MyDrive/DDLS-Course/Module2/` folder and move the notebook there. You can also rename it to `computer-lab-2.ipynb` for consistency.

4. **Open in VS Code:** In your VS Code file explorer (in the Module2 folder), you should see the notebook file. Click it to open it in VS Code. This lets you work with the notebook in VS Code while keeping the pre-written content and structure.

### Now, start working on the notebook. Follow the guidance and answer the questions inside.


## Part 2: Build a Web App with an AI Agent

After you have completed the U-Net training in Part 1, you will continue using the same AI agent to build a web application that can run inference with your trained model.

#### 5. Install and start the Gemini CLI

In the VS Code terminal, run the following command to install gemini-cli:
```
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.3/install.sh | bash
source /root/.bashrc
nvm install 21
nvm use 21
npm install -g @google/gemini-cli
```

Now you can start the Gemini CLI by typing:

```bash
gemini
```

#### 6. Launch the web app development

In the same Gemini CLI session, type the following to start the web app creation task:

```
Let's start making webapp!
```

The AI agent will now guide you through building the Flask web application based on the instructions in `GEMINI.md`.

#### 7. Test your web app

Once the agent helps you set up the web app, download a sample image to test it. In the VS Code terminal, run:

```bash
wget -O example.tif https://raw.githubusercontent.com/aicell-lab/ddls-course/main/static/uploads/ddls_2025_lab2_example_image.tif
```

Follow the agent's instructions to run the web app and test it with the downloaded image. You should be able to upload `example.tif` and see the segmentation mask produced by your model.

### Once you're done, take a screenshot or short video and save it in the `Module2` directory.

## Important tips for the computer lab

- GPU can be enabled in the original Colab notebook if needed (Runtime > Change runtime type)

Save your chat regularly during the session:

```bash
/chat save computer-lab-2
```

Periodically copy the checkpoint to your Module2 folder:

```bash
cp -i /root/.gemini/tmp/*/checkpoint-computer-lab-2.json /content/drive/MyDrive/DDLS-Course/Module2/
```

## Deliverables

You must submit ALL of the following:

1. Gemini CLI chat history (saved using the command below).
2. Your executed notebook `computer-lab-2.ipynb` with outputs visible (created and saved in VS Code).
3. A screenshot or screen recording showing your final web app working.
4. All web app files (`app.py`, `index.html`, etc.) created with the agent.

### Submission Instructions

All submission steps are completed in VS Code:

#### 1. Save your Gemini CLI chat history
Inside the Gemini CLI (running in VS Code terminal), type the command below BEFORE exiting:

```bash
/chat save computer-lab-2
```

You should see a confirmation message that a checkpoint file was written. Only AFTER that, end the session (`/exit` or Ctrl+C twice) if you wish.

#### 2. Copy the checkpoint to your Module2 folder
In the VS Code terminal, navigate to your Module2 folder and copy the checkpoint:

```bash
cd /content/drive/MyDrive/DDLS-Course/Module2/
cp /root/.gemini/tmp/*/checkpoint-computer-lab-2.json .
```

Verify it is present:

```bash
ls -l checkpoint-computer-lab-2.json
```

#### 3. Verify your submission folder
Your `/content/drive/MyDrive/DDLS-Course/Module2/` folder should contain:
- `computer-lab-2.ipynb` (the U-Net training notebook saved from Colab and executed in VS Code)
- `checkpoint-computer-lab-2.json` (your Gemini CLI chat history)
- `GEMINI.md` (the instruction file)
- All web app files (`app.py`, templates folder, etc.)
- `example.tif` (test image)
- Any additional outputs from training (model files, figures, etc.)
- Screenshots or recordings of your working web app

#### 5. Share your Module2 folder
1. In Google Drive, navigate to your DDLS-Course/Module2 folder
2. Right-click and select "Share"
3. Set permissions to "Anyone with the link can view and comment"
4. Copy the sharing link

Then submit your work by clicking the button below and providing the sharing link to your Module2 folder:

{{< cta cta_text="Click Here to Upload" cta_link="https://forms.gle/8VYrjDPhsmYDXRDq6" >}}

We would also appreciate it if you could provide some feedback via the form to help us improve the course design.

### Submission Deadline

* Standard: submit before the end of the lab session.
* Grace period: you may submit within 24 hours after the session ends if you need additional time.
* Absence: if you cannot attend, obtain prior approval and still submit within 24 hours of the scheduled end.

## Grading

This lab is assessed on a Pass / Fail basis. A **Pass** requires substantive engagement with both parts of the lab, not just minimal submission. Treat the criteria below as the *baseline*; exceeding them strengthens your foundation for later modules.

Evaluation components (all are expected for a Pass):

* **Completion**: All core workflow steps demonstrably executed (Drive mount, U-Net training completed, web app created and tested, checkpoint + notebook submitted).
* **Engagement**: Evidence you explored beyond pure copy/paste in both model training and web app development (e.g. parameter tweaks, added diagnostics, short markdown reflections on what changed / why).
* **Clarity**: Notebook is organized (section headers, concise explanations, cleaned redundant cells, outputs visible where meaningful). Web app files are well-structured.
* **Functionality**: U-Net model training shows meaningful results, and web app successfully runs inference with the trained model.
* **Peer Review Commitment**: After the deadline you will review two assigned submissions and provide constructive, specific feedback (details forthcoming). Submitting your own lab but skipping peer reviews can jeopardize a Pass.

What strengthens your submission (recommended, not strictly required): brief rationale notes before larger code blocks; experiments comparing different settings; clear reporting of training metrics and model performance; documentation of web app features and functionality.

Common reasons for a **Fail**:
* Missing one or more deliverables (checkpoint JSON, executed notebook, or web app files).
* Notebook shows little or no execution / outputs (e.g. only un-run cells, or wholesale copy without adaptation).
* Web app does not function or is not tested with the provided example image.
* No attempt to clarify or reflect (pure raw code dump).
* Ignoring required process (submitting an empty / corrupted checkpoint).
* Failure to complete assigned peer reviews (without prior approval).

Initial mistakes are fine. Iterate, annotate what you learned, and move forward. Depth of engagement with both the machine learning and web development aspects matters more than perfection.

---
Questions during the lab? First try refining your prompt to the AI tutor. Still stuck? Then ask a TA with a concise summary: what you tried, what you expected, what happened.

Good luck and have fun exploring image segmentation and web development!
