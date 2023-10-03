import { ExploreModule } from "@Components/ExploreModule";
import { Searchbar } from "@Components/Searchbar";
import React from "react";
import { useActivity } from "@Hooks/useActivity";
import { useRepos } from "@Hooks/useRepos";
import Stack from "@mui/material/Stack";
import Pagination from "@mui/material/Pagination";
import Box from "@mui/material/Box";
import { useStrings } from "@Hooks/useStrings";
import { usePagination } from "@Hooks/usePagination";
import RepoActivity from "@Activitys/RepoActivity";
import { useSettings } from "@Hooks/useSettings";
import NorthEastRoundedIcon from "@mui/icons-material/NorthEastRounded";
import { useTheme } from "@Hooks/useTheme";
import { Page, RenderFunction } from "@Components/onsenui/Page";
import { BottomToolbar } from "@Components/onsenui/BottomToolbar";
import Icon from "@Components/Icon";
import { MissingInternet } from "@Components/MissingInternet";
import { useNetwork } from "@Hooks/useNetwork";
import { Card } from "@mui/material";
import { FilterDialog, useModuleFilter } from "@Hooks/useModulesFilter";
import ModuleViewActivity from "@Activitys/ModuleViewActivity";
import { Disappear } from "react-disappear";

export interface ExploreModuleProps {
  renderToolbar?: RenderFunction;
  applyFilter: (modules: Module[], search: string) => Module[];
}

const ExploreModuleFragment = (props: ExploreModuleProps) => {
  const { context } = useActivity();
  const { strings } = useStrings();
  const { settings } = useSettings();
  const { scheme, theme, shade } = useTheme();
  const { modules, repos } = useRepos();
  const { isNetworkAvailable } = useNetwork();
  const [search, setSearch] = React.useState("");

  const [open, setOpen] = React.useState(false);

  const [filteredModules, exploreFilter, setExploreFilter] = useModuleFilter(props.applyFilter(modules, search));

  const [page, setPage] = React.useState(1);

  const PER_PAGE = 20;
  const count = Math.ceil(filteredModules.length / PER_PAGE);
  const _DATA = usePagination(filteredModules, PER_PAGE);

  if (!isNetworkAvailable) {
    return (
      <Page>
        <MissingInternet />
      </Page>
    );
  }

  if (repos.length === 0) {
    return (
      <Page>
        <Stack
          component="h4"
          sx={{
            color: theme.palette.secondary.dark,
            width: "100%",
            height: "100%",
            m: "unset",
          }}
          direction="row"
          justifyContent="center"
          alignItems="center"
          spacing={1}
        >
          <Box>Looks empty here... Add an</Box>
          <Stack
            direction="row"
            justifyContent="center"
            alignItems="center"
            spacing={0.5}
            sx={{
              color: theme.palette.primary.dark,
              ":hover": {
                cursor: "pointer",
              },
            }}
            onClick={() => {
              context.pushPage({
                component: RepoActivity,
                key: "repos",
                extra: {},
              });
            }}
          >
            <Box>{strings("repository")}</Box>
            <Icon
              icon={NorthEastRoundedIcon}
              sx={{
                fontSize: 18,
              }}
            />
          </Stack>
        </Stack>
      </Page>
    );
  }

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (value: string) => {
    setOpen(false);
    setExploreFilter(value);
  };

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

  const [scrolled, setScrolled] = React.useState(false);

  const handleScroll = () => {
    const offset = window.scrollY;
    if (offset > 200) {
      setScrolled((prev) => !prev);
    }
  };

  const searchCardBackground = theme.palette.primary.main;
  const searchCardTransition = "background-color 0.5s ease, margin 0.5s ease, padding 0.5s ease, width 0.5s ease";

  return (
    <Page renderToolbar={props.renderToolbar}>
      <Page.RelativeContent>
        <Disappear
          onDisappear={(state) => {
            setScrolled(!state);
          }}
        >
          <></>
        </Disappear>
        <Box
          sx={
            !settings.disable_sticky_search_bar
              ? {
                  color: "#fff",
                  position: "sticky",
                  top: 0,
                  borderRadius: theme.shape.borderRadius / theme.shape.borderRadius,
                  transition: searchCardTransition,
                  ...(scrolled
                    ? {
                        borderRadius: "unset",
                        // 8px * 2 = 16px
                        width: "calc(100% + 16px)",
                        // -1 = -8px
                        ml: -1,
                        boxShadow: theme.shadows[1],
                        backgroundColor: searchCardBackground,
                      }
                    : {}),
                }
              : {}
          }
        >
          <Searchbar
            sx={{
              ...(!settings.disable_sticky_search_bar
                ? {
                    transition: searchCardTransition,
                    ...(scrolled
                      ? {
                          backgroundColor: searchCardBackground,
                        }
                      : {}),
                  }
                : {}),
              borderRadius: `${theme.shape.borderRadius}px ${theme.shape.borderRadius}px 0px 0px`,
            }}
            onFilterClick={handleClickOpen}
            placeholder={strings("search_modules")}
            onChange={(e) => setSearch(e.target.value)}
          />
          <Card
            component={Stack}
            elevation={0}
            justifyContent="center"
            spacing={0.8}
            direction="row"
            alignItems="center"
            sx={{
              ...(!settings.disable_sticky_search_bar
                ? {
                    transition: searchCardTransition,
                    ...(scrolled
                      ? {
                          backgroundColor: searchCardBackground,
                        }
                      : {}),
                  }
                : {}),
              borderRadius: `0px 0px ${theme.shape.borderRadius}px ${theme.shape.borderRadius}px`,
              pr: 1,
              pl: 1,
              pb: 1,
              display: "flex",
              alignItems: "center",
              width: "100%",
            }}
          >
            <Pagination
              count={count}
              page={page}
              color={settings.darkmode ? "secondary" : "standard"}
              shape="rounded"
              onChange={(e, p) => {
                setPage(p);
                _DATA.jump(p);
              }}
            />
          </Card>
        </Box>

        <Stack sx={{ mt: 1 }} direction="column" justifyContent="flex-start" alignItems="center" spacing={1}>
          {_DATA.currentData().map((module, index) => (
            <ExploreModule index={index} key={module.id + index} moduleProps={module} />
          ))}
        </Stack>
      </Page.RelativeContent>

      <FilterDialog selectedValue={exploreFilter} open={open} onClose={handleClose} />
    </Page>
  );
};

export default ExploreModuleFragment;
