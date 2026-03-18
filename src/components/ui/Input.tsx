'use client';

import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
    helpText?: string;
}

export const Input: React.FC<InputProps> = ({
    label,
    error,
    helpText,
    className = '',
    id,
    ...props
}) => {
    const inputId = id || label?.toLowerCase().replace(/\s+/g, '-');

    return (
        <div className="w-full">
            {label && (
                <label
                    htmlFor={inputId}
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                >
                    {label}
                </label>
            )}
            <input
                id={inputId}
                className={`
          w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600
          bg-white dark:bg-gray-700 text-gray-900 dark:text-white
          focus:ring-2 focus:ring-blue-500 focus:border-transparent
          transition-all duration-200
          ${error ? 'border-red-500 focus:ring-red-500' : ''}
          ${className}
        `}
                {...props}
            />
            {error && <p className="mt-1 text-sm text-red-600 dark:text-red-400">{error}</p>}
            {helpText && <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">{helpText}</p>}
        </div>
    );
};
