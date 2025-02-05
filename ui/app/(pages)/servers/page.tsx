'use client';

import React, { useEffect, useState } from 'react';
import { invoke } from '@tauri-apps/api/core';
import { GServer } from '@/types/shiro';
import ToolBar from '@/app/(pages)/servers/ToolBar';
import ServerCard from '@/app/(pages)/servers/ServerCard';

const Page = () => {
    const [ serverList, setServerList ] = useState<GServer[] | null>(null);

    useEffect(() => {
        const fetchServers = async () => {
            invoke('get_servers')
                .then((res) => setServerList(res as GServer[]))
                .catch((e) => console.error(e));
        };
        fetchServers();
    }, []);

    return (
        <div className={ 'p-8 pt-0 overflow-y-auto w-full flex justify-center' }>
            <div className={ 'homePageWrapper' }>
                <ToolBar />
                <ul className={ 'grid sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4' }>
                    {
                        serverList?.map((server, key) => (
                            <li key={ key }>
                                <ServerCard gServer={ server } />
                            </li>
                        ))
                    }
                </ul>
            </div>
        </div>
    );
};

export default Page;