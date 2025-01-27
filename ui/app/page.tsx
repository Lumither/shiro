'use client';

// import { invoke } from '@tauri-apps/api/core';
// import { useEffect, useState } from 'react';

export default function Home() {

    // const [ ret, setRet ] = useState(null);
    //
    // useEffect(() => {
    //     const fetchStr = async () => {
    //         setRet(await invoke('test', { msg: 'Hello World' }));
    //     };
    //     fetchStr();
    // }, []);

    return (
        <div className={ 'h-full w-full bg-amber-200' }>
            {/*{ ret }*/}
        </div>
    );
}
