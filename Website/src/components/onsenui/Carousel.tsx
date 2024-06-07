import onsCustomElement from "@Util/onsCustomElement";
import { SxProps } from "@mui/material";
import React from "react";

const deprecated = {
  index: "activeIndex",
};

const Element = onsCustomElement<HTMLElement, HTMLCarousel>("ons-carousel", { deprecated })({});

const Carousel = React.forwardRef<HTMLElement, HTMLCarousel>((props, ref) => {
  const { itemWidth, itemHeight, ...rest } = props;

  // string values for itemWidth and itemHeight are deprecated but handle them
  // safely anyway to avoid breaking user code
  const stringify = (x) => (typeof x === "number" ? `${x}px` : x);
  const realItemWidth = stringify(itemWidth);
  const realItemHeight = stringify(itemHeight);

  return (
    <Element itemWidth={realItemWidth} itemHeight={realItemHeight} ref={ref} {...rest}>
      {props.children}
    </Element>
  );
});

interface HTMLCarousel extends React.PropsWithChildren {
  sx?: SxProps;
  direction?: "horizontal" | "vertical";
  fullscreen?: boolean;
  overscrollable?: boolean;
  centered?: boolean;
  itemWidth?: string;
  itemHeight?: string;
  autoScroll?: boolean;
  autoScrollRatio?: number;
  swipeable?: boolean;
  disabled?: boolean;
  activeIndex?: number;
  index?: number;
  autoRefresh?: boolean;
  onPreChange?: Function;
  onPostChange?: Function;
  onRefresh?: Function;
  onOverscroll?: Function;
  animation?: string;
  animationOptions?: object;
  onSwipe?: Function;
}

export { Carousel };
