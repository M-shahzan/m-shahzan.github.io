import React from 'react';
import { motion } from 'motion/react';
import { HomeAmbientCanvas } from './HomeAmbientCanvas';

export function Hero({ theme, onToggleTheme }) {
  const isLight = theme === 'light';

  return (
    <section id="home" className="scene scene-home" data-scene-index="0" aria-label="Mohammed Shahzan Armar">
      {/* Ambient Canvas */}
      <HomeAmbientCanvas />

      {/* Architectural Typographic Coordinate System (Top-Left Screen Anchor) */}
      <div className="hero-coord-anchor" id="hero-coord-anchor">
        <div className="coord-item">
          <span className="coord-dim">REF //</span> IDENTITY
        </div>
        <motion.button
          id="theme-system-control"
          className="coord-item theme-system-control"
          type="button"
          aria-label={isLight ? 'Switch to Dark Rose theme' : 'Switch to Violet Night theme'}
          data-cursor="THEME"
          data-theme={theme}
          onClick={onToggleTheme}
          whileHover={{ scale: 1.03, x: 2 }}
          whileTap={{ scale: 0.96 }}
          transition={{ duration: 0.15 }}
        >
          <span className="coord-dim">SYS //</span> 13.582&deg; N
          <span className="theme-system-hint" aria-hidden="true">
            {isLight ? 'THEME // DARK ROSE' : 'THEME // VIOLET NIGHT'}
          </span>
        </motion.button>
        <div className="coord-item">
          <span className="coord-dim">ENG //</span> ML &bull; CV &bull; DATA
        </div>
      </div>

      <div className="hero-spatial-canvas">
        {/* Two-Line Editorial Name Lockup */}
        <div className="hero-name-composition" id="hero-name-container">
          <div className="hero-name-row line-top">
            <h1 className="hero-display-word word-mohammed" id="hero-word-1">Mohammed</h1>
          </div>
          <div className="hero-name-row line-bottom">
            <h1 className="hero-display-word word-shahzan-armar" id="hero-word-2">
              <span className="part-shahzan">Shahzan</span>
              <span className="part-armar">Armar</span>
            </h1>
          </div>
        </div>

        {/* Minimal Editorial Descriptor with Dash Separator */}
        <div className="hero-descriptor-strip" id="hero-descriptor-wrap">
          <span className="hero-dash-rule" aria-hidden="true"></span>
          <p className="hero-descriptor-text">MACHINE LEARNING &nbsp;/&nbsp; COMPUTER VISION &nbsp;/&nbsp; DATA</p>
        </div>
      </div>
    </section>
  );
}
