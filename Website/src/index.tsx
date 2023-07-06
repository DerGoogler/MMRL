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

ons.platform.select("android");

const App = () => {
  React.useEffect(() => {
    if (!os.hasStoragePermission()) {
      os.requestStoargePermission();
    }
  }, []);

  return (
    <React.StrictMode>
      <SettingsProvider>
        <Preventer prevent="contextmenu">
          <StringProvider>
            <ConfirmProvider>
              <CssBaseline />
              <LightTheme />
              <MainActivity />
            </ConfirmProvider>
          </StringProvider>
        </Preventer>
      </SettingsProvider>
    </React.StrictMode>
  );
};

ons.ready(() => {
  render(<App />, "app");
});
