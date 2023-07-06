export interface INative<T = any> {
    get getInterface(): T;
}
/**
 * Core functions for native functions/interfaces
 */
export declare class Native<I = any> implements INative<I> {
    private readonly userAgentAndroid;
    readonly userAgent: string;
    readonly isAndroid: boolean;
    /**
     * This field is required, otherwise the comunacation between Android will not work
     * @required true
     */
    interface: keyof AndroidWindow<I> | undefined;
    constructor();
    get getInterface(): I;
}
