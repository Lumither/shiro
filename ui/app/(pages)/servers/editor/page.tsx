'use client';

import React from 'react';
import { useSearchParams } from 'next/navigation';
import ServerEditor from '@/app/(pages)/servers/editor/ServerEditor';

const Page = () => {
    const searchParams = useSearchParams();

    let sidString = searchParams.get('sid');
    if (sidString == null || searchParams.get('sid') == '') {
        // new server

        return (
            <>
                update
            </>
        );

    } else {
        // update server
        const sid = parseInt(sidString);
        return (
            <div>
                <ServerEditor />
            </div>
        );
    }
};

export default Page;