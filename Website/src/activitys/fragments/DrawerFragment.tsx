import RepoActivity from "@Activitys/RepoActivity";
import SettingsActivity from "@Activitys/SettingsActivity";
import { useStrings } from "@Hooks/useStrings";
import { Divider, List, ListItemButton, ListItemText, ListSubheader } from "@mui/material";
import { Page } from "react-onsenui";
import { IntentPusher } from "@Hooks/useActivity";
import FetchTextActivity, { FetchTextActivityExtra } from "@Activitys/FetchTextActivity";
import AboutActivity from "@Activitys/AboutActivity";
import PlaygroundsActivity, { PlaygroundExtra } from "@Activitys/PlaygroundsActivity";
import { ModConfView } from "@Components/ModConfView";
import { Markup } from "@Components/Markdown";
import { configureSample } from "@Util/configure-sample";
import { dapiSample } from "@Util/dapi-sample";
import ModFSActivity from "@Activitys/ModFSActivity";
import ModConfPlaygroundActivity from "@Activitys/ModConfPlaygroundActivity";
import LicensesActivity from "@Activitys/LicensesActivity";

type Props = {
  renderToolbar: () => JSX.Element;
  hideSplitter: () => void;
  pushPage: <E, P>(props: IntentPusher<E, P>) => void;
};

export const DrawerFragment = (props: Props) => {
  const hide = props.hideSplitter;
  const pushPage = props.pushPage;

  const { strings } = useStrings();

  return (
    <Page renderToolbar={props.renderToolbar}>
      <List subheader={<ListSubheader>App</ListSubheader>}>
        <ListItemButton
          onClick={() => {
            pushPage({
              component: SettingsActivity,
              key: "settings",
            });
            hide();
          }}
        >
          <ListItemText primary={strings("settings")} />
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
          <ListItemText primary={strings("repositories")} />
        </ListItemButton>

        <ListItemButton
          onClick={() => {
            pushPage({
              component: ModFSActivity,
              key: "ModFSActivity",
              extra: {},
            });
            hide();
          }}
        >
          <ListItemText primary={strings("modfs")} />
        </ListItemButton>
      </List>

      <Divider />

      <List subheader={<ListSubheader>Components</ListSubheader>}>
        <ListItemButton
          onClick={() => {
            pushPage<PlaygroundExtra, any>({
              component: PlaygroundsActivity,
              key: "dapitestActivity",
              extra: {
                title: "DAPI Tester",
                defaultText: dapiSample,
                editorMode: "markdown",
                previewPage: FetchTextActivity,
                preview: Markup,
              },
            });
            hide();
          }}
        >
          <ListItemText primary={"DAPI Tester"} />
        </ListItemButton>
        <ListItemButton
          onClick={() => {
            pushPage<any, any>({
              component: ModConfPlaygroundActivity,
              key: "ModConfPlaygroundActivity",
              extra: {
                editorMode: "javascript",
                defaultText: configureSample,
              },
            });
            hide();
          }}
        >
          <ListItemText primary={strings("modconf_playground")} />
        </ListItemButton>
      </List>

      <Divider />

      <List subheader={<ListSubheader>Other</ListSubheader>}>
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
          <ListItemText primary={strings("about")} />
        </ListItemButton>
        <ListItemButton
          onClick={() => {
            pushPage({
              component: LicensesActivity,
              key: "license",
            });
            hide();
          }}
        >
          <ListItemText primary={strings("licenses")} />
        </ListItemButton>
        <ListItemButton
          onClick={() => {
            pushPage<FetchTextActivityExtra, any>({
              component: FetchTextActivity,
              key: "changelog",
              extra: {
                rendering: ModConfView,
                url: "https://raw.githubusercontent.com/wiki/DerGoogler/MMRL/JSX-Changelog.md",
                modulename: "Changelog",
              },
            });
            hide();
          }}
        >
          <ListItemText primary={"Changelog"} />
        </ListItemButton>
      </List>

      {/* <Divider /> */}
    </Page>
  );
};
