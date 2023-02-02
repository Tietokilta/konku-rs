mod env_config;
mod multipart_utils;
mod procountor;

use axum::{
    extract::{DefaultBodyLimit, Multipart},
    routing::post,
    Router,
};
use chrono::NaiveDate;
use dotenvy::dotenv;
use hyper::StatusCode;
use iban::Iban;
use serde::{Deserialize, Serialize};
use std::net::SocketAddr;
use tower_http::{limit::RequestBodyLimitLayer, trace::TraceLayer};
use tracing_subscriber::{
    filter::{EnvFilter, LevelFilter},
    layer::SubscriberExt,
    util::SubscriberInitExt,
};
use validator::Validate;

#[tokio::main]
async fn main() {
    // Add tracing_subscriber to enable logging to stdout. Default log level
    // is DEBUG, and it can be changed with RUST_LOG env variable. Tracing can
    // be enabled on source-level too, for example:
    // RUST_LOG=info,tower_http=debug
    tracing_subscriber::registry()
        .with(
            EnvFilter::builder()
                .with_default_directive(LevelFilter::DEBUG.into())
                .from_env_lossy(),
        )
        .with(tracing_subscriber::fmt::layer())
        .init();

    // Read environment variables from .env file
    if let Err(error) = dotenv() {
        tracing::warn!("Failed to load variables from .env file: \"{}\". Make sure that environment variables are set some other way.", error)
    }

    let app = Router::new()
        .route("/", post(handler))
        // Create debug-level tracing events for HTTP requests
        .layer(DefaultBodyLimit::disable())
        // Limit request body to 250MB
        .layer(RequestBodyLimitLayer::new(250 * 1024 * 1024))
        .layer(TraceLayer::new_for_http());

    let address = SocketAddr::from(([0, 0, 0, 0], 3000));
    tracing::info!("listening on {}", address);

    axum::Server::bind(&address)
        .serve(app.into_make_service())
        .await
        .unwrap();
}

#[derive(Debug, Validate, Deserialize, Serialize)]
#[serde(rename_all = "camelCase")]
struct RequestInvoiceRow {
    #[validate(range(min = 1))]
    quantity: i32,
    #[validate(range(min = 0))]
    unit_price: f64,
    #[validate(length(min = 1, max = 300))]
    description: String,
}

#[derive(Debug, Validate, Deserialize)]
#[serde(rename_all = "camelCase")]
struct RequestBody {
    #[validate(length(min = 1, max = 300))]
    first_name: String,
    #[validate(length(min = 1, max = 300))]
    last_name: String,
    #[validate(length(min = 1, max = 300))]
    street_address: String,
    #[validate(length(min = 1, max = 10))]
    zip: String,
    #[validate(length(min = 1, max = 300))]
    city: String,
    #[validate(length(min = 1, max = 40))]
    phone_number: String,
    #[validate(length(min = 1, max = 600))]
    email: String,
    bank_account_number: Iban,
    invoice_date: NaiveDate,
    #[validate(length(min = 1, max = 300))]
    topic: String,
    #[validate(length(min = 1, max = 5000))]
    description: String,
    #[validate(length(min = 1, max = 1000))]
    other: String,
    #[validate(length(min = 1))]
    invoice_rows: Vec<RequestInvoiceRow>,
}

async fn handler(multipart: Multipart) -> Result<String, (StatusCode, String)> {
    let multipart_fields = multipart_utils::consume_multipart_body(multipart)
        .await
        .map_err(|err| (StatusCode::BAD_REQUEST, err.to_string()))?;

    let mut json_body: RequestBody;

    for field in multipart_fields.iter() {
        match field.name.as_str() {
            "data" => {
                // data should contain the JSON body, let's parse it and throw error forward if
                // data is incorrectly formatted.
                json_body = serde_json::from_slice(&field.data).map_err(|err| {
                    (
                        StatusCode::BAD_REQUEST,
                        format!(
                            "In field \"{}\": JSON deserialization failed: {}",
                            field.name, err
                        ),
                    )
                })?;

                json_body
                    .validate()
                    .map_err(|err| (StatusCode::BAD_REQUEST, err.to_string()))?

                // tracing::info!("Got content \"{}\"", json_body.date)
            }
            "attachments" => {
                tracing::info!("Attachment content-type {}", field.content_type)
            }
            // For other fields, raise unknown field error
            field => Err((
                StatusCode::BAD_REQUEST,
                format!("Unknown field \"{}\"", field),
            ))?,
        }
    }

    procountor::test().await.map_err(|e| {
        (
            StatusCode::INTERNAL_SERVER_ERROR,
            format!("Procountor error {}", e.to_string()),
        )
    })?;

    Ok(String::from("Success"))
}
