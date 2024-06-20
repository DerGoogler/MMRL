import React, { createContext, useContext } from "react";
import { defaultComposer } from "default-composer";
import { SetStateAction } from "./useStateCallback";
import { useLanguageMap } from "./../locales/declaration";
import { useNativeFileStorage } from "./useNativeFileStorage";

export interface Picker<N, V> {
  name: N;
  value: V;
}

export interface StorageDeclaration {
  darkmode: boolean;
  language: Picker<string, string>;
  eruda_console_enabled: boolean;
  disabled_repos: string[];
  _low_quality_module: boolean;
  _invald_module: boolean;
  shade_value: number;
  term_scroll_bottom: boolean;
  term_scroll_behavior: { name: string; value: ScrollBehavior };
  link_protection: boolean;
  swipeable_tabs: boolean;
  print_terminal_error: boolean;
  terminal_word_wrap: boolean;
  terminal_numberic_lines: boolean;
}

export const termScrollBehaviors: StorageDeclaration["term_scroll_behavior"][] = [
  {
    name: "Smooth",
    value: "smooth",
  },
  {
    name: "Instant",
    value: "instant" as "smooth",
  },
];

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
  // @ts-ignore
  settings: {},
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
  const availableLangs = useLanguageMap();

  const INITIAL_SETTINGS = React.useMemo<StorageDeclaration>(
    () => ({
      darkmode: false,
      language: availableLangs[0],
      eruda_console_enabled: false,
      disabled_repos: [],
      _low_quality_module: true,
      _invald_module: false,
      shade_value: -80,
      term_scroll_bottom: true,
      term_scroll_behavior: termScrollBehaviors[0],
      link_protection: true,
      swipeable_tabs: false,
      print_terminal_error: false,
      terminal_word_wrap: true,
      terminal_numberic_lines: true,
    }),
    []
  );

  const [settings, setSettings] = useNativeFileStorage("/data/adb/mmrl/settings.v2.json", INITIAL_SETTINGS, { loader: "json" });

  const _setSettings = (name, state, callback) => {
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
  };

  const contextValue = React.useMemo(
    () => ({
      patchSettings: () => {
        setSettings(defaultComposer(INITIAL_SETTINGS, settings));
      },
      settings: defaultComposer(INITIAL_SETTINGS, settings),
      setSettings: _setSettings,
    }),
    [settings]
  );

  return <SettingsContext.Provider value={contextValue} children={props.children} />;
};
