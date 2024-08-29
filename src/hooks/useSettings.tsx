import { SetValue, useNativeStorage } from "@Hooks/useNativeStorage";
import { useLanguageMap } from "./../locales/declaration";
import React from "react";

export interface Picker<N, V> {
  name: N;
  value: V;
}

export interface StorageDeclaration {
  language: Picker<string, string>;
  eruda_console_enabled: boolean;
  disabled_repos: string[];
  _low_quality_module: boolean;
  _invald_module: boolean;
  term_scroll_bottom: boolean;
  term_scroll_behavior: { name: string; value: ScrollBehavior };
  link_protection: boolean;
  swipeable_tabs: boolean;
  print_terminal_error: boolean;
  terminal_word_wrap: boolean;
  terminal_numberic_lines: boolean;
  repos: RepoConfig[];
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

export const useSettings = <K extends keyof StorageDeclaration>(key: K): [StorageDeclaration[K], SetValue<StorageDeclaration[K]>] => {
  const availableLangs = useLanguageMap();

  const INITIAL_SETTINGS = React.useMemo<StorageDeclaration>(
    () => ({
      language: availableLangs[0],
      eruda_console_enabled: false,
      disabled_repos: [],
      _low_quality_module: true,
      _invald_module: false,
      term_scroll_bottom: true,
      term_scroll_behavior: termScrollBehaviors[0],
      link_protection: true,
      swipeable_tabs: false,
      print_terminal_error: false,
      terminal_word_wrap: true,
      terminal_numberic_lines: true,
      repos: [
        {
          name: "Googlers Magisk Repo",
          website: "https://mmrl.dergoogler.com",
          support: "https://github.com/Googlers-Repo/gmr/issues",
          donate: "https://github.com/sponsors/DerGoogler",
          submission:
            "https://github.com/Googlers-Repo/gmr/issues/new?assignees=&labels=module&projects=&template=submission.yml&title=%5BModule%5D%3A+",
          base_url: "https://gr.dergoogler.com/gmr/",
          max_num: 3,
          enable_log: true,
          log_dir: "log",
        },
        {
          name: "Magisk Modules Alt Repo",
          website: undefined,
          support: undefined,
          donate: undefined,
          submission:
            "https://github.com/Magisk-Modules-Alt-Repo/submission/issues/new?assignees=&labels=module&projects=&template=module-submission.yml&tit",
          base_url: "https://magisk-modules-alt-repo.github.io/json-v2/",
          max_num: 3,
          enable_log: true,
          log_dir: "log",
        },
      ],
    }),
    []
  );

  return useNativeStorage(key, INITIAL_SETTINGS[key]);
};
