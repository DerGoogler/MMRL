import { Divider, InputAdornment, List, ListItem, ListItemButton, ListSubheader } from "@mui/material";
import { BuildConfig } from "@Native/BuildConfig";
import { Toolbar } from "@Components/onsenui/Toolbar";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Page } from "@Components/onsenui/Page";
import { Magisk } from "@Native/Magisk";
import { useStrings } from "@Hooks/useStrings";
import { useActivity } from "@Hooks/useActivity";
import { accent_colors, termScrollBehaviors, useSettings } from "@Hooks/useSettings";
import { StyledListItemText } from "@Components/StyledListItemText";
import { ListPickerItem } from "@Components/ListPickerItem";
import { os } from "@Native/Os";
import { Android12Switch } from "@Components/Android12Switch";
import { useTheme } from "@Hooks/useTheme";
import { useRepos } from "@Hooks/useRepos";
import { Shell } from "@Native/Shell";
import { DialogEditTextListItem } from "@Components/DialogEditTextListItem";
import ModConfActivity from "./ModConfActivity";
import { Properties } from "@Native/Properties";
import { useLanguageMap } from "./../locales/declaration";

function SettingsActivity() {
  const { context } = useActivity();
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

  return (
    <Page renderToolbar={renderToolbar}>
      <Page.RelativeContent zeroMargin>
        <List
          subheader={<ListSubheader sx={(theme) => ({ bgcolor: theme.palette.background.default })}>{strings("appearance")}</ListSubheader>}
        >
          <ListItem>
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

          <ListPickerItem id="accent-color" targetSetting="accent_scheme" title={strings("accent_color")} contentMap={accent_colors} />
          <ListPickerItem id="language" targetSetting="language" title={strings("language")} contentMap={availableLangs} />
          <ListItem>
            <StyledListItemText id="switch-list-label-wifi" primary={strings("sticky_search_bar")} />
            <Android12Switch
              edge="end"
              onChange={(e: any) => {
                setSettings("disable_sticky_search_bar", e.target.checked);
              }}
              checked={settings.disable_sticky_search_bar}
            />
          </ListItem>
        </List>

        <Divider />
        <List
          subheader={<ListSubheader sx={(theme) => ({ bgcolor: theme.palette.background.default })}>{strings("module")}</ListSubheader>}
        >
          <ListItem>
            <StyledListItemText primary={strings("low_quality_modules")} secondary={strings("low_quality_modules_subtitle")} />
            <Android12Switch
              edge="end"
              onChange={(e: any) => {
                setSettings("_low_quality_module", e.target.checked);
              }}
              checked={settings._low_quality_module}
            />
          </ListItem>
          <ListItem>
            <StyledListItemText primary={strings("invaild_modules")} secondary={strings("invaild_modules_subtitle")} />
            <Android12Switch
              edge="end"
              onChange={(e: any) => {
                setSettings("_invald_module", e.target.checked);
              }}
              checked={settings._invald_module}
            />
          </ListItem>
          {os.isAndroid && (
            <>
              <ListItemButton
                onClick={() => {
                  context.pushPage({
                    component: ModConfActivity,
                    key: "Mod_Tree",
                    extra: {},
                  });
                }}
              >
                <StyledListItemText primary={strings("modconf")} secondary={strings("modconf_subtitle")} />
              </ListItemButton>
            </>
          )}
        </List>

        {os.isAndroid && (
          <>
            <Divider />
            <List
              subheader={
                <ListSubheader sx={(theme) => ({ bgcolor: theme.palette.background.default })}>{strings("terminal")}</ListSubheader>
              }
            >
              <ListItem>
                <StyledListItemText primary={strings("enable_install")} secondary={strings("enable_install_subtitle")} />
                <Android12Switch
                  edge="end"
                  disabled={!(Shell.isKernelSU() || Shell.isMagiskSU())}
                  onChange={(e: any) => {
                    setSettings("__experimental_local_install", e.target.checked);
                  }}
                  checked={settings.__experimental_local_install}
                />
              </ListItem>

              <ListItem>
                <StyledListItemText primary={strings("scroll_to_bottom")} secondary={strings("scroll_to_bottom_subtitle")} />
                <Android12Switch
                  edge="end"
                  onChange={(e: any) => {
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

        <List
          subheader={
            <ListSubheader sx={(theme) => ({ bgcolor: theme.palette.background.default })}>{strings("development")}</ListSubheader>
          }
        >
          <ListItem>
            <StyledListItemText
              id="switch-list-label-eruda"
              primary={strings("eruda_console")}
              secondary={strings("eruda_console_subtitle")}
            />
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
            <StyledListItemText id="switch-list-label-wifi" primary="Issues" secondary="Track our issues" />
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
                      package_name: BuildConfig.APPLICATION_ID,
                      version_name: BuildConfig.VERSION_NAME,
                      version_code: BuildConfig.VERSION_CODE,
                    },
                    root: {
                      manager: Shell.getRootManager(),
                      version_name: Shell.VERSION_NAME(),
                      version_code: Shell.VERSION_CODE(),
                    },
                  },
                  null,
                  4
                )
              );
            }}
          >
            <StyledListItemText primary={strings("share_device_infos")} secondary={strings("share_device_infos_subtilte")} />
          </ListItemButton>
        </List>

        <Divider />

        <List
          subheader={<ListSubheader sx={(theme) => ({ bgcolor: theme.palette.background.default })}>{strings("storage")}</ListSubheader>}
        >
          <ListItemButton
            onClick={() => {
              setRepos([]);
            }}
          >
            <StyledListItemText primary={strings("clear_repos")} />
          </ListItemButton>{" "}
          <ListItemButton
            onClick={() => {
              patchSettings();
            }}
          >
            <StyledListItemText primary={strings("patch_settings")} secondary={strings("patch_settings_subtitle")} />
          </ListItemButton>
        </List>

        <Divider />

        <ListItem>
          <StyledListItemText
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
