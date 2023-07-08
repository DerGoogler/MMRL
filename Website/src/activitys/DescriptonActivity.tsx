import { ProgressCircular } from "react-onsenui";
import { Markup } from "@Components/Markdown";
import { useActivity } from "@Hooks/useActivity";
import React from "react";
import { Toolbar } from "@Components/onsenui/Toolbar";
import { Page } from "@Components/onsenui/Page";
import { StyledCard } from "@Components/StyledCard";
import Stack from "@mui/material/Stack";
import { StyledSection } from "@Components/StyledSection";
import { styled } from "@mui/material";
import { useSettings, useTheme } from "@Hooks/useSettings";
import useShadeColor from "@Hooks/useShadeColor";
import ChangelogActivity from "./ChangelogActivity";
import { CommentsActivity } from "./CommentsActivity";

import RestartAltIcon from "@mui/icons-material/RestartAlt";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import VerifiedIcon from "@mui/icons-material/Verified";
import SettingsIcon from "@mui/icons-material/Settings";
import CommentIcon from "@mui/icons-material/Comment";
import UpdateIcon from "@mui/icons-material/Update";
import DataUsageIcon from "@mui/icons-material/DataUsage";
import SupportIcon from "@mui/icons-material/Support";
import { os } from "@Native/Os";

type Extra = {
  title: string;
  desc: string | undefined;
  prop_url: ModuleProps;
  module_options: any;
  request: { url: string } | undefined;
};

interface State<T> {
  data?: T;
  error?: Error;
}
type Cache<T> = { [url: string]: T };
type Action<T> = { type: "loading" } | { type: "fetched"; payload: T } | { type: "error"; payload: Error };

function DescriptonActivity() {
  const { context, extra } = useActivity<Extra>();
  const { theme } = useTheme();
  const { desc, title, request, prop_url, module_options } = extra;

  // Create better handler
  const isVerified = module_options[prop_url.id]?.verified;
  const _display = module_options[prop_url.id]?.display;

  const initialState: State<string> = {
    error: undefined,
    data: desc,
  };

  // Keep state logic separated
  const fetchReducer = (state: State<string>, action: Action<string>): State<string> => {
    switch (action.type) {
      case "loading":
        return { ...initialState };
      case "fetched":
        return { ...initialState, data: action.payload };
      case "error":
        return { ...initialState, error: action.payload };
      default:
        return state;
    }
  };

  const [state, dispatch] = React.useReducer(fetchReducer, initialState);

  if (request) {
    const url = request.url;
    const cache = React.useRef<Cache<string>>({});

    // Used to prevent state update if the component is unmounted
    const cancelRequest = React.useRef<boolean>(false);

    React.useEffect(() => {
      // Do nothing if the url is not given
      if (!url) return;

      cancelRequest.current = false;

      const fetchData = async () => {
        dispatch({ type: "loading" });

        // If a cache exists for this url, return it
        if (cache.current[url]) {
          dispatch({ type: "fetched", payload: cache.current[url] });
          return;
        }

        try {
          const response = await fetch(url);
          if (!response.ok) {
            throw new Error(response.statusText);
          }

          const data = (await response.text()) as string;

          cache.current[url] = data;
          if (cancelRequest.current) return;

          dispatch({ type: "fetched", payload: data });
        } catch (error) {
          if (cancelRequest.current) return;

          dispatch({ type: "error", payload: error as Error });
        }
      };

      void fetchData();

      // Use the cleanup function for avoiding a possibly...
      // ...state update after the component was unmounted
      return () => {
        cancelRequest.current = true;
      };
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [url]);
  }

  const renderToolbar = () => {
    return (
      <Toolbar modifier="noshadow">
        <Toolbar.Left>
          <Toolbar.Button icon={ArrowBackIcon} onClick={context.popPage} />
        </Toolbar.Left>
        <Toolbar.Center>{title}</Toolbar.Center>
      </Toolbar>
    );
  };

  return (
    <Page renderToolbar={renderToolbar}>
      {!state.data ? (
        <ProgressCircular
          indeterminate
          style={{
            position: "absolute",
            left: "50%",
            top: "50%",
            WebkitTransform: "translate(-50%, -50%)",
            transform: "translate(-50%, -50%)",
          }}
        />
      ) : (
        <>
          <Markup children={state.data} style={{ marginBottom: 55 }} />

          <div
            style={{
              // backgroundColor: theme.palette.background.default,
              backdropFilter: "blur(10px)",
              position: "fixed",
              bottom: 0,
              left: 0,
              right: 0,
              height: 55,
              marginBottom: 0,
            }}
          >
            <Stack spacing={0.8} direction="row" alignItems="center" style={{ padding: 8 }}>
              {!(prop_url.mmrlNoComments === "true") && (
                <ViewModuleOptionsButton
                  style={{ width: 39 }}
                  onClick={() => {
                    context.pushPage({
                      component: CommentsActivity,
                      props: {
                        key: "comments_" + prop_url.id,
                        extra: {
                          id: prop_url.id,
                        },
                      },
                    });
                  }}
                >
                  <Stack spacing={0.8} direction="row" alignItems="center">
                    <CommentIcon sx={{ fontSize: 14 }} />
                  </Stack>
                </ViewModuleOptionsButton>
              )}

              {isVerified && (
                <ViewModuleOptionsButton>
                  <Stack spacing={0.8} direction="row" alignItems="center">
                    <VerifiedIcon sx={{ fontSize: 14 }} />
                    <span style={{ fontSize: 14 }}>Verified</span>
                  </Stack>
                </ViewModuleOptionsButton>
              )}

              {prop_url.mmrlChangelog && (
                <ViewModuleOptionsButton
                  onClick={() => {
                    context.pushPage({
                      component: ChangelogActivity,
                      props: {
                        key: "changelog" + prop_url.id,
                        extra: {
                          request: {
                            url: prop_url.mmrlChangelog,
                          },
                          title: "Changelog",
                        },
                      },
                    });
                  }}
                >
                  <Stack spacing={0.8} direction="row" alignItems="center">
                    <UpdateIcon sx={{ fontSize: 14 }} />
                    <span style={{ fontSize: 14 }}>Changelog</span>
                  </Stack>
                </ViewModuleOptionsButton>
              )}

              {prop_url.mmrlConfig && (
                <ViewModuleOptionsButton>
                  <Stack spacing={0.8} direction="row" alignItems="center">
                    <SettingsIcon sx={{ fontSize: 14 }} />
                    <span style={{ fontSize: 14 }}>Configureable</span>
                  </Stack>
                </ViewModuleOptionsButton>
              )}

              {prop_url.changeBoot === "true" && (
                <ViewModuleOptionsButton>
                  <Stack spacing={0.8} direction="row" alignItems="center">
                    <RestartAltIcon sx={{ fontSize: 14 }} />
                    <span style={{ fontSize: 14 }}>Changes boot</span>
                  </Stack>
                </ViewModuleOptionsButton>
              )}

              {prop_url.needRamdisk === "true" && (
                <ViewModuleOptionsButton>
                  <Stack spacing={0.8} direction="row" alignItems="center">
                    <DataUsageIcon sx={{ fontSize: 14 }} />
                    <span style={{ fontSize: 14 }}>Needs Ramdisk</span>
                  </Stack>
                </ViewModuleOptionsButton>
              )}

              {prop_url.support && (
                <ViewModuleOptionsButton
                  onClick={() => {
                    os.open(prop_url.support, {
                      target: "_blank",
                      features: {
                        color: theme.palette.primary.main,
                      },
                    });
                  }}
                >
                  <Stack spacing={0.8} direction="row" alignItems="center">
                    <SupportIcon sx={{ fontSize: 14 }} />
                    <span style={{ fontSize: 14 }}>Support</span>
                  </Stack>
                </ViewModuleOptionsButton>
              )}
            </Stack>
          </div>
        </>
      )}
    </Page>
  );
}

const ViewModuleOptionsButton = styled("span")(({ theme }) => {
  const { settings, setSettings } = useSettings();
  const { scheme } = useTheme();
  const shade = useShadeColor();

  return {
    height: 39,

    // fontSize: "inherit",
    display: "flex",
    alignItems: "center",

    MozBoxAlign: "center",
    // alignItems: "center",
    MozBoxPack: "center",
    justifyContent: "center",
    position: "relative",
    boxSizing: "border-box",
    backgroundColor: "transparent",
    outline: "currentcolor none 0px",
    margin: "0px",
    cursor: "pointer",
    userSelect: "none",
    verticalAlign: "middle",
    appearance: "none",
    textDecoration: "none",
    textAlign: "center",
    flex: "0 0 auto",
    fontSize: "1.5rem",
    padding: "8px",
    overflow: "visible",
    transition: "background-color 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
    border: `1px solid ${!settings.darkmode ? "rgb(66, 66, 66)" : shade(scheme[700], -61)}`,
    // borderTopColor: theme.palette.divider,
    // borderRightColor: theme.palette.divider,
    // borderBottomColor: theme.palette.divider,
    // borderLeftColor: theme.palette.divider,
    color: !settings.darkmode ? "rgb(66, 66, 66)" : shade(scheme[700], -61),
    borderRadius: theme.shape.borderRadius,
    alignSelf: "flex-start",
    ":hover": {
      borderColor: theme.palette.primary.main,
      color: theme.palette.primary.main,
      backgroundColor: "rgba(0, 0, 0, 0.04)",
    },
  };
});

export default DescriptonActivity;
