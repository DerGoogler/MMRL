import { useCallback, useEffect, useState } from "react";
import { useLog } from "./native/useLog";
import { SuFile } from "@Native/SuFile";
import { SetValue, parseJSON } from "./useNativeStorage";

export function useNativeFileStorage<T>(key: string, initialValue: T): [T, SetValue<T>] {
  const log = useLog("useNativeStorage");

  const file = new SuFile(key);

  const readValue = useCallback((): T => {
    if (typeof window === "undefined") {
      return initialValue;
    }

    try {
      return file.exist() ? (parseJSON(file.read()) as T) : initialValue;
    } catch (error) {
      log.w(`Error reading file “${key}”: ${error}`);

      return initialValue;
    }
  }, [initialValue, key]);

  const [storedValue, setStoredValue] = useState<T>(readValue);

  const setValue: SetValue<T> = (value) => {
    if (typeof window === "undefined") {
      log.w(`Tried setting localStorage key “${key}” even though environment is not a client`);
    }

    try {
      const newValue = value instanceof Function ? value(storedValue) : value;
      file.write(JSON.stringify(newValue));
      setStoredValue(newValue);
    } catch (error) {
      log.w(`Error writing file “${key}”: ${error}`);
    }
  };

  useEffect(() => {
    setStoredValue(readValue());
  }, []);

  return [storedValue, setValue];
}
