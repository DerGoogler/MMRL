import jss from "jss";
import preset from "jss-preset-default";
import ReactDOM from "react-dom";
import MainActivity from "@Activitys/MainActivity";
import ons from "onsenui";
import Log from "@Native/Log";
import SharedPreferences from "@Native/SharedPreferences";
import { os } from "@Native/os";
import Constants from "@Native/Constants";
import { ToastContainer } from "react-toastify";
import light_theme from "@Styles/light_theme";
import dark_theme from "@Styles/dark_theme";

// Webpack CSS import
import "onsenui/css/onsenui-core.css";
import "material-icons/iconfont/material-icons.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";
import "@Styles/addtional.scss";
import "@Styles/markdown-light.scss";
import "@Styles/markdown-dark.scss";

class Bootloader {
  private mountNode: Element | null = document.querySelector("app");
  private log: Log;
  private getSharedPreferences: SharedPreferences;

  constructor() {
    this.getSharedPreferences = new SharedPreferences();
    this.log = new Log(this.constructor.name);
  }

  loadStyle() {
    this.log.i("Setup theme");
    jss.setup(preset());
    if (this.getSharedPreferences.getBoolean("enableDarkmode", false)) {
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
    if (os.isAndroid) {
      if (!nos.hasStoragePermission()) {
        nos.requestStoargePermission();
      }
    }

    this.log.i("Intitialze repo");
    if (this.getSharedPreferences.getPref("repo") == Constants.undefined) {
      this.log.e("No repo was found, set Magisk Modules Alternative Repository as default repo");
      this.getSharedPreferences.setPref("repo", "https://raw.githubusercontent.com/Magisk-Modules-Alt-Repo/json/main/modules.json");
    }
    this.log.i("Selecting platform: Android");
    ons.platform.select("android");
    this.loadStyle();
    this.loadActivity();
  }
}

new Bootloader().init();
