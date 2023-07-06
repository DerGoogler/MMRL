/// <reference types="react" />
declare type Props = {
    renderToolbar: () => JSX.Element;
    hideSplitter: () => void;
    pushPage: (props: PushPropsCore) => void;
};
export declare const DrawerFragment: (props: Props) => import("react/jsx-runtime").JSX.Element;
export {};
