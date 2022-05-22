import jss from "jss";
import preset from "jss-preset-default";
import React from "react";
import ReactDOM from "react-dom";
import MainActivity from "./activitys/MainActivity";
import ons from "onsenui";
import theme from "./styles/theme";
import { ToastContainer } from "react-toastify";

// Webpack CSS import
import "onsenui/css/onsenui-core.css";
import "material-icons/iconfont/material-icons.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";
import "./styles/addtional.scss";
import "./styles/markdown-light.scss";

class Bootloader {
  mountNode = document.querySelector("app");

  constructor() {
    console.log("App wird gestartet!");
  }

  loadStyle() {
    jss.setup(preset());
    jss.createStyleSheet(theme).attach();
  }

  loadActivity() {
    ReactDOM.render(
      <>
        <MainActivity />
        <ToastContainer />
      </>,
      this.mountNode
    );
  }

  init() {
    if (localStorage.getItem("repo") === null) {
      localStorage.setItem("repo", "https://repo.dergoogler.com/modules.json");
    }
    ons.platform.select("android");
    this.loadStyle();
    this.loadActivity();
  }
}

new Bootloader().init();
