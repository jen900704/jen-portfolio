import { useEffect, useRef } from 'react';

/** A quiet, slowly drifting speech-like waveform drawn behind the hero. */
export function Waveform() {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)');
    let raf = 0;
    let visible = true;
    let w = 0, h = 0;
    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const r = canvas.getBoundingClientRect();
      w = r.width; h = r.height;
      canvas.width = Math.round(w * dpr); canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    const lines = [
      { amp: 0.34, f1: 1.6, f2: 5.3, speed: 0.22, phase: 0.0, alpha: 0.55, width: 1.6 },
      { amp: 0.26, f1: 2.1, f2: 7.1, speed: -0.17, phase: 1.3, alpha: 0.38, width: 1.2 },
      { amp: 0.20, f1: 1.2, f2: 9.4, speed: 0.13, phase: 2.6, alpha: 0.28, width: 1 },
      { amp: 0.14, f1: 2.8, f2: 4.2, speed: -0.26, phase: 4.1, alpha: 0.22, width: 1 },
    ];
    const draw = (t: number) => {
      const css = getComputedStyle(document.documentElement);
      const a = css.getPropertyValue('--wave-a').trim() || '#8a2e4d';
      const b = css.getPropertyValue('--wave-b').trim() || '#5b4b8a';
      ctx.clearRect(0, 0, w, h);
      const grad = ctx.createLinearGradient(0, 0, w, 0);
      grad.addColorStop(0, a); grad.addColorStop(1, b);
      ctx.strokeStyle = grad;
      const mid = h / 2;
      const s = t / 1000;
      for (const l of lines) {
        ctx.globalAlpha = l.alpha;
        ctx.lineWidth = l.width;
        ctx.beginPath();
        for (let x = 0; x <= w; x += 3) {
          const u = x / w;
          // syllable-like envelope: several soft bursts that drift slowly
          const env = 0.25 + 0.75 * Math.pow(Math.sin(Math.PI * u), 1.6) * (0.55 + 0.45 * Math.sin(u * 9 + s * 0.35 + l.phase));
          const y = mid + h * l.amp * env * (
            0.7 * Math.sin(u * Math.PI * 2 * l.f1 + s * l.speed * 2 + l.phase) +
            0.3 * Math.sin(u * Math.PI * 2 * l.f2 - s * l.speed * 3 + l.phase * 2)
          );
          if (x === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
        }
        ctx.stroke();
      }
      ctx.globalAlpha = 1;
    };
    const loop = (t: number) => {
      if (visible && !document.hidden) draw(t);
      raf = requestAnimationFrame(loop);
    };
    resize();
    const ro = new ResizeObserver(() => { resize(); draw(performance.now()); });
    ro.observe(canvas);
    const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; });
    io.observe(canvas);
    const start = () => {
      cancelAnimationFrame(raf);
      if (reduce.matches) draw(4000); else raf = requestAnimationFrame(loop);
    };
    start();
    reduce.addEventListener('change', start);
    const themeObs = new MutationObserver(() => draw(performance.now()));
    themeObs.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
    return () => { cancelAnimationFrame(raf); ro.disconnect(); io.disconnect(); themeObs.disconnect(); reduce.removeEventListener('change', start); };
  }, []);
  return <canvas ref={ref} className="waveform" aria-hidden="true" />;
}
