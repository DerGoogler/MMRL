import React from "react";
import { useTheme as useMom, createTheme, ThemeProvider as MumProvider } from "@mui/material";
import useShadeColor from "./useShadeColor";
import { colors, useSettings } from "./useSettings";
import { os } from "@Native/Os";
import { useNativeStorage } from "./useNativeStorage";

export const useTheme = () => {
  const theme = useMom();
  const { settings } = useSettings();

  return {
    scheme: colors[settings.accent_scheme.value],
    theme: theme,
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

  const theme = React.useMemo(() => {
    const THIS_IS_THE_THEME_OBJECT_OF_THIS_F_APP = createTheme({
      shape: {
        borderRadius: 8,
      },
      palette: !settings.darkmode
        ? {
            mode: "light",
            primary: {
              light: colors[settings.accent_scheme.value][300],
              main: colors[settings.accent_scheme.value][500],
              dark: colors[settings.accent_scheme.value][700],

              // light: colors[settings.accent_scheme.value][300],
              // main: colors[settings.accent_scheme.value][900],
              // dark: colors[settings.accent_scheme.value][800],
            },
            background: {
              default: colors[settings.accent_scheme.value][200],
              paper: shade(colors[settings.accent_scheme.value][200], 14.5 * 2),
            },
            divider: colors[settings.accent_scheme.value][300],
            secondary: {
              main: colors[settings.accent_scheme.value][600],
            },
          }
        : {
            mode: "dark",
            primary: {
              main: shade(colors[settings.accent_scheme.value][200], settings.shade_value),
              light: shade(colors[settings.accent_scheme.value][100], settings.shade_value),
              dark: shade(colors[settings.accent_scheme.value][400], settings.shade_value),
              // light: shade(colors[settings.accent_scheme.value][300], -10),
              // main: shade(colors[settings.accent_scheme.value][500], -29),
            },
            background: {
              paper: shade(colors[settings.accent_scheme.value][600], settings.shade_value),
              default: shade(colors[settings.accent_scheme.value][700], settings.shade_value),
            },
            text: {
              primary: "#f9f9f9",
              secondary: "#b7b7b7"
            },
            divider: shade(colors[settings.accent_scheme.value][900], settings.shade_value),
            secondary: {
              main: colors[settings.accent_scheme.value][600],
            },
          },
    });

    os.setStatusBarColor(THIS_IS_THE_THEME_OBJECT_OF_THIS_F_APP.palette.primary.main, false);
    os.setNavigationBarColor(THIS_IS_THE_THEME_OBJECT_OF_THIS_F_APP.palette.background.default);
    setBackgroundColor(THIS_IS_THE_THEME_OBJECT_OF_THIS_F_APP.palette.background.default);
    setStatusBarColor(THIS_IS_THE_THEME_OBJECT_OF_THIS_F_APP.palette.primary.main);
    return THIS_IS_THE_THEME_OBJECT_OF_THIS_F_APP;
  }, [settings.darkmode, settings.accent_scheme]);

  return <MumProvider theme={theme} children={props.children} />;
};
