import React from 'react';
import { archiveProjects } from '../../data/archive';

export function Archive() {
  return (
    <section id="archive" className="scene scene-archive" data-scene-index="4" aria-label="Project Archive">
      <div className="archive-container">
        <div className="archive-top-bar">
          <h2 className="archive-main-heading">PROJECT ARCHIVE</h2>
          <span className="archive-tagline">SECONDARY SYSTEMS &bull; VERIFIED REPOSITORIES</span>
        </div>

        <div className="archive-rows-list">
          {archiveProjects.map((proj) => (
            <a
              key={proj.num}
              href={proj.url}
              target="_blank"
              rel="noopener noreferrer"
              className="archive-single-row"
              data-title={proj.modalTitle}
              data-metric={proj.modalMetric}
              data-cursor="VIEW"
            >
              <div className="archive-row-identity">
                <span className="archive-row-num">{proj.num}</span>
                <span className="archive-row-name">{proj.name}</span>
              </div>
              <div className="archive-row-meta">
                <span className="archive-tech-label">{proj.tech}</span>
                <svg className="archive-arrow-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M7 17L17 7M17 7H7M17 7V17" />
                </svg>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
