CREATE TABLE IF NOT EXISTS servers
(
    id       INTEGER PRIMARY KEY AUTOINCREMENT,
    group_id INTEGER FOREIGN KEY REFERENCES groups (id),
    name     TEXT NOT NULL,
    desc     TEXT
);

CREATE TABLE IF NOT EXISTS groups
(
    id   INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT UNIQUE NOT NULL
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
