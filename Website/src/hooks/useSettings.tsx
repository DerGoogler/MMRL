import React, { createContext, useContext } from "react";
import { colors as kolors } from "@mui/material";
import { defaultComposer } from "default-composer";
import { useNativeStorage } from "./useNativeStorage";
import { languages_map } from "../locales/languages";
import { os } from "@Native/Os";

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

export const colors = {
  amber: kolors.amber,
  blue: kolors.blue,
  blueGrey: kolors.blueGrey,
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
  __experimental_local_install: boolean;
  repos: StoredRepo[];
  test: any;
}

export const INITIAL_SETTINGS: StorageDeclaration = {
  darkmode: false,
  language: languages_map[0],
  accent_scheme: accent_colors[0],
  eruda_console_enabled: false,
  disabled_repos: [],
  __experimental_local_install: false,
  repos: [],
  test: [],
};

export const SettingsContext = createContext<any>({
  settings: INITIAL_SETTINGS,
  setSettings(key: any, state: any, callback?: (state: any) => void) {},
});

export const useSettings = () => {
  return useContext(SettingsContext);
};

export const SettingsProvider = (props: React.PropsWithChildren) => {
  const [settings, setSettings] = useNativeStorage("settings", INITIAL_SETTINGS);

  return (
    <SettingsContext.Provider
      value={{
        settings: defaultComposer(INITIAL_SETTINGS, settings),
        setSettings: (name, state, callback) => {
          setSettings(
            (prev) => {
              // const newValue = state instanceof Function ? state(prev[name]) : state;
              return {
                ...prev,
                [name]: state,
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