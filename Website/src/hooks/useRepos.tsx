import React from "react";
import { SetValue, useNativeStorage } from "./useNativeStorage";
import Toast from "@Native/Toast";
import axios from "axios";
import { link, util } from "googlers-tools";

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
}

export const RepoContext = React.createContext<any>({ repos: [], setRepos: () => {} });

// const LanguageProvider = (props: any) => {
//   const { langs, defaultLang } = props;
//   const [lang] = useNativeStorage("language_select", defaultLang);
//   const language = langs[lang];
//   return (
//     <LanguageContext.Provider
//       value={{
//         defaultLang,
//         language,
//       }}
//     >
//       {props.children}
//     </LanguageContext.Provider>
//   );
// };

export const RepoProvider = (props: React.PropsWithChildren) => {
  const [repos, setRepos] = useNativeStorage<Array<RepoInterface>>("repos", []);
  return <RepoContext.Provider value={{ repos, setRepos }} children={props.children} />;
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
  const { repos, setRepos }: RepoContextInterface = React.useContext(RepoContext);

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
  };
};
