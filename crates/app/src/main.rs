#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use crate::gui::hello_world;

mod gui;

#[tokio::main]
async fn main() {
    tauri::Builder::default()
        .plugin(tauri_plugin_opener::init())
        .invoke_handler(tauri::generate_handler![hello_world])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
