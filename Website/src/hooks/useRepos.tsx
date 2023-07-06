import React from "react";
import { SetValue, useNativeStorage } from "./useNativeStorage";
import axios from "axios";
import { link, util } from "googlers-tools";
import _, { map } from "underscore";
import Properties from "@js.properties/properties";
import { Settings, useSettings } from "./useSettings";
import { os } from "@Native/Os";

interface RepoContextInterface {
  repos: StoredRepo[];
  setRepos: SetValue<StoredRepo[]>;
  modulesLoading: boolean | undefined;
  modules: Module[];
  moduleOptions: any[];
  actions: {
    addRepo: (data: AddRepoData) => void;
    removeRepo: (data: RemoveRepoData) => void;
    setRepoEnabled: (data: SetRepoStateData) => void;
    filterModules: (query: string) => Module[];
  };
}

export const RepoContext = React.createContext<RepoContextInterface>({
  repos: [],
  setRepos: () => {},
  modules: [],
  modulesLoading: undefined,
  moduleOptions: [],
  actions: {
    addRepo: (data: AddRepoData) => {},
    removeRepo: (data: RemoveRepoData) => {},
    setRepoEnabled: (data: SetRepoStateData) => {},
    filterModules: (query: string) => [],
  },
});

type AddRepoData = {
  url: string;
  callback?: (state: StoredRepo[]) => void;
  error?: (error: any) => void;
};

type RemoveRepoData = {
  id: string;
  callback?: (state: StoredRepo[]) => void;
};

type SetRepoStateData = {
  id: string;
  state: boolean;
  callback?: (state: string[]) => void;
};

export const RepoProvider = (props: React.PropsWithChildren) => {
  const [repos, setRepos] = useNativeStorage<StoredRepo[]>("repos", []);
  const { settings, setSettings } = useSettings();
  const [modules, setModules] = React.useState<Module[]>([]);

  const [modulesLoading, setModulesLoading] = React.useState<boolean | undefined>();
  const [moduleOptions, setModuleOptions] = React.useState<any[]>([]);

  React.useEffect(() => {
    // Needs an another solution
    setModules([]);
    const fetchData = async () => {
      for (const repo of repos) {
        if (settings.disabled_repos.includes(repo.id)) continue;

        setModulesLoading(true);
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
                  module_s.prop_url = Properties.parseToProperties(prop) as unknown as ModuleProps;
                });
            }
          })
          .catch((err) => {
            throw new Error(err);
          })
          .finally(() => {
            setModulesLoading(false);
          });

        const response = await fetch(repo.modules);

        if (!response.ok) {
          throw new Error(response.statusText);
        }

        const data = (await response.json()) as Repo;

        for (const module_s of data.modules) {
          const propResponse = await fetch(module_s.prop_url as unknown as string);

          const dataProp = await propResponse.text();

          module_s.prop_url = Properties.parseToProperties(dataProp) as unknown as ModuleProps;
        }

        setModules((prev) => {
          // Preventing duplicates
          var ids = new Set(prev.map((d) => d.id));
          var merged = [...prev, ...data.modules.filter((d) => !ids.has(d.id))];
          return merged;
        });
      }
    };

    void fetchData();
  }, [repos, settings]);

  React.useEffect(() => {
    axios.get("https://raw.githubusercontent.com/Googlers-Repo/googlers-repo.github.io/master/moduleOptions.json").then((response) => {
      setModuleOptions(response.data);
    });
  }, []);

  const addRepo = (data: AddRepoData) => {
    if (link.validURL(data.url)) {
      fetch(data.url)
        .then((response) => response.json())
        .then((response) => {
          setRepos(
            (prev) => [
              ...prev,
              {
                id: "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
                  var r = (Math.random() * 16) | 0,
                    v = c == "x" ? r : (r & 0x3) | 0x8;
                  return v.toString(16);
                }),
                name: response.name || "Unknown Repository",
                website: response.website || null,
                support: response.support || null,
                donate: response.donate || null,
                submitModule: response.submitModules || null,
                last_update: response.website || 0,
                modules: data.url,
                isOn: false,
              },
            ],
            data.callback
          );
        })
        .catch(data.error);
    } else {
      os.toast("The given link isn't valid.", Toast.LENGTH_SHORT);
    }
  };

  const removeRepo = (data: RemoveRepoData) => {
    setRepos((tmp) => {
      tmp = tmp.filter((remv) => remv.id != data.id);
      return tmp;
    }, data.callback);
  };

  const setRepoEnabled = (data: SetRepoStateData) => {
    setSettings(
      "disabled_repos",
      (prev) => {
        if (prev.some((elem) => elem === data.id)) {
          return prev.filter((item) => item === data.id);
        } else {
          return [...prev, data.id];
        }
      },
      data.callback
    );
  };

  const filterModules = (query: string) => {
    return modules.filter(
      (module) =>
        module.prop_url.id.toLowerCase().includes(query.toLowerCase()) ||
        module.prop_url.name.toLowerCase().includes(query.toLowerCase()) ||
        module.prop_url.author.toLowerCase().includes(query.toLowerCase()) ||
        module.prop_url.description.toLowerCase().includes(query.toLowerCase())
    );
  };

  return (
    <RepoContext.Provider
      value={{ repos, setRepos, modulesLoading, modules, moduleOptions, actions: { addRepo, removeRepo, setRepoEnabled, filterModules } }}
      children={props.children}
    />
  );
};

export const useRepos = () => {
  return React.useContext(RepoContext);
};
