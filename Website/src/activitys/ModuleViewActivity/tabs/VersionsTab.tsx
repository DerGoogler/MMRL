import { Page } from "@Components/onsenui/Page";
import { useStrings } from "@Hooks/useStrings";
import React from "react";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import { useActivity } from "@Hooks/useActivity";
import ListItemText from "@mui/material/ListItemText";
import { useTheme } from "@Hooks/useTheme";
import { os } from "@Native/Os";
import { useFormatDate } from "@Hooks/useFormatDate";
import Chip from "@mui/material/Chip";
import { Shell } from "@Native/Shell";
import { useConfirm } from "material-ui-confirm";
import InstallMobileIcon from "@mui/icons-material/InstallMobile";
import DownloadIcon from "@mui/icons-material/Download";
import TerminalActivity from "@Activitys/TerminalActivity";

const VersionsTab = () => {
  const { context, extra } = useActivity<Module>();
  const { id, versions } = extra;

  return (
    <Page>
      <Page.RelativeContent zeroMargin>
        <List>
          {versions.toReversed().map((version, index) => (
            <VersionItem id={id} version={version} index={index} />
          ))}
        </List>
      </Page.RelativeContent>
    </Page>
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
        component: TerminalActivity,
        key: "TerminalActivity",
        extra: {
          issues: track.support,
          source: track.source,
          id: id,
          exploreInstall: true,
          path: version.zipUrl,
        },
      });
    });
  };

  return (
    <ListItem
      secondaryAction={
        <Stack direction="row" justifyContent="center" alignItems="center" spacing={0.5}>
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
