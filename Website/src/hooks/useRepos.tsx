import React from "react";
import { SetValue, useNativeStorage } from "./useNativeStorage";
import Toast from "@Native/Toast";
import axios from "axios";
import { link, util } from "googlers-tools";
import { ModuleProps } from "./useActivity";
import _, { map } from "underscore";

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
  repos: Array<RepoInterface>;
  setRepos: SetValue<Array<RepoInterface>>;
  featuredModules: Array<ModuleProps.RootObject>;
  modulesIndex: Array<ModuleProps.RootObject>;
  moduleOptions: Array<ModuleProps.Options>;
}

export const RepoContext = React.createContext<RepoContextInterface>({
  repos: [],
  setRepos: () => {},
  featuredModules: [],
  modulesIndex: [],
  moduleOptions: [],
});

interface Props extends React.PropsWithChildren {
  deps?: React.DependencyList | undefined;
}

// const useCustomFetch = (urls: Array<RepoInterface>): any => {
//   try {
//     return urls.map((url) => useFetch<any>(url.modules).data.modules);
//   } catch {
//     return [];
//   }
// };

const getRandom = (arr: any, n: any) => {
  var result = new Array(n),
    len = arr.length,
    taken = new Array(len);
  if (n > len) throw new RangeError("getRandom: more elements taken than available");
  while (n--) {
    var x = Math.floor(Math.random() * len);
    result[n] = arr[x in taken ? taken[x] : x];
    taken[x] = --len in taken ? taken[len] : len;
  }
  return result;
};

export const RepoProvider = (props: Props) => {
  const { getRepos } = useRepos();
  const { readOnlyRepos } = useRoRepos();
  const [repos, setRepos] = useNativeStorage<Array<RepoInterface>>("repos", []);
  const [featuredModules, setFeaturedModules] = useNativeStorage<Array<ModuleProps.RootObject>>("featured_modules", []);
  const [featuredModulesDate, setFeaturedModulesDate] = useNativeStorage("featured_modules_date", "7/12/2017");

  const [modulesIndex, setModulesIndex] = React.useState<Array<ModuleProps.RootObject>>([]);
  const [moduleOptions, setModuleOptions] = React.useState<Array<ModuleProps.Options>>([]);

  React.useEffect(() => {
    Promise.all(
      [...readOnlyRepos, ...getRepos].map((rep) =>
        axios.get(rep.modules).then((resp) => {
          const modules = resp.data.modules;
          // console.log(modules);

          setModulesIndex((prev) => {
            const tmp = [...prev, ...modules];
            // get today's date. eg: "7/37/2007"
            var date = new Date().toLocaleDateString();

            if (featuredModulesDate !== date) {
              // setFeaturedModules([]);
              setFeaturedModulesDate(date);

              setFeaturedModules(_.sample(tmp, 5));
            }
            
            return tmp;
          });
        })
      )
    );

    axios.get("https://raw.githubusercontent.com/Googlers-Repo/googlers-repo.github.io/master/moduleOptions.json").then((response) => {
      setModuleOptions(response.data);
    });
  }, props.deps);

  return <RepoContext.Provider value={{ repos, setRepos, featuredModules, modulesIndex, moduleOptions }} children={props.children} />;
};

export const useRoRepos = () => {
  const [MMAREnabled, setMMAREnabled] = useNativeStorage("repoMMARenabled", true);
  const [GMREnabled, setGMREnabled] = useNativeStorage("repoGMRenabled", true);

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
      isOn: MMAREnabled,
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
      isOn: GMREnabled,
      built_in_type: "GMR",
    },
  ];

  return {
    readOnlyRepos,
    roRepoOpt: {
      MMAREnabled,
      GMREnabled,
      setMMAREnabled,
      setGMREnabled,
    },
  };
};

export const useRepos = () => {
  const { repos, setRepos, featuredModules, modulesIndex, moduleOptions }: RepoContextInterface = React.useContext(RepoContext);

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
    getRepos: repos,
    setRepos,
    addRepo,
    removeRepo,
    changeEnabledState,
    featuredModules,
    modulesIndex,
    moduleOptions,
  };
};
