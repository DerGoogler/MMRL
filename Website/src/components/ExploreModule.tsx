import { Box, Chip, Divider, Stack, Typography, IconButton, IconButtonProps } from "@mui/material";
import { useActivity } from "@Hooks/useActivity";
import { useStrings } from "@Hooks/useStrings";
import DescriptionIcon from "@mui/icons-material/Description";
import { Paper, PaperProps, styled } from "@mui/material";
import { useSettings, useTheme } from "@Hooks/useSettings";
import useShadeColor from "@Hooks/useShadeColor";
import Properties from "@js.properties/properties";
import React from "react";
import axios from "axios";
import DescriptonActivity from "@Activitys/DescriptonActivity";
import { VerifiedRounded } from "@mui/icons-material";
import { useFetch } from "@Hooks/useFetch";

interface Props {
  index: number;
  notesUrl: string;
  downloadUrl?: string;
  moduleOptions: any;
  stars?: int;
  last_update?: any;
  fullItem: any;
  getId: any;
  propsUrl: any;
}
export const ExploreModule = (props: Props) => {
  const { context } = useActivity();
  const { strings } = useStrings();

  const { notesUrl, downloadUrl, moduleOptions, stars, last_update, getId, fullItem, propsUrl, index } = props;
  const isVerified = moduleOptions[getId]?.verified;
  const _display = moduleOptions[getId]?.display;

  const formatDate = (date: Date) => {
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? "pm" : "am";
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    // @ts-ignore
    minutes = minutes < 10 ? "0" + minutes : minutes;
    var strTime = hours + ":" + minutes + " " + ampm;
    return date.getMonth() + 1 + "/" + date.getDate() + "/" + date.getFullYear() + " " + strTime;
  };

  const handleOpen = () => {
    context.pushPage<any>({
      component: DescriptonActivity,
      props: {
        key: `view_${propsUrl.id}`,
        extra: {
          title: propsUrl.name,
          request: {
            use: true,
            url: notesUrl,
          },
        },
      },
    });
  };

  return (
    <StyledCard elevation={0}>
      <Box sx={{ p: 2, display: "flex" }}>
        <Stack spacing={0.5} style={{ flexGrow: 1 }}>
          <Typography fontWeight={700} color="text.primary">
            {propsUrl.name}
          </Typography>{" "}
          <Typography variant="caption" sx={{ fontSize: ".70rem" }} color="text.secondary">
            {propsUrl.version} ({propsUrl.versionCode}) / {propsUrl.author}
          </Typography>
          <Typography variant="body1" color="text.secondary">
            {propsUrl.description}
          </Typography>
        </Stack>
      </Box>
      <Divider />
      <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ px: 2, py: 1 }}>
        <Chip
          size="small"
          sx={(theme) => ({
            bgcolor: theme.palette.secondary.light,
          })}
          label={formatDate(new Date(last_update))}
        />
        <Stack spacing={0.8} direction="row">
          {isVerified && (
            <StyledIconButton style={{ width: 30, height: 30 }}>
              <VerifiedRounded sx={{ fontSize: 14 }} />
            </StyledIconButton>
          )}

          <StyledIconButton style={{ width: 30, height: 30 }} onClick={handleOpen}>
            <DescriptionIcon sx={{ fontSize: 14 }} />
          </StyledIconButton>
        </Stack>
      </Stack>
    </StyledCard>
  );
};

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
