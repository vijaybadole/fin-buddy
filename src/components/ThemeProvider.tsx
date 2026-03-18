'use client';

import { useEffect } from 'react';
import { useFinanceStore } from '@/store/useFinanceStore';

export function ThemeProvider({ children }: { children: React.ReactNode }) {
    const isDarkMode = useFinanceStore((state) => state.isDarkMode);

    useEffect(() => {
        const html = document.documentElement;
        if (isDarkMode) {
            html.classList.add('dark');
        } else {
            html.classList.remove('dark');
        }
    }, [isDarkMode]);

    return <>{children}</>;
}
