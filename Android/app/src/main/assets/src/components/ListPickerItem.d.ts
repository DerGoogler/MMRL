declare type ContentMap = {
    name: string;
    value: string;
};
interface PickerItemProps {
    id: string;
    contentMap: ContentMap[];
    targetSetting: "language" | "accent_scheme";
    title: string;
}
/**
 * Remembers! The first item in the array will be the default.
 * @param props
 * @returns
 */
export declare function ListPickerItem(props: PickerItemProps): import("react/jsx-runtime").JSX.Element;
export interface ConfirmationDialogRawProps {
    id: string;
    keepMounted: boolean;
    title: string;
    value: ContentMap;
    open: boolean;
    contentMap: ContentMap[];
    onClose: (val: ContentMap | null) => void;
}
export declare function ConfirmationDialogRaw(props: ConfirmationDialogRawProps): import("react/jsx-runtime").JSX.Element;
export {};
