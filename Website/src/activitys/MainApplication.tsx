import CodeRoundedIcon from "@mui/icons-material/CodeRounded";
import React from "react";
import Typography from "@mui/material/Typography";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import FetchTextActivity from "./FetchTextActivity";
import ModuleFragment from "./fragments/ModuleFragment";
import TerminalActivity from "./TerminalActivity";
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
import { AnimatePresence, motion } from "framer-motion";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";
import { useModConf } from "@Hooks/useModConf";
import Fab from "@Components/onsenui/Fab";
import { useLocalModules } from "@Hooks/useLocalModules";

interface SearchbarRef {
  clear(): void;
}

interface SearchbarProps {
  value: string;
  onSearch(term: string): void;
  placeholder: string;
}

const Clear = motion(ClearIcon);
const Search = motion(SearchIcon);
const MotionTypography = motion(Typography);
const MotionInputBase = motion(InputBase);
const SearchBar = React.forwardRef<SearchbarRef, SearchbarProps>((props, ref) => {
  const { onSearch, placeholder, value } = props;
  const [term, setTerm] = React.useState(value);

  const handleTermChange = (e) => {
    setTerm(e.target.value);
  };

  React.useImperativeHandle(
    ref,
    () => ({
      clear() {
        setTerm("");
      },
    }),
    []
  );

  return (
    <MotionInputBase
      ref={ref as any}
      key="inputshit"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
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
});

const MainApplication = () => {
  const { strings } = useStrings();
  const { settings } = useSettings();
  const { modConf } = useModConf();
  const { context } = useActivity();
  const { theme } = useTheme();
  const { modules } = useRepos();
  const [index, setIndex] = React.useState(0);
  const localModules = useLocalModules();

  const searchRef = React.useRef<SearchbarRef | null>(null);

  const [isVisible, setVisible] = React.useState(false);
  const [search, setSearch] = React.useState("");

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
                  id="local"
                  modules={localModules}
                  renderItem={(module, key) => <DeviceModule key={key} module={module} />}
                  renderFixed={() => {
                    return (
                      <Fab
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
        key: "FetchTextActivity",
        extra: {
          url: "https://raw.githubusercontent.com/wiki/DerGoogler/MMRL/Changelog.md",
          title: "Changelog",
        },
      });
    }
  }, []);

  const handleOpenSearch = () => {
    if (isVisible) {
      if (searchRef.current) {
        setSearch("");
        searchRef.current.clear();
      }
    } else {
      setVisible((prev) => !prev);
    }
  };

  const handleSearch = () => {
    if (isVisible) {
      setVisible((prev) => {
        if (prev && searchRef.current) {
          setSearch("");
          searchRef.current.clear();
        }
        return !prev;
      });
    } else {
      context.splitter.show();
    }
  };

  const renderToolbar = () => {
    return (
      <Toolbar modifier="noshadow">
        <AnimatePresence key="idontknowman">
          <Toolbar.Left>
            <Toolbar.Button
              iconProps={{
                key: "sdlfgkhjdok;gfhjseoif",
                initial: { opacity: 0 },
                animate: { opacity: 1 },
                exit: { opacity: 0 },
              }}
              // @ts-ignore
              icon={isVisible ? ArrowBackIcon : Menu}
              onClick={handleSearch}
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
                key="fckthisdipshit"
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
                ref={searchRef as any}
                value={search}
                onSearch={(term) => setSearch(term)}
                placeholder={strings("search_modules")}
              />
            )}
          </Toolbar.Center>

          <Toolbar.Right>
            <Toolbar.Button
              iconProps={{
                key: "sldjgfhdlkfughskdjfbn",
                initial: { opacity: 0 },
                animate: { opacity: 1 },
                exit: { opacity: 0 },
              }}
              // @ts-ignore
              icon={isVisible ? Clear : Search}
              onClick={handleOpenSearch}
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
