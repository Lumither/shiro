use crate::{error::Error, Server, ServerGroup, ServerTag, ShiroBackend};

use sqlx::{query, Row};

const GET_GROUPS: &str = include_str!("get_groups.sql");
const GET_GROUP_WITH_SID: &str = include_str!("get_group_with_sid.sql");
const GET_SERVERS: &str = include_str!("get_servers.sql");
const GET_SIDS: &str = include_str!("get_sids.sql");
const GET_SERVERS_WITH_SID: &str = include_str!("get_server_with_sid.sql");
const GET_TAGS: &str = include_str!("get_tags.sql");
const GET_TAGS_WITH_SID: &str = include_str!("get_tags_with_sid.sql");

impl ShiroBackend {
    pub async fn get_groups(&self) -> Result<Vec<ServerGroup>, Error> {
        match query(GET_GROUPS).fetch_all(&self.db_handler).await {
            Ok(value) => Ok(value
                .into_iter()
                .map(ServerGroup::try_from)
                .collect::<Result<Vec<_>, _>>()?),
            Err(e) => Err(Error::DbQuery(e.to_string())),
        }
    }

    pub async fn get_group_with_sid(&self, sid: i64) -> Result<ServerGroup, Error> {
        match query(GET_GROUP_WITH_SID)
            .bind(sid)
            .fetch_one(&self.db_handler)
            .await
        {
            Ok(res) => Ok(ServerGroup::try_from(res)?),
            Err(e) => Err(Error::DbQuery(e.to_string())),
        }
    }

    pub async fn get_sids(&self) -> Result<Vec<i64>, Error> {
        match query(GET_SIDS).fetch_all(&self.db_handler).await {
            Ok(value) => Ok(value
                .into_iter()
                .map(|i| i.try_get::<i64, _>("id"))
                .collect::<Result<Vec<_>, _>>()?),
            Err(e) => Err(Error::DbQuery(e.to_string())),
        }
    }

    pub async fn get_servers(&self) -> Result<Vec<Server>, Error> {
        match query(GET_SERVERS).fetch_all(&self.db_handler).await {
            Ok(value) => Ok(value
                .into_iter()
                .map(Server::try_from)
                .collect::<Result<Vec<_>, _>>()?),
            Err(e) => Err(Error::DbQuery(e.to_string())),
        }
    }

    pub async fn get_server_with_sid(&self, server_id: i64) -> Result<Server, Error> {
        match query(GET_SERVERS_WITH_SID)
            .bind(server_id)
            .fetch_one(&self.db_handler)
            .await
        {
            Ok(value) => Ok(Server::try_from(value)?),
            Err(e) => Err(Error::DbQuery(e.to_string())),
        }
    }

    pub async fn get_tags(&self) -> Result<Vec<ServerTag>, Error> {
        match query(GET_TAGS).fetch_all(&self.db_handler).await {
            Ok(value) => Ok(value
                .into_iter()
                .map(ServerTag::try_from)
                .collect::<Result<Vec<_>, _>>()?),
            Err(e) => Err(Error::DbQuery(e.to_string())),
        }
    }

    pub async fn get_tags_with_sid(&self, server_id: i64) -> Result<Vec<ServerTag>, Error> {
        match query(GET_TAGS_WITH_SID)
            .bind(server_id)
            .fetch_all(&self.db_handler)
            .await
        {
            Ok(value) => Ok(value
                .into_iter()
                .map(ServerTag::try_from)
                .collect::<Result<Vec<_>, _>>()?),
            Err(e) => Err(Error::DbQuery(e.to_string())),
        }
    }
}
