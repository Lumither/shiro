'use client';

import React, { useContext, useState } from 'react';
import {
    Input,
    Table,
    TableBody, TableCell,
    TableColumn,
    TableHeader, TableRow
} from '@heroui/react';
import { FaFilter } from 'react-icons/fa';
import {
    DeleteConfigRecordButton,
    EditConfigRecordButton,
    NewConfigRecordButton
} from '@/app/(pages)/servers/editor/sshConfigRecord';
import { ConfigListEditorContext } from '@/app/(pages)/servers/editor/ServerEditor';

type Props = {
    className?: string;
}

const SshConfigs = (props: Props) => {
    const { className } = props;

    const [ filter, setFilter ] = useState('');

    const ctx = useContext(ConfigListEditorContext);
    const configList = ctx?.configList;


    return (
        <div className={ className }>
            <div className={ 'flex flex-col gap-2' }>
                <div className={ 'flex flex-col sm:flex-row w-full justify-between gap-5' }>
                    <div className={ 'w-full' }>
                        <p className={ 'text-lg' }>SSH Config</p>
                    </div>
                    <div className={ 'w-full flex flex-row gap-2' }>
                        <Input variant={ 'underlined' }
                               placeholder={ 'Filter' }
                               startContent={ <FaFilter /> }
                               onValueChange={ setFilter }
                               value={ filter }
                               isClearable={ true }
                               onClear={ () => setFilter('') }
                               size={ 'sm' }
                        />
                        <NewConfigRecordButton />
                    </div>
                </div>
                <Table aria-label={ 'ssh config' } removeWrapper>
                    {/* todo: fix layout shifting with filter*/ }
                    <TableHeader>
                        <TableColumn className={ 'bg-neutral-700' }>KEY</TableColumn>
                        <TableColumn className={ 'bg-neutral-700' }>VALUE</TableColumn>
                        <TableColumn className={ 'bg-neutral-700' }>ACTIONS</TableColumn>
                    </TableHeader>
                    <TableBody emptyContent={ filter === '' ? 'No SSH Config' : 'No Matching Pattern' }>
                        {
                            configList ?
                                configList
                                    .filter((v) => (
                                        filter === ''
                                        || v.value.toLowerCase().includes(filter.toLowerCase())
                                        || v.key.toLowerCase().includes(filter.toLowerCase())
                                    ))
                                    .map(({ key, value }, index) => (
                                        <TableRow key={ index }>
                                            <TableCell>{ key }</TableCell>
                                            <TableCell>{ value }</TableCell>
                                            <TableCell className={ 'w-min' }>
                                                <div className={ 'flex flex-row gap-2' }>
                                                    <EditConfigRecordButton updateRec={ { key, value } } />
                                                    <DeleteConfigRecordButton deleteKey={ key } />
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                : []
                        }
                    </TableBody>
                </Table>
            </div>
        </div>
    );
};

export default SshConfigs;