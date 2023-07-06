import React from "react";
import "onsenui/esm/elements/ons-page";
import onsCustomElement from "@Util/onsCustomElement";

type RenderFunction = (ref?: React.ForwardedRef<HTMLElement>) => JSX.Element;

interface HTMLPage {
  contentStyle?: React.CSSProperties;
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
}

const HTMLPage = onsCustomElement<HTMLElement, HTMLPage>("ons-page", {
  notAttributes: ["onInfiniteScroll", "onDeviceBackButton"],
});

const _Page = React.forwardRef<HTMLElement, HTMLPage>((props, ref) => {
  const { renderToolbar, renderBottomToolbar, renderModal, renderFixed, contentStyle, children, ...rest } = props;

  return (
    <HTMLPage {...rest} ref={ref}>
      {renderToolbar && renderToolbar(ref)}
      <div className="page__background"> </div>
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

const Page = Object.assign(_Page, {});

export { Page };
