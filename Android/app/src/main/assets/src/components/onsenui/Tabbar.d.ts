import React from "react";
import "onsenui/esm/elements/ons-tab";
import "onsenui/esm/elements/ons-tabbar";
export interface TabbarRenderTab {
    content: JSX.Element;
    tab: JSX.Element;
}
interface HTMLTabbar {
    activeIndex?: number;
    index?: number;
    renderTabs: (index?: number, ref?: React.ForwardedRef<HTMLElement>) => TabbarRenderTab[];
    position?: string;
    swipeable?: boolean;
    ignoreEdgeWidth?: number;
    animation?: "none" | "slide";
    animationOptions?: object;
    tabBorder?: boolean;
    onPreChange?: Function;
    onPostChange?: Function;
    onReactive?: Function;
    onSwipe?: Function;
    hideTabs?: boolean;
    visible?: boolean;
    modifier?: string;
}
declare const HTMLTabbar: React.ForwardRefExoticComponent<Omit<React.ClassAttributes<Partial<HTMLTabbar>> & React.HTMLAttributes<Partial<HTMLTabbar>> & Partial<HTMLTabbar>, "ref"> & React.RefAttributes<HTMLElement>>;
interface HTMLTab {
    icon?: string;
    activeIcon?: string;
    label?: string;
    badge?: string;
}
declare const HTMLTab: React.ForwardRefExoticComponent<Omit<React.ClassAttributes<HTMLTab> & React.HTMLAttributes<HTMLTab> & HTMLTab, "ref"> & React.RefAttributes<HTMLElement>>;
declare const Tabbar: React.ForwardRefExoticComponent<HTMLTabbar & React.RefAttributes<HTMLElement>> & {
    Tab: React.ForwardRefExoticComponent<Omit<React.ClassAttributes<HTMLTab> & React.HTMLAttributes<HTMLTab> & HTMLTab, "ref"> & React.RefAttributes<HTMLElement>>;
};
export { Tabbar };
