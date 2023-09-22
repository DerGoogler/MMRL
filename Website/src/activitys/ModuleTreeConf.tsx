import { Alert, Badge, Box, Divider, InputAdornment, List, ListItem, ListItemButton, ListSubheader, SxProps, Theme } from "@mui/material";
import { BuildConfig } from "@Native/BuildConfig";
import { Toolbar } from "@Components/onsenui/Toolbar";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Page } from "@Components/onsenui/Page";
import { Magisk } from "@Native/Magisk";
import { useStrings } from "@Hooks/useStrings";
import { useActivity } from "@Hooks/useActivity";
import { ModConf, accent_colors, colors, useSettings } from "@Hooks/useSettings";
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
import React from "react";
import Marquee from "react-fast-marquee";

function ModuleTreeConf() {
  const { context } = useActivity();
  const { strings } = useStrings();
  const { setRepos } = useRepos();

  const { theme, scheme } = useTheme();

  // Prefs
  const { _modConf, setModConf } = useSettings();

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
        <List
          subheader={<ListSubheader sx={(theme) => ({ bgcolor: theme.palette.background.default })}>Command line interfaces</ListSubheader>}
        >
          <DialogEditTextListItem
            inputLabel="Path"
            type="text"
            title="Installation CLI"
            disabled={!Shell.isMagiskSU()}
            initialValue={_modConf.MSUCLI}
            onSuccess={(value) => {
              if (value) {
                setModConf("MSUCLI", value);
              }
            }}
          >
            <StyledListItemText primary="Magisk install CLI" secondary={_modConf.MSUCLI} />
          </DialogEditTextListItem>
          <DialogEditTextListItem
            inputLabel="Path"
            type="text"
            title="Installation CLI"
            disabled={!Shell.isKernelSU()}
            initialValue={_modConf.KSUCLI}
            onSuccess={(value) => {
              if (value) {
                setModConf("KSUCLI", value);
              }
            }}
          >
            <StyledListItemText
              primary={
                <Box sx={{ display: "flex", alignItems: "center", justifyItems: "center" }}>
                  <KernelSULogo sx={{ mr: 1 }} width="1rem" height="1rem" />
                  KernelSU install cli
                </Box>
              }
              secondary={_modConf.KSUCLI}
            />
          </DialogEditTextListItem>
        </List>

        <Divider />
        <List subheader={<ListSubheader sx={(theme) => ({ bgcolor: theme.palette.background.default })}>Default paths</ListSubheader>}>
          <DialogEditTextListItem
            inputLabel="Path"
            type="text"
            title="Base location"
            initialValue={_modConf.ADB}
            onSuccess={(value) => {
              if (value) {
                setModConf("ADB", value);
              }
            }}
          >
            <StyledListItemText primary="Base location" secondary={_modConf.ADB} />
          </DialogEditTextListItem>
          <DialogEditTextListItem
            inputLabel="Path"
            type="text"
            title="Modules location"
            initialValue={_modConf.MODULES}
            onSuccess={(value) => {
              if (value) {
                setModConf("MODULES", value);
              }
            }}
          >
            <StyledListItemText primary="Modules location" secondary={_modConf.MODULES} />
          </DialogEditTextListItem>
          <DialogEditTextListItem
            inputLabel="Path"
            type="text"
            title="Module properties location"
            initialValue={_modConf.PROPS}
            onSuccess={(value) => {
              if (value) {
                setModConf("PROPS", value);
              }
            }}
          >
            <StyledListItemText primary="Module properties location" secondary={_modConf.PROPS} />
          </DialogEditTextListItem>
          <DialogEditTextListItem
            inputLabel="Path"
            type="text"
            title="Module system properties location"
            initialValue={_modConf.SYSTEM}
            onSuccess={(value) => {
              if (value) {
                setModConf("SYSTEM", value);
              }
            }}
          >
            <StyledListItemText primary="Module system properties location" secondary={_modConf.SYSTEM} />
          </DialogEditTextListItem>
          <DialogEditTextListItem
            inputLabel="Path"
            type="text"
            title="Module sepolicy rules location"
            initialValue={_modConf.SEPOLICY}
            onSuccess={(value) => {
              if (value) {
                setModConf("SEPOLICY", value);
              }
            }}
          >
            <StyledListItemText primary="Module sepolicy rules location" secondary={_modConf.SEPOLICY} />
          </DialogEditTextListItem>
          <DialogEditTextListItem
            inputLabel="Path"
            type="text"
            title="Module config file location"
            disabled
            initialValue={_modConf.CONFIG}
            onSuccess={(value) => {}}
          >
            <StyledListItemText
              primary="Module config file location"
              secondary={
                <Marquee play={false} gradient gradientWidth={15} gradientColor={theme.palette.background.default}>
                  {_modConf.CONFIG}
                </Marquee>
              }
            />
          </DialogEditTextListItem>
        </List>

        <Divider />
        <List subheader={<ListSubheader sx={(theme) => ({ bgcolor: theme.palette.background.default })}>Service path</ListSubheader>}>
          <DialogEditTextListItem
            inputLabel="Path"
            type="text"
            title="Late service location"
            initialValue={_modConf.LATESERVICE}
            onSuccess={(value) => {
              if (value) {
                setModConf("LATESERVICE", value);
              }
            }}
          >
            <StyledListItemText primary="Late service location" secondary={_modConf.LATESERVICE} />
          </DialogEditTextListItem>

          <DialogEditTextListItem
            inputLabel="Path"
            type="text"
            title="Post service location"
            initialValue={_modConf.POSTSERVICE}
            onSuccess={(value) => {
              if (value) {
                setModConf("POSTSERVICE", value);
              }
            }}
          >
            <StyledListItemText primary="Post service location" secondary={_modConf.POSTSERVICE} />
          </DialogEditTextListItem>

          <DialogEditTextListItem
            inputLabel="Path"
            type="text"
            title="Mounted service location"
            disabled={!Shell.isKernelSU()}
            initialValue={_modConf.POSTMOUNT}
            onSuccess={(value) => {
              if (value) {
                setModConf("POSTMOUNT", value);
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
              secondary={_modConf.POSTMOUNT}
            />
          </DialogEditTextListItem>

          <DialogEditTextListItem
            inputLabel="Path"
            type="text"
            title="Boot complete service location"
            disabled={!Shell.isKernelSU()}
            initialValue={_modConf.BOOTCOMP}
            onSuccess={(value) => {
              if (value) {
                setModConf("BOOTCOMP", value);
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
              secondary={_modConf.BOOTCOMP}
            />
          </DialogEditTextListItem>
        </List>

        <Divider />

        <List subheader={<ListSubheader sx={(theme) => ({ bgcolor: theme.palette.background.default })}>Status path</ListSubheader>}>
          <DialogEditTextListItem
            inputLabel="Path"
            type="text"
            title="Module skip mount location"
            initialValue={_modConf.SKIPMOUNT}
            onSuccess={(value) => {
              if (value) {
                setModConf("SKIPMOUNT", value);
              }
            }}
          >
            <StyledListItemText primary="Module skip mount location" secondary={_modConf.SKIPMOUNT} />
          </DialogEditTextListItem>

          <DialogEditTextListItem
            inputLabel="Path"
            type="text"
            title="Module disable location"
            initialValue={_modConf.DISABLE}
            onSuccess={(value) => {
              if (value) {
                setModConf("DISABLE", value);
              }
            }}
          >
            <StyledListItemText primary="Module disable location" secondary={_modConf.DISABLE} />
          </DialogEditTextListItem>

          <DialogEditTextListItem
            inputLabel="Path"
            type="text"
            title="Module remove location"
            initialValue={_modConf.REMOVE}
            onSuccess={(value) => {
              if (value) {
                setModConf("REMOVE", value);
              }
            }}
          >
            <StyledListItemText primary="Module remove location" secondary={_modConf.REMOVE} />
          </DialogEditTextListItem>

          <DialogEditTextListItem
            inputLabel="Path"
            type="text"
            title="Module remove location"
            initialValue={_modConf.UPDATE}
            onSuccess={(value) => {
              if (value) {
                setModConf("UPDATE", value);
              }
            }}
          >
            <StyledListItemText primary="Module update location" secondary={_modConf.UPDATE} />
          </DialogEditTextListItem>
        </List>

        <Divider />
      </Page.RelativeContent>
    </Page>
  );
}

export default ModuleTreeConf;
