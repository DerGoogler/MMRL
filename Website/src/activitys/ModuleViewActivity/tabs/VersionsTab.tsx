import FetchTextActivity from "@Activitys/FetchTextActivity";
import InstallTerminalActivity from "@Activitys/InstallTerminalActivity";
import InstallTerminalV2Activity from "@Activitys/InstallTerminalV2Activity";
import { useActivity } from "@Hooks/useActivity";
import { useFormatDate } from "@Hooks/useFormatDate";
import { useStrings } from "@Hooks/useStrings";
import { useTheme } from "@Hooks/useTheme";
import { os } from "@Native/Os";
import { Shell } from "@Native/Shell";
import DownloadIcon from "@mui/icons-material/Download";
import InstallMobileIcon from "@mui/icons-material/InstallMobile";
import ManageHistoryIcon from "@mui/icons-material/ManageHistory";
import Chip from "@mui/material/Chip";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useConfirm } from "material-ui-confirm";
import React from "react";

const VersionsTab = () => {
  const { context, extra } = useActivity<Module>();
  const { id, versions } = extra;

  return (
    <List>
      {versions.toReversed().map((version, index) => (
        <VersionItem id={id} version={version} index={index} />
      ))}
    </List>
  );
};

interface VersionItemProps {
  index: number;
  id: string;
  version: Version;
}

const VersionItem = React.memo<VersionItemProps>(({ id, version, index }) => {
  const ts = useFormatDate(version.timestamp);
  const { context, extra } = useActivity<Module>();
  const confirm = useConfirm();
  const { strings } = useStrings();
  const { theme } = useTheme();

  const { track } = extra;

  const versionName = `${version.version} (${version.versionCode})`;

  const handleInstall = () => {
    confirm({
      title: `Install ${versionName}?`,
      confirmationText: "Yes",
    }).then(() => {
      context.pushPage({
        component: InstallTerminalV2Activity,
        key: "InstallTerminalV2Activity",
        extra: {
          issues: track.support,
          source: track.source,
          id: id,
          exploreInstall: true,
          modSource: [version.zipUrl],
        },
      });
    });
  };

  return (
    <ListItem
      secondaryAction={
        <Stack direction="row" justifyContent="center" alignItems="center" spacing={0.5}>
          {version.changelog && (
            <IconButton
              disabled={!version.changelog}
              onClick={() => {
                context.pushPage({
                  component: FetchTextActivity,
                  key: `changelog_${id}`,
                  extra: {
                    title: version.version,
                    url: version.changelog,
                  },
                });
              }}
              edge="end"
              aria-label="download"
            >
              <ManageHistoryIcon />
            </IconButton>
          )}

          {os.isAndroid && (Shell.isMagiskSU() || Shell.isKernelSU() || Shell.isAPatchSU()) && (
            <IconButton onClick={handleInstall} edge="end" aria-label="install">
              <InstallMobileIcon />
            </IconButton>
          )}

          <IconButton
            disabled={!version.zipUrl}
            onClick={() => {
              os.open(version.zipUrl, {
                target: "_blank",
                features: {
                  color: theme.palette.primary.main,
                },
              });
            }}
            edge="end"
            aria-label="download"
          >
            <DownloadIcon />
          </IconButton>
        </Stack>
      }
    >
      <ListItemText
        primary={
          <Typography component={Stack} variant="body1" direction="row" justifyContent="flex-start" alignItems="center" spacing={1}>
            <span>{versionName}</span>
            {index === 0 && <Chip variant="outlined" color="success" size="small" label={strings("latest")} />}
          </Typography>
        }
        secondary={ts}
      />
    </ListItem>
  );
});

export { VersionsTab };
