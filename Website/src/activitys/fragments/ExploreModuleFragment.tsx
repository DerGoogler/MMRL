import { ExploreModule } from "@Components/ExploreModule";
import { Searchbar } from "@Components/Searchbar";
import React from "react";
import { useActivity } from "@Hooks/useActivity";
import { useRepos } from "@Hooks/useRepos";
import { Pagination, Stack } from "@mui/material";
import { useStrings } from "@Hooks/useStrings";
import { usePagination } from "@Hooks/usePagination";
import RepoActivity from "@Activitys/RepoActivity";
import { useSettings } from "@Hooks/useSettings";
import DescriptonActivity from "@Activitys/DescriptonActivity";
import { Properties } from "properties-file";
import { useStateCallback } from "@Hooks/useStateCallback";
import { useTheme } from "@Hooks/useTheme";
import { Page } from "@Components/onsenui/Page";
import { BottomToolbar } from "@Components/onsenui/BottomToolbar";

const ExploreModuleFragment = () => {
  const { context } = useActivity();
  const { strings } = useStrings();
  const { settings } = useSettings();
  const { scheme, theme } = useTheme();

  const [search, setSearch] = React.useState("");
  const { modules } = useRepos();

  const { moduleOptions, modulesLoading, repos } = useRepos();

  const filteredModules = modules.filter(
    (module) =>
      module.prop_url.id.toLowerCase().includes(search.toLowerCase()) ||
      module.prop_url.name.toLowerCase().includes(search.toLowerCase()) ||
      module.prop_url.author.toLowerCase().includes(search.toLowerCase()) ||
      module.prop_url.description.toLowerCase().includes(search.toLowerCase())
  );

  const [page, setPage] = React.useState(1);

  const PER_PAGE = 20;
  const count = Math.ceil(filteredModules.length / PER_PAGE);
  const _DATA = usePagination(filteredModules, PER_PAGE);

  if (repos.length === 0) {
    return (
      <h4
        style={{
          color: theme.palette.secondary.dark,
          position: "absolute",
          left: "50%",
          top: "50%",
          WebkitTransform: "translate(-50%, -50%)",
          transform: "translate(-50%, -50%)",
        }}
      >
        <span>
          Looks empty here... Add an{" "}
          <span
            style={{
              color: theme.palette.primary.dark,
            }}
            onClick={() => {
              context.pushPage({
                component: RepoActivity,
                props: {
                  key: "repos",
                  extra: {},
                },
              });
            }}
          >
            {strings.repository}
          </span>
        </span>
      </h4>
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

        {_DATA.currentData().map((module, index) => (
          <ExploreModule index={index} key={module.id + index} moduleProps={module} />
        ))}
      </Page.RelativeContent>
    </Page>
  );
  // }
};

export default ExploreModuleFragment;
