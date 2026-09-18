import React from 'react';

export function BackgroundLayers() {
  return (
    <>
      <div className="bg-layer-noise" aria-hidden="true" />
      <div className="bg-layer-grid" aria-hidden="true" />
      <div id="ambient-light" className="bg-layer-light" aria-hidden="true" />
    </>
  );
}
