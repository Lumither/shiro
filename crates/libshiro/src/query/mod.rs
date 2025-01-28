mod insert;
mod select;

use macros::include_str_from_crate_root;

pub const MIGRATION_QUERY: &str = include_str_from_crate_root!("/src/query/scheme.sql");
