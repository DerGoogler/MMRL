import React from "react";

import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import Stack from "@mui/material/Stack";
import Chip from "@mui/material/Chip";
import Divider from "@mui/material/Divider";
import CardMedia from "@mui/material/CardMedia";

import { Verified } from "@mui/icons-material";

import ModuleViewActivity from "@Activitys/ModuleViewActivity";

import { useFormatDate } from "@Hooks/useFormatDate";
import { useActivity } from "@Hooks/useActivity";
import Tooltip from "@mui/material/Tooltip";
import { useStrings } from "@Hooks/useStrings";
import { GestureDetector } from "@Components/onsenui/GestureDetector";
import { useTheme } from "@Hooks/useTheme";

interface Props {
  module: Module;
}

const ExploreModule = React.memo<Props>((props) => {
  const { id, name, author, description, track, timestamp, version, versions, versionCode } = props.module;

  const { context } = useActivity();
  const { strings } = useStrings();
  const { theme } = useTheme();

  const formatLastUpdate = useFormatDate(timestamp ? timestamp : versions[versions.length - 1].timestamp);

  const handleOpenModule = () => {
    context.pushPage({
      component: ModuleViewActivity,
      key: "ModuleViewActivity",
      extra: props.module,
    });
  };

  return (
    <Card
      onTap={handleOpenModule}
      component={GestureDetector}
      sx={{
        p: 2,
        ":hover": {
          cursor: "pointer",
        },
        width: "100%",
      }}
    >
      <Stack direction="column" justifyContent="center" spacing={1}>
        {track.cover && (
          <CardMedia
            component="img"
            sx={(theme) => ({
              height: "100%",
              objectFit: "cover",
              borderRadius: theme.shape.borderRadius / theme.shape.borderRadius,
              boxShadow: "0 0px 1px 0 rgba(60,64,67,.3), 0 1px 10px 1px rgba(60,64,67,.15)",
              width: "100%",
            })}
            image={track.cover}
            alt={name}
          />
        )}

        <Stack direction="column" justifyContent="center" alignItems="flex-start">
          <Stack direction="row" justifyContent="flex-start" alignItems="center" spacing={0.5}>
            <Typography variant="h6">{name}</Typography>
            {track.verified && (
              <Tooltip title={strings("verified_module")} placement="right" arrow>
                <Verified sx={{ fontSize: "unset", color: theme.palette.text.link }} />
              </Tooltip>
            )}
          </Stack>

          <Typography color="text.secondary" variant="caption">
            {version} ({versionCode}) / {author}
          </Typography>
        </Stack>
        <Typography color="text.secondary" variant="body2" display="block">
          {description}
        </Typography>
        <Stack direction="column" justifyContent="center" spacing={1.2}>
          <Divider variant="middle" />
          <Stack direction="row" justifyContent="flex-start" alignItems="center" spacing={1}>
            <Chip
              sx={{
                bgColor: "secondary.dark",
              }}
              label={formatLastUpdate}
            />
          </Stack>
        </Stack>
      </Stack>
    </Card>
  );
});

export default ExploreModule;
