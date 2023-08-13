import { ProgressCircular } from "react-onsenui";
import { Markup } from "@Components/Markdown";
import { useActivity } from "@Hooks/useActivity";
import React from "react";
import { Toolbar } from "@Components/onsenui/Toolbar";
import { Page } from "@Components/onsenui/Page";
import { StyledCard } from "@Components/StyledCard";
import Stack from "@mui/material/Stack";
import { Alert, AlertTitle, Avatar, Button } from "@mui/material";
import { CommentsActivity } from "./CommentsActivity";
import { os } from "@Native/Os";
import { useStrings } from "@Hooks/useStrings";

import { getDatabase, set, ref, update, onValue, get, query } from "firebase/database";
import { getAuth } from "firebase/auth";
import { firebaseApp } from "@Util/firebase";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import VerifiedIcon from "@mui/icons-material/Verified";
import CommentIcon from "@mui/icons-material/Comment";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import DeviceUnknownIcon from "@mui/icons-material/DeviceUnknown";
import ModuleSpecsActivity from "./ModuleSpecsActivity";
import { parseAndroidVersion } from "@Util/parseAndroidVersion";
import { useTheme } from "@Hooks/useTheme";
import { StyledIconButtonWithText } from "@Components/StyledIconButton";
import { useModuleOptions } from "@Hooks/useModuleOptions";
import { useSupportIconForUrl } from "@Hooks/useSupportIconForUrl";
import TerminalActivity from "./TerminalActivity";
import { BottomToolbar } from "@Components/onsenui/BottomToolbar";

type Extra = {
  title: string;
  desc: string | undefined;
  prop_url?: ModuleProps;
  module_options?: any;
  type: "module" | "request";
  request?: { url: string } | undefined;
  zip_url?: string;
};

interface State<T> {
  data?: T;
  error?: Error;
}
type Cache<T> = { [url: string]: T };
type Action<T> = { type: "loading" } | { type: "fetched"; payload: T } | { type: "error"; payload: Error };

const auth = getAuth(firebaseApp);
const db = getDatabase(firebaseApp);

function DescriptonActivity() {
  const { context, extra } = useActivity<Extra>();
  const { strings } = useStrings();
  const { theme } = useTheme();
  const { desc, title, request, prop_url, zip_url, module_options } = extra;

  const { isVerified, isHidden } = useModuleOptions(prop_url?.id);

  const SupportIcon = useSupportIconForUrl(prop_url?.support);

  const initialState: State<string> = {
    error: undefined,
    data: desc,
  };

  const overrideBackButton = () => {
    // Removes param from url
    context.popPage({ popParam: "module" });
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

  const [authorData, setAuthorData] = React.useState<any>({});

  React.useEffect(() => {
    if (prop_url?.mmrlAuthor) {
      const dbRef = ref(db, "users/" + prop_url.mmrlAuthor);
      onValue(query(dbRef), (snapshot) => {
        setAuthorData(snapshot.val());
      });
    } else {
      setAuthorData(undefined);
    }
  }, []);

  const renderToolbar = () => {
    return (
      <Toolbar modifier="noshadow">
        <Toolbar.Left>
          <Toolbar.Button icon={ArrowBackIcon} onClick={overrideBackButton} />
        </Toolbar.Left>
        <Toolbar.Center>{title}</Toolbar.Center>
      </Toolbar>
    );
  };

  return (
    <Page
      renderToolbar={renderToolbar}
      onDeviceBackButton={overrideBackButton}
      renderBottomToolbar={() => {
        return zip_url ? (
          <BottomToolbar modifier="transparent" style={{ padding: 8 }}>
            <Stack spacing={0.8} direction="row" alignItems="center" style={{ height: "100%" }}>
              <Button
                fullWidth
                variant="contained"
                disableElevation
                onClick={() => {
                  os.open(zip_url);
                }}
                startIcon={<FileDownloadIcon />}
              >
                {strings.download}
              </Button>
              {/* {os.isAndroid && (
                    <Button
                      fullWidth
                      variant="contained"
                      disableElevation
                      onClick={() => {
                        context.pushPage({
                          component: TerminalActivity,
                          props: {
                            key: "explore_install",
                            extra: {
                              exploreInstall: true,
                              path: zip_url,
                            },
                          },
                        }); 
                      }}
                    >
                      {strings.install}
                    </Button>
                  )} */}
            </Stack>
          </BottomToolbar>
        ) : null;
      }}
    >
      <Page.RelativeContent zeroMargin>
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
            {prop_url && (
              <StyledCard elevation={0} style={{ margin: "16px 8px 0px 8px" }}>
                <Stack direction="column" justifyContent="center" alignItems="flex-start" spacing={2}>
                  <Stack spacing={0.8} direction="row" alignItems="center" style={{ padding: authorData ? "8px 8px 0px 8px" : "8px" }}>
                    {!(prop_url.mmrlNoComments === "true") && (
                      <StyledIconButtonWithText
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
                      </StyledIconButtonWithText>
                    )}

                    {isVerified && (
                      <StyledIconButtonWithText>
                        <Stack spacing={0.8} direction="row" alignItems="center">
                          <VerifiedIcon sx={{ fontSize: 14 }} />
                          <span style={{ fontSize: 14 }}>{strings.verified}</span>
                        </Stack>
                      </StyledIconButtonWithText>
                    )}

                    <StyledIconButtonWithText
                      onClick={() => {
                        context.pushPage({
                          component: ModuleSpecsActivity,
                          props: {
                            key: "comments_" + prop_url.id,
                            extra: {
                              prop_url: prop_url,
                            },
                          },
                        });
                      }}
                    >
                      <Stack spacing={0.8} direction="row" alignItems="center">
                        <DeviceUnknownIcon sx={{ fontSize: 14 }} />
                        <span style={{ fontSize: 14 }}>Specs</span>
                      </Stack>
                    </StyledIconButtonWithText>

                    {prop_url.support && (
                      <StyledIconButtonWithText
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
                      </StyledIconButtonWithText>
                    )}
                  </Stack>

                  {prop_url.minApi && os.sdk <= Number(prop_url.minApi) && (
                    <Alert style={{ borderRadius: 0, width: "100%" }} severity="warning">
                      <AlertTitle>Unsupported</AlertTitle>
                      Module requires {parseAndroidVersion(prop_url.minApi)}
                    </Alert>
                  )}

                  {/* User info */}
                  {authorData && (
                    <Stack
                      style={{ padding: "0px 8px 8px 8px" }}
                      direction="row"
                      justifyContent="flex-start"
                      alignItems="center"
                      spacing={1}
                    >
                      <Avatar alt={authorData.username} src={authorData.picurl} sx={{ width: 24, height: 24 }} />
                      <Stack direction="row" justifyContent="flex-start" alignItems="center" spacing={0.5}>
                        <span style={{ fontSize: 14 }}>{authorData.username}</span>
                        {authorData.options?.verified && <VerifiedIcon sx={{ fontSize: 14 }} />}
                      </Stack>
                    </Stack>
                  )}
                </Stack>
              </StyledCard>
            )}

            <Markup children={state.data} />
          </>
        )}
      </Page.RelativeContent>
    </Page>
  );
}

export default DescriptonActivity;
