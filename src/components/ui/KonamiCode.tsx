import { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { playPopSound } from '../../utils/audio';

export function KonamiCode() {
  useEffect(() => {
    const code = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
    let idx = 0;
    
    const keydown = (e: KeyboardEvent) => {
      // Ignore if typing in input
      if ((e.target as HTMLElement).tagName === 'INPUT' || (e.target as HTMLElement).tagName === 'TEXTAREA') return;
      
      if (e.key === code[idx]) {
        idx++;
        if (idx === code.length) {
          playPopSound();
          confetti({
            particleCount: 200,
            spread: 160,
            origin: { y: 0.5 },
            colors: ['#ff4d4d', '#4ade80', '#60a5fa', '#fbbf24']
          });
          // Secret message
          setTimeout(() => {
            alert("😎 You found the secret Konami Code! Mostafa is officially a nerd. Hire him!");
          }, 500);
          idx = 0;
        }
      } else {
        idx = 0;
      }
    };
    
    window.addEventListener('keydown', keydown);
    return () => window.removeEventListener('keydown', keydown);
  }, []);

  return null;
}
