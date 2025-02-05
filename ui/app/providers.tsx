'use client';

import { HeroUIProvider } from '@heroui/react';
import { ThemeProvider, useTheme } from 'next-themes';
import { Slide, ToastContainer } from 'react-toastify';
import React from 'react';

export function Providers({ children }: { children: React.ReactNode }) {

    const { theme } = useTheme();
    // todo: fix undefined theme issue

    return (
        <ThemeProvider>
            <HeroUIProvider>
                { children }
                <ToastContainer
                    position="bottom-right"
                    autoClose={ 1000 }
                    hideProgressBar={ false }
                    newestOnTop={ false }
                    closeOnClick
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    transition={ Slide }
                    theme={ 'dark' }
                />
            </HeroUIProvider>
        </ThemeProvider>
    );
}