import { SuFile } from "@Native/SuFile";
import { DeleteRounded, RefreshRounded } from "@mui/icons-material";
import React from "react";
import { useStrings } from "@Hooks/useStrings";
import { Android12Switch } from "./Android12Switch";
import { Box, Divider, Stack, Typography } from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";
import { useActivity } from "@Hooks/useActivity";
import { ConfigureActivity } from "@Activitys/ConfigureActivity";
import { StyledCard } from "./StyledCard";
import { StyledIconButton } from "./StyledIconButton";
import { useLog } from "@Hooks/native/useLog";
import { Properties } from "properties-file";

interface Props {
  module: string;
}

const DeviceModule = (props: Props) => {
  const { strings } = useStrings();
  const { context, extra } = useActivity<any>();
  const [moduleProps, setModuleProps] = React.useState<Partial<ModuleProps>>({});
  const [isEnabled, setIsEnabled] = React.useState(true);
  const [isSwitchDisabled, setIsSwitchDisabled] = React.useState(false);

  const log = useLog("DeviceModule");

  const module = props.module;

  React.useEffect(() => {
    const readProps = SuFile.read(`/data/adb/modules/${module}/module.prop`);
    setModuleProps(new Properties(readProps).toObject()); 
  }, []);

  React.useEffect(() => {
    const remove = new SuFile(`/data/adb/modules/${module}/remove`);

    setIsSwitchDisabled(remove.exist());
  }, [isSwitchDisabled]);

  React.useEffect(() => {
    const disable = new SuFile(`/data/adb/modules/${module}/disable`);
    setIsEnabled(!disable.exist());
  }, [isEnabled]);

  const { id, name, version, versionCode, author, description, mmrlConfig } = moduleProps;

  return (
    <>
      <StyledCard elevation={0}>
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
        <Divider />
        <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ px: 2, py: 1 }}>
          <Android12Switch
            checked={isEnabled}
            disabled={isSwitchDisabled}
            onChange={(e) => {
              const checked = e.target.checked;
              const disable = new SuFile(`/data/adb/modules/${module}/disable`);

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
                    props: {
                      key: `${module}_configure`,
                      extra: {
                        modulename: module,
                      },
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
                  const remove = new SuFile(`/data/adb/modules/${module}/remove`);
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
                  const file = new SuFile(`/data/adb/modules/${module}/remove`);
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
      </StyledCard>
    </>
  );
};

export default DeviceModule;
