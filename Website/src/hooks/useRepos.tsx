import React from "react";
import { SetValue, useNativeStorage } from "./useNativeStorage";
import axios from "axios";
import { link, util } from "googlers-tools";
import _, { map } from "underscore";
import Properties from "@js.properties/properties";
import { useSettings } from "./useSettings";
import { os } from "@Native/Os";

interface RepoContextInterface {
  repos: StoredRepo[];
  setRepos: SetValue<StoredRepo[]>;
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
  index: number;
  state: boolean;
  callback?: (state: StoredRepo[]) => void;
};

export const RepoProvider = (props: React.PropsWithChildren) => {
  const [repos, setRepos] = useNativeStorage<StoredRepo[]>("repos", []);
  const [modules, setModules] = React.useState<Module[]>([]);
  const [moduleOptions, setModuleOptions] = React.useState<any[]>([]);

  React.useEffect(() => {
    Promise.all(
      repos.map(async (rep) => {
        if (rep.isOn) {
          const modules_data: Repo = await (await fetch(rep.modules)).json();
          for (var i = 0; i < modules_data.modules.length; i++) {
            modules_data.modules[i].prop_url = Properties.parseToProperties(
              await (await fetch(modules_data.modules[i].prop_url as unknown as string)).text()
            ) as unknown as ModuleProps;
          }
          setModules((prev) => {
            // Preventing duplicates
            var ids = new Set(prev.map((d) => d.id));
            var merged = [...prev, ...modules_data.modules.filter((d) => !ids.has(d.id))];
            return merged;
          });
        }
      })
    );

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
    setRepos((tmp) => {
      tmp[data.index].isOn = data.state;
      return tmp;
    }, data.callback);
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
      value={{ repos, setRepos, modules, moduleOptions, actions: { addRepo, removeRepo, setRepoEnabled, filterModules } }}
      children={props.children}
    />
  );
};

export const useRepos = () => {
  return React.useContext(RepoContext);
};
