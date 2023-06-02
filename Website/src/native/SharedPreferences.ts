import { StorageImpl } from "web-shared-preferences";
import { os } from "./os";
import { parseJSON } from "@Hooks/useNativeStorage";

// ommiting to avoid errors in editor
export interface CustomStorageImpl extends Omit<StorageImpl, "getItem"> {
  getItem<T>(key: string, initialValue: T): T;
}

/**
 * Simple ~class~ FUNCTION!!!!! to manage the web local sotrage and the Android native preferences
 * @extends {Native}
 */
function NativeStorage(): CustomStorageImpl {
  const getInterface = window["sharedpreferences"];

  return {
    get length(): number {
      return 0;
    },

    setItem(key: string, value: any): void {
      if (os.isAndroid) {
        getInterface.setItem(key, JSON.stringify(value));
      } else {
        localStorage.setItem(key, JSON.stringify(value));
      }
    },

    getItem<T>(key: string, initialValue: T): T {
      if (os.isAndroid) {
        const item = getInterface.getItem(key);
        return item ? (parseJSON(item) as T) : initialValue;
      } else {
        const item = localStorage.getItem(key);
        return item ? (parseJSON(item) as T) : initialValue;
      }
    },

    clear(): void {
      if (os.isAndroid) {
        getInterface.clear();
      } else {
        localStorage.clear();
      }
    },

    removeItem(key: string): void {
      if (os.isAndroid) {
        getInterface.removeItem(key);
      } else {
        localStorage.removeItem(key);
      }
    },

    key(index: number): string | null {
      return null;
    },
  };
}

const SharedPreferences = NativeStorage();

export { SharedPreferences };
