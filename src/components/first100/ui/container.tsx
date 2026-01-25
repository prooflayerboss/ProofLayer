import { HTMLAttributes, forwardRef } from 'react';

interface First100ContainerProps extends HTMLAttributes<HTMLDivElement> {
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

const sizes = {
  sm: 'max-w-2xl',
  md: 'max-w-4xl',
  lg: 'max-w-6xl',
  xl: 'max-w-7xl',
};

export const First100Container = forwardRef<HTMLDivElement, First100ContainerProps>(
  ({ size = 'lg', className = '', children, ...props }, ref) => {
    return (
      <div ref={ref} className={`mx-auto px-4 sm:px-6 lg:px-8 ${sizes[size]} ${className}`} {...props}>
        {children}
      </div>
    );
  }
);

First100Container.displayName = 'First100Container';
