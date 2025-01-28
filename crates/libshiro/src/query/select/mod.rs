use crate::{error::Error, ServerGroup, ShiroBackend};

use sqlx::query;

const GET_GROUPS: &str = include_str!("get_groups.sql");

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
}
