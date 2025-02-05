use std::path::PathBuf;

use crate::{error::Error, init::db::migrate, ShiroBackend};

pub mod db;

pub trait InitArgs {
    fn to_args(&self) -> Args
    where
        Self: Sized;
}

pub struct InitWithWorkDIr {
    pub work_dir: PathBuf,
}

impl InitArgs for InitWithWorkDIr {
    fn to_args(&self) -> Args
    where
        Self: Sized,
    {
        Args {
            db_path: self.work_dir.join("data.sqlite"),
        }
    }
}

pub struct InitWithPaths {
    pub db_path: PathBuf,
}

impl InitArgs for InitWithPaths {
    fn to_args(&self) -> Args {
        Args {
            db_path: self.db_path.join("data.sqlite"),
        }
    }
}

pub struct Args {
    pub db_path: PathBuf,
}

impl ShiroBackend {
    pub async fn init(prop: impl InitArgs) -> Result<Self, Error> {
        let args: Args = prop.to_args();

        let db_handler = db::init(args.db_path).await?;
        migrate(&db_handler).await?;

        Ok(Self { db_handler })
    }
}

#[cfg(test)]
mod tests {
    use crate::{error::Error, init::InitWithWorkDIr, ShiroBackend};

    use homedir::my_home;

    // todo: work in tmp dir
    async fn setup() -> Result<ShiroBackend, Error> {
        ShiroBackend::init(InitWithWorkDIr {
            work_dir: my_home()?.unwrap().join(".shiro"),
        })
        .await
    }

    #[tokio::test]
    async fn test_init() -> Result<(), Error> {
        setup().await?;
        Ok(())
    }
}
