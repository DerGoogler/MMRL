import RepoActivity from "@Activitys/RepoActivity";
import SettingsActivity from "@Activitys/SettingsActivity";
import { StyledListItemText } from "@Components/StyledListItemText";
import { useStrings } from "@Hooks/useStrings";
import { Divider, List, ListItemButton, ListSubheader } from "@mui/material";
import { Page } from "react-onsenui";
import { IntentPusher } from "@Hooks/useActivity";
import FetchTextActivity from "@Activitys/FetchTextActivity";
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
                previewPage: FetchTextActivity,
                preview: Markup,
                commands: [
                  {
                    name: "bold",
                    icon: FormatBoldRounded,
                  },
                  {
                    name: "italic",
                    icon: FormatItalicRounded,
                  },
                  {
                    name: "strike-through",
                    icon: FormatStrikethroughRounded,
                  },
                  {
                    name: "link",
                    icon: LinkRounded,
                  },
                  {
                    name: "image",
                    icon: ImageRounded,
                  },
                  {
                    name: "unordered-list",
                    icon: FormatListBulletedRounded,
                  },
                  {
                    name: "ordered-list",
                    icon: FormatListNumberedRounded,
                  },
                  {
                    name: "block-quotes",
                    icon: FormatQuoteRounded,
                  },
                  {
                    name: "insert-checkmark",
                    icon: CheckRounded,
                    iconStyle: {
                      color: "#1a7f37",
                    },
                    handler: ({ cursor }) => {
                      cursor.insert(`${cursor.MARKER}<CheckIcon/>${cursor.MARKER}`);
                    },
                  },
                  {
                    name: "insert-warnmark",
                    icon: WarningAmberRounded,
                    iconStyle: {
                      color: "#d29922",
                    },
                    handler: ({ cursor }) => {
                      cursor.insert(`${cursor.MARKER}<AlertIcon/>${cursor.MARKER}`);
                    },
                  },
                  {
                    name: "insert-dangermark",
                    icon: CloseRounded,
                    iconStyle: {
                      color: "#cf222e",
                    },
                    handler: ({ cursor }) => {
                      cursor.insert(`${cursor.MARKER}<XIcon/>${cursor.MARKER}`);
                    },
                  },
                ],
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
                previewPage: ConfigureActivity,
                preview: ConfigureView,
                commands: [],
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
