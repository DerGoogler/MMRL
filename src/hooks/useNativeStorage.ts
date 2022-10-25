/**
 * FORK (https://usehooks-ts.com/react-hook/use-local-storage) to use our native storage
 */

import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from 'react';

import {useEventCallback} from 'usehooks-ts';
import NativeStorage from '../native/NativeStorage';

export type SetValue<T> = Dispatch<SetStateAction<T>>;

export const nativeStorage = new NativeStorage();

export function useNativeStorage<T>(
  key: string,
  initialValue: T,
): [T, SetValue<T>] {
  const readValue = useCallback((): T => {
    try {
      const item = nativeStorage.getItem(key);
      console.log(item)
      return item ? (parseJSON(item) as T) : initialValue;
    } catch (error) {
      console.warn(`Error reading nativeStorage key “${key}”:`, error);
      return initialValue;
    }
  }, [initialValue, key]);

  const [storedValue, setStoredValue] = useState<T>(readValue);
  const setValue: SetValue<T> = useEventCallback(value => {
    try {
      const newValue = value instanceof Function ? value(storedValue) : value;
      nativeStorage.setItem(key, JSON.stringify(newValue));
      setStoredValue(newValue);
    } catch (error) {
      console.warn(`Error setting localStorage key “${key}”:`, error);
    }
  });

  useEffect(() => {
    setStoredValue(readValue());
  }, []);
  return [storedValue, setValue];
}

// A wrapper for "JSON.parse()"" to support "undefined" value

function parseJSON<T>(value: string | null): T | Error {
  try {
    return value === 'undefined' ? undefined : JSON.parse(value ?? '');
  } catch (e) {
    console.log('parsing error on', {value});

    return e as Error;
  }
}
