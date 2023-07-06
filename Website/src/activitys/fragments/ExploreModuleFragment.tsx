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

  const { moduleOptions, actions, modulesLoading } = useRepos();

  const filteredModules = actions.filterModules(search);
  const [page, setPage] = React.useState(1);

  const PER_PAGE = 20;
  const count = Math.ceil(filteredModules.length / PER_PAGE);
  const _DATA = usePagination(filteredModules, PER_PAGE);

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

        <For
          each={_DATA.currentData()}
          fallback={() => (
            <h4
              style={{
                color: theme.palette.secondary.dark,
                position: "absolute",
                left: "50%",
                top: "50%",
                textAlign: "center",
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
          )}
          catch={(e: Error | undefined) => <Box sx={(theme) => ({ color: theme.palette.text.primary })}>ERROR: {e?.message}</Box>}
          renderTop={() => (
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
          )}
          render={(item, index) => (
            <ExploreModule
              index={index}
              key={item.id + index}
              fullItem={item}
              getId={item.id}
              propsUrl={item.prop_url}
              notesUrl={item.notes_url}
              downloadUrl={item.zip_url}
              moduleOptions={moduleOptions}
              last_update={item.last_update}
            />
          )}
        />
      </>
    );
  }
};

export default ExploreModuleFragment;
