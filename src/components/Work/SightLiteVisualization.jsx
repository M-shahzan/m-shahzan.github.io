import React, { useEffect, useRef } from 'react';

export function SightLiteVisualization({ stage = 1 }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let rafId = null;
    let isVisible = true;
    let pulse = 0;

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

    function render() {
      if (!ctx || !canvas) return;
      const rect = canvas.getBoundingClientRect();
      const w = rect.width;
      const h = rect.height;

      if (w <= 0 || h <= 0) {
        rafId = requestAnimationFrame(render);
        return;
      }

      ctx.clearRect(0, 0, w, h);

      const isDark = document.documentElement.getAttribute('data-theme') !== 'light';
      const colors = {
        sightBg: isDark ? '#141118' : '#F8F7FC',
        sightHeader: isDark ? '#241C23' : '#FFFFFF',
        sightContent: isDark ? '#352933' : '#ECE8F7',
        sightCard: isDark ? '#241C23' : '#FFFFFF',
        sightStrip: isDark ? '#2D222B' : '#F5F2FF'
      };

      ctx.fillStyle = colors.sightBg;
      ctx.fillRect(0, 0, w, h);

      const padX = Math.max(14, w * 0.06);
      const innerW = Math.max(10, w - padX * 2);
      const headerY = Math.max(8, h * 0.05);
      const headerH = Math.max(16, h * 0.10);
      const contentY = headerY + headerH + Math.max(6, h * 0.04);
      const contentH = Math.max(26, h * 0.22);
      const cardsY = contentY + contentH + Math.max(6, h * 0.04);
      const cardsH = Math.max(32, h * 0.27);
      const cardGap = Math.max(8, w * 0.03);
      const cardW = Math.max(10, (innerW - cardGap) / 2);
      const stripY = cardsY + cardsH + Math.max(6, h * 0.04);
      const stripH = Math.max(18, Math.min(36, h - stripY - 8));

      // Header bar
      ctx.fillStyle = colors.sightHeader;
      ctx.fillRect(padX, headerY, innerW, headerH);

      // Main content block
      ctx.fillStyle = colors.sightContent;
      ctx.fillRect(padX, contentY, innerW, contentH);

      // Two column cards
      ctx.fillStyle = colors.sightCard;
      ctx.fillRect(padX, cardsY, cardW, cardsH);
      ctx.fillRect(padX + cardW + cardGap, cardsY, cardW, cardsH);

      // Sensitive input strip
      if (stripH > 8) {
        ctx.fillStyle = colors.sightStrip;
        ctx.fillRect(padX, stripY, innerW, stripH);
      }

      if (stage >= 2) {
        ctx.strokeStyle = 'rgba(56, 189, 248, 0.85)';
        ctx.lineWidth = 1.5;
        ctx.setLineDash([4, 4]);

        const btnW = Math.min(innerW * 0.35, 90);
        const btnH = headerH * 0.8;
        const btnX = padX + innerW - btnW - 4;
        const btnY = headerY + (headerH - btnH) / 2;

        ctx.strokeRect(btnX, btnY, btnW, btnH);
        ctx.fillStyle = '#38bdf8';
        const fontSize = Math.max(8, Math.min(9.5, w * 0.024));
        ctx.font = `${fontSize}px "JetBrains Mono", monospace`;
        ctx.fillText('AFFORDANCE', btnX + 4, btnY - 3);

        ctx.strokeRect(padX, cardsY, cardW, cardsH);
        ctx.fillText('CARD_EL', padX + 4, cardsY - 3);

        ctx.setLineDash([]);
      }

      if (stage >= 3 && stripH > 8) {
        ctx.fillStyle = 'rgba(244, 63, 94, 0.22)';
        ctx.fillRect(padX, stripY, innerW, stripH);
        ctx.strokeStyle = 'rgba(244, 63, 94, 0.8)';
        ctx.strokeRect(padX, stripY, innerW, stripH);

        ctx.fillStyle = '#f43f5e';
        const fontSize = Math.max(7.5, Math.min(9.5, w * 0.024));
        ctx.font = `${fontSize}px "JetBrains Mono", monospace`;
        const piiText = w < 400
          ? '[PII_MASKED // REDACTED]'
          : '[CLIENT_SIDE_PII_REDACTION // INPUT_MASKED]';
        ctx.fillText(piiText, padX + 8, stripY + stripH * 0.65);
      }

      if (stage >= 4) {
        pulse += 0.05;
        const startX = padX + innerW - 20;
        const startY = headerY + headerH / 2;
        const targetX = padX + cardW + cardGap + cardW / 2;
        const targetY = cardsY + cardsH / 2;

        ctx.beginPath();
        ctx.moveTo(startX, startY);
        ctx.quadraticCurveTo(w / 2, h / 2, targetX, targetY);
        ctx.strokeStyle = '#8b5cf6';
        ctx.lineWidth = 2.2;
        ctx.stroke();

        const markerAlpha = 0.5 + Math.sin(pulse) * 0.4;
        ctx.beginPath();
        ctx.arc(targetX, targetY, Math.max(4, Math.min(7, w * 0.016)), 0, Math.PI * 2);
        ctx.fillStyle = `rgba(139, 92, 246, ${markerAlpha})`;
        ctx.fill();
        ctx.strokeStyle = '#fff';
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      rafId = requestAnimationFrame(render);
    }

    rafId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [stage]);

  return <canvas id="sightlite-canvas" ref={canvasRef} />;
}
