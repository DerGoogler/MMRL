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
import AppBar from "@mui/material/AppBar";
import JsxParser from "react-jsx-parser";
import Box from "@mui/material/Box";
import { Shell } from "@Native/Shell";
import InputAdornment from "@mui/material/InputAdornment";
import { Paper, SxProps, Typography, styled } from "@mui/material";
import { useNativeProperties } from "@Hooks/useNativeProperties";
import { Markup } from "./Markdown";
import CodeOutlinedIcon from "@mui/icons-material/CodeOutlined";
import Video from "./dapi/Video";
import { DiscordWidget } from "./dapi/DiscordWidget";
import Anchor from "./dapi/Anchor";

import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { formatString, useSettings } from "@Hooks/useSettings";
import { SuFile } from "@Native/SuFile";

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

const PromoBanner = (props: React.PropsWithChildren & { sx?: SxProps }) => {
  const { theme, scheme } = useTheme();

  return (
    <Paper
      sx={{
        ...props.sx,
        color: theme.palette.text.primary,
        borderRadius: "12px",
        transition: "border 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, box-shadow 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
        overflow: "hidden",
        // minWidth: "280px",
        // maxWidth: "360px",
        // minHeight: "280px",
        display: "flex",
        flexDirection: "column",
        padding: "24px",
        background: `linear-gradient(to right bottom, ${scheme[500]}, ${scheme[600]} 120%)`,
        boxShadow: "rgba(0, 0, 0, 0.1) 0px 20px 25px, rgba(0, 0, 0, 0.04) 0px 10px 10px",
      }}
    >
      <Box
        sx={{
          marginTop: "auto",
          marginBottom: "auto",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "left",
            alignSelf: "center",
            alignItems: "center",
          }}
        >
          <CodeOutlinedIcon
            sx={{
              display: "flex",
              mr: 0.5,
              WebkitUserSelect: "none",
              MozUserSelect: "none",
              MsUserSelect: "none",
              userSelect: "none",
              width: "1em",
              height: "1em",
              fill: "#fff",
              WebkitFlexShrink: "0",
              MsFlexNegative: "0",
              flexShrink: "0",
              WebkitTransition: "fill 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
              transition: "fill 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
              fontSize: "1.5rem",
            }}
          />
          <Typography
            sx={{
              color: "#fff",
              display: "flex",
              justifyContent: "left",
              alignContent: "center",
              alignSelf: "center",
              mr: 2,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              textDecoration: "none",
            }}
          >
            MMRL
          </Typography>
        </Box>

        <Typography
          sx={{
            color: "#fff",
          }}
          variant="body1"
        >
          {props.children ? props.children : "The only high customizable root module manager. Always check our releases!"}
        </Typography>
      </Box>
    </Paper>
  );
};

const Import = (props: { file?: str }) => {
  const [data, setData] = React.useState<str>("");
  const { _modConf } = useSettings();

  if (!props.file || typeof props.file != "string") {
    return <>{data}</>;
  }

  React.useEffect(() => {
    if (props.file) {
      const fil = new SuFile(props.file);
      if (fil.exist()) {
        setData(fil.read());
      }
    }
  }, [props.file]);

  return <>{data}</>;
};

const Markdown = (props: { children?: string; fetch?: string }) => {
  const [text, setText] = React.useState<string>(props.children ? props.children : "");

  React.useEffect(() => {
    if (props.fetch) {
      fetch(props.fetch)
        .then((res) => res.text())
        .then((t) => {
          setText(t);
        });
    }
  }, [fetch]);

  return <Markup children={text} />;
};

export const ConfigureView = (props: React.PropsWithChildren & { modid?: string }) => {
  const { theme, scheme, shade } = useTheme();

  const [value, setValue] = React.useState("1");
  const { _modConf } = useSettings();

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <TabContext value={value}>
      {/* @ts-ignore */}
      <JsxParser
        disableFragments
        bindings={{
          // scheme: scheme,
          // theme: theme,
          // shade: shade,
          openLink: (url: str) => {
            return () => {
              os.open(url, {
                target: "_blank",
                features: {
                  color: theme.palette.primary.main,
                },
              });
            };
          },
          modpath: (path: str) => formatString("<MODULES>/<MODID><PATH>", { ..._modConf, PATH: path, MODID: props.modid }),
          handleTabChange: () => handleChange,
          tabValue: value,
          getprop: (key: str, def: str) => {
            return window.__properties__.get(key, def);
          },
        }}
        blacklistedAttrs={[]}
        components={{
          Import: Import,
          AppBar: AppBar,
          TabContext: TabContext,
          Tab: Tab,
          TabList: TabList,
          TabPanel: TabPanel,
          Video: Video,
          DiscordWidget: DiscordWidget,
          // Better support for browsers
          a: Anchor,
          PromoBanner: PromoBanner,
          Markdown: Markdown,
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
    </TabContext>
  );
};
