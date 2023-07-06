import { Native } from "./Native";
/**
 * Custom logger for MMRL with Native Android logging support. It also support React/JSX element.
 */
declare class Log extends Native {
    private tag;
    constructor(tag: string);
    i(message: any): void;
    w(message: any): void;
    e(message: any): void;
    static i<T>(tag: string, message: any): void;
    static w(tag: string, message: any): void;
    static e(tag: string, message: any): void;
}
export { Log };
