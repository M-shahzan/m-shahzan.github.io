import React, { useEffect, useRef } from 'react';

export function HomeAmbientCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let rafId = null;
    let nodes = [];
    let mouseNormX = 0;
    let mouseNormY = 0;

    const handleMouseMove = (e) => {
      mouseNormX = (e.clientX / window.innerWidth) * 2 - 1;
      mouseNormY = (e.clientY / window.innerHeight) * 2 - 1;

      // Cursor parallax on hero text elements
      const coordAnchor = document.getElementById('hero-coord-anchor');
      if (coordAnchor) {
        coordAnchor.style.transform = `translate(${(mouseNormX * 4).toFixed(1)}px, ${(mouseNormY * 4).toFixed(1)}px)`;
      }

      const word1 = document.getElementById('hero-word-1');
      if (word1) {
        word1.style.transform = `translate(${(mouseNormX * 2.5).toFixed(1)}px, ${(mouseNormY * 2.5).toFixed(1)}px)`;
      }

      const word2 = document.getElementById('hero-word-2');
      if (word2) {
        word2.style.transform = `translate(${(mouseNormX * -2.0).toFixed(1)}px, ${(mouseNormY * -2.0).toFixed(1)}px)`;
      }

      const descWrap = document.getElementById('hero-descriptor-wrap');
      if (descWrap) {
        descWrap.style.transform = `translate(${(mouseNormX * 1.5).toFixed(1)}px, ${(mouseNormY * 1.5).toFixed(1)}px)`;
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    const initNodes = (w, h) => {
      nodes = [];
      const count = 32;
      for (let i = 0; i < count; i++) {
        const angle = Math.random() * Math.PI * 2;
        const dist = Math.min(w, h) * (0.28 + Math.random() * 0.42);
        const nx = w / 2 + Math.cos(angle) * dist;
        const ny = h / 2 + Math.sin(angle) * dist;

        nodes.push({
          x: Math.max(20, Math.min(w - 20, nx)),
          y: Math.max(20, Math.min(h - 20, ny)),
          vx: (Math.random() - 0.5) * 0.22,
          vy: (Math.random() - 0.5) * 0.22,
          radius: Math.random() * 1.5 + 1.1,
          alpha: Math.random() * 0.22 + 0.12
        });
      }
    };

    const resizeCanvas = () => {
      if (!canvas || !ctx) return;
      const rect = canvas.getBoundingClientRect();
      const w = rect.width || window.innerWidth;
      const h = rect.height || window.innerHeight;
      const dpr = window.devicePixelRatio || 1;
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      initNodes(w, h);
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const render = () => {
      if (!ctx || !canvas) return;
      const rect = canvas.getBoundingClientRect();
      const w = rect.width;
      const h = rect.height;

      if (w <= 0 || h <= 0) {
        rafId = requestAnimationFrame(render);
        return;
      }

      ctx.clearRect(0, 0, w, h);

      // Lines
      ctx.lineWidth = 0.6;
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 135) {
            const lineAlpha = (1 - dist / 135) * 0.08;
            ctx.strokeStyle = `rgba(139, 92, 246, ${lineAlpha})`;
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.stroke();
          }
        }
      }

      // Nodes
      const isDark = document.documentElement.getAttribute('data-theme') !== 'light';
      const nodePrefix = isDark ? 'rgba(255, 255, 255, ' : 'rgba(124, 58, 237, ';

      for (let k = 0; k < nodes.length; k++) {
        const n = nodes[k];
        n.x += n.vx + mouseNormX * 0.12;
        n.y += n.vy + mouseNormY * 0.12;

        if (n.x < 0) n.x = w;
        if (n.x > w) n.x = 0;
        if (n.y < 0) n.y = h;
        if (n.y > h) n.y = 0;

        ctx.beginPath();
        ctx.arc(n.x, n.y, n.radius, 0, Math.PI * 2);
        ctx.fillStyle = `${nodePrefix}${n.alpha})`;
        ctx.fill();
      }

      rafId = requestAnimationFrame(render);
    };

    rafId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', resizeCanvas);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <canvas
      id="home-ambient-canvas"
      ref={canvasRef}
      className="home-ambient-canvas"
      aria-hidden="true"
    />
  );
}
