use std::{net::IpAddr, str::FromStr};

use serde::{Deserialize, Serialize};
use sqlx::{sqlite::SqliteRow, Row, SqlitePool};

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


#[derive(Serialize, Deserialize)]
pub struct Server {
    pub id: i64,
    pub group_id: i64,
    pub name: String,
    pub ip: IpAddr,
    pub port: u16,
    pub desc: Option<String>,
}

impl TryFrom<SqliteRow> for Server {
    type Error = sqlx::Error;

    fn try_from(value: SqliteRow) -> Result<Self, Self::Error> {
        Ok(Self {
            id: value.try_get::<i64, _>("id")?,
            group_id: value.try_get::<i64, _>("group_id")?,
            name: value.try_get::<String, _>("name")?,
            ip: IpAddr::from_str(&value.try_get::<String, _>("ip")?).unwrap(),
            port: value.try_get::<u16, _>("port")?,
            desc: value.try_get::<Option<String>, _>("desc")?,
        })
    }
}

#[derive(Serialize, Deserialize)]
pub struct ServerTag {
    pub id: i64,
    pub name: String,
}

impl TryFrom<SqliteRow> for ServerTag {
    type Error = sqlx::Error;

    fn try_from(value: SqliteRow) -> Result<Self, Self::Error> {
        Ok(Self {
            id: value.try_get::<i64, _>("id")?,
            name: value.try_get::<String, _>("name")?,
        })
    }
}
