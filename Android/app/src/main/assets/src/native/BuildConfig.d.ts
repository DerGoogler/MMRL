import { Native } from "./Native";
/**
 * BuildConfigs for Android
 */
declare class BuildConfigClass extends Native {
    constructor();
    get VERSION_NAME(): string;
    get VERSION_CODE(): number;
    get APPLICATION_ID(): string;
    get DEBUG(): boolean;
    get BUILD_TYPE(): string;
}
export declare const BuildConfig: BuildConfigClass;
export {};
