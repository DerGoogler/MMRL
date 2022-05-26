import jss from "jss";
import preset from "jss-preset-default";
import ReactDOM from "react-dom";
import MainActivity from "@Activitys/MainActivity";
import ons from "onsenui";
import PreferencesManager from "@Native/PreferencesManager";
import theme from "@Styles/theme";
import Constants from "@Native/Constants";
import { ToastContainer } from "react-toastify";
import LoggerManager from "@Native/LoggerManager";

// Webpack CSS import
import "onsenui/css/onsenui-core.css";
import "material-icons/iconfont/material-icons.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";
import "@Styles/addtional.scss";
import "@Styles/markdown-light.scss";

class Bootloader {
  private mountNode: Element | null = document.querySelector("app");
  private log: LoggerManager;
  private prefMan: PreferencesManager;

  constructor() {
    this.prefMan = new PreferencesManager();
    this.log = new LoggerManager(this.constructor.name);
  }

  loadStyle() {
    this.log.info("Setup theme");
    jss.setup(preset());
    jss.createStyleSheet(theme).attach();
  }

  loadActivity() {
    this.log.info("Loading MainActivty");
    ReactDOM.render(
      <>
        <MainActivity />
        <ToastContainer />
      </>,
      this.mountNode
    );
  }

  init() {
    if (Constants.isAndroid) {
      if (!android.hasStoragePermission()) {
        android.requestStoargePermission();
      }
    }
    this.log.info("Intitialze repo");
    if (this.prefMan.getPref("repo") == Constants.undefined) {
      this.log.error("No repo was found, set https://repo.dergoogler.com/modules.json as default repo");
      this.prefMan.setPref("repo", "https://repo.dergoogler.com/modules.json");
    }
    this.log.info("Selecting platform: Android");
    ons.platform.select("android");
    this.loadStyle();
    this.loadActivity();
  }
}

new Bootloader().init();
