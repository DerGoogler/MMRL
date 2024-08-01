import { useLog } from "@Hooks/native/useLog";
import { ModFS, useModFS } from "@Hooks/useModFS";
import { IsolatedEval, IsolatedEvalOptions } from "@Native/IsolatedEval";
import { os } from "@Native/Os";
import * as React from "react";
import { libraries } from "./libs";

interface ModConfViewProps {
  children: string;
  modid: string;
  indexFile: string;
  cwd: string;
  standaloneFile?: string;
}

export const ModConfView = (props: ModConfViewProps) => {
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

  const isoEval = React.useMemo(() => {
    const options: IsolatedEvalOptions = {
      libraries: libraries,
      indexFile: props.indexFile,
      cwd: props.cwd,
      scope: {
        log: log,
        __idname: modid,
        __filename: props.indexFile,
        __dirname: props.cwd,
        __modpath: format("MODULECWD"),
        window: {
          fetch: internalFetch,
          open: os.openURL,
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
      },
      standaloneFile: props.standaloneFile,
    };

    return new IsolatedEval<React.FunctionComponent<any>>(options);
  }, [children, modid]);

  const box = React.useCallback((code: string) => isoEval.compileTransform(code), []);

  const Component = box(children as string);

  if (Component.exports.default) {
    return <Component.exports.default />;
  }

  return <></>;
};
