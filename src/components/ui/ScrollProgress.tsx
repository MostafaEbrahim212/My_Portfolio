import { useEffect, useRef } from 'react';

export function ScrollProgress() {
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrollY = window.scrollY;
          const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
          if (height > 0 && barRef.current) {
            barRef.current.style.height = `${(scrollY / height) * 100}%`;
          }
          ticking = false;
        });
        ticking = true;
      }
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // init
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="fixed right-2 top-0 w-3 h-full z-[100] pointer-events-none hidden md:block">
      <div 
        ref={barRef}
        className="w-full bg-pencil transition-all duration-75 ease-out rounded-b-full border-2 border-pencil"
        style={{ height: '0%' }}
      >
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-4 h-4 bg-paper border-2 border-pencil rounded-full"></div>
      </div>
    </div>
  );
}
