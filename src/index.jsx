import jss from "jss"
import preset from "jss-preset-default"
import React from "react";
import ReactDOM from "react-dom";
import MainActivity from "./MainActivity";
import ons from "onsenui";
import theme from "./styles/theme"

// Webpack CSS import
import "onsenui/css/onsenui-core.css";
import "material-icons/iconfont/material-icons.css";
import "./styles/addtional.scss";

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
    ReactDOM.render(<MainActivity />, this.mountNode);
  }

  init() {
    ons.platform.select("android");
    this.loadStyle()
    this.loadActivity();
  }
}

new Bootloader().init();
