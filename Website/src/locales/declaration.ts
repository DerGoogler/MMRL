import { AvailableLangs, useStrings } from "@Hooks/useStrings";
import { de } from "./de";
import { en } from "./en";
import React from "react";

/**
 * English is the default language
 */
export type StringDeclaration = keyof typeof en;

export type Strs = {
  [code: str]: Partial<Record<StringDeclaration, str>>;
};

export const strs: Strs = {
  en: en,
  de: de,
};

export const useLanguageMap = (): arr<AvailableLangs> => {
  const { currentLanguage } = useStrings();

  const regionNames = React.useMemo(
    () =>
      new Intl.DisplayNames([currentLanguage], {
        type: "language",
      }),
    [currentLanguage]
  );

  return Object.keys(strs).map((key) => ({
    name: regionNames.of(key) || "Unknown",
    value: key,
  }));
};
