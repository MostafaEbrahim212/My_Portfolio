import { useState } from 'react';

export function LightSwitch({ isDark, toggle, isAr }: { isDark: boolean, toggle: () => void, isAr: boolean }) {
  const [isSwinging, setIsSwinging] = useState(false);

  const handleClick = () => {
    setIsSwinging(true);
    toggle();
    // Remove animation class after it finishes so it can swing again
    setTimeout(() => setIsSwinging(false), 2000);
  };

  return (
    <div 
      className={`fixed top-0 ${isAr ? 'left-10 md:left-24' : 'right-10 md:right-24'} z-[200] origin-top cursor-pointer ${isSwinging ? 'animate-swing' : ''}`}
      onClick={handleClick}
      title={isDark ? 'Light Mode' : 'Dark Mode'}
    >
      <svg width="24" height="150" viewBox="0 0 24 150" fill="none">
        {/* The Cord */}
        <line x1="12" y1="0" x2="12" y2="125" stroke="var(--text-primary)" strokeWidth="2" strokeDasharray="4 4" />
        {/* The Handle */}
        <path d="M7 125 L17 125 L20 145 L4 145 Z" fill="var(--bg-paper)" stroke="var(--text-primary)" strokeWidth="2" strokeLinejoin="round" />
        <circle cx="12" cy="148" r="3" fill="var(--text-primary)" />
      </svg>
    </div>
  );
}
