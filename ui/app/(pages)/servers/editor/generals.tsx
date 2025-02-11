import React, { ChangeEvent, useEffect, useState } from 'react';
import { Chip, Input, Select, SelectItem, Textarea } from '@heroui/react';
import { Group, Tag } from '@/types/shiro';
import ipaddr from 'ipaddr.js';
import { invoke } from '@tauri-apps/api/core';

// todo: use backend to check ip validity (remove ipaddr.js dependency)
const isValidIP = (ip: string): boolean => {
    try {
        ipaddr.parse(ip);
    } catch (e) {
        return false;
    }
    return true;
};

type Props = {
    className?: string;
    setName: React.Dispatch<React.SetStateAction<string>>;
    ip: string;
    setIp: React.Dispatch<React.SetStateAction<string>>;
    setGroup: React.Dispatch<React.SetStateAction<Set<string>>>;
    tags: Set<string>;
    setTags: React.Dispatch<React.SetStateAction<Set<string>>>;
    setDescription: React.Dispatch<React.SetStateAction<string>>;
}

const Generals = (props: Props) => {
    const { className, setName, ip, setIp, setGroup, tags, setTags, setDescription } = props;

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
                       isInvalid={ !isValidIP(ip) }
                />
            </div>
            <div className={ 'flex flex-col sm:flex-row gap-5' }>
                { groupList &&
                    <Select
                        variant={ 'underlined' }
                        label={ 'Group' }
                        onChange={ (e) => {
                            handleInputChange(e, setGroup);
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
                        selectedKeys={ tags }
                        onChange={ (e) => {
                            handleInputChange(e, setTags);
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
                                                    const tagsClone = new Set(tags);
                                                    tagsClone.delete(tag.id.toString());
                                                    setTags(tagsClone);
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