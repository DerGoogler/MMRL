import { Video } from "@Components/dapi/Video";
import { Image } from "@Components/dapi/Image";
import { Anchor } from "@Components/dapi/Anchor";
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
import { withRequireNewVersion } from "../../hoc/withRequireNewVersion";
import { CodeBlock } from "@Components/CodeBlock";
import { VerifiedIcon } from "@Components/icons/VerifiedIcon";
import { IsolatedFunctionBlockError } from "@Native/IsolatedEval/IsolatedFunctionBlockError";
import { Terminal } from "@Native/Terminal";

export const libraries = {
  react: {
    ...require("react"),
    createElement(type: any, props: any, ...children: any[]) {
      switch (type) {
        // prevents webview url change
        case "a":
          return React.createElement(Anchor, props, ...children);
        case "iframe":
          throw new IsolatedFunctionBlockError("iframe");
        default:
          return React.createElement(type, props, ...children);
      }
    },
  },

  "@mui/material": require("@mui/material"),

  "@mui/lab": require("@mui/lab"),

  "@mui/icons-material": require("@mui/icons-material"),

  "@mmrl/terminal": os.isAndroid ? Terminal : {},

  "flatlist-react": require("flatlist-react").default,

  onsenui: require("onsenui").default,

  "@mmrl/activity": {
    SearchActivity: SearchActivity,
    PicturePreviewActivity: PicturePreviewActivity,
  },

  // high order components
  "@mmrl/hoc": {
    withRequireNewVersion: withRequireNewVersion,
  },

  "@mmrl/icons": {
    VerifiedIcon: VerifiedIcon,
  },

  "@mmrl/ui": {
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
    CodeBlock: CodeBlock,
  },

  "@mmrl/hooks": {
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

  "@mmrl/providers": {
    ConfigProvider: ConfigProvider,
    StringsProvider: StringsProvider,
  },

  "default-composer": require("default-composer"),
};
