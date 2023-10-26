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
    name: "@mmrl/ui",
    __esModule: {
      Anchor: Anchor,
      Page: Page,
      BottomToolbar: BottomToolbar,
      Tabbar: Tabbar,
      Video: Video,
      DiscordWidget: DiscordWidget,
      PromoBanner: PromoBanner,
      Markdown: Markdown,
    },
  },
  {
    name: "@mmrl/hooks",
    __esModule: {
      useNativeProperties: useNativeProperties,
      useNativeStorage: useNativeStorage,
      useTheme: useTheme,
    },
  },

  {
    name: "@mmrl/native",
    __esModule: {
      // SuFile: SuFile,
    },
  },
];

export const globals = {
  ...Sandbox.SAFE_GLOBALS,
  Object,
  // React: require("react"),
  require(id: string) {
    return libraries.find((lib) => id === lib.name)?.__esModule;
  },
};
