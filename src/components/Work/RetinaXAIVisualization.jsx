import React, { useEffect, useRef } from 'react';

export function RetinaXAIVisualization({ stage = 1 }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let rafId = null;
    let angle = 0;
    let isVisible = false;

    const resizeCanvas = () => {
      const rect = canvas.getBoundingClientRect();
      const w = rect.width || 300;
      const h = rect.height || 300;
      const dpr = window.devicePixelRatio || 1;
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        isVisible = entry.isIntersecting;
        if (isVisible) {
          if (!rafId) rafId = requestAnimationFrame(render);
        } else {
          if (rafId) {
            cancelAnimationFrame(rafId);
            rafId = null;
          }
        }
      });
    }, { threshold: 0.05 });

    observer.observe(canvas);

    const render = () => {
      if (!ctx || !canvas || !isVisible) return;
      const rect = canvas.getBoundingClientRect();
      const w = rect.width;
      const h = rect.height;

      if (w <= 0 || h <= 0) {
        rafId = requestAnimationFrame(render);
        return;
      }

      const cx = w / 2;
      const cy = h / 2;
      const radius = Math.min(w, h) * 0.38;

      if (radius <= 0) {
        rafId = requestAnimationFrame(render);
        return;
      }

      ctx.clearRect(0, 0, w, h);

      const isDark = document.documentElement.getAttribute('data-theme') !== 'light';
      const retinaBg = isDark ? '#1C171E' : '#F0EEF8';

      ctx.save();
      ctx.beginPath();
      ctx.arc(cx, cy, radius, 0, Math.PI * 2);
      ctx.fillStyle = retinaBg;
      ctx.fill();
      ctx.strokeStyle = stage >= 2 ? 'rgba(139, 92, 246, 0.45)' : 'rgba(255, 255, 255, 0.12)';
      ctx.lineWidth = 1.5;
      ctx.stroke();
      ctx.clip();

      const vesselColor = stage >= 2 ? '#a855f7' : 'rgba(255, 255, 255, 0.22)';
      ctx.strokeStyle = vesselColor;
      ctx.lineWidth = stage >= 2 ? 2.5 : 1.2;

      const discX = cx + radius * 0.35;
      const discY = cy - radius * 0.05;

      for (let i = 0; i < 6; i++) {
        const a = (i * Math.PI) / 3 + angle * 0.02;
        ctx.beginPath();
        ctx.moveTo(discX, discY);
        const cpX = discX - Math.cos(a) * (radius * 0.6);
        const cpY = discY + Math.sin(a) * (radius * 0.7);
        const endX = discX - Math.cos(a + 0.4) * (radius * 1.1);
        const endY = discY + Math.sin(a + 0.4) * (radius * 1.1);
        ctx.quadraticCurveTo(cpX, cpY, endX, endY);
        ctx.stroke();
      }

      ctx.beginPath();
      ctx.arc(discX, discY, radius * 0.16, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(255, 255, 255, 0.08)';
      ctx.fill();

      if (stage >= 3) {
        ctx.strokeStyle = 'rgba(56, 189, 248, 0.15)';
        ctx.lineWidth = 1;
        const gridStep = 24;
        for (let x = cx - radius; x <= cx + radius; x += gridStep) {
          ctx.beginPath();
          ctx.moveTo(x, cy - radius);
          ctx.lineTo(x, cy + radius);
          ctx.stroke();
        }
        for (let y = cy - radius; y <= cy + radius; y += gridStep) {
          ctx.beginPath();
          ctx.moveTo(cx - radius, y);
          ctx.lineTo(cx + radius, y);
          ctx.stroke();
        }
      }

      if (stage >= 4) {
        const r1 = Math.max(1, radius * 0.42);
        const heatGrad1 = ctx.createRadialGradient(cx - radius * 0.1, cy + radius * 0.1, 4, cx - radius * 0.1, cy + radius * 0.1, r1);
        heatGrad1.addColorStop(0, 'rgba(244, 63, 94, 0.75)');
        heatGrad1.addColorStop(0.5, 'rgba(139, 92, 246, 0.45)');
        heatGrad1.addColorStop(1, 'rgba(0, 0, 0, 0)');
        ctx.fillStyle = heatGrad1;
        ctx.beginPath();
        ctx.arc(cx - radius * 0.1, cy + radius * 0.1, r1, 0, Math.PI * 2);
        ctx.fill();

        const r2 = Math.max(1, radius * 0.25);
        const heatGrad2 = ctx.createRadialGradient(cx + radius * 0.1, cy - radius * 0.25, 2, cx + radius * 0.1, cy - radius * 0.25, r2);
        heatGrad2.addColorStop(0, 'rgba(244, 63, 94, 0.65)');
        heatGrad2.addColorStop(0.6, 'rgba(56, 189, 248, 0.35)');
        heatGrad2.addColorStop(1, 'rgba(0, 0, 0, 0)');
        ctx.fillStyle = heatGrad2;
        ctx.beginPath();
        ctx.arc(cx + radius * 0.1, cy - radius * 0.25, r2, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.restore();
      angle += 0.01;
      rafId = requestAnimationFrame(render);
    };

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      observer.disconnect();
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [stage]);

  return <canvas id="retinaxai-canvas" ref={canvasRef} />;
}
