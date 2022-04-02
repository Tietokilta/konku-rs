import React from "react"
import { createRoot } from "react-dom/client"

import "@fontsource/roboto"
import "@fontsource/source-code-pro"
import "./index.css"

import "./i18n"
import App from "./App"

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const root = createRoot(document.getElementById("root")!)

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
