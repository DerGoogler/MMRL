import React from "react";
import { SetValue, useNativeStorage } from "./useNativeStorage";
import Toast from "@Native/Toast";
import axios from "axios";
import { link, util } from "googlers-tools";
import _, { map } from "underscore";
import Properties from "@js.properties/properties";
import { useSettings } from "./useSettings";

export interface RepoInterface {
  id: string;
  /**
   * An required filed, to disply the repository name
   */
  name: string;
  /**
   * An given website link for the repository
   */
  website?: string | undefined;
  /**
   * Given support link i.g. Telegram, Xda, GitHub or something
   */
  support?: string | undefined;
  donate?: string | undefined;
  submitModule?: string | undefined;
  last_update?: string | number | undefined;
  modules: string;
  /**
   * The setting enabled by default if the repo is built-in
   */
  readonly: boolean;
  isOn: boolean;
  built_in_type?: string;
}

interface RepoContextInterface {
  readOnlyRepos: Array<RepoInterface>;
  repos: Array<RepoInterface>;
  setRepos: SetValue<Array<RepoInterface>>;
  modulesIndex: Array<any>;
  moduleOptions: Array<any>;
}

export const RepoContext = React.createContext<RepoContextInterface>({
  readOnlyRepos: [],
  repos: [],
  setRepos: () => {},
  modulesIndex: [],
  moduleOptions: [],
});

interface Props extends React.PropsWithChildren {
  deps?: React.DependencyList | undefined;
}

export const RepoProvider = (props: Props) => {
  const { settings } = useSettings();
  const [repos, setRepos] = useNativeStorage<Array<RepoInterface>>("repos", []);

  const [modulesIndex, setModulesIndex] = React.useState<Array<any>>([]);
  const [moduleOptions, setModuleOptions] = React.useState<Array<any>>([]);

  const readOnlyRepos: Array<RepoInterface> = [
    {
      id: "mmar",
      name: "Magisk Modules Alternative Repository",
      website: "https://github.com/Magisk-Modules-Alt-Repo",
      support: undefined,
      donate: undefined,
      submitModule: "https://github.com/Magisk-Modules-Alt-Repo/submission",
      last_update: undefined,
      modules: "https://raw.githubusercontent.com/Magisk-Modules-Alt-Repo/json/main/modules.json",
      readonly: true,
      isOn: settings.mmar_repo_enabled,
      built_in_type: "MMAR",
    },
    {
      id: "gmr",
      name: "Googlers Magisk Repo",
      website: "https://github.com/Googlers-Magisk-Repo",
      support: undefined,
      donate: undefined,
      submitModule: undefined,
      last_update: undefined,
      modules: "https://raw.githubusercontent.com/Googlers-Repo/googlers-repo.github.io/master/modules.json",
      readonly: true,
      isOn: settings.gmr_repo_enabled,
      built_in_type: "GMR",
    },
  ];

  React.useEffect(() => {
    Promise.all(
      [...readOnlyRepos, ...repos].map(async (rep) => {
        if (rep.isOn) {
          const modules = await (await fetch(rep.modules)).json();
          for (var i = 0; i < modules.modules.length; i++) {
            modules.modules[i].prop_url = Properties.parseToProperties(await (await fetch(modules.modules[i].prop_url)).text());
          }
          setModulesIndex((prev) => {
            var ids = new Set(prev.map((d) => d.id));
            var merged = [...prev, ...modules.modules.filter((d) => !ids.has(d.id))];
            return merged;
          });
        }
      })
    );

    axios.get("https://raw.githubusercontent.com/Googlers-Repo/googlers-repo.github.io/master/moduleOptions.json").then((response) => {
      setModuleOptions(response.data);
    });
  }, [settings.gmr_repo_enabled, settings.mmar_repo_enabled]);

  return <RepoContext.Provider value={{ readOnlyRepos, repos, setRepos, modulesIndex, moduleOptions }} children={props.children} />;
};

export const useRepos = () => {
  const { readOnlyRepos, repos, setRepos, modulesIndex, moduleOptions }: RepoContextInterface = React.useContext(RepoContext);

  const removeRepo = (id: string) => {
    setRepos((ary) => ary.filter((obj) => obj.id !== id));
  };

  const changeEnabledState = (state: any) => {
    setRepos((ary) => {
      var item = ary.find((item: RepoInterface) => item.isOn === !state);
      if (item) {
        item.isOn = state;
      }
      return ary;
    });
  };

  const addRepo = (repolink: string, callback: () => void, err: (error: any) => void) => {
    if (link.validURL(repolink)) {
      axios
        .get(repolink)
        .then((response) => {
          const data = response.data;

          setRepos((ary) => [
            ...ary,
            {
              id: "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
                var r = (Math.random() * 16) | 0,
                  v = c == "x" ? r : (r & 0x3) | 0x8;
                return v.toString(16);
              }),
              name: data.name,
              website: util.typeCheck<any>(link.validURL(data.website), null),
              support: util.typeCheck<any>(link.validURL(data.support), null),
              donate: util.typeCheck<any>(link.validURL(data.donate), null),
              submitModule: util.typeCheck<any>(link.validURL(data.submitModule), null),
              last_update: data.last_update,
              modules: repolink,
              readonly: false,
              isOn: false,
            },
          ]);
          callback();
        })
        .catch(err);
    } else {
      Toast.makeText("The given link isn't valid.", Toast.LENGTH_SHORT).show();
    }
  };

  return {
    readOnlyRepos,
    getRepos: repos,
    setRepos,
    addRepo,
    removeRepo,
    changeEnabledState,
    modulesIndex,
    moduleOptions,
  };
};
