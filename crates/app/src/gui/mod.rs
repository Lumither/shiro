#[tauri::command]
pub fn hello_world(name: &str) -> String {
    format!("Hello, {}!", name)
}
