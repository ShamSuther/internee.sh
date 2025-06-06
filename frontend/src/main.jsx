import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Container, MantineProvider, createTheme } from "@mantine/core";
import { Notifications } from "@mantine/notifications";
import "@mantine/notifications/styles.css";
import "@mantine/core/styles.css";
import App from "./App.jsx";
import "./index.css";

import cx from "clsx";
import commonClasses from "./stylesheets/Common.module.css";

import { AuthProvider } from "./context/AuthContext.jsx";

const theme = createTheme({
  primaryColor: "violet",
  components: {
    Container: Container.extend({
      classNames: (_, { size }) => ({
        root: cx({
          [commonClasses.responsiveContainer]: size === "responsive",
        }),
      }),
    }),
    TextInput: {
      classNames: () => ({
        input: commonClasses.focused,
      }),
    },
    Select: {
      classNames: () => ({
        input: commonClasses.focused,
      }),
    },
    Textarea: {
      classNames: () => ({
        input: commonClasses.focused,
      }),
    },
  },
  fontFamily: "inter, sans-serif",
  fontFamilyMonospace: "roboto-mono, monospace",
  headings: { fontFamily: "DM Serif Text, serif" },
  anchor: { fontFamily: "inter, sans-serif" },
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
