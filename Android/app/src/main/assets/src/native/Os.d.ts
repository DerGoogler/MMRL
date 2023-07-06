import { Native } from "./Native";
export declare type OpenOptions = {
    target?: string | undefined;
    features?: {
        window?: string | undefined;
        /**
         * Only for Android
         */
        color?: string | undefined;
    } | undefined;
};
declare class OsClass extends Native {
    constructor();
    open(url?: string | URL | undefined, options?: OpenOptions): Window | null;
    hasStoragePermission(): boolean;
    requestStoargePermission(): void;
    /**
     * Closes the window. On Android closes the App
     */
    close(): void;
    /**
     * Makes an toast, even on Android
     * @param text
     * @param duration
     */
    toast(text: string, duration: "long" | "short"): void;
    /**
     * The SDK version of the software currently running on this hardware device.
     * @returns {number}
     */
    get sdk(): number;
    getMonetColor(id: string): string;
    /**
     * Changes the status bar color
     * @param color Your color
     * @param white `true` makes the status bar white
     */
    setStatusBarColor(color: string, white: boolean): void;
    setNavigationBarColor(color: string): void;
    addNativeEventListener<K extends keyof WindowEventMap>(type: K, callback: () => void, options?: boolean | AddEventListenerOptions): void;
    removeNativeEventListener<K extends keyof WindowEventMap>(type: K, callback: () => void, options?: boolean | AddEventListenerOptions): void;
}
export declare const os: OsClass;
export {};
