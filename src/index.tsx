import jss from "jss";
import preset from "jss-preset-default";
import ReactDOM from "react-dom";
import MainActivity from "./activitys/MainActivity";
import ons from "onsenui";
import theme from "./styles/theme";
import { ToastContainer } from "react-toastify";
import Logger from "./utils/Logger";

// Webpack CSS import
import "onsenui/css/onsenui-core.css";
import "material-icons/iconfont/material-icons.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";
import "./styles/addtional.scss";
import "./styles/markdown-light.scss";

class Bootloader {
  private mountNode: Element | null = document.querySelector("app");
  private log: Logger;

  constructor() {
    this.log = new Logger(this.constructor.name);
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
    this.log.info("Intitialze repo");
    if (localStorage.getItem("repo") === null) {
      this.log.error("No repo was found, set https://repo.dergoogler.com/modules.json as default repo");
      localStorage.setItem("repo", "https://repo.dergoogler.com/modules.json");
    }
    this.log.info("Selecting platform: Android");
    ons.platform.select("android");
    this.loadStyle();
    this.loadActivity();
  }
}

new Bootloader().init();
