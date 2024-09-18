import React from "react";

type Names =
  | "Settings"
  | "About"
  | "Description"
  | "FetchText"
  | "Licenses"
  | "Logcat"
  | "ModConfPlayground"
  | "ModConfStandalone"
  | "ModFS"
  | "PicturePreview"
  | "SubmitModule"
  | "ViewBlacklistedModules"
  | "ModuleView"
  | "Repo"
  | "ModConf"
  | "InstallTerminal";

export const Activities: Record<Names, React.LazyExoticComponent<any>> = {
  Settings: React.lazy(() => import("./SettingsActivity")),
  About: React.lazy(() => import("./AboutActivity")),
  Description: React.lazy(() => import("./DescriptonActivity")),
  FetchText: React.lazy(() => import("./FetchTextActivity")),
  Licenses: React.lazy(() => import("./LicensesActivity")),
  Logcat: React.lazy(() => import("./LogcatActivity")),
  ModConfPlayground: React.lazy(() => import("./ModConfPlaygroundActivity")),
  ModConfStandalone: React.lazy(() => import("./ModConfStandaloneActivity")),
  ModFS: React.lazy(() => import("./ModFSActivity")),
  PicturePreview: React.lazy(() => import("./PicturePreviewActivity")),
  SubmitModule: React.lazy(() => import("./SubmitModuleActivity")),
  ViewBlacklistedModules: React.lazy(() => import("./ViewBlacklistedModulesActivity")),
  ModuleView: React.lazy(() => import("./ModuleViewActivity")),
  Repo: React.lazy(() => import("./RepoActivity")),
  ModConf: React.lazy(() => import("./ModConfActivity")),
  InstallTerminal: React.lazy(() => import("./InstallTerminalV2Activity")),
};
