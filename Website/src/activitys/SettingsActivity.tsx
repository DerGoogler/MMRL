import { Divider, List, ListItem, ListItemButton, ListItemText, ListSubheader, Switch } from "@mui/material";
import { BuildConfig } from "@Native/BuildConfig";
import { Toolbar } from "@Components/onsenui/Toolbar";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Page } from "@Components/onsenui/Page";
import { useStrings } from "@Hooks/useStrings";
import { useActivity } from "@Hooks/useActivity";
import { termScrollBehaviors, useSettings } from "@Hooks/useSettings";
import { ListPickerItem } from "@Components/ListPickerItem";
import { os } from "@Native/Os";
import { useTheme } from "@Hooks/useTheme";
import { useRepos } from "@Hooks/useRepos";
import { Shell } from "@Native/Shell";
import { Properties } from "@Native/Properties";
import { useLanguageMap } from "./../locales/declaration";
import { useModFS } from "@Hooks/useModFS";
import { useLocalModules } from "@Hooks/useLocalModules";

function SettingsActivity() {
  const { context } = useActivity();
  const { _modFS } = useModFS();
  const { strings } = useStrings();
  const availableLangs = useLanguageMap();
  const { setRepos } = useRepos();
  const { patchSettings } = useSettings();

  const { theme } = useTheme();

  // Prefs
  const { settings, setSettings } = useSettings();

  const renderToolbar = () => {
    return (
      <Toolbar modifier="noshadow">
        <Toolbar.Left>
          <Toolbar.Button icon={ArrowBackIcon} onClick={context.popPage} />
        </Toolbar.Left>
        <Toolbar.Center>{strings("settings")}</Toolbar.Center>
      </Toolbar>
    );
  };

  const localModules = useLocalModules();

  return (
    <Page renderToolbar={renderToolbar}>
      <Page.RelativeContent zeroMargin>
        <List subheader={<ListSubheader>{strings("appearance")}</ListSubheader>}>
          {/* <ListItem>
            <StyledListItemText id="switch-list-label-wifi" primary={strings("dark_theme")} />
            <Android12Switch
              edge="end"
              onChange={(e: any) => {
                setSettings("darkmode", e.target.checked);
              }}
              checked={settings.darkmode}
            />
          </ListItem>
          {settings.darkmode && (
            <DialogEditTextListItem
              InputProps={{
                startAdornment: <InputAdornment position="start">-</InputAdornment>,
              }}
              inputLabel={strings("shading")}
              type="number"
              title={strings("shading_title")}
              initialValue={settings.shade_value.toString().replace("-", "")}
              description={strings("shading_desc")}
              onSuccess={(value) => {
                if (value) {
                  setSettings("shade_value", Number("-" + value));
                }
              }}
            >
              <StyledListItemText primary={strings("shading_title")} />
            </DialogEditTextListItem>
          )}

          <ListPickerItem id="accent-color" targetSetting="accent_scheme" title={strings("accent_color")} contentMap={accent_colors} /> */}
          <ListItem>
            <ListItemText primary={strings("swipeable_tabs")} secondary={strings("swipeable_tabs_subtitle")} />
            <Switch
              edge="end"
              onChange={(e) => {
                setSettings("swipeable_tabs", e.target.checked);
              }}
              checked={settings.swipeable_tabs}
            />
          </ListItem>
          <ListPickerItem id="language" targetSetting="language" title={strings("language")} contentMap={availableLangs} />
        </List>

        <Divider />

        <List subheader={<ListSubheader>{strings("security")}</ListSubheader>}>
          <ListItem>
            <ListItemText primary={strings("link_protection_title")} secondary={strings("link_protection_desc")} />
            <Switch
              edge="end"
              onChange={(e) => {
                setSettings("link_protection", e.target.checked);
              }}
              checked={settings.link_protection}
            />
          </ListItem>
        </List>

        <Divider />

        <List subheader={<ListSubheader>{strings("module")}</ListSubheader>}>
          <ListItem>
            <ListItemText primary={strings("low_quality_modules")} secondary={strings("low_quality_modules_subtitle")} />
            <Switch
              edge="end"
              onChange={(e) => {
                setSettings("_low_quality_module", e.target.checked);
              }}
              checked={settings._low_quality_module}
            />
          </ListItem>
          <ListItem>
            <ListItemText primary={strings("invaild_modules")} secondary={strings("invaild_modules_subtitle")} />
            <Switch
              edge="end"
              onChange={(e) => {
                setSettings("_invald_module", e.target.checked);
              }}
              checked={settings._invald_module}
            />
          </ListItem>
        </List>

        {os.isAndroid && (
          <>
            <Divider />
            <List subheader={<ListSubheader>{strings("terminal")}</ListSubheader>}>
              <ListItem>
                <ListItemText primary={strings("scroll_to_bottom")} secondary={strings("scroll_to_bottom_subtitle")} />
                <Switch
                  edge="end"
                  onChange={(e) => {
                    setSettings("term_scroll_bottom", e.target.checked);
                  }}
                  checked={settings.term_scroll_bottom}
                />
              </ListItem>
              <ListPickerItem
                id="term-scroll-behavior"
                targetSetting="term_scroll_behavior"
                title={strings("scroll_behavior")}
                contentMap={termScrollBehaviors}
              />
            </List>
          </>
        )}

        <Divider />

        <List subheader={<ListSubheader>{strings("development")}</ListSubheader>}>
          <ListItem>
            <ListItemText id="switch-list-label-eruda" primary={strings("eruda_console")} secondary={strings("eruda_console_subtitle")} />
            <Switch
              edge="end"
              onChange={(e) => {
                setSettings("eruda_console_enabled", e.target.checked);
              }}
              checked={settings.eruda_console_enabled}
              inputProps={{
                "aria-labelledby": "switch-list-label-eruda",
              }}
            />
          </ListItem>
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
            <ListItemText id="switch-list-label-wifi" primary="Issues" secondary="Track our issues" />
          </ListItemButton>
          <ListItemButton
            onClick={() => {
              os.shareText(
                "Share via",
                JSON.stringify(
                  {
                    device: {
                      sdk: Properties.get("ro.build.version.sdk", "unknown"),
                      brand: Properties.get("ro.product.brand", "unknown"),
                      model: Properties.get("ro.product.model", "unknown"),
                    },
                    application: {
                      user_agent: navigator.userAgent,
                      package_name: BuildConfig.APPLICATION_ID,
                      version_name: BuildConfig.VERSION_NAME,
                      version_code: BuildConfig.VERSION_CODE,
                    },
                    root: {
                      manager: Shell.getRootManager(),
                      version_name: Shell.VERSION_NAME(),
                      version_code: Shell.VERSION_CODE(),
                    },
                    modconf: _modFS,
                    modules: localModules,
                  },
                  null,
                  4
                )
              );
            }}
          >
            <ListItemText primary={strings("share_device_infos")} secondary={strings("share_device_infos_subtilte")} />
          </ListItemButton>
        </List>

        <Divider />

        <List subheader={<ListSubheader>{strings("storage")}</ListSubheader>}>
          <ListItemButton
            onClick={() => {
              setRepos([]);
            }}
          >
            <ListItemText primary={strings("clear_repos")} />
          </ListItemButton>{" "}
          <ListItemButton
            onClick={() => {
              patchSettings();
            }}
          >
            <ListItemText primary={strings("patch_settings")} secondary={strings("patch_settings_subtitle")} />
          </ListItemButton>
        </List>

        <Divider />

        {BuildConfig.DEBUG && (
          <>
            <List subheader={<ListSubheader>Debug</ListSubheader>}>
              <ListItemButton
                onClick={() => {
                  throw new Error("Test error thrown!");
                }}
              >
                <ListItemText primary="Throw error" />
              </ListItemButton>
            </List>

            <Divider />
          </>
        )}

        <ListItem>
          <ListItemText
            primary={
              <span>
                {BuildConfig.APPLICATION_ID} v{BuildConfig.VERSION_NAME} ({BuildConfig.VERSION_CODE})<br />
                {os.isAndroid ? `${Shell.VERSION_NAME()} (${Shell.VERSION_CODE()})` : ""}
              </span>
            }
          />
        </ListItem>
      </Page.RelativeContent>
    </Page>
  );
}

export default SettingsActivity;
