import { useTheme } from "@Hooks/useTheme";
import { alpha, styled } from "@mui/material/styles";
import Switch from "@mui/material/Switch";

export const Android12Switch = styled(Switch)(() => {
  const { scheme, theme } = useTheme();

  return {
    "& .MuiSwitch-switchBase": {
      color: theme.palette.background.default,
    },
    "& .MuiSwitch-switchBase.Mui-checked": {
      color: theme.palette.background.default,
    },
    "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
      opacity: "unset",
      backgroundColor: theme.palette.primary.main,
    },
    "& .MuiSwitch-switchBase + .MuiSwitch-track": {
      backgroundColor: theme.palette.text.secondary,
    },

    padding: 8,
    "& .MuiSwitch-track": {
      borderRadius: 22 / 2,
      "&:before, &:after": {
        content: '""',
        position: "absolute",
        top: "50%",
        transform: "translateY(-50%)",
        width: 16,
        height: 16,
      },
    },
    "& .MuiSwitch-thumb": {
      boxShadow: "none",
      width: 16,
      height: 16,
      margin: 2,
    },
  };
});
