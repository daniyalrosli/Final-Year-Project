// src/components/ui/input.tsx

import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

export const Input: React.FC<InputProps> = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, className, ...props }, ref) => {
    return (
      <div className={`flex flex-col ${className}`}>
        {label && <label className="text-gray-700 text-sm font-medium mb-1" htmlFor={props.id}>{label}</label>}
        <input
          ref={ref}
          className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-red-500"
          {...props}
        />
      </div>
    );
  }
);

Input.displayName = 'Input'; // Display name for debugging