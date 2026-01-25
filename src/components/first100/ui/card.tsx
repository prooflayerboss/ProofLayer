import { HTMLAttributes, forwardRef } from 'react';

interface First100CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'highlighted';
}

export const First100Card = forwardRef<HTMLDivElement, First100CardProps>(
  ({ variant = 'default', className = '', children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={`
          rounded-xl p-6
          ${variant === 'highlighted' ? 'bg-emerald-50 border-2 border-emerald-500' : 'bg-white border border-gray-200'}
          ${className}
        `}
        {...props}
      >
        {children}
      </div>
    );
  }
);

First100Card.displayName = 'First100Card';

interface First100CardHeaderProps extends HTMLAttributes<HTMLDivElement> {}

export const First100CardHeader = forwardRef<HTMLDivElement, First100CardHeaderProps>(
  ({ className = '', children, ...props }, ref) => {
    return (
      <div ref={ref} className={`mb-4 ${className}`} {...props}>
        {children}
      </div>
    );
  }
);

First100CardHeader.displayName = 'First100CardHeader';

interface First100CardTitleProps extends HTMLAttributes<HTMLHeadingElement> {}

export const First100CardTitle = forwardRef<HTMLHeadingElement, First100CardTitleProps>(
  ({ className = '', children, ...props }, ref) => {
    return (
      <h3 ref={ref} className={`text-xl font-semibold text-gray-900 ${className}`} {...props}>
        {children}
      </h3>
    );
  }
);

First100CardTitle.displayName = 'First100CardTitle';

interface First100CardContentProps extends HTMLAttributes<HTMLDivElement> {}

export const First100CardContent = forwardRef<HTMLDivElement, First100CardContentProps>(
  ({ className = '', children, ...props }, ref) => {
    return (
      <div ref={ref} className={className} {...props}>
        {children}
      </div>
    );
  }
);

First100CardContent.displayName = 'First100CardContent';
