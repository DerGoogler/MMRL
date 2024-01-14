import { Alert, AlertTitle, Box, Card, CardMedia, Chip, Stack, SxProps, Typography } from "@mui/material";
import { useActivity } from "@Hooks/useActivity";
import { useStrings } from "@Hooks/useStrings";
import { useLowQualityModule } from "@Hooks/useLowQualityModule";
import { colors, useSettings } from "@Hooks/useSettings";
import { useFormatDate } from "@Hooks/useFormatDate";
import { GestureDetector } from "./onsenui/GestureDetector";
import { useTheme } from "@Hooks/useTheme";
import ModuleViewActivity from "@Activitys/ModuleViewActivity";
import StarBorderRoundedIcon from "@mui/icons-material/StarBorderRounded";
import VerifiedIcon from "@mui/icons-material/Verified";
import React from "react";
import { isLiteralObject } from "@Util/util";

interface Props {
  moduleProps: Module;
  disableLowQuality?: boolean;
  disableCovers?: boolean;
  sx?: SxProps;
}

export const ExploreModule = React.memo<Props>((props) => {
  const { context } = useActivity();
  const { strings, currentLanguage } = useStrings();
  const { settings } = useSettings();
  const { theme, scheme, shade } = useTheme();

  const { id, name, version, versionCode, description, author, versions, track } = props.moduleProps;

  const isLowQuality = useLowQualityModule(props.moduleProps, !settings._low_quality_module);
  const formatLastUpdate = useFormatDate(versions[versions.length - 1].timestamp);

  // if (!settings._invald_module && !valid) {
  //   return null;
  // }

  const handleOpen = () => {
    context.pushPage({
      component: ModuleViewActivity,
      key: "ModuleViewActivity",
      extra: props.moduleProps,
    });
  };

  const CoverHandler = () => {
    if (props.disableCovers) {
      return null;
    }

    if (track.cover) {
      return (
        <CardMedia
          component="img"
          sx={(theme) => ({
            height: "100%",
            objectFit: "cover",
            m: 1,
            borderRadius: theme.shape.borderRadius / 8,
            boxShadow: "0 1px 2px 0 rgba(60,64,67,.3), 0 1px 10px 1px rgba(60,64,67,.15)",
            width: "calc(100% - 16px)",
          })}
          image={track.cover}
          alt={name}
        />
      );
    }

    return null;
  };

  return (
    <Card
      elevation={0}
      onTap={handleOpen}
      component={GestureDetector}
      sx={{
        ...props.sx,
        ":hover": {
          cursor: "pointer",
          bgcolor: !settings.darkmode ? shade(colors[settings.accent_scheme.value][100], 7.6) : "unset",
        },
        width: "100%",
      }}
    >
      <CoverHandler />
      <Box sx={{ p: 2, display: "flex" }}>
        <Stack spacing={0.5} style={{ flexGrow: 1 }}>
          <Typography fontWeight={700} color="text.primary">
            {name}
          </Typography>
          <Typography variant="caption" sx={{ fontSize: ".70rem" }} color="text.secondary">
            <Stack direction="row" justifyContent="flex-start" alignItems="center" spacing={0.5}>
              <span>
                {version} ({versionCode}) /
              </span>
              {/* {track.author ? (
                <Box
                  component="span"
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyItems: "center",
                    ":hover": {
                      cursor: "pointer",
                    },
                  }}
                >
                  {track.author.name} {track.author.verified && <VerifiedIcon sx={{ ml: 0.5, fontSize: "0.8rem" }} />}
                </Box>
              ) : (
                <span>{author}</span>
              )} */}
              <span>{author}</span>
            </Stack>
          </Typography>
          <Typography variant="body1" color="text.secondary">
            {description}
          </Typography>
        </Stack>
      </Box>
      <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ px: 2, py: 1 }}>
        <Chip
          size="small"
          sx={(theme) => ({
            bgcolor: `${settings.darkmode ? shade(scheme[200], -24.5) : shade(scheme[300], 49)}46`,
          })}
          label={formatLastUpdate}
        />
        <Stack spacing={0.8} direction="row">
          <Stack
            direction="row"
            justifyContent="center"
            alignItems="center"
            spacing={0.5}
            sx={{
              px: 1,
              py: 0.5,
              borderRadius: 1,
              display: "flex",
              typography: "caption",
              bgcolor: theme.palette.secondary.main,
              color: theme.palette.mode === "dark" ? "#000" : "#fff",
            }}
          >
            <StarBorderRoundedIcon
              sx={{
                typography: "caption",
              }}
            />
            <Typography
              sx={{
                typography: "caption",
              }}
            >
              {track.stars}
            </Typography>
          </Stack>
        </Stack>
      </Stack>
      {isLowQuality && (
        <Alert sx={{ borderRadius: 0 }} severity="warning">
          <AlertTitle>{strings("low_quality_module")}</AlertTitle>
          {strings("low_quality_module_warn")}
        </Alert>
      )}
    </Card>
  );
});
