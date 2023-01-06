# Backend

## Requirements

- Rust toolchain (see https://www.rust-lang.org/learn/get-started)
  - If using VSCode, `rust-analyzer` is recommended

## Environment variables

For local development, save environment variables to `.env` file. They will automatically be loaded from there.

| Variable                 | Required? | Description                                                                                                |
| ------------------------ | --------- | ---------------------------------------------------------------------------------------------------------- |
| PROCOUNTOR_API_KEY       | Yes       | Created in Procountor UI, see [this](https://dev.procountor.com/m2m-authentication/) for more information. |
| PROCOUNTOR_CLIENT_ID     | Yes       | API-client credential, requested from Procountor                                                           |
| PROCOUNTOR_CLIENT_SECRET | Yes       | API-client credential, requested from Procountor                                                           |
| PROCOUNTOR_API_URL       | No        | E.g. `https://api-test.procountor.com/api` (default value) **Note!** No `/` in the end.                    |

## Development

```bash
# Run the program. Also runs the build if necessary.
cargo run

# Build the program
cargo build

# Run the program in watch mode
cargo install cargo-watch # Install cargo-watch
cargo watch -x run # Run "cargo run" in watch mode
```

### Linting, testing, formatting

If using VSCode, consider the following configuration to enable

- Auto-format on save
- Linting inside editor

```json
  "[rust]": {
    "editor.defaultFormatter": "rust-lang.rust-analyzer",
    "editor.formatOnSave": true
  },
  "rust-analyzer.checkOnSave.enable": true,
  "rust-analyzer.checkOnSave.command": "clippy"
```

For running manually, use following:

```bash
# Run linter
cargo clippy

# Run formatter
cargo fmt

# Run tests
cargo test
```
