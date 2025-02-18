import React, { ChangeEvent, useContext, useEffect, useState } from 'react';
import { Chip, Input, Select, SelectItem, Textarea } from '@heroui/react';
import { Group, Tag } from '@/types/shiro';
import { invoke } from '@tauri-apps/api/core';
import { GeneralEditorContext } from '@/app/(pages)/servers/editor/ServerEditor';
import { toast } from 'react-toastify';

const isValidIP = async (ip: string): Promise<boolean> => {
    return invoke('check_ip_is_valid', { ip: ip }).then((ret) => ret as boolean);
};

type Props = {
    className?: string;
}

const Generals = (props: Props) => {
    const { className } = props;

    const [ groupSet, setGroupSet ] = useState<Set<string>>(new Set([]));
    const [ tagsSet, setTagsSet ] = useState<Set<string>>(new Set([]));

    const ctx = useContext(GeneralEditorContext);
    if (ctx === undefined) {
        toast.error('Unexpected ctx');
        return <></>;
    }
    const { setName, ip, setIp, setDescription, setGroup, setTags } = ctx;

    const [ ipIsValid, setIpIsValid ] = useState(false);

    useEffect(() => {
        if (groupSet.size > 0) {
            const gid = parseInt(
                [ ...groupSet ]
                    .filter((v) => v !== '')
                    [0]
            );
            setGroup(isNaN(gid) ? null : gid);
        } else (
            setGroup(null)
        );
    }, [ groupSet ]);
    useEffect(() => {
        setTags(
            [ ...tagsSet ]
                .filter((v) => v !== '')
                .map((val) => parseInt(val))
        );
    }, [ tagsSet ]);
    useEffect(() => {
        const update = async () => {
            setIpIsValid(await isValidIP(ip));
        };
        update().then();
    }, [ ip ]);

    // local
    const [ groupList, setGroupList ] = useState<Group[] | null>(null);
    const [ tagList, setTagList ] = useState<Tag[] | null>(null);

    useEffect(() => {
        const fetchGroups = async () => {
            invoke('get_server_groups')
                .then((res) => setGroupList(res as Group[]))
                .catch((e) => console.error(e));
        };
        const fetchTags = async () => {
            invoke('get_server_tags')
                .then((res) => setTagList(res as Tag[]))
                .catch((e) => console.error(e));
        };

        fetchGroups().then();
        fetchTags().then();
    }, []);

    const handleInputChange = (
        e: ChangeEvent<HTMLSelectElement>,
        setFunc: React.Dispatch<React.SetStateAction<Set<string>>>
    ) => {
        setFunc(new Set(e.target.value.split(',')));
    };

    return (
        <div className={ className }>
            <p className={ 'text-lg' }>General</p>
            <div className={ 'flex flex-col sm:flex-row gap-5' }>
                <Input variant={ 'underlined' }
                       label={ 'Name' }
                       onValueChange={ setName }
                />
                <Input variant={ 'underlined' }
                       label={ 'IP' }
                       onValueChange={ setIp }
                       errorMessage={ 'Invalid IP address' }
                       isInvalid={ !ipIsValid }
                />
            </div>
            <div className={ 'flex flex-col sm:flex-row gap-5' }>
                { groupList &&
                    <Select
                        variant={ 'underlined' }
                        label={ 'Group' }
                        onChange={ (e) => {
                            handleInputChange(e, setGroupSet);
                        } }
                        classNames={ {
                            popoverContent: [ 'bg-neutral-800' ]
                        } }
                    >
                        {
                            groupList.map((group) => (
                                <SelectItem key={ group.id }>{ group.name }</SelectItem>
                            ))
                        }
                    </Select>
                }
                {/* todo: autocompletion */ }
                { tagList &&
                    // todo: overflow support (under large quantity of tags)
                    <Select
                        items={ tagList }
                        variant={ 'underlined' }
                        label={ 'Tag(s)' }
                        selectionMode={ 'multiple' }
                        selectedKeys={ tagsSet }
                        onChange={ (e) => {
                            handleInputChange(e, setTagsSet);
                        } }
                        classNames={ {
                            popoverContent: [ 'bg-neutral-800' ]
                        } }
                        renderValue={ (items) => {
                            return (
                                <div className="flex overflow-x-scroll gap-2">
                                    { items.map((item) => {
                                        const tag = item.data as Tag;
                                        return (
                                            <Chip
                                                key={ tag.id }
                                                size={ 'sm' }
                                                onClose={ () => {
                                                    setTagsSet(
                                                        new Set(
                                                            [ ...tagsSet ]
                                                                .filter((v) => v !== tag.id.toString())
                                                        )
                                                    );
                                                } }
                                            >{ tag.name }
                                            </Chip>
                                        );
                                    }) }
                                </div>
                            );
                        } }
                    >
                        {
                            (tag) => (
                                <SelectItem key={ tag.id }>{ tag.name }</SelectItem>
                            )
                        }
                    </Select>
                }
            </div>
            <Textarea
                variant={ 'underlined' }
                label={ 'Description' }
                onValueChange={ setDescription }
            />
        </div>
    );
};

export default Generals;