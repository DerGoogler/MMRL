import RepoActivity from "@Activitys/RepoActivity";
import SettingsActivity from "@Activitys/SettingsActivity";
import { StyledListItemText } from "@Components/StyledListItemText";
import { useStrings } from "@Hooks/useStrings";
import { Divider, List, ListItemButton, ListSubheader } from "@mui/material";
import { Page } from "react-onsenui";
import { IntentPusher } from "@Hooks/useActivity";
import FetchTextActivity, { FetchTextActivityExtra } from "@Activitys/FetchTextActivity";
import AboutActivity from "@Activitys/AboutActivity";
import PlaygroundsActivity, { PlaygroundExtra } from "@Activitys/PlaygroundsActivity";
import { ConfigureView } from "@Components/ConfigureView";
import { ConfigureActivity } from "@Activitys/ConfigureActivity";
import { Markup } from "@Components/Markdown";
import {
  CheckRounded,
  CloseRounded,
  FormatBoldRounded,
  FormatItalicRounded,
  FormatListBulletedRounded,
  FormatListNumberedRounded,
  FormatQuoteRounded,
  FormatStrikethroughRounded,
  ImageRounded,
  LinkRounded,
  WarningAmberRounded,
} from "@mui/icons-material";
import { configureSample } from "@Util/configure-sample";
import { dapiSample } from "@Util/dapi-sample";

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
          <StyledListItemText primary={strings("settings")} />
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
          <StyledListItemText primary={strings("repositories")} />
        </ListItemButton>
      </List>

      <Divider />

      <List subheader={<ListSubheader sx={(theme) => ({ bgcolor: theme.palette.background.default })}>Components</ListSubheader>}>
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
          <StyledListItemText primary={"DAPI Tester"} />
        </ListItemButton>
        <ListItemButton
          onClick={() => {
            pushPage<PlaygroundExtra, any>({
              component: PlaygroundsActivity,
              key: "configure_playground",
              extra: {
                title: "Configure playground",
                editorMode: "mdx",
                defaultText: configureSample,
                previewPage: ConfigureActivity,
                preview: ConfigureView,
              },
            });
            hide();
          }}
        >
          <StyledListItemText primary={"Configure playground"} />
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
            pushPage<FetchTextActivityExtra, any>({
              component: FetchTextActivity,
              key: "changelog",
              extra: {
                rendering: ConfigureView,
                url: "https://raw.githubusercontent.com/wiki/DerGoogler/MMRL/MDX-Changelog.md",
                modulename: "Changelog",
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
