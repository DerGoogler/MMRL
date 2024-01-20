import { SuFile } from "@Native/SuFile";
import { DeleteRounded, RefreshRounded } from "@mui/icons-material";
import React from "react";
import { useStrings } from "@Hooks/useStrings";
import { Android12Switch } from "./Android12Switch";
import { Alert, AlertTitle, Box, Button, Card, Chip, Divider, Stack, SxProps, Theme, Typography } from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";
import { useActivity } from "@Hooks/useActivity";
import { ConfigureActivity } from "@Activitys/ConfigureActivity";
import { StyledIconButton } from "./StyledIconButton";
import { useLog } from "@Hooks/native/useLog";
import { link } from "googlers-tools";
import { colors, useSettings } from "@Hooks/useSettings";
import { useTheme } from "@Hooks/useTheme";
import TerminalActivity from "@Activitys/TerminalActivity";
import { useRepos } from "@Hooks/useRepos";
import { ModConf, useModConf } from "@Hooks/useModConf";
import { useLowQualityModule } from "@Hooks/useLowQualityModule";

export const badgeStyle: (color: (typeof colors)["blue" | "teal" | "red" | "orange"]) => SxProps<Theme> = (color) => {
  return {
    px: 1,
    py: 0.5,
    borderRadius: 1,
    display: "flex",
    typography: "caption",
    bgcolor: (theme) => (theme.palette.mode === "dark" ? color[900] : color[50]),
    color: (theme) => (theme.palette.mode === "dark" ? "#fff" : color[700]),
  };
};

interface Props {
  module: Module;
}

const UpdateModule = React.memo<Props>((props) => {
  const { strings } = useStrings();
  const { theme } = useTheme();
  const { context } = useActivity<any>();
  const { modules, repos } = useRepos();

  const log = useLog("UpdateModule");

  const { id, name, version, versionCode, description, updateJson: __updateJson } = props.module;

  const [updateJson, setUpdateJson] = React.useState<UpdateJson | null>(null);

  if (__updateJson && link.validURL(__updateJson)) {
    React.useEffect(() => {
      fetch(__updateJson)
        .then((res) => res.json())
        .then((json: UpdateJson) => setUpdateJson(json));
    }, [repos]);
  } else {
    log.d(strings("dm_update_json_fetch_warn", { id: id }));
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
    <>
      <Card
        elevation={0}
        sx={{
          width: "100%",
        }}
      >
        <Box sx={{ p: 2, display: "flex" }}>
          <Stack spacing={0.5} style={{ flexGrow: 1 }}>
            <Typography fontWeight={700} color="text.primary">
              {name}
            </Typography>{" "}
            <Typography variant="caption" sx={{ fontSize: ".70rem" }} color="text.secondary">
              {version} ({versionCode}) {"=>"} {updatedModule?.version} ({updatedModule?.versionCode})
            </Typography>
            <Typography variant="body1" color="text.secondary">
              {description as string}
            </Typography>
          </Stack>
        </Box>

        {/* <Divider />

        <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ px: 2, py: 1 }}>
          <Chip
            size="small"
            sx={(theme) => ({
              bgcolor: `${settings.darkmode ? shade(scheme[200], -24.5) : shade(scheme[300], 49)}46`,
            })}
            label={formatLastUpdate}
          />
        </Stack> */}

        <Button
          sx={{
            borderRadius: `0px 0px ${theme.shape.borderRadius}px ${theme.shape.borderRadius}px`,
          }}
          fullWidth
          variant="contained"
          disableElevation
          onClick={() => {
            context.pushPage({
              component: TerminalActivity,
              key: "TerminalActivity",
              extra: {
                exploreInstall: true,
                path: updatedModule?.zipUrl,
              },
            });
          }}
        >
          {strings("update")}
        </Button>
      </Card>
    </>
  );
});

export default UpdateModule;
