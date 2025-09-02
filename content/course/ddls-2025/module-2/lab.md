---
title: "Computer Lab 2: AI-Powered Image Segmentation & Web App Deployment with Your AI Agent"
linkTitle: "Computer Lab 2"
weight: 10
type: book
---
### (Computer lab materials are not ready yet)

Welcome to the second computer lab. This session is divided into two parts. First, you will train a U-Net model for cell segmentation in a guided Jupyter notebook. Second, you will use an AI agent to build and deploy a web application that uses your trained model!

## Learning Goals

By the end of this lab you should be able to:

*   Train a U-Net model for image segmentation using TensorFlow and Keras.
*   Understand the key components of an image segmentation workflow.
*   Use an AI agent (Gemini CLI) to guide the creation of a web application.
*   Deploy a simple web app.
*   Package and submit a multi-part project including a notebook, web app code, and AI chat history.

## Overview of the Workflow

1.  **Part 1: Model Training.** Work through the U-Net training notebook on Google Colab to train your segmentation model.
2.  **Part 2: AI-driven Development.**
    *   Set up a VS Code tunnel from your Colab environment.
    *   Create the `Module2` project folder on Google Drive.
    *   Use the Gemini AI agent to build a Flask web application for your model.
    *   Test the web application with a sample image.
3.  **Submission.** Save and organize all your work (notebook, web app code files, screenshots, chat history) for submission.

## Getting Started

### Part 1: Train a U-Net for Image Segmentation

1.  **Open the Notebook:** Click the link below to open the notebook in Google Colab.(Access not open yet)
    <!-- [click here to access](https://colab.research.google.com/drive/16Z9reacXGbrAFFDjfDq6p5-fvZJRfzVU?usp=sharing) -->

2.  **Save a Copy:** In the notebook, click **File → Save a copy in Drive** to create your own editable version. All your work for this part will be done in your copy.

3.  **Follow the Tutorial:** Work through the notebook cells. The tutorial will guide you through the concepts of U-Net, data preparation, model training, and evaluation for segmenting cells in microscopy images. **Answer the questions** and execute the code blocks to train your model.

### Part 2: Build a Web App with an AI Agent

After you have trained your model in the notebook, you will use an AI agent to build a web application that can run inference with it.

#### 1. Set up VS Code Tunnel

In your Colab terminal, run the commands under the "Setup VS Code Tunnel" section.

```bash
# In a Colab terminal
curl -Lk 'https://code.visualstudio.com/sha/download?build=stable&os=cli-alpine-x64' --output vscode_cli.tar.gz
tar -xf vscode_cli.tar.gz
./code tunnel
```

Open the URL provided in the output to launch VS Code in your browser.

#### 2.Switch to the Module2 Folder

Open a terminal in VS Code (`View -> Terminal`). 
Move working directory to folder on Google Drive and use this folder as your workspace. This is a crucial step.

```bash
cd /content/drive/MyDrive/DDLS-Course/Module2/
code .
```

A new VS Code window or tab will open. Close the old one and continue your work in the new one. The URL should now end with `.../DDLS-Course/Module2`.

#### 3. Download the AI Agent Instructions

In the new VS Code terminal, download the instruction file for the AI agent:

```bash
wget -O GEMINI.md https://raw.githubusercontent.com/aicell-lab/ddls-course/main/static/uploads/ddls_2025_lab2_GEMINI.md
```

This `GEMINI.md` file contains the specification that will guide the AI agent in helping you build the web app.

#### 4. Install and Start the Gemini CLI

Next, install the Gemini CLI. This tool provides a command-line interface to interact with the AI agent.

```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.3/install.sh | bash
source /root/.bashrc
nvm install 21
nvm use 21
npm install -g @google/gemini-cli
```

Start the Gemini CLI:

```bash
gemini
```

You will be prompted to log in with your Google account. Follow the on-screen instructions. If the CLI exits after login, run `gemini` again.

#### 5. Launch the AI Agent

At the Gemini prompt, type the following to start the web app creation task:

```
Let's start making webapp!
```

The AI agent will now guide you through building the Flask web application based on the instructions in `GEMINI.md`.

#### 6. Test Your Web App

Once the agent helps you set up the web app, download a sample image to test it. In the VS Code terminal, run:

```bash
wget -O example.tif https://raw.githubusercontent.com/aicell-lab/ddls-course/main/static/uploads/ddls_2025_lab2_example_image.tif
```

Follow the agent's instructions to run the web app and test it with the downloaded image. You should be able to upload `example.tif` and see the segmentation mask produced by your model.

## Deliverables

You must submit all of the following items:

1.  **Your executed U-Net notebook** with all outputs visible.
2.  **Your Gemini CLI chat history** (`checkpoint-computer-lab-2.json`).
3.  **A screenshot or screen recording** showing your final web app working.
4.  All **web app files** (`app.py`, `index.html`, etc.) created with the agent.

## Submission Instructions

#### 1. Save Your Gemini Chat History

In the Gemini CLI, save your conversation before exiting:

```bash
/chat save computer-lab-2
```

#### 2. Copy the Checkpoint File

In the VS Code terminal, copy the saved chat history to your project folder:

```bash
cp /root/.gemini/tmp/*/checkpoint-computer-lab-2.json .
```

#### 3. Move Your Notebook

In Google Drive, locate the notebook you created in Part 1. Move it into your `/MyDrive/DDLS-Course/Module2/` folder. You can do this by right-clicking the file in Google Drive and selecting **Organize → Move**.

#### 4. Verify and Share Your Folder

Ensure your `DDLS-Course/Module2` folder in Google Drive contains all the deliverables. Then:
1.  Right-click the **Module2** folder and select **Share**.
2.  Set permissions to **"Anyone with the link can view and comment"**.
3.  Copy the sharing link.

#### 6. Submit the Form

Fill out the submission form with the link to your `Module2` folder:
[https://forms.gle/8VYrjDPhsmYDXRDq6](https://forms.gle/8VYrjDPhsmYDXRDq6)

{{< cta cta_text="Click Here to Upload" cta_link="https://forms.gle/8VYrjDPhsmYDXRDq6" >}}

## Grading

This lab is assessed on a Pass/Fail basis. A **Pass** requires substantive engagement with both parts of the lab.

*   **Completion**: All core workflow steps are executed and all deliverables are submitted.
*   **Engagement**: The notebook is fully executed, and the web app is functional. There is evidence of you actively participating in the process.
*   **Clarity**: Your `Module2` folder is well-organized, and the `README.md` clearly explains your work.
*   **Peer Review Commitment**: You must provide constructive feedback on two assigned peer submissions after the deadline.

Good luck, and have fun building!
