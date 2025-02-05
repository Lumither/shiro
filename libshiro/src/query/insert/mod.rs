use std::net::IpAddr;

use crate::{error::Error, ShiroBackend};

use sqlx::query;

pub const NEW_GROUP: &str = include_str!("new_group.sql");
pub const NEW_SERVER: &str = include_str!("new_server.sql");
pub const NEW_TAG: &str = include_str!("new_tag.sql");
pub const ADD_TAG_TO_SERVER: &str = include_str!("add_tag_to_server.sql");

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

    pub async fn new_tag(&self, tag_name: &str) -> Result<(), Error> {
        match query(NEW_TAG)
            .bind(tag_name)
            .execute(&self.db_handler)
            .await
        {
            Ok(_) => Ok(()),
            Err(e) => Err(Error::DbQuery(e.to_string())),
        }
    }

    pub async fn add_tag_to_server(&self, tag_id: i64, server_id: i64) -> Result<(), Error> {
        match query(ADD_TAG_TO_SERVER)
            .bind(server_id)
            .bind(tag_id)
            .execute(&self.db_handler)
            .await
        {
            Ok(_) => Ok(()),
            Err(e) => Err(Error::DbQuery(e.to_string())),
        }
    }
}

#[cfg(test)]
mod tests {
    use std::fs::create_dir_all;
    use std::path::PathBuf;
    use std::str::FromStr;
    use std::time::UNIX_EPOCH;

    use crate::init::InitWithWorkDIr;
    use crate::ShiroBackend;

    async fn setup() -> ShiroBackend {
        let timestamp = std::time::SystemTime::now();

        let work_dir = PathBuf::from_str(&format!(
            "/tmp/shiro-test/{}",
            timestamp.duration_since(UNIX_EPOCH).unwrap().as_millis()
        ))
        .unwrap();
        create_dir_all(&work_dir).unwrap();

        ShiroBackend::init(InitWithWorkDIr { work_dir })
            .await
            .unwrap()
    }

    #[tokio::test]
    async fn test_new_group() {
        let backend = setup().await;
        backend.new_group("group_name").await.unwrap();
    }
}
