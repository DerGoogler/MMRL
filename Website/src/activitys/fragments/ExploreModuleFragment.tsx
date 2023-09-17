import { ExploreModule } from "@Components/ExploreModule";
import { Searchbar } from "@Components/Searchbar";
import React from "react";
import { useActivity } from "@Hooks/useActivity";
import { useRepos } from "@Hooks/useRepos";
import { Box, Pagination, Stack, Typography } from "@mui/material";
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

export interface ExploreModuleProps {
  renderToolbar?: RenderFunction;
  applyFilter: (modules: Module[], search: string) => Module[];
}

const ExploreModuleFragment = (props: ExploreModuleProps) => {
  const { context } = useActivity();
  const { strings } = useStrings();
  const { settings } = useSettings();
  const { scheme, theme } = useTheme();
  const { modules, repos } = useRepos();
  const { isNetworkAvailable } = useNetwork();
  const [search, setSearch] = React.useState("");

  const applyFilter = props.applyFilter(modules, search);

  const [page, setPage] = React.useState(1);

  const PER_PAGE = 20;
  const count = Math.ceil(applyFilter.length / PER_PAGE);
  const _DATA = usePagination(applyFilter, PER_PAGE);

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
            <Box>{strings.repository}</Box>
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

  // if (modulesLoading) {
  //   return (
  //     <ProgressCircular
  //       indeterminate
  //       style={{
  //         position: "absolute",
  //         left: "50%",
  //         top: "50%",
  //         WebkitTransform: "translate(-50%, -50%)",
  //         transform: "translate(-50%, -50%)",
  //       }}
  //     />
  //   );
  // } else {
  return (
    <Page
      renderToolbar={props.renderToolbar}
      renderBottomToolbar={() => {
        return (
          <BottomToolbar modifier="transparent">
            <Stack justifyContent="center" spacing={0.8} direction="row" alignItems="center" style={{ height: "100%" }}>
              <Pagination
                count={count}
                color="primary"
                page={page}
                variant="outlined"
                shape="rounded"
                onChange={(e, p) => {
                  setPage(p);
                  _DATA.jump(p);
                }}
              />
            </Stack>
          </BottomToolbar>
        );
      }}
    >
      <Page.RelativeContent>
        <Searchbar placeholder={strings.search_modules} onChange={(e) => setSearch(e.target.value)} />

        <Stack sx={{ mt: 1 }} direction="column" justifyContent="flex-start" alignItems="center" spacing={1}>
          {_DATA.currentData().map((module, index) => (
            <ExploreModule index={index} key={module.id + index} moduleProps={module} />
          ))}
        </Stack>
      </Page.RelativeContent>
    </Page>
  );
  // }
};

export default ExploreModuleFragment;
