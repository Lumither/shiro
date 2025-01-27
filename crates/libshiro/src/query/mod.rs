use macros::include_str_from_crate_root;

// todo: update macro
// const PATH_PREFIX: &str = "/src";

// pub const MIGRATION_QUERY: &str = include_str_from_crate_root!("{}/query/scheme.sql", PATH_PREFIX);
pub const MIGRATION_QUERY: &str = include_str_from_crate_root!("/src/query/scheme.sql");

pub const NEW_GROUP: &str = include_str_from_crate_root!("/src/query/insert/new_group.sql");

pub const NEW_SERVER: &str = include_str_from_crate_root!("/src/query/insert/new_server.sql");
