import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { MantineProvider, createTheme } from "@mantine/core";
import "@mantine/core/styles.css";
import App from "./App.jsx";
import "./index.css";

import { AuthProvider } from "./context/authContext.jsx";

const theme = createTheme({
  fontFamily: "roboto, sans-serif",
  fontFamilyMonospace: "roboto-mono, monospace",
  headings: { fontFamily: "DM Serif Text, serif" },
});

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <MantineProvider theme={theme}>
        <App />
      </MantineProvider>
    </AuthProvider>
  </StrictMode>
);
