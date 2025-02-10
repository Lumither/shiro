'use client';

import React from 'react';
import { GServer, Tag } from '@/types/shiro';
import { Button, Card, CardBody, Chip } from '@heroui/react';
import { CardHeader } from '@heroui/card';
import { IoCopy } from 'react-icons/io5';
import { toast } from 'react-toastify';
import Link from 'next/link';

type Props = {
    className?: string;
    gServer: GServer
}

const IpBox = ({ ip }: { ip: string }) => {
    return (
        <div className={ 'flex flex-row items-center gap-1' }>
            <p className={ 'text align-middle' }>{ ip }</p>
            <IoCopy size={ '13px' } onClick={ () => {
                navigator.clipboard.writeText(ip).then(() => toast.success('Copied', { autoClose: 1000 }));
            } } />
        </div>
    );
};

const TagBar = ({ tags }: { tags: Tag[] }) => {

    return (
        <div>
            <ul className={ `flex flex-row items-center gap-1` }>
                { tags.map((tag, key) => (
                    <li key={ key }>
                        <Chip size={ 'sm' }>
                            <p className={ 'text-sm' }>
                                { tag.name }
                            </p>
                        </Chip>
                    </li>
                )) }
            </ul>
        </div>
    );
};

const ServerCard = ({ className, gServer }: Props) => {
    const { server, group, tags } = gServer;

    return (
        <div className={ className }>
            <Card
                isHoverable={ true }
                as={ Link }
                href={ `/servers/editor/?sid=${ server.id }` }
                classNames={ {
                    base: [
                        'bg-neutral-700',
                        'hover:bg-neutral-800'
                    ]
                } }
            >
                <CardHeader
                    className={ 'pb-0' }
                >
                    <p className={ 'text-xl' }>
                        { server.name }
                    </p>
                </CardHeader>
                <CardBody>
                    <IpBox ip={ server.ip } />
                    { tags && tags.length > 0 &&
                        <TagBar tags={ tags } />
                    }
                    { server.desc }
                </CardBody>
            </Card>
        </div>
    );
};

export default ServerCard;