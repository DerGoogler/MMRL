import Video from "@Components/dapi/Video";
import { Image } from "@Components/dapi/Image";
import Anchor from "@Components/dapi/Anchor";
import { DiscordWidget } from "@Components/dapi/DiscordWidget";
import { BottomToolbar } from "@Components/onsenui/BottomToolbar";
import { Page } from "@Components/onsenui/Page";
import { Tabbar } from "@Components/onsenui/Tabbar";
import Sandbox from "@nyariv/sandboxjs";
import { useTheme } from "@Hooks/useTheme";
import { useNativeStorage } from "@Hooks/useNativeStorage";
import { useNativeProperties } from "@Hooks/useNativeProperties";
import { Markdown } from "./components";
import { useActivity } from "@Hooks/useActivity";
import { Toolbar } from "@Components/onsenui/Toolbar";
import { SuFile } from "@Native/SuFile";
import { StringsProvider, useStrings } from "@Hooks/useStrings";
import { Shell, ShellClass } from "@Native/Shell";
import { Ansi } from "@Components/Ansi";
import { OsClass, os } from "@Native/Os";
import { BuildConfig, BuildConfigClass } from "@Native/BuildConfig";
import { useSettings } from "@Hooks/useSettings";
import { ConfigProvider, useConfig, useNativeFileStorage } from "@Hooks/useNativeFileStorage";
import { useModFS } from "@Hooks/useModFS";
import PicturePreviewActivity from "@Activitys/PicturePreviewActivity";
import { useConfirm } from "material-ui-confirm";
import { View, view } from "@Native/View";
import { Build } from "@Native/Build";

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
      PicturePreviewActivity: PicturePreviewActivity,
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
      Markdown: Markdown,
      Image: Image,
      Ansi: Ansi,
    },
  },
  {
    name: "@mmrl/hooks",
    __esModule: {
      useConfirm: useConfirm,
      useConfig: useConfig,
      useModFS: useModFS,
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
      ConfigProvider: ConfigProvider,
      StringsProvider: StringsProvider,
    },
  },
];

export const prototypeWhitelist = Sandbox.SAFE_PROTOTYPES;
prototypeWhitelist.set(Node, new Set());
prototypeWhitelist.set(Object, new Set());
prototypeWhitelist.set(Document, new Set());
prototypeWhitelist.set(Response, new Set());
prototypeWhitelist.set(Element, new Set());
prototypeWhitelist.set(SuFile, new Set());
prototypeWhitelist.set(View, new Set());
prototypeWhitelist.set(ShellClass, new Set());
prototypeWhitelist.set(OsClass, new Set());
prototypeWhitelist.set(BuildConfigClass, new Set());
prototypeWhitelist.set(Build, new Set());

export const globals = {
  ...Sandbox.SAFE_GLOBALS,
  JSON: JSON,
  YAML: require("yaml"),
  INI: require("ini"),
  Element: Element,
  document: document,
  Toast: Toast,
  view: view,
  os: os,
  Shell: Shell,
  Build: Build,
  BuildConfig: BuildConfig,
  SuFile: SuFile,
  Object: Object,
  Response: Response,
};
