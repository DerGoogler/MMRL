import React from "react";
import { SetValue, useNativeStorage } from "./useNativeStorage";
import { link } from "googlers-tools";
import _ from "underscore";
import { useSettings } from "./useSettings";
import { os } from "@Native/Os";
import { useLog } from "./native/useLog";

export interface RepoContextActions {
  addRepo: (data: AddRepoData) => void;
  removeRepo: (data: RemoveRepoData) => void;
  setRepoEnabled: (data: SetRepoStateData) => void;
  isRepoEnabled: (repo: string) => boolean;
}

interface RepoContextInterface {
  repos: RepoConfig[];
  setRepos: SetValue<RepoConfig[]>;
  modules: Module[];
  actions: RepoContextActions;
}

export const RepoContext = React.createContext<RepoContextInterface>({
  repos: [],
  setRepos: () => {},
  modules: [],
  actions: {
    addRepo: (data: AddRepoData) => {},
    removeRepo: (data: RemoveRepoData) => {},
    setRepoEnabled: (data: SetRepoStateData) => {},
    isRepoEnabled: (repo: string) => false,
  },
});

type AddRepoData = {
  url: string;
  callback?: (state: RepoConfig[]) => void;
  error?: (error: Error) => void;
};

type RemoveRepoData = {
  id: string;
  callback?: (state: RepoConfig[]) => void;
};

type SetRepoStateData = {
  id: string;
  callback?: (state: string[]) => void;
};

export const RepoProvider = (props: React.PropsWithChildren) => {
  const TAG = "RepoProvider";
  const log = useLog(TAG);
  const [disabledRepos, setDisabledRepos] = useNativeStorage<string[]>("disabled_Repos", []);
  const [repos, setRepos] = useNativeStorage<RepoConfig[]>("repos_v3", [
    {
      name: "Googlers Magisk Repo",
      website: "https://mmrl.dergoogler.com",
      support: "https://github.com/Googlers-Repo/gmr/issues",
      donate: "https://github.com/sponsors/DerGoogler",
      submission:
        "https://github.com/Googlers-Repo/gmr/issues/new?assignees=&labels=module&projects=&template=submission.yml&title=%5BModule%5D%3A+",
      base_url: "https://gr.dergoogler.com/gmr/",
      max_num: 3,
      enable_log: true,
      log_dir: "log",
    },
  ]);

  const { settings, setSettings } = useSettings();
  const [modules, setModules] = React.useState<Module[]>([]);

  const addRepo = (data: AddRepoData) => {
    if (!repos.some((repo) => repo.base_url === data.url)) {
      if (repos.length <= 4) {
        if (link.validURL(data.url)) {
          fetch(`${data.url}json/config.json`)
            .then((response) => {
              if (response.status == 200) {
                return response.json();
              } else {
                data.error && data.error(Error("Cannot find given repo link or your link isn't valid"));
              }
            })
            .then((response) => {
              setRepos((prev) => [...prev, response], data.callback);
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
      tmp = tmp.filter((remv) => remv.base_url != data.id);
      return tmp;
    }, data.callback);
  };

  const setRepoEnabled = (data: SetRepoStateData) => {
    setDisabledRepos((prev) => {
      if (prev.some((elem) => elem === data.id)) {
        return prev.filter((item) => item !== data.id);
      } else {
        return [...prev, data.id];
      }
    }, data.callback);
  };

  const isRepoEnabled = React.useCallback(
    (repo: string) => {
      return !disabledRepos.includes(repo);
    },
    [disabledRepos]
  );

  React.useEffect(() => {
    // Needs an another solution
    setModules([]);
    const fetchData = async () => {
      for (const repo of repos) {
        if (disabledRepos.includes(repo.base_url)) continue;

        fetch(`${repo.base_url}json/modules.json`)
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
  }, [disabledRepos, repos, settings]);

  const contextValue = React.useMemo(
    () => ({ repos, setRepos, modules, actions: { addRepo, removeRepo, setRepoEnabled, isRepoEnabled } }),
    [repos, modules, settings]
  );

  return <RepoContext.Provider value={contextValue} children={props.children} />;
};

export const useRepos = () => {
  return React.useContext(RepoContext);
};
