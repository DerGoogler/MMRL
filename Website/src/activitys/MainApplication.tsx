import CodeRoundedIcon from "@mui/icons-material/CodeRounded";
import React from "react";
import Typography from "@mui/material/Typography";
import MenuIcon from "@mui/icons-material/Menu";
import FetchTextActivity from "./FetchTextActivity";
import ModuleFragment from "./fragments/ModuleFragment";
import TerminalActivity from "./TerminalActivity";
import DeviceModule from "@Components/module/DeviceModule";
import ExploreModule from "@Components/module/ExploreModule";
import UpdateModule from "@Components/module/UpdateModule";
import ModuleViewActivity from "./ModuleViewActivity";
import CreateNewFolderIcon from "@mui/icons-material/CreateNewFolder";
import { useActivity } from "@Hooks/useActivity";
import { Toolbar } from "@Components/onsenui/Toolbar";
import { os } from "@Native/Os";
import { Page } from "@Components/onsenui/Page";
import { useStrings } from "@Hooks/useStrings";
import { Tabbar, TabbarRenderTab } from "@Components/onsenui/Tabbar";
import { useRepos } from "@Hooks/useRepos";
import { SuFile } from "@Native/SuFile";
import { BuildConfig } from "@Native/BuildConfig";
import SearchIcon from "@mui/icons-material/Search";
import { useModFS } from "@Hooks/useModFS";
import Fab from "@Components/onsenui/Fab";
import { useLocalModules } from "@Hooks/useLocalModules";
import { Shell } from "@Native/Shell";
import { SearchActivity } from "./SearchActivity";
import ListItemButton from "@mui/material/ListItemButton";
import VerifiedIcon from "@mui/icons-material/Verified";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import Chip from "@mui/material/Chip";
import { ModConfView } from "@Components/ModConfView";
import ListItemText from "@mui/material/ListItemText";
import { useSettings } from "@Hooks/useSettings";

const MainApplication = () => {
  const { strings } = useStrings();
  const { settings } = useSettings();
  const { modFS } = useModFS();
  const { context } = useActivity();
  const { modules } = useRepos();
  const [index, setIndex] = React.useState(0);
  const localModules = useLocalModules();

  React.useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get("module");
    const m_ = modules.find((m) => m.id === id);
    if (m_) {
      context.pushPage({
        component: ModuleViewActivity,
        key: "ModuleViewActivity",
        extra: m_,
      });
    }
  }, [modules]);

  const hasInstallTools = SuFile.exist(`${modFS("MMRLINI")}/module.prop`);

  const renderTabs = (): TabbarRenderTab[] => {
    return [
      {
        content: (
          <ModuleFragment id="explore" modules={modules} renderItem={(module, key) => <ExploreModule key={key} module={module} />} />
        ),
        tab: <Tabbar.Tab label={strings("explore")} />,
      },
      ...(os.isAndroid
        ? [
            {
              content: (
                <ModuleFragment
                  disableNoInternet
                  id="local"
                  modules={localModules}
                  renderItem={(module, key) => <DeviceModule key={key} module={module} />}
                  renderFixed={() => {
                    if (os.isAndroid && (Shell.isMagiskSU() || Shell.isKernelSU() || Shell.isAPatchSU()) && hasInstallTools) {
                      return (
                        <Fab
                          sx={{
                            "& .fab__icon": {
                              verticalAlign: "middle",
                            },
                          }}
                          onClick={() => {
                            Chooser.getFile(
                              "application/zip",
                              (file) => {
                                if (file !== "RESULT_CANCELED") {
                                  context.pushPage({
                                    component: TerminalActivity,
                                    key: "TerminalActivity",
                                    extra: {
                                      exploreInstall: false,
                                      path: file.path,
                                    },
                                  });
                                }
                              },
                              null
                            );
                          }}
                          position="bottom right"
                        >
                          <CreateNewFolderIcon />
                        </Fab>
                      );
                    }
                  }}
                />
              ),
              tab: <Tabbar.Tab label={strings("installed")} />,
            },
            {
              content: (
                <ModuleFragment
                  id="update"
                  modules={localModules}
                  renderItem={(module, key) => <UpdateModule key={key} module={module} />}
                />
              ),
              tab: <Tabbar.Tab label={strings("updates")} />,
            },
          ]
        : []),
    ];
  };

  React.useEffect(() => {
    fetch("https://raw.githubusercontent.com/DerGoogler/MMRL/master/Website/package.json")
      .then((res) => res.json())
      .then((json) => {
        if (json.config.version_code > BuildConfig.VERSION_CODE) {
          context.pushPage({
            component: FetchTextActivity,
            key: "changelog",
            extra: {
              rendering: ModConfView,
              url: "https://raw.githubusercontent.com/wiki/DerGoogler/MMRL/JSX-Changelog.md",
              modulename: "Update available!",
            },
          });
        }
      });
  }, []);

  const handleOpenSearch = () => {
    context.pushPage({
      component: SearchActivity,
      key: "SearchActivity",
      props: {
        list: modules,
        search: {
          by: ["id", "name", "author", "description"],
          caseInsensitive: true,
        },

        renderList(item: Module, index) {
          return (
            <ListItemButton
              key={item.id}
              onClick={() => {
                context.pushPage({
                  component: ModuleViewActivity,
                  key: "ModuleViewActivity",
                  extra: item,
                });
              }}
            >
              <ListItemAvatar>
                <Avatar
                  alt={item.name}
                  sx={(theme) => ({
                    bgcolor: theme.palette.primary.dark,
                    boxShadow: "0 -1px 5px rgba(0,0,0,.09), 0 3px 5px rgba(0,0,0,.06), 0 1px 2px rgba(0,0,0,.3), 0 1px 3px rgba(0,0,0,.15)",
                    borderRadius: "20%",
                    mr: 1.5,
                  })}
                  src={item.track.icon}
                >
                  {item.name.charAt(0).toUpperCase()}
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={
                  <Stack direction="row" justifyContent="flex-start" alignItems="center" spacing={0.5}>
                    <Typography>{item.name}</Typography>
                    {item.track.verified && (
                      <VerifiedIcon sx={(theme: MMRLTheme) => ({ color: theme.palette.text.link, fontSize: "unset" })} />
                    )}
                  </Stack>
                }
                secondary={
                  <Stack direction="column" justifyContent="center" alignItems="flex-start" spacing={0.5}>
                    <Typography variant="body2">{item.version}</Typography>
                    <Stack direction="row" justifyContent="flex-start" alignItems="center" spacing={0.5}>
                      {SuFile.exist(modFS("PROPS", { MODID: item.id })) && <Chip size="small" label="Installed" />}
                    </Stack>
                  </Stack>
                }
              />
            </ListItemButton>
          );
        },
      },
    });
  };

  const renderToolbar = () => {
    return (
      <Toolbar modifier="noshadow" sx={{ boderBottom: "unset !important" }}>
        <Toolbar.Left>
          <Toolbar.Button icon={MenuIcon} onClick={context.splitter.show} />
        </Toolbar.Left>
        <Toolbar.Center
          sx={{
            display: "flex",
            justifyContent: "center",
            alignSelf: "center",
            alignItems: "center",
          }}
        >
          <Typography
            sx={{
              display: "flex",
              justifyContent: "center",
              alignSelf: "center",
              alignItems: "center",
            }}
          >
            <CodeRoundedIcon sx={{ display: "flex", mr: 1 }} />
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{
                mr: 2,
                display: "flex",
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              MMRL
            </Typography>
          </Typography>
        </Toolbar.Center>
        <Toolbar.Right>
          <Toolbar.Button icon={SearchIcon} onClick={handleOpenSearch} />
        </Toolbar.Right>
      </Toolbar>
    );
  };

  return (
    <Page modifier="noshadow" renderToolbar={renderToolbar}>
      <Tabbar
        modifier="noshadow"
        hideTabs={!os.isAndroid}
        swipeable={settings.swipeable_tabs}
        position={"top"}
        index={index}
        onPreChange={(event) => {
          if (event.index != index) {
            setIndex(event.index);
          }
        }}
        renderTabs={renderTabs}
      />
    </Page>
  );
};

export default MainApplication;
