#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use crate::gui::{build_main_window, hello_world};

#[cfg(target_os = "macos")]
#[macro_use]
extern crate objc;

mod gui;

#[tokio::main]
async fn main() {
    tauri::Builder::default()
        .plugin(tauri_plugin_opener::init())
        .setup(|app| {
            build_main_window(app.handle());
            Ok(())
        })
        // .on_window_event(|window, event| {
        //     if let WindowEvent::Resized(..) = event {
        //         window.position_traffic_lights(TrafficLightsOffset { x: 30., y: 30. });
        //     }
        // })
        .invoke_handler(tauri::generate_handler![hello_world])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
