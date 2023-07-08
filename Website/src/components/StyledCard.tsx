import { useSettings, useTheme } from "@Hooks/useSettings";
import useShadeColor from "@Hooks/useShadeColor";
import { Paper, PaperProps, styled } from "@mui/material";

export const StyledCard = (props: PaperProps): JSX.Element => {
  const { settings } = useSettings();
  const { scheme } = useTheme();
  const shade = useShadeColor();

  const C = styled(Paper)(({ theme }) => ({
    margin: "8px 0px 0px",
    "&.MuiPaper-root": {
      borderRadius: theme.shape.borderRadius,
      color: "rgb(26, 32, 39)",
      backgroundImage: "none",
      overflow: "hidden",
      backgroundColor: settings.darkmode ? shade(scheme[900], -65) + "47" : "rgb(255, 255, 255)",
      border: `1px solid ${theme.palette.divider}`,
      transform: "translate(0px, -8px)",
    },
  }));

  return <C {...props} />;
};
