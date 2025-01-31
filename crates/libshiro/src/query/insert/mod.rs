use std::net::IpAddr;

use crate::{error::Error, ShiroBackend};

use sqlx::query;

pub const NEW_GROUP: &str = include_str!("new_group.sql");
pub const NEW_SERVER: &str = include_str!("new_server.sql");

impl ShiroBackend {
    pub async fn new_group(&self, group_name: &str) -> Result<(), Error> {
        match query(NEW_GROUP)
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
        port: Option<u16>,
        desc: Option<&str>,
    ) -> Result<(), Error> {
        match query(NEW_SERVER)
            .bind(group_id)
            .bind(host_name)
            .bind(ip.to_string())
            .bind(port.unwrap_or(22))
            .bind(desc)
            .execute(&self.db_handler)
            .await
        {
            Ok(_) => Ok(()),
            Err(e) => Err(Error::DbQuery(e.to_string())),
        }
    }
}
