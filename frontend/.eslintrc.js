module.exports = {
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: ["tsconfig.json"],
  },
  extends: [
    "airbnb",
    "airbnb/hooks",
    "airbnb-typescript",
    "plugin:@typescript-eslint/recommended",
    "plugin:@typescript-eslint/strict",
    "plugin:prettier/recommended",
  ],
  env: {
    browser: true,
  },
  rules: {
    // React 17's new JSX transform doesn't require importing React
    "react/react-in-jsx-scope": "off",
    // We don't need these with TS
    "react/prop-types": "off",
    "react/jsx-props-no-spreading": "off",
    "react/require-default-props": "off",

    "import/prefer-default-export": "off",
    "react/function-component-definition": [
      "error",
      {
        namedComponents: ["function-declaration", "arrow-function"],
        unnamedComponents: "arrow-function",
      },
    ],

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
