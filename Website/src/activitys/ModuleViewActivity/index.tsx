import { Page } from "@Components/onsenui/Page";
import { Toolbar } from "@Components/onsenui/Toolbar";
import { useStrings } from "@Hooks/useStrings";
import Box from "@mui/material/Box";
import React from "react";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import { VolunteerActivism } from "@mui/icons-material";
import Stack from "@mui/material/Stack";
import { useActivity } from "@Hooks/useActivity";
import { useTheme } from "@Hooks/useTheme";
import { os } from "@Native/Os";
import SvgIcon from "@mui/material/SvgIcon";
import CardMedia from "@mui/material/CardMedia";
import { SuFile } from "@Native/SuFile";
import InstallTerminalActivity, { TerminalActivityExtra } from "../InstallTerminalActivity";
import { Shell } from "@Native/Shell";
import { Disappear } from "react-disappear";
import Fade from "@mui/material/Fade";
import TelegramIcon from "@mui/icons-material/Telegram";
import { useConfirm } from "material-ui-confirm";
import Tooltip from "@mui/material/Tooltip";
import { view } from "@Native/View";
import { useModFS } from "@Hooks/useModFS";
import { OverviewTab } from "./tabs/OverviewTab";
import { VersionsTab } from "./tabs/VersionsTab";
import { AboutTab } from "./tabs/AboutTabs";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Divider from "@mui/material/Divider";
import { useRepos } from "@Hooks/useRepos";
import { useOpenModuleSearch } from "@Hooks/useOpenModuleSearch";
import { VerifiedIcon } from "@Components/icons/VerifiedIcon";

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
  const confirm = useConfirm();
  const { theme } = useTheme();
  const { modules } = useRepos();
  const { context, extra } = useActivity<Module>();

  const { id, name, version, versionCode, author, versions, track } = extra;
  const latestVersion = React.useMemo(() => versions[versions.length - 1], [versions]);

  const search = React.useMemo(() => new URLSearchParams(window.location.search), [window.location.search]);
  const handleOpenModuleSearch = useOpenModuleSearch(modules);

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
  const [isNameVisible, setIsNameVisible] = React.useState(true);
  const hasInstallTools = SuFile.exist(`${modFS("MMRLINI")}/module.prop`);

  const boxRef = React.useRef<HTMLDivElement | null>(null);
  const [value, setValue] = React.useState(0);
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
        ref={boxRef}
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
              sx={{
                filter: `url(#${id}-cover-blur)`,
                zIndex: -1,
                display: "block",
                position: "relative",
                height: {
                  sm: `calc(calc(50vw - 48px + ${view.getWindowTopInsets()}px)*9/16)`,
                  xs: `calc(calc(100vw - 48px + ${view.getWindowTopInsets()}px)*9/16)`,
                },
                objectFit: "cover",
              }}
              image={track.cover}
              alt={name}
            />
            <SvgIcon sx={{ display: "none" }}>
              <svg>
                <defs>
                  <filter id={`${id}-cover-blur`}>
                    <feGaussianBlur stdDeviation="3"></feGaussianBlur>
                    <feColorMatrix type="matrix" values="1 0 0 0 0, 0 1 0 0 0, 0 0 1 0 0, 0 0 0 9 0"></feColorMatrix>
                    <feComposite in2="SourceGraphic" operator="in"></feComposite>
                  </filter>
                </defs>
              </svg>
            </SvgIcon>
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
                <VerifiedIcon isVerified={track.verified} />
              </Stack>
              <Typography
                variant="body2"
                onClick={() => handleOpenModuleSearch(author)}
                sx={{
                  ":hover": {
                    cursor: "pointer",
                  },
                }}
                color="text.link"
              >
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
              <Stack
                sx={{ display: "flex" }}
                direction="row"
                divider={
                  <Divider
                    sx={{
                      height: "24px",
                      alignSelf: "center",
                    }}
                    orientation="vertical"
                  />
                }
                spacing={2}
              >
                <Stack direction="column" justifyContent="center" alignItems="stretch" spacing={0}>
                  <Typography variant="body2" align="center">
                    {version}
                  </Typography>
                  <Typography variant="caption" display="block" align="center" color="text.secondary">
                    name
                  </Typography>
                </Stack>

                <Stack direction="column" justifyContent="center" alignItems="stretch" spacing={0}>
                  <Typography variant="body2" align="center">
                    {versionCode}
                  </Typography>
                  <Typography variant="caption" display="block" align="center" color="text.secondary">
                    code
                  </Typography>
                </Stack>
                {track.donate && (
                  <Stack
                    direction="column"
                    justifyContent="center"
                    alignItems="stretch"
                    spacing={0}
                    onClick={() => {
                      os.open(track.donate, {
                        target: "_blank",
                        features: {
                          color: theme.palette.primary.main,
                        },
                      });
                    }}
                    sx={{ cursor: "pointer" }}
                  >
                    <Typography variant="body2" align="center">
                      <VolunteerActivism sx={{ fontSize: "0.875rem" }} />
                    </Typography>
                    <Typography variant="caption" display="block" align="center" color="text.secondary">
                      donate
                    </Typography>
                  </Stack>
                )}
              </Stack>

              {/* <Typography sx={{ display: "flex", justifyContent: "flex-start", alignItems: "center" }} color="text.secondary">
                ({versionCode})
              </Typography> */}

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
                        context.pushPage<TerminalActivityExtra, {}>({
                          component: InstallTerminalActivity,
                          key: "InstallTerminalActivity",
                          extra: {
                            issues: track.support,
                            source: track.source,
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
          <OverviewTab />
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1}>
          <VersionsTab />
        </CustomTabPanel>
        <CustomTabPanel value={value} index={2}>
          <AboutTab />
        </CustomTabPanel>
      </Page.RelativeContent>
    </Page>
  );
};

export default ModuleViewActivity;
