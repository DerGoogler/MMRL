import React from "react";
import ons from "onsenui";
import "onsenui/css/onsenui.css";
import "@Styles/default.scss";
import { CssBaseline } from "@mui/material";
import { LightTheme } from "@Styles/light_theme";
import { ConfirmProvider } from "material-ui-confirm";
import { ThemeProvider } from "@Hooks/useTheme";
import { StringProvider } from "@Hooks/useStrings";
import { Preventer, render } from "react-render-tools";
import { MainActivity } from "@Activitys/MainActivity";
import { RepoProvider } from "@Hooks/useRepos";
import { SettingsProvider } from "@Hooks/useSettings";

ons.platform.select("android");

ons.ready(() => {
  if (window.__nativeStorage__) {
    window.__nativeStorage__.defineName("localstorage");
  }

  render(
    <React.StrictMode>
      <SettingsProvider>
        <StringProvider>
          <ThemeProvider>
            <Preventer prevent="contextmenu">
              <RepoProvider>
                <ConfirmProvider>
                  <CssBaseline />
                  <LightTheme />
                  <MainActivity />
                </ConfirmProvider>
              </RepoProvider>
            </Preventer>
          </ThemeProvider>
        </StringProvider>
      </SettingsProvider>
    </React.StrictMode>,
    "app"
  );
});
