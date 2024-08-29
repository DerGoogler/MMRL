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

  const [disabledRepos, setDisabledRepos] = useSettings("disabled_repos");
  const [repos, setRepos] = useSettings("repos");

  const [modules, setModules] = React.useState<Module[]>([]);

  const addRepo = (data: AddRepoData) => {
    if (!repos.some((repo) => repo.base_url === data.url)) {
      if (repos.length <= 4) {
        if (link.validURL(data.url)) {
          fetch(`${data.url.slice(-1) != "/" ? data.url + "/" : data.url}json/config.json`)
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
      os.toast("This repo already exists", Toast.LENGTH_SHORT);
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
    setModules([]);
    const fetchData = async () => {
      const combinedModulesMap = new Map();

      for (const repo of repos) {
        if (disabledRepos.includes(repo.base_url)) continue;

        try {
          const res = await fetch(`${repo.base_url.slice(-1) !== "/" ? repo.base_url + "/" : repo.base_url}json/modules.json`);
          if (!res.ok) throw new Error(res.statusText);

          const json: Repo = await res.json();

          json.modules.forEach((mod) => {
            if (!combinedModulesMap.has(mod.id)) {
              // Add module with repo source if not already in map
              combinedModulesMap.set(mod.id, { ...mod, __mmrl_repo_source: [repo.name] });
            } else {
              // If already in map, append source repo name
              const existingModule = combinedModulesMap.get(mod.id);
              if (!existingModule.__mmrl_repo_source.includes(repo.name)) {
                existingModule.__mmrl_repo_source.push(repo.name);
              }
            }
          });
        } catch (error) {
          log.e((error as Error).message);
        }
      }

      // Convert map to array for final combined list
      setModules(Array.from(combinedModulesMap.values()));
    };

    void fetchData();
  }, [disabledRepos, repos]);

  const contextValue = React.useMemo(
    () => ({ repos, setRepos, modules, actions: { addRepo, removeRepo, setRepoEnabled, isRepoEnabled } }),
    [repos, modules]
  );

  return <RepoContext.Provider value={contextValue} children={props.children} />;
};

export const useRepos = () => {
  return React.useContext(RepoContext);
};
