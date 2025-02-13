#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

#[cfg(target_os = "macos")]
#[macro_use]
extern crate objc;

use std::fs::create_dir_all;

use crate::gui::{
    build_main_window,
    handlers::database::{
        add_tag_to_server, get_server_groups, get_server_tags, get_server_tags_with_sid,
        get_server_with_sid, get_servers, new_group, new_server,
    },
    handlers::utils::check_ip_is_valid,
};
use libshiro::{
    init::{InitWithPaths, InitWithWorkDIr},
    ShiroBackend,
};
use macros::panic_with_log;

use homedir::my_home;
use tauri::{generate_context, generate_handler, Manager};
use tauri_api::path;
use tracing::Level;

mod error;
mod gui;

const PATH_PREFIX: &str = "shiro";

struct AppData {
    pub backend: ShiroBackend,
}

#[tokio::main]
async fn main() {
    let backend = {
        let data_path = path::data_dir().map(|path| path.join(PATH_PREFIX));

        if let Some(data_path) = data_path {
            if let Err(e) = create_dir_all(&data_path) {
                panic_with_log!(Level::ERROR, "failed to init Shiro backend: {}", e);
            }
            ShiroBackend::init(InitWithPaths { db_path: data_path }).await
        } else if let Some(work_dir) = my_home().unwrap() {
            ShiroBackend::init(InitWithWorkDIr { work_dir }).await
        } else {
            panic_with_log!(Level::ERROR, "failed to init Shiro backend");
        }
    }
    .unwrap();

    tauri::Builder::default()
        .plugin(tauri_plugin_opener::init())
        .setup(|app| {
            app.manage(AppData { backend });
            build_main_window(app.handle());
            Ok(())
        })
        .invoke_handler(generate_handler![
            get_server_groups,
            get_servers,
            get_server_with_sid,
            get_server_tags,
            get_server_tags_with_sid,
            new_group,
            new_server,
            add_tag_to_server,
            check_ip_is_valid
        ])
        .run(generate_context!())
        .expect("error while running tauri application");
}
