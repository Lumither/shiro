import React from 'react';
import { FaServer } from 'react-icons/fa';
import { IoIosRocket } from 'react-icons/io';

const ICON_SIZE = '20px';

export const entries: { display_name: string; href: string; icon: React.ReactNode }[] = [
    {
        icon: <FaServer size={ ICON_SIZE }></FaServer>,
        display_name: 'Servers',
        href: '/servers'
    },
    {
        icon: <IoIosRocket size={ ICON_SIZE }></IoIosRocket>,
        display_name: 'Deploy',
        href: '/deploy'
    }
];
