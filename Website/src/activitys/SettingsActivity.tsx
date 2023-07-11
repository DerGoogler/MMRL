import { Divider, List, ListItem, ListItemButton, ListItemIcon, ListSubheader, Switch } from "@mui/material";
import { BuildConfig } from "@Native/BuildConfig";
import { Toolbar } from "@Components/onsenui/Toolbar";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Page } from "@Components/onsenui/Page";
import { Magisk } from "@Native/Magisk";
import { useStrings } from "@Hooks/useStrings";
import { useActivity } from "@Hooks/useActivity";
import { accent_colors, useSettings, useTheme } from "@Hooks/useSettings";
import { StyledListItemText } from "@Components/StyledListItemText";
import { ListPickerItem } from "@Components/ListPickerItem";
import { languages_map } from "../locales/languages";
import { os } from "@Native/Os";
import { Android12Switch } from "@Components/Android12Switch";

function SettingsActivity() {
  const { context } = useActivity();
  const { strings } = useStrings();

  const { theme } = useTheme();

  // Prefs
  const { settings, setSettings } = useSettings();

  const renderToolbar = () => {
    return (
      <Toolbar modifier="noshadow">
        <Toolbar.Left>
          <Toolbar.Button icon={ArrowBackIcon} onClick={context.popPage} />
        </Toolbar.Left>
        <Toolbar.Center>{strings.settings}</Toolbar.Center>
      </Toolbar>
    );
  };

  return (
    <Page renderToolbar={renderToolbar}>
      <List subheader={<ListSubheader sx={(theme) => ({ bgcolor: theme.palette.background.default })}>{strings.appearance}</ListSubheader>}>
        <ListItem>
          <StyledListItemText id="switch-list-label-wifi" primary={strings.dark_theme} />
          <Android12Switch
            edge="end"
            onChange={(e: any) => {
              setSettings("darkmode", e.target.checked);
            }}
            checked={settings.darkmode}
            inputProps={{
              "aria-labelledby": "switch-list-label-wifi",
            }}
          />
        </ListItem>
        <ListPickerItem id="accent-color" targetSetting="accent_scheme" title={strings.accent_color} contentMap={accent_colors} />
        <ListPickerItem id="language" targetSetting="language" title={strings.language} contentMap={languages_map} />
      </List>

      <Divider />
      <List subheader={<ListSubheader sx={(theme) => ({ bgcolor: theme.palette.background.default })}>Experimental</ListSubheader>}>
        <ListItem>
          <StyledListItemText
            id="switch-list-__experimental_local_install"
            primary={"Enable local install"}
            secondary="Allows you to install local *.zip files"
          />
          <Android12Switch
            edge="end"
            onChange={(e: any) => {
              setSettings("__experimental_local_install", e.target.checked);
            }}
            checked={settings.__experimental_local_install}
            inputProps={{
              "aria-labelledby": "switch-list-__experimental_local_install",
            }}
          />
        </ListItem>
      </List>

      <Divider />

      <List
        subheader={<ListSubheader sx={(theme) => ({ bgcolor: theme.palette.background.default })}>{strings.development}</ListSubheader>}
      >
        {/* <ListItem>
          <StyledListItemText id="switch-list-label-eruda" primary={"Eruda console"} secondary={"Useful for development and bugs"} />
          <Android12Switch
            edge="end"
            onChange={(e: any) => {
              setSettings("eruda_console_enabled", e.target.checked);
            }}
            checked={settings.eruda_console_enabled}
            inputProps={{
              "aria-labelledby": "switch-list-label-eruda",
            }}
          />
        </ListItem> */}
        <ListItemButton
          onClick={() => {
            os.open("https://github.com/DerGoogler/MMRL/issues", {
              target: "_blank",
              features: {
                color: theme.palette.primary.main,
              },
            });
          }}
        >
          <StyledListItemText id="switch-list-label-wifi" primary="Issues" secondary="Track our issues" />
        </ListItemButton>
      </List>

      <Divider />

      <ListItem>
        <StyledListItemText
          primary={
            <span>
              {BuildConfig.APPLICATION_ID} v{BuildConfig.VERSION_NAME} ({BuildConfig.VERSION_CODE})<br />
              {os.isAndroid ? `${Magisk.VERSION_NAME} (${Magisk.VERSION_CODE})` : ""}
            </span>
          }
        />
      </ListItem>
    </Page>
  );
}

export default SettingsActivity;
