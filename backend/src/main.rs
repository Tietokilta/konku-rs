use axum::{
    extract::{DefaultBodyLimit, Multipart},
    routing::post,
    Router,
};
use hyper::StatusCode;
use std::net::SocketAddr;
use tower_http::{limit::RequestBodyLimitLayer, trace::TraceLayer};
use tracing_subscriber::{
    filter::{EnvFilter, LevelFilter},
    layer::SubscriberExt,
    util::SubscriberInitExt,
};

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

async fn handler(mut multipart: Multipart) -> Result<String, (StatusCode, String)> {
    while let Some(field) = multipart
        .next_field()
        .await
        .map_err(|err| (StatusCode::BAD_REQUEST, err.to_string()))?
    {
        let field_name = field.name().map(|s| s.to_owned()).ok_or((
            StatusCode::BAD_REQUEST,
            String::from("Malformed field name"),
        ))?;

        let content_type = field
            .content_type()
            .map(|s| s.to_owned())
            .unwrap_or_else(|| String::from("application/octet-stream"));

        let data = field
            .bytes()
            .await
            .map_err(|err| (StatusCode::BAD_REQUEST, err.to_string()))?;

        match field_name.as_str() {
            "data" => {}
            "attachments" => {
                tracing::info!("Attachment content-type {}", content_type)
            }
            // For other fields, raise unknown field error
            field => Err((
                StatusCode::BAD_REQUEST,
                format!("Unknown field \"{}\"", field),
            ))?,
        };
    }
    Ok("Success".to_string())
}
