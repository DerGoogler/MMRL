import { Alert, AlertTitle, Avatar, Box, Card, CardHeader, CardMedia, Chip, Divider, Stack, SxProps, Typography } from "@mui/material";
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
import UpdateIcon from "@mui/icons-material/Update";
import StarIcon from "@mui/icons-material/Star";

interface Props {
  moduleProps: Module;
  disableLowQuality?: boolean;
  disableCovers?: boolean;
  sx?: SxProps;
}

export const ExploreModuleV2 = React.memo<Props>((props) => {
  const { context } = useActivity();
  const { strings, currentLanguage } = useStrings();
  const { settings } = useSettings();
  const { theme, scheme, shade } = useTheme();

  const { id, name, version, versionCode, description, stars, author, last_update, mmrl, valid, hidden } = props.moduleProps;

  const isLowQuality = useLowQualityModule(props.moduleProps, !settings._low_quality_module);
  const formatLastUpdate = useFormatDate(last_update);

  if (hidden) {
    return null;
  }

  if (!settings._invald_module && !valid) {
    return null;
  }

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

    if (mmrl.cover) {
      return (
        <CardMedia
          component="img"
          sx={(theme) => ({
            objectFit: "cover",
            m: 1,
            borderRadius: theme.shape.borderRadius / 8,
            boxShadow: "0 1px 2px 0 rgba(60,64,67,.3), 0 1px 10px 1px rgba(60,64,67,.15)",
            width: "calc(100% - 16px)",
            height: "100%",
          })}
          image={mmrl.cover}
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
        <Avatar
          alt={name}
          sx={(theme) => ({
            bgcolor: theme.palette.primary.light,
            width: 60,
            height: 60,
            boxShadow: "0 -1px 5px rgba(0,0,0,.09), 0 3px 5px rgba(0,0,0,.06), 0 1px 2px rgba(0,0,0,.3), 0 1px 3px rgba(0,0,0,.15)",
            borderRadius: "20%",
            mr: 1.5,
            fontSize: 25,
          })}
          src={mmrl.logo}
        >
          {name.charAt(0).toUpperCase()}
        </Avatar>

        <Stack spacing={0.5} style={{ flexGrow: 1 }}>
          <Typography fontWeight={700} color="text.primary">
            {name}
          </Typography>
          <Typography variant="caption" sx={{ fontSize: ".70rem" }} color="text.secondary">
            <Stack direction="column" justifyContent="flex-start" alignItems="left" spacing={0.5}>
              {mmrl.author ? (
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
                  <Typography variant="subtitle1">{mmrl.author.name}</Typography>{" "}
                  {mmrl.author.verified && <VerifiedIcon sx={{ ml: 0.5, fontSize: "0.8rem" }} />}
                </Box>
              ) : (
                <Typography>{author}</Typography>
              )}
              <Stack direction="row" justifyContent="flex-start" alignItems="center" spacing={1}>
                <Stack direction="row" justifyContent="flex-start" alignItems="center" spacing={0.5}>
                  <Typography>{version}</Typography>
                  <UpdateIcon sx={{ fontSize: "0.8rem" }} />
                </Stack>

                <Stack direction="row" justifyContent="flex-start" alignItems="center" spacing={0.5}>
                  <Typography>{stars}</Typography>
                  <StarIcon sx={{ fontSize: "0.8rem" }} />
                </Stack>
              </Stack>
            </Stack>
          </Typography>
        </Stack>
      </Box>
      {isLowQuality && (
        <Alert sx={{ borderRadius: 0 }} severity="warning">
          <AlertTitle>{strings("low_quality_module")}</AlertTitle>
          {strings("low_quality_module_warn")}
        </Alert>
      )}
    </Card>
  );
});
