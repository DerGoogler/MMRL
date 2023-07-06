import { Native } from "./Native";
declare class MagiskClass extends Native {
    private log;
    /**
     * Get current installed Magisk version code
     */
    get VERSION_CODE(): number;
    get VERSION_NAME(): string;
    /**
     * `XX.Y` is parsed as `XXY00`, so you can just put the Magisk version name.
     * @param version
     * @returns
     */
    PARSE_VERSION(version: string): number;
    /**
     * Installs an Magisk module from path
     * @param path Directory path
     */
    INSTALL_MODULE(path: string): void;
    /**
     * Removes all Magisk modules and reboot
     * @warn Dangerus usage, keep it private!
     */
    private REMOVE_MODULES;
}
export declare const Magisk: MagiskClass;
export {};
