module.exports = {
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: ["tsconfig.json"],
  },
  extends: [
    "airbnb-base",
    "airbnb-typescript/base",
    "plugin:@typescript-eslint/recommended",
    "plugin:@typescript-eslint/strict",
    "plugin:prettier/recommended",
  ],
  env: {
    node: true,
  },
  rules: {
    "import/prefer-default-export": "off",
    "import/order": [
      "error",
      {
        groups: [
          ["builtin", "type", "external"],
          ["internal", "parent", "sibling", "index"],
          "object",
        ],
        alphabetize: { order: "asc", caseInsensitive: true },
        "newlines-between": "always",
      },
    ],
  },
}
