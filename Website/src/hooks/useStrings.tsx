import * as React from "react";
import { useLocalStorage } from "usehooks-ts";
import { SetValue, useNativeStorage } from "./useNativeStorage";
import { StringDeclaration, strs, useLanguageMap } from "./../locales/declaration";
import { useSettings } from "./useSettings";

interface StrContext {
  strings<K extends keyof Record<StringDeclaration, str>>(key: K, fmt?: object): str;
  format(template: str, object?: object): str;
  readonly currentLanguage: str;
}

const StringsContext = React.createContext<StrContext>({
  strings<K extends keyof Record<StringDeclaration, str>>(key: K, fmt?: object): str {
    return "";
  },
  format(template: str, object?: object): str {
    return "";
  },
  currentLanguage: "en",
});

export interface AvailableLangs {
  name: str;
  value: str;
}

/**
 *
 * @param strings The first element is the default language
 */
export const StringsProvider = (props: React.PropsWithChildren) => {
  const { settings } = useSettings();

  const defaultLanguage = Object.keys(strs)[0];
  const currentLanguage = React.useMemo(() => settings.language.value, [settings]);

  const format = React.useCallback((template: string, object?: object) => {
    return template.replace(/\{(\w+(\.\w+)*)\}/gi, (match, key) => {
      const keys = key.split(".");
      let value = object || {};
      for (const k of keys) {
        if (k in value) {
          value = value[k];
        } else {
          return match;
        }
      }
      return format(String(value), object);
    });
  }, []);

  const strings = React.useCallback(
    (key: string, fmt?: object) => {
      const currentLang = strs[currentLanguage];
      const defaultLang = strs[defaultLanguage];

      if (currentLang[key] !== undefined) {
        return format(currentLang[key], fmt);
      } else if (defaultLang[key] !== undefined) {
        return format(defaultLang[key], fmt);
      } else {
        return "";
      }
    },
    [currentLanguage]
  );

  const contextValue = React.useMemo(
    () => ({
      strings,
      format,
      currentLanguage,
    }),
    [strings, format, currentLanguage, settings]
  );

  return <StringsContext.Provider children={props.children} value={contextValue} />;
};

export const useStrings = () => React.useContext(StringsContext);
