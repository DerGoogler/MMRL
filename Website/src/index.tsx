import React from "react";
import ons from "onsenui";
import "onsenui/css/onsenui.css";
import "@Styles/default.scss";
import { CssBaseline } from "@mui/material";
import { LightTheme } from "@Styles/light_theme";
import { ConfirmProvider } from "material-ui-confirm";
import { SettingsProvider } from "@Hooks/useSettings";
import { StringProvider } from "@Hooks/useStrings";
import { Preventer, render } from "react-render-tools";
import MainActivity from "@Activitys/MainActivity";
import { os } from "@Native/Os";
import { RepoProvider } from "@Hooks/useRepos";

ons.platform.select("android");

ons.ready(() => {
  render(
    <React.StrictMode>
      <SettingsProvider>
        <Preventer prevent="contextmenu">
          <StringProvider>
            <RepoProvider>
              <ConfirmProvider>
                <CssBaseline />
                <LightTheme />
                <MainActivity />
              </ConfirmProvider>
            </RepoProvider>
          </StringProvider>
        </Preventer>
      </SettingsProvider>
    </React.StrictMode>,
    "app"
  );
});
