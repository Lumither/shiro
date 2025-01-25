import React from 'react';
import { entries } from '@/app/entries';
import { Button } from '@heroui/react';
import Link from 'next/link';

type Props = {
    className?: string;
}

const Navbar = (prop: Props) => {
    return (
        <div className={ `${ prop.className } grid` }>
            <div className={ 'content-center' }>
                <ul className={ `flex flex-col space-y-2 w-full justify-center px-4` }>
                    {
                        entries.map((meta, key) => (
                            <li key={ key }>
                                <Button
                                    as={ Link }
                                    variant={ `light` }
                                    color={ `default` }
                                    fullWidth
                                    className={ 'w-full' }
                                    aria-label={ `navbar: ${ meta.display_name }` }
                                    href={ meta.href }
                                    startContent={ meta.icon }
                                >
                                    <p className={ `` }>{ meta.display_name }</p>
                                </Button>
                            </li>
                        ))
                    }
                </ul>
            </div>
        </div>
    );
};

export default Navbar;