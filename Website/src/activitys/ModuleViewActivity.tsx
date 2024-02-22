import { Page } from "@Components/onsenui/Page";
import { Toolbar } from "@Components/onsenui/Toolbar";
import { useStrings } from "@Hooks/useStrings";
import Box from "@mui/material/Box";
import React from "react";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import { Verified } from "@mui/icons-material";
import Stack from "@mui/material/Stack";
import { useActivity } from "@Hooks/useActivity";
import { StyledListItemText } from "@Components/StyledListItemText";
import { parseAndroidVersion } from "@Util/parseAndroidVersion";
import { Magisk } from "@Native/Magisk";
import { useTheme } from "@Hooks/useTheme";
import { os } from "@Native/Os";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import { useCategories } from "@Hooks/useCategories";
import { useFormatDate } from "@Hooks/useFormatDate";
import Chip from "@mui/material/Chip";
import CardMedia from "@mui/material/CardMedia";
import { useLog } from "@Hooks/native/useLog";
import { SuFile } from "@Native/SuFile";
import DescriptonActivity from "./DescriptonActivity";
import { useSettings } from "@Hooks/useSettings";
import TerminalActivity from "./TerminalActivity";
import { Shell } from "@Native/Shell";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import ListItemButton from "@mui/material/ListItemButton";
import BugReportIcon from "@mui/icons-material/BugReport";
import ListItemIcon from "@mui/material/ListItemIcon";
import { Disappear } from "react-disappear";
import Fade from "@mui/material/Fade";
import TelegramIcon from "@mui/icons-material/Telegram";
import VerifiedIcon from "@mui/icons-material/Verified";
import { useRepos } from "@Hooks/useRepos";
import PicturePreviewActivity from "./PicturePreviewActivity";
import GitHubIcon from "@mui/icons-material/GitHub";
import { useLowQualityModule } from "@Hooks/useLowQualityModule";
import FormatAlignLeftIcon from "@mui/icons-material/FormatAlignLeft";
import { useConfirm } from "material-ui-confirm";
import InstallMobileIcon from "@mui/icons-material/InstallMobile";
import DownloadIcon from "@mui/icons-material/Download";
import Tooltip from "@mui/material/Tooltip";
import { view } from "@Native/View";
import AntiFeatureListItem from "@Components/AntiFeatureListItem";
import FetchTextActivity from "./FetchTextActivity";
import { Image } from "@Components/dapi/Image";
import { useModFS } from "@Hooks/useModFS";

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div role="tabpanel" hidden={value !== index} id={`simple-tabpanel-${index}`} aria-labelledby={`simple-tab-${index}`} {...other}>
      {value === index && <Box>{children}</Box>}
    </div>
  );
}

const ModuleViewActivity = () => {
  const { strings, currentLanguage } = useStrings();
  const { settings } = useSettings();
  const { modules } = useRepos();
  const confirm = useConfirm();
  const { theme, scheme, shade } = useTheme();
  const { context, extra } = useActivity<Module>();

  const log = useLog("ModuleViewActivity");
  const { id, name, version, versionCode, description, author, versions, track } = extra;

  const categories = useCategories(track.categories);
  const { data } = useFetch<str>(track.readme);

  const latestVersion = React.useMemo(() => versions[versions.length - 1], [versions]);

  const formatLastUpdate = useFormatDate(latestVersion.timestamp);

  const search = React.useMemo(() => new URLSearchParams(window.location.search), [window.location.search]);

  const isLowQuality = useLowQualityModule(extra, !settings._low_quality_module);

  React.useEffect(() => {
    search.set("module", id);
    const newRelativePathQuery = window.location.pathname + "?" + search.toString();
    history.pushState(null, "", newRelativePathQuery);
    return () => {
      search.delete("module");
      const newRelativePathQuery = window.location.pathname + search.toString();
      history.pushState(null, "", newRelativePathQuery);
    };
  }, []);

  const renderToolbar = () => {
    return (
      <Toolbar
        modifier="noshadow"
        sx={{
          ...(track.cover
            ? {
                // invert
                backgroundColor: !isNameVisible ? "transparent" : theme.palette.background.default,
                transition: " background-color 0.05s linear",
              }
            : {}),
        }}
      >
        <Toolbar.Left>
          <Toolbar.BackButton onClick={context.popPage} />
        </Toolbar.Left>
        <Toolbar.Center>
          <Fade in={isNameVisible}>
            <span>{name}</span>
          </Fade>
        </Toolbar.Center>
        <Toolbar.Right>
          <Toolbar.Button
            icon={TelegramIcon}
            onClick={() => {
              os.open(
                `https://t.me/share/url?url=${encodeURIComponent(window.location.href)}&text=${encodeURIComponent(
                  "Check out this module on MMRL. Requires a machted repo to open this module. "
                )}`,
                {
                  target: "_blank",
                  features: {
                    color: theme.palette.primary.main,
                  },
                }
              );
            }}
          />
        </Toolbar.Right>
      </Toolbar>
    );
  };

  const { modFS } = useModFS();
  const [value, setValue] = React.useState(0);
  const [isNameVisible, setIsNameVisible] = React.useState(true);
  const hasInstallTools = SuFile.exist(`${modFS("MMRLINI")}/module.prop`);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Page
      modifier="noshadow"
      renderToolbar={renderToolbar}
      backgroundStyle={{
        ...(track.cover ? { top: `0px !important` } : {}),
      }}
      sx={{
        ...(track.cover ? { top: `0px !important` } : {}),
      }}
    >
      <Box
        component="div"
        sx={{
          position: "relative",
          zIndex: 9,
          backgroundColor: theme.palette.background.default,
          color: "white",
        }}
      >
        {track.cover && (
          <Box
            sx={(theme) => ({
              background: `linear-gradient(to top,${
                theme.palette.background.default
              } 0,rgba(0,0,0,0) calc(56% - ${view.getWindowTopInsets()}px))`,
            })}
          >
            <CardMedia
              component="img"
              sx={(theme) => ({
                zIndex: -1,
                display: "block",
                position: "relative",
                height: {
                  sm: `calc(calc(50vw - 48px + ${view.getWindowTopInsets()}px)*9/16)`,
                  xs: `calc(calc(100vw - 48px + ${view.getWindowTopInsets()}px)*9/16)`,
                },
                objectFit: "cover",
              })}
              image={track.cover}
              alt={name}
            />
          </Box>
        )}

        <Box
          sx={(theme) => ({
            pt: track.cover ? 0 : 2,
            pl: 2,
            pr: 2,
            pb: 2,
            backgroundColor: theme.palette.background.default,
            color: "white",
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
          })}
        >
          <Box
            sx={{
              display: "flex",
              width: "100%",
            }}
          >
            <Avatar
              alt={name}
              sx={(theme) => ({
                bgcolor: theme.palette.primary.dark,
                width: 100,
                height: 100,
                boxShadow: "0 -1px 5px rgba(0,0,0,.09), 0 3px 5px rgba(0,0,0,.06), 0 1px 2px rgba(0,0,0,.3), 0 1px 3px rgba(0,0,0,.15)",
                borderRadius: "20%",
                mr: 1.5,
                fontSize: 50,
              })}
              src={track.icon}
            >
              {name.charAt(0).toUpperCase()}
            </Avatar>

            <Box sx={{ alignSelf: "center", ml: 0.5, mr: 0.5, width: "100%" }}>
              <Stack direction="row" justifyContent="flex-start" alignItems="center" spacing={0.5}>
                <Disappear as={Typography} variant="body1" fontWeight="bold" onDisappear={(visible) => setIsNameVisible(!visible)}>
                  {name}
                </Disappear>
                {track.verified && (
                  <Tooltip title={strings("verified_module")} placement="right" arrow>
                    <Verified sx={{ fontSize: "unset", color: theme.palette.text.link }} />
                  </Tooltip>
                )}
              </Stack>
              <Typography variant="body2" color="text.secondary">
                {author}
              </Typography>
            </Box>
          </Box>

          <Stack
            sx={{
              mt: 3,
              display: "flex",
              width: "100%",
            }}
            direction="column"
            justifyContent="center"
            alignItems="flex-start"
            spacing={1}
          >
            {/* DL SECTION */}
            <Stack
              sx={{
                display: "flex",
                width: "100%",
              }}
              direction={{ xs: "column", sm: "row" }}
              justifyContent="space-between"
              spacing={1}
            >
              <Typography sx={{ display: "flex", justifyContent: "flex-start", alignItems: "center" }} color="text.secondary">
                {version} ({versionCode})
              </Typography>

              <Stack direction="row" justifyContent="center" alignItems="center" spacing={1}>
                {os.isAndroid && (Shell.isMagiskSU() || Shell.isKernelSU() || Shell.isAPatchSU()) && hasInstallTools && (
                  <Button
                    color="secondary"
                    sx={{
                      minWidth: 160,
                      width: { sm: "unset", xs: "100%" },
                      alignSelf: "flex-end",
                    }}
                    variant="contained"
                    onClick={() => {
                      confirm({
                        title: `Install ${name}?`,
                        confirmationText: "Yes",
                      }).then(() => {
                        context.pushPage({
                          component: TerminalActivity,
                          key: "TerminalActivity",
                          extra: {
                            id: id,
                            exploreInstall: true,
                            path: latestVersion.zipUrl,
                          },
                        });
                      });
                    }}
                  >
                    {strings("install")}
                  </Button>
                )}

                <Button
                  color="secondary"
                  disabled={!latestVersion.zipUrl}
                  onClick={() => {
                    os.open(latestVersion.zipUrl, {
                      target: "_blank",
                      features: {
                        color: theme.palette.primary.main,
                      },
                    });
                  }}
                  sx={{
                    minWidth: 160,
                    width: { sm: "unset", xs: "100%" },
                    alignSelf: "flex-end",
                  }}
                  variant="contained"
                >
                  {strings("download")}
                </Button>
              </Stack>
            </Stack>
          </Stack>
        </Box>
        <Tabs value={value} onChange={handleChange} indicatorColor="secondary" textColor="inherit" variant="fullWidth">
          <Tab label={strings("overview")} {...a11yProps(0)} />
          <Tab label={strings("versions")} {...a11yProps(1)} />
          <Tab label={strings("about")} {...a11yProps(2)} />
        </Tabs>
      </Box>

      <Page.RelativeContent>
        <CustomTabPanel value={value} index={0}>
          <Stack direction="column" justifyContent="center" alignItems="flex-start" spacing={1}>
            {isLowQuality && (
              <Alert severity="warning">
                <AlertTitle>{strings("low_quality_module")}</AlertTitle>
                {strings("low_quality_module_warn")}
              </Alert>
            )}

            <Card
              sx={{
                width: "100%",
              }}
            >
              <CardContent>
                <Stack
                  component={Typography}
                  sx={{
                    alignItems: "center",
                  }}
                  direction="row"
                  justifyContent={{ xs: "space-between", sm: "row" }}
                  spacing={1}
                  gutterBottom
                >
                  <Typography variant="h5" component="div">
                    {strings("about_this_module")}
                  </Typography>
                  {data && (
                    <IconButton
                      onClick={() => {
                        context.pushPage({
                          component: DescriptonActivity,
                          key: "DescriptonActivity",
                          extra: {
                            desc: data,
                            name: name,
                            logo: track.icon,
                          },
                        });
                      }}
                      sx={{ ml: 0.5 }}
                    >
                      <ArrowForwardIcon />
                    </IconButton>
                  )}
                </Stack>

                <Typography variant="body2" color="text.secondary">
                  {description}
                </Typography>
                <Typography sx={{ mt: 3 }} variant="h6" component="div">
                  {strings("updated_on")}
                  <Typography sx={{ fontSize: "0.875rem" }} variant="body2" component="div" color="text.secondary">
                    {formatLastUpdate}
                  </Typography>
                </Typography>
                {categories.length !== 0 && (
                  <Box
                    sx={{
                      display: "flex",
                      flexWrap: "wrap",
                      gap: "16px 12px",
                      mt: 3.5,
                    }}
                  >
                    {categories.map((category) => (
                      <Chip label={category} variant="outlined" />
                    ))}
                  </Box>
                )}
              </CardContent>
            </Card>

            {track.antifeatures ? (
              <Card
                sx={{
                  width: "100%",
                }}
              >
                <CardContent>
                  <Stack
                    component={Typography}
                    sx={{
                      alignItems: "center",
                    }}
                    variant="h5"
                    direction="row"
                    justifyContent={{ xs: "space-between", sm: "row" }}
                    spacing={1}
                    gutterBottom
                  >
                    {strings("antifeatures")}
                  </Stack>

                  <List disablePadding>
                    {typeof track.antifeatures === "string" ? (
                      <AntiFeatureListItem type={track.antifeatures} />
                    ) : (
                      Array.isArray(track.antifeatures) && track.antifeatures.map((anti) => <AntiFeatureListItem type={anti} />)
                    )}
                  </List>
                </CardContent>
              </Card>
            ) : null}

            {track.require && (
              <Card
                sx={{
                  // width: { xs: "100%", sm: "100vh" },

                  width: "100%",
                }}
              >
                <CardContent>
                  <Typography variant="h5" component="div">
                    {"Dependencies"}
                  </Typography>
                </CardContent>

                <Box
                  sx={{
                    display: "flex",
                    flexDirection: {
                      xs: "column", // mobile
                      sm: "row", // tablet and up
                    },
                  }}
                >
                  <List disablePadding sx={{ width: { xs: "100%" } }}>
                    {track.require.map((req) => {
                      const findRequire = React.useMemo(() => modules.find((module) => module.id === req), [modules]);

                      if (findRequire) {
                        return (
                          <ListItemButton
                            onClick={() => {
                              context.pushPage({
                                component: ModuleViewActivity,
                                key: "ModuleViewActivity",
                                extra: findRequire,
                              });
                            }}
                          >
                            <StyledListItemText
                              primary={findRequire.name}
                              secondary={`${findRequire.version} (${findRequire.versionCode})`}
                            />
                          </ListItemButton>
                        );
                      } else {
                        return (
                          <ListItem>
                            <StyledListItemText primary={req} />
                          </ListItem>
                        );
                      }
                    })}
                  </List>
                </Box>
              </Card>
            )}

            {track.screenshots && (
              <Card sx={{ /*width: { xs: "100%", sm: "100vh" },*/ width: "100%" }}>
                <CardContent>
                  <Typography variant="h5" component="div">
                    {strings("images")}
                  </Typography>
                </CardContent>

                <ImageList
                  sx={{
                    pt: 0,
                    p: 1,
                    overflow: "auto",
                    whiteSpace: "nowrap",
                    gridAutoFlow: "column",
                    gridTemplateColumns: "repeat(auto-fill,minmax(250px,1fr)) !important",
                    gridAutoColumns: "minmax(250px, 1fr)",
                  }}
                >
                  {track.screenshots.map((image, i) => (
                    <ImageListItem
                      sx={(theme) => ({
                        ml: 1,
                        mr: 1,
                      })}
                    >
                      <Box component={Image} src={image} />
                    </ImageListItem>
                  ))}
                </ImageList>
              </Card>
            )}
          </Stack>
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1}>
          <List>
            {versions.map((version) => (
              <VersionItem id={id} version={version} />
            ))}
          </List>
        </CustomTabPanel>
        <CustomTabPanel value={value} index={2}>
          <List>
            {track.verified && (
              <ListItem>
                <ListItemIcon>
                  <VerifiedIcon />
                </ListItemIcon>
                <StyledListItemText primary={strings("verified_module")} secondary={strings("verified_module_desc")} />
              </ListItem>
            )}

            {track.license && (
              <ListItemButton
                onClick={() => {
                  fetch(`https://raw.githubusercontent.com/spdx/license-list-data/main/website/${track.license}.json`)
                    .then((res) => {
                      if (res.status === 200) {
                        return res.json();
                      } else {
                        throw new Error("Fetching license failed");
                      }
                    })
                    .then((json: LicenseSPX) => {
                      context.pushPage({
                        component: FetchTextActivity,
                        key: "license_" + track.license,
                        extra: {
                          raw_data: json.licenseText,
                          modulename: json.name,
                        },
                      });
                    })
                    .catch((err) => {});
                }}
              >
                <ListItemIcon>
                  <FormatAlignLeftIcon />
                </ListItemIcon>
                <StyledListItemText primary={strings("license")} secondary={track.license} />
              </ListItemButton>
            )}

            {track.support && (
              <ListItemButton
                onClick={() => {
                  os.open(track.support, {
                    target: "_blank",
                    features: {
                      color: theme.palette.primary.main,
                    },
                  });
                }}
              >
                <ListItemIcon>
                  <BugReportIcon />
                </ListItemIcon>
                <StyledListItemText primary="Issues" secondary={track.support} />
              </ListItemButton>
            )}

            <ListItemButton
              onClick={() => {
                os.open(track.source, {
                  target: "_blank",
                  features: {
                    color: theme.palette.primary.main,
                  },
                });
              }}
            >
              <ListItemIcon>
                <GitHubIcon />
              </ListItemIcon>
              <StyledListItemText primary={strings("source")} secondary={track.source} />
            </ListItemButton>
          </List>
        </CustomTabPanel>
      </Page.RelativeContent>
    </Page>
  );
};

interface VersionItemProps {
  id: string;
  version: Version;
}

const VersionItem = React.memo<VersionItemProps>(({ id, version }) => {
  const ts = useFormatDate(version.timestamp);
  const { context } = useActivity();
  const confirm = useConfirm();
  const { theme } = useTheme();

  const versionName = `${version.version} (${version.versionCode})`;

  const handleInstall = () => {
    confirm({
      title: `Install ${versionName}?`,
      confirmationText: "Yes",
    }).then(() => {
      context.pushPage({
        component: TerminalActivity,
        key: "TerminalActivity",
        extra: {
          id: id,
          exploreInstall: true,
          path: version.zipUrl,
        },
      });
    });
  };

  return (
    <ListItem
      secondaryAction={
        <Stack direction="row" justifyContent="center" alignItems="center" spacing={0.5}>
          {os.isAndroid && (Shell.isMagiskSU() || Shell.isKernelSU() || Shell.isAPatchSU()) && (
            <IconButton onClick={handleInstall} edge="end" aria-label="install">
              <InstallMobileIcon />
            </IconButton>
          )}

          <IconButton
            disabled={!version.zipUrl}
            onClick={() => {
              os.open(version.zipUrl, {
                target: "_blank",
                features: {
                  color: theme.palette.primary.main,
                },
              });
            }}
            edge="end"
            aria-label="download"
          >
            <DownloadIcon />
          </IconButton>
        </Stack>
      }
    >
      <StyledListItemText primary={versionName} secondary={ts} />
    </ListItem>
  );
});

interface State {
  data?: string;
  error?: Error;
}

type Cache = { [url: string]: string };

// discriminated union type
type Action = { type: "loading" } | { type: "fetched"; payload: string } | { type: "error"; payload: Error };

export function useFetch<T = unknown>(url?: string, options?: RequestInit): State {
  const cache = React.useRef<Cache>({});

  // Used to prevent state update if the component is unmounted
  const cancelRequest = React.useRef<boolean>(false);

  const initialState: State = {
    error: undefined,
    data: undefined,
  };

  // Keep state logic separated
  const fetchReducer = (state: State, action: Action): State => {
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
        const response = await fetch(url, options);
        if (!response.ok) {
          throw new Error(response.statusText);
        }

        const data = await response.text();
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

  return state;
}

export default ModuleViewActivity;
