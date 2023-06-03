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
    var regex = /%s/;
    var _r = function (p: any, c: any) {
      return p.replace(regex, c);
    };
    return format.reduce(_r, str);
  };
};

export const Text = (props: TextProps): JSX.Element => {
  const { string, format = [] } = props;

  var regex = /%s/;
  var _r = function (p: any, c: any) {
    return p.replace(regex, c);
  };
  return <>{format.reduce(_r, string)}</>;

  // const lang = React.useContext(LanguageContext);
  // const raw = lang.language[string];
  // return <>{[format].reduce((p, c) => p.replace(/%s/, c), raw)}</>;
};

const useLanguage = () => {
  return useNativeStorage("language_select", React.useContext(LanguageContext).defaultLang);
};
