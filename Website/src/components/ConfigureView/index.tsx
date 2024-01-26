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

export const ConfigureView = React.forwardRef<any, { code: string; modid: string }>((props, ref) => {
  const { theme } = useTheme();
  const { modConf } = useModConf();

  const log = useLog(`Config-${props.modid}`);
  const format = React.useCallback<<K extends keyof ModConf>(key: K) => ModConf[K]>((key) => modConf(key, { MODID: props.modid }), []);

  const customRequire = React.useCallback((file: string, opt?: any) => {
    const isLocalFile = /^[./]/.test(file);
    const absolutePath = file;

    if (SuFile.exist(absolutePath)) {
      const fileExt = opt && opt.ignoreExt ? extname(absolutePath) : "";

      if (fileExt === ".json") {
        return JSON.parse(SuFile.read(absolutePath));
      } else if (fileExt === ".yaml" || fileExt === ".yml") {
        return yaml.parse(SuFile.read(absolutePath));
      } else if (fileExt === ".ini" || fileExt === ".props") {
        return ini.parse(SuFile.read(absolutePath));
      } else {
        const code = SuFile.read(absolutePath);
        return box(code);
      }
    } else {
      return libraries.find((lib) => absolutePath === lib.name)?.__esModule;
    }
  }, []);

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
          document: document,
          require: customRequire,
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
        .run();
    },

    []
  );
  const Component = box(props.code as string);
  const container = React.useRef(null);

  if (Component) {
    return <Component />;
  } else {
    return (
      <Page>
        <div>An error occurred, either there is a syntax mistake or something</div>
      </Page>
    );
  }
});

const CHAR_FORWARD_SLASH = 47; /* / */
const CHAR_DOT = 46; /* . */

function extname(path: string) {
  if (typeof path !== "string") {
    throw new TypeError(`The "path" argument must be of type string. Received type ${typeof path}`);
  }

  let startDot = -1;
  let startPart = 0;
  let end = -1;
  let matchedSlash = true;
  // Track the state of characters (if any) we see before our first dot and
  // after any path separator we find
  let preDotState = 0;
  for (let i = path.length - 1; i >= 0; --i) {
    let code = path.charCodeAt(i);
    if (code === CHAR_FORWARD_SLASH) {
      // If we reached a path separator that was not part of a set of path
      // separators at the end of the string, stop now
      if (!matchedSlash) {
        startPart = i + 1;
        break;
      }
      continue;
    }
    if (end === -1) {
      // We saw the first non-path separator, mark this as the end of our
      // extension
      matchedSlash = false;
      end = i + 1;
    }
    if (code === CHAR_DOT) {
      // If this is our first dot, mark it as the start of our extension
      if (startDot === -1) {
        startDot = i;
      } else if (preDotState !== 1) {
        preDotState = 1;
      }
    } else if (startDot !== -1) {
      // We saw a non-dot and non-path separator before our dot, so we should
      // have a good chance at having a non-empty extension
      preDotState = -1;
    }
  }

  if (
    startDot === -1 ||
    end === -1 ||
    // We saw a non-dot character immediately before the dot
    preDotState === 0 ||
    // The (right-most) trimmed path component is exactly '..'
    (preDotState === 1 && startDot === end - 1 && startDot === startPart + 1)
  ) {
    return "";
  }
  return path.slice(startDot, end);
}
