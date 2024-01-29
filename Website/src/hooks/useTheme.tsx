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

export const ThemeProvider = (props: React.PropsWithChildren) => {
  const { settings } = useSettings();
  const shade = useShadeColor();

  const [, setBackgroundColor] = useNativeStorage("background_color", colors[settings.accent_scheme.value][200]);
  const [, setStatusBarColor] = useNativeStorage("statusbar_color", colors[settings.accent_scheme.value][500]);

  const theme = React.useMemo<MMRLTheme>(() => {
    const THIS_IS_THE_THEME_OBJECT_OF_THIS_F_APP = createTheme({
      components: {
        MuiCard: {
          defaultProps: {
            elevation: 0,
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
    } as MMRLTheme);

    setBackgroundColor(THIS_IS_THE_THEME_OBJECT_OF_THIS_F_APP.palette.background.default);
    setStatusBarColor(THIS_IS_THE_THEME_OBJECT_OF_THIS_F_APP.palette.primary.main);
    return THIS_IS_THE_THEME_OBJECT_OF_THIS_F_APP;
  }, [settings.darkmode, settings.accent_scheme]);

  return <MumProvider theme={theme} children={props.children} />;
};
