import React from "react";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import Stack from "@mui/material/Stack";
import Chip from "@mui/material/Chip";
import Divider from "@mui/material/Divider";
import Button from "@mui/material/Button";

import { ModConfActivity, ModConfActivityExtra } from "@Activitys/ModConfActivity";

import { Delete, Settings, RefreshRounded, Loop } from "@mui/icons-material";

import { useTheme } from "@Hooks/useTheme";
import { useSettings } from "@Hooks/useSettings";
import { useLowQualityModule } from "@Hooks/useLowQualityModule";
import { useStrings } from "@Hooks/useStrings";
import { useActivity } from "@Hooks/useActivity";
import { useLog } from "@Hooks/native/useLog";
import { ModFS, useModFS } from "@Hooks/useModFS";

import { SuFile } from "@Native/SuFile";
// @ts-ignore
import { useConfirm } from "material-ui-confirm";
import Switch from "@mui/material/Switch";
import { Image } from "@Components/dapi/Image";
import { AntifeatureButton } from "@Components/AntifeaturesButton";
import { useBlacklist } from "@Hooks/useBlacklist";

interface Props {
  module: Module;
}

const DeviceModule = React.memo<Props>((props) => {
  const { theme } = useTheme();
  const { modFS } = useModFS();
  const { strings } = useStrings();
  const { context } = useActivity();

  const log = useLog("DeviceModule");
  const confirm = useConfirm();

  const { id, name, author, version, versionCode, timestamp, description, cover } = props.module;

  const format = React.useCallback<<K extends keyof ModFS>(key: K) => ModFS[K]>((key) => modFS(key, { MODID: id }), []);

  const remove = new SuFile(format("REMOVE"));
  const disable = new SuFile(format("DISABLE"));
  const has_update = SuFile.exist(format("UPDATE"));

  const [isEnabled, setIsEnabled] = React.useState(!disable.exist());
  const [isSwitchDisabled, setIsSwitchDisabled] = React.useState(remove.exist());

  const [lowQualityModule] = useSettings("_low_quality_module");
  const isLowQuality = useLowQualityModule(props.module, !lowQualityModule);
  const isNew = React.useMemo(() => new Date().getTime() - timestamp! < 60 * 60 * 1000, [timestamp]);
  const isDisabledStyle = React.useMemo(() => (isSwitchDisabled ? { textDecoration: "line-through" } : {}), [isSwitchDisabled]);

  const post_service = SuFile.exist(format("POSTSERVICE"));
  const late_service = SuFile.exist(format("LATESERVICE"));
  const post_mount = SuFile.exist(format("POSTMOUNT"));
  const boot_complete = SuFile.exist(format("BOOTCOMP"));
  const module_config_file = SuFile.exist(format("CONFINDEX"));

  const blacklistedModules = useBlacklist();
  const findHardCodedAntifeature = React.useMemo<Track["antifeatures"]>(() => {
    return blacklistedModules.find((mod) => mod.id === id)?.antifeatures || [];
  }, [id]);

  return (
    <Card
      sx={{
        position: "relative",
        p: 2,
        width: "100%",
      }}
    >
      <Stack sx={{ position: "relative", zIndex: 1 }} direction="column" justifyContent="center" spacing={1}>
        {cover && (
          <Image
            sx={{
              height: "100%",
              objectFit: "cover",
              width: "100%",
            }}
            src={cover}
            alt={name}
            modFSAdds={{
              MODID: id,
            }}
            noOpen
          />
        )}
        <Stack direction="column" justifyContent="center" spacing={1}>
          <Stack direction="row" justifyContent="flex-end" alignItems="center" spacing={1}>
            {isLowQuality && (
              <Chip
                color="error"
                clickable
                onClick={() => {
                  confirm({ title: strings("low_quality_module"), description: strings("low_quality_module_warn") }).then(() => {});
                }}
                label={<Typography variant="caption">{strings("low_quality_module")}</Typography>}
                size="small"
                sx={{ borderRadius: theme.shape.borderRadius / theme.shape.borderRadius }}
              />
            )}
            {isNew && (
              <Chip
                color="primary"
                label={<Typography variant="caption">{strings("new")}</Typography>}
                size="small"
                sx={{ borderRadius: theme.shape.borderRadius / theme.shape.borderRadius }}
              />
            )}
          </Stack>
          <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={1}>
            <Stack direction="column" justifyContent="center" alignItems="flex-start">
              <Typography variant="h6" sx={{ ...isDisabledStyle }}>
                {name}
              </Typography>
              <Typography color="text.secondary" variant="caption" sx={{ ...isDisabledStyle }}>
                {version} ({versionCode}) / {author}
              </Typography>
            </Stack>
            <Typography variant="caption" display="block">
              <Switch
                checked={isEnabled}
                disabled={isSwitchDisabled || has_update}
                onChange={(e) => {
                  const checked = e.target.checked;

                  if (checked) {
                    if (disable.exist()) {
                      if (disable.delete()) {
                        log.d(
                          strings("module_enabled_LOG", {
                            name: id,
                          }) as string
                        );
                      }
                    }
                  } else {
                    if (!disable.exist()) {
                      if (disable.create()) {
                        log.d(
                          strings("module_disabled_LOG", {
                            name: id,
                          }) as string
                        );
                      }
                    }
                  }
                  setIsEnabled(checked);
                }}
                sx={{
                  right: -8,
                }}
              />
            </Typography>
          </Stack>
          <Typography color="text.secondary" variant="body2" display="block" sx={{ ...isDisabledStyle }}>
            {description}
          </Typography>
          <Stack direction="column" justifyContent="center" spacing={1.2}>
            <Stack
              direction="row"
              justifyContent="flex-start"
              alignItems="center"
              spacing={1}
              sx={{
                overflowY: "auto",
              }}
            >
              {post_service && <Chip variant="outlined" size="small" color="error" label="Post service" />}
              {late_service && <Chip variant="outlined" size="small" color="info" label="Late service" />}
              {post_mount && <Chip variant="outlined" size="small" color="warning" label="Post mount" />}
              {boot_complete && <Chip variant="outlined" size="small" color="success" label="Boot completed" />}
            </Stack>
            <Divider variant="middle" />
            <Stack direction="row" justifyContent="flex-end" alignItems="center" spacing={1}>
              {findHardCodedAntifeature && findHardCodedAntifeature.length !== 0 && (
                <AntifeatureButton antifeatures={findHardCodedAntifeature} />
              )}
              <Button
                onClick={() => {
                  context.pushPage<ModConfActivityExtra, any>({
                    component: ModConfActivity,
                    key: `${id}_configure`,
                    extra: {
                      indexFile: format("CONFINDEX"),
                      cwd: format("CONFCWD"),
                      modId: id,
                    },
                  });
                }}
                disableElevation
                variant="contained"
                size="medium"
                startIcon={<Settings />}
                disabled={!module_config_file}
              >
                Config
              </Button>

              {isSwitchDisabled ? (
                <Button
                  onClick={() => {
                    if (remove.exist()) {
                      if (remove.delete()) {
                        setIsSwitchDisabled(false);
                        log.d(`${id} has been recovered`);
                      } else {
                        log.e(`Failed to restore ${id}`);
                      }
                    } else {
                      log.e(`This remove file don't exists for ${id}`);
                    }
                  }}
                  disableElevation
                  variant="contained"
                  size="medium"
                  startIcon={<RefreshRounded />}
                >
                  {strings("restore")}
                </Button>
              ) : (
                <Button
                  onClick={() => {
                    if (remove.create()) {
                      setIsSwitchDisabled(true);
                    } else {
                      setIsSwitchDisabled(false);
                    }
                  }}
                  disableElevation
                  variant="contained"
                  size="medium"
                  startIcon={<Delete />}
                >
                  {strings("remove")}
                </Button>
              )}
            </Stack>
          </Stack>
        </Stack>
      </Stack>
      {has_update && (
        <Loop
          sx={{
            position: "absolute",
            left: "50%",
            top: "50%",
            fill: theme.palette.background.default,
            color: theme.palette.background.default,
            WebkitTransform: "translate(-50%, -50%)",
            transform: "translate(-50%, -50%)",
            fontSize: "50cqmin",
          }}
        />
      )}
    </Card>
  );
});

export default DeviceModule;
