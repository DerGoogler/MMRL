import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import { DialogEditTextListItem, DialogEditTextListItemProps } from "@Components/DialogEditTextListItem";
import Divider from "@mui/material/Divider";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import ListSubheader from "@mui/material/ListSubheader";
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

import Sandbox from "@nyariv/sandboxjs";
import { transform, registerPlugin } from "@babel/standalone";
import * as React from "react";
import * as Mui from "@mui/material";
import * as Lab from "@mui/lab";
import * as Icon from "@mui/icons-material";
import { PreviewErrorBoundaryChildren } from "@Activitys/PlaygroundsActivity";
import { PluginObj } from "@babel/core";
import { Page } from "./onsenui/Page";
import { BottomToolbar } from "./onsenui/BottomToolbar";
import { Tabbar } from "./onsenui/Tabbar";
import { useNativeStorage } from "@Hooks/useNativeStorage";

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

const DialogEditListItem = ({ children, ...rest }: DialogEditTextListItemProps) => (
  <DialogEditTextListItem {...rest} counter maxLength={92} children={children} />
);
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

function plugin({ types: t }): PluginObj {
  return {
    visitor: {
      ExportDefaultDeclaration(path) {
        path.replaceWith(t.returnStatement(path.node.declaration));
      },
    },
  };
}

registerPlugin("plugin", plugin);

function parseCode(data: string): string {
  try {
    const { code } = transform(data, {
      filename: "index.jsx",
      presets: ["typescript", "react"],
      plugins: [
        "plugin",
        "transform-computed-properties",
        ["transform-destructuring", { loose: true }],
        "transform-modules-commonjs",
        "transform-object-rest-spread",
        "syntax-class-properties",
        "transform-class-properties",
        "syntax-object-rest-spread",
      ],
    });
    return code as string;
  } catch (err) {
    console.error("Error parsing code: ", err);
    return "";
  }
}

const prototypeWhitelist = Sandbox.SAFE_PROTOTYPES;
prototypeWhitelist.set(Object, new Set());

const libraries = [
  {
    name: "react",
    lib: React,
  },
  {
    name: "@mui/material",
    lib: Mui,
  },
  {
    name: "@mui/lab",
    lib: Lab,
  },
  {
    name: "@mui/icons-material",
    lib: Icon,
  },
  {
    name: "@mmrl/ui",
    lib: {
      Anchor: Anchor,
      Page: Page,
      BottomToolbar: BottomToolbar,
      Tabbar: Tabbar,
      Video: Video,
      DiscordWidget: DiscordWidget,
      PromoBanner: PromoBanner,
      Markdown: Markdown,
      OnClick: OnClick,
    },
  },
  {
    name: "@mmrl/hooks",
    lib: {
      useNativeProperties: useNativeProperties,
      useNativeStorage: useNativeStorage,
      useTheme: useTheme,
    },
  },

  {
    name: "@mmrl/native",
    lib: {
      // SuFile: SuFile,
    },
  },
];

const globals = {
  ...Sandbox.SAFE_GLOBALS,
  Object,
  require(id: string) {
    return libraries.find((lib) => id === lib.name)?.lib;
  },
};

const sandbox = new Sandbox({ globals, prototypeWhitelist });

const MMRL_Hooks = {};

const MMRL_UI = {};

const scope = {
  // Better support for browsers
  a: Anchor,
  List: List,
  ListItem: ListItem,
  ListItemButton: ListItemButton,
  ListItemText: StyledListItemText,
  ListItemDialogEditText: DialogEditListItem,
  ListSubheader: StyledListSubheader,
  Switch: Android12Switch,
  Divider: Divider,
};

export const ConfigureView = React.memo<PreviewErrorBoundaryChildren>((props) => {
  const { theme, scheme, shade } = useTheme();
  const Component = sandbox
    .compile<React.FunctionComponent<any>>(parseCode(props.children as string))({
      modid: props.modid,
      window: {
        open(href: string) {
          os.open(href, {
            target: "_blank",
            features: {
              color: theme.palette.primary.main,
            },
          });
        },
      },
      ...scope,
    })
    .run();

  return <Component />;
});
