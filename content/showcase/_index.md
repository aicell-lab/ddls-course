---
title: "Student Project Showcase"
summary: "Watch what DDLS students built — AI-powered life science apps and tools created during the final project."
date: "2025-01-01"
type: page
---

<style>
/* ===== Showcase Page Styles ===== */
.showcase-hero {
  text-align: center;
  padding: 2.5rem 1rem 2rem;
}
.showcase-hero .badge-row {
  display: flex;
  justify-content: center;
  gap: 0.75rem;
  flex-wrap: wrap;
  margin: 1.25rem 0 0.5rem;
}
.showcase-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: #fff;
  font-size: 0.82rem;
  font-weight: 600;
  padding: 0.35rem 0.9rem;
  border-radius: 999px;
  letter-spacing: 0.02em;
}
.showcase-badge.green  { background: linear-gradient(135deg, #11998e 0%, #38ef7d 100%); }
.showcase-badge.blue   { background: linear-gradient(135deg, #2193b0 0%, #6dd5ed 100%); }
.showcase-lead {
  max-width: 700px;
  margin: 1rem auto 0;
  font-size: 1.1rem;
  line-height: 1.7;
  color: #555;
}

/* ===== Testimonials strip ===== */
.testimonials-strip {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.25rem;
  margin: 2rem 0 2.5rem;
}
.testimonial-card {
  background: linear-gradient(135deg, #f8f9ff 0%, #e8f4ff 100%);
  border: 1px solid #dce8ff;
  border-radius: 16px;
  padding: 1.5rem;
  position: relative;
}
.testimonial-card::before {
  content: '\201C';
  position: absolute;
  top: 0.6rem;
  left: 1rem;
  font-size: 3.5rem;
  line-height: 1;
  color: #667eea;
  opacity: 0.35;
  font-family: Georgia, serif;
}
.testimonial-card blockquote {
  margin: 0;
  padding: 0;
  border: none;
  font-style: italic;
  font-size: 0.93rem;
  line-height: 1.65;
  color: #333;
  padding-top: 1.2rem;
}
.testimonial-author {
  margin-top: 1rem;
  display: flex;
  align-items: center;
  gap: 0.65rem;
}
.testimonial-avatar {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: linear-gradient(135deg, #667eea, #764ba2);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: 700;
  font-size: 0.85rem;
  flex-shrink: 0;
}
.testimonial-name {
  font-weight: 700;
  font-size: 0.9rem;
  color: #1a1a2e;
}
.testimonial-affil {
  font-size: 0.78rem;
  color: #667eea;
}

/* ===== Video gallery grid ===== */
.showcase-section-title {
  font-size: 1.5rem;
  font-weight: 800;
  margin: 0 0 0.4rem;
  color: #1a1a2e;
}
.showcase-section-sub {
  color: #666;
  font-size: 0.95rem;
  margin-bottom: 1.75rem;
}
.video-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 1.25rem;
  margin-bottom: 3rem;
}
.video-card {
  background: #fff;
  border: 1px solid #e5e7eb;
  border-radius: 16px;
  overflow: hidden;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  box-shadow: 0 2px 8px rgba(0,0,0,0.06);
}
.video-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 32px rgba(102,126,234,0.18);
  border-color: #c3cffe;
}
.video-thumb {
  position: relative;
  aspect-ratio: 16/9;
  background: linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}
.video-thumb-gradient {
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  opacity: 0.15;
}
.play-btn {
  width: 54px;
  height: 54px;
  background: rgba(255,255,255,0.92);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  z-index: 1;
  transition: transform 0.15s ease, background 0.15s ease;
}
.video-card:hover .play-btn {
  transform: scale(1.12);
  background: #fff;
}
.play-btn svg {
  width: 22px;
  height: 22px;
  fill: #667eea;
  margin-left: 3px;
}
.video-dna-decor {
  position: absolute;
  font-size: 3rem;
  opacity: 0.08;
  color: #fff;
  user-select: none;
}
.video-dna-decor.top-left  { top: 0.5rem; left: 0.75rem; }
.video-dna-decor.bot-right { bottom: 0.5rem; right: 0.75rem; }
.video-card-body {
  padding: 1rem 1.1rem 1.1rem;
}
.video-student-name {
  font-weight: 700;
  font-size: 0.95rem;
  color: #1a1a2e;
  margin-bottom: 0.35rem;
}
.video-project-label {
  font-size: 0.8rem;
  color: #667eea;
  font-weight: 600;
  letter-spacing: 0.03em;
  text-transform: uppercase;
  margin-bottom: 0.5rem;
}
.video-project-desc {
  font-size: 0.83rem;
  color: #666;
  line-height: 1.5;
  margin-bottom: 0.85rem;
}
.video-watch-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: #fff !important;
  font-size: 0.82rem;
  font-weight: 600;
  padding: 0.42rem 1rem;
  border-radius: 8px;
  text-decoration: none !important;
  transition: opacity 0.15s ease, transform 0.15s ease;
}
.video-watch-btn:hover {
  opacity: 0.88;
  transform: translateY(-1px);
  color: #fff !important;
}
.video-watch-btn svg {
  width: 14px;
  height: 14px;
  fill: currentColor;
}

/* Dark mode tweaks */
@media (prefers-color-scheme: dark) {
  .testimonial-card { background: linear-gradient(135deg, #1e2038 0%, #1a2744 100%); border-color: #2d3a5c; }
  .testimonial-card blockquote { color: #d0d8f0; }
  .showcase-lead { color: #a0aec0; }
  .showcase-section-sub { color: #8892a4; }
  .video-card { background: #1a1a2e; border-color: #2d3a5c; }
  .video-student-name { color: #e0e8ff; }
  .video-project-desc { color: #8892a4; }
  .testimonial-name { color: #e0e8ff; }
}

/* Responsive */
@media (max-width: 640px) {
  .video-grid { grid-template-columns: 1fr; }
  .testimonials-strip { grid-template-columns: 1fr; }
}
</style>

<div class="showcase-hero">
  <div class="badge-row">
    <span class="showcase-badge">🎓 KTH Royal Institute of Technology</span>
    <span class="showcase-badge green">🧬 SciLifeLab</span>
    <span class="showcase-badge blue">🤖 AI-Powered Projects</span>
  </div>
  <p class="showcase-lead">
    See what students built during the Data-Driven Life Sciences course —
    AI-assisted tools, web apps, and research workflows at the intersection of
    biology and machine learning.
  </p>
</div>

---

## What Students Say

<div class="testimonials-strip">

<div class="testimonial-card">
  <blockquote>
    "The DDLS course broadened my general knowledge in data-driven life sciences. In computer labs and literature seminars, we were immersed in different fields of life sciences each week. Throughout the course, we were learning how to use AI tools effectively. I was surprised by how quickly I could build my first web app!"
  </blockquote>
  <div class="testimonial-author">
    <div class="testimonial-avatar">KG</div>
    <div>
      <div class="testimonial-name">Karin Garefelt</div>
      <div class="testimonial-affil">SciLifeLab &middot; IFCB Plankton Classification App</div>
    </div>
  </div>
  <div style="margin-top:1rem;">
    <a href="https://drive.google.com/file/d/1x7oETvVaafs2IaQ9I_qRwtxDK8rzLW7K/view" target="_blank" rel="noopener" style="display:inline-flex;align-items:center;gap:0.4rem;background:linear-gradient(135deg,#667eea,#764ba2);color:#fff;font-size:0.82rem;font-weight:600;padding:0.38rem 0.95rem;border-radius:8px;text-decoration:none;">
      <svg width="13" height="13" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg> Watch Project Video
    </a>
  </div>
</div>

<div class="testimonial-card">
  <blockquote>
    "The course provided a solid introduction to applying agentic AI in both research and coding. I appreciated being introduced to a range of different problem types and tasks within data-driven life sciences. The final project was especially useful as a chance to put the AI-supported coding workflows into practice."
  </blockquote>
  <div class="testimonial-author">
    <div class="testimonial-avatar">LS</div>
    <div>
      <div class="testimonial-name">Lasse Stahnke</div>
      <div class="testimonial-affil">KTH PhD Student &middot; AI-Supported Coding Workflows</div>
    </div>
  </div>
  <div style="margin-top:1rem;">
    <a href="https://drive.google.com/file/d/1V1KTlZGfuHrkeY69tJ6gblYrd3ln3cfD/view" target="_blank" rel="noopener" style="display:inline-flex;align-items:center;gap:0.4rem;background:linear-gradient(135deg,#667eea,#764ba2);color:#fff;font-size:0.82rem;font-weight:600;padding:0.38rem 0.95rem;border-radius:8px;text-decoration:none;">
      <svg width="13" height="13" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg> Watch Project Video
    </a>
  </div>
</div>

<div class="testimonial-card">
  <blockquote>
    "This course was a great introduction to the world of data-driven life science research. It contained interesting lectures as well as hands-on experience working with Google Colab and Gemini CLI as an AI agent. I also appreciated the discussions during journal clubs."
  </blockquote>
  <div class="testimonial-author">
    <div class="testimonial-avatar">AJ</div>
    <div>
      <div class="testimonial-name">Augusta Jensen</div>
      <div class="testimonial-affil">SciLifeLab &middot; AI-Assisted Research Demo</div>
    </div>
  </div>
  <div style="margin-top:1rem;">
    <a href="https://drive.google.com/file/d/1N6Eyys-mgpR1myEzDuMHLMgMghkPOKD2/view" target="_blank" rel="noopener" style="display:inline-flex;align-items:center;gap:0.4rem;background:linear-gradient(135deg,#667eea,#764ba2);color:#fff;font-size:0.82rem;font-weight:600;padding:0.38rem 0.95rem;border-radius:8px;text-decoration:none;">
      <svg width="13" height="13" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg> Watch Project Video
    </a>
  </div>
</div>

</div>


---

## Want to Be Part of the Next Cohort?

The DDLS course is open to all KTH Master's and PhD students, as well as SciLifeLab researchers and external participants interested in data-driven approaches to life sciences.

{{< cta cta_link="/course/ddls-2025/" cta_text="Explore DDLS 2025" >}}
