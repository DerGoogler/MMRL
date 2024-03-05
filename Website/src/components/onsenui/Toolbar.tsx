import "onsenui/esm/elements/ons-toolbar";
import onsCustomElement from "@Util/onsCustomElement";
import Icon from "@Components/Icon";
import React from "react";
import { OverridableComponent } from "@mui/material/OverridableComponent";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Button from "@mui/material/Button";
import { SvgIconTypeMap } from "@mui/material/SvgIcon";
import { SxProps, Theme } from "@mui/material/styles";
import { Box, BoxProps } from "@mui/material";

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
  iconProps?: any;
}

const HTMLToolbar = onsCustomElement<HTMLElement, HTMLToolbar>("ons-toolbar", { notAttributes: ["visible"] })({});
const HTMLToolbarButton = onsCustomElement<HTMLElement, HTMLToolbarButton>("ons-toolbar-button")({});

const ToolbarButton = React.forwardRef((props: HTMLToolbarButton, ref: React.Ref<HTMLElement>) => {
  const { icon, iconProps, keepLight, children, ...rest } = props;
  return (
    <HTMLToolbarButton ref={ref} style={{ fontFamily: "unset" }} {...rest}>
      {icon ? <Icon icon={icon} {...iconProps} keepLight={!keepLight ? true : keepLight} /> : <>{children}</>}
    </HTMLToolbarButton>
  );
});

interface ToolbarElementsProps extends React.PropsWithChildren {
  sx?: SxProps<Theme>;
}

const ToolbarLeft = React.forwardRef<HTMLDivElement, BoxProps<"div", ToolbarElementsProps>>((props, ref) => {
  const { component = "div", ...rest } = props;
  return <Box ref={ref} component={component} className="left" {...rest} />;
});

const ToolbarCenter = React.forwardRef<HTMLDivElement, BoxProps<"div", ToolbarElementsProps>>((props, ref) => {
  const { component = "div", ...rest } = props;
  return <Box ref={ref} component={component} className="center" {...rest} />;
});

const ToolbarRight = React.forwardRef<HTMLDivElement, BoxProps<"div", ToolbarElementsProps>>((props, ref) => {
  const { component = "div", ...rest } = props;
  return <Box ref={ref} component={component} className="right" {...rest} />;
});

const ToolbarBackButton = React.forwardRef<HTMLElement, Omit<HTMLToolbarButton, "children">>((props, ref) => (
  <ToolbarButton ref={ref} icon={ArrowBackIcon} {...props} />
));

const Toolbar = Object.assign(HTMLToolbar, {
  Button: ToolbarButton,
  Left: ToolbarLeft,
  Center: ToolbarCenter,
  Right: ToolbarRight,
  BackButton: ToolbarBackButton,
});

export { Toolbar };
