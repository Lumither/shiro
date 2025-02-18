use std::path::PathBuf;

use crate::{
    error::{Error, Error::DbInit},
    query::MIGRATION_QUERY,
};

use sqlx::{query, sqlite::SqliteConnectOptions, SqlitePool};

pub async fn init(db_path: PathBuf) -> Result<SqlitePool, Error> {
    let option = SqliteConnectOptions::new()
        .filename(db_path)
        .create_if_missing(true);
    match SqlitePool::connect_with(option).await {
        Ok(pool) => Ok(pool),
        Err(e) => Err(DbInit(e)),
    }
}

pub async fn migrate(database: &SqlitePool) -> Result<(), Error> {
    query(MIGRATION_QUERY).execute(database).await?;
    Ok(())
}
