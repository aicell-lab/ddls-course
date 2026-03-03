---
widget: blank
headless: true
weight: 18
title: ''
design:
  columns: '1'
  background:
    color: 'rgb(10,15,40)'
    text_color_light: true
  spacing:
    padding: ['60px', '0', '60px', '0']
---

<style>
.ddls-section {
  max-width: 960px;
  margin: 0 auto;
  padding: 0 1.5rem;
}
.ddls-section-header {
  text-align: center;
  margin-bottom: 2.5rem;
}
.ddls-eyebrow {
  display: inline-block;
  background: linear-gradient(135deg, #667eea, #764ba2);
  color: #fff;
  font-size: 0.75rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  padding: 0.3rem 0.9rem;
  border-radius: 999px;
  margin-bottom: 1rem;
}
.ddls-title {
  font-size: clamp(1.6rem, 4vw, 2.4rem);
  font-weight: 900;
  color: #f1f5f9 !important;
  margin: 0 0 0.75rem;
  letter-spacing: -0.02em;
}
.ddls-sub {
  font-size: 1.05rem;
  color: #94a3b8;
  max-width: 680px;
  margin: 0 auto;
  line-height: 1.75;
}
/* Breakthrough cards */
.ddls-breakthroughs {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.25rem;
  margin-bottom: 3rem;
}
.ddls-bcard {
  background: rgba(255,255,255,0.05);
  border: 1px solid rgba(255,255,255,0.1);
  border-radius: 16px;
  padding: 1.5rem;
  transition: box-shadow 0.2s, transform 0.2s;
}
.ddls-bcard:hover {
  box-shadow: 0 8px 30px rgba(102,126,234,0.2);
  transform: translateY(-3px);
  border-color: rgba(102,126,234,0.4);
}
.ddls-bcard-icon { font-size: 2.2rem; margin-bottom: 0.75rem; }
.ddls-bcard-title {
  font-weight: 700;
  font-size: 0.95rem;
  color: #e2e8f0;
  margin-bottom: 0.4rem;
}
.ddls-bcard-desc {
  font-size: 0.83rem;
  color: #94a3b8;
  line-height: 1.55;
}
.ddls-bcard-tag {
  display: inline-block;
  margin-top: 0.75rem;
  background: rgba(102,126,234,0.2);
  color: #818cf8;
  font-size: 0.72rem;
  font-weight: 700;
  padding: 0.2rem 0.6rem;
  border-radius: 6px;
}
/* Modules grid */
.modules-header {
  text-align: center;
  margin-bottom: 1.75rem;
}
.modules-title {
  font-size: 1.5rem;
  font-weight: 800;
  color: #f1f5f9 !important;
  margin: 0 0 0.5rem;
}
.modules-sub {
  font-size: 0.92rem;
  color: #94a3b8;
}
.modules-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(270px, 1fr));
  gap: 1.1rem;
  margin-bottom: 2rem;
}
.module-card {
  background: rgba(255,255,255,0.04);
  border: 1px solid rgba(255,255,255,0.1);
  border-radius: 14px;
  padding: 1.25rem 1.4rem;
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  transition: box-shadow 0.2s, transform 0.2s;
}
.module-card:hover {
  box-shadow: 0 6px 24px rgba(102,126,234,0.2);
  transform: translateY(-2px);
  border-color: rgba(102,126,234,0.4);
}
.module-num {
  width: 36px;
  height: 36px;
  border-radius: 10px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: #fff;
  font-weight: 800;
  font-size: 0.88rem;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}
.module-body {}
.module-icon { font-size: 1.1rem; margin-bottom: 0.2rem; }
.module-name {
  font-weight: 700;
  font-size: 0.9rem;
  color: #e2e8f0;
  margin-bottom: 0.3rem;
}
.module-desc {
  font-size: 0.8rem;
  color: #94a3b8;
  line-height: 1.5;
}
/* Format row */
.format-row {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  justify-content: center;
  margin-top: 2rem;
  padding: 1.5rem;
  background: rgba(102,126,234,0.08);
  border-radius: 16px;
  border: 1px solid rgba(102,126,234,0.2);
}
.format-item {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  font-size: 0.88rem;
  color: #cbd5e1;
  font-weight: 600;
}
.format-item-icon {
  width: 36px;
  height: 36px;
  border-radius: 10px;
  background: linear-gradient(135deg, #667eea, #764ba2);
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
  flex-shrink: 0;
}
@media (max-width: 600px) {
  .ddls-breakthroughs { grid-template-columns: 1fr 1fr; }
}
</style>

<div class="ddls-section">
  <div class="ddls-section-header">
    <div class="ddls-eyebrow">🔬 What is Data-Driven Life Sciences?</div>
    <h2 class="ddls-title">Where Biology Meets Computation</h2>
    <p class="ddls-sub">
      Modern biology generates more data than any human can process.
      Data-driven life sciences is the discipline of using machine learning, AI, and computational methods
      to extract meaning from this data — and to make discoveries that would be impossible otherwise.
    </p>
  </div>

  <div class="ddls-breakthroughs">
    <div class="ddls-bcard">
      <div class="ddls-bcard-icon">🧬</div>
      <div class="ddls-bcard-title">AlphaFold</div>
      <div class="ddls-bcard-desc">DeepMind's AI solved protein structure prediction — a 60-year grand challenge — in 2020. Every protein in the human genome, predicted in days.</div>
      <span class="ddls-bcard-tag">Structural Biology</span>
    </div>
    <div class="ddls-bcard">
      <div class="ddls-bcard-icon">🔬</div>
      <div class="ddls-bcard-title">Single-Cell Sequencing</div>
      <div class="ddls-bcard-desc">We can now profile the gene expression of individual cells, mapping every cell type in the human body at unprecedented resolution.</div>
      <span class="ddls-bcard-tag">Genomics</span>
    </div>
    <div class="ddls-bcard">
      <div class="ddls-bcard-icon">👁️</div>
      <div class="ddls-bcard-title">AI Microscopy</div>
      <div class="ddls-bcard-desc">Deep learning can now detect cancer cells, classify organisms, and measure cellular dynamics from microscopy images with superhuman accuracy.</div>
      <span class="ddls-bcard-tag">Imaging</span>
    </div>
    <div class="ddls-bcard">
      <div class="ddls-bcard-icon">💊</div>
      <div class="ddls-bcard-title">Precision Medicine</div>
      <div class="ddls-bcard-desc">By integrating genomic, clinical, and environmental data, AI is enabling treatments tailored to individual patients rather than disease averages.</div>
      <span class="ddls-bcard-tag">Systems Biology</span>
    </div>
  </div>

  <div class="modules-header">
    <div class="modules-title">Six Modules, Six Fields</div>
    <p class="modules-sub">Each week brings a new domain, taught by leading researchers from SciLifeLab and KTH.</p>
  </div>

  <div class="modules-grid">
    <div class="module-card">
      <div class="module-num">1</div>
      <div class="module-body">
        <div class="module-icon">🤖</div>
        <div class="module-name">Intro to Data-Driven Life Sciences</div>
        <div class="module-desc">Foundations of AI in biology, using AI agents and LLMs for scientific exploration.</div>
      </div>
    </div>
    <div class="module-card">
      <div class="module-num">2</div>
      <div class="module-body">
        <div class="module-icon">🔬</div>
        <div class="module-name">Image Analysis &amp; Microscopy</div>
        <div class="module-desc">Deep learning for biological images: cell segmentation, classification, super-resolution.</div>
      </div>
    </div>
    <div class="module-card">
      <div class="module-num">3</div>
      <div class="module-body">
        <div class="module-icon">🧬</div>
        <div class="module-name">Protein Structure &amp; Molecular Biology</div>
        <div class="module-desc">AlphaFold, protein language models, molecular simulation, and structure prediction.</div>
      </div>
    </div>
    <div class="module-card">
      <div class="module-num">4</div>
      <div class="module-body">
        <div class="module-icon">🧫</div>
        <div class="module-name">Single-cell Transcriptomics &amp; Genomics</div>
        <div class="module-desc">scRNA-seq analysis, dimensionality reduction, trajectory inference, spatial transcriptomics.</div>
      </div>
    </div>
    <div class="module-card">
      <div class="module-num">5</div>
      <div class="module-body">
        <div class="module-icon">💊</div>
        <div class="module-name">Precision Medicine &amp; Systems Biology</div>
        <div class="module-desc">Multi-omics integration, network biology, patient stratification, drug target discovery.</div>
      </div>
    </div>
    <div class="module-card">
      <div class="module-num">6</div>
      <div class="module-body">
        <div class="module-icon">🚀</div>
        <div class="module-name">Automated Scientific Discovery &amp; AI Agents</div>
        <div class="module-desc">AI agents that design experiments, analyze results, and drive autonomous scientific workflows.</div>
      </div>
    </div>
  </div>

  <div class="format-row">
    <div class="format-item">
      <div class="format-item-icon">🎓</div>
      Weekly Lecture by Leading Researcher
    </div>
    <div class="format-item">
      <div class="format-item-icon">💻</div>
      Hands-on AI-Augmented Lab (Google Colab)
    </div>
    <div class="format-item">
      <div class="format-item-icon">📖</div>
      Journal Club &amp; Peer Discussion
    </div>
    <div class="format-item">
      <div class="format-item-icon">🏗️</div>
      Final Project: Build Something Real
    </div>
  </div>
</div>
