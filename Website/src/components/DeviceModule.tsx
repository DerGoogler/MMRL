import { Card, Ripple, Switch } from "react-onsenui";
import Properties from "@js.properties/properties";
import File from "@Native/File";
import { Log } from "@Native/Log";
import { DeleteRounded, RefreshRounded } from "@mui/icons-material";
import React from "react";
import { useDarkmode } from "@Hooks/useDarkmode";
import { useStrings } from "@Hooks/useStrings";
import { Android12Switch } from "./Android12Switch";
import { Box, Divider, Stack, Typography } from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";
import { useActivity } from "@Hooks/useActivity";
import { ConfigureActivity } from "@Activitys/ConfigureActivity";
import { StyledCard } from "./StyledCard";
import { StyledIconButton } from "./StyledIconButton";

interface Props {
  module: string;
}

const DeviceModule = (props: Props) => {
  const { strings } = useStrings();
  const { context, extra } = useActivity<any>();
  const [moduleProps, setModuleProps] = React.useState<Partial<ModuleProps>>({});
  const [dialogShown, setDialogShown] = React.useState(false);
  const [isEnabled, setIsEnabled] = React.useState(true);
  const [isSwitchDisabled, setIsSwitchDisabled] = React.useState(false);
  const [, forceUpdate] = React.useReducer((x) => x + 1, 0);

  const isDarkmode = useDarkmode();

  const log = new Log("DeviceModule");

  const module = props.module;

  React.useEffect(() => {
    const readProps = File.read(`/data/adb/modules/${module}/module.prop`);
    setModuleProps(Properties.parseToProperties(readProps));
  }, []);

  React.useEffect(() => {
    const remove = new File(`/data/adb/modules/${module}/remove`);

    setIsSwitchDisabled(remove.exist());
  }, [isSwitchDisabled]);

  React.useEffect(() => {
    const disable = new File(`/data/adb/modules/${module}/disable`);
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
              const disable = new File(`/data/adb/modules/${module}/disable`);

              if (checked) {
                if (disable.exist()) {
                  if (disable.delete()) {
                    log.i(
                      strings.formatString(strings.module_enabled_LOG, {
                        name: module,
                      })
                    );
                  }
                }
              } else {
                if (!disable.exist()) {
                  if (disable.create()) {
                    log.i(
                      strings.formatString(strings.module_disabled_LOG, {
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
            {isSwitchDisabled ? (
              <StyledIconButton
                style={{ width: 30, height: 30 }}
                onClick={() => {
                  const remove = new File(`/data/adb/modules/${module}/remove`);
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
                  const file = new File(`/data/adb/modules/${module}/remove`);
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
          </Stack>
        </Stack>
      </StyledCard>
    </>
  );
};

export default DeviceModule;
