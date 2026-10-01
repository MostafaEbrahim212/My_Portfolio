import { useState } from 'react';
import { Card } from './Card';
import { playPopSound } from '../../utils/audio';

export function GithubGraph({ title }: { title: string }) {
  const [isHrMode, setIsHrMode] = useState(true);

  // HIRE ME pattern (cols). 1 means colored, 0 means empty.
  const H = [[1,1,1,1,1], [0,0,1,0,0], [0,0,1,0,0], [1,1,1,1,1]];
  const I = [[1,1,1,1,1]];
  const R = [[1,1,1,1,1], [1,0,1,0,0], [1,0,1,0,0], [0,1,0,1,1]];
  const E = [[1,1,1,1,1], [1,0,1,0,1], [1,0,1,0,1], [1,0,0,0,1]];
  const M = [[1,1,1,1,1], [0,1,0,0,0], [0,0,1,0,0], [0,1,0,0,0], [1,1,1,1,1]];
  
  const sp = [[0,0,0,0,0]]; // 1 col space
  const wordSp = [[0,0,0,0,0], [0,0,0,0,0], [0,0,0,0,0]]; // 3 col space
  
  const messageCols = [
    ...H, ...sp, ...I, ...sp, ...R, ...sp, ...E, 
    ...wordSp, 
    ...M, ...sp, ...E
  ];
  
  const leftPad = Array.from({ length: 11 }, () => [0,0,0,0,0]);
  const rightPad = Array.from({ length: 12 }, () => [0,0,0,0,0]);
  
  const fullCols = [...leftPad, ...messageCols, ...rightPad];
  
  // Pad each column to 7 days
  const hireMeWeeks = fullCols.map(col => [0, ...col, 0]);

  // Generate a random lazy pattern (only a few commits here and there)
  const [lazyWeeks] = useState(() => 
    Array.from({ length: 52 }, () => 
      Array.from({ length: 7 }, () => Math.random() > 0.85 ? Math.floor(Math.random() * 2) + 1 : 0)
    )
  );

  const displayWeeks = isHrMode ? hireMeWeeks : lazyWeeks;

  const toggleMode = () => {
    playPopSound();
    setIsHrMode(!isHrMode);
  };

  return (
    <Card decoration="tape" className="rotate-1 overflow-hidden">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 mb-4">
        <h3 className="text-xl md:text-2xl font-kalam flex items-center justify-center flex-wrap gap-2 text-center sm:text-start w-full sm:w-auto">
          <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className="text-pencil shrink-0"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path><path d="M9 18c-4.51 2-5-2-7-2"></path></svg>
          <span className="leading-tight">{title}</span>
          <span className="text-sm text-pencil/50 ml-2 hidden sm:inline">(100% Real)</span>
        </h3>
        
        <button 
          onClick={toggleMode}
          className={`px-4 py-1.5 md:py-1 rounded-wobbly border-2 border-pencil font-patrick text-sm transition-colors whitespace-nowrap w-full sm:w-auto flex justify-center ${isHrMode ? 'bg-emerald-300 dark:bg-emerald-700 text-pencil dark:text-paper' : 'bg-paper hover:bg-muted text-pencil'}`}
        >
          {isHrMode ? '👀 HR is Watching' : '😴 Normal Mode'}
        </button>
      </div>

      <div className="flex sm:hidden justify-center items-center gap-2 mb-2 text-pencil/50 text-sm animate-pulse font-patrick">
        <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><path d="M17 8l4 4-4 4"></path><path d="M3 12h18"></path><path d="M7 8l-4 4 4 4"></path></svg>
        <span>Swipe to see more</span>
      </div>

      <div className="overflow-x-auto pb-4 custom-scrollbar" dir="ltr">
        <div className="flex gap-1 w-max">
          {displayWeeks.map((week, i) => (
            <div key={i} className="flex flex-col gap-1">
              {week.map((day, j) => {
                let bg = 'bg-transparent border-pencil/20';
                if (day > 0) {
                  // Use a stable, highly visible intensity for the letters
                  const intensity = isHrMode ? 4 : day;
                  if (intensity === 1) bg = 'bg-emerald-200 dark:bg-emerald-900 border-emerald-400';
                  if (intensity === 2) bg = 'bg-emerald-300 dark:bg-emerald-700 border-emerald-500';
                  if (intensity === 3) bg = 'bg-emerald-400 dark:bg-emerald-600 border-emerald-600';
                  if (intensity === 4) bg = 'bg-emerald-500 dark:bg-emerald-500 border-emerald-700';
                }
                
                return (
                  <div 
                    key={j} 
                    className={`w-3 h-3 md:w-4 md:h-4 rounded-sm border-[1px] ${bg} transition-colors duration-500 hover:scale-125 cursor-pointer`}
                    style={{ transitionDelay: `${(i * 10) + (j * 5)}ms` }}
                    title={day > 0 ? 'Commits!' : 'No contributions'}
                  />
                )
              })}
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
}
