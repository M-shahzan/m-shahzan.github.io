import React, { useState } from 'react';
import { BackgroundLayers } from './components/BackgroundLayers';
import { CustomCursor } from './components/CustomCursor';
import { Navigation } from './components/Navigation';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { WorkSection } from './components/Work/WorkSection';
import { Experiments } from './components/Experiments';
import { Contact } from './components/Contact';
import { useTheme } from './hooks/useTheme';
import { useSceneEngine } from './hooks/useSceneEngine';
import './styles/style.css';

export function App() {
  const { theme, toggleTheme } = useTheme();
  const [retinaStage, setRetinaStage] = useState(1);
  const [sightStage, setSightStage] = useState(1);

  const { navigateToScene } = useSceneEngine({
    onRetinaStageChange: setRetinaStage,
    onSightStageChange: setSightStage
  });

  return (
    <>
      <BackgroundLayers />
      <CustomCursor />
      <Navigation onNavigate={navigateToScene} />

      <main id="scenes-wrapper">
        <Hero theme={theme} onToggleTheme={toggleTheme} />
        <About />
        <WorkSection
          retinaStage={retinaStage}
          sightStage={sightStage}
          onRetinaStageChange={setRetinaStage}
          onSightStageChange={setSightStage}
        />
        <Experiments />
        <Contact />
      </main>
    </>
  );
}

export default App;
