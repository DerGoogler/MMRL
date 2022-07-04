import { Component, createRef, RefObject, ReactNode } from "react";
import tools from "@Utils/tools";
import { Dom as dom } from "googlers-tools";

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
  children: ReactNode;
}

class Gesture extends Component<Props, {}> {
  private gerstureID: RefObject<HTMLDivElement>;
  constructor(props: any) {
    super(props);
    this.gerstureID = createRef();
  }
  public componentDidMount() {
    const { callback, event } = this.props;

    dom.findBy(this.gerstureID, (ref: HTMLDivElement) => {
      ref.addEventListener(event, callback);
    });
  }

  public render() {
    const { children } = this.props;
    return <div ref={this.gerstureID}>{children}</div>;
  }
}

export default Gesture;
