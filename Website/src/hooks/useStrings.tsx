import React from "react";
import { useSettings } from "./useSettings";
import { languages } from "./../language/languages";

const Strings = React.createContext({
  strings: languages,
  language: "en",
});

export type StringProviderProps = {
  children: React.ReactNode;
};

export const StringProvider = (props: StringProviderProps) => {
  const { settings } = useSettings();

  languages.setLanguage(settings.language.value);
  return (
    <Strings.Provider
      value={{
        strings: languages,
        language: settings.language.value,
      }}
      children={props.children}
    />
  );
};

export const useStrings = () => {
  return React.useContext(Strings);
};
