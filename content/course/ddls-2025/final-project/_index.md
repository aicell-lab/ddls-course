---
title: "Final Project — Exploring and Modeling Life Science Data with AI Agents"
summary: ""
linkTitle: Final Project
date: 2025-01-01
type: book
weight: 90
course_module: "true"
---

⚠️ **Note:** This is a draft project plan. Details (including deadlines, deliverables, and evaluation criteria) may change. Updates will be announced on the course website and in class.

---

Welcome to the final project of **DDLS 2025**.  
This is your opportunity to demonstrate what you have learned throughout the course:
- Working with real biological datasets.
- Using **AI agents** (e.g., Gemini-CLI, ChatGPT, Perplexity) to assist in exploration, coding, and analysis.
- Designing and evaluating models for meaningful scientific tasks.
- Making your work more **accessible and reusable** by wrapping it as a **web application** or **MCP tool**.
- Critically reflecting on AI’s role in scientific discovery.
- Practicing FAIR and open science principles in your work.


### Working Arrangements

**Individual vs. Pair Work:**
- You may choose to work **individually** or in **pairs** (teams of 2 students).
- **If working in pairs:** Projects can complement each other and students can collaborate on data exploration, model development, and technical implementation.
- **Individual accountability:** Each student must complete **all three phases** of the project (exploration, modeling, and accessibility wrapping) and demonstrate individual mastery of the learning objectives.
- **Individual submissions:** Each student must submit their **own project report** that clearly highlights their specific contributions, analysis, and reflections.
- **Pair coordination:** If working in pairs, coordinate your project plans during Step 1 to ensure complementary approaches (e.g., different models, evaluation metrics, or accessibility implementations on related datasets or scientific questions).

The project is divided into two steps:

---

## Step 1 — Project Plan & Validation (Due: Oct 6, 2025)

Before you begin, you must submit a **project plan** for validation.  
This ensures that your project is relevant, novel, feasible, and not too close to what has already been done in the computer labs.

### Project Choice Criteria
Your project plan will be approved only if it is:
- **Not too easy** (must go beyond trivial workflows or toy problems).  
- **Not too close** to computer lab exercises.  
- **Not too hard / compute-heavy** (should run on reasonable hardware, e.g., Google Colab).  
- **Technically sound** (analysis steps and methods make sense).  
- **Feasible** (can be completed in ~2–3 weeks).  
- **Relevant** to a real scientific problem.  
- **Shows novelty** (not just reproducing a tutorial, but bringing something creative and realistic).  

---

### What to Submit (max 3 pages + appendix)

1. **Scientific Question & Dataset (combined)**  
   - Start with a **rough idea or problem** you are interested in.  
   - Use a **GenAI tool** (Gemini, Perplexity, ChatGPT, etc.) to brainstorm possible scientific questions and relevant datasets, use “deep research” features to do broad investigation to understand the landscape.  
   - Arrive at a **refined dataset + scientific question** to work on.  
   - You will need to also investigate:
     - What datasets are available and accessible?  
     - What is their license/ethics status?  
     - Why is the problem scientifically relevant?  
     - What kind of task (classification, clustering, regression, etc.) is appropriate?  
   - Clearly document the dataset name, source (URL/reference), size, and chosen subset (if needed).  
   - **Appendix requirement:** attach the **AI “deep research” transcript/report** showing your brainstorming process, with both your inputs and the agent’s outputs.

2. **Exploration Goals**  
   - At least **3 dataset exploration questions** that are important to understand before working on the model training.
   - Examples: data size, types, value range, missing values, distributions, class balance, correlations.

3. **Proposed Model & Evaluation**
   - Planned baseline model, and a few potential improvements.
   - Planned evaluation metric(s).  
   - What “good performance” would mean for your task.

4. **Accessibility Plan**  
   - How will you make your final workflow accessible to others?  
     You can choose between:  
     - **Option A:** Wrapping your pipeline as a **web application** to allow user load data, run inference, display inference and evaluation results.  
     - **Option B:** Wrapping the final workflow into a **MCP toolset** with tools such as:
       - Load data  
       - Run model inference  
       - Show results  
       - Evaluate model  
   - **Important:** Your web app or MCP tools, as well as your GitHub repository, **must be made public**.  
   - These outcomes will be **showcased on the course website** and used as **demonstrations for SciLifeLab researchers and beyond**.  

5. **Feasibility Check**  
   - Justify that the project is doable in the timeframe.  
   - State expected runtime.  
   - Mention potential risks (large dataset, convergence issues).

6. **Submit the plan before Oct 6, 2025 to get feedback from the teachers**

### Submit Your Document

{{< cta cta_text="Click Here to Upload" cta_link="https://forms.gle/FfDC7hRf1asePvSA9" >}}

---

### Step 1 Evaluation
- **Pass** → You may proceed to Step 2.  
- **Revise** → You must update your plan before starting.  
Plans may be rejected if the dataset/task is too trivial, too close to a lab, overly ambitious, license-restricted, or missing the **AI deep research appendix**.

---

## Step 2 — Final Project (Oct 6–29, 2025)

Once your plan is approved, you will complete the project in three phases:

### Phase I — Dataset Exploration
- Use Python (optionally with AI agent support) to explore the dataset.  
- Summarize distributions, imbalances, and other key features.  
- Split the dataset into `train`, `validation`, and `test` sets.  
- Deliverable: Data exploration visualizations, showing distribution for each dataset split.

### Phase II — Model Training, Evaluation & Improvement
- Train a baseline model (with or without AI agent help).  
- Evaluate on validation/test data.  
- Attempt at least one **improvement step** (better preprocessing, tuning, or different model).  
- Deliverable: A working model with measurable performance and evidence of improvement attempts.  

### Phase III — Accessibility Wrapping
- After you have a working pipeline, make it **accessible to others** by choosing one of two options:
  - **Option A:** Build a **simple web application** wrapping your workflow (similar to computer lab 2).  
  - **Option B:** Create a **minimal MCP toolset** (load data, run inference, show results, evaluate model, similar to computer lab 4, 5, 6).  
- Deliverable: A working wrapper (web app or MCP) with basic documentation.  
- **Outcome:** Your wrapper and GitHub repository will be **publicly available** and showcased on the **course website** as demonstrations to **SciLifeLab researchers and external audiences**.  

---

## FAIR Data and Open Science Recommendations
To promote the **FAIR principles (Findable, Accessible, Interoperable, Reusable)** and support open science:

- Prefer **public datasets**. If using a private dataset, explain how it could be made available in the future.  
- You must create a **public GitHub repository** for your project.  
  - Add the topic `ddls-course-2025` to make your project findable ([GitHub Topics Guide](https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/customizing-your-repository/classifying-your-repository-with-topics)).  
  - Include a **README file** with an overview and usage instructions.  
  - Document your code properly.  
  - Add a permissive license (e.g., MIT license) to allow reuse.  
  - If a public dataset was used, provide a script or instructions to download it.  
  - Make your project reproducible; upload trained model weights to GitHub Releases or [Zenodo](https://zenodo.org/) if possible.  
  - Consider publishing your report (e.g., on Zenodo). 
- At the end of the project, we will try to deploy your web app and mcp tools to make it more accessible, e.g via the course website.

---

## Final Deliverables
You will submit:
1. **Final Project Report (max 5 pages main text, unlimited appendices)**  
   The report should include:
   - **Abstract (≤100 words)**: problem, method, results.  
   - **Background and Motivation**: why you chose this dataset/task.  
   - **Dataset Summary**: data source, preprocessing, splits, distributions.  
   - **Method Description**: workflow, models, evaluation metrics.  
   - **Results**: figures, tables, performance metrics vs. baseline.  
   - **Conclusion & Discussion**: findings, limitations, future directions.  
   - **Data and Code Availability**: links to dataset and repo (per FAIR guidelines).  
   - **Acknowledgments**: contributions, support, and note on GenAI tools used.  
   - **References**: relevant literature.  
   - **Appendices**: AI deep research log (mandatory), prompts, agent transcripts, extra figures.  

2. **Agent Demo**  
   - 3–5 min screen recording (or asciinema) showing Gemini-CLI (or another AI agent) being used for dataset exploration and/or evaluation.  

3. **Accessibility Wrapper & Repository**  
   - Either a simple **web app** or a **minimal MCP toolset** wrapping your final workflow.  
   - A **public GitHub repository** containing your code, documentation, and reproducibility instructions.  
   - **Published outcome:** These deliverables will be linked on the course website and demonstrated to **SciLifeLab researchers and beyond**.

### Submit Your Final Project

{{< cta cta_text="Click Here to Upload" cta_link="https://forms.gle/uEgXCkPYKHZGYq916" >}}  

---

## Pass Criteria
✅ Project plan includes scientific question + dataset refined through AI deep research.  
✅ Data exploration performed and documented.  
✅ A baseline model is trained and evaluated.  
✅ At least one attempt to improve performance is demonstrated.  
✅ A working wrapper (web app or minimal MCP tool) is provided **and made public**.  
✅ A public GitHub repository with README, license, and reproducibility instructions.  
✅ Student-authored prompts for agent interactions are included.  
✅ Report includes dataset analysis, model justification, evaluation, and accessibility plan.  

---

## Stretch Goals (for high grades)
⭐ Compare multiple model types.  
⭐ Provide advanced evaluation (ROC curves, feature importance, error analysis).  
⭐ Strong critical reflection on AI use and limitations.  
⭐ Clear reproducibility (clean Colab, stable results).  
⭐ Public release of dataset/code/report (GitHub/Zenodo).  

---

## Timeline
- **Oct 6, 2025** — Project plan + AI deep research log due.  
- **Oct 8, 2025 (13:00–14:00)** — Consultation session 1.  
- **Oct 20, 2025 (13:00–14:00)** — Consultation session 2.  
- **Oct 29, 2025 (23:59)** — Final project submission (report, demo, wrapper, repo).  
- **Oct 31, 2025 (9:00-12:00)** — Oral presentations (Master’s students only).  

---

## Note on GenAI Tools
You are encouraged to use ChatGPT, Gemini, Perplexity, or similar for brainstorming, coding assistance, and report writing.  
However:
- You must **verify all outputs** and remain responsible for correctness.  
- You must **document** how you used these tools (in the report and acknowledgments).  
- You must include your **AI deep research log** in the appendix (mandatory).  
- You must include **agent transcripts** and your authored prompts.  

Use AI responsibly — see *AI in Life Sciences: Power with Responsibility*.  

---
