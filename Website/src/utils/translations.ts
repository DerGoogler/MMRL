import * as t from "fuchs-template";
import de from "./../language/de.json";

const variableRegex = /\{[\w-]+?\}/g;

function translations(locale: any, isDevelopment: boolean) {
  if (typeof locale !== "object") throw new Error("The locale has to be an object.");

  const invalidLocale = Object.keys(locale).some(function (key) {
    return typeof locale[key] !== "string";
  });

  if (isDevelopment && invalidLocale) throw new Error("The locale json file has to be a map of strings to strings.");

  return function (key: string, values: string) {
    if (typeof locale[key] !== "string") {
      if (!isDevelopment) {
        return key;
      }
      throw new Error('There is no translation for the key "' + key + '" in this locale.');
    }

    const result = t(locale[key], values);

    if (isDevelopment && variableRegex.test(result)) {
      const undefinedVariables = result.match(variableRegex).join(", ");
      throw new Error("Missing value for " + undefinedVariables);
    }

    return result;
  };
}

export default translations;
