use std::path::PathBuf;

use crate::init::db::migrate;

pub mod db;
pub mod error;

#[allow(dead_code)]
pub trait InitArgs {
    fn to_args(&self) -> Args
    where
        Self: Sized;
}

pub struct InitWithWorkDIr {
    work_dir: PathBuf,
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

pub struct Args {
    db_path: PathBuf,
}

#[allow(dead_code)]
pub async fn init(prop: impl InitArgs) -> Result<(), error::Error> {
    let args: Args = prop.to_args();

    let db_handler = db::init(args.db_path).await?;
    migrate(&db_handler).await?;

    Ok(())
}

#[cfg(test)]
mod tests {
    use crate::init::{init, InitArgs, InitWithWorkDIr};

    use crate::init::error::Error;
    use homedir::my_home;

    // todo: work in tmp dir
    fn setup() -> impl InitArgs {
        InitWithWorkDIr {
            work_dir: my_home().unwrap().unwrap().join(".shiro"),
        }
    }

    #[tokio::test]
    async fn test_init() -> Result<(), Error> {
        let args = setup();
        init(args).await
    }
}
