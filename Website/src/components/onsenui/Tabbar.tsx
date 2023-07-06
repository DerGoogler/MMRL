import React, { useEffect, useState } from "react";
import "onsenui/esm/elements/ons-tab";
import "onsenui/esm/elements/ons-tabbar";
import onsCustomElement from "@Util/onsCustomElement";

export interface TabbarRenderTab {
  content: JSX.Element;
  tab: JSX.Element;
}

interface HTMLTabbar {
  activeIndex?: number;
  index?: number;
  renderTabs: (index?: number, ref?: React.ForwardedRef<HTMLElement>) => TabbarRenderTab[];
  position?: string;
  swipeable?: boolean;
  ignoreEdgeWidth?: number;
  animation?: "none" | "slide";
  animationOptions?: object;
  tabBorder?: boolean;
  onPreChange?: Function;
  onPostChange?: Function;
  onReactive?: Function;
  onSwipe?: Function;
  hideTabs?: boolean;
  visible?: boolean;
  modifier?: string;
}

const HTMLTabbar = onsCustomElement<HTMLElement, Partial<HTMLTabbar>>("ons-tabbar", {
  deprecated: {
    index: "activeIndex",
  },
});

const _Tabbar = React.forwardRef<HTMLElement, HTMLTabbar>((props, ref) => {
  const { visible, hideTabs, renderTabs, ...rest } = props;
  const [reallyHideTabs, setReallyHideTabs] = useState<boolean | undefined>();

  const tabs = renderTabs(props.activeIndex, ref);

  useEffect(() => {
    // visible is deprecated in favour of hideTabs, but if visible is defined and
    // hideTabs is not, we use its negation as the value of hideTabs
    if (hideTabs === undefined && visible !== undefined) {
      setReallyHideTabs(!visible);
    } else {
      setReallyHideTabs(hideTabs);
    }
  }, [hideTabs, visible]);

  return (
    <HTMLTabbar hideTabs={reallyHideTabs} {...rest} ref={ref}>
      <div className="tabbar__content">
        <div>{tabs.map((tab) => tab.content)}</div>
        <div></div>
      </div>
      <div className="tabbar">
        {tabs.map((tab) => tab.tab)}
        <div className="tabbar__border"></div>
      </div>
    </HTMLTabbar>
  );
});

interface HTMLTab {
  icon?: string;
  activeIcon?: string;
  label?: string;
  badge?: string;
}

const HTMLTab = onsCustomElement<HTMLElement, HTMLTab>("ons-tab");

const Tabbar = Object.assign(_Tabbar, {
  Tab: HTMLTab,
});

export { Tabbar };
