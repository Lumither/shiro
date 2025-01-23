import type { Metadata } from 'next';
import './globals.css';
import React from 'react';
import { ThemeProvider } from 'next-themes';

export const metadata: Metadata = {
    title: 'Shiro',
    description: 'A SSH host metadata manager'
};

export default function RootLayout({
    children
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
        <body
            className={ `antialiased cursor-default select-none` }
        >
        <div className={ 'absolute w-full h-7' } data-tauri-drag-region />
        <ThemeProvider>
            { children }
        </ThemeProvider>
        </body>
        </html>
    );
}
