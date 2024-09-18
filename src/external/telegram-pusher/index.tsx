import React from "react";
import ons from "onsenui";
import { CssBaseline } from "@mui/material";
import { LightTheme } from "@Styles/light_theme";
import { ConfirmProvider } from "material-ui-confirm";
import { ThemeProvider } from "@Hooks/useTheme";
import { Preventer, render } from "react-render-tools";
import { ModFSProvider } from "@Hooks/useModFS";

import "@Styles/onsenui.scss";
import "@Styles/default.scss";

ons.platform.select("android");

import { configureSingle } from "@zenfs/core";
import { IndexedDB } from "@zenfs/dom";
import App from "./App";
await configureSingle({ backend: IndexedDB });

ons.ready(() => {
  render(
    <React.StrictMode>
      <ThemeProvider>
        <CssBaseline />
        <LightTheme />
        <ModFSProvider>
          <Preventer prevent="contextmenu">
            <ConfirmProvider>
              <App />
            </ConfirmProvider>
          </Preventer>
        </ModFSProvider>
      </ThemeProvider>
    </React.StrictMode>,
    "div"
  );
});
