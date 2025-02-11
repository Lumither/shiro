'use client';

import React, { useContext, useState } from 'react';
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

type Props = {
    className?: string;
    icon: React.ReactNode;
};

const SshConfigRecord = (props: Props) => {
    const { className, icon } = props;

    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    const [ key, setKey ] = useState('');
    const [ value, setValue ] = useState('');

    const ctx = useContext(ConfigListEditorContext);
    if (ctx == undefined) {
        toast.error('Unexpected ctx');
        return <></>;
    }
    const configList = ctx.configList;
    const setConfigList = ctx.setConfigList;
    const appendConfigList = (record: configRecord) => {
        setConfigList([ ...configList, record ]);
    };

    const pushRecord = (onClose: () => void) => {
        if (key !== '') {
            appendConfigList({ key, value });
            onClose();
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
                    setKey('');
                    setValue('');
                } }
            >
                <ModalContent>
                    {
                        (onClose) => (
                            <div>
                                <ModalHeader>SSH Config</ModalHeader>
                                <ModalBody>
                                    <Autocomplete
                                        classNames={ {
                                            popoverContent: [ 'bg-neutral-800' ]
                                        } }
                                        variant={ 'underlined' }
                                        label={ 'Key' }
                                        defaultItems={ getIterableObjectSshConfigList() }
                                        onValueChange={ setKey }
                                        onSelectionChange={ (key) => {
                                            if (key != null) {
                                                setKey(sshConfigList[parseInt(key.toString())]);
                                            }
                                        } }
                                        allowsCustomValue={ true }
                                        value={ key }
                                    >
                                        {
                                            (item) => (
                                                <AutocompleteItem key={ item.key }>{ item.value }</AutocompleteItem>
                                            )
                                        }
                                    </Autocomplete>
                                    <Input variant={ 'underlined' } label={ 'Value' } onValueChange={ setValue } />
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
};

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
