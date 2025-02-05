import React from 'react';

const Layout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
    return (
        <div className={ 'h-full w-full pt-12 overflow-scroll' }>
            { children }
        </div>
    );
};

export default Layout;