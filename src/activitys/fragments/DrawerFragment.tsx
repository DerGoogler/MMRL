import { FetchTextActivityExtra } from "@Activitys/FetchTextActivity";
import { ModConfView } from "@Activitys/ModConfActivity/components/ModConfView";
import PlaygroundsActivity, { PlaygroundExtra } from "@Activitys/PlaygroundsActivity";
import { Markup } from "@Components/Markdown";
import { IntentPusher } from "@Hooks/useActivity";
import { useStrings } from "@Hooks/useStrings";
import { useTheme } from "@Hooks/useTheme";
import { Divider, List, ListItemButton, ListItemText, ListSubheader } from "@mui/material";
import { os } from "@Native/Os";
import { configureSample } from "@Util/configure-sample";
import { dapiSample } from "@Util/dapi-sample";
import { Page } from "react-onsenui";
import { Activities } from "..";

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
              component: Activities.Settings,
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
              component: Activities.Repo,
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
              component: Activities.ModFS,
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
              component: Activities.ViewBlacklistedModules,
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
              component: Activities.SubmitModule,
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
                previewPage: Activities.FetchText,
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
              component: Activities.ModConfPlayground,
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
        </ListItemButton>{" "}
        <ListItemButton
          onClick={() => {
            pushPage<any, any>({
              component: Activities.ModConfStandalone,
              key: "ModConfStandaloneActivity",
              extra: {},
            });
            hide();
          }}
        >
          <ListItemText primary={"ModConf Standalone"} />
        </ListItemButton>
      </List>

      <Divider />

      <List subheader={<ListSubheader>Other</ListSubheader>}>
        <ListItemButton
          onClick={() => {
            os.openURL("https://dergoogler.com/legal/privacy-policy", "_blank");
            hide();
          }}
        >
          <ListItemText primary={strings("privacy_privacy")} />
        </ListItemButton>
        <ListItemButton
          onClick={() => {
            pushPage({
              component: Activities.About,
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
              component: Activities.Licenses,
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
              component: Activities.FetchText,
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
        <ListItemButton
          onClick={() => {
            os.openURL("https://t.me/GooglersRepo", "_blank");
            hide();
          }}
        >
          <ListItemText primary={strings("telegram_channel")} />
        </ListItemButton>
      </List>

      {/* <Divider /> */}
    </Page>
  );
};
