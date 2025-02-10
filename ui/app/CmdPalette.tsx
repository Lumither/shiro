'use client';

import React, { useEffect, useRef } from 'react';
import { Input, Kbd } from '@heroui/react';
import { FaTerminal } from 'react-icons/fa6';

type Props = {
    className?: string;
}

const CmdPalette = (prop: Props) => {

    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.metaKey && e.key === 'p') {
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
                classNames={ {
                    inputWrapper: [
                        'bg-neutral-700',
                        'group-data-[focus=true]:bg-neutral-700',
                    ]
                } }
                className={ 'searchBox z-10' }
                placeholder="Command"
                startContent={ <FaTerminal /> }
                ref={ inputRef }
                endContent={ <Kbd keys={ [ 'command' ] }>P</Kbd> }
            />
        </div>
    );
};

export default CmdPalette;