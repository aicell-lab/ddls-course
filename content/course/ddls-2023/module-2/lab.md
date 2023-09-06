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

## Colab Notebook Exercises

Please follow the instructions and finish the exercises in this notebook: [<img style="display: inline" src="https://colab.research.google.com/assets/colab-badge.svg">](https://colab.research.google.com/github/aicell-lab/ddls-course/blob/main/static/uploads/ddls_2023_RFdiffusion.ipynb)

After you have completed the exercises in the notebook: 
 - During the lab session, tell the lab teacher so he/she can go through what you have done together and maybe ask you a few questions. 
 - Submit the notebook to the [submission form](https://forms.gle/gK3b1z2Sca2VYmcW7).

**Submission Deadline: Before Friday at 12:00 (noon) CET**

**NOTE: If you cannot join the lab session, please submit the notebook before the deadline, and find the lab teacher in a next lab session to go through what you have done together.**

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

