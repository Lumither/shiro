/// Log the message at specific log level and exit(1)
///
/// # Example
/// ```rust
///
/// use macros::panic_with_log;
/// use tracing::Level;
///
/// panic_with_log!(Level::ERROR, "Test panicked: {}", 42);
/// ```
#[macro_export]
macro_rules! panic_with_log {
    ($level:expr, $msg:literal $(, $($arg:tt)*)?) => {{
        use std::process;
        use tracing::event;
        event!($level, $msg $(, $($arg)*)?);
        process::exit(1);
    }};
}
