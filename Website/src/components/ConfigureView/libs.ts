import Video from "@Components/dapi/Video";
import Anchor from "@Components/dapi/Anchor";
import { DiscordWidget } from "@Components/dapi/DiscordWidget";
import { BottomToolbar } from "@Components/onsenui/BottomToolbar";
import { Page } from "@Components/onsenui/Page";
import { Tabbar } from "@Components/onsenui/Tabbar";
import Sandbox from "@nyariv/sandboxjs";
import { useTheme } from "@Hooks/useTheme";
import { useNativeStorage } from "@Hooks/useNativeStorage";
import { useNativeProperties } from "@Hooks/useNativeProperties";
import { Markdown, PromoBanner } from "./components";
import { useActivity } from "@Hooks/useActivity";
import { Toolbar } from "@Components/onsenui/Toolbar";
import { SuFile } from "@Native/SuFile";
import { StringsProvider, useStrings } from "@Hooks/useStrings";
import { Shell } from "@Native/Shell";
import Ansi from "ansi-to-react";
import { os } from "@Native/Os";
import { BuildConfig } from "@Native/BuildConfig";
import { useSettings } from "@Hooks/useSettings";
import { useNativeFileStorage } from "@Hooks/useNativeFileStorage";
import TextEditorActivity from "@Activitys/TextEditorActivity";

export const libraries = [
  {
    name: "react",
    __esModule: require("react"),
  },
  {
    name: "@mui/material",
    __esModule: require("@mui/material"),
  },
  {
    name: "@mui/lab",
    __esModule: require("@mui/lab"),
  },
  {
    name: "@mui/icons-material",
    __esModule: require("@mui/icons-material"),
  },
  {
    name: "@mmrl/terminal",
    __esModule: os.isAndroid ? Terminal : {},
  },
  {
    name: "flatlist-react",
    __esModule: require("flatlist-react"),
  },
  {
    name: "onsenui",
    __esModule: require("onsenui"),
  },
  {
    name: "@mmrl/activity",
    __esModule: {
      TextEditorActivity: TextEditorActivity,
    },
  },
  {
    name: "@mmrl/ui",
    __esModule: {
      Anchor: Anchor,
      Page: Page,
      BottomToolbar: BottomToolbar,
      Tabbar: Tabbar,
      Toolbar: Toolbar,
      Video: Video,
      DiscordWidget: DiscordWidget,
      PromoBanner: PromoBanner,
      Markdown: Markdown,
      Ansi: Ansi,
    },
  },
  {
    name: "@mmrl/hooks",
    __esModule: {
      useActivity: useActivity,
      useNativeProperties: useNativeProperties,
      useNativeFileStorage: useNativeFileStorage,
      useNativeStorage: useNativeStorage,
      useTheme: useTheme,
      useSettings: useSettings,
      useStrings: useStrings,
    },
  },
  {
    name: "@mmrl/providers",
    __esModule: {
      StringsProvider: StringsProvider,
    },
  },

  {
    name: "@mmrl/sufile",
    __esModule: {
      read: SuFile.read,
      write: SuFile.write,
      list: SuFile.list,
      exist: SuFile.exist,
      delete: SuFile.delete,
      deleteRecursive: SuFile.deleteRecursive,
    },
  },
  {
    name: "@mmrl/shell",
    __esModule: {
      getRootManager: Shell.getRootManager,
      isKernelSU: Shell.isKernelSU,
      isMagiskSU: Shell.isMagiskSU,
      VERSION_CODE: Shell.VERSION_CODE,
      VERSION_NAME: Shell.VERSION_NAME,
      pw_uid: Shell.pw_uid,
      pw_gid: Shell.pw_gid,
      pw_name: Shell.pw_name,
    },
  },
  {
    name: "@mmrl/os",
    __esModule: {
      toast: os.toast,
      sdk: os.sdk,
    },
  },
  {
    name: "@mmrl/buildconfig",
    __esModule: {
      BUILD_DATE: BuildConfig.BUILD_DATE,
      VERSION_NAME: BuildConfig.VERSION_NAME,
      VERSION_CODE: BuildConfig.VERSION_CODE,
      APPLICATION_ID: BuildConfig.APPLICATION_ID,
      DEBUG: BuildConfig.DEBUG,
      BUILD_TYPE: BuildConfig.BUILD_TYPE,
    },
  },
];

const prototypeWhitelist = Sandbox.SAFE_PROTOTYPES;
prototypeWhitelist.set(Node, new Set());

export const globals = {
  ...Sandbox.SAFE_GLOBALS,
  JSON: JSON,
  YAML: require("yaml"),
  INI: require("ini"),
  Toast: Toast,
  Object,
};
