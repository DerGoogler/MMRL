import React from "react";
declare namespace UI {
    type StatusbarProps = {
        children: React.ReactNode;
        color: string;
        onUmmount?: string;
        white: boolean;
    };
    type NavigationbarProps = {
        children: React.ReactNode;
        onUmmount?: string;
        color: string;
    };
}
export declare const UI: {
    Statusbar: (props: UI.StatusbarProps) => import("react/jsx-runtime").JSX.Element;
    Navigationbar: (props: UI.NavigationbarProps) => import("react/jsx-runtime").JSX.Element;
};
export {};
