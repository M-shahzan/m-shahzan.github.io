import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { resumeData } from '../data/resume';
import { personalLinks } from '../data/links';

export function ResumeModal({ isOpen, onClose }) {
  // Handle ESC key listener to dismiss modal
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    // Lock background scroll when open
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="resume-modal-backdrop" onClick={onClose} role="dialog" aria-modal="true" aria-label="Resume Document Viewer">
        <motion.div
          className="resume-modal-container"
          onClick={(e) => e.stopPropagation()}
          initial={{ opacity: 0, scale: 0.96, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 16 }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Modal Header Bar */}
          <div className="resume-modal-toolbar">
            <div className="resume-modal-toolbar-meta">
              <span className="resume-meta-badge">DOC // CURRICULUM VITAE</span>
              <span className="resume-meta-filename">MOHAMMED_SHAHZAN_ARMAR.PDF</span>
            </div>

            <div className="resume-modal-actions">
              <a
                href={personalLinks.resume}
                download="Mohammed_Shahzan_Armar_Resume.pdf"
                className="resume-action-btn"
                data-cursor="DOWNLOAD"
                aria-label="Download Resume PDF"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="7 10 12 15 17 10" />
                  <line x1="12" y1="15" x2="12" y2="3" />
                </svg>
                <span>Download PDF</span>
              </a>

              <a
                href={personalLinks.resume}
                target="_blank"
                rel="noopener noreferrer"
                className="resume-action-btn"
                data-cursor="OPEN"
                aria-label="Open PDF in new tab"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                  <polyline points="15 3 21 3 21 9" />
                  <line x1="10" y1="14" x2="21" y2="3" />
                </svg>
                <span>Open Tab</span>
              </a>

              <button
                type="button"
                className="resume-close-btn"
                onClick={onClose}
                data-cursor="CLOSE"
                aria-label="Close Resume Viewer"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>
          </div>

          {/* Scrollable Document Paper */}
          <div className="resume-sheet-viewport">
            <article className="resume-sheet">
              {/* HEADER */}
              <header className="resume-header">
                <h1 className="resume-name">{resumeData.header.name}</h1>
                <div className="resume-contacts">
                  <span className="resume-contact-item">{resumeData.header.phone}</span>
                  <span className="resume-sep">•</span>
                  <a href={`mailto:${resumeData.header.email}`} className="resume-link">
                    {resumeData.header.email}
                  </a>
                  {resumeData.header.links.map((link, idx) => (
                    <React.Fragment key={idx}>
                      <span className="resume-sep">•</span>
                      <a
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="resume-link"
                      >
                        {link.label} ↗
                      </a>
                    </React.Fragment>
                  ))}
                </div>
              </header>

              {/* EDUCATION */}
              <section className="resume-section">
                <h2 className="resume-section-heading">Education</h2>
                {resumeData.education.map((edu, idx) => (
                  <div key={idx} className="resume-entry">
                    <div className="resume-entry-top">
                      <span className="resume-entry-primary">{edu.institution}</span>
                      <span className="resume-entry-secondary">{edu.location}</span>
                    </div>
                    <div className="resume-entry-sub">
                      <span className="resume-entry-degree">{edu.degree}</span>
                      <span className="resume-entry-period">{edu.period}</span>
                    </div>
                  </div>
                ))}
              </section>

              {/* PROJECTS */}
              <section className="resume-section">
                <h2 className="resume-section-heading">Projects</h2>
                {resumeData.projects.map((proj, idx) => (
                  <div key={idx} className="resume-entry project-entry">
                    <div className="resume-project-title-row">
                      <span className="resume-entry-primary">{proj.title}</span>
                      <span className="resume-project-tech"> | {proj.tech}</span>
                    </div>
                    <ul className="resume-bullet-list">
                      {proj.bullets.map((bullet, bIdx) => (
                        <li key={bIdx} className="resume-bullet-item">{bullet}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </section>

              {/* TECHNICAL SKILLS */}
              <section className="resume-section">
                <h2 className="resume-section-heading">Technical Skills</h2>
                <div className="resume-skills-block">
                  <div className="resume-skill-line">
                    <strong className="resume-skill-cat">Languages:</strong>{' '}
                    <span>{resumeData.skills.languages}</span>
                  </div>
                  <div className="resume-skill-line">
                    <strong className="resume-skill-cat">ML & Data:</strong>{' '}
                    <span>{resumeData.skills.mlData}</span>
                  </div>
                  <div className="resume-skill-line">
                    <strong className="resume-skill-cat">Web & Tools:</strong>{' '}
                    <span>{resumeData.skills.webTools}</span>
                  </div>
                  <div className="resume-skill-line">
                    <strong className="resume-skill-cat">Coursework:</strong>{' '}
                    <span>{resumeData.skills.coursework}</span>
                  </div>
                </div>
              </section>

              {/* LEADERSHIP AND ACTIVITIES */}
              <section className="resume-section">
                <h2 className="resume-section-heading">Leadership and Activities</h2>
                {resumeData.leadership.map((item, idx) => (
                  <div key={idx} className="resume-entry">
                    <div className="resume-entry-top">
                      <span className="resume-entry-primary">{item.title}</span>
                      <span className="resume-entry-secondary">{item.org}</span>
                    </div>
                    <div className="resume-entry-sub">
                      <span className="resume-entry-degree">{item.role}</span>
                      <span className="resume-entry-period">{item.year}</span>
                    </div>
                    {item.bullets && item.bullets.length > 0 && (
                      <ul className="resume-bullet-list">
                        {item.bullets.map((b, bIdx) => (
                          <li key={bIdx} className="resume-bullet-item">{b}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </section>
            </article>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

export default ResumeModal;
