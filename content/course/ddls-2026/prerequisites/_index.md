---
title: Prerequisites
linkTitle: Prerequisites
date: "2026-01-01"
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
## What this course expects

This course trains a single skill: taking **someone else's** biological problem, interviewing them until the question is precise, then **directing and verifying an AI agent** that does the analysis for you. The scarce ability is **specification, direction, and verification** — not writing code by hand. So the prerequisites are not a programming test. What we ask you to bring:

- **Direct and check an AI agent.** Be ready to give an AI assistant a clear, specific instruction, read what it produces, and judge whether the result is sensible. No prior experience with AI coding agents is required — Module 1 gets everyone started.
- **Read and interpret code and results at a basic level.** You will rarely write code from scratch, but you must be able to *read* it and sanity-check what an agent gives you: follow the logic of a short script, spot an obvious mistake, and distrust a number that looks too clean. You do not need to produce Python fluently — you do need to be able to follow it.
- **Scientific and biological curiosity.** Enough interest in the biology to want the answer to be right, and enough scepticism to check it rather than trust it.
- **Willingness to work on someone else's problem.** A hard rule of the course: **you may not use your own data or research problem.** Every lab and the final project use a problem that belongs to someone else, which you reach by interviewing them. Come prepared to interview a real data owner and to state a context that is not already in your own head.

> **On programming:** Python is **not** a hard entry requirement this year. The examined skill is directing an agent, not coding by hand. Even so, comfort *reading* code and outputs makes the labs far easier — if you have never seen Python, the optional refresher below gets you to the "I can read and check this" level, which is all you need.

## Be prepared

We recommend becoming familiar with the following before the course starts:

- Browse the [SciLifeLab Data-Driven Life Science](https://www.scilifelab.se/data-driven) (DDLS) initiative to understand national priorities and the concept of the [data life cycle](https://data-guidelines.scilifelab.se/data-life-cycle/), which is central in this course.
- Get an AI coding agent running on your own machine (e.g. [Claude Code](https://www.anthropic.com/claude-code), OpenAI Codex, Gemini CLI, or Cursor) and make it do one small real task. Installing it and trying it once is the single best preparation for the labs.
- (Optional) Refresh your ability to *read* Python — variables, control flow, functions, and how a short data-analysis script is put together — so you can follow and check what an agent writes. See the resources below.

Technical setup for labs (all online):
- A computer **you are allowed to install software on** (you will run an AI coding agent locally)
- Reliable internet access and a modern browser (e.g. [Chrome](https://www.google.com/chrome/))
- A Google account (for [Google Colab](https://colab.research.google.com/) and Drive storage)
- An account with at least one AI assistant / coding agent (e.g. [ChatGPT](https://chat.openai.com/), Claude, or Gemini); free tiers are enough to start
- A [GitHub account](https://github.com/) for versioning and sharing notebooks/code

## Optional: getting comfortable reading Python

You will not be asked to write much code, but being able to **read** it — and notice when something is off — makes every lab easier. If Python is new or rusty, use any of the options below to reach that level. There is no submission requirement; this is for your own preparation.

### Option A: Guided practice with AI
Use curated prompts to accelerate review: [Learn Python with ChatGPT](https://ddls.aicell.io/post/learn-python-with-chatgpt/). Treat AI output critically—run code, fix errors, and keep notes of what you clarified. This is itself good practice for the course: you are directing and checking an AI rather than memorising syntax.

A comfortable-to-read checklist — you should be able to *follow* code that uses these, not necessarily write it from memory:
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
