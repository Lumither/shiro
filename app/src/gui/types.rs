use libshiro::error::Error;
use libshiro::{Server, ServerGroup, ServerTag, ShiroBackend};

use serde::Serialize;

#[derive(Serialize, Debug)]
pub struct GServer {
    group: ServerGroup,
    server: Server,
    tags: Vec<ServerTag>,
}

impl GServer {
    pub async fn from_server_id(backend: &ShiroBackend, sid: i64) -> Result<Self, Error> {
        let group = backend.get_group_with_sid(sid).await?;
        let server = backend.get_server_with_sid(sid).await?;
        let tags = backend.get_tags_with_sid(sid).await?;
        Ok(Self {
            group,
            server,
            tags,
        })
    }
}
