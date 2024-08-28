---
title: "Computer Lab 1: Introduction to Machine Learning"
linkTitle: "Lab 1"
weight: 10
type: book
---

This week's lab is meant to catch you up with concepts and coding skills that you will need for the rest of the class.

You don't need any preparation for this lab, a chatgpt prompt will be distributed during the computer lab and you will be able to follow along.

After completing the lab, please submit your work using the Google Form linked below. You will need to create a shareable link for your ChatGPT chat history and export your Jupyter Notebook as a `.ipynb` file. Upload them using the provided link:

{{< cta cta_text="Click Here to Upload" cta_link="https://docs.google.com/forms/d/e/1FAIpQLSfLh0-XiyKhAxCSUBgtdXI_hVFkg5FhbXYgmHc3oYC8ndu_oA/viewform?usp=sf_link" >}}

### Tutorial

For this computer labs, you will only need to look through the rudimentary instructions on how to start a Colab session for machine learning. We use the following Google Colab notebook on machine learning as an example: [Click this link](https://dmol.pub/ml/introduction.html)

#### Starting a google Colab session

In this Google Colab document provided. To access the linked colab document in the book, simply click the rocket icon in the top right as in the figure below which will take you to the colab document.

![Run this notebook](../run-this-notebook.png)

The document contains text blocks in the markdown format, and code blocks in python,
where you can freely add or subtract lines as you wish. To run the code, you can simply
hover over and press the empty brackets in which a “run” symbol will appear. While running,
you can hover over the empty brackets again to view the progress of the execution. A green
tick will follow in the code block to show which line of code is currently being executed.
![Load Data](../load-data.png)
When running foreign applications, the system may give a warning about the document not
being an authorized google document, but if you trust the source (and us :-) ) you can run it.
If you want to change the document and save the changes, you need to download it to your
Drive like any other google document.

#### Colab cloud and GPU utilization
So where does this code actually run? You don’t need to save it to your Drive to run it, so
probably not on your computer. Instead, it runs on a google cloud, which is like a connected
web of servers (or computers without screens!). Google provides several different computer
architectures, most importantly CPU or GPU nodes. This system setup is very similar to
what you would find at a scientific or industrial supercomputer cluster, with one common
framework to access many different nodes. Because you are using shared resources,
adding and installing new packages temporarily is no problem, and linux system commands
can be accessed by entering `!` in front of the command, e.g. `!pip install package`.

If this information was not enough or not practical enough, please have a look at:
https://colab.research.google.com/?utm_source=scs-index
will be updated with new information for the coming labs soon.

### Download your work:

If you don't know how to export your Jupyter Notebook as a `.ipynb` file, follow the guide below.

Using Google Colab as an example: click 'File' > 'Download' > 'Download .ipynb'. You can then upload the downloaded file to the Google Form.

![save ipynb file](../save-ipynb-file.png)

### Going further (optional)
If you want to go further, you can also try the following notebooks and video:
 - [Basic machine learning using sklearn and pandas](https://colab.research.google.com/drive/1ySRFbWp70zKibCauvBV9hbbgMGhBbCLx?usp=sharing)
 - Deep Learning Basics: Introduction and Overview by Lex Fridman: [lecture](https://www.youtube.com/watch?v=O5xeyoRL95U) and [notebook](https://colab.research.google.com/github/lexfridman/mit-deep-learning/blob/master/tutorial_deep_learning_basics/deep_learning_basics.ipynb)

In addition, here are other resources that could be useful to clarify useful concepts in data analysis, machine learning and deep learning:
- [Neural Networks](https://www.3blue1brown.com/topics/neural-networks)
- [Deep learning](https://www.nature.com/articles/nature14539)
- [Bias–variance tradeoff](https://en.wikipedia.org/wiki/Bias%E2%80%93variance_tradeoff)