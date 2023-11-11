import React from "react";
import { SetValue, useNativeStorage } from "./useNativeStorage";
import axios from "axios";
import { link } from "googlers-tools";
import localForage from "localforage";
import _ from "underscore";
import { useSettings } from "./useSettings";
import { os } from "@Native/Os";
import { useLog } from "./native/useLog";

export interface RepoContextActions {
  addRepo: (data: AddRepoData) => void;
  removeRepo: (data: RemoveRepoData) => void;
  setRepoEnabled: (data: SetRepoStateData) => void;
}

interface RepoContextInterface {
  repos: StoredRepo[];
  setRepos: SetValue<StoredRepo[]>;
  modulesLoading: boolean | undefined;
  modules: Module[];
  moduleOptions: {
    [name: string]: {
      verified?: boolean;
      hidden?: boolean;
    };
  }[];
  actions: RepoContextActions;
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
  callback?: (state: string[]) => void;
};

export const RepoProvider = (props: React.PropsWithChildren) => {
  const TAG = "RepoProvider";
  const log = useLog(TAG);
  const [repos, setRepos] = useNativeStorage<StoredRepo[]>("repos", [
    {
      name: "Magisk Modules Alt Repo (pre-configured)",
      website: "",
      support: "",
      donate: "",
      submitModule: "",
      last_update: 1690995729000,
      modules: "https://api.mmrl.dergoogler.com/json/mmar.json",
    },
  ]);

  const { settings, setSettings } = useSettings();
  const [modules, setModules] = React.useState<Module[]>([]);

  const [modulesLoading, setModulesLoading] = React.useState<boolean | undefined>();
  const [moduleOptions, setModuleOptions] = React.useState<any[]>([]);

  React.useEffect(() => {
    axios.get("https://raw.githubusercontent.com/Googlers-Repo/googlers-repo.github.io/master/moduleOptions.json").then((response) => {
      setModuleOptions(response.data);
    });
  }, []);

  const addRepo = (data: AddRepoData) => {
    if (!repos.some((repo) => repo.modules === data.url)) {
      if (repos.length <= 4) {
        if (link.validURL(data.url)) {
          fetch(data.url)
            .then((response) => response.json())
            .then((response) => {
              setRepos(
                (prev) => [
                  ...prev,
                  {
                    name: response.name || "Unknown Repository",
                    website: response.website || null,
                    support: response.support || null,
                    donate: response.donate || null,
                    submitModule: response.submitModules || null,
                    last_update: response.last_update || 0,
                    modules: data.url,
                  },
                ],
                data.callback
              );
            })
            .catch((e) => (data.callback ? data.callback(e) : log.e(e)));
        } else {
          os.toast("The given link isn't valid", Toast.LENGTH_SHORT);
        }
      } else {
        os.toast("You can't add more than 5 repos", Toast.LENGTH_SHORT);
      }
    } else {
      os.toast("This repo alredy exist", Toast.LENGTH_SHORT);
    }
  };

  const removeRepo = (data: RemoveRepoData) => {
    setRepos((tmp) => {
      tmp = tmp.filter((remv) => remv.modules != data.id);
      return tmp;
    }, data.callback);
  };

  const setRepoEnabled = (data: SetRepoStateData) => {
    setSettings(
      "disabled_repos",
      (prev) => {
        if (prev.some((elem) => elem === data.id)) {
          return prev.filter((item) => item !== data.id);
        } else {
          return [...prev, data.id];
        }
      },
      data.callback
    );
  };

  React.useEffect(() => {
    // Needs an another solution
    setModules([]);
    const fetchData = async () => {
      for (const repo of repos) {
        if (settings.disabled_repos.includes(repo.modules)) continue;

        fetch(repo.modules)
          .then((res) => {
            if (!res.ok) throw new Error(res.statusText);
            return res.json();
          })
          .then((json: Repo) => {
            setModules((prev) => {
              // Preventing duplicates
              var ids = new Set(prev.map((d) => d.id));
              var merged = [...prev, ...json.modules.filter((d) => !ids.has(d.id))];
              return merged;
            });
          });
      }
    };

    void fetchData();
  }, [repos, settings]);

  const contextValue = React.useMemo(
    () => ({ repos, setRepos, modulesLoading, modules, moduleOptions, actions: { addRepo, removeRepo, setRepoEnabled } }),
    [repos, modules, settings]
  );

  return <RepoContext.Provider value={contextValue} children={props.children} />;
};

export const useRepos = () => {
  return React.useContext(RepoContext);
};
