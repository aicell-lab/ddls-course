---
title: "Colab Introduction"
linkTitle: Colab Introduction
weight: 1000
type: book
---

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

