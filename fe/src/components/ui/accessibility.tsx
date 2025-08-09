'use client';

import React, { useEffect, useRef } from 'react';

// Skip to main content link for screen readers
export const SkipToContent: React.FC = () => (
  <a
    href="#main-content"
    className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-red-500 text-white px-4 py-2 rounded-lg z-50"
  >
    Skip to main content
  </a>
);

// Focus trap for modals
export const FocusTrap: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const focusableElements = container.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );

    const firstElement = focusableElements[0] as HTMLElement;
    const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Tab') {
        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            e.preventDefault();
            lastElement.focus();
          }
        } else {
          if (document.activeElement === lastElement) {
            e.preventDefault();
            firstElement.focus();
          }
        }
      }
    };

    container.addEventListener('keydown', handleKeyDown);
    firstElement?.focus();

    return () => {
      container.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return <div ref={containerRef}>{children}</div>;
};

// Screen reader only text
export const ScreenReaderOnly: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <span className="sr-only">{children}</span>
);

// Visually hidden but accessible
export const VisuallyHidden: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <span className="sr-only">{children}</span>
);

// Live region for announcements
export const LiveRegion: React.FC<{ 
  children: React.ReactNode;
  'aria-live'?: 'polite' | 'assertive';
  'aria-atomic'?: boolean;
}> = ({ children, 'aria-live': ariaLive = 'polite', 'aria-atomic': ariaAtomic = true }) => (
  <div
    aria-live={ariaLive}
    aria-atomic={ariaAtomic}
    className="sr-only"
  >
    {children}
  </div>
);
