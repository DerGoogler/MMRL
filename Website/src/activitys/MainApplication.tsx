import CodeRoundedIcon from "@mui/icons-material/CodeRounded";
import React from "react";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import FetchTextActivity from "./FetchTextActivity";
import ModuleFragment from "./fragments/ModuleFragment";
import TerminalActivity from "./TerminalActivity";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import DeviceModule from "@Components/DeviceModule";
import ModuleViewActivity from "./ModuleViewActivity";
import CreateNewFolderIcon from "@mui/icons-material/CreateNewFolder";
import { Menu } from "@mui/icons-material";
import { useActivity } from "@Hooks/useActivity";
import { Toolbar } from "@Components/onsenui/Toolbar";
import { os } from "@Native/Os";
import { Page } from "@Components/onsenui/Page";
import { useStrings } from "@Hooks/useStrings";
import { Tabbar, TabbarRenderTab } from "@Components/onsenui/Tabbar";
import { useRepos } from "@Hooks/useRepos";
import { SuFile } from "@Native/SuFile";
import { Properties } from "properties-file";
import { useNativeStorage } from "@Hooks/useNativeStorage";
import { BuildConfig } from "@Native/BuildConfig";
import { useNewerVersion } from "@Hooks/useNewerVersion";
import { ExploreModule } from "@Components/ExploreModule";
import { useSettings } from "@Hooks/useSettings";
import { useTheme } from "@Hooks/useTheme";
import { Fab } from "react-onsenui";
import { AnimatePresence, motion } from "framer-motion";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";

interface SearchbarProps {
  onSearch(term: string): void;
  placeholder: string;
}

const Clear = motion(ClearIcon);
const Search = motion(SearchIcon);
const MotionTypography = motion(Typography);
const SearchBar = motion(
  React.forwardRef<any, SearchbarProps>((props, ref) => {
    const [term, setTerm] = React.useState("");
    const { onSearch, placeholder } = props;

    const handleTermChange = (e) => {
      setTerm(e.target.value);
    };

    return (
      <InputBase
        ref={ref}
        autoFocus
        fullWidth
        value={term}
        inputProps={{
          "aria-label": placeholder,
          onKeyDown(e) {
            if (e.key === "Enter") {
              e.preventDefault();
              onSearch(term);
            }
          },
        }}
        onChange={handleTermChange}
        placeholder={placeholder}
      />
    );
  })
);

const MainApplication = () => {
  const { strings } = useStrings();
  const { settings, modConf } = useSettings();
  const { context } = useActivity();
  const { theme } = useTheme();
  const { modules } = useRepos();
  const [index, setIndex] = React.useState(0);
  const [localModules, setLocalModules] = React.useState<Module[]>([]);

  const [isVisible, setVisible] = React.useState(false);
  const [search, setSearch] = React.useState("");

  if (os.isAndroid) {
    React.useEffect(() => {
      const folders = SuFile.list(modConf("MODULES")).split(",");
      folders.forEach((module) => {
        const properties = new SuFile(modConf("PROPS", { MODID: module }));
        if (properties.exist()) {
          setLocalModules((prev) => {
            // Preventing duplicates
            const ids = new Set(prev.map((d) => d.id));
            const merged = [...prev, ...[new Properties(properties.read()).toObject() as unknown as Module].filter((d) => !ids.has(d.id))];
            return merged;
          });
        }
      });
    }, [settings]);
  }

  React.useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get("module");
    const m_ = modules.find((m) => m.id === id);
    if (m_) {
      context.pushPage({
        component: ModuleViewActivity,
        key: "",
        extra: m_,
      });
    }
  }, [modules]);

  const renderTabs = (): TabbarRenderTab[] => {
    return [
      {
        content: (
          <ModuleFragment
            search={search}
            id="explore"
            modules={modules}
            renderItem={(module, key) => <ExploreModule key={key} moduleProps={module} />}
          />
        ),
        tab: <Tabbar.Tab label={strings("explore")} />,
      },
      ...(os.isAndroid
        ? [
            {
              content: (
                <ModuleFragment
                  search={search}
                  id="update"
                  modules={modules}
                  renderItem={(module, key) => (
                    <Box key={key} sx={{ width: "100%" }}>
                      <ExploreModule
                        sx={{ borderRadius: `${theme.shape.borderRadius}px ${theme.shape.borderRadius}px 0px 0px` }}
                        moduleProps={module}
                      />
                      <Button
                        sx={{
                          borderRadius: `0px 0px ${theme.shape.borderRadius}px ${theme.shape.borderRadius}px`,
                        }}
                        fullWidth
                        variant="contained"
                        disableElevation
                        onClick={() => {
                          context.pushPage({
                            component: TerminalActivity,
                            key: "update_install",
                            extra: {
                              exploreInstall: true,
                              path: module.download,
                            },
                          });
                        }}
                      >
                        {strings("update")}
                      </Button>
                    </Box>
                  )}
                />
              ),
              tab: <Tabbar.Tab label={"Updates"} />,
            },
            {
              content: (
                <ModuleFragment
                  search={search}
                  id="local"
                  modules={localModules}
                  renderItem={(module, key) => <DeviceModule key={key} module={module} />}
                  renderFixed={() => {
                    return (
                      // @ts-ignore
                      <Fab
                        onClick={() => {
                          // @ts-ignore
                          Chooser.getFile(
                            "application/zip",
                            (file) => {
                              if (file) {
                                context.pushPage({
                                  component: TerminalActivity,
                                  key: "local_install",
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
                  }}
                />
              ),
              tab: <Tabbar.Tab label={strings("installed")} />,
            },
          ]
        : []),
    ];
  };

  const [storedCurrentVersion, setStoredCurrentVersion] = useNativeStorage<VersionType>("current_version", "0.0.0");
  const isNewVersion = useNewerVersion(storedCurrentVersion);

  React.useEffect(() => {
    if (isNewVersion) {
      setStoredCurrentVersion(BuildConfig.VERSION_NAME);
      context.pushPage({
        component: FetchTextActivity,
        key: "changelog",
        extra: {
          url: "https://raw.githubusercontent.com/wiki/DerGoogler/MMRL/Changelog.md",
          title: "Changelog",
        },
      });
    }
  }, []);

  const handleSearchState = () => {
    setVisible((prev) => {
      if (prev) {
        setSearch("");
      }
      return !prev;
    });
  };

  const renderToolbar = () => {
    return (
      <Toolbar modifier="noshadow">
        <AnimatePresence>
          <Toolbar.Left>
            <Toolbar.Button
              icon={Menu}
              onClick={() => {
                context.splitter.show();
              }}
            />
          </Toolbar.Left>
          <Toolbar.Center
            sx={{
              display: "flex",
              justifyContent: "center",
              alignSelf: "center",
              alignItems: "center",
            }}
          >
            {!isVisible ? (
              <MotionTypography
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignSelf: "center",
                  alignItems: "center",
                }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
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
              </MotionTypography>
            ) : (
              <SearchBar
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onSearch={(term) => setSearch(term)}
                placeholder={strings("search_modules")}
              />
            )}
          </Toolbar.Center>

          <Toolbar.Right>
            <Toolbar.Button
              iconProps={{
                initial: { opacity: 0 },
                animate: { opacity: 1 },
                exit: { opacity: 0 },
              }}
              // @ts-ignore
              icon={isVisible ? Clear : Search}
              onClick={handleSearchState}
            />
          </Toolbar.Right>
        </AnimatePresence>
      </Toolbar>
    );
  };

  return (
    <Page modifier="noshadow" renderToolbar={renderToolbar}>
      <Tabbar
        modifier="noshadow"
        hideTabs={!os.isAndroid}
        swipeable={false}
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
