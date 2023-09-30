/**
 * FORK (https://usehooks-ts.com/react-hook/use-local-storage) to use our native storage
 */

import { useCallback, useEffect } from "react";

import { useEventCallback, useEventListener } from "usehooks-ts";
import { os } from "@Native/Os";
import { Dispatch, SetStateAction, useStateCallback } from "./useStateCallback";
import { useLog } from "./native/useLog";
import { Shell } from "@Native/Shell";
import { useNativeStorage } from "./useNativeStorage";

declare global {
  interface WindowEventMap {
    "native-storage": CustomEvent;
  }
}

export type SetValue<T> = Dispatch<SetStateAction<T>, T>;

export const nativeProperties = {
  setItem(key: str, val: str): void {
    Shell.cmd(`setprop "${key}" "${val}"`).exec();
  },
  getItem(key: str, initialValue: str): string | "" {
    return window.__properties__.get(key, initialValue);
  },
};

if (window.__nativeStorage__) {
  window.__nativeStorage__.defineName("localstorage");
}

/**
 * Fallback for playground
 * @returns
 */
export function useNativeProperties(key: string, initialValue: str): [str, SetValue<str>] {
  if (os.isAndroid) {
    return __useProperties(key, initialValue);
  } else {
    return useNativeStorage<str>(key, initialValue);
  }
}

function __useProperties(key: string, initialValue: str): [str, SetValue<str>] {
  const log = useLog("useNativeProperties");
  // Get from local storage then

  // parse stored json or return initialValue

  const readValue = useCallback((): str => {
    // Prevent build error "window is undefined" but keeps working

    if (typeof window === "undefined") {
      return initialValue;
    }

    return nativeProperties.getItem(key, initialValue);
  }, [initialValue, key]);

  // State to store our value

  // Pass initial state function to useState so logic is only executed once

  const [storedValue, setStoredValue] = useStateCallback<str>(readValue);

  // Return a wrapped version of useState's setter function that ...

  // ... persists the new value to localStorage.

  const setValue: SetValue<str> = (value, callback) => {
    // Prevent build error "window is undefined" but keeps working

    if (typeof window === "undefined") {
      log.w(`Tried setting nativeProperties key “${key}” even though environment is not a client`);
    }

    try {
      // Allow value to be a function so we have the same API as useState

      const newValue = value instanceof Function ? value(storedValue) : value;

      // Save to local storage

      nativeProperties.setItem(key, JSON.stringify(newValue));

      // Save state

      setStoredValue(newValue, callback);

      // We dispatch a custom event so every useLocalStorage hook are notified

      // window.dispatchEvent(new Event("local-storage"));
    } catch (error) {
      log.w(`Error setting localStorage key “${key}”: ${error}`);
    }
  };

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
