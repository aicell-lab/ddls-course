---
title: Prerequisites
date: "2022-08-29"
type: book
weight: 10
imjoy:
    show_jupyter_notebook: |
        async function(notebookName, notebookUrl){
            document.getElementById('jupyter-container').style = "height: 450px;";
            const jupyter = await api.createWindow({src: "https://jupyter.imjoy.io/lab/index.html", window_id: "jupyter-container", config: {"left_collapsed": true}})
            const content = await (await fetch(notebookUrl)).text()
            if(await jupyter.fileExists(notebookName)){
                await jupyter.removeFile(notebookName)
            }
            const filePath = await jupyter.loadFile(notebookName, content, 'application/json')
            await jupyter.openFile(filePath)
            document.getElementById('jupyter-fullscreen').style = "display: block;";
        }
    make_full_screen: |
        function (divId) {
            const divElement = document.getElementById(divId);
            if (divElement) {
                if (divElement.requestFullscreen) {
                divElement.requestFullscreen();
                } else if (divElement.mozRequestFullScreen) { /* Firefox */
                divElement.mozRequestFullScreen();
                } else if (divElement.webkitRequestFullscreen) { /* Chrome, Safari and Opera */
                divElement.webkitRequestFullscreen();
                } else if (divElement.msRequestFullscreen) { /* IE/Edge */
                divElement.msRequestFullscreen();
                }
            } else {
                console.error(`Div with id ${divId} not found.`);
            }
        }
---
## Be prepared

As prerequisites for the course, we recommend that you have a look at the following resources:

 - Please have a look at the [SciLifeLab Data-Driven Life Science](https://www.scilifelab.se/data-driven) (DDLS) initiative website to understand what data-driven life sciences are, and how Sweden is investing in this area. Focus in particular on the concept of the [data life cycle](https://data-guidelines.scilifelab.se/data-life-cycle/), which is central in this class.
 - We will use Python as the main programming language in the computer lab, so please make sure you know the basics of Python. See the Python introduction material below for more information.

For the computer lab, you will need a computer with internet access, and make sure you have the following set up:
   - Install the latest browser, e.g. [Chrome](https://www.google.com/chrome/)
   - Register a Google account for the [Google Colab](https://colab.google/) access and use the Google Drive
   - Register a [ChatGPT account](https://chat.openai.com/) (Note: No need to subscribe to the paid version of ChatGPT, using the free version is sufficient for this course)
   - Register a [Github account](https://github.com/) for versioning of the code

## Build a foundation in Python

As a warn up, please make sure you are comfortable with coding in Python. If not, this section will show you the basics of Python.

To help you get a head start, we've prepared a set of useful ChatGPT prompts designed to assist you in learning basic Python operations. Mastering these operations will be crucial throughout the course.

### What You Need to Do

1\. **Review the ChatGPT Prompts**: Access the prompts and see how they can be used to learn Python basics by visiting [Learn Python with ChatGPT](https://ddls.aicell.io/post/learn-python-with-chatgpt/).

2\. **Complete the Practice**: Use the prompts to complete the practice exercises. This will help you become familiar with essential Python operations.

3\. **Upload Your Chat History**: Once you have completed the practice, save your chat history.

4\. **Submit Your Work**: Upload the saved chat history using this [Google Form](https://forms.gle/Zgo5b5TkhMEJKchS8).

### Submission Requirements

- **What to Submit**: Your completed ChatGPT chat history file.

- **Deadline**: The deadline for submission is August 27th, as students need to upload the form before the first computer lab on August 28th.

- **Mandatory Participation**: This assignment is required for all students.

### Additional Information

- **Alternative for Advanced Students**: If you already have expertise in Python, you may opt to take a proficiency test instead of completing the tutorial. But you still need to upload your chat history.

By following these steps, you'll ensure you're well-prepared for the course. If you have any questions or need further assistance, feel free to reach out.



### If you prefer to learn Python in a more traditional way

Here you can find the basics of Python: [<img style="display: inline" src="https://colab.research.google.com/assets/colab-badge.svg">](https://colab.research.google.com/github/cs231n/cs231n.github.io/blob/master/python-colab.ipynb)

You can also run the notebook in Jupyter Lite: <button id="jupyter-fullscreen" style="display: none;" onclick="imjoy.make_full_screen('jupyter-container')"> + Show Notebook in Fullscreen Mode</button>

<div id="jupyter-container"><button onclick='imjoy.show_jupyter_notebook("python-colab.ipynb", "/notebooks/python-colab.ipynb")'>Click to Load the Notebook</button></div>

<br>



If you are new to programming, we recommend that you complete the following course video:
{{< youtube rfscVS0vtbw >}}

### Quiz

{{< spoiler text="What is the difference between lists and tuples?" >}}
Lists

- Lists are mutable - they can be changed
- Slower than tuples
- Syntax: `a_list = [1, 2.0, 'Hello world']`

Tuples

- Tuples are immutable - they can't be changed
- Tuples are faster than lists
- Syntax: `a_tuple = (1, 2.0, 'Hello world')`
  {{< /spoiler >}}

{{< spoiler text="Is Python case-sensitive?" >}}
Yes
{{< /spoiler >}}
