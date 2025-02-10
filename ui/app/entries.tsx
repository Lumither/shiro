import React from 'react';
import { FaLayerGroup, FaTags } from 'react-icons/fa6';
import { IoIosRocket } from 'react-icons/io';
import { FaServer } from 'react-icons/fa';

const ICON_SIZE = '20px';

export const entries: { display_name: string; href: string; icon: React.ReactNode }[] = [
    {
        icon: <FaServer size={ ICON_SIZE }></FaServer>,
        display_name: 'Servers',
        href: '/servers'
    },
    {
        icon: <FaLayerGroup size={ ICON_SIZE }></FaLayerGroup>,
        display_name: 'Groups',
        href: '/groups'
    },
    {
        icon: <FaTags size={ ICON_SIZE }></FaTags>,
        display_name: 'Tags',
        href: '/tags'
    },
    {
        icon: <IoIosRocket size={ ICON_SIZE }></IoIosRocket>,
        display_name: 'Deploy',
        href: '/deploy'
    }
];
