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

const ExploreModuleFragment = () => {
  const { context } = useActivity();
  const { strings } = useStrings();
  const { settings } = useSettings();
  const { scheme, theme } = useTheme();

  const [search, setSearch] = React.useState("");
  const [modules, setModules] = useStateCallback<Module[]>([]);

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

  const retiveFile = (file: string) => {
    // const [state, setState] = React.useState("");
    let state = "";

    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = () => {
      if (xhttp.readyState == 4 && xhttp.status == 200) {
        state = xhttp.responseText;
      }
    };
    xhttp.open("GET", file, true);
    xhttp.send();

    return state;
  };

  const params = new URLSearchParams(window.location.search);

  React.useEffect(() => {
    // Needs an another solution
    setModules([]);
    const fetchData = async () => {
      for (const repo of repos) {
        if (settings.disabled_repos.includes(repo.id)) continue;

        fetch(repo.modules)
          .then((res) => {
            if (!res.ok) {
              throw new Error(res.statusText);
            }

            return res.json();
          })
          .then((data: Repo) => {
            for (const module_s of data.modules) {
              fetch(module_s.prop_url as unknown as string)
                .then((res) => {
                  if (!res.ok) {
                    throw new Error(res.statusText);
                  }

                  return res.text();
                })
                .then((prop) => {
                  module_s.prop_url = new Properties(prop).toObject() as unknown as ModuleProps;
                });
            }
          })
          .catch((err) => {
            throw new Error(err);
          });

        const response = await fetch(repo.modules);

        if (!response.ok) {
          throw new Error(response.statusText);
        }

        const data = (await response.json()) as Repo;

        for (const module_s of data.modules) {
          const propResponse = await fetch(module_s.prop_url as unknown as string);

          const dataProp = await propResponse.text();

          module_s.prop_url = new Properties(dataProp).toObject() as unknown as ModuleProps;
        }

        setModules(
          (prev) => {
            // Preventing duplicates
            var ids = new Set(prev.map((d) => d.id));
            var merged = [...prev, ...data.modules.filter((d) => !ids.has(d.id))];
            return merged;
          },
          (modules) => {
            if (params.get("module")) {
              const m = modules.find((module) => module.id === params.get("module"));
              if (m) {
                context.pushPage<any>({
                  component: DescriptonActivity,
                  props: {
                    key: `view_${m.id}`,
                    extra: {
                      title: m.prop_url.name,
                      prop_url: m.prop_url,
                      zip_url: m.zip_url,
                      request: {
                        url: m.notes_url,
                      },
                    },
                  },
                });
              }
            }
          }
        );
      }
    };

    void fetchData();
  }, [repos, settings]);

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
        <ExploreModule index={index} key={module.id + index} moduleProps={module} />
      ))}
    </>
  );
  // }
};

export default ExploreModuleFragment;
