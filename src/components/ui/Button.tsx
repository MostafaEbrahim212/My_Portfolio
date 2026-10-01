import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary';
}

export function Button({ variant = 'primary', className = '', children, ...props }: ButtonProps) {
  const baseClasses = "font-patrick text-lg md:text-2xl border-[3px] border-pencil rounded-wobbly transition-all duration-100 px-6 py-2 outline-none focus:ring-2 focus:ring-pen/20";
  
  const variants = {
    primary: "bg-paper text-pencil shadow-hard hover:bg-marker hover:text-white hover:shadow-hard-hover hover:translate-x-[2px] hover:translate-y-[2px] active:shadow-none active:translate-x-[4px] active:translate-y-[4px]",
    secondary: "bg-muted text-pencil shadow-hard hover:bg-pen hover:text-white hover:shadow-hard-hover hover:translate-x-[2px] hover:translate-y-[2px] active:shadow-none active:translate-x-[4px] active:translate-y-[4px]"
  };

  return (
    <button 
      className={`${baseClasses} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
