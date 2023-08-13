import onsCustomElement from "@Util/onsCustomElement";
import "onsenui/esm/elements/ons-bottom-toolbar";

interface HTMLBottomToolbar {
  modifier?: string;
}

const BottomToolbar = onsCustomElement<HTMLElement, HTMLBottomToolbar>("ons-bottom-toolbar");

export { HTMLBottomToolbar, BottomToolbar };
