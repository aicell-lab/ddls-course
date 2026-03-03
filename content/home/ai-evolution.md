---
widget: blank
headless: true
weight: 15
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
.aiera-section {
  max-width: 960px;
  margin: 0 auto;
  padding: 0 1.5rem;
  color: #fff;
}
.aiera-header {
  text-align: center;
  margin-bottom: 3rem;
}
.aiera-eyebrow {
  display: inline-block;
  background: rgba(239,68,68,0.2);
  border: 1px solid rgba(239,68,68,0.4);
  color: #fca5a5;
  font-size: 0.75rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  padding: 0.3rem 0.9rem;
  border-radius: 999px;
  margin-bottom: 1rem;
}
.aiera-title {
  font-size: clamp(1.6rem, 4vw, 2.4rem);
  font-weight: 900;
  color: #fff;
  margin: 0 0 0.75rem;
  letter-spacing: -0.02em;
}
.aiera-sub {
  color: #94a3b8;
  font-size: 1rem;
  max-width: 600px;
  margin: 0 auto;
  line-height: 1.7;
}
/* Timeline row */
.evo-row {
  margin-bottom: 2.5rem;
}
.evo-row-label {
  font-size: 0.75rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: #64748b;
  margin-bottom: 1rem;
}
.evo-track {
  display: flex;
  align-items: stretch;
  gap: 0;
  position: relative;
}
.evo-track::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 0; right: 0;
  height: 2px;
  background: linear-gradient(90deg, rgba(102,126,234,0.3), rgba(52,211,153,0.3));
  z-index: 0;
}
.evo-step {
  flex: 1;
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  padding: 0 0.25rem;
}
.evo-node {
  width: 52px;
  height: 52px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.4rem;
  flex-shrink: 0;
  border: 2px solid transparent;
  transition: transform 0.2s;
}
.evo-node:hover { transform: scale(1.1); }
.evo-node.era-1 { background: rgba(71,85,105,0.5); border-color: #475569; }
.evo-node.era-2 { background: rgba(30,64,175,0.5); border-color: #3b82f6; }
.evo-node.era-3 { background: rgba(109,40,217,0.5); border-color: #8b5cf6; }
.evo-node.era-4 { background: rgba(16,185,129,0.5); border-color: #10b981; box-shadow: 0 0 16px rgba(16,185,129,0.4); }
.evo-year {
  font-size: 0.68rem;
  font-weight: 700;
  color: #64748b;
  text-transform: uppercase;
  letter-spacing: 0.04em;
}
.evo-label {
  font-size: 0.8rem;
  font-weight: 600;
  color: #e2e8f0;
  text-align: center;
  line-height: 1.3;
}
.evo-label.highlight { color: #34d399; }
/* The big callout */
.aiera-callout {
  margin-top: 2rem;
  background: linear-gradient(135deg, rgba(102,126,234,0.15) 0%, rgba(16,185,129,0.12) 100%);
  border: 1px solid rgba(102,126,234,0.3);
  border-radius: 16px;
  padding: 1.75rem 2rem;
  display: flex;
  align-items: flex-start;
  gap: 1.25rem;
}
.aiera-callout-icon {
  font-size: 2rem;
  flex-shrink: 0;
  margin-top: 0.1rem;
}
.aiera-callout-text {
  font-size: 1.05rem;
  line-height: 1.7;
  color: #c4c9f0;
}
.aiera-callout-text strong { color: #a5b4fc; }
@media (max-width: 640px) {
  .evo-track { flex-wrap: wrap; gap: 1rem; }
  .evo-track::before { display: none; }
  .evo-step { flex: 0 0 calc(50% - 0.5rem); }
  .aiera-callout { flex-direction: column; }
}
</style>

<div class="aiera-section">
  <div class="aiera-header">
    <div class="aiera-eyebrow">⚡ Why This Matters Now</div>
    <h2 class="aiera-title">You're Graduating Into a Different World</h2>
    <p class="aiera-sub">
      Every decade, a shift in tools changes how knowledge workers operate.
      The current shift is the biggest yet — and it's happening right now.
    </p>
  </div>

  <!-- Knowledge access timeline -->
  <div class="evo-row">
    <div class="evo-row-label">📚 How we find information</div>
    <div class="evo-track">
      <div class="evo-step">
        <div class="evo-node era-1">📚</div>
        <div class="evo-year">Pre-2000</div>
        <div class="evo-label">Library &amp; Textbooks</div>
      </div>
      <div class="evo-step">
        <div class="evo-node era-2">🔍</div>
        <div class="evo-year">2000s</div>
        <div class="evo-label">Google Search</div>
      </div>
      <div class="evo-step">
        <div class="evo-node era-3">💬</div>
        <div class="evo-year">2022+</div>
        <div class="evo-label">ChatGPT &amp; LLMs</div>
      </div>
      <div class="evo-step">
        <div class="evo-node era-4">🤖</div>
        <div class="evo-year">Today</div>
        <div class="evo-label highlight">AI Agents &amp; Autonomous Research</div>
      </div>
    </div>
  </div>

  <!-- Coding timeline -->
  <div class="evo-row">
    <div class="evo-row-label">💻 How we write code</div>
    <div class="evo-track">
      <div class="evo-step">
        <div class="evo-node era-1">⌨️</div>
        <div class="evo-year">Pre-2020</div>
        <div class="evo-label">Type every line in an IDE</div>
      </div>
      <div class="evo-step">
        <div class="evo-node era-2">✨</div>
        <div class="evo-year">2021</div>
        <div class="evo-label">GitHub Copilot suggests lines</div>
      </div>
      <div class="evo-step">
        <div class="evo-node era-3">⚡</div>
        <div class="evo-year">2023</div>
        <div class="evo-label">Cursor writes entire functions</div>
      </div>
      <div class="evo-step">
        <div class="evo-node era-4">🚀</div>
        <div class="evo-year">Today</div>
        <div class="evo-label highlight">AI agents code, test &amp; debug entire projects</div>
      </div>
    </div>
  </div>

  <div class="aiera-callout">
    <div class="aiera-callout-icon">💡</div>
    <div class="aiera-callout-text">
      <strong>The right question isn't "will AI replace scientists?"</strong>
      It's: <em>will scientists who use AI effectively replace those who don't?</em>
      This course gives you that edge — how to prompt correctly, direct AI agents for data analysis,
      train models, build tools, and critically evaluate AI outputs in a scientific context.
    </div>
  </div>
</div>
