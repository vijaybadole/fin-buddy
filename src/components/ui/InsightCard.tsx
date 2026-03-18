'use client';

import React from 'react';

type InsightType = 'success' | 'warning' | 'info' | 'error';

interface InsightCardProps {
    type?: InsightType;
    title: string;
    value?: string | number;
    description?: string;
    icon?: React.ReactNode;
}

const typeStyles = {
    success: 'bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-800',
    warning: 'bg-yellow-50 border-yellow-200 dark:bg-yellow-900/20 dark:border-yellow-800',
    info: 'bg-blue-50 border-blue-200 dark:bg-blue-900/20 dark:border-blue-800',
    error: 'bg-red-50 border-red-200 dark:bg-red-900/20 dark:border-red-800',
};

const typeTextStyles = {
    success: 'text-green-900 dark:text-green-100',
    warning: 'text-yellow-900 dark:text-yellow-100',
    info: 'text-blue-900 dark:text-blue-100',
    error: 'text-red-900 dark:text-red-100',
};

export const InsightCard: React.FC<InsightCardProps> = ({
    type = 'info',
    title,
    value,
    description,
    icon,
}) => {
    return (
        <div className={`rounded-lg border p-4 ${typeStyles[type]}`}>
            <div className="flex items-start gap-3">
                {icon && <div className="mt-1">{icon}</div>}
                <div className="flex-1">
                    <h3 className={`text-sm font-semibold ${typeTextStyles[type]}`}>{title}</h3>
                    {value && (
                        <p className={`text-2xl font-bold mt-2 ${typeTextStyles[type]}`}>{value}</p>
                    )}
                    {description && (
                        <p className={`text-sm mt-2 ${typeTextStyles[type]} opacity-75`}>{description}</p>
                    )}
                </div>
            </div>
        </div>
    );
};
