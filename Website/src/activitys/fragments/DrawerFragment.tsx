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
import { SubmitModuleActivity } from "@Activitys/SubmitModuleActivity";
import { os } from "@Native/Os";
import { useTheme } from "@Hooks/useTheme";
import ViewBlacklistedModulesActivity from "@Activitys/ViewBlacklistedModulesActivity";

type Props = {
  renderToolbar: () => JSX.Element;
  hideSplitter: () => void;
  pushPage: <E, P>(props: IntentPusher<E, P>) => void;
};

export const DrawerFragment = (props: Props) => {
  const hide = props.hideSplitter;
  const pushPage = props.pushPage;
  const { theme } = useTheme();
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

        <ListItemButton
          onClick={() => {
            pushPage({
              component: ViewBlacklistedModulesActivity,
              key: "ViewBlacklistedModulesActivity",
              extra: {},
            });
            hide();
          }}
        >
          <ListItemText primary={strings("blacklisted_modules")} />
        </ListItemButton>
      </List>

      <Divider />

      <List subheader={<ListSubheader>Components</ListSubheader>}>
        <ListItemButton
          onClick={() => {
            pushPage({
              noMemo: true,
              component: SubmitModuleActivity,
              key: "SubmitModuleActivity",
              extra: {},
            });
            hide();
          }}
        >
          <ListItemText primary={strings("submit_module")} />
        </ListItemButton>
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
            os.open("https://dergoogler.com/legal/privacy-policy", {
              target: "_blank",
              features: {
                color: theme.palette.background.default,
              },
            });
            hide();
          }}
        >
          <ListItemText primary={strings("privacy_privacy")} />
        </ListItemButton>
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
          <ListItemText primary={strings("changelog")} />
        </ListItemButton>
      </List>

      {/* <Divider /> */}
    </Page>
  );
};
