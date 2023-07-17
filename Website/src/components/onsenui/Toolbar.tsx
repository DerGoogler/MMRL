import "onsenui/esm/elements/ons-toolbar";
import onsCustomElement from "@Util/onsCustomElement";
import Icon from "@Components/Icon";
import React from "react";
import { OverridableComponent } from "@mui/material/OverridableComponent";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
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

const ToolbarButton = React.forwardRef((props: HTMLToolbarButton, ref: React.Ref<HTMLElement>) => {
  return (
    <HTMLToolbarButton ref={ref} id={props.id} style={{ fontFamily: "unset" }} onClick={props.onClick}>
      {props.icon ? <Icon icon={props.icon} keepLight /> : <>{props.children}</>}
    </HTMLToolbarButton>
  );
});

const ToolbarLeft = (props: React.PropsWithChildren) => {
  return <div className="left" children={props.children} />;
};

const ToolbarCenter = (props: React.PropsWithChildren) => {
  return <div className="center" children={props.children} />;
};

const ToolbarRight = (props: React.PropsWithChildren) => {
  return <div className="right" children={props.children} />;
};

const ToolbarBackButton = (props: Omit<HTMLToolbarButton, "children">) => {
  return <ToolbarButton icon={ArrowBackIcon} onClick={props.onClick} />;
};

const Toolbar = Object.assign(HTMLToolbar, {
  Button: ToolbarButton,
  Left: ToolbarLeft,
  Center: ToolbarCenter,
  Right: ToolbarRight,
  BackButton: ToolbarBackButton,
});

export { Toolbar };
