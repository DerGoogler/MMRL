import React, { createContext, useContext } from "react";
import { defaultComposer } from "default-composer";
import { useNativeStorage } from "./useNativeStorage";
import { SetStateAction } from "./useStateCallback";
import { formatObjectEntries, formatString } from "@Util/stringFormat";

export interface ModFS {
  //cli
  MSUCLI: string;
  MSUBSU: string;
  MSURSP: string;
  KSUCLI: string;
  KSUBSU: string;
  KSURSP: string;
  ASUCLI: string;
  ASUBSU: string;
  ASURSP: string;

  // default paths
  ADB: string;
  MODULES: string;
  MODULECWD: string;
  PROPS: string;
  SYSTEM: string;
  SEPOLICY: string;
  CONFIG: string;

  // service paths
  LATESERVICE: string;
  POSTSERVICE: string;
  POSTMOUNT: string;
  BOOTCOMP: string;

  // status paths
  SKIPMOUNT: string;
  DISABLE: string;
  REMOVE: string;
  UPDATE: string;

  // others
  MMRLINI: string;
  EXPLORE_INSTALL: string;
  LOCAL_INSTALL: string;
  CONFCWD: string;
  CONFINDEX: string;
}

export const INITIAL_MOD_CONF: ModFS = {
  //cli
  MSUCLI: "/system/bin/magisk",
  MSUBSU: "<ADB>/magisk/busybox",
  MSURSP: "/system/bin/resetprop",
  KSUCLI: "<ADB>/ksu/bin/ksud",
  KSUBSU: "<ADB>/ksu/bin/busybox",
  KSURSP: "<ADB>/ksu/bin/resetprop",
  ASUCLI: "<ADB>/ap/bin/apd",
  ASUBSU: "<ADB>/ap/bin/busybox",
  ASURSP: "<ADB>/ap/bin/resetprop",

  // default paths
  ADB: "/data/adb",
  MODULES: "<ADB>/modules",
  MODULECWD: "<MODULES>/<MODID>",
  PROPS: "<MODULECWD>/module.prop",
  SYSTEM: "<MODULECWD>/system.prop",
  SEPOLICY: "<MODULECWD>/sepolicy.rule",
  CONFIG: `<MODULECWD>/system/usr/share/mmrl/config/<MODID>.mdx`,

  // service paths
  LATESERVICE: "<MODULECWD>/service.sh",
  POSTSERVICE: "<MODULECWD>/post-fs-data.sh",
  POSTMOUNT: "<MODULECWD>/post-mount.sh",
  BOOTCOMP: "<MODULECWD>/boot-completed.sh",

  // status paths
  SKIPMOUNT: "<MODULECWD>/skip_mount",
  DISABLE: "<MODULECWD>/disable",
  REMOVE: "<MODULECWD>/remove",
  UPDATE: "<MODULECWD>/update",

  // others
  MMRLINI: "<MODULES>/mmrl_install_tools",
  CONFCWD: "<MODULECWD>/system/usr/share/mmrl/config/<MODID>",
  EXPLORE_INSTALL: "<MMRLINI>/system/usr/share/mmrl/bin/mmrl_explore_install_v5",
  LOCAL_INSTALL: "<MMRLINI>/system/usr/share/mmrl/bin/mmrl_local_install_v5",
  CONFINDEX: "<CONFCWD>/index.jsx",
};

export interface ModConfContext {
  _modFS: ModFS;
  __modFS: ModFS;
  modFS<K extends keyof ModFS>(key: K, adds?: Record<string, any>): ModFS[K];
  setModFS<K extends keyof ModFS>(key: K, state: SetStateAction<ModFS[K]>, callback?: (state: ModFS[K]) => void): void;
}

export const ModConfContext = createContext<ModConfContext>({
  _modFS: INITIAL_MOD_CONF,
  __modFS: INITIAL_MOD_CONF,
  modFS<K extends keyof ModFS>(key: K, adds?: Record<string, any>) {
    return key;
  },
  setModFS<K extends keyof ModFS>(key: K, state: SetStateAction<ModFS[K]>, callback?: (state: ModFS[K]) => void) {},
});

export const useModFS = () => {
  return useContext(ModConfContext);
};

export const ModFSProvider = (props: React.PropsWithChildren) => {
  const [modFS, setModFS] = useNativeStorage("modfs_v1", INITIAL_MOD_CONF);

  const contextValue = React.useMemo(
    () => ({
      _modFS: defaultComposer(INITIAL_MOD_CONF, modFS),
      __modFS: formatObjectEntries<ModFS>(defaultComposer(INITIAL_MOD_CONF, modFS)),
      modFS: (key, adds) => {
        return formatString(defaultComposer(INITIAL_MOD_CONF, modFS)[key], { ...modFS, ...adds });
      },
      setModFS: (name, state, callback) => {
        setModFS(
          (prev) => {
            const newValue = state instanceof Function ? state(prev[name]) : state;
            return {
              ...prev,
              [name]: newValue,
            };
          },
          (state) => callback && callback(state[name])
        );
      },
    }),
    [modFS]
  );

  return <ModConfContext.Provider value={contextValue} children={props.children} />;
};
