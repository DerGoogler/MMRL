
import ReactDOM from 'react-dom/client';
import MainActivity from "@Activitys/MainActivity";
import { dom } from "googlers-tools";
import ons from "onsenui";
import Log from "@Native/Log";
import { os } from "@Native/os";
import jss from "jss";
import preset from "jss-preset-default";
import light_theme from "@Styles/light_theme";
import dark_theme from "@Styles/dark_theme";
import { SharedPreferences } from "@Native/SharedPreferences";
import { string } from "./language/core";

// Webpack CSS import
import "onsenui/css/onsenui-core.css";
import "material-icons/iconfont/material-icons.css";
import "@Styles/addtional.scss";
import "@Styles/markdown-light.scss";
import "@Styles/markdown-dark.scss";

class Bootloader {
  private log: Log;

  constructor() {
    this.log = new Log(this.constructor.name);
  }

  private loadStyle() {
    this.log.i("Setup theme");
    jss.setup(preset());
    if (SharedPreferences.getItem<boolean>("enableDarkmode_switch", false)) {
      jss.createStyleSheet(dark_theme).attach();
    } else {
      jss.createStyleSheet(light_theme).attach();
    }
  }

  private loadActivity() {
    "use strict";
    this.log.i("Loading MainActivty");
    const app = document.createElement(this.constructor.name);
    document.body.prepend(app);
    const container = document.querySelector<Element>(this.constructor.name!);
    const root = ReactDOM.createRoot(container!);
    root.render(<MainActivity />);
  }

  public init() {
    if (!os.hasStoragePermission()) {
      os.requestStoargePermission();
    }

    string.setLanguage(SharedPreferences.getItem("language_select", "en"));

    // Prevent context menu on browsers.
    dom.preventer(["contextmenu"]);

    this.log.i("Selecting platform: Android");
    this.log.i(navigator.userAgent);
    ons.platform.select("android");
    this.loadStyle();
    this.loadActivity();
  }
}

new Bootloader().init();
