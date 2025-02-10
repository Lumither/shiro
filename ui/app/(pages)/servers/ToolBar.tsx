'use client';

import React from 'react';
import { Button } from '@heroui/react';
import { HiPencil } from 'react-icons/hi2';
import { useRouter } from 'next/navigation';

type Props = {
    className?: string
}

const ToolBar = (prop: Props) => {
    const router = useRouter();

    const tools = [
        {
            name: 'add',
            icon: <HiPencil size={ '15px' } />,
            action: () => {
                router.push('/servers/editor');
            }
        }
    ];

    return (
        <div className={ `${ prop.className } w-full my-2` }>
            <ul className={ 'flex flex-row justify-end' }>
                {
                    tools.map((tool, key) => (
                        <li key={ key }>
                            <Button
                                variant={ 'light' }
                                isIconOnly={ true }
                                onPress={ tool.action }
                            >
                                { tool.icon }
                            </Button>
                        </li>
                    ))
                }

            </ul>

        </div>
    );
};

export default ToolBar;