import { Page } from "@Components/onsenui/Page";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemButton from "@mui/material/ListItemButton";
import BugReportIcon from "@mui/icons-material/BugReport";
import ListItemIcon from "@mui/material/ListItemIcon";
import VerifiedIcon from "@mui/icons-material/Verified";
import GitHubIcon from "@mui/icons-material/GitHub";
import FormatAlignLeftIcon from "@mui/icons-material/FormatAlignLeft";
import FetchTextActivity from "../../FetchTextActivity";
import { useStrings } from "@Hooks/useStrings";
import { useActivity } from "@Hooks/useActivity";
import { useTheme } from "@Hooks/useTheme";
import { os } from "@Native/Os";

const AboutTab = () => {
  const { strings } = useStrings();
  const { context, extra } = useActivity<Module>();
  const { theme } = useTheme();

  const { license, verified, support, track } = extra;

  return (
    <List>
      {verified && (
        <ListItem>
          <ListItemIcon>
            <VerifiedIcon />
          </ListItemIcon>
          <ListItemText primary={strings("verified_module")} secondary={strings("verified_module_desc")} />
        </ListItem>
      )}

      {license && (
        <ListItemButton
          onClick={() => {
            fetch(`https://raw.githubusercontent.com/spdx/license-list-data/main/website/${license}.json`)
              .then((res) => {
                if (res.status === 200) {
                  return res.json();
                } else {
                  throw new Error("Fetching license failed");
                }
              })
              .then((json: LicenseSPX) => {
                context.pushPage({
                  component: FetchTextActivity,
                  key: "license_" + license,
                  extra: {
                    raw_data: json.licenseText,
                    modulename: json.name,
                  },
                });
              })
              .catch((err) => {});
          }}
        >
          <ListItemIcon>
            <FormatAlignLeftIcon />
          </ListItemIcon>
          <ListItemText primary={strings("license")} secondary={license} />
        </ListItemButton>
      )}

      {support && (
        <ListItemButton
          onClick={() => {
            os.open(support, {
              target: "_blank",
              features: {
                color: theme.palette.primary.main,
              },
            });
          }}
        >
          <ListItemIcon>
            <BugReportIcon />
          </ListItemIcon>
          <ListItemText primary="Issues" secondary={support} />
        </ListItemButton>
      )}

      <ListItemButton
        onClick={() => {
          os.open(track.source, {
            target: "_blank",
            features: {
              color: theme.palette.primary.main,
            },
          });
        }}
      >
        <ListItemIcon>
          <GitHubIcon />
        </ListItemIcon>
        <ListItemText primary={strings("source")} secondary={track.source} />
      </ListItemButton>
    </List>
  );
};

export { AboutTab };
