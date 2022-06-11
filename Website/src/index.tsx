import ReactDOM from "react-dom";
import MainActivity from "@Activitys/MainActivity";
import ons from "onsenui";
import Log from "@Native/Log";
import { os } from "@Native/os";
import jss from "jss";
import preset from "jss-preset-default";
import light_theme from "@Styles/light_theme";
import dark_theme from "@Styles/dark_theme";
import Constants from "@Native/Constants";
import { ToastContainer } from "react-toastify";
import SharedPreferences, { ISharedPreferences } from "@Native/SharedPreferences";

// Webpack CSS import
import "onsenui/css/onsenui-core.css";
import "material-icons/iconfont/material-icons.css";
import "react-toastify/dist/ReactToastify.css";
import "@Styles/addtional.scss";
import "@Styles/markdown-light.scss";
import "@Styles/markdown-dark.scss";

class Bootloader {
  private mountNode: Element | null = document.querySelector("app");
  private log: Log;
  private readonly getSharedPreferences: ISharedPreferences;

  constructor() {
    this.getSharedPreferences = new SharedPreferences();
    this.log = new Log(this.constructor.name);
  }

  private loadStyle() {
    this.log.i("Setup theme");
    jss.setup(preset());
    if (this.getSharedPreferences.getBoolean("enableDarkmode_switch", false)) {
      jss.createStyleSheet(dark_theme).attach();
    } else {
      jss.createStyleSheet(light_theme).attach();
    }
  }

  loadActivity() {
    this.log.i("Loading MainActivty");
    ReactDOM.render(
      <>
        <MainActivity />
        <ToastContainer />
      </>,
      this.mountNode
    );
  }

  init() {
    if (!os.hasStoragePermission()) {
      os.requestStoargePermission();
    }

    this.log.i("Selecting platform: Android");
    ons.platform.select("android");
    this.loadStyle();
    this.loadActivity();
  }
}

new Bootloader().init();
