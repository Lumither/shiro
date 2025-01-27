// use crate::AppData;
// 
// #[tauri::command]
// pub async fn test(state: tauri::State<'_, AppData>, msg: String) -> Result<String, String> {
//     let data = state;
//     let str = data.backend.test().await;
//     Ok(format!("{}: {}", msg, str))
// }
