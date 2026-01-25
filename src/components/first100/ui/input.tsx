import { InputHTMLAttributes, forwardRef } from 'react';

interface First100InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const First100Input = forwardRef<HTMLInputElement, First100InputProps>(
  ({ label, error, className = '', id, ...props }, ref) => {
    const inputId = id || props.name;

    return (
      <div className="w-full">
        {label && (
          <label htmlFor={inputId} className="block text-sm font-medium text-gray-900 mb-1.5">
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={inputId}
          className={`
            w-full px-4 py-3
            bg-white
            border rounded-lg
            text-gray-900 placeholder:text-gray-500
            transition-colors duration-200
            focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500
            disabled:opacity-50 disabled:cursor-not-allowed
            ${error ? 'border-red-500' : 'border-gray-200'}
            ${className}
          `}
          {...props}
        />
        {error && <p className="mt-1.5 text-sm text-red-500">{error}</p>}
      </div>
    );
  }
);

First100Input.displayName = 'First100Input';
