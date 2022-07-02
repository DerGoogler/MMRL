import SharedPreferences, { ISharedPreferences } from "@Native/SharedPreferences";
import LocalizedStrings from "localized-strings";
import de from "./../de.json";
import en from "./../en.json";

export const string = new LocalizedStrings(
  {
    en: en,
    de: de,
  },
  {}
);
