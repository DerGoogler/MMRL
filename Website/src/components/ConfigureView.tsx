import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import { DialogEditTextListItem, DialogEditTextListItemProps } from "@Components/DialogEditTextListItem";
import Divider from "@mui/material/Divider";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import ListSubheader from "@mui/material/ListSubheader";
import React from "react";
import { StyledListItemText } from "@Components/StyledListItemText";
import { Android12Switch } from "@Components/Android12Switch";
import { os } from "@Native/Os";
import { useTheme } from "@Hooks/useTheme";
import JsxParser from "react-jsx-parser";
import Box from "@mui/material/Box";
import { Shell } from "@Native/Shell";
import InputAdornment from "@mui/material/InputAdornment";
import { styled } from "@mui/material";
import { useNativeProperties } from "@Hooks/useNativeProperties";

const OnClick = (props: any) => {
  return <Box onClick={props.handler}>{props.children}</Box>;
};

const StyledListSubheader = styled(ListSubheader)({ backgroundColor: "transparent" });

const Switch = (props: any) => {
  const _scope = props.scope || "mmrl";
  const [state, setState] = useNativeProperties(`persist.${_scope}.${props.id.substring(0, 19)}`, String(props.defaultState));

  return (
    <Android12Switch
      edge="end"
      onChange={(e: any) => {
        setState(String(e.target.checked));
      }}
      checked={state === "true"}
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
  const [state, setState] = useNativeProperties(`persist.${_scope}.${id.substring(0, 19)}`, initialValue);

  return (
    <DialogEditTextListItem
      {...rest}
      counter
      maxLength={92}
      initialValue={state}
      onSuccess={(value) => {
        if (value) {
          setState(value);
        }
      }}
    />
  );
};

export const ConfigureView = (props: React.PropsWithChildren) => {
  const { theme } = useTheme();
  return (
    // @ts-ignore
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
      jsx={props.children}
    />
  );
};
