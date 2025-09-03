---
title: "Computer Lab 2: Training a U-Net model for Cell Segmentation"
linkTitle: "Computer Lab 2"
weight: 10
type: book
---
### (Computer lab materials are not ready yet)

Welcome to the second computer lab. This session is divided into two parts. First, you will train a U-Net model for cell segmentation in a guided Jupyter notebook. Second, you will use an AI agent to build and deploy your trained model with a Web UI!

## Learning Goals

By the end of this lab you should be able to:

*   Train a U-Net model for image segmentation using TensorFlow and Keras.
*   Understand the key components of an image segmentation workflow.
*   Use an AI agent (Gemini CLI) to build a web UI and  deploy the model

## Getting Started

### 0. Before Start

**Did you experience any connnection issue with the VS Code Tunnel in Computer Lab 1 last week?** 
If everything went well for you last week for computer lab 1, you can skip this step. 

Otherwise, please try to setup a google colab local runtime by following the [instructions here](https://research.google.com/colaboratory/local-runtimes.html). You may need to download and setup Docker locally, then run a docker image. This will take some time. If you go for this, please be aware that this computer lab involves training AI model which requires GPU which may not available locally on your own laptop. It might still work without a GPU, but it will be very slow.

Alternatively, if none of these works for you, feel free to use Google Colab directly without VS Code, or setup VS Code locally on your laptop. If you do it locally, you might want to setup a conda environment, and if you don't have GPU, it maybe very slow for the model training part.

### 1. Launch the Course Starter Notebook

Click the button below to open the course starter notebook in Google Colab:

[<img style="display: inline" src="https://colab.research.google.com/assets/colab-badge.svg">](https://colab.research.google.com/github/aicell-lab/ddls-course/blob/main/static/notebooks/ddls-course-starter.ipynb)

On the upper right corner, make sure the user icon is your personal Gmail account icon (instead of, e.g. SciLifeLab account if you have one).

#### 2. Set up VS Code Tunnel

**Set Runtime to GPU:** Ensure your runtime is set to GPU: **Runtime** > **Change runtime type** > **Hardware accelerator** (set to GPU). This is important for running AI model training in this computer lab.

Tips: In a Google Colab, you can select a cell with code, and press `shift+Enter` to run it.

In the starter notebook:

1. Run the cells to mount Google Drive (grant permission when prompted)
2. Run the cell to install and start VS Code tunnel
3. You'll see a URL printed - this is your VS Code access point
4. Open the URL in your browser or connect via your local VS Code


In your Colab terminal, run the commands under the "Setup VS Code Tunnel" section.

```bash
# In a Colab terminal
curl -Lk 'https://code.visualstudio.com/sha/download?build=stable&os=cli-alpine-x64' --output vscode_cli.tar.gz
tar -xf vscode_cli.tar.gz
./code tunnel
```

Open the URL provided in the output to launch VS Code in your browser.

Open the VS Code terminal from the menu `View -> Terminal` (upper left corner). In the terminal, create the course folder structure by typing:

```bash
mkdir -p /content/drive/MyDrive/DDLS-Course/Module2/

```

#### 3.Switch to the Module2 Folder

Open a terminal in VS Code (`View -> Terminal`). 
Move working directory to folder on Google Drive and use this folder as your workspace. This is a crucial step.

```bash
cd /content/drive/MyDrive/DDLS-Course/Module2/
code .
```

A new VS Code window or tab will open. Close the old one and continue your work in the new one. The URL should now end with `.../DDLS-Course/Module2`.


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

#### 5. Download the computer lab notebook

In the new VS Code terminal, download the instruction file for the AI agent:

```bash
cd /content/drive/MyDrive/DDLS-Course/Module2/
wget -O ddls_2025_lab2_U_Net_for_cell_segmentation.ipynb https://raw.githubusercontent.com/aicell-lab/ddls-course/main/static/uploads/ddls_2025_lab2_U_Net_for_cell_segmentation.ipynb
```

This `ddls_2025_lab2_U_Net_for_cell_segmentation.ipynb` contains the computer lab notebook. You can click on the notebook in the file explorer and open it.

And now start with computer lab, and follow the instructions in the computer lab.


## Deliverables

You must submit all of the following items:

1.  **Your executed U-Net notebook** with all outputs visible.
2.  **Your Gemini CLI chat history** (`checkpoint-computer-lab-2.json`).
3.  **A screenshot or screen recording** showing your final web app working.
4.  All other files, including the **web app files** (`app.py`, `index.html`, etc.) created with the agent.

## Submission Instructions

#### 1. Save Your Gemini Chat History

In the Gemini CLI, save your conversation before exiting:

```bash
/chat save computer-lab-2
```

#### 2. Copy the Checkpoint File

In the VS Code terminal, copy the saved chat history to your project folder:

```bash
cd /content/drive/MyDrive/DDLS-Course/Module2/
cp /root/.gemini/tmp/*/checkpoint-computer-lab-2.json .
```

#### 4. Verify and Share Your Folder

Ensure your `DDLS-Course/Module2` folder in Google Drive contains all the deliverables. Then:
1.  Right-click the **Module2** folder and select **Share**.
2.  Set permissions to **"Anyone with the link can view and comment"**.
3.  Copy the sharing link.

#### 6. Submit the Form

Fill out the submission form with the link to your `Module2` folder:
[https://forms.gle/8VYrjDPhsmYDXRDq6](https://forms.gle/8VYrjDPhsmYDXRDq6)

{{< cta cta_text="Click Here to Upload" cta_link="https://forms.gle/8VYrjDPhsmYDXRDq6" >}}

**Submission Deadline: 24h after ending the computer lab**

## Grading

This lab is assessed on a Pass/Fail basis. A **Pass** requires substantive engagement with both parts of the lab.

*   **Completion**: All core workflow steps are executed and all deliverables are submitted.
*   **Engagement**: The notebook is fully executed, and the web app is functional. There is evidence of you actively participating in the process, including peer review.
*   **Clarity**: Your `Module2` folder is well-organized, and the `README.md` clearly explains your work.
*   **Peer Review Commitment**: You must provide constructive feedback on two assigned peer submissions after the deadline.

Good luck, and have fun building!
