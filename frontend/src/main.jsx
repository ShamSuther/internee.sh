import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Container, MantineProvider, createTheme } from "@mantine/core";
import { Notifications } from "@mantine/notifications";
import "@mantine/notifications/styles.css";
import "@mantine/core/styles.css";
import App from "./App.jsx";
import "./index.css";

import cx from "clsx";
import containerClasses from "./stylesheets/Container.module.css";

import { AuthProvider } from "./context/AuthContext.jsx";

const theme = createTheme({
  components: {
    Container: Container.extend({
      classNames: (_, { size }) => ({
        root: cx({
          [containerClasses.responsiveContainer]: size === "responsive",
        }),
      }),
    }),
  },
  fontFamily: "inter, sans-serif",
  fontFamilyMonospace: "roboto-mono, monospace",
  headings: { fontFamily: "DM Serif Text, serif" },
  breakpoints: {
    xs: "36em",
    sm: "48em",
    md: "62em",
    lg: "75em",
    xl: "88em",
  },
});

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <MantineProvider theme={theme} defaultColorScheme="dark">
        <Notifications />
        <App />
      </MantineProvider>
    </AuthProvider>
  </StrictMode>
);
