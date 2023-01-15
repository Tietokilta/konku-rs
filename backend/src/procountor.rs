use super::env_config;

use chrono::NaiveDate;
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
    // expires_in: i32,
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
    field: Option<String>,
    message: String,
}

#[derive(Serialize, Deserialize, Debug)]
struct ProcountorErrorResponse {
    errors: Vec<ErrorMessage>,
}

#[allow(non_camel_case_types)]
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

#[allow(clippy::upper_case_acronyms)]
#[allow(non_camel_case_types)]
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

#[allow(clippy::upper_case_acronyms)]
#[allow(non_camel_case_types)]
#[derive(Serialize, Deserialize, Debug)]
enum PaymentMethod {
    BANK_TRANSFER,
    DIRECT_PAYMENT,
    CLEARING,
    CREDIT_CARD_CHARGE,
    FOREIGN_PAYMENT,
    OTHER,
    CASH,
    DOMESTIC_PAYMENT_PLUSGIRO,
    DOMESTIC_PAYMENT_BANKGIRO,
    DOMESTIC_PAYMENT_CREDITOR,
    DKLMPKRE,
    NETS,
}

#[allow(clippy::upper_case_acronyms)]
#[allow(non_camel_case_types)]
#[derive(Serialize, Deserialize, Debug)]
enum InvoiceChannel {
    EMAIL,
    MAIL,
    ELECTRONIC_INVOICE,
    EDIFACT,
    PAPER_INVOICE,
    NO_SENDING,
}

#[allow(clippy::upper_case_acronyms)]
#[allow(non_camel_case_types)]
#[derive(Serialize, Deserialize, Debug)]
enum ProductUnit {
    CM,
    LOT,
    GRAM,
    HOUR,
    PERSON,
    LINEAR_METER,
    KILOGRAM,
    MONTH,
    KILOMETER,
    PIECE,
    KILOWATT_HOUR,
    LITER,
    BOX,
    METER,
    SQUARE_METER,
    CUBIC_METER,
    SALE_UNIT,
    MINUTE,
    MILLIMETER,
    PARCEL,
    BOTTLE,
    CAN,
    BAG,
    DAY,
    ROLL,
    PAGE,
    SACK,
    SERIES,
    TUBE,
    TON,
    YEAR,
    WEEK,
    FULL_DAY,
    KILOBIT,
    MEGABIT,
    GIGABIT,
    TERABIT,
    SQUARE_CENTIMETRE,
    CENTILITRE,
    CUP,
    DECILITRE,
    GALLON_UK,
    GALLON_US,
    MILLILITRE,
    PINT_UK,
    PINT_US,
    AMPERE,
    AMPERE_HOUR,
    AMPERE_MINUTE,
    KILOAMPERE_HOUR,
    KILOVOLT,
    MILLIVOLT,
    MILLIAMPERE_HOUR,
    FOOT,
    INCH,
    MILE,
    YARD,
    EXAJOULE,
    GIGAJOULE,
    JOULE,
    JOULE_PER_SECOND,
    KILOJOULE,
    MILLIJOULE,
    PETAJOULE,
    TERAJOULE,
    GRAM_PER_CUBIC_METRE,
    GRAM_PER_SQUARE_METRE,
    KILOGRAM_PER_CUBIC_METRE,
    KILOGRAM_PER_SQUARE_METRE,
    MILLIGRAM,
    MILLIGRAM_PER_CUBIC_METRE,
    OUNCE,
    POUND,
    STONE_UK,
    DOZEN,
    DOZEN_PACK,
    EIGHT_PACK,
    FIVE_PACK,
    FOUR_PACK,
    HUNDRED,
    JAR,
    NINE_PACK,
    NUMBER_OF_WORDS,
    PAIR,
    PALLET,
    PLATE,
    SET,
    SEVEN_PACK,
    SIX_PACK,
    TEN_PACK,
    THREE_PACK,
    TWO_PACK,
    WRAP,
    GIGAWATT,
    GIGAWATT_HOUR,
    KILOWATT,
    MEGAWATT_HOUR,
    MILLIWATT,
    TERAWATT,
    TERAWATT_HOUR,
    WATT,
    WATT_HOUR,
    BAR,
    KILOPASCAL,
    PASCAL,
    KILOBYTE,
    MEGABYTE,
    GIGABYTE,
    SECOND,
    HECTARE,
    NO_UNIT,
}

#[derive(Serialize, Deserialize, Debug)]
struct CounterPartyAddress {
    name: String,
    street: String,
    zip: String,
    city: String,
}

#[derive(Serialize, Deserialize, Debug)]
#[serde(rename_all = "camelCase")]
struct CounterParty {
    counter_party_address: CounterPartyAddress,
}

#[derive(Serialize, Deserialize, Debug)]
#[serde(rename_all = "camelCase")]
struct BankAccount {
    account_number: String,
}

#[derive(Serialize, Deserialize, Debug)]
#[serde(rename_all = "camelCase")]
struct PaymentInfo {
    payment_method: PaymentMethod,
    // In ISO 4217 format, e.g. EUR. Could make an enum out of this, but probably
    // not useful as it will just be EUR always :D
    currency: String,
    due_date: NaiveDate,
    currency_rate: i32,
    bank_account: BankAccount,
}

#[derive(Serialize, Deserialize, Debug)]
#[serde(rename_all = "camelCase")]
struct ExtraInfo {
    accounting_by_row: bool,
    unit_prices_include_vat: bool,
}

#[derive(Serialize, Deserialize, Debug)]
#[serde(rename_all = "camelCase")]
struct InvoiceRow {
    product: String,
    quantity: i32,
    unit: ProductUnit,
    unit_price: f32,
    discount_percent: i32,
    vat_percent: i32,
    vat_status: i32,
}

#[derive(Serialize, Deserialize, Debug)]
#[serde(rename_all = "camelCase")]
struct PostInvoiceRequestBody {
    #[serde(rename = "type")]
    invoice_type: InvoiceType,
    status: InvoiceStatus,
    date: NaiveDate,
    counter_party: CounterParty,
    payment_info: PaymentInfo,
    extra_info: ExtraInfo,
    invoice_rows: Vec<InvoiceRow>,
    discount_percent: i32,
    invoice_channel: InvoiceChannel,
    additional_information: String,
    vat_status: i32,
}

#[derive(Serialize, Deserialize, Debug)]
struct PostInvoiceResponseBody {
    id: i32,
}

pub async fn test() -> Result<String, Error> {
    let access_token = get_access_token().await?;

    // tracing::info!("{}", access_token);

    let client = reqwest::Client::new();

    let body = PostInvoiceRequestBody {
        vat_status: 12,
        invoice_type: InvoiceType::PURCHASE_INVOICE,
        status: InvoiceStatus::UNFINISHED,
        date: NaiveDate::from_ymd_opt(2022, 12, 24).unwrap(),
        counter_party: CounterParty {
            counter_party_address: CounterPartyAddress {
                name: String::from("Testi Testinen"),
                street: String::from("Testikatu 1"),
                zip: String::from("00520"),
                city: String::from("Helsinki"),
            },
        },
        payment_info: PaymentInfo {
            payment_method: PaymentMethod::BANK_TRANSFER,
            currency: String::from("EUR"),
            due_date: NaiveDate::from_ymd_opt(2023, 01, 01).unwrap(),
            currency_rate: 1,
            bank_account: BankAccount {
                account_number: String::from("FI49 5000 9420 0287 30"),
            },
        },
        extra_info: ExtraInfo {
            accounting_by_row: false,
            unit_prices_include_vat: true,
        },
        invoice_rows: vec![
            InvoiceRow {
                product: String::from("Testituote"),
                quantity: 2,
                unit: ProductUnit::PIECE,
                unit_price: 26.49,
                discount_percent: 0,
                vat_percent: 0,
                vat_status: 12,
            },
            InvoiceRow {
                product: String::from("Testituote 2"),
                quantity: 1,
                unit: ProductUnit::PIECE,
                unit_price: 15.0,
                discount_percent: 0,
                vat_percent: 0,
                vat_status: 12,
            },
        ],
        discount_percent: 0,
        invoice_channel: InvoiceChannel::NO_SENDING,
        additional_information: String::from(
            "Puhelinnumero: 040123456789\n \
            Sähköposti: testi.testinen@gmail.com\n \
            Laskun selite: Tässä tällaiset pari testijuttua ostettu, maksakaa kiitos.",
        ),
    };

    // let body_as_json = serde_json::to_string(&body).unwrap();
    // tracing::info!("{}", body_as_json);

    let response = client
        .post(format!("{}/invoices", *env_config::PROCOUNTOR_API_URL))
        .bearer_auth(&access_token)
        .json(&body)
        .send()
        .await?;

    match response.status() {
        StatusCode::OK => {
            let response_body: PostInvoiceResponseBody = response.json().await?;
            tracing::info!("{:?}", response_body);
        }
        _ => {
            let response_body: ProcountorErrorResponse = response.json().await?;
            tracing::error!("{:?}", response_body);
        }
    }

    Ok(access_token)
}
