use homedir::GetHomeError;
use thiserror::Error;

#[allow(dead_code)]
#[derive(Error, Debug)]
pub enum Error {
    #[error(transparent)]
    Database(#[from] sqlx::Error),

    #[error(transparent)]
    HomeDirUnknown(#[from] GetHomeError),

    #[error("Bad User: {}", uid)]
    BadUser { uid: String },
}
