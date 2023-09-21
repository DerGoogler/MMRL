import { Alert, Badge, Box, Divider, InputAdornment, List, ListItem, ListItemButton, ListSubheader, SxProps, Theme } from "@mui/material";
import { BuildConfig } from "@Native/BuildConfig";
import { Toolbar } from "@Components/onsenui/Toolbar";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Page } from "@Components/onsenui/Page";
import { Magisk } from "@Native/Magisk";
import { useStrings } from "@Hooks/useStrings";
import { useActivity } from "@Hooks/useActivity";
import { accent_colors, colors, useSettings } from "@Hooks/useSettings";
import { StyledListItemText } from "@Components/StyledListItemText";
import { ListPickerItem } from "@Components/ListPickerItem";
import { languages_map } from "../locales/languages";
import { os } from "@Native/Os";
import { Android12Switch } from "@Components/Android12Switch";
import { useTheme } from "@Hooks/useTheme";
import { useRepos } from "@Hooks/useRepos";
import { Shell } from "@Native/Shell";
import { DialogEditTextListItem } from "@Components/DialogEditTextListItem";
import { KernelSULogo } from "@Components/icon/KernelSULogo";

function ModuleTreeConf() {
  const { context } = useActivity();
  const { strings } = useStrings();
  const { setRepos } = useRepos();
  const { patchSettings } = useSettings();

  const { theme, scheme } = useTheme();

  // Prefs
  const { settings, setSettings } = useSettings();

  const renderToolbar = () => {
    return (
      <Toolbar modifier="noshadow">
        <Toolbar.Left>
          <Toolbar.Button icon={ArrowBackIcon} onClick={context.popPage} />
        </Toolbar.Left>
        <Toolbar.Center>Configure module tree</Toolbar.Center>
      </Toolbar>
    );
  };

  return (
    <Page renderToolbar={renderToolbar}>
      <Page.RelativeContent zeroMargin>
        <Alert sx={{ m: { xs: 1, md: 1 } }} severity="error">
          I am not responsible for anything that may happen to your phone by changing these informations. You do it at your own risk and
          take the responsibility upon yourself and you are not to blame us or MMRL and its respected developers
        </Alert>
        <List subheader={<ListSubheader sx={(theme) => ({ bgcolor: theme.palette.background.default })}>Default paths</ListSubheader>}>
          <DialogEditTextListItem
            inputLabel="Path"
            type="text"
            title="Modules location"
            initialValue={settings.mod_tree}
            onSuccess={(value) => {
              if (value) {
                setSettings("mod_tree", value);
              }
            }}
          >
            <StyledListItemText primary="Modules location" secondary={settings.mod_tree} />
          </DialogEditTextListItem>
          <DialogEditTextListItem
            inputLabel={
              <Box sx={{ display: "flex" }}>
                {settings.mod_tree}/
                <Box
                  sx={{
                    px: 0.5,
                    py: 0.25,
                    borderRadius: 1,
                    display: "flex",
                    typography: "caption",
                    bgcolor: (theme) => (theme.palette.mode === "dark" ? scheme[900] : scheme[50]),
                    color: (theme) => (theme.palette.mode === "dark" ? "#fff" : scheme[700]),
                  }}
                >
                  MODID
                </Box>
                /
              </Box>
            }
            type="text"
            title="Module properties location"
            initialValue={settings.mod_prop}
            onSuccess={(value) => {
              if (value) {
                setSettings("mod_prop", value);
              }
            }}
          >
            <StyledListItemText primary="Module properties location" secondary={settings.mod_prop} />
          </DialogEditTextListItem>
          <DialogEditTextListItem
            inputLabel={
              <Box sx={{ display: "flex" }}>
                {settings.mod_tree}/
                <Box
                  sx={{
                    px: 0.5,
                    py: 0.25,
                    borderRadius: 1,
                    display: "flex",
                    typography: "caption",
                    bgcolor: (theme) => (theme.palette.mode === "dark" ? scheme[900] : scheme[50]),
                    color: (theme) => (theme.palette.mode === "dark" ? "#fff" : scheme[700]),
                  }}
                >
                  MODID
                </Box>
                /
              </Box>
            }
            type="text"
            title="Module system properties location"
            disabled
            initialValue={settings.mod_system}
            onSuccess={(value) => {
              if (value) {
                setSettings("mod_system", value);
              }
            }}
          >
            <StyledListItemText primary="Module system properties location" secondary={settings.mod_system} />
          </DialogEditTextListItem>
          <DialogEditTextListItem
            inputLabel={
              <Box sx={{ display: "flex" }}>
                {settings.mod_tree}/
                <Box
                  sx={{
                    px: 0.5,
                    py: 0.25,
                    borderRadius: 1,
                    display: "flex",
                    typography: "caption",
                    bgcolor: (theme) => (theme.palette.mode === "dark" ? scheme[900] : scheme[50]),
                    color: (theme) => (theme.palette.mode === "dark" ? "#fff" : scheme[700]),
                  }}
                >
                  MODID
                </Box>
                /
              </Box>
            }
            type="text"
            title="Module sepolicy rules location"
            disabled
            initialValue={settings.mod_sepolicy}
            onSuccess={(value) => {
              if (value) {
                setSettings("mod_sepolicy", value);
              }
            }}
          >
            <StyledListItemText primary="Module sepolicy rules location" secondary={settings.mod_sepolicy} />
          </DialogEditTextListItem>
        </List>

        <Divider />
        <List subheader={<ListSubheader sx={(theme) => ({ bgcolor: theme.palette.background.default })}>Service path</ListSubheader>}>
          <DialogEditTextListItem
            inputLabel={
              <Box sx={{ display: "flex" }}>
                {settings.mod_tree}/
                <Box
                  sx={{
                    px: 0.5,
                    py: 0.25,
                    borderRadius: 1,
                    display: "flex",
                    typography: "caption",
                    bgcolor: (theme) => (theme.palette.mode === "dark" ? scheme[900] : scheme[50]),
                    color: (theme) => (theme.palette.mode === "dark" ? "#fff" : scheme[700]),
                  }}
                >
                  MODID
                </Box>
                /
              </Box>
            }
            type="text"
            title="Late service location"
            initialValue={settings.mod_late_service}
            onSuccess={(value) => {
              if (value) {
                setSettings("mod_late_service", value);
              }
            }}
          >
            <StyledListItemText primary="Late service location" secondary={settings.mod_late_service} />
          </DialogEditTextListItem>

          <DialogEditTextListItem
            inputLabel={
              <Box sx={{ display: "flex" }}>
                {settings.mod_tree}/
                <Box
                  sx={{
                    px: 0.5,
                    py: 0.25,
                    borderRadius: 1,
                    display: "flex",
                    typography: "caption",
                    bgcolor: (theme) => (theme.palette.mode === "dark" ? scheme[900] : scheme[50]),
                    color: (theme) => (theme.palette.mode === "dark" ? "#fff" : scheme[700]),
                  }}
                >
                  MODID
                </Box>
                /
              </Box>
            }
            type="text"
            title="Post service location"
            initialValue={settings.mod_post_service}
            onSuccess={(value) => {
              if (value) {
                setSettings("mod_post_service", value);
              }
            }}
          >
            <StyledListItemText primary="Post service location" secondary={settings.mod_post_service} />
          </DialogEditTextListItem>

          <DialogEditTextListItem
            inputLabel={
              <Box sx={{ display: "flex" }}>
                {settings.mod_tree}/
                <Box
                  sx={{
                    px: 0.5,
                    py: 0.25,
                    borderRadius: 1,
                    display: "flex",
                    typography: "caption",
                    bgcolor: (theme) => (theme.palette.mode === "dark" ? scheme[900] : scheme[50]),
                    color: (theme) => (theme.palette.mode === "dark" ? "#fff" : scheme[700]),
                  }}
                >
                  MODID
                </Box>
                /
              </Box>
            }
            type="text"
            title="Mounted service location"
            disabled={Shell.isMagiskSU()}
            initialValue={settings.mod_mounted}
            onSuccess={(value) => {
              if (value) {
                setSettings("mod_mounted", value);
              }
            }}
          >
            <StyledListItemText
              primary={
                <Box sx={{ display: "flex", alignItems: "center", justifyItems: "center" }}>
                  <KernelSULogo sx={{ mr: 1 }} width="1rem" height="1rem" />
                  Mounted service location
                </Box>
              }
              secondary={settings.mod_mounted}
            />
          </DialogEditTextListItem>

          <DialogEditTextListItem
            inputLabel={
              <Box sx={{ display: "flex" }}>
                {settings.mod_tree}/
                <Box
                  sx={{
                    px: 0.5,
                    py: 0.25,
                    borderRadius: 1,
                    display: "flex",
                    typography: "caption",
                    bgcolor: (theme) => (theme.palette.mode === "dark" ? scheme[900] : scheme[50]),
                    color: (theme) => (theme.palette.mode === "dark" ? "#fff" : scheme[700]),
                  }}
                >
                  MODID
                </Box>
                /
              </Box>
            }
            type="text"
            title="Boot complete service location"
            disabled={Shell.isMagiskSU()}
            initialValue={settings.mod_boot}
            onSuccess={(value) => {
              if (value) {
                setSettings("mod_boot", value);
              }
            }}
          >
            <StyledListItemText
              primary={
                <Box sx={{ display: "flex", alignItems: "center", justifyItems: "center" }}>
                  <KernelSULogo sx={{ mr: 1 }} width="1rem" height="1rem" />
                  Boot complete service location
                </Box>
              }
              secondary={settings.mod_boot}
            />
          </DialogEditTextListItem>
        </List>

        <Divider />

        <List subheader={<ListSubheader sx={(theme) => ({ bgcolor: theme.palette.background.default })}>Status path</ListSubheader>}>
          <DialogEditTextListItem
            inputLabel={
              <Box sx={{ display: "flex" }}>
                {settings.mod_tree}/
                <Box
                  sx={{
                    px: 0.5,
                    py: 0.25,
                    borderRadius: 1,
                    display: "flex",
                    typography: "caption",
                    bgcolor: (theme) => (theme.palette.mode === "dark" ? scheme[900] : scheme[50]),
                    color: (theme) => (theme.palette.mode === "dark" ? "#fff" : scheme[700]),
                  }}
                >
                  MODID
                </Box>
                /
              </Box>
            }
            type="text"
            title="Module skip mount location"
            initialValue={settings.mod_s_mount}
            disabled
            onSuccess={(value) => {
              if (value) {
                setSettings("mod_s_mount", value);
              }
            }}
          >
            <StyledListItemText primary="Module skip mount location" secondary={settings.mod_s_mount} />
          </DialogEditTextListItem>

          <DialogEditTextListItem
            inputLabel={
              <Box sx={{ display: "flex" }}>
                {settings.mod_tree}/
                <Box
                  sx={{
                    px: 0.5,
                    py: 0.25,
                    borderRadius: 1,
                    display: "flex",
                    typography: "caption",
                    bgcolor: (theme) => (theme.palette.mode === "dark" ? scheme[900] : scheme[50]),
                    color: (theme) => (theme.palette.mode === "dark" ? "#fff" : scheme[700]),
                  }}
                >
                  MODID
                </Box>
                /
              </Box>
            }
            type="text"
            title="Module disable location"
            initialValue={settings.mod_disable}
            onSuccess={(value) => {
              if (value) {
                setSettings("mod_disable", value);
              }
            }}
          >
            <StyledListItemText primary="Module disable location" secondary={settings.mod_disable} />
          </DialogEditTextListItem>

          <DialogEditTextListItem
            inputLabel={
              <Box sx={{ display: "flex" }}>
                {settings.mod_tree}/
                <Box
                  sx={{
                    px: 0.5,
                    py: 0.25,
                    borderRadius: 1,
                    display: "flex",
                    typography: "caption",
                    bgcolor: (theme) => (theme.palette.mode === "dark" ? scheme[900] : scheme[50]),
                    color: (theme) => (theme.palette.mode === "dark" ? "#fff" : scheme[700]),
                  }}
                >
                  MODID
                </Box>
                /
              </Box>
            }
            type="text"
            title="Module remove location"
            initialValue={settings.mod_remove}
            onSuccess={(value) => {
              if (value) {
                setSettings("mod_remove", value);
              }
            }}
          >
            <StyledListItemText primary="Module remove location" secondary={settings.mod_remove} />
          </DialogEditTextListItem>
        </List>

        <Divider />
      </Page.RelativeContent>
    </Page>
  );
}

export default ModuleTreeConf;
