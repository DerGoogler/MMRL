import Video from "@Components/dapi/Video";
import { Image } from "@Components/dapi/Image";
import Anchor from "@Components/dapi/Anchor";
import { DiscordWidget } from "@Components/dapi/DiscordWidget";
import { BottomToolbar } from "@Components/onsenui/BottomToolbar";
import { Page } from "@Components/onsenui/Page";
import { Tabbar } from "@Components/onsenui/Tabbar";
import { useTheme } from "@Hooks/useTheme";
import { useNativeStorage } from "@Hooks/useNativeStorage";
import { useNativeProperties } from "@Hooks/useNativeProperties";
import { useActivity } from "@Hooks/useActivity";
import { Toolbar } from "@Components/onsenui/Toolbar";
import { StringsProvider, useStrings } from "@Hooks/useStrings";
import { Ansi } from "@Components/Ansi";
import { os } from "@Native/Os";
import { useSettings } from "@Hooks/useSettings";
import { ConfigProvider, useConfig, useNativeFileStorage } from "@Hooks/useNativeFileStorage";
import { useModFS } from "@Hooks/useModFS";
import PicturePreviewActivity from "@Activitys/PicturePreviewActivity";
import { useConfirm } from "material-ui-confirm";
import { Markup } from "@Components/Markdown";
import { DialogEditTextListItem } from "@Components/DialogEditTextListItem";
import { SearchActivity } from "@Activitys/SearchActivity";
import React from "react";

export const libraries = [
  {
    name: "react",
    __esModule: {
      ...require("react"),
      createElement(type: any, props: any, ...children: any[]) {
        switch (type) {
          // prevents webview url change
          case "a":
            return React.createElement(Anchor, props, ...children);
          default:
            return React.createElement(type, props, ...children);
        }
      },
    },
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
      SearchActivity: SearchActivity,
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
      Markdown: Markup,
      ListItemDialogEditText: DialogEditTextListItem,
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
  {
    name: "default-composer",
    __esModule: require("default-composer"),
  },
];
