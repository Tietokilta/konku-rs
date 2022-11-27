# Frontend

## Requirements

- NodeJS (version defined in `.nvmrc`)
  - if using nvm run `nvm use` to install correct version

## Development

```bash
cd frontend
npm install
npm run dev
```

## Troubleshooting

### ESLint issues with VSCode

It might be necessary to tell VSCode the working directories as this repository uses monorepo approach. Put the following in `<repository_root>/.vscode/settings.json`:

```json
{
  "eslint.workingDirectories": ["frontend"]
}
```
