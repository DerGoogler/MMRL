import React from "react";
import ons from "onsenui";
import { CssBaseline } from "@mui/material";
import { LightTheme } from "@Styles/light_theme";
import { ConfirmProvider } from "material-ui-confirm";
import { ThemeProvider } from "@Hooks/useTheme";
import { StringsProvider } from "@Hooks/useStrings";
import { Preventer, render } from "react-render-tools";
import { MainActivity } from "@Activitys/MainActivity";
import { RepoProvider } from "@Hooks/useRepos";

import { SettingsProvider } from "@Hooks/useSettings";
import { ModConfProvider } from "@Hooks/useModConf";

import { MMRLApp } from "./custom-elements/app";
import { MMRLAnchor } from "./custom-elements/anchor";

import "onsenui/css/onsenui.css";
import "@Styles/default.scss";
import { strs } from "./locales/declaration";

ons.platform.select("android");

ons.ready(() => {
  customElements.define("mmrl-app", MMRLApp);
  customElements.define("mmrl-anchor", MMRLAnchor);

  render(
    <React.StrictMode>
      <ModConfProvider>
        <SettingsProvider>
          <StringsProvider data={strs}>
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
          </StringsProvider>
        </SettingsProvider>
      </ModConfProvider>
    </React.StrictMode>,
    "mmrl-app"
  );
});
