'use client';

import React, { memo, useContext, useState } from 'react';
import { IoAdd } from 'react-icons/io5';
import {
    Autocomplete, AutocompleteItem,
    Button, Code,
    Input,
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader,
    useDisclosure
} from '@heroui/react';
import { getIterableObjectSshConfigList, sshConfigList } from '@/app/(pages)/servers/editor/sshConfigList';
import { SshConfigRecord as configRecord } from '@/types/shiro';
import { toast } from 'react-toastify';
import { ConfigListEditorContext } from '@/app/(pages)/servers/editor/ServerEditor';
import { HiPencil } from 'react-icons/hi2';
import { FaTrashAlt } from 'react-icons/fa';

type Props = {
    className?: string;
    icon: React.ReactNode;
    updateRec?: configRecord;
};

const SshConfigRecord = memo((props: Props) => {
    const { className, icon, updateRec } = props;

    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    const ctx = useContext(ConfigListEditorContext);
    if (ctx == undefined) {
        toast.error('Unexpected ctx');
        return <></>;
    }
    const configList = ctx.configList;
    const setConfigList = ctx.setConfigList;

    const [ key, setKey ] = useState(updateRec?.key ?? '');
    const [ value, setValue ] = useState(updateRec?.value ?? '');

    const appendConfigList = () => {
        setConfigList([ ...configList, { key, value } ]);
    };
    const updateConfigListKey = () => {
        setConfigList((items) => (
            items.map(it => (
                    it.key === updateRec?.key ? { ...it, value: value } : it
                )
            )
        ));
    };

    const pushRecord = (onClose: () => void) => {
        if (key !== '') {
            if (configList.every(it => key !== it.key)) {
                appendConfigList();
                toast.success('Added');
                onClose();
            } else if (updateRec) {
                updateConfigListKey();
                toast.success('Updated');
                onClose();
            } else {
                toast.warn('Duplicated key, operation ignored', { autoClose: 1500 });
            }
        } else {
            toast.warn('Empty key, operation ignored', { autoClose: 1500 });
        }
    };

    return (
        <div className={ className }>
            <Button
                size={ 'sm' }
                startContent={ icon }
                isIconOnly={ true }
                onPress={ onOpen }
            />
            <Modal
                isOpen={ isOpen }
                onOpenChange={ onOpenChange }
                classNames={ {
                    base: [ 'bg-neutral-800' ]
                } }
                onClose={ () => {
                    if (!updateRec) {
                        setKey('');
                        setValue('');
                    }
                } }
            >
                <ModalContent>
                    {
                        (onClose) => (
                            <div>
                                <ModalHeader>SSH Config</ModalHeader>
                                <ModalBody>
                                    {
                                        updateRec &&
                                        <Input
                                            variant={ 'underlined' }
                                            isDisabled={ true }
                                            label={'Key'}
                                            value={ updateRec.key }
                                        >
                                        </Input>
                                    }
                                    { !updateRec &&
                                        <Autocomplete
                                            classNames={ {
                                                popoverContent: [ 'bg-neutral-800' ]
                                            } }
                                            variant={ 'underlined' }
                                            label={ 'Key' }
                                            defaultItems={ getIterableObjectSshConfigList() }
                                            onValueChange={ setKey }
                                            isDisabled={ updateRec && true }
                                            onSelectionChange={ (key) => {
                                                if (key != null) {
                                                    setKey(sshConfigList[parseInt(key.toString())]);
                                                }
                                            } }
                                            allowsCustomValue={ true }
                                        >
                                            {
                                                (item) => (
                                                    <AutocompleteItem key={ item.key }>{ item.value }</AutocompleteItem>
                                                )
                                            }
                                        </Autocomplete>
                                    }
                                    <Input variant={ 'underlined' }
                                           label={ 'Value' }
                                           value={ value }
                                           onValueChange={ setValue } />
                                </ModalBody>
                                <ModalFooter className={ 'flex flex-col' }>
                                    { key !== '' &&
                                        <div className={ 'flex flex-col gap-2 mb-3' }>
                                            <p className={ 'mt-2' }>Preview</p>
                                            <Code className={ 'w-full overflow-x-scroll' }>
                                                { key + ' ' + value }
                                            </Code>
                                        </div>
                                    }
                                    <div className={ 'flex justify-end gap-2' }>
                                        <Button variant={ 'bordered' } onPress={ onClose }>Cancel</Button>
                                        <Button color={ 'primary' }
                                                onPress={ () => pushRecord(onClose) }>Submit</Button>
                                    </div>
                                </ModalFooter>
                            </div>
                        )
                    }
                </ModalContent>
            </Modal>
        </div>
    );
});

export const NewConfigRecordButton = (
    { className }: { className?: string, }
) => {
    return (
        <SshConfigRecord
            className={ className }
            icon={ <IoAdd size={ '20px' } /> }
        />
    );
};

export const EditConfigRecordButton = (
    { className, updateRec }: { className?: string, updateRec: configRecord }
) => {
    return (
        <SshConfigRecord
            className={ className }
            updateRec={ updateRec }
            icon={ <HiPencil size={ '15px' } /> }
        />
    );
};

export const DeleteConfigRecordButton = ({ deleteKey }: { deleteKey: string }) => {
    const ctx = useContext(ConfigListEditorContext);
    if (ctx == undefined) {
        toast.error('Unexpected ctx');
        return <></>;
    }
    const configList = ctx.configList;
    const setConfigList = ctx.setConfigList;

    const deleteFromList = () => {
        setConfigList(
            [ ...configList ]
                .filter((it) => it.key !== deleteKey)
        );
        toast.success('Deleted');
    };

    return (
        <Button
            // color={ 'danger' }
            onPress={ deleteFromList }
            size={ 'sm' }
            isIconOnly
        >
            <FaTrashAlt size={ '13px' } />
        </Button>
    );
};
