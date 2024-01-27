import React, { createContext, useContext } from "react";
import { defaultComposer } from "default-composer";
import { useNativeStorage } from "./useNativeStorage";
import { SetStateAction } from "./useStateCallback";
import { formatObjectEntries, formatString } from "@Util/stringFormat";

export interface ModConf {
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

export const INITIAL_MOD_CONF: ModConf = {
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
  _modConf: ModConf;
  __modConf: ModConf;
  modConf<K extends keyof ModConf>(key: K, adds?: Record<string, any>): ModConf[K];
  setModConf<K extends keyof ModConf>(key: K, state: SetStateAction<ModConf[K]>, callback?: (state: ModConf[K]) => void): void;
}

export const ModConfContext = createContext<ModConfContext>({
  _modConf: INITIAL_MOD_CONF,
  __modConf: INITIAL_MOD_CONF,
  modConf<K extends keyof ModConf>(key: K, adds?: Record<string, any>) {
    return key;
  },
  setModConf<K extends keyof ModConf>(key: K, state: SetStateAction<ModConf[K]>, callback?: (state: ModConf[K]) => void) {},
});

export const useModConf = () => {
  return useContext(ModConfContext);
};

export const ModConfProvider = (props: React.PropsWithChildren) => {
  const [modConf, setModConf] = useNativeStorage("modconf_v4", INITIAL_MOD_CONF);

  // Test purposes
  // React.useEffect(() => {
  //   for (const k in modConf) {
  //     console.info(
  //       formatString(defaultComposer(INITIAL_MOD_CONF, modConf)[k], {
  //         ...modConf,
  //         ...{
  //           MODID: "node_on_android",
  //           ZIPFILE: "/sdard/xh.zip",
  //         },
  //       })
  //     );
  //   }
  // }, [modConf]);

  const contextValue = React.useMemo(
    () => ({
      _modConf: defaultComposer(INITIAL_MOD_CONF, modConf),
      __modConf: formatObjectEntries<ModConf>(defaultComposer(INITIAL_MOD_CONF, modConf)),
      modConf: (key, adds) => {
        return formatString(defaultComposer(INITIAL_MOD_CONF, modConf)[key], { ...modConf, ...adds });
      },
      setModConf: (name, state, callback) => {
        setModConf(
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
    [modConf]
  );

  return <ModConfContext.Provider value={contextValue} children={props.children} />;
};
