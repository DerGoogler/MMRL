import { defaultComposer } from "default-composer";
import React, { createContext, useContext } from "react";
import { useNativeFileStorage } from "./useNativeFileStorage";
import { SetStateAction } from "./useStateCallback";

import { default as PModFS } from "modfs";

export interface ModFS {
  //cli
  MSUINI: string;
  KSUINI: string;
  ASUINI: string;

  // default paths
  ADB: string;
  MMRLFOL: string;
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

  //modconf
  CONFCWD: string;
  CONFINDEX: string;
  MODCONF_PLAYGROUND: string;
  MODCONF_PLAYGROUND_MODID: string;

  // modconf standalone
  MCALONE: string;
  MCALONECWD: string;
  MCALONEMETA: string;
  MCALONEIDX: string;

  // Installer
  EXPLORE_INSTALL: string;
  LOCAL_INSTALL: string;
}

export const INITIAL_MOD_CONF: ModFS = {
  //cli
  MSUINI: '<ABD>/magisk/magisk32 --install-module "<ZIPFILE>"',
  KSUINI: '<ADB>/ksu/bin/ksud module install "<ZIPFILE>"',
  ASUINI: '<ADB>/ap/bin/apd module install "<ZIPFILE>"',

  // default paths
  ADB: "/data/adb",
  MMRLFOL: "<ADB>/mmrl",
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

  // modconf
  CONFCWD: "<MODULECWD>/system/usr/share/mmrl/config/<MODID>",
  CONFINDEX: "<CONFCWD>/index.jsx",
  MODCONF_PLAYGROUND: "<ADB>/mmrl/modconf-playground.jsx",
  MODCONF_PLAYGROUND_MODID: "playground",

  // modconf standalone
  MCALONE: "<MMRLFOL>/modconf",
  MCALONECWD: "<MCALONE>/<MODID>",
  MCALONEMETA: "<MCALONECWD>/modconf.json",
  MCALONEIDX: "<MCALONECWD>/index.jsx",

  // Installer
  EXPLORE_INSTALL: 'mmrl install -y "<URL>"',
  LOCAL_INSTALL: 'mmrl install local -y <ZIPFILES( |"")>',
};

export interface ModConfContext {
  _modFS: ModFS;
  __modFS: ModFS;
  modFS<K extends keyof ModFS>(key: K, adds?: Record<string, any>): ModFS[K];
  setModFS<K extends keyof ModFS>(key: K, state: SetStateAction<ModFS[K]>): void;
}

export const ModConfContext = createContext<ModConfContext>({
  _modFS: INITIAL_MOD_CONF,
  __modFS: INITIAL_MOD_CONF,
  modFS<K extends keyof ModFS>(key: K, adds?: Record<string, any>) {
    return key;
  },
  setModFS<K extends keyof ModFS>(key: K, state: SetStateAction<ModFS[K]>) {},
});

export const useModFS = () => {
  return useContext(ModConfContext);
};

export const ModFSProvider = (props: React.PropsWithChildren) => {
  const [modFS, setModFS] = useNativeFileStorage("/data/adb/mmrl/modfs.v4.json", INITIAL_MOD_CONF, { loader: "json" });

  const pmodFS = React.useMemo(() => new PModFS(defaultComposer(INITIAL_MOD_CONF, modFS)), [modFS]);

  const contextValue = React.useMemo(
    () => ({
      _modFS: defaultComposer(INITIAL_MOD_CONF, modFS),
      __modFS: pmodFS.formatEntries(),
      modFS<K extends keyof ModFS>(key: K, adds: ModFS | object): ModFS[K] {
        return PModFS.format(pmodFS.get(key)!, { ...modFS, ...adds });
      },
      setModFS: (name, state) => {
        setModFS((prev) => {
          const newValue = state instanceof Function ? state(prev[name]) : state;
          return {
            ...prev,
            [name]: newValue,
          };
        });
      },
    }),
    [modFS]
  );

  return <ModConfContext.Provider value={contextValue} children={props.children} />;
};
