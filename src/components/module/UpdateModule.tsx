import React from "react";

import { ArrowRightAlt } from "@mui/icons-material";

import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import Card from "@mui/material/Card";
import Chip from "@mui/material/Chip";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import { useLog } from "@Hooks/native/useLog";
import { useActivity } from "@Hooks/useActivity";
import { useRepos } from "@Hooks/useRepos";
import { useStrings } from "@Hooks/useStrings";
import { useTheme } from "@Hooks/useTheme";


import { Activities } from "@Activitys/index";
import { link } from "googlers-tools";

interface Props {
  module: Module;
}

const UpdateModule = React.memo<Props>((props) => {
  const { theme } = useTheme();
  const { strings } = useStrings();
  const { context } = useActivity<any>();
  const { modules, repos } = useRepos();

  const { id, name, author, version, versionCode, updateJson: __updateJson } = props.module;

  const log = useLog("UpdateModule");

  const [updateJson, setUpdateJson] = React.useState<UpdateJson | null>(null);

  if (__updateJson && link.validURL(__updateJson)) {
    React.useEffect(() => {
      fetch(__updateJson)
        .then((res) => res.json())
        .then((json: UpdateJson) => setUpdateJson(json));
    }, [repos]);
  } else {
    log.d(strings("dm_update_json_fetch_warn", { id: id }) as string);
  }

  const hasUpdate = React.useMemo(() => {
    const onlineModule = modules.find((module) => module.id === id);
    if (__updateJson && updateJson) {
      return versionCode < Number(updateJson.versionCode);
    } else {
      return onlineModule && versionCode < onlineModule.versionCode;
    }
  }, [updateJson, modules, repos]);

  const updatedModule = React.useMemo(() => {
    const onlineModule = modules.find((module) => module.id === id);
    if (__updateJson && updateJson) {
      return updateJson;
    } else {
      return onlineModule && onlineModule.versions[onlineModule.versions.length - 1];
    }
  }, [updateJson, modules, repos]);

  if (!hasUpdate) return null;

  return (
    <Card sx={{ p: 2 }}>
      <Stack direction="column" justifyContent="center" spacing={1}>
        <Stack direction="column" justifyContent="center" alignItems="flex-start">
          <Typography variant="h6">{name}</Typography>
          <Typography color="text.secondary" variant="caption">
            {author}
          </Typography>
        </Stack>

        <Stack direction="column" justifyContent="center" alignItems="flex-start" spacing={1}>
          <Stack direction="row" justifyContent="flex-start" alignItems="center" spacing={1}>
            <Typography variant="body1" gutterBottom>
              Version:
            </Typography>
            <Chip label={version} size="small" sx={{ borderRadius: theme.shape.borderRadius / theme.shape.borderRadius }} />
            <ArrowRightAlt />
            <Chip label={updatedModule?.version} size="small" sx={{ borderRadius: theme.shape.borderRadius / theme.shape.borderRadius }} />
          </Stack>

          <Stack direction="row" justifyContent="flex-start" alignItems="center" spacing={1}>
            <Typography variant="body1" gutterBottom>
              Version code:
            </Typography>
            <Chip label={versionCode} size="small" sx={{ borderRadius: theme.shape.borderRadius / theme.shape.borderRadius }} />
            <ArrowRightAlt />
            <Chip
              label={updatedModule?.versionCode}
              size="small"
              sx={{ borderRadius: theme.shape.borderRadius / theme.shape.borderRadius }}
            />
          </Stack>
        </Stack>

        <Stack direction="column" justifyContent="center" alignItems="stretch" spacing={1.2}>
          <Divider variant="middle" />
          <ButtonGroup disableElevation fullWidth variant="contained" aria-label="Disabled elevation buttons">
            <Button
              onClick={() => {
                context.pushPage({
                  component: Activities.InstallTerminal,
                  key: "InstallTerminalV2Activity",
                  extra: {
                    id: id,
                    exploreInstall: true,
                    modSource: [updatedModule?.zipUrl],
                  },
                });
              }}
            >
              {strings("update")}
            </Button>
            <Button
              disabled={updatedModule?.changelog === ""}
              onClick={() => {
                context.pushPage({
                  component: Activities.FetchText,
                  key: `changelog_${id}`,
                  extra: {
                    title: updatedModule?.version,
                    url: updatedModule?.changelog,
                  },
                });
              }}
            >
              {strings("changelog")}
            </Button>
          </ButtonGroup>
        </Stack>
      </Stack>
    </Card>
  );
});

export default UpdateModule;
