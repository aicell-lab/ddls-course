---
title: "Computer Lab 1"
linkTitle: "Lab 1"
weight: 10
type: book
---
This week's lab is meant to catch you up with concepts and coding skills that you will need for the rest of the class.

With [this interactive online book](https://dmol.pub/ml/introduction.html) you read in the [assignment 1](./assignment-1), you should have a good idea of what machine learning is and how it works. In this lab, we will go through the code in the book (chapter 2-6) together to make sure that you understand the concepts and the code.

This online book introduces almost all the necessary concepts in machine learning and data analysis, and our aim is to cover the code in chapter 2-6 this week. The corresponding code can be run in Google Colab in your web browser (see the instructions below).

This lab will be graded based on your assignment 1 submission.
### Preparation

For the computer labs, you will only need to look through the rudimentary instructions (section 1) on how to start a Colab session. For the later labs, we will need to know about how the file system works, so looking through section 2 is good to do until then (at least module 5-6).

#### Starting a google Colab session

In later computer labs, a Google Colab document will be provided for you. To access the linked colab document in the book, simply click the rocket icon in the top right as in the figure below which will take you to the colab document.

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



### Run the code
Now, go to [this interactive online book](https://dmol.pub/ml/introduction.html) and run the code in the chapters 2-6.

Make sure to use your access to teaching assistants to get this material under control. The machine learning topics covered this week are probably going to be important for your projects (see [Project Plan](../project)) too, i.e. finding ways to expand on published research using a different type of analysis, or model validation, etc.

By the end of the week, you are assigned to pass a quiz to check your familiarity with this week's the material.

In addition, here are other resources that could be useful to clarify useful concepts in data analysis, machine learning and deep learning:
- [Neural Networks](https://www.3blue1brown.com/topics/neural-networks)
- [Deep learning](https://www.nature.com/articles/nature14539)
- [Bias–variance tradeoff](https://en.wikipedia.org/wiki/Bias%E2%80%93variance_tradeoff)
