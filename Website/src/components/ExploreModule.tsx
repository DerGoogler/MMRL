import { Alert, AlertTitle, Box, Card, CardMedia, Chip, Divider, Stack, Typography } from "@mui/material";
import { useActivity } from "@Hooks/useActivity";
import { useStrings } from "@Hooks/useStrings";
import DescriptonActivity from "@Activitys/DescriptonActivity";
import { VerifiedRounded } from "@mui/icons-material";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import VerifiedIcon from "@mui/icons-material/Verified";
import { os } from "@Native/Os";
import { StyledCard } from "./StyledCard";
import { useLowQualityModule } from "@Hooks/useLowQualityModule";
import { StyledIconButton, StyledIconButtonWithText } from "./StyledIconButton";
import { useSettings } from "@Hooks/useSettings";
import { isMobile } from "react-device-detect";
import { useFormatDate } from "@Hooks/useFormatDate";
import { useModuleOptions } from "@Hooks/useModuleOptions";
import { GestureDetector } from "./onsenui/GestureDetector";
import { ref, onValue, query } from "firebase/database";
import React from "react";
import { useTheme } from "@Hooks/useTheme";
import useShadeColor from "@Hooks/useShadeColor";
import ModuleViewActivity from "@Activitys/ModuleViewActivity";

interface Props {
  index: number;
  moduleProps: Module;
  disableLowQuality?: boolean;
  disableCovers?: boolean;
}
export const ExploreModule = (props: Props) => {
  const { context } = useActivity();
  const { strings } = useStrings();
  const { settings } = useSettings();
  const { theme, scheme } = useTheme();
  const shade = useShadeColor();

  const { id, notes_url, zip_url, last_update, prop_url } = props.moduleProps;

  const { isVerified, isHidden } = useModuleOptions(id);
  const isLowQuality = useLowQualityModule(prop_url, props.disableLowQuality);
  const formatLastUpdate = useFormatDate(last_update);

  if (isHidden) {
    return null;
  }

  const handleOpen = () => {
    // context.pushPage({
    //   component: DescriptonActivity,
    //   key: `view_${prop_url.id}`,
    //   extra: {
    //     title: prop_url.name,
    //     prop_url: prop_url,
    //     zip_url: zip_url,
    //     authorData: authorData,
    //     request: {
    //       url: notes_url,
    //     },
    //   },
    // });

    context.pushPage({
      component: ModuleViewActivity,
      key: "",
      extra: {
        last_update: last_update,
        zip_url: zip_url,
        notes_url: notes_url,
        module: prop_url,
      },
    });
  };

  const CoverHandler = () => {
    if (props.disableCovers) {
      return null;
    }

    if (prop_url.mmrlCover) {
      return (
        <CardMedia
          component="img"
          sx={(theme) => ({
            height: "calc(calc(100vw - 48px)*9/16)",
            objectFit: "cover",
            m: 1,
            borderRadius: theme.shape.borderRadius / 8,
            boxShadow: "0 1px 2px 0 rgba(60,64,67,.3), 0 1px 10px 1px rgba(60,64,67,.15)",
            width: "calc(100% - 16px)",
          })}
          image={prop_url.mmrlCover}
          alt={prop_url.name}
        />
      );
    }

    return null;
  };

  return (
    <Card
      onTap={handleOpen}
      component={GestureDetector}
      sx={{
        ":hover": {
          cursor: "pointer",
          bgcolor: shade(theme.palette.secondary.dark, -42),
        },
        width: "100%",
        boxShadow: "none",
      }}
    >
      <CoverHandler />
      <Box sx={{ p: 2, display: "flex" }}>
        <Stack spacing={0.5} style={{ flexGrow: 1 }}>
          <Typography fontWeight={700} color="text.primary">
            {prop_url.name}
          </Typography>{" "}
          <Typography variant="caption" sx={{ fontSize: ".70rem" }} color="text.secondary">
            <Stack direction="row" justifyContent="flex-start" alignItems="center" spacing={0.5}>
              <span>
                {prop_url.version} ({prop_url.versionCode}) /
              </span>
              <span>{prop_url.author}</span>
            </Stack>
          </Typography>
          <Typography variant="body1" color="text.secondary">
            {prop_url.description}
          </Typography>
        </Stack>
      </Box>
      <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ px: 2, py: 1 }}>
        <Chip
          size="small"
          sx={(theme) => ({
            bgcolor: `${settings.darkmode ? shade(scheme[100], -36) : theme.palette.secondary.light}46`,
          })}
          label={formatLastUpdate}
        />
        {/* <Stack spacing={0.8} direction="row">
Keep for update modules           
          </Stack> */}
      </Stack>
      {settings._low_quality_module && isLowQuality && (
        <Alert style={{ borderRadius: 0 }} severity="warning">
          <AlertTitle>Low Quality</AlertTitle>
          Module meets not the requirements of its props
        </Alert>
      )}
    </Card>
  );
};
