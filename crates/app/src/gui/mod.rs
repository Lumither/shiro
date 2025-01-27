pub mod handlers;

use tauri::{AppHandle, LogicalSize, WebviewWindow};

pub fn build_main_window(app: &AppHandle) -> WebviewWindow {
    #[cfg(target_os = "macos")]
    let style = tauri::TitleBarStyle::Overlay;

    #[cfg(target_os = "windows")]
    let style = tauri::TitleBarStyle::Visible;

    let win = tauri::WebviewWindowBuilder::new(app, "main", tauri::WebviewUrl::default())
        .decorations(true)
        .resizable(true)
        .visible(true)
        .title("Shiro")
        .hidden_title(true)
        .title_bar_style(style)
        .build()
        .expect("failed to build window");

    win.set_size(LogicalSize::new(800, 600))
        .expect("failed to set size");
    win.set_min_size(Some(LogicalSize::new(400, 300)))
        .expect("failed to set min size");

    #[cfg(target_os = "macos")]
    {
        use cocoa::{
            appkit::{NSWindow, NSWindowToolbarStyle},
            base::{id, NO, YES},
        };

        let win_id = win.ns_window().unwrap() as id;

        let win_clone = win.clone();

        unsafe {
            win_id.setTitlebarAppearsTransparent_(YES);
            win_id.setToolbar_(msg_send![class!(NSToolbar), new]);
            win_id.setToolbarStyle_(NSWindowToolbarStyle::NSWindowToolbarStyleUnified);

            win.on_window_event(move |_event| {
                let win_id = win_clone.ns_window().unwrap() as id;
                if win_clone.is_fullscreen().unwrap() {
                    let _: id = msg_send![win_id.toolbar(), setVisible: NO];
                } else {
                    let _: id = msg_send![win_id.toolbar(), setVisible: YES];
                }
            })
        }
    }

    win
}
