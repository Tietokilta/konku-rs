# Backend

## Requirements

- Rust toolchain (see https://www.rust-lang.org/learn/get-started)
  - If using VSCode, `rust-analyzer` is recommended

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
