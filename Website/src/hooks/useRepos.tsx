import React from "react";
import { SetValue, useNativeStorage } from "./useNativeStorage";
import axios from "axios";
import { link } from "googlers-tools";
import _ from "underscore";
import { useSettings } from "./useSettings";
import { os } from "@Native/Os";

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

  return (
    <RepoContext.Provider
      value={{ repos, setRepos, modulesLoading, modules, moduleOptions, actions: { addRepo, removeRepo, setRepoEnabled } }}
      children={props.children}
    />
  );
};

export const useRepos = () => {
  return React.useContext(RepoContext);
};
