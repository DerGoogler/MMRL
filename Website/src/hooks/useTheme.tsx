import React from "react";
import { useTheme as useMom, createTheme, ThemeProvider as MumProvider, Theme } from "@mui/material";
import useShadeColor from "./useShadeColor";
import { colors, useSettings } from "./useSettings";
import { os } from "@Native/Os";
import { useNativeStorage } from "./useNativeStorage";

export const useTheme = () => {
  const theme = useMom();
  const { settings } = useSettings();

  return {
    scheme: colors[settings.accent_scheme.value],
    theme: theme as MMRLTheme,
    shade: (color: string, percent: number) => {
      // Ignore shading if monet is enabled.
      if (settings.accent_scheme.value === "monet") {
        return color;
      } else {
        var R = parseInt(color.substring(1, 3), 16);
        var G = parseInt(color.substring(3, 5), 16);
        var B = parseInt(color.substring(5, 7), 16);

        // @ts-ignore
        R = parseInt((R * (100 + percent)) / 100);
        // @ts-ignore
        G = parseInt((G * (100 + percent)) / 100);
        // @ts-ignore
        B = parseInt((B * (100 + percent)) / 100);

        R = R < 255 ? R : 255;
        G = G < 255 ? G : 255;
        B = B < 255 ? B : 255;

        var RR = R.toString(16).length == 1 ? "0" + R.toString(16) : R.toString(16);
        var GG = G.toString(16).length == 1 ? "0" + G.toString(16) : G.toString(16);
        var BB = B.toString(16).length == 1 ? "0" + B.toString(16) : B.toString(16);

        return "#" + RR + GG + BB;
      }
    },
  };
};

const THIS_IS_THE_THEME_OBJECT_OF_THIS_F_APP = createTheme({
  components: {
    MuiListItemText: {
      styleOverrides: {
        root: {
          wordWrap: "break-word",
        },
      },
    },
    MuiListSubheader: {
      styleOverrides: {
        root: ({ theme }) => ({
          backgroundColor: theme.palette.background.default,
        }),
      },
    },
    MuiSwitch: {
      styleOverrides: {
        root: ({ theme }) => ({
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
        }),
      },
    },
    MuiPopover: {
      styleOverrides: {
        root: {
          "& .MuiBackdrop-root": {
            position: "fixed",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            right: "0",
            bottom: "0",
            top: "0",
            left: "0",
            zIndex: "-1",
            backdropFilter: "blur(4px)",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
          },
        },
      },
    },
    MuiDialog: {
      styleOverrides: {
        root: {
          "& .MuiModal-backdrop": {
            position: "fixed",
            display: "flex",
            WebkitBoxAlign: "center",
            alignItems: "center",
            WebkitBoxPack: "center",
            justifyContent: "center",
            inset: "0px",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            WebkitTapHighlightColor: "transparent",
            zIndex: "-1",
            backdropFilter: "blur(4px)",
          },
          "& .MuiDialog-paper": {
            backgroundColor: "#101010",
            border: `1px solid #333638`,
            backgroundImage: "none",
          },
          "& .MuiDialogContent-root": {
            borderTop: "none",
            borderBottom: "none",
          },
          "& .MuiButtonBase-root": {
            color: "#f3f5f7",
          },
        },
      },
    },
    MuiCard: {
      defaultProps: {
        elevation: 0,
      },
    },
    MuiTabs: {
      styleOverrides: {
        root: {
          "& .MuiButtonBase-root": {
            borderBottom: "1px solid #f3f5f726",
          },
          "& .MuiTabs-indicator": {
            height: 1,
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: ({ theme, ownerState }) => ({
          ...(ownerState.variant === "outlined" && {
            color: "white",
            border: `1px solid ${theme.palette.divider}`,
            boxShadow: "none",
          }),
          ...(ownerState.variant === "contained" && {
            color: "black",
            ":disabled": {
              cursor: "not-allowed",
              color: "black",
              opacity: ".3",
              backgroundColor: "#ffffff",
            },
            ":hover":{
              cursor: "pointer",
              backgroundColor: "#999999",
            }
          }),
        }),
      },
      defaultProps: {
        disableElevation: true,
      },
    },
  },
  shape: {
    borderRadius: 8,
  },
  palette: {
    mode: "dark",
    primary: {
      main: "#ffffff",
      dark: "#353535",
    },
    secondary: {
      main: "#ffffff",
      dark: "#0a0a0a",
    },
    background: {
      paper: "#181818",
      default: "#101010",
    },
    text: {
      link: "#0095F6",
      primary: "#f3f5f7",
      secondary: "#777777",
    },
    divider: "#333638",
  },
} as unknown as MMRLTheme);

export const ThemeProvider = (props: React.PropsWithChildren) => {
  const { settings } = useSettings();

  const [, setBackgroundColor] = useNativeStorage("background_color", colors[settings.accent_scheme.value][200]);
  const [, setStatusBarColor] = useNativeStorage("statusbar_color", colors[settings.accent_scheme.value][500]);

  const theme = React.useMemo<MMRLTheme>(() => {
    setBackgroundColor(THIS_IS_THE_THEME_OBJECT_OF_THIS_F_APP.palette.background.default);
    setStatusBarColor(THIS_IS_THE_THEME_OBJECT_OF_THIS_F_APP.palette.primary.main);
    return THIS_IS_THE_THEME_OBJECT_OF_THIS_F_APP;
  }, [settings.darkmode, settings.accent_scheme]);

  return <MumProvider theme={theme} children={props.children} />;
};
