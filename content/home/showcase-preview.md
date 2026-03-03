---
widget: blank
headless: true
weight: 28
title: ''
design:
  columns: '1'
  background:
    color: 'rgb(8,12,30)'
    text_color_light: true
  spacing:
    padding: ['60px', '0', '60px', '0']
---

<style>
.sp-section {
  max-width: 960px;
  margin: 0 auto;
  padding: 0 1.5rem;
}
.sp-header {
  text-align: center;
  margin-bottom: 2.5rem;
}
.sp-eyebrow {
  display: inline-block;
  background: linear-gradient(135deg, #11998e, #38ef7d);
  color: #fff;
  font-size: 0.75rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  padding: 0.3rem 0.9rem;
  border-radius: 999px;
  margin-bottom: 1rem;
}
.sp-title {
  font-size: clamp(1.6rem, 4vw, 2.4rem);
  font-weight: 900;
  color: #f1f5f9 !important;
  margin: 0 0 0.6rem;
  letter-spacing: -0.02em;
}
.sp-sub {
  font-size: 1rem;
  color: #94a3b8;
  max-width: 580px;
  margin: 0 auto;
  line-height: 1.7;
}
.sp-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.25rem;
  margin-bottom: 2rem;
}
.sp-card {
  background: rgba(255,255,255,0.05);
  border: 1px solid rgba(255,255,255,0.1);
  border-radius: 16px;
  overflow: hidden;
  transition: transform 0.2s, box-shadow 0.2s, border-color 0.2s;
  box-shadow: 0 2px 8px rgba(0,0,0,0.2);
}
.sp-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 14px 36px rgba(102,126,234,0.25);
  border-color: rgba(165,180,252,0.5);
}
.sp-thumb {
  position: relative;
  aspect-ratio: 16/9;
  background: linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}
.sp-thumb-overlay {
  position: absolute;
  inset: 0;
  opacity: 0.18;
}
.sp-thumb-overlay.g1 { background: linear-gradient(135deg, #667eea, #764ba2); }
.sp-thumb-overlay.g2 { background: linear-gradient(135deg, #11998e, #38ef7d); }
.sp-thumb-overlay.g3 { background: linear-gradient(135deg, #f093fb, #f5576c); }
.sp-play {
  width: 56px;
  height: 56px;
  background: rgba(255,255,255,0.92);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  z-index: 1;
  transition: transform 0.15s, background 0.15s;
}
.sp-card:hover .sp-play { transform: scale(1.12); background: #fff; }
.sp-play svg { width: 22px; height: 22px; fill: #667eea; margin-left: 3px; }
.sp-decor {
  position: absolute;
  font-size: 2.8rem;
  opacity: 0.1;
  color: #fff;
  user-select: none;
}
.sp-decor.tl { top: 0.5rem; left: 0.75rem; }
.sp-decor.br { bottom: 0.5rem; right: 0.75rem; }
.sp-body { padding: 1.1rem 1.2rem 1.3rem; }
.sp-tag {
  font-size: 0.72rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: #667eea;
  margin-bottom: 0.3rem;
}
.sp-name {
  font-weight: 700;
  font-size: 0.97rem;
  color: #e2e8f0;
  margin-bottom: 0.4rem;
}
.sp-desc {
  font-size: 0.82rem;
  color: #94a3b8;
  line-height: 1.5;
  margin-bottom: 0.85rem;
}
.sp-watch {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  background: linear-gradient(135deg, #667eea, #764ba2);
  color: #fff !important;
  font-size: 0.8rem;
  font-weight: 600;
  padding: 0.4rem 0.95rem;
  border-radius: 8px;
  text-decoration: none !important;
  transition: opacity 0.15s, transform 0.15s;
}
.sp-watch:hover { opacity: 0.87; transform: translateY(-1px); color: #fff !important; }
.sp-watch svg { width: 13px; height: 13px; fill: currentColor; }
.sp-cta-row {
  text-align: center;
  margin-top: 0.5rem;
}
.sp-more-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  border: 2px solid #818cf8;
  color: #818cf8 !important;
  font-size: 0.9rem;
  font-weight: 700;
  padding: 0.65rem 1.75rem;
  border-radius: 10px;
  text-decoration: none !important;
  transition: background 0.15s, color 0.15s, transform 0.15s;
}
.sp-more-btn:hover {
  background: #818cf8;
  color: #fff !important;
  transform: translateY(-2px);
}
@media (max-width: 768px) {
  .sp-grid { grid-template-columns: 1fr; }
}
</style>

<div class="sp-section">
<div class="sp-header">
<div class="sp-eyebrow">🎬 Student Projects</div>
<h2 class="sp-title">What Past Students Built</h2>
<p class="sp-sub">
The final project is 3 weeks of building something real — AI-powered tools,
web apps, and research demos used by actual labs.
</p>
</div>

<div class="sp-grid">

<div class="sp-card">
<a href="https://drive.google.com/file/d/1x7oETvVaafs2IaQ9I_qRwtxDK8rzLW7K/view" target="_blank" rel="noopener" style="text-decoration:none;">
<div class="sp-thumb">
<div class="sp-thumb-overlay g1"></div>
<span class="sp-decor tl">🔬</span>
<div class="sp-play"><svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg></div>
<span class="sp-decor br">🧬</span>
</div>
</a>
<div class="sp-body">
<div class="sp-tag">🌊 Environmental Science · SciLifeLab</div>
<div class="sp-name">Karin Garefelt</div>
<div class="sp-desc">Built a full-stack web app for classifying plankton from IFCB flow cytometry images — deployed at SciLifeLab and now used by researchers.</div>
<a href="https://drive.google.com/file/d/1x7oETvVaafs2IaQ9I_qRwtxDK8rzLW7K/view" target="_blank" rel="noopener" class="sp-watch">
<svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
Watch Presentation
</a>
</div>
</div>

<div class="sp-card">
<a href="https://drive.google.com/file/d/1V1KTlZGfuHrkeY69tJ6gblYrd3ln3cfD/view" target="_blank" rel="noopener" style="text-decoration:none;">
<div class="sp-thumb">
<div class="sp-thumb-overlay g2"></div>
<span class="sp-decor tl">🤖</span>
<div class="sp-play"><svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg></div>
<span class="sp-decor br">💻</span>
</div>
</a>
<div class="sp-body">
<div class="sp-tag">⚡ AI Coding Workflows · KTH PhD</div>
<div class="sp-name">Lasse Stahnke</div>
<div class="sp-desc">Developed an AI-assisted coding workflow tool that uses agents to automate data analysis pipelines — from raw data to publishable figures.</div>
<a href="https://drive.google.com/file/d/1V1KTlZGfuHrkeY69tJ6gblYrd3ln3cfD/view" target="_blank" rel="noopener" class="sp-watch">
<svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
Watch Presentation
</a>
</div>
</div>

<div class="sp-card">
<a href="https://drive.google.com/file/d/1N6Eyys-mgpR1myEzDuMHLMgMghkPOKD2/view" target="_blank" rel="noopener" style="text-decoration:none;">
<div class="sp-thumb">
<div class="sp-thumb-overlay g3"></div>
<span class="sp-decor tl">🧪</span>
<div class="sp-play"><svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg></div>
<span class="sp-decor br">🔭</span>
</div>
</a>
<div class="sp-body">
<div class="sp-tag">🔬 Research Automation · SciLifeLab</div>
<div class="sp-name">Augusta Jensen</div>
<div class="sp-desc">Created an AI-driven research demo showing how an AI agent can search literature, summarize findings, and propose next experimental steps.</div>
<a href="https://drive.google.com/file/d/1N6Eyys-mgpR1myEzDuMHLMgMghkPOKD2/view" target="_blank" rel="noopener" class="sp-watch">
<svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
Watch Presentation
</a>
</div>
</div>

</div>

<div class="sp-cta-row">
<a href="/showcase/" class="sp-more-btn">
<svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
See All 21 Student Projects →
</a>
</div>
</div>
