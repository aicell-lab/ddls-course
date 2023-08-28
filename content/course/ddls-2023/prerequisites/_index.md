---
title: Prerequisites
date: '2022-08-29'
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
   - Register a [ChatGPT account](https://chat.openai.com/) and [Claude account](https://claude.ai/) (Note: No need to subscribe to the paid version of ChatGPT and Claude, using the free version is sufficient for this course)
   - Register a [Github account](https://github.com/) for versioning of the code

## Build a foundation in Python

As a warn up, please make sure you are comfortable with coding in Python. If not, this section will show you the basics of Python.
### Learn

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
