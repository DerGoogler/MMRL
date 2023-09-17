import "onsenui/esm/elements/ons-toolbar";
import onsCustomElement from "@Util/onsCustomElement";
import Icon from "@Components/Icon";
import React from "react";
import { OverridableComponent } from "@mui/material/OverridableComponent";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { SvgIconTypeMap } from "@mui/material/SvgIcon";
import { SxProps, Theme } from "@mui/material/styles";
import Box from "@mui/material/Box";

interface HTMLToolbar {
  modifier?: string;
  visible?: boolean;
  static?: boolean;
  inline?: boolean;
  children?: React.ReactNode;
}

interface HTMLToolbarButton {
  children?: React.ReactNode;
  sx?: SxProps;
  modifier?: string;
  disabled?: boolean;
  onClick?: React.MouseEventHandler<HTMLToolbarButton>;
  keepLight?: boolean;
  id?: string;
  icon?: OverridableComponent<SvgIconTypeMap<{}, "svg">>;
}

const HTMLToolbar = onsCustomElement<HTMLElement, HTMLToolbar>("ons-toolbar", { notAttributes: ["visible"] })({});
const HTMLToolbarButton = onsCustomElement<HTMLElement, HTMLToolbarButton>("ons-toolbar-button")({});

const ToolbarButton = React.forwardRef((props: HTMLToolbarButton, ref: React.Ref<HTMLElement>) => {
  return (
    <HTMLToolbarButton sx={props.sx} ref={ref} id={props.id} style={{ fontFamily: "unset" }} onClick={props.onClick}>
      {props.icon ? <Icon icon={props.icon} keepLight={!props.keepLight ? true : props.keepLight} /> : <>{props.children}</>}
    </HTMLToolbarButton>
  );
});

interface ToolbarElementsProps extends React.PropsWithChildren {
  sx?: SxProps<Theme>;
}

const ToolbarLeft = (props: ToolbarElementsProps) => {
  return <Box component="div" sx={props.sx} className="left" children={props.children} />;
};

const ToolbarCenter = (props: ToolbarElementsProps) => {
  return <Box component="div" sx={props.sx} className="center" children={props.children} />;
};

const ToolbarRight = (props: ToolbarElementsProps) => {
  return <Box component="div" sx={props.sx} className="right" children={props.children} />;
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
