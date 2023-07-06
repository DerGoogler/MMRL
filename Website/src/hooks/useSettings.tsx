import React, { createContext, useContext } from "react";
import { colors as kolors, useTheme as useMom, createTheme, ThemeProvider } from "@mui/material";
import useShadeColor from "./useShadeColor";
import { UI } from "@Native/components/UI";
import { defaultComposer } from "default-composer";
import { useNativeStorage } from "./useNativeStorage";
import { os } from "@Native/Os";
import { Languages, languages_map } from "./../language/languages";
import { useEventCallback } from "usehooks-ts";

export namespace Settings {
  export type SetStateAction<T = Root> = Partial<T> | ((prevState: Partial<T>) => Partial<T>);

  export interface Context {
    settings: Root;
    setSettings<K extends keyof Root>(key: K, state: SetStateAction<Root[K]>, callback?: (state: Root[K]) => void): void;
  }
  export interface Root {
    darkmode: boolean;
    language: Languages;
    accent_scheme: Settings.AccentScheme;
    eruda_console_enabled: boolean;
    disabled_repos: string[];
  }

  export type AccentScheme = {
    name: string;
    value: any;
  };
}

export const accent_colors: Settings.AccentScheme[] = [
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

export const INITIAL_SETTINGS: Settings.Root = {
  darkmode: false,
  language: languages_map[0],
  accent_scheme: accent_colors[0],
  eruda_console_enabled: false,
  disabled_repos: [],
};

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

export const SettingsContext = createContext<Settings.Context>({
  settings: INITIAL_SETTINGS,
  setSettings<K extends keyof Settings.Root>(
    key: K,
    state: Settings.SetStateAction<Settings.Root[K]>,
    callback?: (state: Settings.Root[K]) => void
  ) {},
});

export const useSettings = () => {
  return useContext(SettingsContext);
};

export const useTheme = () => {
  const theme = useMom();
  const { settings } = useSettings();

  return {
    scheme: colors[settings.accent_scheme.value],
    theme: theme,
  };
};

export const SettingsProvider = (props: React.PropsWithChildren) => {
  const [settings, setSettings] = useNativeStorage<Settings.Root>("settings", INITIAL_SETTINGS);
  const shade = useShadeColor();

  const theme = createTheme({
    shape: {
      borderRadius: 8,
    },
    palette: !settings.darkmode
      ? {
          mode: "light",
          primary: {
            light: colors[settings.accent_scheme.value][300],
            main: colors[settings.accent_scheme.value][900],
            // @ts-ignore
            dark: colors[settings.accent_scheme.value][800],
            // contrastText: colors.grey[900],
          },
          background: {
            default: "#fafafa",
          },
          divider: "#e5e8ec",
          secondary: {
            main: "#e5e8ec",
            light: "#eeeeee",
          },
        }
      : {
          mode: "dark",
          primary: {
            light: shade(colors[settings.accent_scheme.value][300], -10),
            main: shade(colors[settings.accent_scheme.value][900], -29),
            // dark: shadeColor(colors[settings.accent_scheme.value][800], -40),
          },
          background: {
            default: shade(colors[settings.accent_scheme.value][800], -75),
          },
          divider: shade(colors[settings.accent_scheme.value][900], -81),
          secondary: {
            main: "#e5e8ec",
            light: shade(colors[settings.accent_scheme.value][800], -66),
            dark: shade(colors[settings.accent_scheme.value][800], -70),
          },
        },
  });

  return (
    <ThemeProvider theme={theme}>
      <UI.Statusbar color={theme.palette.primary.main} white={false}>
        <UI.Navigationbar color={theme.palette.background.default}>
          <SettingsContext.Provider
            value={{
              settings: defaultComposer(INITIAL_SETTINGS, settings),
              setSettings: useEventCallback((name, state, callback) => {
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
              }),
            }}
            children={props.children}
          />
        </UI.Navigationbar>
      </UI.Statusbar>
    </ThemeProvider>
  );
};

// function set<K extends keyof Root>(key: K, value: Root[K] | ((prevState: Root[K]) => Root[K])) {}
