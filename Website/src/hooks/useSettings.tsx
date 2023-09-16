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
  test: any;

  // Android only
  def_mod_path: string;
  mod_filt: string[];
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
  test: [],

  // Android only
  def_mod_path: "/data/adb/modules",
  mod_filt: ["lost\\+found"],
};

export interface Context {
  patchSettings: () => void;
  settings: StorageDeclaration;
  setSettings<K extends keyof StorageDeclaration>(
    key: K,
    state: SetStateAction<StorageDeclaration[K]>,
    callback?: (state: StorageDeclaration[K]) => void
  ): void;
}

export const SettingsContext = createContext<Context>({
  patchSettings: () => {},
  settings: INITIAL_SETTINGS,
  setSettings<K extends keyof StorageDeclaration>(
    key: K,
    state: SetStateAction<StorageDeclaration[K]>,
    callback?: (state: StorageDeclaration[K]) => void
  ) {},
});

export const useSettings = () => {
  return useContext(SettingsContext);
};

export const SettingsProvider = (props: React.PropsWithChildren) => {
  const [settings, setSettings] = useNativeStorage("settings", INITIAL_SETTINGS);

  return (
    <SettingsContext.Provider
      value={{
        patchSettings: () => {
          setSettings(defaultComposer(INITIAL_SETTINGS, settings));
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
      }}
      children={props.children}
    />
  );
};
