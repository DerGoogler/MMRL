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
import { colors, useSettings } from "@Hooks/useSettings";

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
  module: string;
}

const DeviceModule = (props: Props) => {
  const { strings } = useStrings();
  const { settings } = useSettings();
  const { context, extra } = useActivity<any>();
  const [moduleProps, setModuleProps] = React.useState<Partial<ModuleProps>>({});
  const [isEnabled, setIsEnabled] = React.useState(true);
  const [isSwitchDisabled, setIsSwitchDisabled] = React.useState(false);

  const log = useLog("DeviceModule");

  const module = props.module;

  const readProps = new SuFile(`${settings.mod_tree}/${module}/${settings.mod_prop}`);
  React.useEffect(() => {
    if (readProps.exist()) {
      setModuleProps(new Properties(readProps.read()).toObject());
    }
  }, []);

  React.useEffect(() => {
    const remove = new SuFile(`${settings.mod_tree}/${module}/${settings.mod_remove}`);

    setIsSwitchDisabled(remove.exist());
  }, [isSwitchDisabled]);

  React.useEffect(() => {
    const disable = new SuFile(`${settings.mod_tree}/${module}/${settings.mod_remove}`);
    setIsEnabled(!disable.exist());
  }, [isEnabled]);

  const { id, name, version, versionCode, author, description, mmrlConfig } = moduleProps;

  const post_service = SuFile.exist(`${settings.mod_tree}/${module}/${settings.mod_post_service}`);
  const late_service = SuFile.exist(`${settings.mod_tree}/${module}/${settings.mod_late_service}`);
  const post_mount = SuFile.exist(`${settings.mod_tree}/${module}/${settings.mod_mounted}`);
  const boot_complete = SuFile.exist(`${settings.mod_tree}/${module}/${settings.mod_boot}`);

  if (!readProps.exist()) {
    return null;
  }

  return (
    <>
      <Card
        variant="outlined"
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
              const disable = new SuFile(`${settings.mod_tree}/${module}/${settings.mod_disable}`);

              if (checked) {
                if (disable.exist()) {
                  if (disable.delete()) {
                    log.i(
                      strings.formatString(strings.module_enabled_LOG, {
                        name: module,
                      }) as string
                    );
                  }
                }
              } else {
                if (!disable.exist()) {
                  if (disable.create()) {
                    log.i(
                      strings.formatString(strings.module_disabled_LOG, {
                        name: module,
                      }) as string
                    );
                  }
                }
              }
              setIsEnabled(checked);
            }}
            inputProps={{ "aria-label": "controlled" }}
          />

          <Stack spacing={0.8} direction="row">
            {mmrlConfig && (
              <StyledIconButton
                style={{ width: 30, height: 30 }}
                onClick={() => {
                  context.pushPage({
                    component: ConfigureActivity,
                    key: `${module}_configure`,
                    extra: {
                      modulename: module,
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
                  const remove = new SuFile(`${settings.mod_tree}/${module}/${settings.mod_remove}`);
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
                  const file = new SuFile(`${settings.mod_tree}/${module}/${settings.mod_remove}`);
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
};

export default DeviceModule;
