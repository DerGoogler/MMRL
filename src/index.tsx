import React from "react";
import ons from "onsenui";
import { Button, Card, CardContent, CssBaseline, Divider } from "@mui/material";
import { LightTheme } from "@Styles/light_theme";
import { ConfirmProvider } from "material-ui-confirm";
import { ThemeProvider, useTheme } from "@Hooks/useTheme";
import { StringsProvider, useStrings } from "@Hooks/useStrings";
import { Preventer, render } from "react-render-tools";
import { MainActivity } from "@Activitys/MainActivity";
import { RepoProvider } from "@Hooks/useRepos";

import { SettingsProvider } from "@Hooks/useSettings";
import { ModFSProvider } from "@Hooks/useModFS";

import { MMRLApp } from "./custom-elements/app";
import { MMRLAnchor } from "./custom-elements/anchor";

import "@Styles/onsenui.scss";
import "@Styles/default.scss";
import { strs } from "./locales/declaration";
import { ErrorBoundary } from "@Components/ErrorBoundary";
import { Page } from "@Components/onsenui/Page";
import { Toolbar } from "@Components/onsenui/Toolbar";
import { Pre } from "@Components/dapi/Pre";
import { Code } from "@Components/dapi/Code";
import { Anchor } from "@Components/dapi/Anchor";

ons.platform.select("android");

/**
 * This component is non translatable
 * ThemeProvider won't get catched
 */
const Fallback = React.memo((props: any) => {
  const { theme } = useTheme();

  const style = {
    backgroundColor: theme.palette.background.paper,
    color: theme.palette.text.primary,
    borderRadius: theme.shape.borderRadius / theme.shape.borderRadius,
    lineHeight: 1.45,
    overflow: "auto",
    padding: 2,
  };

  return (
    <Page
      renderToolbar={() => {
        return (
          <Toolbar modifier="noshadow">
            <Toolbar.Center>Global App Error</Toolbar.Center>
          </Toolbar>
        );
      }}
    >
      <Page.RelativeContent>
        <Pre sx={style}>
          <Code>
            {props.error.message}
            <br />
            <Divider sx={{ mt: 1.2, mb: 1.2 }} />
            If this problem persists, please reach out
            <br />
            to our{" "}
            <Anchor href="https://github.com/DerGoogler/MMRL/issues" noIcon>
              GitHub issues
            </Anchor>{" "}
            or visit our{" "}
            <Anchor href="https://github.com/DerGoogler/MMRL/blob/master/docs/faq.md" noIcon>
              FAQ page
            </Anchor>
            .
          </Code>
        </Pre>

        <Button fullWidth variant="contained" disableElevation onClick={props.resetErrorBoundary}>
          Try again
        </Button>

        <Pre lang="log" sx={style}>
          <Code>{props.errorInfo.componentStack}</Code>
        </Pre>
      </Page.RelativeContent>
    </Page>
  );
});

ons.ready(() => {
  customElements.define("mmrl-app", MMRLApp);
  customElements.define("mmrl-anchor", MMRLAnchor);

  render(
    <React.StrictMode>
      <ThemeProvider>
        <CssBaseline />
        <LightTheme />
        <ErrorBoundary
          fallback={(error, errorInfo, resetErrorBoundary) => {
            return <Fallback error={error} errorInfo={errorInfo} resetErrorBoundary={resetErrorBoundary} />;
          }}
        >
          <ModFSProvider>
            <SettingsProvider>
              <StringsProvider data={strs}>
                <Preventer prevent="contextmenu">
                  <RepoProvider>
                    <ConfirmProvider>
                      <MainActivity />
                    </ConfirmProvider>
                  </RepoProvider>
                </Preventer>
              </StringsProvider>
            </SettingsProvider>
          </ModFSProvider>
        </ErrorBoundary>
      </ThemeProvider>
    </React.StrictMode>,
    "mmrl-app"
  );
});
