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
import ListSubheader from "@mui/material/ListSubheader";
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
import { useSupportIconForUrl } from "@Hooks/useSupportIconForUrl";
import { useLog } from "@Hooks/native/useLog";
import { SuFile } from "@Native/SuFile";
import DescriptonActivity from "./DescriptonActivity";
import { useSettings } from "@Hooks/useSettings";
import TerminalActivity from "./TerminalActivity";
import { Shell } from "@Native/Shell";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import ListItemButton from "@mui/material/ListItemButton";
import SourceIcon from "@mui/icons-material/Source";
import BugReportIcon from "@mui/icons-material/BugReport";
import ListItemIcon from "@mui/material/ListItemIcon";
import { Disappear } from "react-disappear";
import Fade from "@mui/material/Fade";
import TelegramIcon from "@mui/icons-material/Telegram";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import { useRepos } from "@Hooks/useRepos";
import PicturePreviewActivity from "./PicturePreviewActivity";

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
  const { strings } = useStrings();
  const { settings } = useSettings();
  const { modules } = useRepos();
  const { theme, scheme, shade } = useTheme();
  const { context, extra } = useActivity<Module>();

  const log = useLog("ModuleViewActivity");
  const { id, name, version, versionCode, description, author, readme, about, download, mmrl, fox, last_update } = extra;

  const categories = useCategories(mmrl.categories);
  const { data } = useFetch<str>(readme);
  const formatLastUpdate = useFormatDate(last_update);

  const hasInstallTools = SuFile.exist("/data/adb/modules/mmrl_install_tools/module.prop");
  const { SupportIcon, supportText } = useSupportIconForUrl(fox.support);

  const search = React.useMemo(() => new URLSearchParams(window.location.search), [window.location.search]);

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
      <Toolbar modifier="noshadow">
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

  const [value, setValue] = React.useState(0);
  const [isNameVisible, setIsNameVisible] = React.useState(true);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Page modifier="noshadow" renderToolbar={renderToolbar}>
      <Box
        component="div"
        sx={{
          position: "relative",
          zIndex: 9,
          backgroundColor: theme.palette.primary.main,
          color: "white",
        }}
      >
        {mmrl.cover && (
          <Box
            sx={(theme) => ({
              background: `linear-gradient(to top,${theme.palette.primary.main} 0,rgba(0,0,0,0) 56%)`,
            })}
          >
            <CardMedia
              component="img"
              sx={(theme) => ({
                zIndex: -1,
                display: "block",
                position: "relative",
                height: {
                  sm: "calc(calc(50vw - 48px)*9/16)",
                  xs: "calc(calc(100vw - 48px)*9/16)",
                },
                objectFit: "cover",
              })}
              image={mmrl.cover}
              alt={name}
            />
          </Box>
        )}

        <Box
          sx={(theme) => ({
            pt: mmrl.cover ? 0 : 2,
            pl: 2,
            pr: 2,
            pb: 2,
            backgroundColor: theme.palette.primary.main,
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
                bgcolor: theme.palette.primary.light,
                width: 100,
                height: 100,
                boxShadow: "0 -1px 5px rgba(0,0,0,.09), 0 3px 5px rgba(0,0,0,.06), 0 1px 2px rgba(0,0,0,.3), 0 1px 3px rgba(0,0,0,.15)",
                borderRadius: "20%",
                mr: 1.5,
                fontSize: 50,
              })}
              src={mmrl.logo}
            >
              {name.charAt(0).toUpperCase()}
            </Avatar>

            <Box sx={{ alignSelf: "center", ml: 0.5, mr: 0.5, width: "100%" }}>
              <Disappear as={Typography} variant="body1" fontWeight="bold" onDisappear={(visible) => setIsNameVisible(!visible)}>
                {name}
              </Disappear>
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
            direction={{ xs: "column", sm: "row" }}
            justifyContent="space-between"
            spacing={1}
          >
            <Typography sx={{ display: "flex", justifyContent: "flex-start", alignItems: "center" }} color="text.secondary">
              {version} ({versionCode})
            </Typography>

            <Stack direction={{ xs: "column", sm: "row" }} spacing={1}>
              {fox.support && (
                <Button
                  sx={{
                    color: settings.darkmode ? scheme[700] : shade(scheme[200], settings.shade_value),
                    border: settings.darkmode ? `1px solid ${scheme[500]}` : `1px solid ${shade(scheme[600], settings.shade_value)}`,
                    ":hover": {
                      color: settings.darkmode ? scheme[700] : shade(scheme[200], settings.shade_value),
                      border: settings.darkmode ? `1px solid ${scheme[700]}` : `1px solid ${shade(scheme[200], settings.shade_value)}`,
                    },
                    minWidth: 160,
                    width: { sm: "unset", xs: "100%" },
                    alignSelf: "flex-end",
                  }}
                  variant="outlined"
                  startIcon={<SupportIcon />}
                  onClick={() => {
                    os.open(fox.support, {
                      target: "_blank",
                      features: {
                        color: theme.palette.primary.main,
                      },
                    });
                  }}
                >
                  {supportText}
                </Button>
              )}

              <Stack direction="row" justifyContent="center" alignItems="center" spacing={1}>
                {os.isAndroid && (Shell.isMagiskSU() || Shell.isKernelSU()) && hasInstallTools && (
                  <Button
                    sx={{
                      color: settings.darkmode ? scheme[900] : scheme[600],
                      bgcolor: settings.darkmode ? scheme[500] : shade(scheme[600], settings.shade_value),
                      ":hover": {
                        bgcolor: settings.darkmode ? scheme[700] : shade(scheme[200], settings.shade_value),
                      },
                      minWidth: 160,
                      width: { sm: "unset", xs: "100%" },
                      alignSelf: "flex-end",
                    }}
                    variant="outlined"
                    onClick={() => {
                      context.pushPage({
                        component: TerminalActivity,
                        key: "TerminalActivity",
                        extra: {
                          exploreInstall: true,
                          path: download,
                        },
                      });
                    }}
                  >
                    {strings("install")}
                  </Button>
                )}

                <Button
                  disabled={!download}
                  onClick={() => {
                    os.open(download, {
                      target: "_blank",
                      features: {
                        color: theme.palette.primary.main,
                      },
                    });
                  }}
                  sx={{
                    color: settings.darkmode ? scheme[900] : scheme[600],
                    bgcolor: settings.darkmode ? scheme[500] : shade(scheme[600], settings.shade_value),
                    ":hover": {
                      bgcolor: settings.darkmode ? scheme[700] : shade(scheme[200], settings.shade_value),
                    },
                    minWidth: 160,
                    width: { sm: "unset", xs: "100%" },
                    alignSelf: "flex-end",
                  }}
                  variant="contained"
                  disableElevation
                >
                  {strings("download")}
                </Button>
              </Stack>
            </Stack>
          </Stack>
        </Box>
        <Tabs value={value} onChange={handleChange} indicatorColor="secondary" textColor="inherit" variant="fullWidth">
          <Tab label={strings("overview")} {...a11yProps(0)} />
          <Tab label={strings("about")} {...a11yProps(1)} />
        </Tabs>
      </Box>

      <Page.RelativeContent>
        <CustomTabPanel value={value} index={0}>
          <Stack direction="column" justifyContent="center" alignItems="flex-start" spacing={1}>
            {fox.minApi && os.sdk <= fox.minApi && (
              <Alert
                sx={{
                  width: "100%",
                }}
                severity="warning"
              >
                <AlertTitle>{strings("unsupported")}</AlertTitle>
                {strings("require_sdk", { sdk: parseAndroidVersion(fox.minApi) })}
              </Alert>
            )}

            {mmrl.screenshots && (
              <Card elevation={0} sx={{ /*width: { xs: "100%", sm: "100vh" },*/ width: "100%" }}>
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
                  {mmrl.screenshots.map((image, i) => (
                    <ImageListItem
                      sx={(theme) => ({
                        ml: 1,
                        mr: 1,
                      })}
                    >
                      <Box
                        component="img"
                        src={image}
                        sx={(theme) => ({
                          boxShadow: "0 1px 2px 0 rgba(60,64,67,.3), 0 1px 3px 1px rgba(60,64,67,.15)",
                          borderRadius: theme.shape.borderRadius / theme.shape.borderRadius,
                        })}
                        onClick={() => {
                          context.pushPage({
                            component: PicturePreviewActivity,
                            key: "PicturePreviewActivity",
                            extra: {
                              picture: image,
                            },
                          });
                        }}
                      />
                    </ImageListItem>
                  ))}
                </ImageList>
              </Card>
            )}

            {data ? (
              <Card
                elevation={0}
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
                    <IconButton
                      onClick={() => {
                        context.pushPage({
                          component: DescriptonActivity,
                          key: "DescriptonActivity",
                          extra: {
                            desc: data,
                            name: name,
                            logo: mmrl.logo,
                          },
                        });
                      }}
                      sx={{ ml: 0.5 }}
                    >
                      <ArrowForwardIcon />
                    </IconButton>
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
            ) : null}

            {mmrl.require && (
              <Card
                elevation={0}
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
                    {mmrl.require.map((req) => {
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

            <Card
              elevation={0}
              sx={{
                // width: { xs: "100%", sm: "100vh" },

                width: "100%",
              }}
            >
              <CardContent>
                <Typography variant="h5" component="div">
                  {strings("requirements")}
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
                <List
                  sx={{ width: { xs: "100%" } }}
                  subheader={<ListSubheader sx={{ bgcolor: "transparent" }}>{strings("access")}</ListSubheader>}
                >
                  <ListItem>
                    <StyledListItemText primary={strings("change_boot")} secondary={fox.changeBoot ? strings("yes") : strings("no")} />
                  </ListItem>

                  <ListItem>
                    <StyledListItemText primary={strings("need_ramdisk")} secondary={fox.needRamdisk ? strings("yes") : strings("no")} />
                  </ListItem>

                  <ListItem>
                    <StyledListItemText primary="MMT-Reborn" secondary={fox.mmtReborn ? strings("yes") : strings("no")} />
                  </ListItem>
                </List>

                <List
                  sx={{ width: { xs: "100%" } }}
                  subheader={<ListSubheader sx={{ bgcolor: "transparent" }}>{strings("minimum")}</ListSubheader>}
                >
                  <ListItem>
                    <StyledListItemText
                      primary={strings("operating_sys")}
                      secondary={fox.minApi ? parseAndroidVersion(fox.minApi) : strings("unset")}
                    />
                  </ListItem>

                  <ListItem>
                    <StyledListItemText
                      primary="Magisk"
                      secondary={fox.minMagisk ? Magisk.PARSE_VERSION(String(fox.minMagisk)) : strings("unset")}
                    />
                  </ListItem>
                </List>

                <List
                  sx={{ width: { xs: "100%" } }}
                  subheader={<ListSubheader sx={{ bgcolor: "transparent" }}>{strings("recommended")}</ListSubheader>}
                >
                  <ListItem>
                    <StyledListItemText
                      primary={strings("operating_sys")}
                      secondary={fox.maxApi ? parseAndroidVersion(fox.maxApi) : strings("unset")}
                    />
                  </ListItem>
                </List>
              </Box>
            </Card>
          </Stack>
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1}>
          <List>
            {about.issues && (
              <ListItemButton
                onClick={() => {
                  os.open(about.issues, {
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
                <StyledListItemText primary="Issues" secondary={about.issues} />
              </ListItemButton>
            )}

            <ListItemButton
              onClick={() => {
                os.open(about.source, {
                  target: "_blank",
                  features: {
                    color: theme.palette.primary.main,
                  },
                });
              }}
            >
              <ListItemIcon>
                <SourceIcon />
              </ListItemIcon>
              <StyledListItemText primary={strings("source")} secondary={about.source} />
            </ListItemButton>
          </List>
        </CustomTabPanel>
      </Page.RelativeContent>
    </Page>
  );
};

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
