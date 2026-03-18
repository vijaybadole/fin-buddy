'use client';

import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'success' | 'danger';
    size?: 'sm' | 'md' | 'lg';
    fullWidth?: boolean;
    isLoading?: boolean;
}

const variantStyles = {
    primary: 'bg-blue-600 hover:bg-blue-700 text-white',
    secondary: 'bg-gray-200 hover:bg-gray-300 text-gray-800',
    success: 'bg-green-600 hover:bg-green-700 text-white',
    danger: 'bg-red-600 hover:bg-red-700 text-white',
};

const sizeStyles = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
};

export const Button: React.FC<ButtonProps> = ({
    variant = 'primary',
    size = 'md',
    fullWidth = false,
    isLoading = false,
    disabled = false,
    children,
    className = '',
    ...props
}) => {
    return (
        <button
            disabled={disabled || isLoading}
            className={`
        rounded-lg font-semibold transition-colors duration-200
        ${variantStyles[variant]}
        ${sizeStyles[size]}
        ${fullWidth ? 'w-full' : ''}
        ${disabled || isLoading ? 'opacity-50 cursor-not-allowed' : ''}
        ${className}
      `}
            {...props}
        >
            {isLoading ? '⏳ Loading...' : children}
        </button>
    );
};
