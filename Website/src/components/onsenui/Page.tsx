import React from "react";
import "onsenui/esm/elements/ons-page";
import onsCustomElement from "@Util/onsCustomElement";
import { styled } from "@mui/material";
import { os } from "@Native/Os";
import { useTheme } from "@Hooks/useTheme";

export type RenderFunction = (ref?: React.ForwardedRef<HTMLElement>) => JSX.Element;

interface NativeUIColors {
  mount: string;
  unmount: string;
}

interface HTMLPage {
  contentStyle?: React.CSSProperties;
  backgroundStyle?: React.CSSProperties;
  modifier?: string;
  renderModal?: RenderFunction;
  renderToolbar?: RenderFunction;
  renderBottomToolbar?: RenderFunction;
  renderFixed?: RenderFunction;
  onInit?: Function;
  onShow?: Function;
  onHide?: Function;
  onInfiniteScroll?: Function;
  onDeviceBackButton?: Function;
  children?: React.ReactNode;
  statusbarColor?: string;
  setStatusBarColor?: string;
  setNavigationBarColor?: string;
}

const HTMLPage = onsCustomElement<HTMLElement, HTMLPage>("ons-page", {
  notAttributes: ["onInfiniteScroll", "onDeviceBackButton"],
});

const _Page = React.forwardRef<HTMLElement, HTMLPage>((props, ref) => {
  const { theme } = useTheme();
  const { renderToolbar, renderBottomToolbar, renderModal, renderFixed, contentStyle, children, ...rest } = props;

  const setStatusBarColor = (color: string | undefined) => os.setStatusBarColor(color ? color : theme.palette.primary.main, false);
  const setNavigationBarColor = (color: string | undefined) => os.setNavigationBarColor(color ? color : theme.palette.background.default);

  React.useLayoutEffect(() => {
    setStatusBarColor(props.setStatusBarColor);
  }, [props.setStatusBarColor]);

  React.useLayoutEffect(() => {
    setNavigationBarColor(props.setNavigationBarColor);
  }, [props.setNavigationBarColor]);

  return (
    <HTMLPage {...rest} ref={ref}>
      {renderToolbar && renderToolbar(ref)}
      <div className="page__background" style={props.backgroundStyle}></div>
      <div className="page__content" style={contentStyle}>
        {children}
      </div>
      <div className="page__extra" style={{ zIndex: 10001 }}>
        {renderModal && renderModal(ref)}
      </div>
      {renderFixed && renderFixed(ref)}
      {renderBottomToolbar && renderBottomToolbar(ref)}
    </HTMLPage>
  );
});

import useMediaQuery from "@mui/material/useMediaQuery";

interface ContentProps {
  /**
   * This property affects only small screens
   */
  zeroMargin?: boolean;
}

interface IntrinsicElements extends Omit<React.JSX.IntrinsicElements, "section"> {
  section: React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement> & ContentProps, HTMLElement>;
}

const Content = styled<keyof IntrinsicElements>("section")((props: ContentProps) => ({
  display: "flex",
  flexDirection: "column",
  margin: props.zeroMargin ? 0 : 8,
}));

const RelativeContent = styled(Content)((props: ContentProps) => {
  const matches = useMediaQuery("(max-width: 767px)");

  return {
    boxSizing: "border-box",
    minWidth: "200px",
    maxWidth: "980px",
    margin: "0 auto",
    ...(matches ? { padding: props.zeroMargin ? 0 : 8 } : { padding: 45 }),
  };
});

const Page = Object.assign(_Page, {
  Content: Content,
  /**
   * Used for large screen to prevent content stretching
   */
  RelativeContent: RelativeContent,
});

export { Page };
