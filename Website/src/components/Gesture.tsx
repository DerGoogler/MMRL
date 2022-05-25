import * as React from "react";
import tools from "../utils/tools";

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

class Gesture extends React.Component<Props, {}> {
  private gerstureID: React.RefObject<HTMLDivElement>;
  constructor(props: any) {
    super(props);
    this.gerstureID = React.createRef();
  }
  public componentDidMount() {
    const { callback, event } = this.props;

    tools.ref(this.gerstureID, (ref: HTMLDivElement) => {
      ref.addEventListener(event, callback);
    });
  }

  public render() {
    const { children } = this.props;
    return <div ref={this.gerstureID}>{children}</div>;
  }
}

export default Gesture;
