'use client';

import React from 'react';
import { Button } from '@heroui/react';
import { HiPencil } from 'react-icons/hi2';

type Props = {
    className?: string
}

const tools = [
    {
        name: 'add',
        icon: <HiPencil size={ '15px' } />,
        action: () => {
        }
    }
];

const ToolBar = (prop: Props) => {
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