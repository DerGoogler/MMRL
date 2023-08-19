import React from "react";
import ons from "onsenui";
import { CssBaseline } from "@mui/material";
import { LightTheme } from "@Styles/light_theme";
import { ConfirmProvider } from "material-ui-confirm";
import { ThemeProvider } from "@Hooks/useTheme";
import { StringProvider } from "@Hooks/useStrings";
import { Preventer, render } from "react-render-tools";
import { MainActivity } from "@Activitys/MainActivity";
import { RepoProvider } from "@Hooks/useRepos";
import { SettingsProvider } from "@Hooks/useSettings";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { MMRLApp } from "./custom-elements/app";

import "onsenui/css/onsenui.css";
import "@Styles/default.scss";
import { DownloadActivity } from "@Activitys/DownloadActivity/DownloadActivity";
import { FirebaseProvider } from "@Hooks/useFirebase";

ons.platform.select("android");

ons.ready(() => {
  if (window.__nativeStorage__) {
    window.__nativeStorage__.defineName("localstorage");
  }

  customElements.define("mmrl-app", MMRLApp);

  const router = createBrowserRouter([
    {
      path: "/",
      element: <MainActivity />,
    },
    {
      path: "/download",
      element: <DownloadActivity />,
    },
  ]);

  render(
    <React.StrictMode>
      <FirebaseProvider>
        <SettingsProvider>
          <StringProvider>
            <ThemeProvider>
              <Preventer prevent="contextmenu">
                <RepoProvider>
                  <ConfirmProvider>
                    <CssBaseline />
                    <LightTheme />
                    <RouterProvider router={router} />
                  </ConfirmProvider>
                </RepoProvider>
              </Preventer>
            </ThemeProvider>
          </StringProvider>
        </SettingsProvider>
      </FirebaseProvider>
    </React.StrictMode>,
    "mmrl-app"
  );
});
