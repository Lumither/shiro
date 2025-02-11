import React, { createContext, useState } from 'react';
import {
    Button,
    Divider
} from '@heroui/react';
import Generals from '@/app/(pages)/servers/editor/generals';
import SshConfigs from '@/app/(pages)/servers/editor/sshConfigs';
import { SshConfigRecord } from '@/types/shiro';

export const ConfigListContext = createContext<{
    configList: SshConfigRecord[],
    setConfigList: React.Dispatch<React.SetStateAction<SshConfigRecord[]>>
} | undefined>(undefined);

const ServerEditor = () => {
    const [ name, setName ] = useState('');
    const [ ip, setIp ] = useState('');
    const [ group, setGroup ] = useState<Set<string>>(new Set([]));
    const [ tags, setTags ] = useState<Set<string>>(new Set([]));
    const [ description, setDescription ] = useState('');
    const [ configList, setConfigList ] = useState<SshConfigRecord[]>([]);

    return (
        <div>
            {/* todo: port? */ }
            {/* todo: autocompletion */ }
            {/* todo: wrap types / rewrite with useContext */ }
            <Generals
                setName={ setName }
                ip={ ip }
                setIp={ setIp }
                setGroup={ setGroup }
                tags={ tags }
                setTags={ setTags }
                setDescription={ setDescription }
            />

            <ConfigListContext.Provider value={ { configList, setConfigList } }>
                <SshConfigs
                    className={ 'mt-6' }
                />
            </ConfigListContext.Provider>

            <Divider className={ 'my-6' } />
            <div className={ 'flex flex-row justify-end gap-3' }>
                <Button variant={ 'bordered' } color={ 'danger' }>Discard</Button>
                <Button color={ 'primary' }>Submit</Button>
            </div>
        </div>
    );
};

export default ServerEditor;