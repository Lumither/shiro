import type { Metadata } from 'next';
import './globals.css';
import React from 'react';
import { Providers } from '@/app/providers';
import Navbar from '@/app/Navbar';
import CmdPalette from '@/app/CmdPalette';

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
        <html lang="en" suppressHydrationWarning>
        <body
            className={ `antialiased` }
        >
        <div className={ 'absolute w-full h-12 z-10 blur-lg' } data-tauri-drag-region={ true } />
        <Providers>
            <div className={ 'flex flex-row w-full h-dvh bg-neutral-800' }>
                <Navbar className={ 'w-[150px] h-full flex-none bg-neutral-700' } />
                { children }
            </div>
            <CmdPalette className={ 'absolute top-2 inset-x-0' } />
        </Providers>
        </body>
        </html>
    );
}
