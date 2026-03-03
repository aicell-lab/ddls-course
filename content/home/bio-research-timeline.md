---
widget: blank
headless: true
weight: 16
title: ''
design:
  columns: '1'
  background:
    color: 'rgb(12,17,44)'
    text_color_light: true
  spacing:
    padding: ['60px', '0', '60px', '0']
---

<style>
.brt-section {
  max-width: 1020px;
  margin: 0 auto;
  padding: 0 1.5rem;
}
.brt-header {
  text-align: center;
  margin-bottom: 2.8rem;
}
.brt-eyebrow {
  display: inline-block;
  background: linear-gradient(135deg, rgba(14,165,233,0.25), rgba(99,102,241,0.25));
  border: 1px solid rgba(14,165,233,0.45);
  color: #38bdf8;
  font-size: 0.75rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  padding: 0.3rem 0.9rem;
  border-radius: 999px;
  margin-bottom: 1rem;
}
.brt-title {
  font-size: clamp(1.6rem, 4vw, 2.4rem);
  font-weight: 900;
  color: #f1f5f9 !important;
  margin: 0 0 0.75rem;
  letter-spacing: -0.02em;
}
.brt-sub {
  font-size: 1rem;
  color: #94a3b8;
  max-width: 640px;
  margin: 0 auto;
  line-height: 1.75;
}
.brt-stages {
  display: grid;
  grid-template-columns: 1fr 44px 1fr 44px 1fr;
  align-items: start;
  gap: 0;
}
.brt-arrow {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  padding-top: 3.2rem;
}
.brt-arrow svg {
  width: 26px;
  height: 26px;
  color: #334155;
  flex-shrink: 0;
}
.brt-stage {
  border-radius: 20px;
  padding: 1.6rem 1.4rem;
  display: flex;
  flex-direction: column;
  gap: 0.65rem;
}
.brt-stage-1 {
  background: rgba(100,116,139,0.12);
  border: 1px solid rgba(100,116,139,0.3);
}
.brt-stage-2 {
  background: rgba(59,130,246,0.1);
  border: 1px solid rgba(59,130,246,0.3);
}
.brt-stage-3 {
  background: linear-gradient(145deg, rgba(139,92,246,0.14), rgba(16,185,129,0.08));
  border: 1px solid rgba(139,92,246,0.45);
  box-shadow: 0 0 28px rgba(139,92,246,0.12);
}
.brt-stage-badge {
  display: inline-block;
  font-size: 0.67rem;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  padding: 0.22rem 0.65rem;
  border-radius: 6px;
  width: fit-content;
}
.brt-stage-1 .brt-stage-badge { background: rgba(100,116,139,0.25); color: #94a3b8; border: 1px solid rgba(100,116,139,0.35); }
.brt-stage-2 .brt-stage-badge { background: rgba(59,130,246,0.2); color: #60a5fa; border: 1px solid rgba(59,130,246,0.35); }
.brt-stage-3 .brt-stage-badge { background: linear-gradient(135deg,rgba(139,92,246,0.25),rgba(16,185,129,0.2)); color: #c4b5fd; border: 1px solid rgba(139,92,246,0.45); }
.brt-stage-icon {
  font-size: 2.6rem;
  line-height: 1;
}
.brt-stage-era {
  font-size: 0.7rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.06em;
}
.brt-stage-1 .brt-stage-era { color: #64748b; }
.brt-stage-2 .brt-stage-era { color: #3b82f6; }
.brt-stage-3 .brt-stage-era { color: #a78bfa; }
.brt-stage-name {
  font-size: 1rem;
  font-weight: 800;
  line-height: 1.25;
}
.brt-stage-1 .brt-stage-name { color: #e2e8f0; }
.brt-stage-2 .brt-stage-name { color: #e2e8f0; }
.brt-stage-3 .brt-stage-name {
  background: linear-gradient(135deg, #a78bfa, #34d399);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
.brt-stage-desc {
  font-size: 0.82rem;
  color: #94a3b8;
  line-height: 1.65;
  flex: 1;
}
.brt-flow {
  display: flex;
  flex-direction: column;
  gap: 0.32rem;
}
.brt-flow-step {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.76rem;
  color: #64748b;
  font-weight: 500;
}
.brt-flow-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  flex-shrink: 0;
}
.brt-stage-1 .brt-flow-dot { background: #64748b; }
.brt-stage-2 .brt-flow-dot { background: #3b82f6; }
.brt-stage-3 .brt-flow-dot { background: #8b5cf6; }
.brt-example {
  background: rgba(255,255,255,0.04);
  border-radius: 10px;
  padding: 0.65rem 0.8rem;
  font-size: 0.74rem;
  color: #64748b;
  line-height: 1.55;
  display: flex;
  align-items: flex-start;
  gap: 0.45rem;
}
.brt-example-label {
  font-weight: 700;
  font-size: 0.66rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  flex-shrink: 0;
  padding-top: 0.05rem;
}
.brt-stage-1 .brt-example-label { color: #64748b; }
.brt-stage-2 .brt-example-label { color: #3b82f6; }
.brt-stage-3 .brt-example-label { color: #8b5cf6; }
.brt-footer {
  margin-top: 2.4rem;
  text-align: center;
  background: linear-gradient(135deg, rgba(99,102,241,0.1), rgba(16,185,129,0.08));
  border: 1px solid rgba(99,102,241,0.25);
  border-radius: 16px;
  padding: 1.3rem 2rem;
}
.brt-footer p {
  font-size: 0.95rem;
  color: #cbd5e1;
  line-height: 1.75;
  margin: 0;
}
.brt-footer strong { color: #a78bfa; }
@media (max-width: 768px) {
  .brt-stages { grid-template-columns: 1fr; }
  .brt-arrow { padding-top: 0; padding: 0.5rem 1rem; flex-direction: row; }
  .brt-arrow svg { transform: rotate(90deg); }
}
</style>

<div class="brt-section">
<div class="brt-header">
<div class="brt-eyebrow">🔬 The Changing Nature of Science</div>
<h2 class="brt-title">How Biological Research Has Evolved</h2>
<p class="brt-sub">
The scientific method itself is being transformed — from a purely human-driven process
to one where AI plays an increasingly central role in every step.
</p>
</div>

<div class="brt-stages">

<div class="brt-stage brt-stage-1">
<div class="brt-stage-badge">Traditional Science</div>
<div class="brt-stage-icon">🧫</div>
<div class="brt-stage-era">Pre-2000s → ongoing</div>
<div class="brt-stage-name">Hypothesis-Driven Research</div>
<div class="brt-stage-desc">
A scientist forms a hypothesis based on prior knowledge and intuition, designs a targeted experiment to test it, and interprets results manually. Powerful — but slow, narrow, and limited by human capacity to process data.
</div>
<div class="brt-flow">
<div class="brt-flow-step"><span class="brt-flow-dot"></span>Observe phenomenon</div>
<div class="brt-flow-step"><span class="brt-flow-dot"></span>Form hypothesis</div>
<div class="brt-flow-step"><span class="brt-flow-dot"></span>Design &amp; run experiment</div>
<div class="brt-flow-step"><span class="brt-flow-dot"></span>Collect &amp; analyze data manually</div>
<div class="brt-flow-step"><span class="brt-flow-dot"></span>Publish &amp; repeat</div>
</div>
<div class="brt-example">
<span class="brt-example-label">e.g.</span>
<span>Koch's postulates, Mendel's genetics, classical drug trials — one hypothesis at a time.</span>
</div>
</div>

<div class="brt-arrow">
<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
</div>

<div class="brt-stage brt-stage-2">
<div class="brt-stage-badge">Computational Biology</div>
<div class="brt-stage-icon">💻</div>
<div class="brt-stage-era">2000s → present</div>
<div class="brt-stage-name">Data-Driven Hypothesis Generation</div>
<div class="brt-stage-desc">
Large-scale biological datasets (genomes, proteomes, single-cell profiles) are analyzed computationally. Machine learning reveals patterns that generate new hypotheses — often ones a human would never have considered.
</div>
<div class="brt-flow">
<div class="brt-flow-step"><span class="brt-flow-dot"></span>Generate massive dataset (omics, imaging)</div>
<div class="brt-flow-step"><span class="brt-flow-dot"></span>Apply ML / statistical models</div>
<div class="brt-flow-step"><span class="brt-flow-dot"></span>Discover unexpected patterns</div>
<div class="brt-flow-step"><span class="brt-flow-dot"></span>Form data-driven hypothesis</div>
<div class="brt-flow-step"><span class="brt-flow-dot"></span>Validate experimentally</div>
</div>
<div class="brt-example">
<span class="brt-example-label">e.g.</span>
<span>GWAS reveals disease-linked variants across 500,000 genomes; scRNA-seq uncovers unknown cell types; AlphaFold predicts protein structure from sequence alone.</span>
</div>
</div>

<div class="brt-arrow">
<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
</div>

<div class="brt-stage brt-stage-3">
<div class="brt-stage-badge">🚀 Emerging Now</div>
<div class="brt-stage-icon">🤖</div>
<div class="brt-stage-era">2024 → future</div>
<div class="brt-stage-name">The AI Scientist — Autonomous Research</div>
<div class="brt-stage-desc">
AI agents autonomously review literature, generate hypotheses, design experiments, write and execute code, interpret results, and iterate — completing in hours what took researchers months. Humans set the goals; AI drives the loop.
</div>
<div class="brt-flow">
<div class="brt-flow-step"><span class="brt-flow-dot"></span>AI reviews entire literature corpus</div>
<div class="brt-flow-step"><span class="brt-flow-dot"></span>Generates &amp; ranks hypotheses</div>
<div class="brt-flow-step"><span class="brt-flow-dot"></span>Designs &amp; simulates experiments</div>
<div class="brt-flow-step"><span class="brt-flow-dot"></span>Analyzes results, updates model</div>
<div class="brt-flow-step"><span class="brt-flow-dot"></span>Drafts manuscript autonomously</div>
</div>
<div class="brt-example">
<span class="brt-example-label">e.g.</span>
<span>Sakana AI's "AI Scientist" writes &amp; reviews its own papers; AI discovers novel antibiotics (MIT, 2023); automated lab robots close the experiment loop end-to-end.</span>
</div>
</div>

</div>

<div class="brt-footer">
<p>
<strong>DDLS prepares you to work at the frontier of Stage 2 and 3.</strong>
You'll learn to harness data-driven methods, direct AI agents for biological analysis,
and critically evaluate what autonomous systems produce — the exact skills that define
the next generation of life scientists.
</p>
</div>
</div>
