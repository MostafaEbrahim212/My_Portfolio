import React from 'react';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  decoration?: 'tape' | 'tack' | 'none';
  variant?: 'default' | 'postit';
  rotateOnHover?: boolean;
}

export function Card({ 
  decoration = 'none', 
  variant = 'default',
  rotateOnHover = true,
  className = '', 
  children, 
  ...props 
}: CardProps) {
  const baseClasses = "relative border-2 border-pencil rounded-wobblyMd shadow-hard-subtle p-6 transition-transform duration-200";
  const hoverClasses = rotateOnHover ? "hover:rotate-1 hover:shadow-hard" : "";
  const bgClass = variant === 'postit' ? 'bg-postit text-postit-text' : 'bg-paper text-pencil';

  return (
    <div className={`${baseClasses} ${bgClass} ${hoverClasses} ${className}`} {...props}>
      {decoration === 'tape' && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-24 h-8 bg-gray-400/40 backdrop-blur-sm -rotate-2 z-10" />
      )}
      {decoration === 'tack' && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-6 h-6 bg-marker rounded-full border-2 border-pencil shadow-sm z-10">
          <div className="absolute top-1 left-1 w-2 h-2 bg-white/50 rounded-full" />
        </div>
      )}
      {children}
    </div>
  );
}
