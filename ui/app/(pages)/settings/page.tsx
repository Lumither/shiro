'use client'

import React from 'react';
import { Card, CardBody, Tab, Tabs } from '@heroui/react';
import GeneralSettings from '@/app/(pages)/settings/GeneralSettings';

const Settings = () => {
    return (
        <div className={ ' w-full h-full flex p-8 justify-center' }>
            <div className={ 'w-full settingsWrapper' }>
                <div className={'w-full'}>
                    <Tabs isVertical={ true }>
                        <Tab key="general" title="General" className={'w-full'}>
                            <GeneralSettings />
                        </Tab>
                        <Tab key="music" title="Music">
                            <Card>
                                <CardBody>
                                    Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip
                                    ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit
                                    esse cillum dolore eu fugiat nulla pariatur.
                                </CardBody>
                            </Card>
                        </Tab>
                        <Tab key="videos" title="Videos">
                            <Card>
                                <CardBody>
                                    Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt
                                    mollit anim id est laborum.
                                </CardBody>
                            </Card>
                        </Tab>
                    </Tabs>
                </div>
            </div>
        </div>
    );
};

export default Settings;