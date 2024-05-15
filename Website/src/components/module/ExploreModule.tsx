import React from "react";

import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import Stack from "@mui/material/Stack";
import Chip from "@mui/material/Chip";
import Divider from "@mui/material/Divider";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import ModuleViewActivity from "@Activitys/ModuleViewActivity/index";
import { useFormatDate } from "@Hooks/useFormatDate";
import { useActivity } from "@Hooks/useActivity";
import { useStrings } from "@Hooks/useStrings";
import { GestureDetector } from "@Components/onsenui/GestureDetector";
import { useTheme } from "@Hooks/useTheme";
import { VerifiedIcon } from "@Components/icons/VerifiedIcon";
import { Image } from "@Components/dapi/Image";
import Box from "@mui/material/Box";
import { AntifeatureButton } from "@Components/AntifeaturesButton";
import { blacklistedModules } from "@Util/blacklisted-modules";

interface Props {
  module: Module;
}

const ExploreModule = React.memo<Props>((props) => {
  const { id, name, author, description, track, timestamp, version, versions, versionCode } = props.module;

  const { context } = useActivity();
  const { strings } = useStrings();
  const { theme } = useTheme();

  const formatLastUpdate = useFormatDate(timestamp ? timestamp : versions[versions.length - 1].timestamp);

  const findHardCodedAntifeature = React.useMemo<Track["antifeatures"]>(() => {
    return [...(track.antifeatures || []), ...(blacklistedModules[id]?.antifeatures || [])];
  }, [id, track.antifeatures]);

  const handleOpenModule = () => {
    context.pushPage({
      component: ModuleViewActivity,
      key: "ModuleViewActivity",
      extra: props.module,
    });
  };

  return (
    <Box>
      <Card
        onTap={handleOpenModule}
        component={GestureDetector}
        sx={{
          ...(track.antifeatures && {
            borderRadius: `${theme.shape.borderRadius}px ${theme.shape.borderRadius}px 0px ${theme.shape.borderRadius}px`,
          }),
          p: 2,
          ":hover": {
            opacity: ".8",
            cursor: "pointer",
          },
          width: "100%",
        }}
      >
        <Stack direction="column" justifyContent="center" spacing={1}>
          {track.cover && (
            <Image
              sx={{
                height: "100%",
                objectFit: "cover",
                width: "100%",
              }}
              src={track.cover}
              alt={name}
              noOpen
            />
          )}

          <Stack direction="column" justifyContent="center" alignItems="flex-start">
            <Stack direction="row" justifyContent="flex-start" alignItems="center" spacing={0.5}>
              <Typography variant="h6">{name}</Typography>
              <VerifiedIcon isVerified={track.verified} />
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
            <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={1}>
              <Chip
                sx={{
                  bgColor: "secondary.dark",
                }}
                label={formatLastUpdate}
              />

              <Stack direction="row" justifyContent="flex-end" alignItems="center" spacing={1}></Stack>
            </Stack>
          </Stack>
        </Stack>
      </Card>
      {findHardCodedAntifeature && findHardCodedAntifeature.length !== 0 && (
        <Stack direction="row" justifyContent="flex-end" alignItems="center" spacing={2}>
          <AntifeatureButton
            antifeatures={findHardCodedAntifeature}
            sx={{ borderRadius: `0px 0px ${theme.shape.borderRadius}px ${theme.shape.borderRadius}px` }}
          />
        </Stack>
      )}
    </Box>
  );
});

export default ExploreModule;
