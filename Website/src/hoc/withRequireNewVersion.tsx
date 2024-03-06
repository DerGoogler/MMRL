import React from "react";
import Anchor from "@Components/dapi/Anchor";
import { Page } from "@Components/onsenui/Page";
import { Toolbar } from "@Components/onsenui/Toolbar";
import { useActivity } from "@Hooks/useActivity";
import { BuildConfig } from "@Native/BuildConfig";
import Box from "@mui/material/Box";

interface HOC_Options<P = {}> {
  versionCode?: number;
  component: React.FunctionComponent<P> | React.ComponentType<P>;
  title?: string;
  text?: React.ReactNode;
}

function withRequireNewVersion<P = {}>(opt: HOC_Options<P>): HOC_Options<P>["component"] {
  const {
    versionCode = BuildConfig.VERSION_CODE,
    component,
    title = "New version required!",
    text = (
      <>
        This config requires MMRL above {versionCode} (versionCode)
        <br />
        Check the latest <Anchor href="https://github.com/DerGoogler/MMRL/releases">release</Anchor>
      </>
    ),
  } = opt;
  const { context } = useActivity();

  if (BuildConfig.VERSION_CODE < versionCode) {
    return () => {
      return (
        <Page
          renderToolbar={() => {
            return (
              <Toolbar modifier="noshadow">
                <Toolbar.Left>
                  <Toolbar.BackButton onClick={context.popPage} />
                </Toolbar.Left>
                <Toolbar.Center>{title}</Toolbar.Center>
              </Toolbar>
            );
          }}
        >
          <Box
            component="span"
            sx={{
              position: "absolute",
              left: "50%",
              top: "calc(50% - 56px)",
              textAlign: "center",
              WebkitTransform: "translate(-50%, -50%)",
              transform: "translate(-50%, -50%)",
            }}
          >
            {text}
          </Box>
        </Page>
      );
    };
  } else {
    return component;
  }
}

export { withRequireNewVersion };
