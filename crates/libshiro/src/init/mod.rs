use std::path::PathBuf;

pub mod db;
pub mod error;

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

#[cfg(test)]
mod tests {
    use crate::{
        init::{error::Error, InitWithWorkDIr},
        ShiroBackend,
    };

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
