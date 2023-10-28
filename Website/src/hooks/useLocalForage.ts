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
    localForage.getItem<D>(key).then((value) => {
      if (value !== null) {
        setStoredValue(value);
      } else {
        setStoredValue(initialValue);
      }
    });
  }, []);

  const setValue: SetValue<D> = (value, callback) => {
    setStoredValue(value, callback);
    const newValue = value instanceof Function ? value(storedValue) : value;
    localForage.setItem<D>(key, newValue).then((_value) => {
      const _newValue = _value instanceof Function ? _value(storedValue) : _value;
      if (_newValue !== null) {
        setStoredValue(_newValue, callback);
      } else {
        setStoredValue(initialValue, callback);
      }
    });
  };

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
