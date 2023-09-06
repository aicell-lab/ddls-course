---
title: "Computer Lab 2"
linkTitle: "Lab 2"
weight: 10
type: book
---

For the computer lab, you will be given a Jupyter notebook with basic intro to generative AI models along with some exercises on how to use diffusion models to design a protein.

The code repository we will work on is [RFdiffusion](https://github.com/RosettaCommons/RFdiffusion), a notebook will be made available on the day of the lab.

Here are the references:
 - [De novo design of protein structure and function with RFdiffusion](https://www.nature.com/articles/s41586-023-06415-8)
 - [Robust deep learning–based protein sequence design using ProteinMPNN](https://www.science.org/doi/10.1126/science.add2187)

### Preparation

Before we start the computer lab, please use Google Search or consult ChatGPT to find answers to the following questions:

1. What is a protein's primary, secondary, and tertiary structure?
2. Explain the term 'monomer design' in the context of protein structures.
3. What is conditional and unconditional design of a protein?
4. What is a `contig` in the context of protein design?
5. What is `contigmap.contigs`, and how does it specify the protein being built?
6. What is `scaffold motifs` in protein design?
7. Optionally, do a recap on what is a diffusion model and skimming through this paper [here](https://www.science.org/doi/10.1126/science.abj8754) to get an idea on what is the RoseTTAFold structure prediction network.

## Running the Colab Notebook

Please use this notebook to run the code: [<img style="display: inline" src="https://colab.research.google.com/assets/colab-badge.svg">](https://colab.research.google.com/github/aicell-lab/ddls-course/blob/main/static/uploads/ddls_2023_RFdiffusion.ipynb)

## Tips for using the Colab Notebook

  - you can use the "!" to run shell commands in the notebook, e.g. `!git clone ...` or `!pip install ...`
  - you can use the "%%bash" to run a block of shell commands in the notebook, e.g.:
    ```
    %%bash
    ./scripts/run_inference.py 'contigmap.contigs=[150-150]' inference.output_prefix=test_outputs/test inference.num_designs=10
    ```
  - you can use the "%%writefile" to write a block of text to a file, e.g.:
    ```
    %%writefile test_inputs/test.fasta
    >test
    MAAVG
    ```

