use homedir::GetHomeError;
use thiserror::Error;

#[derive(Error, Debug)]
pub enum Error {
    #[error(transparent)]
    DbInit(#[from] sqlx::Error),
    
    #[error("database query error: {0}")]
    DbQuery(String),

    #[error(transparent)]
    HomeDirUnknown(#[from] GetHomeError),

    #[error("Bad User: {}", uid)]
    BadUser { uid: String },
}
