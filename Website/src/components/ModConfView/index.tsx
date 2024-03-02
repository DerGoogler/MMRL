import Divider from "@mui/material/Divider";
import { useTheme } from "@Hooks/useTheme";
import { os } from "@Native/Os";
import { Page } from "@Components/onsenui/Page";
import Sandbox from "@nyariv/sandboxjs";
import { transform, registerPlugin } from "@babel/standalone";
import * as React from "react";
import { PluginObj } from "@babel/core";
import { libraries } from "./libs";
import { SuFile } from "@Native/SuFile";
import { ModFS, useModFS } from "@Hooks/useModFS";
import ini from "ini";
import yaml from "yaml";
import { useLog } from "@Hooks/native/useLog";
import { extname } from "@Util/extname";
import { Toolbar } from "@Components/onsenui/Toolbar";
import { IsolatedEval } from "@Native/IsolatedEval";
import { Typography } from "@mui/material";

const isoEval = new IsolatedEval<React.FunctionComponent<any> | undefined>();

export const ModConfView = React.forwardRef<any, { children: string; modid: string }>((props, ref) => {
  const { theme } = useTheme();
  const { modFS } = useModFS();

  const log = useLog(`Config-${props.modid}`);
  const format = React.useCallback<<K extends keyof ModFS>(key: K) => ModFS[K]>((key) => modFS(key, { MODID: props.modid }), []);

  const internalRequire = React.useCallback(
    (library: string) => {
      const findLib = libraries.find((lib) => library === lib.name);

      if (findLib) {
        return findLib.__esModule;
      } else {
        throw new Error(`Unable to find a library named "${library}"`);
      }
    },
    [props.modid]
  );

  const internalInclude = React.useCallback(
    (file: string, opt: { isolate: boolean } = { isolate: true }) => {
      if (opt.isolate) {
        file = `${format("CONFCWD")}/${file}`;
      }

      const impFile = new SuFile(file);

      if (impFile.exist()) {
        switch (extname(file)) {
          case ".json":
            return JSON.parse(impFile.read());
          case ".yml":
          case ".yaml":
            return yaml.parse(impFile.read());
          case ".properties":
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
        throw new Error(`Unable to find a file named "${file}"`);
      }
    },
    [props.modid]
  );

  const internalFetch = React.useCallback(
    (input: string | URL | Request, init?: RequestInit | undefined) => {
      return fetch(input, init);
    },
    [props.modid]
  );

  const box = React.useCallback(
    (code: string) =>
      isoEval.compile(code, {
        log: log,
        modid: props.modid,
        modpath: (path: string) => `${format("MODULECWD")}/${path}`,
        confpath: (path: string) => `${format("CONFCWD")}/${path}`,
        window: {
          fetch: internalFetch,
          open(href: string) {
            os.open(href, {
              target: "_blank",
              features: {
                color: theme.palette.primary.main,
              },
            });
          },
        },
        require: internalRequire,
        include: internalInclude,
        fetch: internalFetch,
        eval: () => {
          throw new Error("Module tried to execute eval()!");
        },
      }),
    []
  );
  const Component = box(props.children as string);

  if (Component) {
    return <Component />;
  } else {
    return (
      <Page
        sx={{ p: 1 }}
        renderToolbar={() => (
          <Toolbar modifier="noshadow">
            <Toolbar.Center>Error</Toolbar.Center>
          </Toolbar>
        )}
      >
        <Typography>An error occurred, either there is a syntax mistake or something</Typography>
      </Page>
    );
  }
});
