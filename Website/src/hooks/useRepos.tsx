import React from "react";
import { SetValue, useNativeStorage } from "./useNativeStorage";
import axios from "axios";
import { link } from "googlers-tools";
import _ from "underscore";
import { useSettings } from "./useSettings";
import { os } from "@Native/Os";
import Ajv, { JSONSchemaType } from "ajv";
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
  state: boolean;
  callback?: (state: string[]) => void;
};

const repo_schema = {
  type: "object",
  additionalProperties: true,
  required: ["last_update", "name", "modules"],
  properties: {
    last_update: {
      type: "number",
    },
    name: {
      type: "string",
    },
    website: {
      type: "string",
      nullable: true,
    },
    support: {
      type: "string",
      nullable: true,
    },
    donate: {
      type: "string",
      nullable: true,
    },
    submitModule: {
      type: "string",
      nullable: true,
    },
    modules: {
      type: "array",
      items: {
        type: "object",
        required: ["id", "last_update", "prop_url", "zip_url", "notes_url"],
        properties: {
          id: {
            type: "string",
          },
          last_update: {
            type: "number",
          },
          prop_url: {
            type: "string",
          },
          zip_url: {
            type: "string",
          },
          notes_url: {
            type: "string",
          },
        },
      },
    },
  },
};

export const RepoProvider = (props: React.PropsWithChildren) => {
  const log = useLog("RepoProvider");
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
          const ajv = new Ajv(); // options can be passed, e.g. {allErrors: true}
          const validate = ajv.compile(repo_schema);
          const valid = validate(response) as boolean;

          if (valid) {
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
          } else {
            log.e(JSON.stringify(validate.errors, null, 4));
            os.toast("Repository schema does not match", Toast.LENGTH_SHORT);
          }
        })
        .catch((e) => (data.callback ? data.callback(e) : log.e(e)));
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
