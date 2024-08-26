import React from "react";

import { ModuleViewActivity } from "@Activitys/ModuleViewActivity";
import { AntifeatureButton } from "@Components/AntifeaturesButton";
import { Image } from "@Components/dapi/Image";
import { VerifiedIcon } from "@Components/icons/VerifiedIcon";
import { GestureDetector } from "@Components/onsenui/GestureDetector";
import { useActivity } from "@Hooks/useActivity";
import { useFormatDate } from "@Hooks/useFormatDate";
import { useStrings } from "@Hooks/useStrings";
import { useTheme } from "@Hooks/useTheme";
import { blacklistedModules } from "@Util/blacklisted-modules";
import Card from "@mui/material/Card";
import Chip from "@mui/material/Chip";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { SuFile } from "@Native/SuFile";
import { useModFS } from "@Hooks/useModFS";
import { useModuleInfo } from "@Hooks/useModuleInfo";
import { Verified, Tag, PersonOutline, CalendarMonth } from "@mui/icons-material";

interface Props {
  module: Module;
}

const ExploreModule = React.memo<Props>((props) => {
  const { id, name, author, description, track, timestamp, version, versions, versionCode, features } = props.module;
  const { cover, verified } = useModuleInfo(props.module);

  const { context } = useActivity();
  const { strings } = useStrings();
  const { theme } = useTheme();
  const { modFS } = useModFS();

  const formatLastUpdate = useFormatDate(timestamp ? timestamp : versions[versions.length - 1].timestamp);

  const findHardCodedAntifeature = React.useMemo<Track["antifeatures"]>(() => {
    return [...(track.antifeatures || []), ...(blacklistedModules.find((mod) => mod.id === id)?.antifeatures || [])];
  }, [id, track.antifeatures]);

  const handleOpenModule = () => {
    context.pushPage({
      component: ModuleViewActivity,
      key: "ModuleViewActivity",
      extra: props.module,
    });
  };
  return (
    <Card
      onClick={handleOpenModule}
      sx={{
        ":hover": {
          opacity: ".8",
          cursor: "pointer",
        },
        width: "100%",
      }}
    >
      {cover && (
        <Image
          sx={{
            height: "100%",
            objectFit: "cover",
            width: "100%",
            borderRadius: "8px 8px 0px 0px",
          }}
          noOutline
          src={cover}
          alt={name}
          noOpen
        />
      )}

      <Stack sx={{ p: 2 }} direction="column" justifyContent="center" spacing={2}>
        <Stack direction="column" justifyContent="center" alignItems="flex-start" spacing={0}>
          <Typography variant="h6">{name}</Typography>
          <Typography color="text.secondary" sx={{ display: "flex", alignItems: "center", gap: 0.5 }} variant="body2">
            <PersonOutline sx={{ fontSize: "unset" }} /> {author}
          </Typography>
        </Stack>

        <Stack direction="row" justifyContent="flex-start" alignItems="center" spacing={0.5}>
          <Chip size="small" sx={{ backgroundColor: "white", color: "black" }} label={version} />

          {SuFile.exist(modFS("PROPS", { MODID: id })) && (
            <Chip size="small" sx={{ backgroundColor: "white", color: "black" }} label={strings("installed")} />
          )}

          {verified && (
            <Chip
              size="small"
              sx={{ backgroundColor: "white", color: "black" }}
              icon={<Verified sx={{ fill: "black", fontSize: "large" }} />}
              label={strings("verified")}
            />
          )}

          {/* <Chip sx={{ backgroundColor: "white", color: "black" }} label={Object.keys(features).length + " features"} /> */}

          {findHardCodedAntifeature && findHardCodedAntifeature.length !== 0 && (
            <AntifeatureButton useChip antifeatures={findHardCodedAntifeature} />
          )}
        </Stack>

        <Typography color="text.secondary" variant="body2" display="block">
          {description}
        </Typography>

        <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={0.5}>
          <Typography sx={{ display: "flex", alignItems: "center", gap: 0.5 }} variant="body2">
            <CalendarMonth sx={{ fontSize: "unset" }} />
            {strings("last_updated", { date: formatLastUpdate })}
          </Typography>
          <Typography sx={{ display: "flex", alignItems: "center", gap: 0.5 }} variant="body2">
            <Tag sx={{ fontSize: "unset" }} /> {versionCode}
          </Typography>
        </Stack>
      </Stack>
    </Card>
  );
});

const ExploreModule_ = React.memo<Props>((props) => {
  const { id, name, author, description, track, timestamp, version, versions, versionCode } = props.module;
  const { cover, verified } = useModuleInfo(props.module);

  const { context } = useActivity();
  const { strings } = useStrings();
  const { theme } = useTheme();
  const { modFS } = useModFS();

  const formatLastUpdate = useFormatDate(timestamp ? timestamp : versions[versions.length - 1].timestamp);

  const findHardCodedAntifeature = React.useMemo<Track["antifeatures"]>(() => {
    return [...(track.antifeatures || []), ...(blacklistedModules.find((mod) => mod.id === id)?.antifeatures || [])];
  }, [id, track.antifeatures]);

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
      onClick={(e) => e.stopPropagation()}
      sx={{
        p: 2,
        ":hover": {
          opacity: ".8",
          cursor: "pointer",
        },
        width: "100%",
      }}
    >
      <Stack direction="column" justifyContent="center" spacing={1}>
        {cover && (
          <Image
            sx={{
              height: "100%",
              objectFit: "cover",
              width: "100%",
            }}
            src={cover}
            alt={name}
            noOpen
          />
        )}

        <Stack direction="column" justifyContent="center" alignItems="flex-start">
          <Stack direction="row" justifyContent="flex-start" alignItems="center" spacing={0.5}>
            <Typography variant="h6">{name}</Typography>
            <VerifiedIcon isVerified={verified} />
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
            <Stack direction="row" justifyContent="flex-start" alignItems="center" spacing={1}>
              <Chip
                sx={{
                  color: theme.palette.text.secondary,
                  backgroundColor: theme.palette.secondary.dark,
                }}
                label={formatLastUpdate + " 3 features"}
              />

              {SuFile.exist(modFS("PROPS", { MODID: id })) && (
                <Chip
                  sx={{
                    background: `linear-gradient(333deg, ${theme.palette.secondary.dark} 0%, ${theme.palette.secondary.dark} 83%) padding-box,linear-gradient(22deg, rgba(188,2,194,0.4) 0%, rgba(74,20,140,0.4) 100%) border-box`,
                    color: theme.palette.text.secondary,
                    border: "1px solid transparent",
                  }}
                  label={strings("installed")}
                />
              )}
            </Stack>

            <Stack direction="row" justifyContent="flex-end" alignItems="center" spacing={1}></Stack>
          </Stack>
        </Stack>
      </Stack>
    </Card>
  );
});

export default ExploreModule;
