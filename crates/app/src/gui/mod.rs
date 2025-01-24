pub mod windows_ext;

use crate::gui::windows_ext::WindowExt;

use tauri::{AppHandle, LogicalSize, WebviewWindow};

const TRAFFIC_LIGHTS_OFFSET_X: f64 = 30.;
const TRAFFIC_LIGHTS_OFFSET_Y: f64 = 30.;

#[tauri::command]
pub fn hello_world(name: &str) -> String {
    format!("Hello, {}!", name)
}

pub fn build_main_window(app: &AppHandle) -> WebviewWindow {
    // #[cfg(target_os = "macos")]
    // let style = tauri::TitleBarStyle::Overlay;

    #[cfg(target_os = "windows")]
    let style = tauri::TitleBarStyle::Visible;

    let win = tauri::WebviewWindowBuilder::new(
        app,
        "main", /* the unique window label */
        // tauri::WebviewUrl::App("/".parse().unwrap()),
        tauri::WebviewUrl::default(),
    )
    .decorations(true)
    .resizable(true)
    .visible(true)
    // .accept_first_mouse(true)
    // .hidden_title(true)
    // .title_bar_style(style)
    .build()
    .expect("failed to build window");

    win.set_size(LogicalSize::new(800, 600))
        .expect("failed to set size");
    win.set_min_size(Some(LogicalSize::new(400, 300)))
        .expect("failed to set min size");

    let win_clone = win.clone();
    win.on_window_event(move |_e| {
        win_clone.set_window_control_widget_pos(TRAFFIC_LIGHTS_OFFSET_X, TRAFFIC_LIGHTS_OFFSET_Y);
    });

    // #[cfg(target_os = "macos")]
    // apply_control_widget_style_macos(&main_window, Some(TrafficLightsOffset { x: 30., y: 30. }));

    win.set_transparent_title_bar(true);
    win.set_window_control_widget_pos(TRAFFIC_LIGHTS_OFFSET_X, TRAFFIC_LIGHTS_OFFSET_Y);

    win
}
