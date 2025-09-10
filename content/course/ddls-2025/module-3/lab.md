---
title: "Computer Lab 3: Exploring and Classifying Proteins with AlphaFold"
linkTitle: "Computer Lab 3"
weight: 10
type: book
---
Module 3 Computer Lab: Exploring and Classifying Proteins with AlphaFold

🌍 Introduction
===============

One of the grand challenges in biology is to understand how the linear sequence of amino acids encodes the three-dimensional structure and function of proteins.\
Traditionally, solving protein structures required labor-intensive experimental methods such as X-ray crystallography, NMR spectroscopy, or cryo-EM. These methods are still the gold standard, but they cover only a fraction of all proteins known today.

The development of AlphaFold (DeepMind, 2021) has transformed structural biology by enabling computational prediction of protein structures at proteome scale. With AlphaFold DB, structures are now available for nearly every protein sequence in UniProt. This has opened new possibilities:

-   Exploring protein structure-function relationships at scale

-   Investigating intrinsically disordered proteins (IDPs), enzymes, or membrane proteins that are difficult to study experimentally

-   Building machine learning models that combine sequence and structure features to predict protein properties

In this assignment, you will learn by doing:

-   First, you will explore how to run AlphaFold predictions yourself, and practice extracting features from the resulting structures.

-   Then, you will design a mini-project where you build a dataset of proteins, extract structural features, and train a classifier to distinguish between different types of proteins.

This exercise is not only about coding skills but also about adopting a data-driven scientific mindset:

-   How do you turn raw biological data (sequences, PDBs) into features?

-   Which features are biologically meaningful for the property you want to classify?

-   How can AI tools (like ChatGPT or Gemini) help you explore literature, design workflows, and accelerate your research?

By the end of the lab, you will have gone through a full research-style workflow: from data acquisition, to feature extraction, to machine learning, and finally to interpretation.


Part I --- Exploring AlphaFold
==============================

### 1\. Search UniProt for a protein of interest

The UniProt Knowledgebase (UniProtKB) is the central hub for protein sequence and annotation data.\
We will use the UniProt REST API to search for proteins and download metadata.

-   UniProt API documentation: https://www.uniprot.org/help/api_queries

-   Query field reference: https://www.uniprot.org/help/query-fields

Before writing Python code, try some queries directly on the UniProt website:

-   Reviewed human kinases\
    reviewed:true AND organism_id:9606 AND protein_name:kinase

-   Reviewed E. coli enzymes\
    reviewed:true AND organism_id:562 AND (ec:*)

-   Reviewed proteins with known 3D structure\
    reviewed:true AND keyword:"3D-structure"

-   Intrinsically disordered proteins (IDPs)\
    reviewed:true AND keyword:"Intrinsic disorder"

👉 You can paste these queries into the UniProt search bar: <https://www.uniprot.org/uniprotkb>

Try changing the organism (organism_id), keywords (kinase, membrane, disorder), or properties (length, ec) to explore different sets.

* * * * *

### 2\. Retrieve the protein sequence from the AlphaFold API

The AlphaFold Protein Structure Database (AlphaFold DB) not only provides predicted protein structures but also makes sequences and metadata accessible through its public REST API.

-   Documentation: https://alphafold.ebi.ac.uk/api-docs

-   Each UniProt accession in AlphaFold DB has associated endpoints for retrieving the sequence, the predicted structure (PDB), and additional files (such as PAE and pLDDT confidence scores).

For this step:

-   Use the UniProt ID you selected in section 1.

-   Query the AlphaFold API to retrieve the protein sequence (e.g., https://alphafold.ebi.ac.uk/api/prediction/P00374), and save the sequence locally — this will be the input for the ColabFold notebook in the next step.

Note: At this stage, you only need the protein sequence, not the structure. You will fetch the PDBs later when building datasets for classification.

* * * * *

### 3\. Run AlphaFold2 with ColabFold

In this step, you will use the protein sequence retrieved from the AlphaFold API to run a structure prediction with ColabFold:

-   Open the ColabFold notebook: https://colab.research.google.com/github/sokrypton/ColabFold/blob/main/AlphaFold2.ipynb (this is an AlphaFold implementation from https://github.com/sokrypton/ColabFold)

-   Paste your sequence and run the notebook following its instructions.

-   At the end, you will download a ZIP file containing AlphaFold outputs, including the predicted structure in PDB format.

* * * * *

### 4\. Programmatic Access with Python

Once you are comfortable with queries on the website, the next step is to access the APIs programmatically. Before you move on, start the starter notebook in your Module3 folder.

#### 4.1. Launch the Course Starter Notebook

Click the button below to open the course starter notebook in Google Colab:

[<img style="display: inline" src="https://colab.research.google.com/assets/colab-badge.svg">](https://colab.research.google.com/github/aicell-lab/ddls-course/blob/main/static/notebooks/ddls-course-starter.ipynb)

On the upper right corner, make sure the user icon is your personal Gmail account icon (instead of, e.g. SciLifeLab account if you have one).

#### 4.2. Set up VS Code Tunnel

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

Open the VS Code terminal from the menu `View -> Terminal` (upper-left corner). In the terminal, create the course folder structure by typing:

```bash
mkdir -p /content/drive/MyDrive/DDLS-Course/Module3/

```

#### 4.3. Switch to the Module3 Folder

Open a terminal in VS Code (`View -> Terminal`).
Move the working directory to the folder on Google Drive and use this folder as your workspace. This is a crucial step.

```bash
cd /content/drive/MyDrive/DDLS-Course/Module3/
code .
```

A new VS Code window or tab will open. Close the old one and continue your work in the new one. The URL should now end with `.../DDLS-Course/Module3`.


#### 4.4. Install and Start the Gemini CLI

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

#### 4.5. Access the APIs Programmatically

Next, you will write Python functions to access the UniProt and AlphaFold APIs programmatically.

Example API URL:

-   Get 5 reviewed human kinases (accession + length):

https://rest.uniprot.org/uniprotkb/search?query=reviewed:true+AND+organism_id:9606+AND+protein_name:kinase&fields=accession,length&format=tsv&size=5

👉 Task 4a: Write a small Python function that:

1.  Takes a UniProt query string.

2.  Sends it to the UniProt REST API.

3.  Returns a list of UniProt IDs (accessions).

4.  Saves them to a .txt or .csv file.

👉 Task 4b: Write a small Python function that:

1.  Takes a UniProt ID (e.g., P69905).
2.  Calls the AlphaFold API: https://www.alphafold.ebi.ac.uk/api/prediction/<UniProtID>
3.  Parses the JSON response to extract the sequence.
4.  Returns the sequence as a string.

👉 Task 4c: Explore the AlphaFold outputs

1. Upload the ZIP file you downloaded from ColabFold to your Google Drive and move it to your Module3 folder.

2.  Explore the contents of the ZIP file with AlphaFold outputs and write a short description in your notebook. Later, we will focus only on the PDB file it produces.

3.  Create a Python parser to read the PDB file.

-   Count the number of atoms.

-   Count the number of residues.

-   Extract per-residue pLDDT values (from the B-factor column).

4.  Write a script to compute basic features that will be useful later for classification, such as:

-   Protein length (# of residues)

-   Mean and variance of pLDDT

-   Radius of gyration (Rg)

-   Fraction of residues in helix/sheet/coil (via DSSP)

-   Contact density (number of Cα–Cα contacts within 8 Å)


Hints:

-   Use the requests library in Python.

-   Parse the returned TSV (tab-separated) format into a DataFrame (pandas).

-   Start small (size=5), then scale up to 50–100 proteins for your dataset.


This final step prepares you for Part II, where you will build datasets and train classifiers.

* * * * *

Part II --- Research Mini Project: Protein Classification
=======================================================

In Part I, you learned how to fetch protein sequences, run AlphaFold predictions, and extract basic structural features from the resulting PDB files. Now we move to a more research-like setting.

The goal of this part is to design a small classification project:

-   You will choose a biologically meaningful property of proteins (e.g., enzyme vs non-enzyme, membrane vs soluble, ordered vs intrinsically disordered).

-   You will search the literature to identify which structural features are useful for this classification.\
    You will then build a dataset of proteins (downloaded via UniProt + AlphaFold DB), extract features from their PDB files, and train a machine learning classifier.

This task is motivated by real research challenges in structural biology:

-   How can we use predicted structures to uncover new functional patterns?

-   Can we distinguish protein classes based on structure alone?

-   Which AlphaFold-derived features (e.g., pLDDT, contact density, secondary structure) are most informative?

👉 By completing this part, you will experience the full cycle of data-driven structural biology: hypothesis → dataset → features → model → interpretation.

* * * * *

### 1\. Choose a classification task

Select one protein property to classify, for example:

-   Enzyme vs non-enzyme

-   Membrane vs soluble

-   Ordered vs intrinsically disordered (IDP)

* * * * *

### 2\. Literature Search and Planning

Before you start coding, you need to plan your entire project. The first step is to study the literature related to your chosen classification task (e.g., enzyme vs non-enzyme, membrane vs soluble, ordered vs disordered). Use tools like ChatGPT, Gemini, or other AI agents to:

-   Identify which structural features are commonly used for this type of classification.

-   Look beyond the basic features (length, secondary structure fractions, pLDDT) and find additional, task-specific features. For example:

-   For enzymes: pocket size, catalytic site motifs, surface charge distribution.

-   For membrane proteins: number of transmembrane helices, hydrophobic exposure.

-   For IDPs: longest disordered stretch, coil fraction, contact density.

-   Critically evaluate which features are feasible to compute in this lab (you will implement them later). Avoid features that require heavy computation or specialized software that is not available here.

* * * * *

#### ✍️ Deliverable: GEMINI.md

In this step, you will write a file called GEMINI.md, which will serve as your research plan. This file must include:

1.  Goal

-   What property are you classifying (enzyme vs non-enzyme, etc.)?

-   Why is this biologically interesting?

3.  Approach

-   How you plan to build your dataset (queries to UniProt, number of proteins per class, AlphaFold DB for PDBs).

5.  Features from PDB files and Protein Sequences

-   List the basic features you will extract (eg. protein length, pLDDT, radius of gyration, secondary structure fractions, contact density).

-   List extra features from your literature search (but be realistic --- choose only what you can actually compute here).

-   Clearly separate "must have" features vs "optional if time allows" features.

7.  Evaluation

-   How you will split your dataset into training and test sets.

-   Which classifier you will use (start with Random Forest).

-   Which metrics you will report (accuracy, F1 score, confusion matrix).

* * * * *

### 3\. Build your dataset

-   Construct UniProt queries to download two sets of proteins (positives vs negatives for your task).

-   Example: enzymes ((ec:*)) vs non-enzymes (NOT (ec:*)).

-   Example: membrane (annotation:(type:transmem)) vs soluble (NOT annotation:(type:transmem)).

-   Example: disordered (keyword:"Intrinsic disorder") vs ordered (keyword:"3D-structure").

For each UniProt ID, download the AlphaFold PDB file:

https://alphafold.ebi.ac.uk/files/AF-<UniProtID>-F1-model_v4.pdb

-   Collect at least 100 proteins per class for training and evaluation.

* * * * *

### 4\. Extract Features

In Part I, you already built some basic feature extraction functions (e.g., number of residues, mean pLDDT, radius of gyration) from the PDB file and/or protein sequence. In this step, you will extend and refine those functions to build the feature set defined in your research plan (GEMINI.md).

-   Start from your existing code: reuse and expand the functions you wrote in Part I for parsing PDB files.

-   Implement the features you committed to in your plan. Make sure they are feasible to compute within the lab setting.

Typical categories of features you might include are:

-   Basic features (already implemented in Part I)

-   Number of residues (n_residues)

-   Radius of gyration (Rg)

-   Contact density

-   Secondary structure (via DSSP)

-   Fraction of helices (helix_frac)

-   Fraction of sheets (sheet_frac)

-   Fraction of coils (coil_frac)

-   Surface features

-   Total solvent accessible surface area (SASA_total)

-   Fraction of buried hydrophobic residues (hydrophobic_core_frac)

-   AlphaFold-specific confidence features

-   Mean pLDDT

-   Fraction of residues with pLDDT < 50

-   Number and length of disordered segments

-   Additional features

-   Any task-specific features you identified from the literature (e.g., pocket size for enzymes, number of transmembrane helices for membrane proteins, longest disordered stretch for IDPs).

Finally, combine all computed features into a single pandas DataFrame:

-   Rows = proteins

-   Columns = features + label (class)

👉 Remember: the features you compute here should directly reflect the decisions you made in your research plan. Do not try to compute everything --- focus on the features that are most relevant for your classification task.

* * * * *

### 5\. Train and Evaluate the Classifier

Now that you have your feature table (DataFrame with proteins × features), the next step is to train a machine learning model to classify your proteins.

1.  Split the dataset

-   Divide your dataset into training and test sets (e.g., 70/30 split).

-   Make sure each class (e.g., enzyme vs non-enzyme) is represented in both sets.

3.  Choose a classifier

-   Start with a Random Forest classifier (robust, interpretable, works well with mixed feature types).

-   You can try other classifiers later (e.g., Logistic Regression, SVM, Gradient Boosted Trees) if time allows.

5.  Train the model

-   Fit the model on the training set.

-   Predict labels on the test set.

7.  Evaluate performance

-   Report the following metrics:

-   Accuracy (overall fraction correct)

-   Precision (how many predicted positives are true positives)

-   Recall (how many true positives were found)

-   F1 score (balance between precision and recall)

-   For multi-class tasks, report metrics per class and as an average.

9.  Visualize results

-   Confusion matrix: shows where the classifier makes mistakes (which classes are confused).

-   Feature importance plot: tells you which features contributed most to the model's decisions.

11. Interpretation

-   Look at which features are most important. Do they make biological sense for your classification task?

-   Example: For IDPs, is frac_pLDDT<50 one of the top features? For membrane proteins, is helix_frac or hydrophobic_exposed_frac important?

-   Discuss limitations: small dataset size, noisy labels, or AlphaFold-specific biases.

* * * * *

### 6\. Generate a report

-   Instruct your AI agent to generate a short report in markdown format that includes:

-   Introduction (which property you studied, why it matters)

-   Methods (queries, dataset size, features)

-   Results (metrics, plots)

-   Discussion (insights, limitations, future directions).

* * * * *

✅ Deliverables
==============

Your final submission should include the following files:

1.  Notebook --- **Part I** and **Part II**

    **Part I:**

-   Demonstrates UniProt search, AlphaFold API sequence retrieval, ColabFold run, and PDB parsing.

-   Includes basic feature extraction functions you built in Part I.

    **Part II:**

-   Contains your dataset construction, PDB downloads, feature extraction, and classifier training.

-   Includes evaluation metrics (accuracy, precision, recall, F1), confusion matrix, and feature importance plots.

-   Clearly documents which features were implemented and how they relate to your research plan.

    **Part II Report**

-   A short, structured summary (1--2 pages or equivalent Markdown cell in your notebook).

-   Sections: Introduction, Methods, Results, Discussion.

-   Focus on your results, which features mattered most, and any biological insights.

2.  GEMINI.md --- Research Plan

-   Written in Markdown.

-   Describes your chosen classification task, your approach, the features you plan to extract, and how you will evaluate your model.

-   This serves as your project proposal and must be completed before starting Part II.

3.  README.md --- Submission Guide

-   Brief description of your submission package.

-   Outline of files and their purpose (e.g., "Notebook Part I → basic exploration", "Notebook Part II → dataset + classifier").

-   Any notes for the reviewers (e.g., runtime requirements, dependencies, or known limitations).

## Submission Instructions

#### 1. Save Your Gemini Chat History

In the Gemini CLI, save your conversation before exiting:

```bash
/chat save computer-lab-3
```

#### 2. Copy the Checkpoint File

In the VS Code terminal, copy the saved chat history to your project folder:

```bash
cd /content/drive/MyDrive/DDLS-Course/Module3/
cp /root/.gemini/tmp/*/checkpoint-computer-lab-3.json .
```
#### 3. Add a README.md file

Add a README file to explain the folder structure, or notes for facilitating your peers to review your work.

#### 4. Verify and Share Your Folder

Ensure your `DDLS-Course/Module3` folder in Google Drive contains all the deliverables. Then:
1.  Right-click the **Module3** folder and select **Share**.
2.  Set permissions to **"Anyone with the link can view and comment"**.
3.  Copy the sharing link.

#### 6. Submit the Form

Fill out the submission form with the link to your `Module3` folder:

{{< cta cta_text="Click Here to Upload" cta_link="https://docs.google.com/forms/d/e/1FAIpQLSfTp_r4gdHoHV5mkMDl_K4g_fv_EplUvCRhvH8qSRXuNKoV7g/viewform?usp=sharing&ouid=113850572436772761139" >}}

**Submission Deadline: 24h after ending the computer lab**

## Grading

This lab is assessed on a Pass/Fail basis. A **Pass** requires substantive engagement with both parts of the lab.

*   **Completion**: All core workflow steps are executed and all deliverables are submitted.
*   **Engagement**: The notebook is fully executed, and the web app is functional. There is evidence of you actively participating in the process, including peer review.
*   **Clarity**: Your `Module3` folder is well-organized, and the `README.md` clearly explains your work.
*   **Peer Review Commitment**: You must provide constructive feedback on two assigned peer submissions after the deadline.

Good luck, and have fun building!
