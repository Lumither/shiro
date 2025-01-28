use serde::{Deserialize, Serialize};
use sqlx::sqlite::SqliteRow;
use sqlx::{Row, SqlitePool};

pub mod error;
pub mod init;
mod query;

pub struct ShiroBackend {
    db_handler: SqlitePool,
}

#[derive(Serialize, Deserialize)]
pub struct ServerGroup {
    id: i64,
    name: String,
}

impl TryFrom<SqliteRow> for ServerGroup {
    type Error = sqlx::Error;

    fn try_from(value: SqliteRow) -> Result<Self, Self::Error> {
        Ok(Self {
            id: value.try_get::<i64, _>("id")?,
            name: value.try_get::<String, _>("name")?,
        })
    }
}
