import type { Metadata } from 'next';
import './globals.css';
import React from 'react';
import { Providers } from '@/app/providers';
import Navbar from '@/app/Navbar';
import GlobSearch from '@/app/GlobSearch';

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
        <div className={ 'absolute w-full h-12 z-10' } data-tauri-drag-region={ true } />
        <Providers>
            <div className={ 'flex flex-row w-full h-dvh' }>
                <Navbar className={ 'w-[200px] h-full' } />
                { children }
            </div>
            <GlobSearch className={ 'absolute top-2 inset-x-0' } />
        </Providers>
        </body>
        </html>
    );
}
