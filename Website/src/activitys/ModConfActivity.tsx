import { Alert, Box, Divider, List, ListSubheader } from "@mui/material";
import AvatarGroup from "@mui/material/AvatarGroup";
import Avatar from "@mui/material/Avatar";
import { Toolbar } from "@Components/onsenui/Toolbar";
import { Page } from "@Components/onsenui/Page";
import { useActivity } from "@Hooks/useActivity";
import { ModConf, useModConf } from "@Hooks/useModConf";
import { StyledListItemText } from "@Components/StyledListItemText";
import { Shell } from "@Native/Shell";
import { DialogEditTextListItem } from "@Components/DialogEditTextListItem";
import React from "react";

interface ModConfSections {
  sectionText: string;
  items: ModConfListItem<keyof ModConf>[];
}

interface ModConfListItem<K extends keyof ModConf> {
  confKey: K;
  text: string;
  /**
   * Used for the config requirement
   */
  logoText?: string | Array<string>;
  disabled?: boolean;
}

function ModConfActivity() {
  const { context } = useActivity();

  const { _modConf, setModConf } = useModConf();

  const renderToolbar = () => {
    return (
      <Toolbar modifier="noshadow">
        <Toolbar.Left>
          <Toolbar.BackButton onClick={context.popPage} />
        </Toolbar.Left>
        <Toolbar.Center>ModConf</Toolbar.Center>
      </Toolbar>
    );
  };

  const items: ModConfSections[] = React.useMemo<ModConfSections[]>(
    () => [
      {
        sectionText: "Command line interfaces",
        items: [
          {
            text: "Magisk install CLI",
            disabled: !Shell.isMagiskSU(),
            logoText: "assets/MagiskSULogo.png",
            confKey: "MSUCLI",
          },
          {
            text: "Magisk Busybox CLI",
            disabled: !Shell.isMagiskSU(),
            logoText: "assets/MagiskSULogo.png",
            confKey: "MSUBSU",
          },
          {
            text: "Magisk ResetProp CLI",
            disabled: !Shell.isMagiskSU(),
            logoText: "assets/MagiskSULogo.png",
            confKey: "MSURSP",
          },
          {
            text: "KernelSU install CLI",
            disabled: !Shell.isKernelSU(),
            logoText: "assets/KernelSULogo.png",
            confKey: "KSUCLI",
          },
          {
            text: "KernelSU Busybox CLI",
            disabled: !Shell.isKernelSU(),
            logoText: "assets/KernelSULogo.png",
            confKey: "KSUBSU",
          },
          {
            text: "KernelSU ResetProp CLI",
            disabled: !Shell.isKernelSU(),
            logoText: "assets/KernelSULogo.png",
            confKey: "KSURSP",
          },
          {
            text: "APatch install CLI",
            disabled: !Shell.isAPatchSU(),
            logoText: "assets/APatchSULogo.png",
            confKey: "ASUCLI",
          },
          {
            text: "APatch Busybox CLI",
            disabled: !Shell.isAPatchSU(),
            logoText: "assets/APatchSULogo.png",
            confKey: "ASUBSU",
          },
          {
            text: "APatch ResetProp CLI",
            disabled: !Shell.isAPatchSU(),
            logoText: "assets/APatchSULogo.png",
            confKey: "ASURSP",
          },
        ],
      },
      {
        sectionText: "Default paths",
        items: [
          {
            text: "Base path",
            confKey: "ADB",
          },
          {
            text: "Modules path",
            confKey: "MODULES",
          },
          {
            text: "Module work directory",
            confKey: "MODULECWD",
          },
          {
            text: "Module properties path",
            confKey: "PROPS",
          },
          {
            text: "Module system properties path",
            confKey: "SYSTEM",
          },
          {
            text: "Module SEPolicy rules path",
            confKey: "SEPOLICY",
          },
        ],
      },
      {
        sectionText: "Service paths",
        items: [
          {
            text: "Late service path",
            confKey: "LATESERVICE",
          },
          {
            text: "Post service path",
            confKey: "POSTSERVICE",
          },
          {
            text: "Post mount service path",
            disabled: !Shell.isKernelSU() || !Shell.isAPatchSU(),
            logoText: ["assets/KernelSULogo.png", "assets/APatchSULogo.png"],
            confKey: "POSTMOUNT",
          },
          {
            text: "Boot complete service path",
            disabled: !Shell.isKernelSU() || !Shell.isAPatchSU(),
            logoText: ["assets/KernelSULogo.png", "assets/APatchSULogo.png"],
            confKey: "BOOTCOMP",
          },
        ],
      },
      {
        sectionText: "Status paths",
        items: [
          {
            text: "Skip mount path",
            confKey: "SKIPMOUNT",
          },
          {
            text: "Disable path",
            confKey: "DISABLE",
          },
          {
            text: "Remove path",
            confKey: "REMOVE",
          },
          {
            text: "Update path",
            confKey: "UPDATE",
          },
        ],
      },
    ],
    []
  );

  return (
    <Page renderToolbar={renderToolbar}>
      <Page.RelativeContent zeroMargin>
        <Alert sx={{ m: { xs: 1, md: 1 } }} severity="error">
          I am not responsible for anything that may happen to your phone by changing these informations. You do it at your own risk and
          take the responsibility upon yourself and you are not to blame us or MMRL and its respected developers
        </Alert>

        {items.map((section) => (
          <>
            <List
              subheader={
                <ListSubheader sx={(theme) => ({ bgcolor: theme.palette.background.default })}>{section.sectionText}</ListSubheader>
              }
            >
              {section.items.map((item) => (
                <DialogEditTextListItem
                  inputLabel="Path"
                  type="text"
                  title={item.text}
                  disabled={item.disabled}
                  initialValue={_modConf[item.confKey]}
                  onSuccess={(value) => {
                    if (value) {
                      setModConf(item.confKey, value);
                    }
                  }}
                >
                  <StyledListItemText
                    primary={
                      <Box sx={{ display: "flex", alignItems: "center", justifyItems: "center" }}>
                        {item.logoText && Array.isArray(item.logoText) ? (
                          <>
                            <AvatarGroup sx={{ mr: 1 }}>
                              {item.logoText.map((logo) => (
                                <Avatar sx={{ borderRadius: "unset", width: "1rem", height: "1rem" }} src={logo} />
                              ))}
                            </AvatarGroup>
                          </>
                        ) : (
                          item.logoText && (
                            <Avatar sx={{ borderRadius: "unset", mr: 1, width: "1rem", height: "1rem" }} src={item.logoText} />
                          )
                        )}
                        [{item.confKey}]: {item.text}
                      </Box>
                    }
                    secondary={_modConf[item.confKey]}
                  />
                </DialogEditTextListItem>
              ))}
            </List>
            <Divider />
          </>
        ))}
      </Page.RelativeContent>
    </Page>
  );
}

export default ModConfActivity;
