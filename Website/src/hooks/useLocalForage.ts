import { useState, useEffect, useCallback, useRef } from "react";
import localForage from "localforage";
import pkg from "./../../package.json";
import { useStateCallback } from "./useStateCallback";
import { SetValue } from "./useNativeStorage";

type ErrorHandler = (e?: Error) => void;

const defaultErrorHandler: ErrorHandler = (e?: Error) => {
  console.error(e);
};

localForage.config({
  driver: localForage.INDEXEDDB, // Force WebSQL; same as using setDriver()
  name: pkg.config.storage.name,
  version: pkg.config.storage.version,
  description: pkg.description,
});

export function useLocalForage<D>(key: string, initialValue: D, errorHandler?: ErrorHandler) {
  const [storedValue, setStoredValue] = useStateCallback<D>(initialValue);
  const _errorHandler = useRef(typeof errorHandler == undefined || errorHandler == null ? defaultErrorHandler : errorHandler);

  const error = (e?: Error) => {
    _errorHandler.current(e);
  };

  useEffect(() => {
    (async function () {
      try {
        const value: D | null = await localForage.getItem(key);
        setStoredValue(value == null ? initialValue : value);
      } catch (e) {
        error(e as any);
      }
    })();
  }, []);

  const setValue: SetValue<D> = useCallback(
    (value, callback) => {
      const newValue = value instanceof Function ? value(storedValue) : value;
      async function set(value: D, callback: ((state: D) => void) | undefined) {
        try {
          setStoredValue(value, callback);
          await localForage.setItem(key, value);
        } catch (e) {
          error(e as any);
        }
      }

      set(newValue, callback);
    },
    [key]
  );

  const removeValue = useCallback(() => {
    async function remove() {
      try {
        setStoredValue(initialValue);
        await localForage.removeItem(key);
      } catch (e) {
        error(e as any);
      }
    }

    remove();
  }, [key]);

  return [storedValue, setValue, removeValue] as const;
}
