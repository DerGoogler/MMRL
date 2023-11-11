import "onsenui/esm/elements/ons-fab";
import onsCustomElement from "@Util/onsCustomElement";

export interface FabProps extends React.PropsWithChildren {
  modifier?: string;
  ripple?: boolean;
  position?: string;
  disabled?: boolean;
  onClick?: React.MouseEventHandler<HTMLElement>;
}

export const Fab = onsCustomElement<HTMLElement, FabProps>("ons-fab")({});

export default Fab;
