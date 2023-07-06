import * as React from "react";
declare type SearchbarProps = {
    onChange: React.ChangeEventHandler<HTMLTextAreaElement | HTMLInputElement>;
    placeholder: string;
};
export declare const Searchbar: ({ placeholder, onChange }: SearchbarProps) => import("react/jsx-runtime").JSX.Element;
export {};
