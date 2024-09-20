import { Activities } from "@Activitys/index";
import { AntifeatureButton } from "@Components/AntifeaturesButton";
import { Image } from "@Components/dapi/Image";
import { VerifiedIcon } from "@Components/icons/VerifiedIcon";
import { useActivity } from "@Hooks/useActivity";
import { useBlacklist } from "@Hooks/useBlacklist";
import { useFormatDate } from "@Hooks/useFormatDate";
import { useModFS } from "@Hooks/useModFS";
import { useModuleInfo } from "@Hooks/useModuleInfo";
import { useStrings } from "@Hooks/useStrings";
import { useSupportedRoot } from "@Hooks/useSupportedRoot";
import { useTheme } from "@Hooks/useTheme";
import { CalendarMonth, PersonOutline, Source, Tag } from "@mui/icons-material";
import Card from "@mui/material/Card";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { SuFile } from "@Native/SuFile";
import React from "react";

interface Props {
  module: Module;
}

const ExploreModule = React.memo<Props>((props) => {
  const { id, name, author, description, track, timestamp, version, versions, versionCode, features, __mmrl_repo_source } = props.module;
  const { cover, verified, root } = useModuleInfo(props.module);
  const [isModuleSupported] = useSupportedRoot(root, []);

  const { context } = useActivity();
  const { strings } = useStrings();
  const { theme } = useTheme();
  const { modFS } = useModFS();

  const formatLastUpdate = useFormatDate(timestamp ? timestamp : versions[versions.length - 1].timestamp);

  const blacklistedModules = useBlacklist();
  const findHardCodedAntifeature = React.useMemo<Track["antifeatures"]>(() => {
    return [...(track.antifeatures || []), ...(blacklistedModules.find((mod) => mod.id === id)?.antifeatures || [])];
  }, [id, track.antifeatures]);

  const handleOpenModule = () => {
    context.pushPage({
      component: Activities.ModuleView,
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
        transition: "0.1s",
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
          <Stack direction="row" justifyContent="flex-start" alignItems="center" spacing={0.5}>
            <Typography sx={{ zIndex: 1, textShadow: "0px 0px 4px rgba(0, 0, 0, 1)" }} variant="h6">
              {name}
            </Typography>
            <VerifiedIcon isVerified={verified} />
          </Stack>
          <Typography color="text.secondary" sx={{ display: "flex", alignItems: "center", gap: 0.5 }} variant="body2">
            <PersonOutline sx={{ fontSize: "unset" }} /> {author}
          </Typography>
        </Stack>

        <Stack direction="row" justifyContent="flex-start" alignItems="center" spacing={0.5}>
          <Chip size="small" sx={{ backgroundColor: "white", color: "black" }} label={version} />

          {SuFile.exist(modFS("PROPS", { MODID: id })) && (
            <Chip
              size="small"
              sx={{
                background: `linear-gradient(333deg, ${theme.palette.secondary.dark} 0%, ${theme.palette.secondary.dark} 83%) padding-box,linear-gradient(22deg, rgba(188,2,194,1) 0%, rgba(74,20,140,1) 100%) border-box`,
                color: theme.palette.text.secondary,
                border: "1px solid transparent",
              }}
              label={strings("installed")}
            />
          )}

          {features && Object.keys(features).length !== 0 && (
            <Chip size="small" sx={{ backgroundColor: "white", color: "black" }} label={Object.keys(features).length + " features"} />
          )}
          
          {!isModuleSupported && <Chip size="small" color="warning" label={strings("unsupported")} />}

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
