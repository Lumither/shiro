use std::net::IpAddr;

use crate::{
    init::{db, db::migrate, error::Error, Args, InitArgs},
    query::{NEW_GROUP, NEW_SERVER},
};

use sqlx::SqlitePool;

pub mod init;
mod query;

pub struct ShiroBackend {
    db_handler: SqlitePool,
}

impl ShiroBackend {
    pub async fn init(prop: impl InitArgs) -> Result<Self, Error> {
        let args: Args = prop.to_args();

        let db_handler = db::init(args.db_path).await?;
        migrate(&db_handler).await?;

        Ok(Self { db_handler })
    }

    pub async fn new_group(&self, group_name: &str) -> Result<(), Error> {
        match sqlx::query(NEW_GROUP)
            .bind(group_name)
            .execute(&self.db_handler)
            .await
        {
            Ok(_) => Ok(()),
            Err(e) => Err(Error::DbQuery(e.to_string())),
        }
    }

    pub async fn new_server(
        &self,
        group_id: Option<i64>,
        host_name: &str,
        ip: &IpAddr,
        desc: Option<&str>,
    ) -> Result<(), Error> {
        match sqlx::query(NEW_SERVER)
            .bind(group_id)
            .bind(host_name)
            .bind(ip.to_string())
            .bind(desc)
            .execute(&self.db_handler)
            .await
        {
            Ok(_) => Ok(()),
            Err(e) => Err(Error::DbQuery(e.to_string())),
        }
    }
}
