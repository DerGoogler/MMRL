/// <reference types="react" />
export declare type ForProps<T, U extends JSX.Element> = {
    each: readonly T[];
    fallback: () => JSX.Element;
    catch: (e: Error | undefined) => JSX.Element;
    children: (item: T, index: number) => U;
};
export declare function For<T, U extends JSX.Element>(props: ForProps<T, U>): import("react/jsx-runtime").JSX.Element;
