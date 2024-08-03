import { doc } from "googlers-tools";
import React from "react";

interface Props {
  event:
    | "drag"
    | "dragleft"
    | "dragright"
    | "dragup"
    | "dragdown"
    | "hold"
    | "release"
    | "swipe"
    | "swipeleft"
    | "swiperight"
    | "swipeup"
    | "swipedown"
    | "tap"
    | "doubletap"
    | "touch"
    | "transform"
    | "pinch"
    | "pinchin"
    | "pinchout"
    | "rotate";
  callback(...props: any): void;
  children: React.ReactNode;
}

const Gesture = (props: Props) => {
  const { callback, event, children } = props;
  const gerstureID = React.useRef(null);

  React.useEffect(() => {
    doc.findRef(gerstureID, (ref: HTMLDivElement) => {
      ref.addEventListener(event, callback);
    });
  }, []);

  return <div ref={gerstureID}>{children}</div>;
};

export default Gesture;
