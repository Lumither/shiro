import { SshConfigRecord } from '@/types/shiro';

export interface ServerEditorData {
    name: string;
    ip: string;
    groupId: number | null;
    tagIds: number[];
    description: string;
    sshConfig: SshConfigRecord[];
}