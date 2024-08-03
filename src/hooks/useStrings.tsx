import * as React from "react";
import { useLocalStorage } from "usehooks-ts";
import { SetValue, useNativeStorage } from "./useNativeStorage";
import { StringDeclaration, Strs, useLanguageMap } from "./../locales/declaration";
import { useSettings } from "./useSettings";

export type ReplacementObject = {
  [key: string]: React.ReactNode;
};

interface StrContext {
  strings<K extends keyof Record<StringDeclaration, str>>(key: K, fmt?: ReplacementObject): React.ReactNode;
  format(template: str, object?: object): React.ReactNode;
  readonly currentLanguage: str;
}

const StringsContext = React.createContext<StrContext>({
  strings<K extends keyof Record<StringDeclaration, str>>(key: K, fmt?: ReplacementObject): React.ReactNode {
    return <></>;
  },
  format(template: str, object?: object): React.ReactNode {
    return "";
  },
  currentLanguage: "en",
});

export interface AvailableLangs {
  name: str;
  value: str;
}

interface StringsProviderProps extends React.PropsWithChildren {
  data: Strs;
}

/**
 *
 * @param strings The first element is the default language
 */
export const StringsProvider = (props: StringsProviderProps) => {
  const { settings } = useSettings();

  const defaultLanguage = Object.keys(props.data)[0];
  const currentLanguage = React.useMemo(() => settings.language.value, [settings]);

  // const format = React.useCallback((template: string, object?: object) => {
  //   return template.replace(/\{(\w+(\.\w+)*)\}/gi, (match, key) => {
  //     const keys = key.split(".");
  //     let value = object || {};
  //     for (const k of keys) {
  //       if (k in value) {
  //         value = value[k];
  //       } else {
  //         return match;
  //       }
  //     }
  //     return format(String(value), object);
  //   });
  // }, []);

  const format = React.useCallback((str: string, replacement?: ReplacementObject) => {
    if (!replacement) {
      return str;
    }

    const result: React.ReactNode[] = [];
    const keys = Object.keys(replacement);
    const getRegExp = () => {
      const regexp: React.ReactNode[] = [];
      keys.forEach((key) => regexp.push(`{${key}}`));
      return new RegExp(regexp.join("|"));
    };
    str.split(getRegExp()).forEach((item, i) => {
      result.push(item, replacement[keys[i]]);
    });
    return result;
  }, []);

  const strings = React.useCallback(
    (key: string, fmt?: ReplacementObject) => {
      const currentLang = props.data[currentLanguage];
      const defaultLang = props.data[defaultLanguage];

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
