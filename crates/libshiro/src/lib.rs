use crate::init::{db, db::migrate, error, Args, InitArgs};

use sqlx::SqlitePool;

pub mod init;
mod query;

pub struct ShiroBackend {
    db_handler: SqlitePool,
}

impl ShiroBackend {
    pub async fn init(prop: impl InitArgs) -> Result<Self, error::Error> {
        let args: Args = prop.to_args();

        let db_handler = db::init(args.db_path).await?;
        migrate(&db_handler).await?;

        Ok(Self { db_handler })
    }
}
