use axum::extract::multipart::MultipartError;
use axum::extract::Multipart;

#[derive(Debug)]
pub struct MultipartResponseField {
    pub name: String,
    pub content_type: String,
    pub data: Vec<u8>,
}

pub async fn consume_multipart_body(
    mut multipart: Multipart,
) -> Result<Vec<MultipartResponseField>, MultipartError> {
    let mut result = Vec::new();

    while let Some(field) = multipart.next_field().await? {
        let field_name = field
            .name()
            .map(|s| s.to_owned())
            .unwrap_or_else(|| String::from("unknown_field"));

        let content_type = field
            .content_type()
            .map(|s| s.to_owned())
            .unwrap_or_else(|| String::from("application/octet-stream"));

        let data = field.bytes().await.map(|bytes| bytes.to_vec())?;

        result.push(MultipartResponseField {
            name: field_name,
            content_type,
            data,
        })
    }

    Ok(result)
}
