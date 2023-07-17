import React from "react";
import { colors as kolors, useTheme as useMom, createTheme, ThemeProvider as MumProvider } from "@mui/material";
import useShadeColor from "./useShadeColor";
import { colors, useSettings } from "./useSettings";

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
                main: colors[settings.accent_scheme.value][900],
                // @ts-ignore
                dark: colors[settings.accent_scheme.value][800],
                // contrastText: colors.grey[900],
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
                light: shade(colors[settings.accent_scheme.value][300], -10),
                main: shade(colors[settings.accent_scheme.value][900], -29),
              },
              background: {
                default: shade(colors[settings.accent_scheme.value][800], -75),
              },
              divider: shade(colors[settings.accent_scheme.value][900], -81),
              secondary: {
                main: "#e5e8ec",
                light: shade(colors[settings.accent_scheme.value][800], -66),
                dark: shade(colors[settings.accent_scheme.value][800], -70),
              },
            },
      }),
    [settings.darkmode, settings.accent_scheme]
  );

  return <MumProvider theme={theme} children={props.children} />;
};
