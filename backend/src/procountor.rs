use super::env_config;

use hyper::StatusCode;
use reqwest::Error;
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

// Sends request to Procountor /oauth/token endpoint to request access token for
// authenticating future requests.
async fn get_access_token() -> Result<String, Error> {
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
        .await?
        .json()
        .await?;

    Ok(response.access_token)
}

#[derive(Serialize, Deserialize, Debug)]
struct ErrorMessage {
    status: i32,
    field: String,
    message: String,
}

#[derive(Serialize, Deserialize, Debug)]
struct ProcountorErrorResponse {
    errors: Vec<ErrorMessage>,
}

#[derive(Serialize, Deserialize, Debug)]
enum InvoiceType {
    SALES_INVOICE,
    SALES_ORDER,
    PURCHASE_INVOICE,
    PURCHASE_ORDER,
    TRAVEL_INVOICE,
    BILL_OF_CHARGES,
    PERIODIC_TAX_RETURN,
}

#[derive(Serialize, Deserialize, Debug)]
enum InvoiceStatus {
    EMPTY,
    UNFINISHED,
    NOT_SENT,
    SENT,
    RECEIVED,
    PAID,
    PAYMENT_DENIED,
    VERIFIED,
    APPROVED,
    INVALIDATED,
    PAYMENT_QUEUED,
    PARTLY_PAID,
    PAYMENT_SENT_TO_BANK,
    MARKED_PAID,
    STARTED,
    INVOICED,
    OVERRIDDEN,
    DELETED,
    UNSAVED,
    PAYMENT_TRANSACTION_REMOVED,
}

#[derive(Serialize, Deserialize, Debug)]
struct PostInvoiceRequestBody {
    #[serde(rename = "type")]
    invoice_type: InvoiceType,
    status: InvoiceStatus,
}

#[derive(Serialize, Deserialize, Debug)]
struct PostInvoiceResponseBody {
    id: i32,
}

pub async fn test() -> Result<String, Error> {
    let access_token = get_access_token().await?;

    let client = reqwest::Client::new();

    let response = client
        .post(format!("{}/invoices", *env_config::PROCOUNTOR_API_URL))
        .bearer_auth(&access_token)
        .json(&PostInvoiceRequestBody {
            invoice_type: InvoiceType::BILL_OF_CHARGES,
            status: InvoiceStatus::UNFINISHED,
        })
        .send()
        .await?;

    match response.status() {
        StatusCode::OK => {
            let response_body: PostInvoiceResponseBody = response.json().await?;
            tracing::info!("{:?}", response_body);
        }
        _ => {
            let response_body: ProcountorErrorResponse = response.json().await?;
            tracing::info!("{:?}", response_body);
        }
    }

    Ok(access_token)
}
