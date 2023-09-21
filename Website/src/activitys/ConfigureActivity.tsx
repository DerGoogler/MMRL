import { Page } from "@Components/onsenui/Page";
import { Toolbar } from "@Components/onsenui/Toolbar";
import { useActivity } from "@Hooks/useActivity";
import { useStrings } from "@Hooks/useStrings";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import { DialogEditTextListItem, DialogEditTextListItemProps } from "@Components/DialogEditTextListItem";
import Divider from "@mui/material/Divider";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import ListSubheader from "@mui/material/ListSubheader";
import React from "react";
import { SuFile } from "@Native/SuFile";
import { StyledListItemText } from "@Components/StyledListItemText";
import { Android12Switch } from "@Components/Android12Switch";
import { os } from "@Native/Os";
import { useLog } from "@Hooks/native/useLog";
import { useTheme } from "@Hooks/useTheme";

import JsxParser from "react-jsx-parser";
import Box from "@mui/material/Box";
import { useSettings } from "@Hooks/useSettings";
import { Shell } from "@Native/Shell";
import InputAdornment from "@mui/material/InputAdornment";
import { styled } from "@mui/material";

type Extra = {
  modulename: string;
  moduleid: string;
};

const OnClick = (props: any) => {
  return <Box onClick={props.handler}>{props.children}</Box>;
};

const StyledListSubheader = styled(ListSubheader)({ backgroundColor: "transparent" });

const Switch = (props: any) => {
  const _scope = props.scope || "mmrl";
  const [state, setState] = React.useState<boolean>(
    window.__properties__.get(`persist.${_scope}.${props.id.substring(0, 19)}`, props.defaultState) === "true" ? true : false
  );

  return (
    <Android12Switch
      edge="end"
      onChange={(e: any) => {
        Shell.cmd(`setprop "persist.${_scope}.${props.id.substring(0, 19)}" "${e.target.checked}"`).exec();
        setState(e.target.checked);
      }}
      checked={state}
    />
  );
};

const DialogEditListItem = ({
  initialValue,
  onSuccess,
  id,
  scope,
  ...rest
}: DialogEditTextListItemProps & { id: string; scope: string }) => {
  const _scope = scope || "mmrl";
  const [state, setState] = React.useState<string>(window.__properties__.get(`persist.${_scope}.${id.substring(0, 19)}`, initialValue));

  return (
    <DialogEditTextListItem
      {...rest}
      counter
      maxLength={92}
      initialValue={state}
      onSuccess={(value) => {
        if (value) {
          Shell.cmd(`setprop "persist.${_scope}.${id.substring(0, 19)}" "${value}"`).exec();
          setState(value);
        }
      }}
    />
  );
};

const ConfigureActivity = () => {
  const log = useLog("ConfigureActivity");
  const { strings } = useStrings();
  const { settings } = useSettings();
  const { theme } = useTheme();
  const { context, extra } = useActivity<Extra>();

  const config: string = React.useMemo(() => {
    const file = new SuFile(`${settings.mod_tree}/${extra.moduleid}/system/usr/share/mmrl/config/${extra.moduleid}.mdx`);

    if (file.exist()) {
      return file.read();
    } else {
      return `<p>Config file not found</p>`;
    }
  }, []);

  const renderToolbar = () => {
    return (
      <Toolbar modifier="noshadow">
        <Toolbar.Left>
          <Toolbar.BackButton onClick={context.popPage} />
        </Toolbar.Left>
        <Toolbar.Center>Configure {extra.modulename}</Toolbar.Center>
      </Toolbar>
    );
  };

  return (
    <Page renderToolbar={renderToolbar}>
      {/* @ts-ignore*/}
      <JsxParser
        bindings={{
          openLink: (url: string) => {
            return () => {
              os.open(url, {
                target: "_blank",
                features: {
                  color: theme.palette.primary.main,
                },
              });
            };
          },
          getprop: (key: string, def: string) => {
            return window.__properties__.get(key, def);
          },
        }}
        components={{
          OnClick: OnClick,
          Box: Box,
          Alert: Alert,
          AlertTitle: AlertTitle,
          InputAdornment: InputAdornment,
          List: List,
          ListItem: ListItem,
          ListItemButton: ListItemButton,
          ListItemText: StyledListItemText,
          ListItemDialogEditText: DialogEditListItem,
          ListSubheader: StyledListSubheader,
          Switch: Switch,
          Divider: Divider,
        }}
        jsx={config}
      />
    </Page>
  );
};

export { ConfigureActivity };
