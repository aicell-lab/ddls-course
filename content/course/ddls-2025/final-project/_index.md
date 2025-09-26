---
title: "Final Project — Exploring and Modeling Life Science Data with AI Agentss"
summary: ""
linkTitle: Final Project
date: 2025-01-01
type: book
weight: 90
course_module: "true"
---

⚠️ **Note:** This is a draft project plan. Details (including deadlines, deliverables, and evaluation criteria) may change.

---

Welcome to the final project of **DDLS 2025**.  
This is your opportunity to demonstrate what you have learned throughout the course:
- Working with real biological datasets.
- Building **MCP tools** to encapsulate analysis steps.
- Designing and writing **prompts for LLM agents** (e.g., Gemini-CLI, ChatGPT, Perplexity) to guide exploration, coding, and model training.
- Designing and evaluating models for meaningful scientific tasks.
- Critically reflecting on AI’s role in scientific discovery.
- Practicing FAIR and open science principles in your work.

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

### What to Submit (max 3 pages + appendix)
1. **Dataset Choice**
   - Dataset name, source (URL/reference), license/ethics statement.
   - Data type (e.g., imaging, proteomics, scRNA-seq, clinical).
   - Expected size and subset you will use.

2. **Task Definition**
   - Clear scientific question (classification, clustering, regression, prediction, etc.).
   - Why is this task scientifically relevant?

3. **Exploration Goals**
   - At least **3 dataset exploration questions** you will answer with MCP tools + AI agent.
   - Examples: class balance, distributions, correlations, missing values, feature embeddings.

4. **Proposed Model & Evaluation**
   - Planned baseline model(s).
   - Planned evaluation metric(s).
   - What “good performance” would mean for your task.

5. **Planned MCP Tools**
   - List at least 5 MCP tools you plan to build (e.g., `load_dataset`, `inspect_distribution`, `preprocess_data`, `train_model`, `evaluate_model`).

6. **Feasibility Check**
   - Justify that the project is doable in the timeframe.
   - State expected runtime (≤15 min CPU).
   - Mention potential risks (large dataset, convergence issues).

---

### Required Appendix — AI Deep Research Log
You must demonstrate that you used a **GenAI tool** (Gemini, Perplexity, ChatGPT, etc.) to brainstorm and refine your dataset choice, task, and methods.

- Submit the **chat history** (unedited, but you may highlight key insights).
- Show how you asked the AI to:
  1. Brainstorm possible datasets and questions.
  2. Check feasibility, novelty, and relevance.
  3. Suggest candidate methods or models.
  4. Help draft the proposal.
- Summarize what you **kept, rejected, or modified** from the AI’s advice.

---

### Step 1 Evaluation
- **Pass** → You may proceed to Step 2.  
- **Revise** → You must update your plan before starting.  
Plans may be rejected if the dataset/task is too trivial, too close to a lab, overly ambitious, license-restricted, or missing the AI research appendix.

---

## Step 2 — Final Project (Oct 6–22, 2025)

Once your plan is approved, you will complete the project in two parts.

### Part I — Dataset Exploration & Plan
- Implement MCP tools for loading, inspecting, and visualizing the dataset.
- Use an AI agent (Gemini-CLI or similar) to:
  - Explore the dataset.
  - Summarize distributions, imbalances, and other key features.
  - Refine your modeling plan.
- Write clear **LLM prompts/instructions** to guide the agent through the exploration.
- Deliverable: Exploration results, visualizations, prompts, and agent transcripts.

### Part II — Model Training, Evaluation & Improvement
- Implement MCP tools for preprocessing, training, inference, and evaluation.
- Use the AI agent to:
  - Train the model based on your plan.
  - Evaluate on validation/test data.
  - Attempt at least one **improvement step** (better preprocessing, tuning, or different model).
- Write clear **LLM prompts** for the agent to run training and evaluation.
- Deliverable: Demonstrate a working model with measurable performance. Show evidence of improvement attempts.

---

## FAIR Data and Open Science Recommendations
To promote the **FAIR principles (Findable, Accessible, Interoperable, Reusable)** and support open science:

- Prefer **public datasets**. If using a private dataset, explain how it could be made available in the future.  
- We recommend creating a **GitHub repository** for your project.  
  - Add the topic `ddls-course-2025` to make your project findable ([GitHub Topics Guide](https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/customizing-your-repository/classifying-your-repository-with-topics)).  
  - Include a **README file** with an overview and usage instructions.  
  - Document your code properly.  
  - Add a permissive license (e.g., MIT license) to allow reuse.  
  - If a public dataset was used, provide a script or instructions to download it.  
  - Make your project reproducible; upload trained model weights to GitHub Releases or [Zenodo](https://zenodo.org/) if possible.  
  - Consider publishing your report (e.g., on Zenodo).  

If you cannot share code or data publicly, please state this clearly in your submission.

---

## Final Deliverables
You will submit:
1. **Final Project Report (max 5 pages main text, unlimited appendices)**  
   The report should include:
   - **Abstract (≤100 words)**: problem, method, results.  
   - **Background and Motivation**: why you chose this dataset/task.  
   - **Dataset Summary**: data source, preprocessing, splits, distributions.  
   - **Method Description**: MCP tools, models, evaluation metrics.  
   - **Results**: figures, tables, performance metrics vs. baseline.  
   - **Conclusion & Discussion**: findings, limitations, future directions.  
   - **Data and Code Availability**: links to dataset and repo (per FAIR guidelines).  
   - **Acknowledgments**: contributions, support, and note on GenAI tools used.  
   - **References**: relevant literature.  
   - **Appendices**: agent transcripts, prompts, deep research log, extra figures.  

2. **Agent Demo**  
   - 3–5 min screen recording (or asciinema) showing Gemini-CLI answering 3 scientific questions using your tools and your written prompts.

3. **Git repository (recommended)**  
   - If possible, host your code on GitHub/GitLab.  
   - Add the topic `ddls-course-2025` for visibility.  
   - Include README, license, and reproducibility instructions.  

---

## Pass Criteria
✅ Dataset choice is validated.  
✅ ≥5 MCP tools covering exploration, training, and evaluation.  
✅ AI agent demonstrated in both exploration & model training.  
✅ Student-authored prompts for agent interactions are included.  
✅ Model trained & evaluated on validation/test split.  
✅ Report includes dataset analysis, model justification, evaluation, and at least one improvement attempt.  

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
- **Oct 22, 2025 (23:59)** — Final project submission (report, demo, repo recommended).  
- **Oct 24, 2025 (13:00–16:00)** — Oral presentations (Master’s students only).  

---

## Note on GenAI Tools
You are encouraged to use ChatGPT, Gemini, Perplexity, or similar for brainstorming, coding assistance, and report writing.  
However:
- You must **verify all outputs** and remain responsible for correctness.  
- You must **document** how you used these tools (in the report and acknowledgments).  
- You must include **agent transcripts** and your **deep research log** in the appendix.  

Use AI responsibly — see *AI in Life Sciences: Power with Responsibility*.  

---
