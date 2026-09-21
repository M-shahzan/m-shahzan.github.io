import React from 'react';

export function About() {
  return (
    <section id="about" className="scene scene-about" data-scene-index="1" aria-label="About Mohammed Shahzan Armar">
      <div className="about-content-container">
        <div className="about-layout-grid" id="about-intro-grid">
          {/* Left: Big Statement & Restrained Orbital Geometry */}
          <div className="about-statement-col">
            <span className="about-tag-marker">ABOUT</span>
            <h2 className="about-progressive-headline" id="about-headline">
              <span className="about-word-first">I BUILD</span><br />
              <span className="about-word-second">WITH DATA.</span>
            </h2>

            {/* Restrained Orbital Geometry Visual */}
            <div className="about-orbital-visual" aria-hidden="true">
              <svg className="about-orbital-svg" viewBox="0 0 220 220" fill="none">
                <circle
                  cx="110"
                  cy="110"
                  r="95"
                  stroke="rgba(255,255,255,0.06)"
                  strokeWidth="1"
                  strokeDasharray="3 5"
                />
                <circle cx="110" cy="110" r="68" stroke="rgba(139,92,246,0.35)" strokeWidth="1.5" />
                <ellipse
                  cx="110"
                  cy="110"
                  rx="84"
                  ry="38"
                  stroke="rgba(56,189,248,0.28)"
                  strokeWidth="1"
                  transform="rotate(-28 110 110)"
                />
                <ellipse
                  cx="110"
                  cy="110"
                  rx="52"
                  ry="88"
                  stroke="rgba(139,92,246,0.2)"
                  strokeWidth="1"
                  transform="rotate(32 110 110)"
                />
                <circle cx="110" cy="110" r="4.5" fill="#8b5cf6" />
                <circle cx="168" cy="86" r="3" fill="#38bdf8" />
              </svg>
            </div>
          </div>

          {/* Right: Short Editorial Copy */}
          <div className="about-narrative-col" id="about-narrative">
            <p className="about-lead-para">
              I'm a final-year B.E. Computer Science and Engineering (Data Science) student focused on building
              explainable, deployable machine learning systems.
            </p>
            <p className="about-sub-para">
              My work spans computer vision, explainable AI, edge inference, and practical ML deployment.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;
