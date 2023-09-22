import React, { createContext, useContext } from "react";
import { colors as kolors } from "@mui/material";
import { defaultComposer } from "default-composer";
import { SetValue, useNativeStorage } from "./useNativeStorage";
import { languages_map } from "../locales/languages";
import { os } from "@Native/Os";
import { SetStateAction } from "./useStateCallback";

export const accent_colors: Picker<string, any>[] = [
  {
    name: "Purple",
    value: "purple",
  },
  {
    name: "Amber",
    value: "amber",
  },
  {
    name: "Blue",
    value: "blue",
  },
  {
    name: "Blue & Grey",
    value: "blueGrey",
  },
  {
    name: "Dark & Grey",
    value: "darkGrey",
  },
  {
    name: "Cyan",
    value: "cyan",
  },
  {
    name: "Deep Orange",
    value: "deepOrange",
  },

  {
    name: "Deep Purple",
    value: "deepPurple",
  },
  {
    name: "Green",
    value: "green",
  },
  {
    name: "Indigo",
    value: "indigo",
  },
  {
    name: "Light Blue",
    value: "lightBlue",
  },

  {
    name: "Light Green",
    value: "lightGreen",
  },
  {
    name: "Lime",
    value: "lime",
  },
  {
    name: "Orange",
    value: "orange",
  },
  {
    name: "Pink",
    value: "pink",
  },

  {
    name: "Red",
    value: "red",
  },
  {
    name: "Teal",
    value: "teal",
  },
  {
    name: "Yellow",
    value: "yellow",
  },
  // Only load if it is android platform and above android 12
  ...(os.isAndroid
    ? os.sdk >= 31
      ? [
          {
            name: "Monet (Android 12+)",
            value: "monet",
          },
        ]
      : []
    : []),
];

const monet = {
  50: os.getMonetColor("system_accent2_50"),
  100: os.getMonetColor("system_accent2_100"),
  200: os.getMonetColor("system_accent2_200"),
  300: os.getMonetColor("system_accent2_300"),
  400: os.getMonetColor("system_accent2_400"),
  500: os.getMonetColor("system_accent2_500"),
  600: os.getMonetColor("system_accent2_600"),
  700: os.getMonetColor("system_accent2_700"),
  800: os.getMonetColor("system_accent2_800"),
  900: os.getMonetColor("system_accent2_900"),
};

const darkGrey = {
  50: "#bcc8d4",
  100: "#a9b4be",
  200: "#96a0a9",
  300: "#838c94",
  400: "#70787f",
  500: "#5e646a",
  600: "#4b5054",
  700: "#383c3f",
  800: "#25282a",
  900: "#121415",
};

export const colors = {
  amber: kolors.amber,
  blue: kolors.blue,
  blueGrey: kolors.blueGrey,
  darkGrey: darkGrey,
  brown: kolors.brown,
  cyan: kolors.cyan,
  deepOrange: kolors.deepOrange,
  deepPurple: kolors.deepPurple,
  green: kolors.green,
  grey: kolors.grey,
  indigo: kolors.indigo,
  lightBlue: kolors.lightBlue,
  lightGreen: kolors.lightGreen,
  lime: kolors.lime,
  orange: kolors.orange,
  pink: kolors.pink,
  purple: kolors.purple,
  red: kolors.red,
  teal: kolors.teal,
  yellow: kolors.yellow,
  // Only load if it is android platform and above android 12
  ...(os.isAndroid ? (os.sdk >= 31 ? { monet: monet } : {}) : {}),
};

export interface Picker<N, V> {
  name: N;
  value: V;
}

export interface StorageDeclaration {
  darkmode: boolean;
  language: Picker<string, string>;
  accent_scheme: Picker<string, any>;
  eruda_console_enabled: boolean;
  disabled_repos: string[];
  _low_quality_module: boolean;
  _disable_module_covers: boolean;
  __experimental_local_install: boolean;
  repos: StoredRepo[];
  shade_value: number;
}

export interface ModConf {
  //cli
  MSUCLI: string;
  KSUCLI: string;

  // default paths
  ADB: string;
  MODULES: string;
  PROPS: string;
  SYSTEM: string;
  SEPOLICY: string;
  CONFIG: string;

  // service paths
  LATESERVICE: string;
  POSTSERVICE: string;
  POSTMOUNT: string;
  BOOTCOMP: string;

  // status paths
  SKIPMOUNT: string;
  DISABLE: string;
  REMOVE: string;
  UPDATE: string;
}

export const INITIAL_SETTINGS: StorageDeclaration = {
  darkmode: false,
  language: languages_map[0],
  accent_scheme: accent_colors[0],
  eruda_console_enabled: false,
  disabled_repos: [],
  _low_quality_module: true,
  _disable_module_covers: false,
  __experimental_local_install: false,
  repos: [],
  shade_value: -80,
};

export const INITIAL_MOD_CONF: ModConf = {
  //cli
  MSUCLI: '/system/bin/magisk --install-module "<ZIPFILE>"',
  KSUCLI: '<ADB>/ksu/bin/ksud module install "<ZIPFILE>"',

  // default paths
  ADB: "/data/adb",
  MODULES: "<ADB>/modules",
  PROPS: "<MODULES>/<MODID>/module.prop",
  SYSTEM: "<MODULES>/<MODID>/system.prop",
  SEPOLICY: "<MODULES>/<MODID>/sepolicy.rule",
  CONFIG: `<MODULES>/<MODID>/system/usr/share/mmrl/config/<MODID>.mdx`,

  // service paths
  LATESERVICE: "<MODULES>/<MODID>/service.sh",
  POSTSERVICE: "<MODULES>/<MODID>/post-fs-data.sh",
  POSTMOUNT: "<MODULES>/<MODID>/post-mount.sh",
  BOOTCOMP: "<MODULES>/<MODID>/boot-completed.sh",

  // status paths
  SKIPMOUNT: "<MODULES>/<MODID>/skip_mount",
  DISABLE: "<MODULES>/<MODID>/disable",
  REMOVE: "<MODULES>/<MODID>/remove",
  UPDATE: "<MODULES>/<MODID>/update",
};

export interface Context {
  patchSettings: () => void;
  settings: StorageDeclaration;
  _modConf: ModConf;
  modConf<K extends keyof ModConf>(key: K, adds?: Record<string, any>): ModConf[K];
  setSettings<K extends keyof StorageDeclaration>(
    key: K,
    state: SetStateAction<StorageDeclaration[K]>,
    callback?: (state: StorageDeclaration[K]) => void
  ): void;
  setModConf<K extends keyof ModConf>(key: K, state: SetStateAction<ModConf[K]>, callback?: (state: ModConf[K]) => void): void;
}

export const SettingsContext = createContext<Context>({
  patchSettings: () => {},
  settings: INITIAL_SETTINGS,
  _modConf: INITIAL_MOD_CONF,
  modConf<K extends keyof ModConf>(key: K, adds?: Record<string, any>) {
    return key;
  },
  setSettings<K extends keyof StorageDeclaration>(
    key: K,
    state: SetStateAction<StorageDeclaration[K]>,
    callback?: (state: StorageDeclaration[K]) => void
  ) {},
  setModConf<K extends keyof ModConf>(key: K, state: SetStateAction<ModConf[K]>, callback?: (state: ModConf[K]) => void) {},
});

export const useSettings = () => {
  return useContext(SettingsContext);
};

function formatString(template, object) {
  return template.replace(/\<(\w+(\.\w+)*)\>/gi, (match, key) => {
    const keys = key.split(".");
    let value = object;
    for (const k of keys) {
      if (k in value) {
        value = value[k];
      } else {
        return match;
      }
    }
    return formatString(String(value), object);
  });
}

export const SettingsProvider = (props: React.PropsWithChildren) => {
  const [settings, setSettings] = useNativeStorage("settings", INITIAL_SETTINGS);
  const [modConf, setModConf] = useNativeStorage("mod-conf", INITIAL_MOD_CONF);

  // Test purposes
  // React.useEffect(() => {
  //   for (const k in modConf) {
  //     console.info(
  //       formatString(defaultComposer(INITIAL_MOD_CONF, modConf)[k], {
  //         ...modConf,
  //         ...{
  //           MODID: "node_on_android",
  //           ZIPFILE: "/sdard/xh.zip",
  //         },
  //       })
  //     );
  //   }
  // }, [modConf]);

  return (
    <SettingsContext.Provider
      value={{
        patchSettings: () => {
          setSettings(defaultComposer(INITIAL_SETTINGS, settings));
        },
        _modConf: defaultComposer(INITIAL_MOD_CONF, modConf),
        modConf: (key, adds) => {
          return formatString(defaultComposer(INITIAL_MOD_CONF, modConf)[key], { ...modConf, ...adds });
        },
        settings: defaultComposer(INITIAL_SETTINGS, settings),
        setSettings: (name, state, callback) => {
          setSettings(
            (prev) => {
              const newValue = state instanceof Function ? state(prev[name]) : state;
              return {
                ...prev,
                [name]: newValue,
              };
            },
            (state) => callback && callback(state[name])
          );
        },
        setModConf: (name, state, callback) => {
          setModConf(
            (prev) => {
              const newValue = state instanceof Function ? state(prev[name]) : state;
              return {
                ...prev,
                [name]: newValue,
              };
            },
            (state) => callback && callback(state[name])
          );
        },
      }}
      children={props.children}
    />
  );
};
