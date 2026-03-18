'use client';

import React from 'react';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode;
}

export const Card: React.FC<CardProps> = ({ children, className = '', ...props }) => {
    return (
        <div
            className={`bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 ${className}`}
            {...props}
        >
            {children}
        </div>
    );
};

export const CardHeader: React.FC<CardProps> = ({ children, className = '', ...props }) => {
    return (
        <div className={`mb-4 pb-4 border-b border-gray-200 dark:border-gray-700 ${className}`} {...props}>
            {children}
        </div>
    );
};

export const CardContent: React.FC<CardProps> = ({ children, className = '', ...props }) => {
    return (
        <div className={className} {...props}>
            {children}
        </div>
    );
};

export const CardFooter: React.FC<CardProps> = ({ children, className = '', ...props }) => {
    return (
        <div className={`mt-4 pt-4 border-t border-gray-200 dark:border-gray-700 ${className}`} {...props}>
            {children}
        </div>
    );
};
