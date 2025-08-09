'use client';

import React from 'react';
import { SkipToContent } from './accessibility';

// Main layout wrapper
interface LayoutProps {
  children: React.ReactNode;
  className?: string;
}

export const Layout: React.FC<LayoutProps> = ({ children, className = '' }) => (
  <div className={`min-h-screen bg-gray-50 ${className}`}>
    <SkipToContent />
    <main id="main-content" className="flex-1">
      {children}
    </main>
  </div>
);

// Container component
interface ContainerProps {
  children: React.ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  className?: string;
}

export const Container: React.FC<ContainerProps> = ({ 
  children, 
  size = 'lg', 
  className = '' 
}) => {
  const sizeClasses = {
    sm: 'max-w-3xl',
    md: 'max-w-4xl',
    lg: 'max-w-6xl',
    xl: 'max-w-7xl',
    full: 'max-w-none'
  };

  return (
    <div className={`mx-auto px-4 sm:px-6 lg:px-8 ${sizeClasses[size]} ${className}`}>
      {children}
    </div>
  );
};

// Section component
interface SectionProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
}

export const Section: React.FC<SectionProps> = ({ children, className = '', id }) => (
  <section id={id} className={`py-12 md:py-16 ${className}`}>
    {children}
  </section>
);

// Card component
interface CardProps {
  children: React.ReactNode;
  className?: string;
  padding?: 'sm' | 'md' | 'lg';
  shadow?: 'sm' | 'md' | 'lg';
}

export const Card: React.FC<CardProps> = ({ 
  children, 
  className = '', 
  padding = 'md',
  shadow = 'md'
}) => {
  const paddingClasses = {
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8'
  };

  const shadowClasses = {
    sm: 'shadow-sm',
    md: 'shadow-lg',
    lg: 'shadow-xl'
  };

  return (
    <div className={`
      bg-white rounded-xl border border-gray-200 
      ${paddingClasses[padding]} 
      ${shadowClasses[shadow]}
      ${className}
    `}>
      {children}
    </div>
  );
};

// Grid component
interface GridProps {
  children: React.ReactNode;
  cols?: 1 | 2 | 3 | 4 | 6 | 12;
  gap?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

export const Grid: React.FC<GridProps> = ({ 
  children, 
  cols = 1, 
  gap = 'md',
  className = ''
}) => {
  const colsClasses = {
    1: 'grid-cols-1',
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4',
    6: 'grid-cols-2 md:grid-cols-3 lg:grid-cols-6',
    12: 'grid-cols-6 md:grid-cols-8 lg:grid-cols-12'
  };

  const gapClasses = {
    sm: 'gap-4',
    md: 'gap-6',
    lg: 'gap-8',
    xl: 'gap-12'
  };

  return (
    <div className={`
      grid ${colsClasses[cols]} ${gapClasses[gap]}
      ${className}
    `}>
      {children}
    </div>
  );
};

// Breadcrumb component
interface BreadcrumbItem {
  label: string;
  href?: string;
  current?: boolean;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  className?: string;
}

export const Breadcrumb: React.FC<BreadcrumbProps> = ({ items, className = '' }) => (
  <nav className={`flex ${className}`} aria-label="Breadcrumb">
    <ol className="flex items-center space-x-2">
      {items.map((item, index) => (
        <li key={index} className="flex items-center">
          {index > 0 && (
            <svg className="w-4 h-4 text-gray-400 mx-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
            </svg>
          )}
          {item.current ? (
            <span className="text-gray-500 font-medium">{item.label}</span>
          ) : (
            <a
              href={item.href}
              className="text-gray-600 hover:text-red-500 transition-colors duration-200"
            >
              {item.label}
            </a>
          )}
        </li>
      ))}
    </ol>
  </nav>
);
