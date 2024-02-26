import { SetStateAction, useCallback, useEffect, useState } from "react";
import { useLog } from "./native/useLog";
import { SuFile } from "@Native/SuFile";
import INI from "ini";
import YAML from "yaml";
import { os } from "@Native/Os";
import { SetValue } from "./useNativeStorage";
import React from "react";

type Loader = "json" | "yaml" | "yml" | "prop" | "properties" | "ini" | null;

export function useNativeFileStorage<T = string>(
  key: string,
  initialValue: T,
  opt: { loader: Loader } = { loader: null }
): [T, SetValue<T>] {
  const { loader } = opt;

  const file = new SuFile(key);

  const readValue = useCallback((): T => {
    try {
      if (file.exist()) {
        switch (loader) {
          case "json":
            return JSON.parse(file.read());
          case "properties":
          case "prop":
          case "ini":
            return INI.parse(file.read()) as T;
          case "yml":
          case "yaml":
            return YAML.parse(file.read());
          default:
            return file.read() as T;
        }
      } else {
        return initialValue;
      }
    } catch (error) {
      return initialValue;
    }
  }, [initialValue, key]);

  const [storedValue, setStoredValue] = useState<T>(readValue);

  const setValue: SetValue<T> = (value) => {
    try {
      const newValue = value instanceof Function ? value(storedValue) : value;
      switch (loader) {
        case "json":
          file.write(JSON.stringify(newValue, null, 4));
          break;
        case "properties":
        case "prop":
        case "ini":
          file.write(INI.stringify(newValue, { whitespace: true, newline: true }));
          break;
        case "yml":
        case "yaml":
          file.write(YAML.stringify(newValue));
          break;
        default:
          file.write(String(newValue));
          break;
      }
      setStoredValue(newValue);
    } catch (error) {
      throw new Error(`Error writing file “${key}”: ${error}`);
    }
  };

  useEffect(() => {
    setStoredValue(readValue());
  }, []);

  return [storedValue, setValue];
}

export type ConfigContext = [object, (key: string, state: SetStateAction<object>) => void, SetValue<object>];

export const ConfigContext = React.createContext<ConfigContext>([
  {},
  (key: string, state: SetStateAction<object>) => {},
  (state: SetStateAction<object>) => {},
]);

export const useConfig = () => {
  return React.useContext(ConfigContext);
};

export interface ConfigProvider extends React.PropsWithChildren {
  loadFromFile: string;
  loader: Loader;
  initialConfig: object;
}

export const ConfigProvider = (props: ConfigProvider) => {
  const { loadFromFile, loader = "json", initialConfig } = props;

  if (!loadFromFile) {
    throw new TypeError('"loadFromFile" is undefined');
  }

  if (!initialConfig) {
    throw new TypeError('"initialConfig" is undefined');
  }

  const [config, setConfig] = useNativeFileStorage<object>(loadFromFile, initialConfig, { loader: loader });

  const contextValue = React.useMemo<ConfigContext>(
    () => [
      config,
      (name, state) => {
        setConfig((prev) => {
          const newValue = state instanceof Function ? state(prev[name]) : state;
          return {
            ...prev,
            [name]: newValue,
          };
        });
      },
      setConfig,
    ],
    [config]
  );

  return <ConfigContext.Provider value={contextValue} children={props.children} />;
};
