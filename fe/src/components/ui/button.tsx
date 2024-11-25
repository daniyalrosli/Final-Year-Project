// src/components/ui/button.tsx

import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary';
}

export const Button: React.FC<ButtonProps> = ({ variant = 'primary', className, children, ...props }) => {
  const baseStyles = 'py-2 px-4 rounded-md transition-colors focus:outline-none';
  const variantStyles = variant === 'primary'
    ? 'bg-red-500 hover:bg-red-600 text-white'
    : 'bg-gray-300 hover:bg-gray-400 text-black';

  return (
    <button className={`${baseStyles} ${variantStyles} ${className}`} {...props}>
      {children}
    </button>
  );
};