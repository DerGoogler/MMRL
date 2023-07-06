import "onsenui/esm/elements/ons-toolbar";
import React from "react";
import { OverridableComponent } from "@mui/material/OverridableComponent";
import { SvgIconTypeMap } from "@mui/material/SvgIcon";
interface HTMLToolbar {
    modifier?: string;
    visible?: boolean;
    static?: boolean;
    inline?: boolean;
    children?: React.ReactNode;
}
interface HTMLToolbarButton {
    children?: React.ReactNode;
    modifier?: string;
    disabled?: boolean;
    onClick?: React.MouseEventHandler<HTMLToolbarButton>;
    id?: string;
    icon?: OverridableComponent<SvgIconTypeMap<{}, "svg">>;
}
declare const HTMLToolbar: React.ForwardRefExoticComponent<Omit<React.ClassAttributes<HTMLToolbar> & React.HTMLAttributes<HTMLToolbar> & HTMLToolbar, "ref"> & React.RefAttributes<HTMLElement>>;
declare const HTMLToolbarButton: React.ForwardRefExoticComponent<Omit<React.ClassAttributes<HTMLToolbarButton> & React.HTMLAttributes<HTMLToolbarButton> & HTMLToolbarButton, "ref"> & React.RefAttributes<HTMLElement>>;
declare const Toolbar: React.ForwardRefExoticComponent<Omit<React.ClassAttributes<HTMLToolbar> & React.HTMLAttributes<HTMLToolbar> & HTMLToolbar, "ref"> & React.RefAttributes<HTMLElement>> & {
    Button: React.ForwardRefExoticComponent<HTMLToolbarButton & React.RefAttributes<HTMLElement>>;
    Left: (props: React.PropsWithChildren) => import("react/jsx-runtime").JSX.Element;
    Center: (props: React.PropsWithChildren) => import("react/jsx-runtime").JSX.Element;
    Right: (props: React.PropsWithChildren) => import("react/jsx-runtime").JSX.Element;
};
export { Toolbar };
