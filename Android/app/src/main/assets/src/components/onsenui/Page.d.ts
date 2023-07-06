import React from "react";
import "onsenui/esm/elements/ons-page";
declare type RenderFunction = (ref?: React.ForwardedRef<HTMLElement>) => JSX.Element;
interface HTMLPage {
    contentStyle?: React.CSSProperties;
    modifier?: string;
    renderModal?: RenderFunction;
    renderToolbar?: RenderFunction;
    renderBottomToolbar?: RenderFunction;
    renderFixed?: RenderFunction;
    onInit?: Function;
    onShow?: Function;
    onHide?: Function;
    onInfiniteScroll?: Function;
    onDeviceBackButton?: Function;
    children?: React.ReactNode;
}
declare const HTMLPage: React.ForwardRefExoticComponent<Omit<React.ClassAttributes<HTMLPage> & React.HTMLAttributes<HTMLPage> & HTMLPage, "ref"> & React.RefAttributes<HTMLElement>>;
declare const Page: React.ForwardRefExoticComponent<HTMLPage & React.RefAttributes<HTMLElement>>;
export { Page };
