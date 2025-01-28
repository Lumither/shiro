#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

#[cfg(target_os = "macos")]
#[macro_use]
extern crate objc;

use std::fs::create_dir_all;

use crate::gui::build_main_window;
use libshiro::{
    init::{InitWithPaths, InitWithWorkDIr},
    ShiroBackend,
};
use macros::panic_with_log;

use homedir::my_home;
use tauri::Manager;
use tauri_api::path;
use tracing::Level;

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
        .invoke_handler(tauri::generate_handler![])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
