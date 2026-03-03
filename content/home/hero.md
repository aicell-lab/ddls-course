---
widget: blank
headless: true
weight: 10
design:
  background:
    gradient_angle: 135
    gradient_start: 'rgb(9,14,36)'
    gradient_end: 'rgb(55,20,100)'
    text_color_light: true
  spacing:
    padding: ['80px', '0', '80px', '0']
---

<style>
.hero-wrap {
  max-width: 900px;
  margin: 0 auto;
  padding: 0 1.5rem;
  text-align: center;
  color: #fff;
}
.hero-eyebrow {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: rgba(102,126,234,0.25);
  border: 1px solid rgba(102,126,234,0.5);
  border-radius: 999px;
  padding: 0.35rem 1rem;
  font-size: 0.82rem;
  font-weight: 600;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  color: #a5b4fc;
  margin-bottom: 1.5rem;
}
.hero-title {
  font-size: clamp(2.4rem, 6vw, 4.2rem);
  font-weight: 900;
  line-height: 1.08;
  margin: 0 0 1.25rem;
  letter-spacing: -0.03em;
  color: #fff;
}
.hero-title .grad {
  background: linear-gradient(90deg, #818cf8 0%, #a78bfa 50%, #34d399 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
.hero-subtitle {
  font-size: clamp(1rem, 2.5vw, 1.2rem);
  line-height: 1.75;
  color: #c4c9f0;
  max-width: 680px;
  margin: 0 auto 2rem;
}
.hero-pills {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 0.6rem;
  margin-bottom: 2.5rem;
}
.hero-pill {
  background: rgba(255,255,255,0.07);
  border: 1px solid rgba(255,255,255,0.14);
  border-radius: 999px;
  padding: 0.28rem 0.85rem;
  font-size: 0.8rem;
  color: #c4c9f0;
  font-weight: 500;
}
.hero-ctas {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 0.85rem;
  margin-bottom: 2.5rem;
}
.hero-btn-primary {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: #fff !important;
  font-weight: 700;
  font-size: 0.97rem;
  padding: 0.8rem 1.8rem;
  border-radius: 10px;
  text-decoration: none !important;
  transition: opacity 0.15s, transform 0.15s;
  box-shadow: 0 4px 24px rgba(102,126,234,0.4);
}
.hero-btn-primary:hover { opacity: 0.88; transform: translateY(-2px); color: #fff !important; }
.hero-btn-secondary {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: rgba(255,255,255,0.08);
  border: 1px solid rgba(255,255,255,0.22);
  color: #fff !important;
  font-weight: 600;
  font-size: 0.97rem;
  padding: 0.8rem 1.8rem;
  border-radius: 10px;
  text-decoration: none !important;
  transition: background 0.15s, transform 0.15s;
}
.hero-btn-secondary:hover { background: rgba(255,255,255,0.16); transform: translateY(-2px); color: #fff !important; }
.hero-stats {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 3rem;
  margin-top: 2.5rem;
  padding-top: 2rem;
  border-top: 1px solid rgba(255,255,255,0.1);
}
.hero-stat-num {
  font-size: 2.2rem;
  font-weight: 900;
  background: linear-gradient(135deg, #818cf8, #34d399);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  line-height: 1;
}
.hero-stat-label {
  font-size: 0.75rem;
  color: #8892b0;
  margin-top: 0.3rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}
@media (max-width: 600px) {
  .hero-stats { gap: 1.5rem; }
  .hero-stat-num { font-size: 1.6rem; }
}
</style>

<div class="hero-wrap">
  <div class="hero-eyebrow">
    🧬 KTH Royal Institute of Technology &nbsp;·&nbsp; SciLifeLab
  </div>

  <h1 class="hero-title">
    Data-Driven<br>
    <span class="grad">Life Sciences</span>
  </h1>

  <p class="hero-subtitle">
    A hands-on course where you master the AI tools, data science workflows, and biological reasoning skills
    that are reshaping how science is done — and how researchers stay competitive.
  </p>

  <div class="hero-pills">
    <span class="hero-pill">🤖 AI Agents &amp; LLMs</span>
    <span class="hero-pill">🔬 Microscopy &amp; Imaging</span>
    <span class="hero-pill">🧬 Single-cell Genomics</span>
    <span class="hero-pill">🧪 Protein Structure</span>
    <span class="hero-pill">💊 Precision Medicine</span>
    <span class="hero-pill">🔭 Systems Biology</span>
  </div>

  <div class="hero-ctas">
    <a href="/course/ddls-2025/" class="hero-btn-primary">
      <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24"><path d="M12 3L1 9l11 6 9-4.91V17h2V9L12 3zM5 13.18v4L12 21l7-3.82v-4L12 17l-7-3.82z"/></svg>
      Explore the Course
    </a>
    <a href="/showcase/" class="hero-btn-secondary">
      <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
      See Student Projects
    </a>
  </div>

  <div class="hero-stats">
    <div>
      <div class="hero-stat-num">7.5</div>
      <div class="hero-stat-label">ECTS Credits</div>
    </div>
    <div>
      <div class="hero-stat-num">6</div>
      <div class="hero-stat-label">Modules</div>
    </div>
    <div>
      <div class="hero-stat-num">100+</div>
      <div class="hero-stat-label">Students Trained</div>
    </div>
    <div>
      <div class="hero-stat-num">4×</div>
      <div class="hero-stat-label">Years Running</div>
    </div>
  </div>
</div>
