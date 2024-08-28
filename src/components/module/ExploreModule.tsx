import React from "react";

import { ModuleViewActivity } from "@Activitys/ModuleViewActivity";
import { AntifeatureButton } from "@Components/AntifeaturesButton";
import { Image } from "@Components/dapi/Image";
import { useActivity } from "@Hooks/useActivity";
import { useFormatDate } from "@Hooks/useFormatDate";
import { useStrings } from "@Hooks/useStrings";
import Card from "@mui/material/Card";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { SuFile } from "@Native/SuFile";
import { useModFS } from "@Hooks/useModFS";
import { useModuleInfo } from "@Hooks/useModuleInfo";
import { Verified, Tag, PersonOutline, CalendarMonth, Source } from "@mui/icons-material";
import { useBlacklist } from "@Hooks/useBlacklist";
import Box from "@mui/material/Box";

interface Props {
  module: Module;
}

const ExploreModule = React.memo<Props>((props) => {
  const { id, name, author, description, track, timestamp, version, versions, versionCode, features, __mmrl_repo_source } = props.module;
  const { cover, verified } = useModuleInfo(props.module);

  const { context } = useActivity();
  const { strings } = useStrings();
  const { modFS } = useModFS();

  const formatLastUpdate = useFormatDate(timestamp ? timestamp : versions[versions.length - 1].timestamp);

  const blacklistedModules = useBlacklist();
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
          <Typography sx={{ zIndex: 1, textShadow: "0px 0px 4px rgba(0, 0, 0, 1)" }} variant="h6">
            {name}
          </Typography>
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

        <Stack direction="row" justifyContent="space-between" alignItems="end" spacing={0.5}>
          <Stack
            direction="column"
            spacing={0.5}
            sx={{
              justifyContent: "center",
              alignItems: "flex-start",
            }}
          >
            <Typography sx={{ display: "flex", alignItems: "center", gap: 0.5 }} variant="body2">
              <CalendarMonth sx={{ fontSize: "unset" }} />
              {strings("last_updated", { date: formatLastUpdate })}
            </Typography>
            <Typography color="text.secondary" sx={{ display: "flex", alignItems: "center", gap: 0.5 }} variant="body2">
              <Source sx={{ fontSize: "unset" }} />
              {__mmrl_repo_source && __mmrl_repo_source.join(", ")}
            </Typography>
          </Stack>
          <Typography sx={{ display: "flex", alignItems: "center", gap: 0.5 }} variant="body2">
            <Tag sx={{ fontSize: "unset" }} /> {versionCode}
          </Typography>
        </Stack>
      </Stack>
    </Card>
  );
});

export default ExploreModule;
