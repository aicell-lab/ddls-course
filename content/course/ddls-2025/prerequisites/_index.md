---
title: Prerequisites
linkTitle: Prerequisites
date: "2025-06-29"
type: book
course_module: "true"
weight: 5
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

As prerequisites for the course, we recommend becoming familiar with the following:

- Browse the [SciLifeLab Data-Driven Life Science](https://www.scilifelab.se/data-driven) (DDLS) initiative to understand national priorities and the concept of the [data life cycle](https://data-guidelines.scilifelab.se/data-life-cycle/), which is central in this course.
- Refresh core Python basics (variables, data types, control flow, functions, modules, simple plotting, reading/writing files). See the resources below.

Technical setup for labs (all online):
- A computer with reliable internet access
- A modern browser (e.g. [Chrome](https://www.google.com/chrome/))
- A Google account (for [Google Colab](https://colab.research.google.com/) and Drive storage)
- (Optional but encouraged) Accounts for AI coding/assistant tools (e.g. [ChatGPT](https://chat.openai.com/)); free tiers are sufficient
- A [GitHub account](https://github.com/) for versioning and sharing notebooks/code

## Build a foundation in Python

As a warm‑up, ensure you are comfortable coding in Python. If you are new or rusty, use any of the options below. There is no submission requirement—this is for your own preparation.

### Option A: Guided practice with AI
Use curated prompts to accelerate review: [Learn Python with ChatGPT](https://ddls.aicell.io/post/learn-python-with-chatgpt/). Treat AI output critically—run code, fix errors, and keep notes of what you clarified.

Recommended minimal competency checklist:
- Running cells in Colab / Jupyter
- Using `print`, f-strings, and basic input/output
- Lists, tuples, dictionaries, sets (creation, indexing, iteration)
- Control flow (`if`, `for`, `while`, list comprehensions)
- Defining functions; understanding scope and return values
- Importing standard libraries (`math`, `random`, `json`, `pathlib`)
- Basic plotting with `matplotlib` or `seaborn`
- Reading CSV/TSV data with `pandas`
- Simple error handling (`try/except`)

### Option B: Traditional refresher
Use the interactive notebook below or other beginner tutorials (e.g. Python docs, Software Carpentry). Progress until the checklist above feels easy.

### Interactive Notebook

Quick Python basics: [<img style="display: inline" src="https://colab.research.google.com/assets/colab-badge.svg">](https://colab.research.google.com/github/cs231n/cs231n.github.io/blob/master/python-colab.ipynb)

Or load locally in Jupyter Lite: <button id="jupyter-fullscreen" style="display: none;" onclick="imjoy.make_full_screen('jupyter-container')"> + Show Notebook in Fullscreen Mode</button>

<div id="jupyter-container"><button onclick='imjoy.show_jupyter_notebook("python-colab.ipynb", "/notebooks/python-colab.ipynb")'>Click to Load the Notebook</button></div>

<br>

If you are new to programming, you may also watch this introductory video:
{{< youtube rfscVS0vtbw >}}

### Quick Quiz (self-check)

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

{{< spoiler text="How do you execute a single cell in Colab/Jupyter and restart the kernel?" >}}
Run the cell with Shift+Enter (or the play icon). Restart the kernel via the Runtime / Restart runtime (Colab) or Kernel / Restart Kernel (Jupyter) menu.
{{< /spoiler >}}

{{< spoiler text="Give an f-string that prints variable x=5 as 'Value: 5'" >}}
```python
x = 5
print(f"Value: {x}")
```
{{< /spoiler >}}

{{< spoiler text="Show one operation that differs between a list and a tuple" >}}
Lists are mutable: `a = [1,2]; a.append(3)` works. Tuples are immutable: `t = (1,2); t.append(3)` raises AttributeError.
{{< /spoiler >}}

{{< spoiler text="List comprehension: create a list of squares for numbers 0-4" >}}
```python
squares = [i*i for i in range(5)]  # [0,1,4,9,16]
```
{{< /spoiler >}}

{{< spoiler text="Write a function 'mean_or_none(values)' returning the mean or None if empty" >}}
```python
def mean_or_none(values):
    if not values:
        return None
    return sum(values)/len(values)
```
{{< /spoiler >}}

{{< spoiler text="What does 'from pathlib import Path' enable?" >}}
It imports the Path class for object-oriented filesystem paths (joining, reading, iterating) in a cross‑platform way.
{{< /spoiler >}}

{{< spoiler text="Minimal matplotlib example plotting y = x^2 for x=0..4" >}}
```python
import matplotlib.pyplot as plt
x = list(range(5))
y = [i**2 for i in x]
plt.plot(x, y)
plt.xlabel('x')
plt.ylabel('x^2')
plt.show()
```
{{< /spoiler >}}

{{< spoiler text="Read a CSV 'data.csv' into a pandas DataFrame and show first 3 rows" >}}
```python
import pandas as pd
df = pd.read_csv('data.csv')
print(df.head(3))
```
{{< /spoiler >}}

{{< spoiler text="Wrap code to catch a ValueError when converting input to int" >}}
```python
try:
    n = int(user_input)
except ValueError:
    n = None
```
{{< /spoiler >}}

{{< spoiler text="Explain scope: why does this fail? 'def f(): x+=1' before x=0" >}}
Inside the function, `x += 1` tries to assign to local x before it exists; Python treats x as local due to assignment. Use `global x` or pass/return a value instead.
{{< /spoiler >}}
