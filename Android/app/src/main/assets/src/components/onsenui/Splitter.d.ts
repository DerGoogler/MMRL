import "onsenui/esm/elements/ons-splitter";
import React from "react";
interface HTMLSplitter {
    onDeviceBackButton?: Function;
}
interface HTMLSplitterContent {
}
interface HTMLSplitterSide {
    collapse?: boolean | "portrait" | "landscape";
    swipeable?: boolean;
    isOpen?: boolean;
    onPostOpen?: Function;
    onOpen?: Function;
    onPostClose?: Function;
    onClose?: Function;
    side?: "left" | "right";
    swipeTargetWidth?: number;
    width?: number | string;
    animation?: string;
    animationOptions?: object;
    openThreshold?: number;
    onPreOpen?: Function;
    onPreClose?: Function;
    onModeChange?: Function;
    children?: React.ReactNode;
}
declare const HTMLSplitter: React.ForwardRefExoticComponent<Omit<React.ClassAttributes<HTMLSplitter> & React.HTMLAttributes<HTMLSplitter> & HTMLSplitter, "ref"> & React.RefAttributes<HTMLElement>>;
declare const HTMLSplitterContent: React.ForwardRefExoticComponent<Omit<React.ClassAttributes<HTMLSplitterContent> & React.HTMLAttributes<HTMLSplitterContent> & HTMLSplitterContent, "ref"> & React.RefAttributes<HTMLElement>>;
declare const HTMLSplitterSide: React.ForwardRefExoticComponent<Omit<React.ClassAttributes<HTMLSplitterSide> & React.HTMLAttributes<HTMLSplitterSide> & HTMLSplitterSide, "ref"> & React.RefAttributes<HTMLElement>>;
declare const Splitter: React.ForwardRefExoticComponent<Omit<React.ClassAttributes<HTMLSplitter> & React.HTMLAttributes<HTMLSplitter> & HTMLSplitter, "ref"> & React.RefAttributes<HTMLElement>> & {
    Content: React.ForwardRefExoticComponent<Omit<React.ClassAttributes<HTMLSplitterContent> & React.HTMLAttributes<HTMLSplitterContent> & HTMLSplitterContent, "ref"> & React.RefAttributes<HTMLElement>>;
    Side: React.ForwardRefExoticComponent<HTMLSplitterSide & React.RefAttributes<HTMLElement>>;
};
export { Splitter };
