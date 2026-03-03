---
widget: blank
headless: true
weight: 35
title: What Students Say
design:
  columns: '1'
  background:
    color: 'rgb(12,17,44)'
    text_color_light: true
  spacing:
    padding: ['60px', '0', '60px', '0']
---

<style>
/* ===== Testimonials Widget (Home Page) ===== */
.tcard-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.25rem;
  margin: 1.5rem 0 0.5rem;
}
.tcard {
  background: linear-gradient(135deg, #1e2038 0%, #1a2744 100%);
  border: 1px solid #2d3a5c;
  border-radius: 16px;
  padding: 1.5rem;
  position: relative;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}
.tcard:hover {
  transform: translateY(-3px);
  box-shadow: 0 10px 28px rgba(102,126,234,0.25);
  border-color: rgba(102,126,234,0.4);
}
.tcard-quote-mark {
  font-size: 3.8rem;
  line-height: 1;
  color: #818cf8;
  opacity: 0.4;
  font-family: Georgia, serif;
  margin-bottom: -0.6rem;
  display: block;
}
.tcard blockquote {
  margin: 0;
  padding: 0;
  border: none;
  font-style: italic;
  font-size: 0.92rem;
  line-height: 1.7;
  color: #c9d6ef;
}
.tcard-author {
  margin-top: 1.1rem;
  display: flex;
  align-items: center;
  gap: 0.7rem;
}
.tcard-initials {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: 700;
  font-size: 0.88rem;
  flex-shrink: 0;
}
.tcard-name {
  font-weight: 700;
  font-size: 0.92rem;
  color: #e0e8ff;
  line-height: 1.3;
}
.tcard-role {
  font-size: 0.78rem;
  color: #667eea;
  font-weight: 600;
}
.tcard-cta-row {
  text-align: center;
  margin-top: 1.5rem;
}
.tcard-more-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: #fff !important;
  font-size: 0.88rem;
  font-weight: 600;
  padding: 0.5rem 1.4rem;
  border-radius: 8px;
  text-decoration: none !important;
  transition: opacity 0.15s ease, transform 0.15s ease;
}
.tcard-more-btn:hover {
  opacity: 0.88;
  transform: translateY(-1px);
  color: #fff !important;
}

@media (max-width: 640px) {
  .tcard-grid { grid-template-columns: 1fr; }
}
</style>

<div class="tcard-grid">

<div class="tcard">
  <span class="tcard-quote-mark">&ldquo;</span>
  <blockquote>
    The DDLS course broadened my general knowledge in data-driven life sciences. Throughout the course, we were learning how to use AI tools effectively. I was surprised by how quickly I could build my first web app!
  </blockquote>
  <div class="tcard-author">
    <div class="tcard-initials">KG</div>
    <div>
      <div class="tcard-name">Karin Garefelt</div>
      <div class="tcard-role">SciLifeLab &middot; Plankton Classification App</div>
    </div>
  </div>
</div>

<div class="tcard">
  <span class="tcard-quote-mark">&ldquo;</span>
  <blockquote>
    The course provided a solid introduction to applying agentic AI in both research and coding. The final project was especially useful as a chance to put the AI-supported coding workflows into practice.
  </blockquote>
  <div class="tcard-author">
    <div class="tcard-initials">LS</div>
    <div>
      <div class="tcard-name">Lasse Stahnke</div>
      <div class="tcard-role">KTH PhD Student &middot; AI-Supported Coding</div>
    </div>
  </div>
</div>

<div class="tcard">
  <span class="tcard-quote-mark">&ldquo;</span>
  <blockquote>
    This course was a great introduction to the world of data-driven life science research. It contained interesting lectures as well as hands-on experience working with Google Colab and Gemini CLI as an AI agent.
  </blockquote>
  <div class="tcard-author">
    <div class="tcard-initials">AJ</div>
    <div>
      <div class="tcard-name">Augusta Jensen</div>
      <div class="tcard-role">SciLifeLab &middot; AI-Assisted Research Demo</div>
    </div>
  </div>
</div>

</div>

<div class="tcard-cta-row">
  <a href="/showcase/" class="tcard-more-btn">
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
    Watch Student Project Videos
  </a>
</div>
