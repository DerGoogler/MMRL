import { useSettings } from "@Hooks/useSettings";
import useShadeColor from "@Hooks/useShadeColor";
import { useTheme } from "@Hooks/useTheme";
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
      backgroundColor: settings.darkmode ? shade(scheme[500], -45) + "47" : "rgb(255, 255, 255)",
      border: `1px solid ${settings.darkmode ? shade(scheme[500], -56) : theme.palette.divider}`,
      transform: "translate(0px, -8px)",
    },
  }));

  return <C {...props} />;
};
