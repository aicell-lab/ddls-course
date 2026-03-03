---
widget: blank
headless: true
weight: 20
title: ''
design:
  columns: '1'
  background:
    gradient_angle: 135
    gradient_start: 'rgb(15,23,42)'
    gradient_end: 'rgb(30,27,75)'
    text_color_light: true
  spacing:
    padding: ['50px', '0', '50px', '0']
---

<style>
.learn-section {
  max-width: 960px;
  margin: 0 auto;
  padding: 0 1.5rem;
  color: #fff;
  text-align: center;
}
.learn-eyebrow {
  display: inline-block;
  background: rgba(167,139,250,0.2);
  border: 1px solid rgba(167,139,250,0.4);
  color: #c4b5fd;
  font-size: 0.75rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  padding: 0.3rem 0.9rem;
  border-radius: 999px;
  margin-bottom: 1rem;
}
.learn-title {
  font-size: clamp(1.5rem, 3.5vw, 2.2rem);
  font-weight: 900;
  color: #fff;
  margin: 0 0 0.6rem;
  letter-spacing: -0.02em;
}
.learn-sub {
  color: #94a3b8;
  font-size: 0.97rem;
  max-width: 560px;
  margin: 0 auto 2.5rem;
  line-height: 1.7;
}
.learn-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.25rem;
}
.learn-card {
  background: rgba(255,255,255,0.05);
  border: 1px solid rgba(255,255,255,0.1);
  border-radius: 16px;
  padding: 1.75rem 1.5rem;
  text-align: left;
  transition: background 0.2s, transform 0.2s, box-shadow 0.2s;
}
.learn-card:hover {
  background: rgba(102,126,234,0.12);
  border-color: rgba(102,126,234,0.4);
  transform: translateY(-3px);
  box-shadow: 0 12px 30px rgba(0,0,0,0.3);
}
.learn-card-icon {
  font-size: 2rem;
  margin-bottom: 0.85rem;
}
.learn-card-title {
  font-weight: 700;
  font-size: 0.97rem;
  color: #e2e8f0;
  margin-bottom: 0.5rem;
}
.learn-card-desc {
  font-size: 0.82rem;
  color: #94a3b8;
  line-height: 1.6;
}
.learn-card-tag {
  display: inline-block;
  margin-top: 0.85rem;
  background: rgba(102,126,234,0.2);
  color: #a5b4fc;
  font-size: 0.72rem;
  font-weight: 700;
  padding: 0.22rem 0.6rem;
  border-radius: 6px;
}
@media (max-width: 600px) {
  .learn-grid { grid-template-columns: 1fr 1fr; }
}
</style>

<div class="learn-section">
  <div class="learn-eyebrow">🎯 How You'll Learn</div>
  <h2 class="learn-title">Learning, Augmented by AI</h2>
  <p class="learn-sub">
    Every week combines expert knowledge with AI-assisted hands-on practice —
    the same workflow you'll use in your research career.
  </p>

  <div class="learn-grid">
    <div class="learn-card">
      <div class="learn-card-icon">🎓</div>
      <div class="learn-card-title">Expert Lectures</div>
      <div class="learn-card-desc">Weekly talks by DDLS Fellows, SciLifeLab facility leaders, and KTH researchers using cutting-edge methods.</div>
      <span class="learn-card-tag">2 hrs/week</span>
    </div>
    <div class="learn-card">
      <div class="learn-card-icon">💻</div>
      <div class="learn-card-title">AI-Augmented Labs</div>
      <div class="learn-card-desc">Hands-on Google Colab notebooks with AI coding assistants. You direct the analysis; AI handles the boilerplate.</div>
      <span class="learn-card-tag">4 hrs/week</span>
    </div>
    <div class="learn-card">
      <div class="learn-card-icon">📖</div>
      <div class="learn-card-title">Journal Club</div>
      <div class="learn-card-desc">Critically read, present, and debate landmark papers in data-driven life sciences. AI helps you prepare.</div>
      <span class="learn-card-tag">2 hrs/week</span>
    </div>
    <div class="learn-card">
      <div class="learn-card-icon">🏗️</div>
      <div class="learn-card-title">Real Final Project</div>
      <div class="learn-card-desc">Build a working tool, web app, or analysis pipeline. Past students built apps that got deployed in real labs.</div>
      <span class="learn-card-tag">3 weeks</span>
    </div>
  </div>
</div>
