use once_cell::sync::Lazy;

fn read_env_required(var_name: &str) -> String {
    std::env::var(var_name).unwrap_or_else(|_| panic!("Env variable {} is not specified", var_name))
}

fn read_env_or_default(var_name: &str, default: &str) -> String {
    std::env::var(var_name).unwrap_or_else(|_| default.to_string())
}

pub static PROCOUNTOR_CLIENT_ID: Lazy<String> =
    Lazy::new(|| read_env_required("PROCOUNTOR_CLIENT_ID"));
pub static PROCOUNTOR_CLIENT_SECRET: Lazy<String> =
    Lazy::new(|| read_env_required("PROCOUNTOR_CLIENT_SECRET"));
pub static PROCOUNTOR_API_KEY: Lazy<String> = Lazy::new(|| read_env_required("PROCOUNTOR_API_KEY"));
pub static PROCOUNTOR_API_URL: Lazy<String> =
    Lazy::new(|| read_env_or_default("PROCOUNTOR_API_URL", "https://api-test.procountor.com/api"));
