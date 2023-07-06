import { MarkdownToJSX } from "markdown-to-jsx";
import React from "react";
declare type Props = {
    children: string;
    style?: React.CSSProperties;
    styleMd?: React.CSSProperties;
};
export declare const MarkdownOverrides: MarkdownToJSX.Overrides | undefined;
export declare const Markup: (props: Props) => import("react/jsx-runtime").JSX.Element;
export {};
