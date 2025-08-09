'use client';

import React, { forwardRef } from 'react';

// Enhanced Input component
interface EnhancedInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  helpText?: string;
  required?: boolean;
  icon?: React.ReactNode;
}

export const EnhancedInput = forwardRef<HTMLInputElement, EnhancedInputProps>(
  ({ label, error, helpText, required, icon, className = '', ...props }, ref) => {
    const inputId = props.id || `input-${Math.random().toString(36).substr(2, 9)}`;

    return (
      <div className="space-y-2">
        <label 
          htmlFor={inputId} 
          className="block text-sm font-medium text-gray-900"
        >
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
        
        <div className="relative">
          {icon && (
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <div className="h-5 w-5 text-gray-400">{icon}</div>
            </div>
          )}
          
          <input
            ref={ref}
            id={inputId}
            className={`
              block w-full px-4 py-3 border rounded-lg shadow-sm
              ${icon ? 'pl-10' : ''}
              ${error 
                ? 'border-red-300 focus:ring-red-500 focus:border-red-500' 
                : 'border-gray-300 focus:ring-red-500 focus:border-red-500'
              }
              focus:outline-none focus:ring-2 transition-colors duration-200
              ${className}
            `}
            aria-invalid={error ? 'true' : 'false'}
            aria-describedby={error ? `${inputId}-error` : helpText ? `${inputId}-help` : undefined}
            {...props}
          />
        </div>
        
        {helpText && !error && (
          <p id={`${inputId}-help`} className="text-sm text-gray-600">
            {helpText}
          </p>
        )}
        
        {error && (
          <p id={`${inputId}-error`} className="text-sm text-red-600">
            {error}
          </p>
        )}
      </div>
    );
  }
);

EnhancedInput.displayName = 'EnhancedInput';

// Enhanced Select component
interface EnhancedSelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  options: { value: string; label: string }[];
  error?: string;
  helpText?: string;
  required?: boolean;
  placeholder?: string;
}

export const EnhancedSelect = forwardRef<HTMLSelectElement, EnhancedSelectProps>(
  ({ label, options, error, helpText, required, placeholder, className = '', ...props }, ref) => {
    const selectId = props.id || `select-${Math.random().toString(36).substr(2, 9)}`;

    return (
      <div className="space-y-2">
        <label 
          htmlFor={selectId} 
          className="block text-sm font-medium text-gray-900"
        >
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
        
        <select
          ref={ref}
          id={selectId}
          className={`
            block w-full px-4 py-3 border rounded-lg shadow-sm
            ${error 
              ? 'border-red-300 focus:ring-red-500 focus:border-red-500' 
              : 'border-gray-300 focus:ring-red-500 focus:border-red-500'
            }
            focus:outline-none focus:ring-2 transition-colors duration-200
            ${className}
          `}
          aria-invalid={error ? 'true' : 'false'}
          aria-describedby={error ? `${selectId}-error` : helpText ? `${selectId}-help` : undefined}
          {...props}
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        
        {helpText && !error && (
          <p id={`${selectId}-help`} className="text-sm text-gray-600">
            {helpText}
          </p>
        )}
        
        {error && (
          <p id={`${selectId}-error`} className="text-sm text-red-600">
            {error}
          </p>
        )}
      </div>
    );
  }
);

EnhancedSelect.displayName = 'EnhancedSelect';

// Form validation hook
export const useFormValidation = () => {
  const [errors, setErrors] = React.useState<Record<string, string>>({});
  const [touched, setTouched] = React.useState<Record<string, boolean>>({});

  const validateField = (name: string, value: string, rules: {
    required?: boolean;
    minLength?: number;
    pattern?: RegExp;
    custom?: (value: string) => string | undefined;
  }) => {
    const newErrors = { ...errors };

    if (rules.required && !value.trim()) {
      newErrors[name] = 'This field is required';
    } else if (rules.minLength && value.length < rules.minLength) {
      newErrors[name] = `Must be at least ${rules.minLength} characters`;
    } else if (rules.pattern && !rules.pattern.test(value)) {
      newErrors[name] = 'Invalid format';
    } else if (rules.custom) {
      const customError = rules.custom(value);
      if (customError) {
        newErrors[name] = customError;
      }
    } else {
      delete newErrors[name];
    }

    setErrors(newErrors);
    return !newErrors[name];
  };

  const handleBlur = (name: string) => {
    setTouched(prev => ({ ...prev, [name]: true }));
  };

  const isValid = Object.keys(errors).length === 0;

  return {
    errors,
    touched,
    validateField,
    handleBlur,
    isValid,
    setErrors
  };
};
