import { SetStateAction, useCallback, useEffect, useState } from "react";
import { useLog } from "./native/useLog";
import { SuFile } from "@Native/SuFile";
import INI from "ini";
import YMAL from "yaml";
import { os } from "@Native/Os";
import { SetValue } from "./useNativeStorage";
import React from "react";

type Loader = typeof JSON | typeof INI | typeof YMAL | null;

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
        if (loader) {
          return loader.parse(file.read());
        } else {
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
      if (loader) {
        file.write((loader as any).stringify(newValue));
      } else {
        file.write(String(newValue));
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

export interface ConfigContext {
  config: object;
  setConfig(key: string, state: SetStateAction<object>): void;
}

export const ConfigContext = React.createContext<ConfigContext>({
  config: {},
  setConfig(key: string, state: SetStateAction<object>) {},
});

export const useConfig = () => {
  return React.useContext(ConfigContext);
};

export interface ConfigProvider extends React.PropsWithChildren {
  loadFromFile: string;
  loader: Loader;
  initialConfig: object;
}

export const ConfigProvider = (props: ConfigProvider) => {
  const { loadFromFile, loader = JSON, initialConfig } = props;

  if (!loadFromFile) {
    throw new TypeError('"loadFromFile" is undefined');
  }

  if (!initialConfig) {
    throw new TypeError('"initialConfig" is undefined');
  }

  const [config, setConfig] = useNativeFileStorage<object>(loadFromFile, initialConfig, { loader: loader });

  const contextValue = React.useMemo(
    () => ({
      config: config,
      setConfig: (name, state) => {
        setConfig((prev) => {
          const newValue = state instanceof Function ? state(prev[name]) : state;
          return {
            ...prev,
            [name]: newValue,
          };
        });
      },
    }),
    [config]
  );

  return <ConfigContext.Provider value={contextValue} children={props.children} />;
};
