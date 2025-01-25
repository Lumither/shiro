'use client';

import React, { useEffect, useRef } from 'react';
import { Input, Kbd } from '@heroui/react';
import { IoSearch } from 'react-icons/io5';

type Props = {
    className?: string;
}

const GlobSearch = (prop: Props) => {

    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.metaKey && e.key === 'k') {
                if (inputRef.current) {
                    inputRef.current.focus();
                }
            }
        };
        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, []);

    return (
        <div className={ `${ prop.className } flex justify-center` }>
            <Input
                className={ 'searchBox z-10' }
                placeholder="Search"
                startContent={ <IoSearch /> }
                ref={ inputRef }
                endContent={ <Kbd keys={ [ 'command' ] }>K</Kbd> }
            />
        </div>
    );
};

export default GlobSearch;