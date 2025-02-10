import React, { ChangeEvent, useEffect, useState } from 'react';
import {
    Button,
    Chip, Divider,
    Input,
    Select,
    SelectItem,
    Table,
    TableBody,
    TableColumn,
    TableHeader,
    Textarea
} from '@heroui/react';
import * as ipaddr from 'ipaddr.js';
import { invoke } from '@tauri-apps/api/core';
import { Group, Tag } from '@/types/shiro';
import { FaFilter } from 'react-icons/fa';
import { IoAdd } from 'react-icons/io5';

const isValidIP = (ip: string): boolean => {
    try {
        ipaddr.parse(ip);
    } catch (e) {
        return false;
    }
    return true;
};

const ServerEditor = () => {
    const [ name, setName ] = useState('');
    const [ ip, setIp ] = useState('');
    const [ group, setGroup ] = useState<Set<string>>(new Set([]));
    const [ tags, setTags ] = useState<Set<string>>(new Set([]));
    const [ description, setDescription ] = useState('');

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
        <div>
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
                    <Select
                        items={ tagList }
                        variant={ 'underlined' }
                        label={ 'Tag(s)' }
                        selectionMode={ 'multiple' }
                        selectedKeys={ tags }
                        onChange={ (e) => {
                            handleInputChange(e, setTags);
                        } }
                        renderValue={ (items) => {
                            return (
                                <div className="flex flex-wrap gap-2">
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

            <div className={ 'flex flex-col gap-2 mt-6' }>
                <div className={ 'flex flex-col sm:flex-row w-full justify-between gap-5' }>
                    <div className={ 'w-full' }>
                        <p className={ 'text-lg' }>SSH Config</p>
                    </div>
                    <div className={ 'w-full flex flex-row gap-2' }>
                        <Input variant={ 'underlined' } placeholder={ 'Filter' } startContent={ <FaFilter /> }
                               size={ 'sm' } />
                        <Button size={ 'sm' } startContent={ <IoAdd size={ '20px' } /> } isIconOnly={ true } />
                    </div>
                </div>
                <Table aria-label={ 'ssh config' } removeWrapper>
                    <TableHeader>
                        <TableColumn className={ 'bg-neutral-700' }>KEY</TableColumn>
                        <TableColumn className={ 'bg-neutral-700' }>VALUE</TableColumn>
                    </TableHeader>
                    <TableBody emptyContent={ 'No SSH Config' }>
                        { [] }
                    </TableBody>
                </Table>
            </div>

            <Divider className={ 'my-6' } />
            <div className={ 'flex flex-row justify-end gap-3' }>
                <Button variant={ 'bordered' } color={ 'danger' }>Discard</Button>
                <Button color={ 'primary' }>Submit</Button>
            </div>
        </div>
    );
};

export default ServerEditor;