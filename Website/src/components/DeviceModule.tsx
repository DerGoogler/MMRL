import { SuFile } from "@Native/SuFile";
import { DeleteRounded, RefreshRounded } from "@mui/icons-material";
import React from "react";
import { useStrings } from "@Hooks/useStrings";
import { Android12Switch } from "./Android12Switch";
import { Box, Card, Divider, Stack, SxProps, Theme, Typography } from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";
import { useActivity } from "@Hooks/useActivity";
import { ConfigureActivity } from "@Activitys/ConfigureActivity";
import { StyledIconButton } from "./StyledIconButton";
import { useLog } from "@Hooks/native/useLog";
import { Properties } from "properties-file";
import { ModConf, colors, useSettings } from "@Hooks/useSettings";

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

const DeviceModule = React.memo<Props>((props) => {
  const { strings } = useStrings();
  const { settings, modConf } = useSettings();
  const { context, extra } = useActivity<any>();
  const [isEnabled, setIsEnabled] = React.useState(true);
  const [isSwitchDisabled, setIsSwitchDisabled] = React.useState(false);

  const log = useLog("DeviceModule");

  const { id, name, version, versionCode, author, description } = props.module;

  const format = React.useCallback<<K extends keyof ModConf>(key: K) => ModConf[K]>((key) => modConf(key, { MODID: id }), []);

  const remove = new SuFile(format("REMOVE"));
  React.useEffect(() => {
    setIsSwitchDisabled(remove.exist());
  }, [isSwitchDisabled]);

  const disable = new SuFile(format("DISABLE"));
  React.useEffect(() => {
    setIsEnabled(!disable.exist());
  }, [isEnabled]);

  const post_service = SuFile.exist(format("POSTSERVICE"));
  const late_service = SuFile.exist(format("LATESERVICE"));
  const post_mount = SuFile.exist(format("POSTMOUNT"));
  const boot_complete = SuFile.exist(format("BOOTCOMP"));
  const module_config_file = SuFile.exist(format("CONFINDEX"));

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
              {version} ({versionCode}) / {author}
            </Typography>
            <Typography variant="body1" color="text.secondary">
              {description}
            </Typography>
          </Stack>
        </Box>

        <Stack direction="row" justifyContent="flex-start" alignItems="center" sx={{ px: 2, pt: 0, pb: 2 }} spacing={1}>
          {post_service && <Box sx={badgeStyle(colors.red)}>Post service</Box>}
          {late_service && <Box sx={badgeStyle(colors.blue)}>Late service</Box>}
          {post_mount && <Box sx={badgeStyle(colors.blue)}>Post mount</Box>}
          {boot_complete && <Box sx={badgeStyle(colors.teal)}>On boot completed</Box>}
        </Stack>

        <Divider />

        <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ p: 1 }}>
          <Android12Switch
            checked={isEnabled}
            disabled={isSwitchDisabled}
            onChange={(e) => {
              const checked = e.target.checked;
              const disable = new SuFile(format("DISABLE"));

              if (checked) {
                if (disable.exist()) {
                  if (disable.delete()) {
                    log.i(
                      strings("module_enabled_LOG", {
                        name: module,
                      })
                    );
                  }
                }
              } else {
                if (!disable.exist()) {
                  if (disable.create()) {
                    log.i(
                      strings("module_disabled_LOG", {
                        name: module,
                      })
                    );
                  }
                }
              }
              setIsEnabled(checked);
            }}
            inputProps={{ "aria-label": "controlled" }}
          />

          <Stack spacing={0.8} direction="row">
            {module_config_file && (
              <StyledIconButton
                style={{ width: 30, height: 30 }}
                onClick={() => {
                  context.pushPage({
                    component: ConfigureActivity,
                    key: `${id}_configure`,
                    extra: {
                      modulename: name,
                      moduleid: id,
                    },
                  });
                }}
              >
                <SettingsIcon sx={{ fontSize: 14 }} />
              </StyledIconButton>
            )}

            {isSwitchDisabled ? (
              <StyledIconButton
                style={{ width: 30, height: 30 }}
                onClick={() => {
                  const remove = new SuFile(format("REMOVE"));
                  if (remove.exist()) {
                    if (remove.delete()) {
                      setIsSwitchDisabled(false);
                      log.i(`${module} has been recovered`);
                    } else {
                      log.e(`Failed to restore ${module}`);
                    }
                  } else {
                    log.e(`This remove file don't exists for ${module}`);
                  }
                }}
              >
                <RefreshRounded sx={{ fontSize: 14 }} />
              </StyledIconButton>
            ) : (
              <StyledIconButton
                style={{ width: 30, height: 30 }}
                onClick={() => {
                  const file = new SuFile(format("REMOVE"));
                  if (file.create()) {
                    setIsSwitchDisabled(true);
                  } else {
                    setIsSwitchDisabled(false);
                  }
                }}
              >
                <DeleteRounded sx={{ fontSize: 14 }} />
              </StyledIconButton>
            )}
          </Stack>
        </Stack>
      </Card>
    </>
  );
});

export default DeviceModule;
