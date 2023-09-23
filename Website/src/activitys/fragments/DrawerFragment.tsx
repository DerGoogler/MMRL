import { DAPITestActivity } from "@Activitys/DAPITestActivity";
import RepoActivity from "@Activitys/RepoActivity";
import SettingsActivity from "@Activitys/SettingsActivity";
import { StyledListItemText } from "@Components/StyledListItemText";
import { useStrings } from "@Hooks/useStrings";
import { Divider, List, ListItemButton, ListSubheader } from "@mui/material";
import { Page } from "react-onsenui";
import { IntentPusher } from "@Hooks/useActivity";
import FetchTextActivity from "@Activitys/FetchTextActivity";
import AboutActivity from "@Activitys/AboutActivity";

type Props = {
  renderToolbar: () => JSX.Element;
  hideSplitter: () => void;
  pushPage: (props: IntentPusher) => void;
};

export const DrawerFragment = (props: Props) => {
  const hide = props.hideSplitter;
  const pushPage = props.pushPage;

  const { strings } = useStrings();

  return (
    <Page renderToolbar={props.renderToolbar}>
      <List subheader={<ListSubheader sx={(theme) => ({ bgcolor: theme.palette.background.default })}>App</ListSubheader>}>
        <ListItemButton
          onClick={() => {
            pushPage({
              component: SettingsActivity,
              key: "settings",
            });
            hide();
          }}
        >
          <StyledListItemText primary={strings.settings} />
        </ListItemButton>
        <ListItemButton
          onClick={() => {
            pushPage({
              component: RepoActivity,
              key: "repos",
            });
            hide();
          }}
        >
          <StyledListItemText primary={strings.repositories} />
        </ListItemButton>
      </List>

      <Divider />

      <List subheader={<ListSubheader sx={(theme) => ({ bgcolor: theme.palette.background.default })}>Components</ListSubheader>}>
        <ListItemButton
          onClick={() => {
            pushPage({
              component: DAPITestActivity,
              key: "dapitestActivity",
            });
            hide();
          }}
        >
          <StyledListItemText primary={"DAPI Tester"} />
        </ListItemButton>
      </List>

      <Divider />

      <List subheader={<ListSubheader sx={(theme) => ({ bgcolor: theme.palette.background.default })}>Other</ListSubheader>}>
        <ListItemButton
          onClick={() => {
            pushPage({
              component: AboutActivity,
              key: "abt",
              extra: {},
            });
            hide();
          }}
        >
          <StyledListItemText primary={"About"} />
        </ListItemButton>
        <ListItemButton
          onClick={() => {
            pushPage({
              component: FetchTextActivity,
              key: "license",
              extra: {
                title: "License",
                url: "https://raw.githubusercontent.com/wiki/DerGoogler/MMRL/License.md",
              },
            });
            hide();
          }}
        >
          <StyledListItemText primary={"License"} />
        </ListItemButton>
        <ListItemButton
          onClick={() => {
            pushPage({
              component: FetchTextActivity,
              key: "changelog",
              extra: {
                url: "https://raw.githubusercontent.com/wiki/DerGoogler/MMRL/Changelog.md",
                title: "Changelog",
              },
            });
            hide();
          }}
        >
          <StyledListItemText primary={"Changelog"} />
        </ListItemButton>
      </List>

      {/* <Divider /> */}
    </Page>
  );
};
