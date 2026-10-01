import { useState, useEffect } from 'react';
import { playPaperSound } from '../../utils/audio';

export function CoffeeStains() {
  const [stains, setStains] = useState<{ id: number, x: number, y: number, rot: number }[]>([]);

  useEffect(() => {
    const handleDblClick = (e: MouseEvent) => {
      // Don't add stains if clicking on interactive elements
      if ((e.target as HTMLElement).closest('button, a, input, textarea, canvas')) return;
      
      const newStain = {
        id: Date.now(),
        x: e.pageX,
        y: e.pageY,
        rot: Math.random() * 360
      };
      setStains(prev => [...prev, newStain]);
      playPaperSound();
    };

    window.addEventListener('dblclick', handleDblClick);
    return () => window.removeEventListener('dblclick', handleDblClick);
  }, []);

  return (
    <div className="absolute top-0 left-0 w-full h-full pointer-events-none z-[100] overflow-visible">
      {stains.map(stain => (
        <div 
          key={stain.id} 
          className="absolute opacity-80 dark:opacity-60 mix-blend-multiply dark:mix-blend-normal animate-in fade-in zoom-in duration-300"
          style={{ 
            left: stain.x - 75, 
            top: stain.y - 75, 
            transform: `rotate(${stain.rot}deg)`,
            width: 150, height: 150
          }}
        >
          <svg viewBox="0 0 100 100" fill="currentColor" className="text-[#6F4E37] dark:text-[#8b6545]">
            <path d="M45 15 C 60 10 80 20 85 40 C 90 60 70 85 45 85 C 20 85 10 65 15 40 C 20 15 30 20 45 15 Z" stroke="currentColor" strokeWidth="4" fill="none" strokeDasharray="10 4" />
            <path d="M40 20 C 55 15 75 25 80 45 C 85 65 65 80 40 80 C 25 80 15 60 20 45 C 25 25 30 25 40 20 Z" fill="currentColor" opacity="0.3" />
            <circle cx="20" cy="70" r="3" />
            <circle cx="80" cy="30" r="5" />
            <circle cx="75" cy="80" r="4" />
          </svg>
        </div>
      ))}
    </div>
  );
}
