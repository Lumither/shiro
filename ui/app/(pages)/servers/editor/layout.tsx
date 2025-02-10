import React from 'react';

const Layout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
    return (
        <div className={ 'p-8 overflow-y-auto w-full flex justify-center' }>
            <div className={ 'contentWrapper' }>
                { children }
            </div>
        </div>
    );
};

export default Layout;
