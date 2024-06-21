import { useLog } from "@Hooks/native/useLog";
import { ModFS, useModFS } from "@Hooks/useModFS";
import { useTheme } from "@Hooks/useTheme";
import { IsolatedEval } from "@Native/IsolatedEval";
import { os } from "@Native/Os";
import * as React from "react";
import { libraries } from "./libs";

export const ModConfView = React.forwardRef<any, { children: string; modid: string }>((props, ref) => {
  const { theme } = useTheme();
  const { modFS } = useModFS();

  const { modid, children } = props;
  const log = useLog(`Config-${modid}`);
  const format = React.useCallback<<K extends keyof ModFS>(key: K) => ModFS[K]>((key) => modFS(key, { MODID: modid }), []);

  const internalFetch = React.useCallback(
    (input: string | URL | Request, init?: RequestInit | undefined) => {
      return fetch(input, init);
    },
    [modid]
  );

  const isoEval = React.useMemo(
    () =>
      new IsolatedEval<React.FunctionComponent<any>>(libraries, format("CONFINDEX"), format("CONFCWD"), {
        log: log,
        __idname: modid,
        __filename: format("CONFINDEX"),
        __dirname: format("CONFCWD"),
        __moddirname: format("MODULECWD"),
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
        fetch: internalFetch,

        // @deprecated
        modid: modid,
        modpath: (path: string) => `${format("MODULECWD")}/${path}`,
        confpath: (path: string) => `${format("CONFCWD")}/${path}`,
        include: (modulePath: string, opt: { isolate: boolean } = { isolate: false }) => {
          if (opt.isolate) {
            modulePath = `${format("CONFCWD")}/${modulePath}`;
          }

          return isoEval.require(modulePath);
        },
      }),
    [children, modid]
  );

  const box = React.useCallback((code: string) => isoEval.compileTransform(code), []);

  const Component = box(children as string);

  if (Component.exports.default) {
    return <Component.exports.default />;
  }

  return <></>;
});
