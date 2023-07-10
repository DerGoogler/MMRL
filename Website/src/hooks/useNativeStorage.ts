/**
 * FORK (https://usehooks-ts.com/react-hook/use-local-storage) to use our native storage
 */

import { useCallback, useEffect } from "react";

import { useEventCallback, useEventListener } from "usehooks-ts";
import { os } from "@Native/Os";
import { Dispatch, SetStateAction, useStateCallback } from "./useStateCallback";
import { useLog } from "./native/useLog";

declare global {
  interface WindowEventMap {
    "native-storage": CustomEvent;
  }
}

export type SetValue<T> = Dispatch<SetStateAction<T>, T>;

export const nativeStorage = os.isAndroid ? window.__nativeStorage__ : window.localStorage;

export function useNativeStorage<T>(key: string, initialValue: T): [T, SetValue<T>] {
  const log = useLog("useNativeStorage");
  // Get from local storage then

  // parse stored json or return initialValue

  const readValue = useCallback((): T => {
    // Prevent build error "window is undefined" but keeps working

    if (typeof window === "undefined") {
      return initialValue;
    }

    try {
      const item = nativeStorage.getItem(key);

      return item ? (parseJSON(item) as T) : initialValue;
    } catch (error) {
      log.w(`Error reading nativeStorage key “${key}”: ${error}`);

      return initialValue;
    }
  }, [initialValue, key]);

  // State to store our value

  // Pass initial state function to useState so logic is only executed once

  const [storedValue, setStoredValue] = useStateCallback<T>(readValue);

  // Return a wrapped version of useState's setter function that ...

  // ... persists the new value to localStorage.

  const setValue: SetValue<T> = useEventCallback((value, callback) => {
    // Prevent build error "window is undefined" but keeps working

    if (typeof window === "undefined") {
      log.w(`Tried setting localStorage key “${key}” even though environment is not a client`);
    }

    try {
      // Allow value to be a function so we have the same API as useState

      const newValue = value instanceof Function ? value(storedValue) : value;

      // Save to local storage

      nativeStorage.setItem(key, JSON.stringify(newValue));

      // Save state

      setStoredValue(newValue, callback);

      // We dispatch a custom event so every useLocalStorage hook are notified

      // window.dispatchEvent(new Event("local-storage"));
    } catch (error) {
      log.w(`Error setting localStorage key “${key}”: ${error}`);
    }
  });

  useEffect(() => {
    setStoredValue(readValue());
  }, []);

  // const handleStorageChange = useCallback(
  //   (event: StorageEvent | CustomEvent) => {
  //     if ((event as StorageEvent)?.key && (event as StorageEvent).key !== key) {
  //       return;
  //     }

  //     setStoredValue(readValue());
  //   },

  //   [key, readValue]
  // );

  // // this only works for other documents, not the current one

  // useEventListener("storage", handleStorageChange);

  // // this is a custom event, triggered in writeValueToLocalStorage

  // // See: useLocalStorage()

  // useEventListener("native-storage", handleStorageChange);

  return [storedValue, setValue];
}

// A wrapper for "JSON.parse()"" to support "undefined" value

function parseJSON<T>(value: string | null): T | Error {
  try {
    return value === "undefined" ? undefined : JSON.parse(value ?? "");
  } catch (e) {
    console.log("parsing error on", { value });

    return e as Error;
  }
}
