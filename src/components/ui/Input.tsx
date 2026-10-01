import React from 'react';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className = '', ...props }, ref) => {
    return (
      <input
        className={`flex h-12 w-full bg-paper border-2 border-pencil rounded-wobbly px-4 py-2 font-patrick text-lg placeholder:text-pencil/40 outline-none transition-colors focus:border-pen focus:ring-2 focus:ring-pen/20 ${className}`}
        ref={ref}
        {...props}
      />
    );
  }
);

Input.displayName = "Input";
