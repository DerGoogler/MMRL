import { ExploreModule } from "@Components/ExploreModule";
import { Searchbar } from "@Components/Searchbar";
import React from "react";
import { useActivity } from "@Hooks/useActivity";
import { useRepos } from "@Hooks/useRepos";
import { Box, Pagination, Stack } from "@mui/material";
import { StyledSection } from "@Components/StyledSection";
import { useStrings } from "@Hooks/useStrings";
import { usePagination } from "@Hooks/usePagination";
import { For } from "@Components/For";
import RepoActivity from "@Activitys/RepoActivity";
import { useTheme } from "@Hooks/useSettings";
import { ProgressCircular } from "react-onsenui";

const ExploreModuleFragment = () => {
  const { context } = useActivity();
  const { strings } = useStrings();
  const { scheme, theme } = useTheme();

  const [search, setSearch] = React.useState("");

  const { moduleOptions, actions, modulesLoading, repos } = useRepos();

  const filteredModules = actions.filterModules(search);
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

  if (modulesLoading) {
    return (
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
    );
  } else {
    return (
      <>
        <Searchbar placeholder={strings.search_modules} onChange={(e) => setSearch(e.target.value)} />

        <Stack style={{ marginBottom: 8 }} direction="row" justifyContent="center" alignItems="center" spacing={2}>
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

        {_DATA.currentData().map((module, index) => (
          <ExploreModule index={index} key={module.id + index} moduleProps={module} moduleOptions={moduleOptions} />
        ))}
      </>
    );
  }
};

export default ExploreModuleFragment;
