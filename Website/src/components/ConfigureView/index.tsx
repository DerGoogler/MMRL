import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import Divider from "@mui/material/Divider";
import { StyledListItemText } from "@Components/StyledListItemText";
import { Android12Switch } from "@Components/Android12Switch";
import { PreviewErrorBoundaryChildren } from "@Activitys/PlaygroundsActivity";
import { useTheme } from "@Hooks/useTheme";
import { os } from "@Native/Os";
import Sandbox from "@nyariv/sandboxjs";
import { transform, registerPlugin } from "@babel/standalone";
import * as React from "react";
import { PluginObj } from "@babel/core";
import { globals, libraries } from "./libs";
import { DialogEditListItem, StyledListSubheader } from "./components";
import { SuFile, wasmFs } from "@Native/SuFile";
import { ModConf, useModConf } from "@Hooks/useModConf";
import ini from "ini";
import yaml from "yaml";
import { useLog } from "@Hooks/native/useLog";

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

export const ConfigureView = React.memo<PreviewErrorBoundaryChildren>((props) => {
  const { theme } = useTheme();
  const { modConf } = useModConf();
  const log = useLog(`Config-${props.modid}`);

  const format = React.useCallback<<K extends keyof ModConf>(key: K) => ModConf[K]>((key) => modConf(key, { MODID: props.modid }), []);

  React.useEffect(() => {
    wasmFs.volume.fromJSON(
      {
        [format("PROPS")]: `id=${props.modid}`,
        [format("CONFINDEX")]: 'export default "DO NOT USE THIS FILE OR IMPORT IT!"',
      },
      format("CONFCWD")
    );
  }, [props.modid]);

  const box = React.useCallback(
    (code: string) =>
      sandbox
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
          require(id: string) {
            if (id.startsWith("!conf/")) {
              const filename = id.replace(/!conf\/(.+)/gm, `${format("CONFCWD")}/$1`);
              const file = new SuFile(filename);
              if (file.exist()) {
                return box(file.read());
              } else {
                return `Imported \"${filename}\" file not found`;
              }
            } else {
              return libraries.find((lib) => id === lib.name)?.__esModule;
            }
          },
          include(file: string, opt?: { ignoreCwd: boolean }) {
            const __raw__filename = !opt?.ignoreCwd ? `${format("CONFCWD")}/${file}` : file;
            const __file = new SuFile(__raw__filename);
            if (__file.exist()) {
              if (__raw__filename.endsWith(".jsx") || __raw__filename.endsWith(".js")) {
                return box(__file.read());
              } else if (__raw__filename.endsWith(".yaml") || __raw__filename.endsWith(".yml")) {
                return yaml.parse(__file.read());
              } else if (__raw__filename.endsWith(".json")) {
                return JSON.parse(__file.read());
              } else if (__raw__filename.endsWith(".prop") || __raw__filename.endsWith(".properties") || __raw__filename.endsWith(".ini")) {
                return ini.parse(__file.read());
              } else {
                return __file.read();
              }
            } else {
              log.e(__raw__filename + " not found");
              return undefined;
            }
          },
          ...scope,
        })
        .run(),
    []
  );
  const Component = box(props.children as string);

  if (Component) {
    return <Component />;
  } else {
    return <div>export is undefined</div>;
  }
});
