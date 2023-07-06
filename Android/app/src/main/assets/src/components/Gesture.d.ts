import React from "react";
interface Props {
    event: "drag" | "dragleft" | "dragright" | "dragup" | "dragdown" | "hold" | "release" | "swipe" | "swipeleft" | "swiperight" | "swipeup" | "swipedown" | "tap" | "doubletap" | "touch" | "transform" | "pinch" | "pinchin" | "pinchout" | "rotate";
    callback(...props: any): void;
    children: React.ReactNode;
}
declare const Gesture: (props: Props) => import("react/jsx-runtime").JSX.Element;
export default Gesture;
