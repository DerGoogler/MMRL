import jss from "jss";
import preset from "jss-preset-default";
import ReactDOM from "react-dom";
import MainActivity from "@Activitys/MainActivity";
import ons from "onsenui";
import SharedPreferences from "@Native/SharedPreferences";
import theme from "@Styles/theme";
import Constants from "@Native/Constants";
import { ToastContainer } from "react-toastify";

// Webpack CSS import
import "onsenui/css/onsenui-core.css";
import "material-icons/iconfont/material-icons.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";
import "@Styles/addtional.scss";
import "@Styles/markdown-light.scss";
import Log from "@Builders/Log";

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
    jss.createStyleSheet(theme).attach();
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
    if (Constants.isAndroid) {
      if (!android.hasStoragePermission()) {
        android.requestStoargePermission();
      }
    }

   // this.log.i(android.phoneComponents().getActionBarHeight().toString());

    this.log.i("Intitialze repo");
    if (this.getSharedPreferences.getPref("repo") == Constants.undefined) {
      this.log.e("No repo was found, set https://repo.dergoogler.com/modules.json as default repo");
      this.getSharedPreferences.setPref("repo", "https://repo.dergoogler.com/modules.json");
    }
    this.log.i("Selecting platform: Android");
    ons.platform.select("android");
    this.loadStyle();
    this.loadActivity();
  }
}

new Bootloader().init();
