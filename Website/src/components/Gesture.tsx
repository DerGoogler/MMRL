import { createRef, RefObject, ReactNode } from "react";
import { dom } from "googlers-tools";
import ViewX from "./ViewX";

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

class Gesture extends ViewX<Props, {}> {
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

  public createView(): JSX.Element {
    return <div ref={this.gerstureID}>{this.props.children}</div>;
  }
}

export default Gesture;
