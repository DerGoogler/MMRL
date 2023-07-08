import { useSettings, useTheme } from "@Hooks/useSettings";
import useShadeColor from "@Hooks/useShadeColor";
import { styled } from "@mui/material";
import IconButton, { IconButtonProps } from "@mui/material/IconButton";

export const StyledIconButton = (props: IconButtonProps) => {
  const { settings, setSettings } = useSettings();
  const { scheme } = useTheme();
  const shade = useShadeColor();

  const C = styled(IconButton)(({ theme }) => ({
    display: "inline-flex",
    MozBoxAlign: "center",
    alignItems: "center",
    MozBoxPack: "center",
    justifyContent: "center",
    position: "relative",
    boxSizing: "border-box",
    backgroundColor: "transparent",
    outline: "currentcolor none 0px",
    margin: "0px",
    cursor: "pointer",
    userSelect: "none",
    verticalAlign: "middle",
    appearance: "none",
    textDecoration: "none",
    textAlign: "center",
    flex: "0 0 auto",
    fontSize: "1.5rem",
    padding: "8px",
    overflow: "visible",
    transition: "background-color 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
    border: `1px solid ${theme.palette.divider}`,
    // borderTopColor: theme.palette.divider,
    // borderRightColor: theme.palette.divider,
    // borderBottomColor: theme.palette.divider,
    // borderLeftColor: theme.palette.divider,
    color: !settings.darkmode ? "rgb(66, 66, 66)" : shade(scheme[700], -61),
    borderRadius: theme.shape.borderRadius,
    alignSelf: "flex-start",
    ":hover": {
      borderColor: theme.palette.primary.main,
      color: theme.palette.primary.main,
      backgroundColor: "rgba(0, 0, 0, 0.04)",
    },
  }));

  return <C {...props} />;
};
