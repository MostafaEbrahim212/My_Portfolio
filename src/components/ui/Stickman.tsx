import { useEffect, useState, useRef } from 'react';

export function Stickman({ isAr }: { isAr: boolean }) {
  const [mousePos, setMousePos] = useState({ x: window.innerWidth / 2, y: window.innerHeight / 2 });
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ticking = false;
    const handleMove = (e: MouseEvent) => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setMousePos({ x: e.clientX, y: e.clientY });
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener('mousemove', handleMove);
    return () => window.removeEventListener('mousemove', handleMove);
  }, []);

  // Calculate eye offsets based on mouse position
  let eyeX = 0;
  let eyeY = 0;
  
  if (containerRef.current) {
    const rect = containerRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const dx = mousePos.x - centerX;
    const dy = mousePos.y - centerY;
    const angle = Math.atan2(dy, dx);
    const maxRadius = 3;
    
    eyeX = Math.cos(angle) * maxRadius;
    eyeY = Math.sin(angle) * maxRadius;
  }

  return (
    <div 
      ref={containerRef}
      className={`fixed bottom-0 ${isAr ? 'left-8 md:left-16' : 'right-8 md:right-16'} z-[90] pointer-events-none hidden sm:block`}
    >
      <svg width="80" height="120" viewBox="0 0 80 120" fill="none" stroke="var(--text-primary)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
        {/* Head */}
        <circle cx="40" cy="30" r="15" fill="var(--bg-paper)" />
        
        {/* Eyes (moving) */}
        <circle cx={35 + eyeX} cy={28 + eyeY} r="2" fill="var(--text-primary)" stroke="none" />
        <circle cx={45 + eyeX} cy={28 + eyeY} r="2" fill="var(--text-primary)" stroke="none" />
        
        {/* Smile */}
        <path d="M35 36 Q 40 40 45 36" />
        
        {/* Body */}
        <line x1="40" y1="45" x2="40" y2="80" />
        
        {/* Arms (waving slightly or resting) */}
        <path d="M40 55 Q 25 50 15 40" className="animate-pulse" />
        <path d="M40 55 Q 55 65 65 75" />
        
        {/* Legs */}
        <line x1="40" y1="80" x2="25" y2="115" />
        <line x1="40" y1="80" x2="55" y2="115" />
      </svg>
      
      {/* Speech bubble */}
      <div className={`absolute -top-12 ${isAr ? 'left-10' : 'right-10'} bg-paper border-2 border-pencil rounded-wobbly px-3 py-1 text-sm whitespace-nowrap opacity-0 transition-opacity hover:opacity-100 group-hover:opacity-100`}>
        {isAr ? 'أنا براقبك! 👀' : 'I see you! 👀'}
      </div>
    </div>
  );
}
