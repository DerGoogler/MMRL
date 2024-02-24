import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import Divider from "@mui/material/Divider";
import { StyledListItemText } from "@Components/StyledListItemText";
import { Android12Switch } from "@Components/Android12Switch";
import { useTheme } from "@Hooks/useTheme";
import { os } from "@Native/Os";
import { Page } from "@Components/onsenui/Page";
import Sandbox from "@nyariv/sandboxjs";
import { transform, registerPlugin } from "@babel/standalone";
import * as React from "react";
import { PluginObj } from "@babel/core";
import { globals, libraries } from "./libs";
import { DialogEditListItem, StyledListSubheader } from "./components";
import { SuFile, wasmFs } from "@Native/SuFile";
import { ModFS, useModFS } from "@Hooks/useModFS";
import ini from "ini";
import yaml from "yaml";
import { useLog } from "@Hooks/native/useLog";
import { extname } from "@Util/extname";
import { formatString } from "@Util/stringFormat";
import { Toolbar } from "@Components/onsenui/Toolbar";

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
    console.info((err as Error).message);
    return "";
  }
}

const prototypeWhitelist = Sandbox.SAFE_PROTOTYPES;
prototypeWhitelist.set(Object, new Set());

const sandbox = new Sandbox({ globals, prototypeWhitelist });

const scope = {
  List: List,
  ListItem: ListItem,
  ListItemButton: ListItemButton,
  ListItemText: StyledListItemText,
  ListItemDialogEditText: DialogEditListItem,
  ListSubheader: StyledListSubheader,
  Switch: Android12Switch,
  Divider: Divider,
};

export const ConfigureView = React.forwardRef<any, { children: string; modid: string }>((props, ref) => {
  const { theme } = useTheme();
  const { modFS, _modFS } = useModFS();

  const log = useLog(`Config-${props.modid}`);
  const format = React.useCallback<<K extends keyof ModFS>(key: K) => ModFS[K]>((key) => modFS(key, { MODID: props.modid }), []);

  const box = React.useCallback(
    (code: string) => {
      return sandbox
        .compile<React.FunctionComponent<any> | undefined>(
          parseCode(code),
          true
        )({
          log: log,
          modid: props.modid,
          modpath: (path: string) => `${format("MODULECWD")}/${path}`,
          confpath: (path: string) => `${format("CONFCWD")}/${path}`,
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
          require: (file: string) => {
            const impFile = new SuFile(formatString(file, { MODID: props.modid, ..._modFS }));

            if (impFile.exist()) {
              switch (extname(file)) {
                case ".json":
                  return JSON.parse(impFile.read());
                case ".yml":
                case ".yaml":
                  return yaml.parse(impFile.read());
                case ".prop":
                case ".ini":
                  return ini.parse(impFile.read());
                case ".js":
                case ".jsx":
                  return box(impFile.read());
                default:
                  return impFile.read();
              }
            } else {
              return libraries.find((lib) => file === lib.name)?.__esModule;
            }
          },
          ...scope,
        })
        .run();
    },

    []
  );
  const Component = box(props.children as string);

  if (Component) {
    return <Component />;
  } else {
    return (
      <Page
        renderToolbar={() => (
          <Toolbar>
            <Toolbar.Center>Error</Toolbar.Center>
          </Toolbar>
        )}
      >
        <div>An error occurred, either there is a syntax mistake or something</div>
      </Page>
    );
  }
});
