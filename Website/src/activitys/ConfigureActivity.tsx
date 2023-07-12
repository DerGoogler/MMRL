import { Page } from "@Components/onsenui/Page";
import { Toolbar } from "@Components/onsenui/Toolbar";
import { useActivity } from "@Hooks/useActivity";
import { useStrings } from "@Hooks/useStrings";
import { Divider, List, ListItem, ListItemButton, ListSubheader } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import React from "react";
import File from "@Native/File";
import { StyledListItemText } from "@Components/StyledListItemText";
import { Android12Switch } from "@Components/Android12Switch";
import { os } from "@Native/Os";
import { useLog } from "@Hooks/native/useLog";
import { useTheme } from "@Hooks/useTheme";

type Extra = {
  modulename: string;
};

namespace ConfigList {
  export interface UseSwitch {
    key: string;
  }

  export interface UseOpen {
    url: string;
  }

  export interface Element {
    type: "item" | "button";
    use_switch?: UseSwitch;
    use_open?: UseOpen;
    text: string;
    subtext?: string;
  }

  export interface Base {
    list_name: string;
    list_elements: Element[];
  }
}

const ConfigureActivity = () => {
  const log = useLog("ConfigureActivity");
  const { strings } = useStrings();
  const { theme } = useTheme();
  const { context, extra } = useActivity<Extra>();

  const config: ConfigList.Base[] = React.useMemo(() => {
    const file = new File(`/data/adb/modules/${extra.modulename}/mmrl-config.json`);

    if (file.exist()) {
      const value = file.read();
      try {
        return value === "undefined" ? undefined : JSON.parse(value ?? "");
      } catch (e) {
        log.i("parsing error on " + value);
        return e as Error;
      }
    }
  }, []);

  const renderToolbar = () => {
    return (
      <Toolbar modifier="noshadow">
        <Toolbar.Left>
          <Toolbar.Button icon={ArrowBackIcon} onClick={context.popPage} />
        </Toolbar.Left>
        <Toolbar.Center>Configure {extra.modulename}</Toolbar.Center>
      </Toolbar>
    );
  };

  return (
    <Page renderToolbar={renderToolbar}>
      {config.map((entry: ConfigList.Base) => {
        return (
          <>
            <List
              subheader={<ListSubheader sx={(theme) => ({ bgcolor: theme.palette.background.default })}>{entry.list_name}</ListSubheader>}
            >
              {entry.list_elements.map((element) => {
                switch (element.type) {
                  case "item":
                    return (
                      <ListItem>
                        <StyledListItemText id={`list-label-${element.text}`} primary={element.text} secondary={element.subtext} />

                        {element.use_switch && (
                          <Android12Switch
                            edge="end"
                            // onChange={(e: any) => {
                            //   setSettings("darkmode", e.target.checked);
                            // }}
                            // checked={settings.darkmode}
                            inputProps={{
                              "aria-labelledby": `list-label-${element.text}`,
                            }}
                          />
                        )}
                      </ListItem>
                    );
                  case "button":
                    return (
                      <ListItemButton
                        onClick={() => {
                          if (element.use_open) {
                            os.open(element.use_open.url, {
                              target: "_blank",
                              features: {
                                color: theme.palette.primary.main,
                              },
                            });
                          }
                        }}
                      >
                        <StyledListItemText primary={element.text} secondary={element.subtext} />
                      </ListItemButton>
                    );
                }
              })}
            </List>

            <Divider />
          </>
        );
      })}
    </Page>
  );
};

export { ConfigureActivity };
