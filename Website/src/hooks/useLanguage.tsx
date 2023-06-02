import React from "react";
import { useNativeStorage } from "./useNativeStorage";

export const LanguageContext = React.createContext<any>({});

export const LanguageProvider = (props: any) => {
  const { langs, defaultLang } = props;
  const [lang] = useNativeStorage("language_select", defaultLang);
  const language = langs[lang];
  return (
    <LanguageContext.Provider
      value={{
        defaultLang,
        language,
      }}
    >
      {props.children}
    </LanguageContext.Provider>
  );
};

interface TextProps {
  string: string;
  format?: Array<any>;
}

export const useText = (): ((str: string, format?: Array<any>) => string) => {
  return (str: string, format = []) => {
    const lang = React.useContext(LanguageContext);
    const raw = lang.language[str];
    return [format]?.reduce((p, c) => p.replace(/%s/, c), raw);
  };
};

export const Text = (props: TextProps): JSX.Element => {
  const { string, format } = props;
  const lang = React.useContext(LanguageContext);
  const raw = lang.language[string];
  return <>{[format]?.reduce((p, c) => p.replace(/%s/, c), raw)}</>;
};

const useLanguage = () => {
  return useNativeStorage("language_select", React.useContext(LanguageContext).defaultLang);
};
