import React from "react";
import ReactDOM from "react-dom";
import MainActivity from "./MainActivity";
import ons from "onsenui";

// Webpack CSS import
import "onsenui/css/onsenui-core.css";
import "./styles/onsen-css-components.css";
import "./styles/addtional.scss";

class Bootloader {
  mountNode = document.querySelector("app");

  constructor() {
    console.log("App wird gestartet!");
  }

  loadActivity() {
    ReactDOM.render(<MainActivity />, this.mountNode);
  }

  init() {
    ons.platform.select("android");
    this.loadActivity();
  }
}

new Bootloader().init();
