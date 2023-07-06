import LocalizedStrings from "localized-strings";
import DE_Locale from "./de.json";
import EN_Locale from "./en.json";

export const languages = new LocalizedStrings(
  {
    en: EN_Locale,
    de: DE_Locale,
  },
  {
    /* options */
  }
);

export type Languages = {
  name: string;
  value: string;
};

export const languages_map: Languages[] = [
  {
    name: "English",
    value: "en",
  },
  {
    name: "German",
    value: "de",
  },
];
