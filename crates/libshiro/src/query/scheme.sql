CREATE TABLE IF NOT EXISTS groups
(
    id   INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT UNIQUE NOT NULL
);

CREATE TABLE IF NOT EXISTS servers
(
    id       INTEGER PRIMARY KEY AUTOINCREMENT,
    group_id INTEGER,
    name     TEXT NOT NULL,
    desc     TEXT,

    FOREIGN KEY (group_id) REFERENCES groups (id)
);

CREATE TABLE IF NOT EXISTS tags
(
    id   INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT UNIQUE NOT NULL
);

CREATE TABLE IF NOT EXISTS server_tags
(
    server_id INTEGER,
    tag_id    INTEGER,

    FOREIGN KEY (server_id) REFERENCES servers (id),
    FOREIGN KEY (tag_id) REFERENCES tags (id),
    PRIMARY KEY (server_id, tag_id)
);

CREATE TABLE IF NOT EXISTS ssh_configs
(
    id    INTEGER PRIMARY KEY AUTOINCREMENT,
    key   TEXT NOT NULL,
    value TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS server_configs
(
    sid    INTEGER,
    cfg_id INTEGER,

    FOREIGN KEY (sid) REFERENCES servers (id),
    FOREIGN KEY (cfg_id) REFERENCES ssh_configs (id),
    PRIMARY KEY (sid, cfg_id)
);