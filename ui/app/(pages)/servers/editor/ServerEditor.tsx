import React, { createContext, useState } from 'react';
import {
    Button,
    Divider
} from '@heroui/react';
import Generals from '@/app/(pages)/servers/editor/generals';
import SshConfigs from '@/app/(pages)/servers/editor/sshConfigs';
import { SshConfigRecord } from '@/types/shiro';
import { ServerEditorData } from '@/types/ui';

export const GeneralEditorContext = React.createContext<{
    name: string;
    setName: React.Dispatch<React.SetStateAction<string>>;
    ip: string;
    setIp: React.Dispatch<React.SetStateAction<string>>;
    group: number | null;
    setGroup: React.Dispatch<React.SetStateAction<number | null>>;
    tags: number[];
    setTags: React.Dispatch<React.SetStateAction<number[]>>;
    description: string;
    setDescription: React.Dispatch<React.SetStateAction<string>>;
} | undefined>(undefined);

export const ConfigListEditorContext = createContext<{
    configList: SshConfigRecord[],
    setConfigList: React.Dispatch<React.SetStateAction<SshConfigRecord[]>>
} | undefined>(undefined);

type Props = {
    callback?: (data: ServerEditorData) => void;
}

const ServerEditor = (prop: Props) => {
    const { callback } = prop;

    const [ name, setName ] = useState('');
    const [ ip, setIp ] = useState('');
    const [ group, setGroup ] = useState<number | null>(null);
    const [ tags, setTags ] = useState<number[]>([]);
    const [ description, setDescription ] = useState('');
    const [ configList, setConfigList ] = useState<SshConfigRecord[]>([]);

    const submitFunc = () => {
        callback && callback({
            name: name,
            ip: ip,
            groupId: group,
            tagIds: tags,
            description: description,
            sshConfig: configList
        });
        history.back();
    };

    return (
        <div>
            {/* todo: port? */ }
            {/* todo: autocompletion */ }

            <GeneralEditorContext.Provider value={ {
                name: name,
                setName: setName,
                ip: ip,
                setIp: setIp,
                group: group,
                setGroup: setGroup,
                tags: tags,
                setTags: setTags,
                description: description,
                setDescription: setDescription
            } }>
                <Generals />
            </GeneralEditorContext.Provider>

            <ConfigListEditorContext.Provider value={ { configList, setConfigList } }>
                <SshConfigs className={ 'mt-6' } />
            </ConfigListEditorContext.Provider>

            <Divider className={ 'my-6' } />
            <div className={ 'flex flex-row justify-end gap-3' }>
                <Button
                    variant={ 'bordered' }
                    color={ 'danger' }
                    onPress={ () => history.back() }
                >Discard</Button>
                <Button
                    color={ 'primary' }
                    onPress={ submitFunc }
                >Submit</Button>
            </div>
        </div>
    );
};

export default ServerEditor;