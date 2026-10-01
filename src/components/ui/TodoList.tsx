import { useState } from 'react';
import { Card } from './Card';
import { playPopSound } from '../../utils/audio';

export function TodoList({ tasks, title }: { tasks: string[], title: string }) {
  const [checked, setChecked] = useState<Record<number, boolean>>({});

  const toggle = (i: number) => {
    playPopSound();
    setChecked(prev => ({ ...prev, [i]: !prev[i] }));
  };

  return (
    <Card variant="postit" decoration="tack" className="-rotate-2 max-w-sm mx-auto shadow-hard-lg">
      <h3 className="text-2xl font-kalam mb-4 border-b-2 border-pencil/30 pb-2 text-postit-text">{title}</h3>
      <ul className="space-y-3">
        {tasks.map((task, i) => (
          <li key={i} className="flex items-start gap-3 cursor-pointer group" onClick={() => toggle(i)}>
            <div className={`w-6 h-6 mt-1 border-2 border-pencil rounded-wobbly flex items-center justify-center shrink-0 transition-colors ${checked[i] ? 'bg-paper' : 'bg-transparent'}`}>
              {checked[i] && (
                <svg viewBox="0 0 24 24" className="w-5 h-5 text-marker" stroke="currentColor" strokeWidth="4" fill="none" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 6 9 17l-5-5"/>
                </svg>
              )}
            </div>
            <span className={`text-xl font-patrick transition-all duration-300 text-postit-text ${checked[i] ? 'line-through opacity-50 decoration-wavy decoration-marker' : 'group-hover:opacity-70'}`}>
              {task}
            </span>
          </li>
        ))}
      </ul>
    </Card>
  );
}
