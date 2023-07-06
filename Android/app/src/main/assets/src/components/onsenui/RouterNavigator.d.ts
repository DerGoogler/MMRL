import React from "react";
import "onsenui/esm/elements/ons-navigator";
interface HTMLNavigator {
    renderPage: (route: object) => JSX.Element;
    routeConfig: {
        routeStack: any[];
        processStack: any[];
    };
    onPrePush?: Function;
    onPostPush?: Function;
    onPrePop?: Function;
    onPostPop?: Function;
    animation?: string;
    animationOptions?: object;
    swipeable?: boolean | string;
    swipePop?: Function;
    onDeviceBackButton?: Function;
}
declare const HTMLNavigator: React.ForwardRefExoticComponent<Omit<React.ClassAttributes<Partial<HTMLNavigator>> & React.HTMLAttributes<Partial<HTMLNavigator>> & Partial<HTMLNavigator>, "ref"> & React.RefAttributes<HTMLElement>>;
declare const RouterNavigator: React.ForwardRefExoticComponent<HTMLNavigator & React.RefAttributes<HTMLElement>>;
export { RouterNavigator };
