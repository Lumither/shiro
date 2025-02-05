use homedir::GetHomeError;
use serde::{Serialize, Serializer};
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

impl Serialize for Error {
    fn serialize<S>(&self, serializer: S) -> Result<S::Ok, S::Error>
    where
        S: Serializer,
    {
        serializer.serialize_str(&self.to_string())
    }
}
