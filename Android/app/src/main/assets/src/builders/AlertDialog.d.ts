/// <reference types="react" />
declare type BuilderConstructorOmit<T extends string = string> = Omit<Builder, T | "dialog">;
interface Builder {
    setTitle(value: string): BuilderConstructorOmit<"setTitle">;
    setMessage(value: string | JSX.Element): BuilderConstructorOmit<"setMessage">;
    setPositiveButton(title: string, callback?: Function): BuilderConstructorOmit<"setPositiveButton">;
    setNegativeButtom(title: string, callback?: Function): BuilderConstructorOmit<"setNegativeButtom">;
    setCancelable(cancel: boolean): BuilderConstructorOmit<"setCancelable">;
    show(): void;
}
declare type AlertDialog = typeof AlertDialog[keyof typeof AlertDialog];
declare const AlertDialog: {
    readonly Builder: Builder;
};
export default AlertDialog;
