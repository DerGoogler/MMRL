import { Native } from "./Native";
interface IShell {
    /**
     * Executes an command without result
     */
    exec(command: string): void;
    /**
     * Executes an command with result
     */
    result(command: string): string;
    /**
     * Checks if the app has been granted root privileges
     */
    isAppGrantedRoot(): boolean;
}
/**
 * Run Shell commands native on Android
 */
declare class ShellClass extends Native<IShell> {
    constructor();
    exec(cmds: string | string[]): void;
    result(cmd: string): string;
    isAppGrantedRoot(): boolean;
}
export declare const Shell: ShellClass;
export {};
