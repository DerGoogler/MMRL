/**
 * FORK (https://usehooks-ts.com/react-hook/use-local-storage) to use our native storage
 */
import { Dispatch, SetStateAction } from "./useStateCallback";
declare global {
    interface WindowEventMap {
        "native-storage": CustomEvent;
    }
}
export declare type SetValue<T> = Dispatch<SetStateAction<T>, T>;
export declare const nativeStorage: Pick<Storage, "clear" | "getItem" | "setItem" | "removeItem">;
export declare function useNativeStorage<T>(key: string, initialValue: T): [T, SetValue<T>];
