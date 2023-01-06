use super::env_config;

use serde::{Deserialize, Serialize};

#[derive(Serialize, Debug)]
struct AuthenticationRequestBody {
    grant_type: String,
    client_id: String,
    client_secret: String,
    api_key: String,
}

#[derive(Deserialize, Debug)]
struct AuthenticationResponseBody {
    access_token: String,
    expires_in: i32,
}

pub async fn authenticate() -> Result<(), ()> {
    let client = reqwest::Client::new();

    let response: AuthenticationResponseBody = client
        .post(format!("{}/oauth/token", *env_config::PROCOUNTOR_API_URL))
        .form(&AuthenticationRequestBody {
            grant_type: String::from("client_credentials"),
            client_id: (*env_config::PROCOUNTOR_CLIENT_ID).clone(),
            client_secret: (*env_config::PROCOUNTOR_CLIENT_SECRET).clone(),
            api_key: (*env_config::PROCOUNTOR_API_KEY).clone(),
        })
        .send()
        .await
        .map_err(|_| ())? // TODO: smarter error
        .json()
        .await
        .map_err(|_| ())?; // TODO: smarter error

    tracing::info!("{:?}", response);

    Ok(())
}
