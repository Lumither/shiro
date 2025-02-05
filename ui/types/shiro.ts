export interface Group {
    name: string;
    id: number;
}

export interface Server {
    id: number;
    group_id: number;
    name: string;
    ip: string;
    port: number;
    desc: string;
}

export interface GServer {
    group: Group;
    server: Server;
    tags: Tag[];
}

export interface Tag {
    name: string;
    id: number;
}