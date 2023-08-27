import React from "react";
import { colors as kolors, useTheme as useMom, createTheme, ThemeProvider as MumProvider } from "@mui/material";
import useShadeColor from "./useShadeColor";
import { colors, useSettings } from "./useSettings";
import { os } from "@Native/Os";

export const useTheme = () => {
  const theme = useMom();
  const { settings } = useSettings();

  return {
    scheme: colors[settings.accent_scheme.value],
    theme: theme,
  };
};

export const ThemeProvider = (props: React.PropsWithChildren) => {
  const { settings } = useSettings();
  const shade = useShadeColor();

  const theme = React.useMemo(
    () =>
      createTheme({
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
                default: "#fafafa",
              },
              divider: "#e5e8ec",
              secondary: {
                main: "#e5e8ec",
                light: "#eeeeee",
              },
            }
          : {
              mode: "dark",
              primary: {
                main: shade(colors[settings.accent_scheme.value][200], -29),
                light: shade(colors[settings.accent_scheme.value][100], -29),
                dark: shade(colors[settings.accent_scheme.value][400], -29),
                // light: shade(colors[settings.accent_scheme.value][300], -10),
                // main: shade(colors[settings.accent_scheme.value][500], -29),
              },
              background: {
                paper: shade(colors[settings.accent_scheme.value][600], -65),
                default: shade(colors[settings.accent_scheme.value][700], -75),
              },
              divider: shade(colors[settings.accent_scheme.value][900], -81),
              secondary: {
                main: shade(colors[settings.accent_scheme.value][200], -29),
                light: shade(colors[settings.accent_scheme.value][100], -29),
                dark: shade(colors[settings.accent_scheme.value][400], -29),

                //main: "#e5e8ec",
                //light: shade(colors[settings.accent_scheme.value][800], -66),
                //dark: shade(colors[settings.accent_scheme.value][800], -70),
              },
            },
      }),
    [settings.darkmode, settings.accent_scheme]
  );

  React.useEffect(() => {
    os.setStatusBarColor(theme.palette.primary.main, false);
    os.setNavigationBarColor(theme.palette.background.default);
  }, [theme]);

  return <MumProvider theme={theme} children={props.children} />;
};
