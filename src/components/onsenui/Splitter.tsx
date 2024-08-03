import onsCustomElement from "@Util/onsCustomElement";
import { SxProps } from "@mui/material";
import "onsenui/esm/elements/ons-splitter";
import React from "react";

interface HTMLSplitter {
  onDeviceBackButton?: Function;
}

interface HTMLSplitterContent {}

interface HTMLSplitterSide {
  sx?: SxProps;
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

const HTMLSplitter = onsCustomElement<HTMLElement, HTMLSplitter>("ons-splitter", {
  notAttributes: ["onDeviceBackButton"],
})({});
const HTMLSplitterContent = onsCustomElement<HTMLElement, HTMLSplitterContent>("ons-splitter-content")({});
const HTMLSplitterSide = onsCustomElement<HTMLElement, HTMLSplitterSide>("ons-splitter-side", {
  deprecated: {
    onOpen: "onPostOpen",
    onClose: "onPostClose",
  },
  notAttributes: ["isOpen"],
})({});

const _SplitterSide = React.forwardRef<HTMLElement, HTMLSplitterSide>((props, ref) => {
  const { width, ...rest } = props;

  // number values for width are deprecated but handle them safely to avoid breaking user code
  const realWidth = typeof width === "number" ? `${width}px` : width;

  return <HTMLSplitterSide width={realWidth} ref={ref} {...rest} children={props.children} />;
});

const Splitter = Object.assign(HTMLSplitter, {
  Content: HTMLSplitterContent,
  Side: _SplitterSide,
});

export { Splitter };
