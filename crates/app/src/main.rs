#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use crate::gui::{build_main_window, hello_world};
use libshiro::init::InitWithWorkDIr;
use libshiro::ShiroBackend;

use homedir::my_home;

#[cfg(target_os = "macos")]
#[macro_use]
extern crate objc;

mod gui;

#[tokio::main]
async fn main() {
    let backend = ShiroBackend::init(InitWithWorkDIr {
        work_dir: my_home().unwrap().unwrap().join(".shiro"),
    }).await.unwrap();

    tauri::Builder::default()
        .plugin(tauri_plugin_opener::init())
        .setup(|app| {
            build_main_window(app.handle());
            Ok(())
        })
        .invoke_handler(tauri::generate_handler![hello_world])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
