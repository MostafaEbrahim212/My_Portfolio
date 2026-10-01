import { useEffect, useRef } from 'react';

export function GlobalMouseTrail() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let points: { x: number; y: number; age: number }[] = [];
    let animationFrameId: number;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    resize();
    window.addEventListener('resize', resize);

    const onMouseMove = (e: MouseEvent) => {
      points.push({ x: e.clientX, y: e.clientY, age: 0 });
    };

    window.addEventListener('mousemove', onMouseMove);

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      if (points.length === 0) {
        animationFrameId = requestAnimationFrame(render);
        return;
      }

      const computedStyle = getComputedStyle(document.body);
      const pencilColor = computedStyle.getPropertyValue('--text-primary').trim() || '#2d2d2d';
      
      ctx.beginPath();
      
      // We draw segments with decreasing opacity based on age
      for (let i = 1; i < points.length; i++) {
        const p0 = points[i - 1];
        const p1 = points[i];
        
        ctx.beginPath();
        ctx.moveTo(p0.x, p0.y);
        ctx.lineTo(p1.x, p1.y);
        
        // Fading effect
        const opacity = Math.max(0, 1 - (p1.age / 40));
        
        ctx.strokeStyle = pencilColor;
        ctx.lineWidth = 3;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        ctx.globalAlpha = opacity * 0.3; // Max opacity 0.3 for subtlety
        ctx.stroke();
      }

      // Age points and remove old ones
      points.forEach(p => p.age += 1);
      points = points.filter(p => p.age < 40);
      
      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className="fixed inset-0 pointer-events-none z-[9999]"
      style={{ opacity: 0.8 }}
    />
  );
}
