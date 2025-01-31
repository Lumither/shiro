use crate::AppData;
use libshiro::{error::Error, Server, ServerGroup, ServerTag};

use tauri::State;

#[tauri::command]
pub async fn get_server_groups(state: State<'_, AppData>) -> Result<Vec<ServerGroup>, Error> {
    state.backend.get_groups().await
}

#[tauri::command]
pub async fn get_servers(state: State<'_, AppData>) -> Result<Vec<Server>, Error> {
    state.backend.get_servers().await
}

#[tauri::command]
pub async fn get_server_tags(state: State<'_, AppData>) -> Result<Vec<ServerTag>, Error> {
    state.backend.get_tags().await
}

#[tauri::command]
pub async fn get_server_tags_with_sid(state: State<'_, AppData>, server_id: i64) -> Result<Vec<ServerTag>, Error> {
    state.backend.get_tags_with_sid(server_id).await
}


