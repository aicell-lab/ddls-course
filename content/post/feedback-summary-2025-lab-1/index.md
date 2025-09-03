---
title: "DDLS Course 2025: Computer Lab 1 Feedback Summary"
date: 2025-08-29
---

*Thanks to everyone for the detailed feedback and peer reviews. Below is a summary of what worked well, where students struggled, and a consolidated FAQ with answers.*

---

## What Worked Well

* **Clarity & structure.** Many students found the manual easy to follow, with clear step-by-step instructions.
* **Hands-on usefulness.** Exposure to AI tutors, CLI agents, and workflows felt immediately relevant to research.
* **Organization discipline.** Submissions with clear headers, comments, and well-structured files were praised.
* **Engagement.** Several students explored beyond the tutorial—trying new optimizers, testing clustering methods, or building bonus CNNs.

> “Everything is amazingly well described… I feel like my basic understanding is very rigid now.”
> “The computer lab was great; I’ll keep exploring at home.”
> “AI tutor is a fun concept—and useful.”

---

## Where Students Struggled

* **Access & stability issues.** Gemini CLI login, Colab disconnects, slow VS Code↔Colab connections, and model switches caused frustration.
* **Deliverables.** Some submissions were missing chat logs, executed notebooks, or exported figures. Multiple chat logs also caused confusion.
* **Process.** A few students felt the tutorial was too long or answered its own questions, leading to more copy-pasting than reflection.
* **Expectations.** Beginners worried about fairness in grading compared to experienced coders.
* **Orientation.** Requests for a short VS Code/CLI primer and clearer instructions on pre-lab preparation.

---

## Our Approach to Questions

Many of the most frequent questions are **technical setup issues**. These are important learning opportunities:

* You should **first try to solve them yourself**—ask your AI tutor, search online, or make a reasonable assumption.
* Use the **computer lab time** to get help if you remain stuck.
* Remember: **our goal is not to babysit every detail**, but to train your **problem-solving skills**.

For **course requirement–related questions** (grading, deliverables, expectations), we are happy to provide assistance and clarifications.

---

## Student FAQ (with Answers)

### Setup & Access

1. **Gemini CLI login problems / switching accounts?**
   Save your files in Google Drive and download/re-upload them if you switch account.
2. **Prevent Colab disconnects / losing chat history?**
   Save snapshots frequently.
3. **VS Code ↔ Colab too slow?**
   Try starting a [local runtime](https://research.google.com/colaboratory/local-runtimes.html).
4. **Run the lab locally in VS Code?**
   Yes, check the same [local runtime guide](https://research.google.com/colaboratory/local-runtimes.html).

### AI Tutor & Workflow

5. **AI tutor outputs too much or switches model?**
   Tell it to shorten responses, and add this preference in your `GEMINI.md` file.
6. **Tutorial answers its own questions?**
   Add an instruction in the `GEMINI.md` file asking it not to.
7. **Too much copy-pasting—can we do “fill-in-the-gaps”?**
   Ask the tutor to design tasks that way and note it in your `GEMINI.md`.

### Deliverables & Organization

8. **What are the required deliverables?**
   Notebook, chat log, README, outputs. Baseline is to describe the folder structure in the README.
9. **Missing a file—what’s the minimal checklist?**
   You should submit **all the files mentioned** in the computer lab instructions.
10. **Multiple chat logs—how to pick final?**
    Indicate in the README, or remove extras.
11. **README vs. in-notebook markdown?**
    README = describe the folder + notes for reviewers. Notebook markdown = explain code and results.
12. **How much commentary in the notebook?**
    Enough to explain what you’re doing, no need to over-explain.
13. **Exporting plots/data to outputs?**
    Ask your AI assistant to generate the save code (e.g., `plt.savefig()` or `np.savetxt()`).

### Learning & Grading

14. **How to use AI efficiently?**
    Watch the video on context engineering, and start with a good `GEMINI.md`.
15. **I’m new to Python—will grading be fair?**
    Yes. Labs are **pass/fail**, and grading focuses on what you learn, not your starting level.
16. **Pre-lab video wasn’t clear—what to watch before?**
    We sent an email: video 1 is pre-lab, video 2 can be followed during the lab.
17. **VS Code/CLI primer to reduce setup confusion?**
    Covered in the video recording—please watch it.
18. **Not comfortable sharing chat history?**
    Sharing helps peers give feedback on prompt skills. But from Lab 2, you can opt out of peer review if you don’t want to share.

### Course Context

19. **Couldn’t open notebook/figures in Colab?**
    This can happen—try restarting runtime or saving figures manually.
20. **How do outputs connect to real-world applications?**
    We’ll discuss this in later modules (bioinformatics, drug discovery, etc.).

---

👉 Remember: The **main goal of the computer lab** is **not just to follow instructions** but to **practice problem-solving**. Many details are intentionally left open so you can build confidence in exploring, debugging, and asking the right questions.

## Note
---
We used ChatGPT to summarize and draft the above content based on the feedback form we collected.
---