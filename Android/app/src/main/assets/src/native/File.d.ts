import { Native } from "./Native";
export interface FileSystemNative {
    read(): string;
    list(): string;
    exist(): boolean;
    delete(): boolean;
    deleteRecursive(): void;
    create(): boolean;
    get getExternalStorageDir(): string;
    get getPackageDataDir(): string;
    getPublicDir(type: string): string;
    get getDataDir(): string;
    download(url: string): void;
}
/**
 * Class to read files on a native Android device
 * @implements {FileSystemNative}
 */
declare class File extends Native {
    private path;
    constructor(path?: string | undefined);
    read(): string;
    /**
     * @description
     * ```js
     * new File("").list().split(",");
     * ```
     */
    list(): string;
    exist(): boolean;
    delete(): boolean;
    deleteRecursive(): void;
    create(): boolean;
    get getExternalStorageDir(): string;
    get getPackageDataDir(): string;
    getPublicDir(type: string): string;
    get getDataDir(): string;
    download(url: string): void;
    static read(path: string): string;
    /**
     *
     * @param path
     * @description
     * ```js
     * File.list("").split(",");
     * ```
     */
    static list(path: string): string;
    static exist(path: string): boolean;
    static delete(path: string): boolean;
    static deleteRecursive(path: string): void;
    static create(path: string): boolean;
    static get getExternalStorageDir(): string;
    static get getPackageDataDir(): string;
    static getPublicDir(type: string): string;
    static get getDataDir(): string;
    static download(output: string, url: string): void;
}
export default File;
