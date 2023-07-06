import "onsenui/esm/elements/ons-toolbar";
import onsCustomElement from "@Util/onsCustomElement";
import Icon from "@Components/Icon";
import React from "react";
import { OverridableComponent } from "@mui/material/OverridableComponent";
import { SvgIconTypeMap } from "@mui/material/SvgIcon";

interface HTMLToolbar {
  modifier?: string;
  visible?: boolean;
  static?: boolean;
  inline?: boolean;
  children?: React.ReactNode;
}

interface HTMLToolbarButton {
  children?: React.ReactNode;
  modifier?: string;
  disabled?: boolean;
  onClick?: React.MouseEventHandler<HTMLToolbarButton>;
  id?: string;
  icon?: OverridableComponent<SvgIconTypeMap<{}, "svg">>;
}

const HTMLToolbar = onsCustomElement<HTMLElement, HTMLToolbar>("ons-toolbar", { notAttributes: ["visible"] });
const HTMLToolbarButton = onsCustomElement<HTMLElement, HTMLToolbarButton>("ons-toolbar-button");

const _ToolbarButton = React.forwardRef((props: HTMLToolbarButton, ref: React.Ref<HTMLElement>) => {
  return (
    <HTMLToolbarButton ref={ref} id={props.id} style={{ fontFamily: "unset" }} onClick={props.onClick}>
      {props.icon ? <Icon icon={props.icon} keepLight /> : <>{props.children}</>}
    </HTMLToolbarButton>
  );
});

const _ToolbarLeft = (props: React.PropsWithChildren) => {
  return <div className="left" children={props.children} />;
};

const _ToolbarCenter = (props: React.PropsWithChildren) => {
  return <div className="center" children={props.children} />;
};

const _ToolbarRight = (props: React.PropsWithChildren) => {
  return <div className="right" children={props.children} />;
};

const Toolbar = Object.assign(HTMLToolbar, {
  Button: _ToolbarButton,
  Left: _ToolbarLeft,
  Center: _ToolbarCenter,
  Right: _ToolbarRight,
});

export { Toolbar };
