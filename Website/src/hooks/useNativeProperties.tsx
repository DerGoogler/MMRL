/**
 * FORK (https://usehooks-ts.com/react-hook/use-local-storage) to use our native storage
 */

import { useCallback, useEffect } from "react";

import { os } from "@Native/Os";
import { Dispatch, SetStateAction, useStateCallback } from "./useStateCallback";
import { useLog } from "./native/useLog";
import { Shell } from "@Native/Shell";
import { parseJSON, useNativeStorage } from "./useNativeStorage";
import { Properties } from "@Native/Properties";

declare global {
  interface WindowEventMap {
    "native-storage": CustomEvent;
  }
}

export type SetValue<T> = Dispatch<SetStateAction<T>, T>;

function convertToProperType(value: string) {
  if (/^(true|1|y|yes|on)$/i.test(value)) {
    return /^(true|1|y|yes|on)$/i.test(value); // Convert to boolean true
  } else if (!isNaN(value as unknown as number)) {
    return parseFloat(value); // Convert to number if it's a valid number
  } else {
    return value; // Return the original string if no conversion is possible
  }
}

type KJGHKSJFDHGIUDHGKJHFDG = string | boolean | number;

export function useNativeProperties(
  key: string,
  initialValue: KJGHKSJFDHGIUDHGKJHFDG
): [KJGHKSJFDHGIUDHGKJHFDG, SetValue<KJGHKSJFDHGIUDHGKJHFDG>] {
  const log = useLog("useNativeProperties");

  const readValue = useCallback((): KJGHKSJFDHGIUDHGKJHFDG => {
    // Prevent build error "window is undefined" but keeps working

    if (typeof window === "undefined") {
      return initialValue;
    }

    try {
      return parseJSON(Properties.get(key, JSON.stringify(initialValue))) as KJGHKSJFDHGIUDHGKJHFDG;
    } catch (error) {
      log.w(`Error reading nativeStorage key “${key}”: ${error}`);

      return initialValue;
    }
  }, [initialValue, key]);

  const [storedValue, setStoredValue] = useStateCallback<KJGHKSJFDHGIUDHGKJHFDG>(readValue);

  const setValue: SetValue<KJGHKSJFDHGIUDHGKJHFDG> = (value, callback) => {
    if (typeof window === "undefined") {
      log.w(`Tried setting nativeProperties key “${key}” even though environment is not a client`);
    }

    try {
      const newValue = value instanceof Function ? value(storedValue) : value;
      Properties.set(key, JSON.stringify(JSON.stringify(newValue)));
      setStoredValue(newValue, callback);
    } catch (error) {
      log.w(`Error setting localStorage key “${key}”: ${error}`);
    }
  };

  useEffect(() => {
    setStoredValue(readValue());
  }, []);

  return [storedValue, setValue];
}
