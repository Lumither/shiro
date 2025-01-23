use std::path::PathBuf;

use crate::init::error::{Error, Error::Database};

use macros::include_str_from_crate_root;

use sqlx::{query, SqlitePool};

pub async fn init(db_path: PathBuf) -> Result<SqlitePool, Error> {
    let option = sqlx::sqlite::SqliteConnectOptions::new()
        .filename(db_path)
        .create_if_missing(true);
    match SqlitePool::connect_with(option).await {
        Ok(pool) => Ok(pool),
        Err(e) => Err(Database(e)),
    }
}

pub async fn migrate(database: &SqlitePool) -> Result<(), Error> {
    query(include_str_from_crate_root!("/query/scheme.sql"))
        .execute(database)
        .await?;
    Ok(())
}