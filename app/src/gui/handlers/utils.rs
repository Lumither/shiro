use std::net::IpAddr;
use std::str::FromStr;

#[tauri::command]
pub fn check_ip_is_valid(ip: &str) -> bool {
    IpAddr::from_str(ip).is_ok()
}
