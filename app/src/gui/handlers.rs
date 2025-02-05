use std::{net::IpAddr, str::FromStr};

use crate::{error::Error, gui::types::GServer, AppData};
use libshiro::{ServerGroup, ServerTag};

use futures::future::join_all;
use tauri::State;

#[tauri::command]
pub async fn new_group(state: State<'_, AppData>, group_name: &str) -> Result<(), Error> {
    state
        .backend
        .new_group(group_name)
        .await
        .map_err(Into::into)
}

#[tauri::command]
pub async fn new_server(
    state: State<'_, AppData>,
    group_id: Option<i64>,
    host_name: &str,
    ip: &str,
    port: Option<u16>,
    desc: Option<&str>,
) -> Result<(), Error> {
    state
        .backend
        .new_server(group_id, host_name, &IpAddr::from_str(ip)?, port, desc)
        .await
        .map_err(Into::into)
}

#[tauri::command]
pub async fn add_tag_to_server(
    state: State<'_, AppData>,
    tag_id: i64,
    server_id: i64,
) -> Result<(), Error> {
    state
        .backend
        .add_tag_to_server(tag_id, server_id)
        .await
        .map_err(Into::into)
}

#[tauri::command]
pub async fn get_server_groups(state: State<'_, AppData>) -> Result<Vec<ServerGroup>, Error> {
    state.backend.get_groups().await.map_err(Into::into)
}

#[tauri::command]
pub async fn get_servers(state: State<'_, AppData>) -> Result<Vec<GServer>, Error> {
    let futures = state
        .backend
        .get_sids()
        .await?
        .into_iter()
        .map(async |sid| GServer::from_server_id(&state.backend, sid).await)
        .collect::<Vec<_>>();

    join_all(futures)
        .await
        .into_iter()
        .collect::<Result<_, _>>()
        .map_err(Into::into)
}

#[tauri::command]
pub async fn get_server_with_sid(
    state: State<'_, AppData>,
    server_id: i64,
) -> Result<GServer, Error> {
    GServer::from_server_id(&state.backend, server_id)
        .await
        .map_err(Into::into)
}

#[tauri::command]
pub async fn get_server_tags(state: State<'_, AppData>) -> Result<Vec<ServerTag>, Error> {
    state.backend.get_tags().await.map_err(Into::into)
}

#[tauri::command]
pub async fn get_server_tags_with_sid(
    state: State<'_, AppData>,
    server_id: i64,
) -> Result<Vec<ServerTag>, Error> {
    state
        .backend
        .get_tags_with_sid(server_id)
        .await
        .map_err(Into::into)
}
