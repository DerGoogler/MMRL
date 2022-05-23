/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ 9494:
/***/ ((__unused_webpack_module, __unused_webpack___webpack_exports__, __webpack_require__) => {


// EXTERNAL MODULE: ./node_modules/react/jsx-runtime.js
var jsx_runtime = __webpack_require__(5893);
// EXTERNAL MODULE: ./node_modules/jss/dist/jss.esm.js + 1 modules
var jss_esm = __webpack_require__(5668);
// EXTERNAL MODULE: ./node_modules/jss-preset-default/dist/jss-preset-default.esm.js + 20 modules
var jss_preset_default_esm = __webpack_require__(8121);
// EXTERNAL MODULE: ./node_modules/react-dom/index.js
var react_dom = __webpack_require__(3935);
// EXTERNAL MODULE: ./node_modules/react/index.js
var react = __webpack_require__(7294);
// EXTERNAL MODULE: ./node_modules/react-onsenui/dist/react-onsenui.js
var react_onsenui = __webpack_require__(3057);
// EXTERNAL MODULE: ./node_modules/axios/index.js
var axios = __webpack_require__(9669);
var axios_default = /*#__PURE__*/__webpack_require__.n(axios);
// EXTERNAL MODULE: ./node_modules/onsenui/esm/index.js + 9 modules
var esm = __webpack_require__(6566);
;// CONCATENATED MODULE: ./src/utils/tools.ts
var tools = /** @class */ (function () {
    function tools() {
    }
    tools.getSubPath = function (url) {
        return window.location.href.replace(/(\?(.*?)=(.*)|\?)/gm, "") + url;
    };
    tools.getUrlParam = function (param) {
        param = param.replace(/([\[\](){}*?+^$.\\|])/g, "\\$1");
        var regex = new RegExp("[?&]" + param + "=([^&#]*)");
        var url = decodeURIComponent(window.location.href);
        var match = regex.exec(url);
        return match ? match[1] : "";
    };
    /**
     * @param id
     * @param callback HTMLElement
     *
     * @description
     * Usage
     * ```ts
     * // Id's
     * tools.ref("element", (element: HTMLElement) => { element.style.display = "none" })
     *
     * // Refs
     * tools.ref(this.myRef, (ref: HTMLElement) => { ref.style.display = "none" })
     * ```
     */
    tools.ref = function (id, callback) {
        if (typeof id == "string") {
            var element /*: HTMLElement | null*/;
            if ((element = document.getElementById(id))) {
                if (typeof callback == "function") {
                    callback(element);
                }
            }
        }
        else {
            var reff /*: React.RefObject<any>*/;
            if ((reff = id)) {
                if (reff && reff.current) {
                    if (typeof callback == "function") {
                        var ref /*: typeof reff*/ = reff.current;
                        callback(ref);
                    }
                }
            }
        }
    };
    tools.validURL = function (input) {
        var pattern = new RegExp("^(https?:\\/\\/)?" + // protocol
            "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // domain name
            "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR ip (v4) address
            "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
            "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
            "(\\#[-a-z\\d_]*)?$", "i"); // fragment locator
        return !!pattern.test(input);
    };
    tools.stringToBoolean = function (value) {
        if (typeof value == "boolean")
            return value;
        switch (value) {
            case "true":
            case "yes":
            case "1":
                return true;
            case "false":
            case "no":
            case "0":
            case null:
                return false;
            default:
                return Boolean(value);
        }
    };
    tools.typeIF = function (_, __, ___) {
        if (this.stringToBoolean(_)) {
            return __;
        }
        else {
            return ___;
        }
    };
    tools.typeCheck = function (_, __) {
        if (_ === undefined || _ === null || _ === "" || __ === 0 || _ === "0" || _ === false || _ === "false") {
            return __;
        }
        else {
            return _;
        }
    };
    return tools;
}());
/* harmony default export */ const utils_tools = (tools);

;// CONCATENATED MODULE: ./src/components/MDIcon.jsx
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }




class MDIcon extends react.Component {
  render() {
    var {
      icon,
      size,
      disabled,
      isInList,
      isInToolbar,
      theme,
      style
    } = this.props;
    return /*#__PURE__*/react.createElement("span", null, /*#__PURE__*/react.createElement("span", {
      className: "material-icons-round " + utils_tools.typeIF(isInList, "list-item__icon", "") + " ons-icon " + "material-icons md-" + size + " md-" + theme + " " + utils_tools.typeIF(disabled, "md-inactive ", ""),
      style: _objectSpread({
        textAlign: "center",
        height: utils_tools.typeIF(isInToolbar, "56px", "100%"),
        width: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center"
      }, style)
    }, icon));
  }

}

/* harmony default export */ const components_MDIcon = (MDIcon);
// EXTERNAL MODULE: ./node_modules/react-toastify/dist/react-toastify.esm.js
var react_toastify_esm = __webpack_require__(2132);
// EXTERNAL MODULE: ./node_modules/markdown-to-jsx/dist/index.modern.js
var index_modern = __webpack_require__(6243);
// EXTERNAL MODULE: ./node_modules/react-bootstrap/esm/Alert.js + 46 modules
var Alert = __webpack_require__(6224);
;// CONCATENATED MODULE: ./src/components/icons/VerfifiedIcon.jsx


class VerifiedIcon extends react.Component {
  render() {
    var {
      color,
      size,
      className
    } = this.props;
    return /*#__PURE__*/react.createElement("svg", {
      "aria-hidden": "true",
      height: size,
      viewBox: "0 0 16 16",
      version: "1.1",
      width: size,
      "data-view-component": "true",
      className: "octicon octicon-verified ml-1 " + className
    }, /*#__PURE__*/react.createElement("path", {
      fill: color,
      d: "M9.585.52a2.678 2.678 0 00-3.17 0l-.928.68a1.178 1.178 0 01-.518.215L3.83 1.59a2.678 2.678 0 00-2.24 2.24l-.175 1.14a1.178 1.178 0 01-.215.518l-.68.928a2.678 2.678 0 000 3.17l.68.928c.113.153.186.33.215.518l.175 1.138a2.678 2.678 0 002.24 2.24l1.138.175c.187.029.365.102.518.215l.928.68a2.678 2.678 0 003.17 0l.928-.68a1.17 1.17 0 01.518-.215l1.138-.175a2.678 2.678 0 002.241-2.241l.175-1.138c.029-.187.102-.365.215-.518l.68-.928a2.678 2.678 0 000-3.17l-.68-.928a1.179 1.179 0 01-.215-.518L14.41 3.83a2.678 2.678 0 00-2.24-2.24l-1.138-.175a1.179 1.179 0 01-.518-.215L9.585.52zM7.303 1.728c.415-.305.98-.305 1.394 0l.928.68c.348.256.752.423 1.18.489l1.136.174c.51.078.909.478.987.987l.174 1.137c.066.427.233.831.489 1.18l.68.927c.305.415.305.98 0 1.394l-.68.928a2.678 2.678 0 00-.489 1.18l-.174 1.136a1.178 1.178 0 01-.987.987l-1.137.174a2.678 2.678 0 00-1.18.489l-.927.68c-.415.305-.98.305-1.394 0l-.928-.68a2.678 2.678 0 00-1.18-.489l-1.136-.174a1.178 1.178 0 01-.987-.987l-.174-1.137a2.678 2.678 0 00-.489-1.18l-.68-.927a1.178 1.178 0 010-1.394l.68-.928c.256-.348.423-.752.489-1.18l.174-1.136c.078-.51.478-.909.987-.987l1.137-.174a2.678 2.678 0 001.18-.489l.927-.68zM11.28 6.78a.75.75 0 00-1.06-1.06L7 8.94 5.78 7.72a.75.75 0 00-1.06 1.06l1.75 1.75a.75.75 0 001.06 0l3.75-3.75z"
    }));
  }

}

VerifiedIcon.defaultProps = {
  size: "16"
};
/* harmony default export */ const VerfifiedIcon = (VerifiedIcon);
;// CONCATENATED MODULE: ./src/components/icons/WarningIcon.jsx


class Warningicon extends react.Component {
  render() {
    var {
      color,
      size,
      className
    } = this.props;
    return /*#__PURE__*/react.createElement("svg", {
      "aria-hidden": "true",
      height: size,
      viewBox: "0 0 16 16",
      version: "1.1",
      width: size,
      "data-view-component": "true",
      className: "octicon octicon-report " + className
    }, /*#__PURE__*/react.createElement("path", {
      fill: color,
      "fill-rule": "evenodd",
      d: "M1.75 1.5a.25.25 0 00-.25.25v9.5c0 .138.112.25.25.25h2a.75.75 0 01.75.75v2.19l2.72-2.72a.75.75 0 01.53-.22h6.5a.25.25 0 00.25-.25v-9.5a.25.25 0 00-.25-.25H1.75zM0 1.75C0 .784.784 0 1.75 0h12.5C15.216 0 16 .784 16 1.75v9.5A1.75 1.75 0 0114.25 13H8.06l-2.573 2.573A1.457 1.457 0 013 14.543V13H1.75A1.75 1.75 0 010 11.25v-9.5zM9 9a1 1 0 11-2 0 1 1 0 012 0zm-.25-5.25a.75.75 0 00-1.5 0v2.5a.75.75 0 001.5 0v-2.5z"
    }));
  }

}

Warningicon.defaultProps = {
  size: "16"
};
/* harmony default export */ const WarningIcon = (Warningicon);
// EXTERNAL MODULE: ./node_modules/@mui/material/Accordion/Accordion.js + 7 modules
var Accordion = __webpack_require__(3731);
// EXTERNAL MODULE: ./node_modules/@mui/material/AccordionSummary/AccordionSummary.js + 1 modules
var AccordionSummary = __webpack_require__(7425);
// EXTERNAL MODULE: ./node_modules/@mui/material/AccordionDetails/AccordionDetails.js + 1 modules
var AccordionDetails = __webpack_require__(5092);
// EXTERNAL MODULE: ./node_modules/@mui/icons-material/ExpandMore.js
var ExpandMore = __webpack_require__(3508);
;// CONCATENATED MODULE: ./src/components/Changelog.jsx






class Changelog extends react.Component {
  render() {
    var {
      version,
      children
    } = this.props;
    return /*#__PURE__*/react.createElement(react.Fragment, null, /*#__PURE__*/react.createElement(Accordion/* default */.Z, null, /*#__PURE__*/react.createElement(AccordionSummary/* default */.Z, {
      expandIcon: /*#__PURE__*/react.createElement(ExpandMore/* default */.Z, null),
      "aria-controls": "panel1a-content",
      id: version
    }, /*#__PURE__*/react.createElement("span", null, version)), /*#__PURE__*/react.createElement(AccordionDetails/* default */.Z, null, /*#__PURE__*/react.createElement("span", null, children))));
  }

}

/* harmony default export */ const components_Changelog = (Changelog);
;// CONCATENATED MODULE: ./src/components/icons/CheckIcon.jsx


class CheckIcon extends react.Component {
  render() {
    var {
      color,
      size,
      className
    } = this.props;
    return /*#__PURE__*/react.createElement("svg", {
      width: size,
      viewBox: "0 0 16 16",
      version: "1.1",
      height: size,
      "aria-hidden": "true",
      className: "octicon octicon-check color-fg-success ml-n3 v-align-middle " + className
    }, /*#__PURE__*/react.createElement("path", {
      fill: color,
      "fill-rule": "evenodd",
      d: "M13.78 4.22a.75.75 0 010 1.06l-7.25 7.25a.75.75 0 01-1.06 0L2.22 9.28a.75.75 0 011.06-1.06L6 10.94l6.72-6.72a.75.75 0 011.06 0z"
    }));
  }

}

CheckIcon.defaultProps = {
  size: "14"
};
/* harmony default export */ const icons_CheckIcon = (CheckIcon);
;// CONCATENATED MODULE: ./src/components/icons/DangerIcon.jsx


class DangerIcon extends react.Component {
  render() {
    var {
      color,
      size,
      className
    } = this.props;
    return /*#__PURE__*/react.createElement("svg", {
      width: size,
      viewBox: "0 0 16 16",
      version: "1.1",
      height: size,
      "aria-hidden": "true",
      className: "octicon octicon-x color-fg-danger ml-n3 v-align-middle " + className
    }, /*#__PURE__*/react.createElement("path", {
      fill: color,
      "fill-rule": "evenodd",
      d: "M3.72 3.72a.75.75 0 011.06 0L8 6.94l3.22-3.22a.75.75 0 111.06 1.06L9.06 8l3.22 3.22a.75.75 0 11-1.06 1.06L8 9.06l-3.22 3.22a.75.75 0 01-1.06-1.06L6.94 8 3.72 4.78a.75.75 0 010-1.06z"
    }));
  }

}

DangerIcon.defaultProps = {
  size: "14"
};
/* harmony default export */ const icons_DangerIcon = (DangerIcon);
;// CONCATENATED MODULE: ./src/native/Constants.ts
var Constants = /** @class */ (function () {
    function Constants() {
    }
    Constants.isAndroidIf = function (_if, _else) {
        if (this.isAndroid === true) {
            return _if;
        }
        else {
            return _else;
        }
    };
    var _a;
    _a = Constants;
    Constants.userAgentAndroid = "MMRL";
    Constants.userAgent = window.navigator.userAgent;
    Constants.isAndroid = _a.userAgentAndroid === _a.userAgent ? true : false;
    Constants.undefined =  false || undefined;
    return Constants;
}());
/* harmony default export */ const native_Constants = (Constants);

;// CONCATENATED MODULE: ./src/activitys/ViewModuleActivity.tsx
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (undefined && undefined.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};














var ViewModuleActivity = /** @class */ (function (_super) {
    __extends(ViewModuleActivity, _super);
    function ViewModuleActivity(props) {
        var _this = _super.call(this, props) || this;
        _this.componentDidMount = function () {
            axios_default().get(_this.props.extra.notes)
                .then(function (response) {
                _this.setState({
                    notes: response.data,
                });
            })
                .catch(function (error) {
                if (error.response.status === 404) {
                    _this.setState({
                        notes: "# 404: Not Found\n\n The author doesn't have created or uploaded an `README.md`, please try again later.\n\n\n## About Readme's\n\n- <dangericon color=\"#cf222e\" size=\"16\"/> readme.md\n- <checkicon color=\"#1a7f37\" size=\"16\"/> README.md",
                    });
                }
            })
                .then(function () {
                // always executed
            });
        };
        _this.renderToolbar = function () {
            var _a = _this.props.extra.moduleProps, minMagisk = _a.minMagisk, minApi = _a.minApi, maxApi = _a.maxApi, needsRamdisk = _a.needsRamdisk, changeBoot = _a.changeBoot;
            return (
            // @ts-ignore
            (0,jsx_runtime.jsxs)(react_onsenui.Toolbar, { children: [(0,jsx_runtime.jsx)("div", __assign({ className: "left" }, { children: (0,jsx_runtime.jsx)(react_onsenui.BackButton
                        // @ts-ignore
                        , { 
                            // @ts-ignore
                            onClick: function () {
                                _this.props.popPage();
                            } }) })), 
                    /*
                  // @ts-ignore */
                    (function () {
                        // Don't show up if nothing ot these exists
                        if ((minMagisk || minApi || maxApi || needsRamdisk || changeBoot) != ( false || undefined)) {
                            return ((0,jsx_runtime.jsx)("div", __assign({ className: "right" }, { children: (0,jsx_runtime.jsx)(react_onsenui.ToolbarButton, __assign({ style: { padding: "0px 10px" }, onClick: _this.showDialog }, { children: (0,jsx_runtime.jsx)(components_MDIcon, { icon: "info", isInToolbar: true, theme: "white", size: "24" }) })) })));
                        }
                    })(), (0,jsx_runtime.jsx)("div", __assign({ className: "center" }, { children: _this.props.extra.name }))] }));
        };
        _this.showDialog = function () {
            _this.setState({ dialogShown: true });
        };
        _this.hideDialog = function () {
            _this.setState({ dialogShown: false });
        };
        _this.render = function () {
            var _a = _this.props.extra.moduleProps, minMagisk = _a.minMagisk, minApi = _a.minApi, maxApi = _a.maxApi, needsRamdisk = _a.needsRamdisk, changeBoot = _a.changeBoot, name = _a.name, stars = _a.stars;
            var _b = _this.props.extra.moduleOptions, verified = _b.verified, low = _b.low;
            return ((0,jsx_runtime.jsx)(jsx_runtime.Fragment, { children: (0,jsx_runtime.jsxs)(react_onsenui.Page, __assign({ renderToolbar: _this.renderToolbar }, { children: [(0,jsx_runtime.jsxs)("div", __assign({ style: { padding: "8px", marginBottom: "56px" }, className: "markdown-body-light" }, { children: [
                                /*
                              // @ts-ignore */
                                (function () {
                                    if (verified) {
                                        return ((0,jsx_runtime.jsxs)(Alert/* default */.Z, __assign({ variant: "success" }, { children: [(0,jsx_runtime.jsx)("strong", { children: (0,jsx_runtime.jsx)(VerfifiedIcon, { color: "#0f5132" }) }), " ", "This module has been verified!"] }), "verified-module"));
                                    }
                                })(), 
                                /*
                              // @ts-ignore */
                                (function () {
                                    if (low) {
                                        return ((0,jsx_runtime.jsxs)(Alert/* default */.Z, __assign({ variant: "warning" }, { children: [(0,jsx_runtime.jsx)("strong", { children: (0,jsx_runtime.jsx)(WarningIcon, { color: "#664d03" }) }), " ", "This is an low-quality module!"] }), "low-module"));
                                    }
                                })(), (0,jsx_runtime.jsx)(index_modern/* default */.Z, __assign({ options: {
                                        overrides: {
                                            changelog: {
                                                component: components_Changelog,
                                            },
                                            checkicon: {
                                                component: icons_CheckIcon,
                                            },
                                            dangericon: {
                                                component: icons_DangerIcon,
                                            },
                                        },
                                    } }, { children: _this.state.notes }))] })), (0,jsx_runtime.jsxs)("div", __assign({ style: {
                                position: "fixed",
                                display: "flex",
                                left: 0,
                                padding: "8px",
                                bottom: 0,
                                width: "100%",
                                textAlign: "center",
                                backgroundColor: "rgba(256, 256, 256, .85)",
                            } }, { children: [(0,jsx_runtime.jsx)(react_onsenui.Button, __assign({ modifier: "large", onClick: function () {
                                        window.open(_this.props.extra.download, "_parent");
                                    } }, { children: "Download" })), (0,jsx_runtime.jsx)("div", { style: { padding: "4px", display: !native_Constants.isAndroid ? "none" : "" } }), (0,jsx_runtime.jsx)(react_onsenui.Button, __assign({ modifier: "large", disabled: !native_Constants.isAndroid, style: {
                                        display: !native_Constants.isAndroid ? "none" : "",
                                    }, onClick: function () {
                                        esm["default"].notification.alert("The option will be available in the future");
                                    } }, { children: "Install" }))] })), (0,jsx_runtime.jsx)(react_onsenui.Dialog, __assign({ visible: _this.state.dialogShown, cancelable: true, onDialogCancel: _this.hideDialog }, { children: (0,jsx_runtime.jsx)("div", __assign({ style: { margin: "20px" }, className: "markdown-body-light" }, { children: (0,jsx_runtime.jsxs)("table", __assign({ style: { width: "100%" } }, { children: [(0,jsx_runtime.jsx)("th", { children: "Informations" }), 
                                        /*
                                  // @ts-ignore */
                                        (function () {
                                            if (minMagisk != ( false || undefined)) {
                                                return ((0,jsx_runtime.jsxs)("tr", { children: [(0,jsx_runtime.jsx)("td", __assign({ style: { width: "100%" } }, { children: "Min. Magisk" })), (0,jsx_runtime.jsx)("td", { children: minMagisk })] }));
                                            }
                                        })(), 
                                        /*
                                  // @ts-ignore */
                                        (function () {
                                            if (minApi != ( false || undefined)) {
                                                return ((0,jsx_runtime.jsxs)("tr", { children: [(0,jsx_runtime.jsx)("td", __assign({ style: { width: "100%" } }, { children: "Min. Android" })), (0,jsx_runtime.jsx)("td", { children: minApi })] }));
                                            }
                                        })(), 
                                        /*
                                  // @ts-ignore */
                                        (function () {
                                            if (maxApi != ( false || undefined)) {
                                                return ((0,jsx_runtime.jsxs)("tr", { children: [(0,jsx_runtime.jsx)("td", __assign({ style: { width: "100%" } }, { children: "Max. Android" })), (0,jsx_runtime.jsx)("td", { children: maxApi })] }));
                                            }
                                        })(), 
                                        /*
                                  // @ts-ignore */
                                        (function () {
                                            if (needsRamdisk != ( false || undefined)) {
                                                return ((0,jsx_runtime.jsxs)("tr", { children: [(0,jsx_runtime.jsx)("td", __assign({ style: { width: "100%" } }, { children: "needsRamdisk" })), (0,jsx_runtime.jsx)("td", { children: needsRamdisk })] }));
                                            }
                                        })(), 
                                        /*
                                  // @ts-ignore */
                                        (function () {
                                            if (changeBoot != ( false || undefined)) {
                                                return ((0,jsx_runtime.jsxs)("tr", { children: [(0,jsx_runtime.jsx)("td", __assign({ style: { width: "100%" } }, { children: "changeBoot" })), (0,jsx_runtime.jsx)("td", { children: changeBoot })] }));
                                            }
                                        })()] })) })) }))] })) }));
        };
        _this.state = {
            notes: "",
            dialogShown: false,
        };
        return _this;
    }
    return ViewModuleActivity;
}(react.Component));
/* harmony default export */ const activitys_ViewModuleActivity = (ViewModuleActivity);

// EXTERNAL MODULE: ./node_modules/@mui/material/Chip/Chip.js + 2 modules
var Chip = __webpack_require__(461);
;// CONCATENATED MODULE: ./src/native/LoggerManager.ts
var __spreadArray = (undefined && undefined.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var LoggerManager = /** @class */ (function () {
    function LoggerManager(tag) {
        this.tag = tag;
    }
    LoggerManager.prototype.info = function (message) {
        var optionalParams = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            optionalParams[_i - 1] = arguments[_i];
        }
        console.info.apply(console, __spreadArray(["%c[" + this.tag + "]", "color: #0693e3", message], optionalParams, false));
    };
    LoggerManager.prototype.warn = function (message) {
        var optionalParams = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            optionalParams[_i - 1] = arguments[_i];
        }
        console.info.apply(console, __spreadArray(["%c[" + this.tag + "]", "color: orange", message], optionalParams, false));
    };
    LoggerManager.prototype.error = function (message) {
        var optionalParams = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            optionalParams[_i - 1] = arguments[_i];
        }
        console.info.apply(console, __spreadArray(["%c[" + this.tag + "]", "color: #d44950", message], optionalParams, false));
    };
    return LoggerManager;
}());
/* harmony default export */ const native_LoggerManager = (LoggerManager);

;// CONCATENATED MODULE: ./src/components/Item.tsx
var Item_extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Item_assign = (undefined && undefined.__assign) || function () {
    Item_assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return Item_assign.apply(this, arguments);
};




var Properties = __webpack_require__(8759);






var Item = /** @class */ (function (_super) {
    Item_extends(Item, _super);
    function Item(props) {
        var _this = _super.call(this, props) || this;
        _this.componentDidMount = function () {
            var propsUrl = _this.props.propsUrl;
            axios_default().get(propsUrl).then(function (response) {
                _this.setState({
                    props: Properties.parseToProperties(response.data),
                });
            });
        };
        _this.openReadmeFromParam = function (e) {
            _this.componentDidMount;
            var getId = _this.props.getId;
            try {
                var modul = utils_tools.getUrlParam("module");
                if (modul == getId) {
                    setTimeout(function () {
                        _this.log.info("Module found! Open ".concat(_this.state.props.name));
                        e.click();
                    }, 2000);
                }
            }
            catch (error) {
                _this.log.warn("Failed to open given module");
            }
        };
        _this.render = function () {
            var _a;
            var _b = _this.props, notesUrl = _b.notesUrl, downloadUrl = _b.downloadUrl, pushPage = _b.pushPage, moduleOptions = _b.moduleOptions, stars = _b.stars, last_update = _b.last_update, getId = _b.getId;
            var props = _this.state.props;
            return ((0,jsx_runtime.jsx)("div", Item_assign({ ref: _this.openReadmeFromParam, onClick: function () {
                    var _a, _b;
                    pushPage({
                        key: "view_".concat(props.id),
                        page: activitys_ViewModuleActivity,
                        extra: {
                            name: props.name,
                            download: downloadUrl,
                            id: getId,
                            author: props.author,
                            notes: notesUrl,
                            stars: stars,
                            moduleOptions: {
                                // @ts-ignore
                                verified: (_a = moduleOptions[getId]) === null || _a === void 0 ? void 0 : _a.verified,
                                // @ts-ignore
                                low: (_b = moduleOptions[getId]) === null || _b === void 0 ? void 0 : _b.low,
                            },
                            moduleProps: {
                                minMagisk: props.minMagisk,
                                minApi: props.minApi,
                                maxApi: props.maxApi,
                                needsRamdisk: props.needsRamdisk,
                                changeBoot: props.changeBoot,
                            },
                        },
                    });
                } }, { children: (0,jsx_runtime.jsx)(react_onsenui.Card, Item_assign({ id: getId, style: { display: (_a = moduleOptions[getId]) === null || _a === void 0 ? void 0 : _a.display, marginTop: "4px", marginBottom: "4px" } }, { children: (0,jsx_runtime.jsxs)("div", Item_assign({ className: "item-card-wrapper", ref: _this.searchedCard }, { children: [(0,jsx_runtime.jsxs)("div", Item_assign({ className: "title item-title" }, { children: [
                                    /*
                                  // @ts-ignore */
                                    (function () {
                                        var _a;
                                        // @ts-ignore
                                        if ((_a = moduleOptions[getId]) === null || _a === void 0 ? void 0 : _a.low) {
                                            return ((0,jsx_runtime.jsxs)(jsx_runtime.Fragment, { children: [(0,jsx_runtime.jsx)(Chip/* default */.Z, { onClick: function () {
                                                            esm["default"].notification.alert("This module has a bad module.prop");
                                                        }, variant: "outlined", color: "warning", size: "small", label: "Low-quality module" }), " "] }));
                                        }
                                    })(), (0,jsx_runtime.jsx)("span", Item_assign({ ref: _this.cardName }, { children: props.name })), 
                                    /*
                                  // @ts-ignore */
                                    (function () {
                                        var _a;
                                        // @ts-ignore
                                        if ((_a = moduleOptions[getId]) === null || _a === void 0 ? void 0 : _a.verified) {
                                            return ((0,jsx_runtime.jsxs)(jsx_runtime.Fragment, { children: [" ", (0,jsx_runtime.jsx)(VerfifiedIcon, { color: "#4a148c" })] }));
                                        }
                                    })()] })), (0,jsx_runtime.jsxs)("div", Item_assign({ className: "content" }, { children: [(0,jsx_runtime.jsx)("span", Item_assign({ className: "item-version-author" }, { children: props.version + " / " + props.author })), (0,jsx_runtime.jsx)("span", Item_assign({ className: "item-description" }, { children: props.description })), (0,jsx_runtime.jsxs)("span", Item_assign({ className: "item-last-update" }, { children: ["Last update: ", _this.formatDate(new Date(last_update))] }))] }))] })) }), getId) })));
        };
        _this.state = {
            props: {},
        };
        _this.searchedCard = react.createRef();
        _this.cardName = react.createRef();
        _this.log = new native_LoggerManager(_this.constructor.name);
        return _this;
    }
    Item.prototype.componentDidUpdate = function () {
        var _this = this;
        var searchState = this.props.searchState;
        utils_tools.ref(this.cardName, function (ref) {
            if (searchState != "") {
                var search = ref.textContent || ref.innerText;
                if (search.toLowerCase().indexOf(searchState) > -1) {
                    utils_tools.ref(_this.searchedCard, function (reff) {
                        reff.style.display = "";
                    });
                }
                else {
                    utils_tools.ref(_this.searchedCard, function (ref) {
                        ref.style.display = "none";
                    });
                }
            }
            else {
                utils_tools.ref(_this.searchedCard, function (ref) {
                    ref.style.display = "";
                });
            }
        });
    };
    Item.prototype.formatDate = function (date) {
        var hours = date.getHours();
        var minutes = date.getMinutes();
        var ampm = hours >= 12 ? "pm" : "am";
        hours = hours % 12;
        hours = hours ? hours : 12; // the hour '0' should be '12'
        // @ts-ignore
        minutes = minutes < 10 ? "0" + minutes : minutes;
        var strTime = hours + ":" + minutes + " " + ampm;
        return date.getMonth() + 1 + "/" + date.getDate() + "/" + date.getFullYear() + " " + strTime;
    };
    return Item;
}(react.Component));
/* harmony default export */ const components_Item = (Item);

;// CONCATENATED MODULE: ./src/components/icons/RepoIcon.jsx


class RepoIcon extends react.Component {
  render() {
    var {
      color,
      size,
      className
    } = this.props;
    return /*#__PURE__*/react.createElement("svg", {
      "aria-hidden": "true",
      height: size,
      viewBox: "0 0 16 16",
      version: "1.1",
      width: size,
      "data-view-component": "true",
      className: "octicon octicon-repo color-fg-muted mr-2 " + className
    }, /*#__PURE__*/react.createElement("path", {
      fill: color,
      "fill-rule": "evenodd",
      d: "M2 2.5A2.5 2.5 0 014.5 0h8.75a.75.75 0 01.75.75v12.5a.75.75 0 01-.75.75h-2.5a.75.75 0 110-1.5h1.75v-2h-8a1 1 0 00-.714 1.7.75.75 0 01-1.072 1.05A2.495 2.495 0 012 11.5v-9zm10.5-1V9h-8c-.356 0-.694.074-1 .208V2.5a1 1 0 011-1h8zM5 12.25v3.25a.25.25 0 00.4.2l1.45-1.087a.25.25 0 01.3 0L8.6 15.7a.25.25 0 00.4-.2v-3.25a.25.25 0 00-.25-.25h-3.5a.25.25 0 00-.25.25z"
    }));
  }

}

RepoIcon.defaultProps = {
  size: "16"
};
/* harmony default export */ const icons_RepoIcon = (RepoIcon);
;// CONCATENATED MODULE: ./src/components/icons/IssuesIscon.jsx


class IssuesIcon extends react.Component {
  render() {
    var {
      color,
      size,
      className
    } = this.props;
    return /*#__PURE__*/react.createElement("svg", {
      "aria-hidden": "true",
      height: size,
      viewBox: "0 0 24 24",
      version: "1.1",
      width: size,
      "data-view-component": "true",
      className: "octicon octicon-issue-opened blankslate-icon " + className
    }, /*#__PURE__*/react.createElement("path", {
      fill: color,
      "fill-rule": "evenodd",
      d: "M2.5 12a9.5 9.5 0 1119 0 9.5 9.5 0 01-19 0zM12 1C5.925 1 1 5.925 1 12s4.925 11 11 11 11-4.925 11-11S18.075 1 12 1zm0 13a2 2 0 100-4 2 2 0 000 4z"
    }));
  }

}

IssuesIcon.defaultProps = {
  size: "16"
};
/* harmony default export */ const IssuesIscon = (IssuesIcon);
;// CONCATENATED MODULE: ./src/native/PreferencesManager.ts


/**
 * Simple class to manage the web local sotrage and the Android native preferences
 */
var PreferencesManager = /** @class */ (function () {
    function PreferencesManager() {
        this.log = new native_LoggerManager(this.constructor.name);
        this.webStorage = localStorage;
    }
    /** Returns the current value associated with the given key, or null if the given key does not exist. */ // @ts-ignore
    PreferencesManager.prototype.getPref = function (key) {
        this.log.info("Requested ".concat(key));
        if (native_Constants.isAndroid) {
            var get = android.getPref(key);
            if (get === undefined || get === null || get === "") {
                return undefined;
            }
            else {
                return get;
            }
        }
        else {
            var get = this.webStorage.getItem(key);
            if (get === undefined || get === null || get === "") {
                return undefined;
            }
            else {
                return get;
            }
        }
    };
    /**
     * Sets the value of the pair identified by key to value, creating a new key/value pair if none existed for key previously.
     *
     * Throws a "QuotaExceededError" DOMException exception if the new value couldn't be set. (Setting could fail if, e.g., the user has disabled storage for the site, or if the quota has been exceeded.)
     *
     * Dispatches a storage event on Window objects holding an equivalent Storage object.
     */
    PreferencesManager.prototype.setPref = function (key, value) {
        // Never display the preference value!
        this.log.info("Save preference key ".concat(key, " with an value"));
        if (native_Constants.isAndroid) {
            android.setPref(key, value);
        }
        else {
            this.webStorage.setItem(key, value);
        }
    };
    /**
     * Removes the key/value pair with the given key, if a key/value pair with the given key exists.
     *
     * Dispatches a storage event on Window objects holding an equivalent Storage object.
     */
    PreferencesManager.prototype.removePref = function (key) {
        this.log.info("".concat(key, " was removed"));
        if (native_Constants.isAndroid) {
            android.removePref(key);
        }
        else {
            this.webStorage.removeItem(key);
        }
    };
    /**
     * Removes all key/value pairs, if there are any.
     *
     * Dispatches a storage event on Window objects holding an equivalent Storage object.
     */
    PreferencesManager.prototype.clearPrefs = function () {
        this.log.info("Preverences has been cleared");
        if (native_Constants.isAndroid) {
            android.clearPrefs();
        }
        else {
            this.webStorage.clear();
        }
    };
    return PreferencesManager;
}());
/* harmony default export */ const native_PreferencesManager = (PreferencesManager);

;// CONCATENATED MODULE: ./src/activitys/MainApplication.tsx
var MainApplication_extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var MainApplication_assign = (undefined && undefined.__assign) || function () {
    MainApplication_assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return MainApplication_assign.apply(this, arguments);
};












var MainApplication = /** @class */ (function (_super) {
    MainApplication_extends(MainApplication, _super);
    function MainApplication(props) {
        var _this = _super.call(this, props) || this;
        _this.componentDidMount = function () {
            var moduels = utils_tools.getUrlParam("module");
            if (moduels != ( false || "")) {
                react_toastify_esm/* toast.info */.Am.info("Please wait 2 seconds after the loading screen is gone", {
                    position: "top-center",
                    autoClose: 1500,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            }
            setTimeout(function () {
                _this.setState({ loading: false });
            }, 2000);
            axios_default().get(_this.prefManager.getPref("repo"))
                .then(function (response) {
                var modules = response.data.modules;
                _this.setState({
                    modulesIndex: modules,
                    status: "success",
                });
            })
                .catch(function (error) {
                _this.setState({
                    modulesIndex: [],
                    status: "error",
                });
            })
                .then(function () {
                // always executed
            });
            axios_default().get("https://repo.dergoogler.com/moduleOptions.json").then(function (response) {
                _this.setState({
                    moduleOptions: response.data,
                });
            });
        };
        _this.componentDidCatch = function () { };
        _this.renderToolbar = function () {
            return (
            // @ts-ignore
            (0,jsx_runtime.jsxs)(react_onsenui.Toolbar, { children: [(0,jsx_runtime.jsx)("div", MainApplication_assign({ className: "center" }, { children: "Magisk Module Repo Loader" })), (0,jsx_runtime.jsx)("div", MainApplication_assign({ className: "right" }, { children: (0,jsx_runtime.jsx)(react_onsenui.ToolbarButton, MainApplication_assign({ style: { padding: "0px 10px" }, onClick: _this.showDialog }, { children: (0,jsx_runtime.jsx)(components_MDIcon, { icon: "more_vert", isInToolbar: true, theme: "white", size: "24" }) })) }))] }));
        };
        _this.filter = function (e) {
            _this.setState({ currentSerachText: e.target.value.toLowerCase() });
        };
        _this.triggerSearch = function () {
            var currentSerachText = _this.state.currentSerachText;
            _this.setState({ search: currentSerachText });
        };
        _this.showDialog = function () {
            _this.setState({ dialogShown: true });
        };
        _this.hideDialog = function () {
            _this.setState({ dialogShown: false });
        };
        _this.render = function () {
            var _a = _this.state, search = _a.search, loading = _a.loading;
            var modules = _this.state.modulesIndex.map(function (item) {
                return ((0,jsx_runtime.jsx)(components_Item, { getId: item.id, propsUrl: item.prop_url, notesUrl: item.notes_url, downloadUrl: item.zip_url, pushPage: _this.props.pushPage, searchState: search, moduleOptions: _this.state.moduleOptions, last_update: item.last_update }, item.id));
            });
            return ((0,jsx_runtime.jsxs)(react_onsenui.Page, MainApplication_assign({ renderToolbar: _this.renderToolbar }, { children: [(0,jsx_runtime.jsxs)("div", MainApplication_assign({ style: {
                            textAlign: "center",
                            display: "flex",
                            justifyContent: "center",
                            padding: "0px",
                            paddingBottom: "0px",
                            flexDirection: "column",
                        } }, { children: [(0,jsx_runtime.jsxs)("div", MainApplication_assign({ style: {
                                    textAlign: "center",
                                    display: "inline-flex",
                                    justifyContent: "center",
                                    padding: "8px 8px 4px",
                                } }, { children: [(0,jsx_runtime.jsx)(react_onsenui.SearchInput
                                    // @ts-ignore
                                    , { 
                                        // @ts-ignore
                                        placeholder: "Search modules", ref: _this.searchBar, style: {
                                            borderRadius: "8px",
                                            width: "100%",
                                            marginRight: "4px",
                                        }, onChange: _this.filter }), (0,jsx_runtime.jsx)(react_onsenui.Button, MainApplication_assign({ onClick: _this.triggerSearch, style: {
                                            textAlign: "center",
                                            display: "flex",
                                            justifyContent: "center",
                                            marginLeft: "4px",
                                            borderRadius: "8px",
                                        } }, { children: (0,jsx_runtime.jsx)(components_MDIcon, { icon: "search", size: "24", ignoreDarkmode: true }) }))] })), (0,jsx_runtime.jsx)("module-container", MainApplication_assign({ style: {
                                    paddingBottom: "4px",
                                } }, { children: (function () {
                                    if (loading) {
                                        return ((0,jsx_runtime.jsx)(react_onsenui.ProgressCircular, { indeterminate: true, style: {
                                                position: "absolute",
                                                left: "50%",
                                                top: "50%",
                                                WebkitTransform: "translate(-50%, -50%)",
                                                transform: "translate(-50%, -50%)",
                                            } }));
                                    }
                                    else {
                                        return modules;
                                    }
                                })() }))] })), " ", (0,jsx_runtime.jsx)(react_onsenui.Dialog, MainApplication_assign({ visible: _this.state.dialogShown, cancelable: true, onDialogCancel: _this.hideDialog }, { children: (0,jsx_runtime.jsxs)(react_onsenui.List, MainApplication_assign({ style: { margin: "20px" } }, { children: [(0,jsx_runtime.jsxs)(react_onsenui.ListItem, MainApplication_assign({ onClick: function () {
                                        esm["default"].notification.prompt("Custom Repo").then(function (input) {
                                            _this.hideDialog();
                                            // @ts-ignore
                                            if (utils_tools.validURL(input)) {
                                                // @ts-ignore
                                                _this.prefManager.setPref("repo", input);
                                                esm["default"].notification.alert("Repo changed, please refresh the app");
                                            }
                                            else {
                                                esm["default"].notification.alert("Invalid input");
                                            }
                                        });
                                    } }, { children: [(0,jsx_runtime.jsx)("div", MainApplication_assign({ className: "left" }, { children: (0,jsx_runtime.jsx)(icons_RepoIcon, { size: "24" }) })), (0,jsx_runtime.jsx)("div", MainApplication_assign({ className: "center" }, { children: "Custom repo" }))] })), (0,jsx_runtime.jsxs)(react_onsenui.ListItem, MainApplication_assign({ onClick: function () {
                                        window.open("https://github.com/DerGoogler/DG-Repo/issues", "_blank");
                                        _this.hideDialog();
                                    } }, { children: [(0,jsx_runtime.jsx)("div", MainApplication_assign({ className: "left" }, { children: (0,jsx_runtime.jsx)(IssuesIscon, { size: "24" }) })), (0,jsx_runtime.jsx)("div", MainApplication_assign({ className: "center" }, { children: "Issues" }))] }))] })) }))] })));
        };
        _this.state = {
            modulesIndex: [],
            dialogShown: false,
            status: "success",
            currentSerachText: "",
            search: "",
            moduleOptions: {},
            loading: true,
        };
        _this.clickCard = react.createRef();
        _this.prefManager = new native_PreferencesManager();
        return _this;
    }
    return MainApplication;
}(react.Component));
/* harmony default export */ const activitys_MainApplication = (MainApplication);

;// CONCATENATED MODULE: ./src/activitys/MainActivity.tsx
var MainActivity_extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var MainActivity_assign = (undefined && undefined.__assign) || function () {
    MainActivity_assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return MainActivity_assign.apply(this, arguments);
};




var MainActivity = /** @class */ (function (_super) {
    MainActivity_extends(MainActivity, _super);
    function MainActivity(props) {
        var _this = _super.call(this, props) || this;
        _this.componentDidMount = function () {
            window.addEventListener("load", _this.windowLoadPush);
        };
        _this.componentWillUnmount = function () {
            window.removeEventListener("load", _this.windowLoadPush);
        };
        _this.windowLoadPush = function () {
            if (typeof history.pushState === "function") {
                history.pushState("jibberish", "", null);
                window.onpopstate = function () {
                    history.pushState("newjibberish", "", null);
                    if (_this.state.currentPage === "main") {
                        // Will added later
                        // native.close();
                    }
                    else {
                        _this.popPage();
                    }
                };
            }
            else {
                var ignoreHashChange = true;
                window.onhashchange = function () {
                    if (!ignoreHashChange) {
                        ignoreHashChange = true;
                        window.location.hash = Math.random().toString();
                    }
                    else {
                        ignoreHashChange = false;
                    }
                };
            }
        };
        _this.pushPage = function (props) {
            var route = {
                component: props.page,
                props: {
                    key: props.key,
                    extra: props === null || props === void 0 ? void 0 : props.extra,
                    popPage: function () { return _this.popPage(); },
                    pushPage: function () {
                        var args = [];
                        for (var _i = 0; _i < arguments.length; _i++) {
                            args[_i] = arguments[_i];
                        }
                        return _this.pushPage.apply(null, args);
                    },
                },
            };
            var routeConfig = _this.state.routeConfig;
            routeConfig = react_onsenui.RouterUtil.push({
                routeConfig: routeConfig,
                route: route,
            });
            _this.setState({ routeConfig: routeConfig, currentPage: props.key });
        };
        _this.popPage = function (options) {
            if (options === void 0) { options = {}; }
            var routeConfig = _this.state.routeConfig;
            routeConfig = react_onsenui.RouterUtil.pop({
                routeConfig: routeConfig,
                options: MainActivity_assign(MainActivity_assign({}, options), { animationOptions: {
                        duration: 0.2,
                        timing: "ease-in",
                        animation: "fade-md",
                    } }),
            });
            _this.setState({ routeConfig: routeConfig });
            _this.setState({ currentPage: "main" });
        };
        _this.onPostPush = function () {
            var routeConfig = react_onsenui.RouterUtil.postPush(_this.state.routeConfig);
            _this.setState({ routeConfig: routeConfig });
        };
        _this.onPostPop = function () {
            var routeConfig = react_onsenui.RouterUtil.postPop(_this.state.routeConfig);
            _this.setState({ routeConfig: routeConfig });
        };
        _this.renderPage = function (route) {
            var props = route.props || {};
            return (0,jsx_runtime.jsx)(route.component, MainActivity_assign({}, props));
        };
        _this.renderToolbar = function () {
            return (
            // @ts-ignore
            (0,jsx_runtime.jsxs)(react_onsenui.Toolbar, { children: [(0,jsx_runtime.jsx)("div", MainActivity_assign({ className: "left" }, { children: (0,jsx_runtime.jsx)(react_onsenui.BackButton, {}) })), (0,jsx_runtime.jsx)("div", MainActivity_assign({ className: "center" }, { children: "Stateless Navigator" }))] }));
        };
        _this.render = function () {
            return ((0,jsx_runtime.jsx)(react_onsenui.Page, { children: (0,jsx_runtime.jsx)(react_onsenui.RouterNavigator, { swipeable: true, 
                    // @ts-ignore
                    swipePop: function (options) { return _this.popPage(options); }, routeConfig: _this.state.routeConfig, renderPage: _this.renderPage, onPostPush: function () { return _this.onPostPush(); }, onPostPop: function () { return _this.onPostPop(); } }) }));
        };
        var routeConfig = react_onsenui.RouterUtil.init([
            {
                component: activitys_MainApplication,
                props: {
                    key: "main",
                    pushPage: function () {
                        var args = [];
                        for (var _i = 0; _i < arguments.length; _i++) {
                            args[_i] = arguments[_i];
                        }
                        return _this.pushPage.apply(null, args);
                    },
                },
            },
        ]);
        _this.state = { routeConfig: routeConfig, currentPage: "main" };
        return _this;
    }
    return MainActivity;
}(react.Component));
/* harmony default export */ const activitys_MainActivity = (MainActivity);

;// CONCATENATED MODULE: ./src/styles/theme.ts
var theme = {
    "@global": {
        ":root": {},
        html: {
            height: "100%",
            width: "100%",
        },
        body: {
            position: "absolute",
            overflow: "hidden",
            top: "0",
            right: "0",
            left: "0",
            bottom: "0",
            padding: "0",
            margin: "0",
            webkitTextSizeAdjust: "100%",
            touchAction: "manipulation",
        },
        "html, body, div, span, applet, object, iframe, h1, h2, h3, h4, h5, h6, p, blockquote, pre, a, abbr, acronym, address, big, cite, code, del, dfn, em, img, ins, kbd, q, s, samp, small, strike, strong, sub, sup, tt, var, b, u, i, center, dl, dt, dd, ol, ul, li, fieldset, form, label, legend, table, caption, tbody, tfoot, thead, tr, th, td, article, aside, canvas, details, embed, figure, figcaption, footer, header, hgroup, menu, nav, output, ruby, section, summary, time, mark, audio, video": {
            webkitUserSelect: "none",
            mozUserSelect: "none",
            msUserSelect: "none",
            userSelect: "none",
            webkitTapHighlightColor: "transparent",
            webkitTouchCallout: "none",
        },
        "input, textarea, select": {
            webkitUserSelect: "auto",
            msUserSelect: "auto",
            userSelect: "auto",
            mozUserSelect: "text",
            webkitTouchCallout: "none",
        },
        "a, button, input, textarea, select": {
            touchAction: "manipulation",
        },
        "input:active, input:focus, textarea:active, textarea:focus, select:active, select:focus": {
            outline: "none",
        },
        h1: {
            fontSize: "36px",
        },
        h2: {
            fontSize: "30px",
        },
        h3: {
            fontSize: "24px",
        },
        "h4, h5, h6": {
            fontSize: "18px",
        },
        ".page": {
            fontFamily: '-apple-system, "Helvetica Neue", "Helvetica", "Arial", "Lucida Grande", sans-serif',
            webkitFontSmoothing: "antialiased",
            mozOsxFontSmoothing: "grayscale",
            fontWeight: "400",
            backgroundColor: "rgba(255, 255, 255, 1)",
            fallbacks: [
                {
                    // @ts-ignore
                    webkitFontSmoothing: "antialiased",
                },
                {
                    backgroundColor: "#ffffff",
                },
            ],
            position: "absolute",
            top: "0",
            left: "0",
            right: "0",
            bottom: "0",
            overflowX: "visible",
            overflowY: "hidden",
            color: "#1f1f21",
            msOverflowStyle: "none",
        },
        ".page::-webkit-scrollbar": {
            display: "none",
        },
        ".page__content": {
            backgroundColor: "rgba(255, 255, 255, 1)",
            fallbacks: [
                {
                    bottom: "0",
                },
                {
                    top: "0",
                },
                {
                    backgroundColor: "#ffffff",
                },
            ],
            position: "absolute",
            top: "0",
            left: "0",
            right: "0",
            bottom: "0",
            boxSizing: "border-box",
            paddingTop: "0",
        },
        ".page__background": {
            backgroundColor: "rgba(255, 255, 255, 1)",
            fallbacks: [
                {
                    backgroundColor: "#ffffff",
                },
            ],
            position: "absolute",
            top: "0",
            left: "0",
            right: "0",
            bottom: "0",
            boxSizing: "border-box",
        },
        ".page--material": {
            fontFamily: '"Roboto", "Noto", sans-serif',
            webkitFontSmoothing: "antialiased",
            fontWeight: "400",
            backgroundColor: "rgba(255, 255, 255, 1)",
            fallbacks: [
                {
                    backgroundColor: "#ffffff",
                },
            ],
        },
        ".page--material__content": {
            fontFamily: '"Roboto", "Noto", sans-serif',
            webkitFontSmoothing: "antialiased",
            fontWeight: "400",
            fallbacks: [
                {
                    fontWeight: "400",
                },
            ],
        },
        ".page__content h1, .page__content h2, .page__content h3, .page__content h4, .page__content h5": {
            fontFamily: '"Roboto", "Noto", sans-serif',
            webkitFontSmoothing: "antialiased",
            fontWeight: "500",
            fallbacks: [
                {
                    fontWeight: "400",
                },
            ],
            margin: "0.6em 0",
            padding: "0",
        },
        ".page__content h1": {
            fontSize: "28px",
        },
        ".page__content h2": {
            fontSize: "24px",
        },
        ".page__content h3": {
            fontSize: "20px",
        },
        ".page--material__content h1, .page--material__content h2, .page--material__content h3, .page--material__content h4, .page--material__content h5": {
            fontFamily: '"Roboto", "Noto", sans-serif',
            webkitFontSmoothing: "antialiased",
            fontWeight: "500",
            fallbacks: [
                {
                    fontWeight: "400",
                },
            ],
            margin: "0.6em 0",
            padding: "0",
        },
        ".page--material__content h1": {
            fontSize: "28px",
        },
        ".page--material__content h2": {
            fontSize: "24px",
        },
        ".page--material__content h3": {
            fontSize: "20px",
        },
        ".page--material__background": {
            backgroundColor: "rgba(255, 255, 255, 1)",
            fallbacks: [
                {
                    backgroundColor: "#ffffff",
                },
            ],
        },
        ".switch": {
            display: "inline-block",
            verticalAlign: "top",
            boxSizing: "border-box",
            backgroundClip: "padding-box",
            position: "relative",
            minWidth: "51px",
            fontSize: "17px",
            padding: "0 20px",
            border: "none",
            overflow: "visible",
            width: "51px",
            height: "32px",
            zIndex: "0",
            textAlign: "left",
        },
        ".switch__input": {
            position: "absolute",
            right: "0",
            top: "0",
            left: "0",
            bottom: "0",
            padding: "0",
            border: "0",
            backgroundColor: "transparent",
            zIndex: "0",
            verticalAlign: "top",
            outline: "none",
            width: "100%",
            height: "100%",
            margin: "0",
            webkitAppearance: "none",
            mozAppearance: "none",
            appearance: "none",
            fallbacks: [
                {
                    zIndex: "1",
                },
            ],
        },
        ".switch__toggle": {
            backgroundColor: "white",
            position: "absolute",
            top: "0",
            left: "0",
            right: "0",
            bottom: "0",
            borderRadius: "30px",
            transitionProperty: "all",
            transitionDuration: "0.35s",
            transitionTimingFunction: "ease-out",
            boxShadow: "inset 0 0 0 2px #e5e5e5",
        },
        ".switch__handle": {
            boxSizing: "border-box",
            backgroundClip: "padding-box",
            position: "absolute",
            content: '""',
            borderRadius: "28px",
            height: "28px",
            width: "28px",
            backgroundColor: "white",
            left: "1px",
            top: "2px",
            transitionProperty: "all",
            transitionDuration: "0.35s",
            transitionTimingFunction: "cubic-bezier(0.59, 0.01, 0.5, 0.99)",
            boxShadow: "0 0 1px 0 rgba(0, 0, 0, 0.25), 0 3px 2px rgba(0, 0, 0, 0.25)",
        },
        ".switch--active__handle": {
            transition: "none",
        },
        ":checked + .switch__toggle": {
            boxShadow: "inset 0 0 0 2px #44db5e",
            backgroundColor: "#44db5e",
        },
        ":checked + .switch__toggle > .switch__handle": {
            left: "21px",
            boxShadow: "0 3px 2px rgba(0, 0, 0, 0.25)",
        },
        ":disabled + .switch__toggle": {
            opacity: "0.3",
            pointerEvents: "none",
        },
        ".switch__touch": {
            position: "absolute",
            top: "-5px",
            bottom: "-5px",
            left: "-10px",
            right: "-10px",
        },
        ".switch--material": {
            width: "36px",
            height: "24px",
            padding: "0 10px",
            minWidth: "36px",
        },
        ".switch--material__toggle": {
            backgroundColor: "#b0afaf",
            marginTop: "5px",
            height: "14px",
            boxShadow: "none",
        },
        ".switch--material__input": {
            position: "absolute",
            right: "0",
            top: "0",
            left: "0",
            bottom: "0",
            padding: "0",
            border: "0",
            backgroundColor: "transparent",
            zIndex: "0",
            verticalAlign: "top",
            outline: "none",
            width: "100%",
            height: "100%",
            margin: "0",
            webkitAppearance: "none",
            mozAppearance: "none",
            appearance: "none",
            fallbacks: [
                {
                    zIndex: "1",
                },
            ],
        },
        ".switch--material__handle": {
            backgroundColor: "#f1f1f1",
            left: "0",
            marginTop: "-5px",
            width: "20px",
            height: "20px",
            boxShadow: "0 4px 5px 0 rgba(0, 0, 0, 0.14), 0 1px 10px 0 rgba(0, 0, 0, 0.12),\r\n    0 2px 4px -1px rgba(0, 0, 0, 0.4)",
        },
        ":checked + .switch--material__toggle": {
            backgroundColor: "#7c43bd",
            boxShadow: "none",
        },
        ":checked + .switch--material__toggle > .switch--material__handle": {
            left: "16px",
            backgroundColor: "#4a148c",
            boxShadow: "0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12),\r\n    0 3px 1px -2px rgba(0, 0, 0, 0.2)",
        },
        ":disabled + .switch--material__toggle": {
            opacity: "0.3",
            pointerEvents: "none",
        },
        ".switch--material__handle:before": {
            background: "transparent",
            content: '""',
            display: "block",
            width: "100%",
            height: "100%",
            borderRadius: "50%",
            zIndex: "0",
            boxShadow: "0 0 0 0 rgba(0, 0, 0, 0.12)",
            transition: "box-shadow 0.1s linear",
        },
        ".switch--material__toggle > .switch--active__handle:before": {
            boxShadow: "0 0 0 14px rgba(0, 0, 0, 0.12)",
        },
        ":checked + .switch--material__toggle > .switch--active__handle:before": {
            boxShadow: "0 0 0 14px color-mod(#4a148c alpha(20%))",
        },
        ".switch--material__touch": {
            position: "absolute",
            top: "-10px",
            bottom: "-10px",
            left: "-15px",
            right: "-15px",
        },
        ".range": {
            display: "inline-block",
            position: "relative",
            width: "100px",
            height: "30px",
            margin: "0",
            padding: "0",
            backgroundImage: "linear-gradient(#a4aab3, #a4aab3)",
            backgroundPosition: "left center",
            backgroundSize: "100% 2px",
            backgroundRepeat: "no-repeat",
            backgroundColor: "transparent",
        },
        ".range__input": {
            boxSizing: "border-box",
            backgroundClip: "padding-box",
            padding: "0",
            margin: "0",
            font: "inherit",
            color: "inherit",
            background: "transparent",
            border: "none",
            verticalAlign: "top",
            outline: "none",
            lineHeight: "1",
            webkitAppearance: "none",
            mozAppearance: "none",
            appearance: "none",
            backgroundImage: "linear-gradient(#4a148c, #4a148c)",
            backgroundPosition: "left center",
            backgroundSize: "0% 2px",
            backgroundRepeat: "no-repeat",
            height: "30px",
            position: "relative",
            zIndex: "1",
            width: "100%",
        },
        ".range__input::-moz-range-track": {
            position: "relative",
            border: "none",
            background: "none",
            boxShadow: "none",
            top: "0",
            margin: "0",
            padding: "0",
        },
        ".range__input::-ms-track": {
            position: "relative",
            border: "none",
            backgroundColor: "#a4aab3",
            height: "0",
            borderRadius: "50%",
        },
        ".range__input::-webkit-slider-thumb": {
            position: "relative",
            height: "28px",
            width: "28px",
            backgroundColor: "#fff",
            border: "none",
            boxShadow: "0 0 1px 0 rgba(0, 0, 0, 0.25), 0 3px 2px rgba(0, 0, 0, 0.25)",
            borderRadius: "50%",
            margin: "0",
            padding: "0",
            boxSizing: "border-box",
            webkitAppearance: "none",
            appearance: "none",
            top: "0",
            zIndex: "1",
        },
        ".range__input::-moz-range-thumb": {
            position: "relative",
            height: "28px",
            width: "28px",
            backgroundColor: "#fff",
            border: "none",
            boxShadow: "0 0 1px 0 rgba(0, 0, 0, 0.25), 0 3px 2px rgba(0, 0, 0, 0.25)",
            borderRadius: "50%",
            margin: "0",
            padding: "0",
        },
        ".range__input::-ms-thumb": {
            position: "relative",
            height: "28px",
            width: "28px",
            backgroundColor: "#fff",
            border: "none",
            boxShadow: "0 0 1px 0 rgba(0, 0, 0, 0.25), 0 3px 2px rgba(0, 0, 0, 0.25)",
            borderRadius: "50%",
            margin: "0",
            padding: "0",
            top: "0",
        },
        ".range__input::-ms-fill-lower": {
            height: "2px",
            backgroundColor: "#4a148c",
        },
        ".range__input::-ms-tooltip": {
            display: "none",
        },
        ".range__input:disabled": {
            opacity: "1",
            pointerEvents: "none",
        },
        ".range__focus-ring": {
            pointerEvents: "none",
            top: "0",
            left: "0",
            display: "none",
            boxSizing: "border-box",
            backgroundClip: "padding-box",
            padding: "0",
            margin: "0",
            font: "inherit",
            color: "inherit",
            background: "none",
            border: "none",
            verticalAlign: "top",
            outline: "none",
            lineHeight: "1",
            webkitAppearance: "none",
            mozAppearance: "none",
            appearance: "none",
            fallbacks: [
                {
                    background: "transparent",
                },
            ],
            height: "30px",
            position: "absolute",
            zIndex: "0",
            width: "100%",
        },
        ".range--disabled": {
            opacity: "0.3",
            pointerEvents: "none",
            fallbacks: [
                {
                    pointerEvents: "none",
                },
            ],
        },
        ".range--material": {
            position: "relative",
            backgroundImage: "linear-gradient(#bdbdbd, #bdbdbd)",
        },
        ".range--material__input": {
            backgroundImage: "linear-gradient(#4a148c, #4a148c)",
            backgroundPosition: "center left",
            backgroundSize: "0% 2px",
        },
        ".range--material__focus-ring": {
            display: "block",
        },
        ".range--material__focus-ring::-webkit-slider-thumb": {
            webkitAppearance: "none",
            appearance: "none",
            width: "14px",
            height: "14px",
            border: "none",
            boxShadow: "0 0 0 9px #4a148c",
            backgroundColor: "#4a148c",
            borderRadius: "50%",
            opacity: "0",
            transition: "opacity 0.25s ease-out, transform 0.25s ease-out, -webkit-transform 0.25s ease-out",
            fallbacks: [
                {
                    transition: "opacity 0.25s ease-out, transform 0.25s ease-out",
                },
                {
                    transition: "opacity 0.25s ease-out, -webkit-transform 0.25s ease-out",
                },
            ],
        },
        ".range--material__input.range__input--active + .range--material__focus-ring::-webkit-slider-thumb": {
            opacity: "0.2",
            webkitTransform: "scale(1.5, 1.5, 1.5)",
            transform: "scale(1.5, 1.5, 1.5)",
        },
        ".range--material__input::-webkit-slider-thumb": {
            position: "relative",
            boxSizing: "border-box",
            border: "none",
            backgroundColor: "transparent",
            width: "14px",
            height: "32px",
            borderRadius: "0",
            boxShadow: "none",
            backgroundImage: "radial-gradient(\r\n    circle farthest-corner,\r\n    #4a148c 0%,\r\n    #4a148c 6.6px,\r\n    transparent 7px\r\n  )",
            transition: "transform 0.1s linear, -webkit-transform 0.1s linear",
            fallbacks: [
                {
                    transition: "transform 0.1s linear",
                },
                {
                    transition: "-webkit-transform 0.1s linear",
                },
            ],
            overflow: "visible",
        },
        ".range--material__input[_zero]::-webkit-slider-thumb": {
            backgroundImage: "radial-gradient(\r\n    circle farthest-corner,\r\n    #f2f2f2 0%,\r\n    #f2f2f2 4px,\r\n    #bdbdbd 4px,\r\n    #bdbdbd 6.4px,\r\n    transparent 7px\r\n  )",
        },
        ".range--material__input[_zero] + .range--material__focus-ring::-webkit-slider-thumb": {
            boxShadow: "0 0 0 9px #bdbdbd",
        },
        ".range--material__input::-moz-range-track": {
            background: "none",
        },
        ".range--material__input::-moz-range-thumb, .range--material__input:focus::-moz-range-thumb": {
            boxSizing: "border-box",
            border: "none",
            width: "14px",
            height: "32px",
            borderRadius: "0",
            backgroundColor: "transparent",
            backgroundImage: "-moz-radial-gradient(\r\n    circle farthest-corner,\r\n    #4a148c 0%,\r\n    #4a148c 6.6px,\r\n    transparent 7px\r\n  )",
            boxShadow: "none",
        },
        ".range--material__input:active::-webkit-slider-thumb, .range--material__input.range__input--active::-webkit-slider-thumb": {
            webkitTransform: "scale(1.5)",
            transform: "scale(1.5)",
            transition: "transform 0.1s linear, -webkit-transform 0.1s linear",
            fallbacks: [
                {
                    transition: "transform 0.1s linear",
                },
                {
                    transition: "-webkit-transform 0.1s linear",
                },
            ],
        },
        ".range--disabled.range--material": {
            opacity: "1",
        },
        ".range--disabled > .range--material__input": {
            backgroundImage: "none",
        },
        ".range--material__input:disabled::-webkit-slider-thumb": {
            backgroundImage: "radial-gradient(\r\n    circle farthest-corner,\r\n    #b0b0b0 0%,\r\n    #b0b0b0 4px,\r\n    #eeeeee 4.4px,\r\n    #eeeeee 7.6px,\r\n    transparent 7.6px\r\n  )",
            transition: "none",
        },
        ".range--material__input:disabled::-moz-range-thumb": {
            backgroundImage: "-moz-radial-gradient(\r\n    circle farthest-corner,\r\n    #b0b0b0 0%,\r\n    #b0b0b0 4px,\r\n    #eeeeee 4.4px,\r\n    #eeeeee 7.6px,\r\n    transparent 7.6px\r\n  )",
            transition: "none",
        },
        ".notification": {
            position: "relative",
            display: "inline-block",
            verticalAlign: "top",
            font: "inherit",
            border: "none",
            boxSizing: "border-box",
            backgroundClip: "padding-box",
            padding: "0 4px",
            margin: "0",
            fallbacks: [
                {
                    fontWeight: "400",
                },
                {
                    lineHeight: "normal",
                },
                {
                    color: "inherit",
                },
                {
                    padding: "0",
                },
                {
                    margin: "0",
                },
                {
                    border: "none",
                },
                {
                    font: "inherit",
                },
            ],
            color: "white",
            background: "transparent",
            lineHeight: "19px",
            fontFamily: '-apple-system, "Helvetica Neue", "Helvetica", "Arial", "Lucida Grande", sans-serif',
            webkitFontSmoothing: "antialiased",
            mozOsxFontSmoothing: "grayscale",
            fontWeight: "400",
            webkitUserSelect: "none",
            mozUserSelect: "none",
            msUserSelect: "none",
            userSelect: "none",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textDecoration: "none",
            width: "auto",
            height: "19px",
            borderRadius: "19px",
            backgroundColor: "#fe3824",
            textAlign: "center",
            fontSize: "16px",
            minWidth: "19px",
        },
        ".notification:empty": {
            display: "none",
        },
        ".notification--material": {
            fontFamily: '"Roboto", "Noto", sans-serif',
            webkitFontSmoothing: "antialiased",
            fontWeight: "500",
            backgroundColor: "#4a148c",
            fontSize: "16px",
            fallbacks: [
                {
                    fontWeight: "400",
                },
            ],
            color: "white",
        },
        ".toolbar": {
            fontFamily: '-apple-system, "Helvetica Neue", "Helvetica", "Arial", "Lucida Grande", sans-serif',
            webkitFontSmoothing: "antialiased",
            mozOsxFontSmoothing: "grayscale",
            fontWeight: "400",
            boxSizing: "border-box",
            backgroundClip: "padding-box",
            whiteSpace: "nowrap",
            overflow: "hidden",
            wordSpacing: "0",
            padding: "0",
            margin: "0",
            font: "inherit",
            color: "#1f1f21",
            background: "#fafafa",
            border: "none",
            lineHeight: "normal",
            webkitUserSelect: "none",
            mozUserSelect: "none",
            msUserSelect: "none",
            userSelect: "none",
            zIndex: "2",
            display: "flex",
            fallbacks: [
                {
                    boxSizing: "border-box",
                },
                {
                    whiteSpace: "nowrap",
                },
                {
                    fontWeight: "400",
                },
                {
                    color: "inherit",
                },
                {
                    background: "transparent",
                },
                {
                    display: "-webkit-flex",
                },
                {
                    display: "-webkit-box",
                },
            ],
            webkitBoxAlign: "stretch",
            webkitAlignItems: "stretch",
            alignItems: "stretch",
            webkitFlexWrap: "nowrap",
            flexWrap: "nowrap",
            height: "44px",
            paddingLeft: "0",
            paddingRight: "0",
            boxShadow: "none",
            width: "100%",
            borderBottom: "none",
            backgroundSize: "100% 1px",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "bottom",
            backgroundImage: "linear-gradient(0deg, #b2b2b2, #b2b2b2 100%)",
            top: "0",
            paddingTop: "0",
        },
        "@media (-webkit-min-device-pixel-ratio: 2), (min-resolution: 192dpi), (min-resolution: 2dppx)": {
            ".toolbar": {
                backgroundImage: "linear-gradient(0deg, #b2b2b2, #b2b2b2 50%, transparent 50%)",
            },
            ".bottom-bar": {
                backgroundImage: "linear-gradient(180deg, #b2b2b2, #b2b2b2 50%, transparent 50%)",
            },
            ".tabbar": {
                borderTop: "none",
                backgroundSize: "100% 1px",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "top",
                backgroundImage: "linear-gradient(180deg, #ccc, #ccc 50%, transparent 50%)",
            },
            ".tabbar__button": {
                borderTop: "none",
            },
            ".tabbar--top": {
                borderBottom: "none",
                backgroundSize: "100% 1px",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "bottom",
                backgroundImage: "linear-gradient(0deg, #ccc, #ccc 50%, transparent 50%)",
            },
            ".list": {
                backgroundImage: "linear-gradient(0deg, #ccc, #ccc 50%, transparent 50%),\r\n      linear-gradient(180deg, #ccc, #ccc 50%, transparent 50%)",
            },
            ".list-item--expandable": {
                backgroundImage: "linear-gradient(0deg, #ccc, #ccc 50%, transparent 50%)",
            },
            ".list-item__center": {
                backgroundImage: "linear-gradient(0deg, #ccc, #ccc 50%, transparent 50%)",
            },
            ".list-item__right": {
                backgroundImage: "linear-gradient(0deg, #ccc, #ccc 50%, transparent 50%)",
            },
            ".list-header": {
                backgroundImage: "linear-gradient(180deg, #ccc, #ccc 50%, transparent 50%)",
            },
            ".list-item--material__left:empty, .list-item--material__center": {
                backgroundImage: "linear-gradient(0deg, #eee, #eee 50%, transparent 50%)",
            },
            ".list-item--material__right": {
                backgroundImage: "linear-gradient(0deg, #eee, #eee 50%, transparent 50%)",
            },
            ".list-item--material.list-item--expandable": {
                backgroundImage: "linear-gradient(0deg, #eee, #eee 50%, transparent 50%)",
            },
            ".list-item--material.list-item--longdivider, .list-item--material.list-item--expandable.list-item--longdivider": {
                backgroundImage: "linear-gradient(0deg, #eee, #eee 50%, transparent 50%)",
            },
            ".list-header--material:not(:first-of-type)": {
                backgroundImage: "linear-gradient(180deg, #eee, #eee 50%, transparent 50%)",
            },
            ".list-item--longdivider": {
                backgroundImage: "linear-gradient(0deg, #ccc, #ccc 50%, transparent 50%)",
            },
            ".alert-dialog-button": {
                borderTop: "none",
                backgroundSize: "100% 1px",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "top",
                backgroundImage: "linear-gradient(180deg, #ddd, #ddd 50%, transparent 50%)",
            },
            ".alert-dialog-button--rowfooter": {
                borderTop: "none",
                borderLeft: "none",
                backgroundSize: "100% 1px, 1px 100%",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "top, left",
                backgroundImage: "linear-gradient(0deg, transparent, transparent 50%, #ddd 50%),\r\n      linear-gradient(90deg, transparent, transparent 50%, #ddd 50%)",
            },
            ".alert-dialog-button--rowfooter:first-child": {
                borderTop: "none",
                backgroundSize: "100% 1px",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "top, left",
                backgroundImage: "linear-gradient(0deg, transparent, transparent 50%, #ddd 50%)",
            },
            ".alert-dialog-button--material": {
                background: "none",
            },
            ".alert-dialog-button--rowfooter--material, .alert-dialog-button--rowfooter--material:first-child": {
                background: "none",
            },
            ".alert-dialog-button--primal--material": {
                background: "none",
            },
            ".action-sheet-button": {
                backgroundImage: "linear-gradient(\r\n      0deg,\r\n      rgba(0, 0, 0, 0.1),\r\n      rgba(0, 0, 0, 0.1) 50%,\r\n      transparent 50%\r\n    )",
            },
            ".action-sheet-title": {
                backgroundImage: "linear-gradient(\r\n      0deg,\r\n      rgba(0, 0, 0, 0.1),\r\n      rgba(0, 0, 0, 0.1) 50%,\r\n      transparent 50%\r\n    )",
            },
        },
        ".toolbar__bg": {
            background: "#fafafa",
        },
        ".toolbar__item": {
            boxSizing: "border-box",
            backgroundClip: "padding-box",
            padding: "0",
            margin: "0",
            font: "inherit",
            color: "inherit",
            background: "transparent",
            border: "none",
            lineHeight: "normal",
            height: "44px",
            overflow: "visible",
            display: "block",
            verticalAlign: "middle",
        },
        ".toolbar__left": {
            boxSizing: "border-box",
            backgroundClip: "padding-box",
            padding: "0",
            margin: "0",
            font: "inherit",
            color: "inherit",
            background: "transparent",
            border: "none",
            lineHeight: "44px",
            maxWidth: "50%",
            width: "27%",
            textAlign: "left",
            fallbacks: [
                {
                    lineHeight: "normal",
                },
            ],
        },
        ".toolbar__right": {
            boxSizing: "border-box",
            backgroundClip: "padding-box",
            padding: "0",
            margin: "0",
            font: "inherit",
            color: "inherit",
            background: "transparent",
            border: "none",
            lineHeight: "44px",
            maxWidth: "50%",
            width: "27%",
            textAlign: "right",
            fallbacks: [
                {
                    lineHeight: "normal",
                },
            ],
        },
        ".toolbar__center": {
            boxSizing: "border-box",
            backgroundClip: "padding-box",
            padding: "0",
            margin: "0",
            font: "inherit",
            color: "#1f1f21",
            background: "transparent",
            border: "none",
            lineHeight: "44px",
            width: "46%",
            textAlign: "center",
            fallbacks: [
                {
                    color: "inherit",
                },
                {
                    lineHeight: "normal",
                },
            ],
            fontSize: "17px",
            fontWeight: "500",
        },
        ".toolbar__title": {
            lineHeight: "44px",
            fontSize: "17px",
            fontWeight: "500",
            color: "#1f1f21",
            margin: "0",
            padding: "0",
            overflow: "visible",
        },
        ".toolbar__center:first-child:last-child": {
            width: "100%",
        },
        ".bottom-bar": {
            fontFamily: '-apple-system, "Helvetica Neue", "Helvetica", "Arial", "Lucida Grande", sans-serif',
            webkitFontSmoothing: "antialiased",
            mozOsxFontSmoothing: "grayscale",
            fontWeight: "400",
            boxSizing: "border-box",
            backgroundClip: "padding-box",
            whiteSpace: "nowrap",
            overflow: "hidden",
            wordSpacing: "0",
            padding: "0",
            margin: "0",
            font: "inherit",
            color: "#1f1f21",
            background: "#fafafa",
            border: "none",
            lineHeight: "normal",
            webkitUserSelect: "none",
            mozUserSelect: "none",
            msUserSelect: "none",
            userSelect: "none",
            zIndex: "2",
            display: "block",
            height: "44px",
            paddingLeft: "0",
            paddingRight: "0",
            fallbacks: [
                {
                    boxSizing: "border-box",
                },
                {
                    bottom: "0",
                },
                {
                    borderTop: "1px solid #b2b2b2",
                },
                {
                    fontWeight: "400",
                },
                {
                    color: "inherit",
                },
                {
                    background: "transparent",
                },
            ],
            boxShadow: "none",
            borderBottom: "none",
            borderTop: "none",
            position: "absolute",
            bottom: "0",
            right: "0",
            left: "0",
            backgroundSize: "100% 1px",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "top",
            backgroundImage: "linear-gradient(180deg, #b2b2b2, #b2b2b2 100%)",
            paddingBottom: "0",
        },
        ".bottom-bar__line-height": {
            lineHeight: "44px",
            paddingBottom: "0",
            paddingTop: "0",
        },
        ".bottom-bar--aligned": {
            display: "flex",
            fallbacks: [
                {
                    display: "-webkit-flex",
                },
                {
                    display: "-webkit-box",
                },
            ],
            webkitFlexWrap: "nowrap",
            flexWrap: "nowrap",
            lineHeight: "44px",
        },
        ".bottom-bar--transparent": {
            backgroundColor: "transparent",
            backgroundImage: "none",
            border: "none",
        },
        ".toolbar--material": {
            display: "flex",
            fallbacks: [
                {
                    display: "-webkit-flex",
                },
                {
                    display: "-webkit-box",
                },
            ],
            webkitFlexWrap: "nowrap",
            flexWrap: "nowrap",
            webkitBoxPack: "justify",
            webkitJustifyContent: "space-between",
            justifyContent: "space-between",
            height: "56px",
            borderBottom: "0",
            boxShadow: "0 1px 5px rgba(0, 0, 0, 0.3)",
            padding: "0",
            backgroundColor: "#4a148c",
            backgroundSize: "0",
        },
        ".toolbar--noshadow": {
            boxShadow: "none",
            backgroundImage: "none",
            borderBottom: "none",
        },
        ".toolbar--material__left, .toolbar--material__right": {
            fontFamily: '"Roboto", "Noto", sans-serif',
            webkitFontSmoothing: "antialiased",
            fontWeight: "500",
            fontSize: "20px",
            fallbacks: [
                {
                    color: "#ffffff",
                },
                {
                    fontWeight: "400",
                },
            ],
            color: "rgba(255, 255, 255, 1)",
            height: "56px",
            minWidth: "72px",
            width: "auto",
            lineHeight: "56px",
        },
        ".toolbar--material__center": {
            fontFamily: '"Roboto", "Noto", sans-serif',
            webkitFontSmoothing: "antialiased",
            fontWeight: "500",
            fontSize: "20px",
            fallbacks: [
                {
                    color: "#ffffff",
                },
                {
                    fontWeight: "400",
                },
            ],
            color: "rgba(255, 255, 255, 1)",
            height: "56px",
            width: "auto",
            webkitBoxFlex: "1",
            webkitFlexGrow: "1",
            flexGrow: "1",
            overflow: "hidden",
            textOverflow: "ellipsis",
            textAlign: "left",
            lineHeight: "56px",
        },
        ".toolbar--material__center:first-child": {
            marginLeft: "16px",
        },
        ".toolbar--material__center:last-child": {
            marginRight: "16px",
        },
        ".toolbar--material__left:empty, .toolbar--material__right:empty": {
            minWidth: "16px",
        },
        ".toolbar--transparent": {
            backgroundColor: "transparent",
            boxShadow: "none",
            backgroundImage: "none",
            borderBottom: "none",
        },
        ".button": {
            position: "relative",
            display: "inline-block",
            boxSizing: "border-box",
            backgroundClip: "padding-box",
            padding: "4px 10px",
            margin: "0",
            font: "inherit",
            color: "white",
            background: "transparent",
            border: "0 solid currentColor",
            lineHeight: "32px",
            fontFamily: '-apple-system, "Helvetica Neue", "Helvetica", "Arial", "Lucida Grande", sans-serif',
            webkitFontSmoothing: "antialiased",
            mozOsxFontSmoothing: "grayscale",
            fontWeight: "400",
            webkitUserSelect: "none",
            mozUserSelect: "none",
            msUserSelect: "none",
            userSelect: "none",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
            overflow: "hidden",
            height: "auto",
            textDecoration: "none",
            fallbacks: [
                {
                    border: "none",
                },
                {
                    color: "inherit",
                },
                {
                    lineHeight: "normal",
                },
                {
                    padding: "0",
                },
            ],
            fontSize: "17px",
            letterSpacing: "0",
            verticalAlign: "middle",
            backgroundColor: "#4a148c",
            borderRadius: "3px",
            transition: "none",
        },
        ".button::-moz-focus-inner": {
            outline: "0",
        },
        ".button:hover": {
            transition: "none",
        },
        ".button:active": {
            backgroundColor: "#4a148c",
            transition: "none",
            opacity: "0.2",
        },
        ".button:focus": {
            outline: "0",
        },
        ".button:disabled, .button[disabled]": {
            opacity: "0.3",
            pointerEvents: "none",
        },
        ".button--outline": {
            backgroundColor: "transparent",
            border: "1px solid #4a148c",
            color: "#4a148c",
        },
        ".button--outline:active": {
            backgroundColor: "color-mod(#4a148c tint(70%))",
            border: "1px solid #4a148c",
            color: "#4a148c",
            opacity: "1",
        },
        ".button--outline:hover": {
            border: "1px solid #4a148c",
            transition: "0",
        },
        ".button--light": {
            backgroundColor: "transparent",
            color: "color-mod(black a(40%))",
            border: "1px solid color-mod(black a(20%))",
        },
        ".button--light:active": {
            backgroundColor: "color-mod(black a(5%))",
            color: "color-mod(black a(40%))",
            border: "1px solid color-mod(black a(20%))",
            opacity: "1",
        },
        ".button--quiet": {
            position: "relative",
            display: "inline-block",
            boxSizing: "border-box",
            backgroundClip: "padding-box",
            padding: "4px 10px",
            margin: "0",
            font: "inherit",
            color: "#4a148c",
            background: "transparent",
            border: "none",
            lineHeight: "32px",
            fontFamily: '-apple-system, "Helvetica Neue", "Helvetica", "Arial", "Lucida Grande", sans-serif',
            webkitFontSmoothing: "antialiased",
            mozOsxFontSmoothing: "grayscale",
            fontWeight: "400",
            webkitUserSelect: "none",
            mozUserSelect: "none",
            msUserSelect: "none",
            userSelect: "none",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
            overflow: "hidden",
            height: "auto",
            textDecoration: "none",
            fallbacks: [
                {
                    border: "1px solid transparent",
                },
                {
                    color: "white",
                },
                {
                    background: "transparent",
                },
                {
                    border: "0 solid currentColor",
                },
                {
                    background: "transparent",
                },
                {
                    border: "none",
                },
                {
                    color: "inherit",
                },
                {
                    lineHeight: "normal",
                },
                {
                    padding: "0",
                },
            ],
            fontSize: "17px",
            letterSpacing: "0",
            verticalAlign: "middle",
            backgroundColor: "#4a148c",
            borderRadius: "3px",
            transition: "none",
            boxShadow: "none",
        },
        ".button--quiet:disabled, .button--quiet[disabled]": {
            opacity: "0.3",
            pointerEvents: "none",
            border: "none",
        },
        ".button--quiet:hover": {
            transition: "none",
        },
        ".button--quiet:focus": {
            outline: "0",
        },
        ".button--quiet:active": {
            backgroundColor: "transparent",
            border: "none",
            transition: "none",
            opacity: "0.2",
            color: "#4a148c",
        },
        ".button--cta": {
            position: "relative",
            display: "inline-block",
            boxSizing: "border-box",
            backgroundClip: "padding-box",
            padding: "4px 10px",
            margin: "0",
            font: "inherit",
            color: "white",
            background: "transparent",
            border: "none",
            lineHeight: "32px",
            fontFamily: '-apple-system, "Helvetica Neue", "Helvetica", "Arial", "Lucida Grande", sans-serif',
            webkitFontSmoothing: "antialiased",
            mozOsxFontSmoothing: "grayscale",
            fontWeight: "400",
            webkitUserSelect: "none",
            mozUserSelect: "none",
            msUserSelect: "none",
            userSelect: "none",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
            overflow: "hidden",
            height: "auto",
            textDecoration: "none",
            fallbacks: [
                {
                    color: "white",
                },
                {
                    backgroundColor: "#4a148c",
                },
                {
                    border: "0 solid currentColor",
                },
                {
                    border: "none",
                },
                {
                    color: "inherit",
                },
                {
                    lineHeight: "normal",
                },
                {
                    padding: "0",
                },
            ],
            fontSize: "17px",
            letterSpacing: "0",
            verticalAlign: "middle",
            backgroundColor: "#7c43bd",
            borderRadius: "3px",
            transition: "none",
        },
        ".button--cta:hover": {
            transition: "none",
        },
        ".button--cta:focus": {
            outline: "0",
        },
        ".button--cta:active": {
            color: "white",
            backgroundColor: "#7c43bd",
            transition: "none",
            opacity: "0.2",
        },
        ".button--cta:disabled, .button--cta[disabled]": {
            opacity: "0.3",
            pointerEvents: "none",
        },
        ".button--large": {
            fontSize: "17px",
            fontWeight: "500",
            lineHeight: "36px",
            padding: "4px 12px",
            display: "block",
            width: "100%",
            textAlign: "center",
        },
        ".button--large:active": {
            backgroundColor: "#4a148c",
            transition: "none",
            opacity: "0.2",
            fallbacks: [
                {
                    transition: "none",
                },
            ],
        },
        ".button--large:disabled, .button--large[disabled]": {
            opacity: "0.3",
            pointerEvents: "none",
        },
        ".button--large:hover": {
            transition: "none",
        },
        ".button--large:focus": {
            outline: "0",
        },
        ".button--large--quiet": {
            position: "relative",
            display: "block",
            boxSizing: "border-box",
            backgroundClip: "padding-box",
            padding: "4px 12px",
            margin: "0",
            font: "inherit",
            color: "#4a148c",
            background: "transparent",
            border: "1px solid transparent",
            lineHeight: "36px",
            fontFamily: '-apple-system, "Helvetica Neue", "Helvetica", "Arial", "Lucida Grande", sans-serif',
            webkitFontSmoothing: "antialiased",
            mozOsxFontSmoothing: "grayscale",
            fontWeight: "500",
            webkitUserSelect: "none",
            mozUserSelect: "none",
            msUserSelect: "none",
            userSelect: "none",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
            overflow: "hidden",
            height: "auto",
            textDecoration: "none",
            fallbacks: [
                {
                    color: "white",
                },
                {
                    border: "0 solid currentColor",
                },
                {
                    background: "transparent",
                },
                {
                    display: "inline-block",
                },
                {
                    padding: "4px 10px",
                },
                {
                    lineHeight: "32px",
                },
                {
                    fontWeight: "400",
                },
                {
                    fontSize: "17px",
                },
                {
                    border: "none",
                },
                {
                    color: "inherit",
                },
                {
                    lineHeight: "normal",
                },
                {
                    padding: "0",
                },
            ],
            fontSize: "17px",
            letterSpacing: "0",
            verticalAlign: "middle",
            backgroundColor: "#4a148c",
            borderRadius: "3px",
            transition: "none",
            width: "100%",
            boxShadow: "none",
            textAlign: "center",
        },
        ".button--large--quiet:active": {
            transition: "none",
            opacity: "0.2",
            color: "#4a148c",
            background: "transparent",
            border: "1px solid transparent",
            boxShadow: "none",
        },
        ".button--large--quiet:disabled, .button--large--quiet[disabled]": {
            opacity: "0.3",
            pointerEvents: "none",
        },
        ".button--large--quiet:hover": {
            transition: "none",
        },
        ".button--large--quiet:focus": {
            outline: "0",
        },
        ".button--large--cta": {
            position: "relative",
            display: "block",
            boxSizing: "border-box",
            backgroundClip: "padding-box",
            padding: "4px 12px",
            margin: "0",
            font: "inherit",
            color: "white",
            background: "transparent",
            border: "none",
            lineHeight: "36px",
            fontFamily: '-apple-system, "Helvetica Neue", "Helvetica", "Arial", "Lucida Grande", sans-serif',
            webkitFontSmoothing: "antialiased",
            mozOsxFontSmoothing: "grayscale",
            fontWeight: "500",
            webkitUserSelect: "none",
            mozUserSelect: "none",
            msUserSelect: "none",
            userSelect: "none",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
            overflow: "hidden",
            height: "auto",
            textDecoration: "none",
            fallbacks: [
                {
                    display: "inline-block",
                },
                {
                    padding: "4px 10px",
                },
                {
                    lineHeight: "32px",
                },
                {
                    fontWeight: "400",
                },
                {
                    fontSize: "17px",
                },
                {
                    color: "white",
                },
                {
                    backgroundColor: "#4a148c",
                },
                {
                    border: "0 solid currentColor",
                },
                {
                    border: "none",
                },
                {
                    color: "inherit",
                },
                {
                    lineHeight: "normal",
                },
                {
                    padding: "0",
                },
            ],
            fontSize: "17px",
            letterSpacing: "0",
            verticalAlign: "middle",
            backgroundColor: "#7c43bd",
            borderRadius: "3px",
            transition: "none",
            width: "100%",
            textAlign: "center",
        },
        ".button--large--cta:hover": {
            transition: "none",
        },
        ".button--large--cta:focus": {
            outline: "0",
        },
        ".button--large--cta:active": {
            color: "white",
            backgroundColor: "#7c43bd",
            transition: "none",
            opacity: "0.2",
        },
        ".button--large--cta:disabled, .button--large--cta[disabled]": {
            opacity: "0.3",
            pointerEvents: "none",
        },
        ".button--material": {
            position: "relative",
            display: "inline-block",
            boxSizing: "border-box",
            backgroundClip: "padding-box",
            padding: "0 16px",
            margin: "0",
            font: "inherit",
            color: "#ffffff",
            background: "transparent",
            border: "0 solid currentColor",
            lineHeight: "36px",
            fontFamily: '"Roboto", "Noto", sans-serif',
            webkitFontSmoothing: "antialiased",
            mozOsxFontSmoothing: "grayscale",
            fontWeight: "500",
            webkitUserSelect: "none",
            mozUserSelect: "none",
            msUserSelect: "none",
            userSelect: "none",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
            overflow: "hidden",
            height: "auto",
            textDecoration: "none",
            fallbacks: [
                {
                    transition: "background-color 0.25s linear",
                },
                {
                    transition: "none",
                },
                {
                    fontWeight: "400",
                },
                {
                    color: "white",
                },
                {
                    backgroundColor: "#4a148c",
                },
                {
                    fontSize: "17px",
                },
                {
                    padding: "4px 10px",
                },
                {
                    lineHeight: "32px",
                },
                {
                    fontWeight: "400",
                },
                {
                    webkitFontSmoothing: "antialiased",
                },
                {
                    fontFamily: '-apple-system, "Helvetica Neue", "Helvetica", "Arial", "Lucida Grande", sans-serif',
                },
                {
                    border: "none",
                },
                {
                    color: "inherit",
                },
                {
                    lineHeight: "normal",
                },
                {
                    padding: "0",
                },
            ],
            fontSize: "14px",
            letterSpacing: "0",
            verticalAlign: "middle",
            backgroundColor: "#4a148c",
            borderRadius: "8px",
            transition: "all 0.25s linear",
            boxShadow: "0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12),\r\n    0 3px 1px -2px rgba(0, 0, 0, 0.2)",
            minHeight: "36px",
            textAlign: "center",
            webkitTransform: "translate3d(0, 0, 0)",
            transform: "translate3d(0, 0, 0)",
            textTransform: "uppercase",
            opacity: "1",
        },
        ".button--material:hover": {
            transition: "all 0.25s linear",
        },
        ".button--material:active": {
            boxShadow: "0 6px 10px 0 rgba(0, 0, 0, 0.14), 0 1px 18px 0 rgba(0, 0, 0, 0.12),\r\n    0 3px 5px -1px rgba(0, 0, 0, 0.4)",
            backgroundColor: "#4a148c",
            opacity: "0.9",
            transition: "all 0.25s linear",
        },
        ".button--material:focus": {
            outline: "0",
        },
        ".button--material:disabled, .button--material[disabled]": {
            transition: "none",
            boxShadow: "none",
            backgroundColor: "#330f5e",
            color: "color-mod(black a(26%))",
            opacity: "1",
        },
        ".button--material--flat": {
            position: "relative",
            display: "inline-block",
            boxSizing: "border-box",
            backgroundClip: "padding-box",
            padding: "0 16px",
            margin: "0",
            font: "inherit",
            color: "#4a148c",
            background: "transparent",
            border: "0 solid currentColor",
            lineHeight: "36px",
            fontFamily: '"Roboto", "Noto", sans-serif',
            webkitFontSmoothing: "antialiased",
            mozOsxFontSmoothing: "grayscale",
            fontWeight: "500",
            webkitUserSelect: "none",
            mozUserSelect: "none",
            msUserSelect: "none",
            userSelect: "none",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
            overflow: "hidden",
            height: "auto",
            textDecoration: "none",
            fallbacks: [
                {
                    transition: "background-color 0.25s linear",
                },
                {
                    color: "#ffffff",
                },
                {
                    backgroundColor: "#4a148c",
                },
                {
                    boxShadow: "0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12),\r\n    0 3px 1px -2px rgba(0, 0, 0, 0.2)",
                },
                {
                    transition: "none",
                },
                {
                    fontWeight: "400",
                },
                {
                    color: "white",
                },
                {
                    backgroundColor: "#4a148c",
                },
                {
                    fontSize: "17px",
                },
                {
                    padding: "4px 10px",
                },
                {
                    lineHeight: "32px",
                },
                {
                    fontWeight: "400",
                },
                {
                    webkitFontSmoothing: "antialiased",
                },
                {
                    fontFamily: '-apple-system, "Helvetica Neue", "Helvetica", "Arial", "Lucida Grande", sans-serif',
                },
                {
                    border: "none",
                },
                {
                    color: "inherit",
                },
                {
                    lineHeight: "normal",
                },
                {
                    padding: "0",
                },
            ],
            fontSize: "14px",
            letterSpacing: "0",
            verticalAlign: "middle",
            backgroundColor: "transparent",
            borderRadius: "3px",
            transition: "all 0.25s linear",
            boxShadow: "none",
            minHeight: "36px",
            textAlign: "center",
            webkitTransform: "translate3d(0, 0, 0)",
            transform: "translate3d(0, 0, 0)",
            textTransform: "uppercase",
        },
        ".button--material--flat:hover": {
            transition: "all 0.25s linear",
        },
        ".button--material--flat:focus": {
            boxShadow: "none",
            backgroundColor: "transparent",
            color: "#4a148c",
            outline: "0",
            opacity: "1",
            border: "none",
        },
        ".button--material--flat:active": {
            boxShadow: "none",
            outline: "0",
            opacity: "1",
            border: "none",
            backgroundColor: "color-mod(#999 a(20%))",
            color: "#4a148c",
            transition: "all 0.25s linear",
        },
        ".button--material--flat:disabled, .button--material--flat[disabled]": {
            transition: "none",
            opacity: "1",
            boxShadow: "none",
            backgroundColor: "transparent",
            color: "color-mod(black a(26%))",
        },
        ".button-bar": {
            fontFamily: '-apple-system, "Helvetica Neue", "Helvetica", "Arial", "Lucida Grande", sans-serif',
            webkitFontSmoothing: "antialiased",
            mozOsxFontSmoothing: "grayscale",
            fontWeight: "400",
            display: "inline-flex",
            fallbacks: [
                {
                    display: "-webkit-inline-flex",
                },
                {
                    display: "-webkit-inline-box",
                },
            ],
            webkitBoxAlign: "stretch",
            webkitAlignItems: "stretch",
            alignItems: "stretch",
            webkitAlignContent: "stretch",
            alignContent: "stretch",
            webkitFlexWrap: "nowrap",
            flexWrap: "nowrap",
            margin: "0",
            padding: "0",
            border: "none",
        },
        ".button-bar__item": {
            fontFamily: '-apple-system, "Helvetica Neue", "Helvetica", "Arial", "Lucida Grande", sans-serif',
            webkitFontSmoothing: "antialiased",
            mozOsxFontSmoothing: "grayscale",
            fontWeight: "400",
            borderRadius: "0",
            width: "100%",
            padding: "0",
            margin: "0",
            position: "relative",
            overflow: "hidden",
            boxSizing: "border-box",
        },
        ".button-bar__button": {
            fontFamily: '-apple-system, "Helvetica Neue", "Helvetica", "Arial", "Lucida Grande", sans-serif',
            webkitFontSmoothing: "antialiased",
            mozOsxFontSmoothing: "grayscale",
            fontWeight: "400",
            borderRadius: "0",
            backgroundColor: "transparent",
            color: "#4a148c",
            border: "1px solid #4a148c",
            borderTopWidth: "1px",
            borderBottomWidth: "1px",
            borderRightWidth: "1px",
            borderLeftWidth: "0",
            fallbacks: [
                {
                    fontWeight: "400",
                },
            ],
            padding: "0",
            fontSize: "13px",
            height: "27px",
            lineHeight: "27px",
            width: "100%",
            transition: "background-color 0.2s linear, color 0.2s linear",
            boxSizing: "border-box",
        },
        ".button-bar__button:disabled": {
            opacity: "0.3",
            pointerEvents: "none",
        },
        ".button-bar__button:hover": {
            transition: "none",
        },
        ".button-bar__button:focus": {
            outline: "0",
        },
        ":checked + .button-bar__button": {
            backgroundColor: "#4a148c",
            color: "#fff",
            transition: "none",
        },
        ".button-bar__button:active, :active + .button-bar__button": {
            backgroundColor: "color-mod(#4a148c tint(70%))",
            border: "0 solid #4a148c",
            borderTop: "1px solid #4a148c",
            borderBottom: "1px solid #4a148c",
            borderRight: "1px solid #4a148c",
            fontSize: "13px",
            width: "100%",
            transition: "none",
        },
        ".button-bar__item:first-child > .button-bar__button": {
            borderLeftWidth: "1px",
            borderRadius: "4px 0 0 4px",
        },
        ".button-bar__item:last-child > .button-bar__button": {
            borderRightWidth: "1px",
            borderRadius: "0 4px 4px 0",
        },
        ".segment": {
            fontFamily: '-apple-system, "Helvetica Neue", "Helvetica", "Arial", "Lucida Grande", sans-serif',
            webkitFontSmoothing: "antialiased",
            mozOsxFontSmoothing: "grayscale",
            fontWeight: "400",
            display: "inline-flex",
            fallbacks: [
                {
                    display: "-webkit-inline-flex",
                },
                {
                    display: "-webkit-inline-box",
                },
            ],
            webkitBoxAlign: "stretch",
            webkitAlignItems: "stretch",
            alignItems: "stretch",
            webkitAlignContent: "stretch",
            alignContent: "stretch",
            webkitFlexWrap: "nowrap",
            flexWrap: "nowrap",
            margin: "0",
            padding: "0",
            border: "none",
        },
        ".segment__item": {
            fontFamily: '-apple-system, "Helvetica Neue", "Helvetica", "Arial", "Lucida Grande", sans-serif',
            webkitFontSmoothing: "antialiased",
            mozOsxFontSmoothing: "grayscale",
            fontWeight: "400",
            borderRadius: "0",
            width: "100%",
            padding: "0",
            margin: "0",
            position: "relative",
            overflow: "hidden",
            boxSizing: "border-box",
            display: "block",
            backgroundColor: "transparent",
            border: "none",
        },
        ".segment__input": {
            position: "absolute",
            right: "0",
            top: "0",
            left: "0",
            bottom: "0",
            padding: "0",
            border: "0",
            backgroundColor: "transparent",
            zIndex: "1",
            verticalAlign: "top",
            outline: "none",
            width: "100%",
            height: "100%",
            margin: "0",
            webkitAppearance: "none",
            mozAppearance: "none",
            appearance: "none",
        },
        ".segment__button": {
            fontFamily: '-apple-system, "Helvetica Neue", "Helvetica", "Arial", "Lucida Grande", sans-serif',
            webkitFontSmoothing: "antialiased",
            mozOsxFontSmoothing: "grayscale",
            fontWeight: "400",
            borderRadius: "0",
            backgroundColor: "transparent",
            color: "#4a148c",
            border: "1px solid #4a148c",
            borderTopWidth: "1px",
            borderBottomWidth: "1px",
            borderRightWidth: "1px",
            borderLeftWidth: "0",
            fallbacks: [
                {
                    fontWeight: "400",
                },
            ],
            padding: "0",
            fontSize: "13px",
            height: "29px",
            lineHeight: "29px",
            width: "100%",
            transition: "background-color 0.2s linear, color 0.2s linear",
            boxSizing: "border-box",
            textAlign: "center",
        },
        ".segment__item:disabled": {
            opacity: "0.3",
            pointerEvents: "none",
        },
        ".segment__button:hover": {
            transition: "none",
        },
        ".segment__button:focus": {
            outline: "0",
        },
        ":active + .segment__button": {
            backgroundColor: "color-mod(#4a148c tint(70%))",
            border: "0 solid #4a148c",
            borderTop: "1px solid #4a148c",
            borderBottom: "1px solid #4a148c",
            borderRight: "1px solid #4a148c",
            fontSize: "13px",
            width: "100%",
            transition: "none",
        },
        ":checked + .segment__button": {
            backgroundColor: "#4a148c",
            color: "#fff",
            transition: "none",
        },
        ".segment__item:first-child > .segment__button": {
            borderLeftWidth: "1px",
            borderRadius: "4px 0 0 4px",
        },
        ".segment__item:last-child > .segment__button": {
            borderRightWidth: "1px",
            borderRadius: "0 4px 4px 0",
        },
        ".segment--material": {
            borderRadius: "2px",
            overflow: "hidden",
            boxShadow: "0 0 2px 0 rgba(0, 0, 0, 0.12), 0 2px 2px 0 rgba(0, 0, 0, 0.24)",
        },
        ".segment--material__button": {
            fontFamily: '"Roboto", "Noto", sans-serif',
            webkitFontSmoothing: "antialiased",
            fontWeight: "400",
            fontSize: "14px",
            height: "32px",
            lineHeight: "32px",
            borderWidth: "0",
            color: "color-mod(black a(38%))",
            borderRadius: "0",
            backgroundColor: "#fafafa",
        },
        ":active + .segment--material__button": {
            backgroundColor: "#fafafa",
            borderRadius: "0",
            borderWidth: "0",
            fontSize: "14px",
            transition: "none",
            color: "color-mod(black a(38%))",
        },
        ":checked + .segment--material__button": {
            backgroundColor: "#c8c8c8",
            color: "#353535",
            borderRadius: "0",
            borderWidth: "0",
        },
        ".segment--material__item:first-child > .segment--material__button, .segment--material__item:last-child > .segment--material__button": {
            borderRadius: "0",
            borderWidth: "0",
        },
        ".tabbar": {
            fontFamily: '-apple-system, "Helvetica Neue", "Helvetica", "Arial", "Lucida Grande", sans-serif',
            webkitFontSmoothing: "antialiased",
            mozOsxFontSmoothing: "grayscale",
            fontWeight: "400",
            display: "flex",
            fallbacks: [
                {
                    display: "-webkit-flex",
                },
                {
                    display: "-webkit-box",
                },
            ],
            position: "absolute",
            bottom: "0",
            left: "0",
            right: "0",
            whiteSpace: "nowrap",
            margin: "0",
            padding: "0",
            height: "49px",
            backgroundColor: "#fafafa",
            borderTop: "none",
            width: "100%",
        },
        ".tabbar__item": {
            fontFamily: '-apple-system, "Helvetica Neue", "Helvetica", "Arial", "Lucida Grande", sans-serif',
            webkitFontSmoothing: "antialiased",
            mozOsxFontSmoothing: "grayscale",
            fontWeight: "400",
            position: "relative",
            webkitBoxFlex: "1",
            webkitFlexGrow: "1",
            flexGrow: "1",
            webkitFlexBasis: "0",
            flexBasis: "0",
            width: "auto",
            borderRadius: "0",
        },
        ".tabbar__item > input": {
            position: "absolute",
            right: "0",
            top: "0",
            left: "0",
            bottom: "0",
            padding: "0",
            border: "0",
            backgroundColor: "transparent",
            zIndex: "1",
            verticalAlign: "top",
            outline: "none",
            width: "100%",
            height: "100%",
            margin: "0",
            webkitAppearance: "none",
            mozAppearance: "none",
            appearance: "none",
        },
        ".tabbar__button": {
            fontFamily: '-apple-system, "Helvetica Neue", "Helvetica", "Arial", "Lucida Grande", sans-serif',
            webkitFontSmoothing: "antialiased",
            mozOsxFontSmoothing: "grayscale",
            fontWeight: "400",
            boxSizing: "border-box",
            backgroundClip: "padding-box",
            padding: "0",
            margin: "0",
            font: "inherit",
            color: "#999",
            background: "transparent",
            border: "none",
            lineHeight: "49px",
            webkitUserSelect: "none",
            mozUserSelect: "none",
            msUserSelect: "none",
            userSelect: "none",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
            overflow: "hidden",
            position: "relative",
            display: "inline-block",
            textDecoration: "none",
            fallbacks: [
                {
                    lineHeight: "normal",
                },
                {
                    fontWeight: "400",
                },
                {
                    color: "inherit",
                },
                {
                    padding: "0",
                },
            ],
            height: "49px",
            letterSpacing: "0",
            verticalAlign: "top",
            backgroundColor: "transparent",
            borderTop: "none",
            width: "100%",
        },
        ".tabbar__icon": {
            fontSize: "24px",
            padding: "0",
            margin: "0",
            lineHeight: "26px",
            display: "block !important",
            height: "28px",
        },
        ".tabbar__label": {
            fontFamily: '-apple-system, "Helvetica Neue", "Helvetica", "Arial", "Lucida Grande", sans-serif',
            webkitFontSmoothing: "antialiased",
            mozOsxFontSmoothing: "grayscale",
            fontWeight: "400",
            display: "inline-block",
        },
        ".tabbar__badge.notification": {
            verticalAlign: "text-bottom",
            top: "-1px",
            marginLeft: "5px",
            zIndex: "10",
            fontSize: "12px",
            height: "16px",
            minWidth: "16px",
            lineHeight: "16px",
            borderRadius: "8px",
        },
        ".tabbar__icon ~ .tabbar__badge.notification": {
            position: "absolute",
            top: "5px",
            marginLeft: "0",
        },
        ".tabbar__icon + .tabbar__label": {
            display: "block",
            fontSize: "10px",
            lineHeight: "1",
            margin: "0",
            fontWeight: "400",
        },
        ".tabbar__label:first-child": {
            fontSize: "16px",
            lineHeight: "49px",
            margin: "0",
            padding: "0",
        },
        ":checked + .tabbar__button": {
            color: "#4a148c",
            backgroundColor: "transparent",
            boxShadow: "none",
            borderTop: "none",
        },
        ".tabbar__button:disabled": {
            opacity: "0.3",
            pointerEvents: "none",
        },
        ".tabbar__button:focus": {
            zIndex: "1",
            borderTop: "none",
            boxShadow: "none",
            outline: "0",
        },
        ".tabbar__content": {
            position: "absolute",
            top: "0",
            left: "0",
            right: "0",
            bottom: "49px",
            zIndex: "0",
        },
        ".tabbar--autogrow .tabbar__item": {
            webkitFlexBasis: "auto",
            flexBasis: "auto",
        },
        ".tabbar--top": {
            position: "relative",
            top: "0",
            left: "0",
            right: "0",
            bottom: "auto",
            borderTop: "none",
            borderBottom: "1px solid #ccc",
            paddingTop: "0",
        },
        ".tabbar--top__content": {
            top: "49px",
            left: "0",
            right: "0",
            bottom: "0",
            zIndex: "0",
        },
        ".tabbar--top-border__button": {
            backgroundColor: "transparent",
            borderBottom: "4px solid transparent",
        },
        ":checked + .tabbar--top-border__button": {
            backgroundColor: "transparent",
            borderBottom: "4px solid #4a148c",
        },
        ".tabbar__border": {
            position: "absolute",
            bottom: "0",
            left: "0",
            width: "0",
            height: "4px",
            backgroundColor: "#4a148c",
        },
        ".tabbar--material": {
            background: "none",
            backgroundColor: "#4a148c",
            borderBottomWidth: "0",
            boxShadow: "0 4px 2px -2px rgba(0, 0, 0, 0.14), 0 3px 5px -2px rgba(0, 0, 0, 0.12),\r\n    0 5px 1px -4px rgba(0, 0, 0, 0.2)",
        },
        ".tabbar--material__button": {
            backgroundColor: "transparent",
            color: "rgba(255, 255, 255, 1)",
            fallbacks: [
                {
                    fontWeight: "500",
                },
                {
                    color: "#ffffff",
                },
            ],
            textTransform: "uppercase",
            fontSize: "14px",
            fontWeight: "400",
            fontFamily: '"Roboto", "Noto", sans-serif',
            webkitFontSmoothing: "antialiased",
        },
        ".tabbar--material__button:after": {
            content: '""',
            display: "block",
            width: "0",
            height: "2px",
            bottom: "0",
            position: "absolute",
            marginTop: "-2px",
            backgroundColor: "rgba(255, 255, 255, 1)",
            fallbacks: [
                {
                    backgroundColor: "#ffffff",
                },
            ],
        },
        ":checked + .tabbar--material__button:after": {
            width: "100%",
            transition: "width 0.2s ease-in-out",
        },
        ":checked + .tabbar--material__button": {
            backgroundColor: "transparent",
            color: "rgba(255, 255, 255, 1)",
            fallbacks: [
                {
                    color: "#ffffff",
                },
            ],
        },
        ".tabbar--material__item:not([ripple]):active": {
            backgroundColor: "rgba(49, 49, 58, 0.1)",
            fallbacks: [
                {
                    backgroundColor: "#31313a",
                },
            ],
        },
        ".tabbar--material__border": {
            height: "2px",
            backgroundColor: "rgba(255, 255, 255, 1)",
            fallbacks: [
                {
                    backgroundColor: "#ffffff",
                },
            ],
        },
        ".tabbar--material__icon": {
            fontSize: "22px !important",
            lineHeight: "36px",
        },
        ".tabbar--material__label": {
            fontFamily: '"Roboto", "Noto", sans-serif',
            webkitFontSmoothing: "antialiased",
            fontWeight: "400",
        },
        ".tabbar--material__label:first-child": {
            fontFamily: '"Roboto", "Noto", sans-serif',
            webkitFontSmoothing: "antialiased",
            fontWeight: "500",
            letterSpacing: "0.015em",
            fallbacks: [
                {
                    fontWeight: "400",
                },
            ],
            fontSize: "14px",
        },
        ".tabbar--material__icon + .tabbar--material__label": {
            fontSize: "10px",
        },
        ".toolbar-button": {
            fontFamily: '-apple-system, "Helvetica Neue", "Helvetica", "Arial", "Lucida Grande", sans-serif',
            webkitFontSmoothing: "antialiased",
            mozOsxFontSmoothing: "grayscale",
            fontWeight: "400",
            padding: "4px 10px",
            letterSpacing: "0",
            color: "#4a148c",
            backgroundColor: "rgba(0, 0, 0, 0)",
            fallbacks: [
                {
                    fontWeight: "400",
                },
                {
                    backgroundColor: "#000000",
                },
            ],
            borderRadius: "2px",
            border: "1px solid transparent",
            fontSize: "17px",
            transition: "none",
        },
        ".toolbar-button:active": {
            backgroundColor: "rgba(0, 0, 0, 0)",
            fallbacks: [
                {
                    backgroundColor: "#000000",
                },
            ],
            transition: "none",
            opacity: "0.2",
        },
        ".toolbar-button:disabled, .toolbar-button[disabled]": {
            opacity: "0.3",
            pointerEvents: "none",
        },
        ".toolbar-button:focus": {
            outline: "0",
            transition: "none",
        },
        ".toolbar-button:hover": {
            transition: "none",
        },
        ".toolbar-button--outline": {
            border: "1px solid #4a148c",
            margin: "auto 8px",
            paddingLeft: "6px",
            paddingRight: "6px",
        },
        ".toolbar-button--material": {
            fontSize: "22px",
            color: "rgba(255, 255, 255, 1)",
            fallbacks: [
                {
                    verticalAlign: "baseline",
                },
                {
                    color: "#ffffff",
                },
            ],
            display: "inline-block",
            height: "100%",
            margin: "0",
            border: "none",
            borderRadius: "0",
            verticalAlign: "initial",
            transition: "background-color 0.25s linear",
        },
        ".toolbar-button--material:first-of-type": {
            marginLeft: "4px",
        },
        ".toolbar-button--material:last-of-type": {
            marginRight: "4px",
        },
        ".toolbar-button--material:active": {
            opacity: "1",
            transition: "background-color 0.25s linear",
        },
        ".back-button": {
            height: "44px",
            lineHeight: "44px",
            paddingLeft: "8px",
            color: "#4a148c",
            backgroundColor: "rgba(0, 0, 0, 0)",
            fallbacks: [
                {
                    backgroundColor: "#000000",
                },
            ],
            display: "inline-block",
        },
        ".back-button:active": {
            opacity: "0.2",
        },
        ".back-button__label": {
            display: "inline-block",
            height: "100%",
            verticalAlign: "top",
            lineHeight: "44px",
            fontSize: "17px",
            fontWeight: "500",
        },
        ".back-button__icon": {
            marginRight: "6px",
            display: "inline-flex",
            fallbacks: [
                {
                    display: "-webkit-inline-flex",
                },
                {
                    display: "-webkit-inline-box",
                },
            ],
            fill: "#4a148c",
            webkitBoxAlign: "center",
            webkitAlignItems: "center",
            alignItems: "center",
            height: "100%",
        },
        ".back-button--material": {
            fontSize: "22px",
            color: "rgba(255, 255, 255, 1)",
            fallbacks: [
                {
                    verticalAlign: "baseline",
                },
                {
                    color: "#ffffff",
                },
            ],
            display: "inline-block",
            padding: "0 12px",
            height: "100%",
            margin: "0 0 0 4px",
            border: "none",
            borderRadius: "0",
            verticalAlign: "initial",
            lineHeight: "56px",
        },
        ".back-button--material__label": {
            display: "none",
            fontSize: "20px",
        },
        ".back-button--material__icon": {
            display: "inline-flex",
            fallbacks: [
                {
                    display: "-webkit-inline-flex",
                },
                {
                    display: "-webkit-inline-box",
                },
            ],
            fill: "rgba(255, 255, 255, 1)",
            webkitBoxAlign: "center",
            webkitAlignItems: "center",
            alignItems: "center",
            height: "100%",
        },
        ".back-button--material:active": {
            opacity: "1",
        },
        ".checkbox": {
            position: "relative",
            display: "inline-block",
            verticalAlign: "top",
            webkitUserSelect: "none",
            mozUserSelect: "none",
            msUserSelect: "none",
            userSelect: "none",
            fontFamily: '-apple-system, "Helvetica Neue", "Helvetica", "Arial", "Lucida Grande", sans-serif',
            webkitFontSmoothing: "antialiased",
            mozOsxFontSmoothing: "grayscale",
            fontWeight: "400",
            lineHeight: "22px",
        },
        ".checkbox__checkmark": {
            boxSizing: "border-box",
            backgroundClip: "padding-box",
            position: "relative",
            display: "inline-block",
            verticalAlign: "top",
            webkitUserSelect: "none",
            mozUserSelect: "none",
            msUserSelect: "none",
            userSelect: "none",
            fontFamily: '-apple-system, "Helvetica Neue", "Helvetica", "Arial", "Lucida Grande", sans-serif',
            webkitFontSmoothing: "antialiased",
            mozOsxFontSmoothing: "grayscale",
            fontWeight: "400",
            fallbacks: [
                {
                    position: "relative",
                },
            ],
            height: "22px",
            width: "22px",
            pointerEvents: "none",
        },
        ".checkbox__input, .checkbox__input:checked": {
            position: "absolute",
            right: "0",
            top: "0",
            left: "0",
            bottom: "0",
            padding: "0",
            border: "0",
            backgroundColor: "transparent",
            zIndex: "1",
            verticalAlign: "top",
            outline: "none",
            width: "100%",
            height: "100%",
            margin: "0",
            webkitAppearance: "none",
            mozAppearance: "none",
            appearance: "none",
        },
        ".checkbox__checkmark:before": {
            content: '""',
            position: "absolute",
            boxSizing: "border-box",
            backgroundClip: "padding-box",
            width: "22px",
            height: "22px",
            background: "transparent",
            border: "1px solid #c7c7cd",
            borderRadius: "22px",
            left: "0",
        },
        ".checkbox__checkmark:after": {
            content: '""',
            position: "absolute",
            top: "7px",
            left: "5px",
            width: "11px",
            height: "5px",
            background: "transparent",
            border: "2px solid #fff",
            borderWidth: "1px",
            borderTop: "none",
            borderRight: "none",
            borderRadius: "0",
            webkitTransform: "rotate(-45deg)",
            transform: "rotate(-45deg)",
            opacity: "0",
        },
        ":checked + .checkbox__checkmark:before": {
            background: "#4a148c",
            border: "none",
        },
        ":checked + .checkbox__checkmark:after": {
            opacity: "1",
        },
        ":disabled + .checkbox__checkmark": {
            opacity: "0.3",
            pointerEvents: "none",
        },
        ":disabled:active + .checkbox__checkmark:before": {
            background: "transparent",
        },
        ".checkbox--noborder": {
            position: "relative",
            display: "inline-block",
            verticalAlign: "top",
            webkitUserSelect: "none",
            mozUserSelect: "none",
            msUserSelect: "none",
            userSelect: "none",
            fontFamily: '-apple-system, "Helvetica Neue", "Helvetica", "Arial", "Lucida Grande", sans-serif',
            webkitFontSmoothing: "antialiased",
            mozOsxFontSmoothing: "grayscale",
            fontWeight: "400",
            lineHeight: "22px",
            fallbacks: [
                {
                    position: "relative",
                },
            ],
        },
        ".checkbox--noborder__input": {
            position: "absolute",
            right: "0",
            top: "0",
            left: "0",
            bottom: "0",
            padding: "0",
            border: "0",
            backgroundColor: "transparent",
            zIndex: "1",
            verticalAlign: "top",
            outline: "none",
            width: "100%",
            height: "100%",
            margin: "0",
            webkitAppearance: "none",
            mozAppearance: "none",
            appearance: "none",
        },
        ".checkbox--noborder__checkmark": {
            position: "relative",
            display: "inline-block",
            verticalAlign: "top",
            webkitUserSelect: "none",
            mozUserSelect: "none",
            msUserSelect: "none",
            userSelect: "none",
            boxSizing: "border-box",
            backgroundClip: "padding-box",
            width: "22px",
            height: "22px",
            background: "transparent",
            border: "none",
        },
        ".checkbox--noborder__checkmark:before": {
            content: '""',
            position: "absolute",
            width: "22px",
            height: "22px",
            background: "transparent",
            border: "none",
            borderRadius: "22px",
            left: "0",
        },
        ".checkbox--noborder__checkmark:after": {
            content: '""',
            position: "absolute",
            top: "7px",
            left: "4px",
            opacity: "0",
            width: "11px",
            height: "4px",
            background: "transparent",
            border: "2px solid #4a148c",
            borderTop: "none",
            borderRight: "none",
            borderRadius: "0",
            webkitTransform: "rotate(-45deg)",
            transform: "rotate(-45deg)",
        },
        ":checked + .checkbox--noborder__checkmark:before": {
            background: "transparent",
            border: "none",
        },
        ":checked + .checkbox--noborder__checkmark:after": {
            opacity: "1",
        },
        ":focus + .checkbox--noborder__checkmark:before": {
            border: "none",
        },
        ":disabled + .checkbox--noborder__checkmark": {
            opacity: "0.3",
            pointerEvents: "none",
        },
        ":disabled:active + .checkbox--noborder__checkmark:before": {
            background: "transparent",
            border: "none",
        },
        ".checkbox--material": {
            lineHeight: "18px",
            fontFamily: '"Roboto", "Noto", sans-serif',
            webkitFontSmoothing: "antialiased",
            fontWeight: "400",
            overflow: "visible",
        },
        ".checkbox--material__checkmark": {
            width: "18px",
            height: "18px",
        },
        ".checkbox--material__checkmark:before": {
            borderRadius: "2px",
            height: "18px",
            width: "18px",
            border: "2px solid #717171",
            transition: "background-color 0.1s linear 0.2s, border-color 0.1s linear 0.2s",
            backgroundColor: "transparent",
        },
        ":checked + .checkbox--material__checkmark:before": {
            border: "2px solid #4a148c",
            backgroundColor: "#4a148c",
            transition: "background-color 0.1s linear, border-color 0.1s linear",
        },
        ".checkbox--material__checkmark:after": {
            borderColor: "#ffffff",
            transition: "transform 0.2s ease 0, -webkit-transform 0.2s ease 0",
            fallbacks: [
                {
                    transition: "transform 0.2s ease 0",
                },
                {
                    transition: "-webkit-transform 0.2s ease 0",
                },
            ],
            width: "10px",
            height: "5px",
            top: "4px",
            left: "3px",
            webkitTransform: "scale(0) rotate(-45deg)",
            transform: "scale(0) rotate(-45deg)",
            borderWidth: "2px",
        },
        ":checked + .checkbox--material__checkmark:after": {
            transition: "transform 0.2s ease 0.2s, -webkit-transform 0.2s ease 0.2s",
            fallbacks: [
                {
                    transition: "transform 0.2s ease 0.2s",
                },
                {
                    transition: "-webkit-transform 0.2s ease 0.2s",
                },
            ],
            width: "10px",
            height: "5px",
            top: "4px",
            left: "3px",
            webkitTransform: "scale(1) rotate(-45deg)",
            transform: "scale(1) rotate(-45deg)",
            borderWidth: "2px",
        },
        ".checkbox--material__input:before": {
            content: '""',
            opacity: "0",
            position: "absolute",
            top: "0",
            left: "0",
            width: "18px",
            height: "18px",
            boxShadow: "0 0 0 11px #717171",
            boxSizing: "border-box",
            borderRadius: "50%",
            backgroundColor: "#717171",
            pointerEvents: "none",
            display: "block",
            webkitTransform: "scale3d(0.2, 0.2, 0.2)",
            transform: "scale3d(0.2, 0.2, 0.2)",
            transition: "opacity 0.25s ease-out, transform 0.1s ease-out, -webkit-transform 0.1s ease-out",
            fallbacks: [
                {
                    transition: "opacity 0.25s ease-out, transform 0.1s ease-out",
                },
                {
                    transition: "opacity 0.25s ease-out, -webkit-transform 0.1s ease-out",
                },
            ],
        },
        ".checkbox--material__input:checked:before": {
            boxShadow: "0 0 0 11px #4a148c",
            backgroundColor: "#4a148c",
        },
        ".checkbox--material__input:active:before": {
            opacity: "0.15",
            webkitTransform: "scale3d(1, 1, 1)",
            transform: "scale3d(1, 1, 1)",
        },
        ":disabled + .checkbox--material__checkmark": {
            opacity: "1",
        },
        ":disabled + .checkbox--material__checkmark:before": {
            borderColor: "#afafaf",
        },
        ":disabled:checked + .checkbox--material__checkmark:before": {
            backgroundColor: "#afafaf",
        },
        ":disabled:checked + .checkbox--material__checkmark:after": {
            borderColor: "#ffffff",
        },
        ".radio-button__input": {
            position: "absolute",
            right: "0",
            top: "0",
            left: "0",
            bottom: "0",
            padding: "0",
            border: "0",
            backgroundColor: "transparent",
            zIndex: "1",
            verticalAlign: "top",
            outline: "none",
            width: "100%",
            height: "100%",
            margin: "0",
            webkitAppearance: "none",
            mozAppearance: "none",
            appearance: "none",
        },
        ".radio-button__input:active, .radio-button__input:focus": {
            outline: "0",
            webkitTapHighlightColor: "rgba(0, 0, 0, 0)",
        },
        ".radio-button": {
            position: "relative",
            display: "inline-block",
            verticalAlign: "top",
            webkitUserSelect: "none",
            mozUserSelect: "none",
            msUserSelect: "none",
            userSelect: "none",
            fallbacks: [
                {
                    position: "relative",
                },
            ],
            lineHeight: "24px",
            textAlign: "left",
        },
        ".radio-button__checkmark:before": {
            content: '""',
            position: "absolute",
            borderRadius: "22px",
            boxSizing: "border-box",
            backgroundClip: "padding-box",
            width: "22px",
            height: "22px",
            background: "transparent",
            border: "none",
            fallbacks: [
                {
                    borderRadius: "100%",
                },
            ],
            left: "0",
        },
        ".radio-button__checkmark": {
            boxSizing: "border-box",
            backgroundClip: "padding-box",
            position: "relative",
            display: "inline-block",
            verticalAlign: "top",
            webkitUserSelect: "none",
            mozUserSelect: "none",
            msUserSelect: "none",
            userSelect: "none",
            fontFamily: '-apple-system, "Helvetica Neue", "Helvetica", "Arial", "Lucida Grande", sans-serif',
            webkitFontSmoothing: "antialiased",
            mozOsxFontSmoothing: "grayscale",
            fontWeight: "400",
            fallbacks: [
                {
                    position: "relative",
                },
                {
                    position: "relative",
                },
            ],
            width: "24px",
            height: "24px",
            background: "transparent",
            pointerEvents: "none",
        },
        ".radio-button__checkmark:after": {
            content: '""',
            position: "absolute",
            top: "7px",
            left: "4px",
            opacity: "0",
            width: "11px",
            height: "4px",
            background: "transparent",
            border: "2px solid #4a148c",
            borderTop: "none",
            borderRight: "none",
            borderRadius: "0",
            webkitTransform: "rotate(-45deg)",
            transform: "rotate(-45deg)",
        },
        ":checked + .radio-button__checkmark": {
            background: "rgba(0, 0, 0, 0)",
            fallbacks: [
                {
                    background: "#000000",
                },
            ],
        },
        ":checked + .radio-button__checkmark:after": {
            opacity: "1",
        },
        ":checked + .radio-button__checkmark:before": {
            background: "transparent",
            border: "none",
        },
        ":disabled + .radio-button__checkmark": {
            opacity: "0.3",
            pointerEvents: "none",
        },
        ".radio-button--material": {
            lineHeight: "22px",
            fontFamily: '"Roboto", "Noto", sans-serif',
            webkitFontSmoothing: "antialiased",
            fontWeight: "400",
        },
        ".radio-button--material__input:before": {
            content: '""',
            position: "absolute",
            top: "0",
            left: "0",
            opacity: "0",
            width: "20px",
            height: "20px",
            boxShadow: "0 0 0 14px #717171",
            border: "none",
            boxSizing: "border-box",
            borderRadius: "50%",
            backgroundColor: "#717171",
            pointerEvents: "none",
            display: "block",
            webkitTransform: "scale3d(0.2, 0.2, 0.2)",
            transform: "scale3d(0.2, 0.2, 0.2)",
            transition: "opacity 0.25s ease-out, transform 0.1s ease-out, -webkit-transform 0.1s ease-out",
            fallbacks: [
                {
                    transition: "opacity 0.25s ease-out, transform 0.1s ease-out",
                },
                {
                    transition: "opacity 0.25s ease-out, -webkit-transform 0.1s ease-out",
                },
            ],
        },
        ".radio-button--material__input:checked:before": {
            boxShadow: "0 0 0 14px #4a148c",
            backgroundColor: "#4a148c",
        },
        ".radio-button--material__input:active:before": {
            opacity: "0.15",
            webkitTransform: "scale3d(1, 1, 1)",
            transform: "scale3d(1, 1, 1)",
        },
        ".radio-button--material__checkmark": {
            width: "20px",
            height: "20px",
            overflow: "visible",
        },
        ".radio-button--material__checkmark:before": {
            background: "transparent",
            border: "2px solid #717171",
            boxSizing: "border-box",
            borderRadius: "50%",
            width: "20px",
            height: "20px",
            transition: "border 0.2s ease",
        },
        ".radio-button--material__checkmark:after": {
            transition: "background 0.2s ease, transform 0.2s ease, -webkit-transform 0.2s ease",
            fallbacks: [
                {
                    transition: "background 0.2s ease, transform 0.2s ease",
                },
                {
                    transition: "background 0.2s ease, -webkit-transform 0.2s ease",
                },
            ],
            top: "5px",
            left: "5px",
            width: "10px",
            height: "10px",
            border: "none",
            borderRadius: "50%",
            webkitTransform: "scale(0)",
            transform: "scale(0)",
        },
        ":checked + .radio-button--material__checkmark:before": {
            background: "transparent",
            border: "2px solid #4a148c",
        },
        ".radio-button--material__input + .radio-button__checkmark:after": {
            background: "#717171",
            opacity: "1",
            webkitTransform: "scale(0)",
            transform: "scale(0)",
        },
        ":checked + .radio-button--material__checkmark:after": {
            opacity: "1",
            background: "#4a148c",
            webkitTransform: "scale(1)",
            transform: "scale(1)",
        },
        ":disabled + .radio-button--material__checkmark": {
            opacity: "1",
        },
        ":disabled + .radio-button--material__checkmark:after": {
            backgroundColor: "#afafaf",
            borderColor: "#afafaf",
        },
        ":disabled + .radio-button--material__checkmark:before": {
            borderColor: "#afafaf",
        },
        ".list": {
            padding: "0",
            margin: "0",
            font: "inherit",
            color: "inherit",
            background: "transparent",
            border: "none",
            lineHeight: "normal",
            webkitUserSelect: "none",
            mozUserSelect: "none",
            msUserSelect: "none",
            userSelect: "none",
            fontFamily: '-apple-system, "Helvetica Neue", "Helvetica", "Arial", "Lucida Grande", sans-serif',
            webkitFontSmoothing: "antialiased",
            mozOsxFontSmoothing: "grayscale",
            fontWeight: "400",
            listStyleType: "none",
            textAlign: "left",
            display: "block",
            webkitOverflowScrolling: "touch",
            overflow: "hidden",
            backgroundImage: "linear-gradient(#ccc, #ccc), linear-gradient(#ccc, #ccc)",
            backgroundSize: "100% 1px, 100% 1px",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "bottom, top",
            fallbacks: [
                {
                    border: "none",
                },
            ],
            backgroundColor: "#fff",
        },
        ".list-item": {
            position: "relative",
            width: "100%",
            listStyle: "none",
            boxSizing: "border-box",
            display: "flex",
            fallbacks: [
                {
                    display: "-webkit-flex",
                },
                {
                    display: "-webkit-box",
                },
            ],
            webkitBoxOrient: "horizontal",
            webkitBoxDirection: "normal",
            webkitFlexDirection: "row",
            flexDirection: "row",
            webkitBoxPack: "start",
            webkitJustifyContent: "flex-start",
            justifyContent: "flex-start",
            webkitBoxAlign: "center",
            webkitAlignItems: "center",
            alignItems: "center",
            padding: "0 0 0 14px",
            margin: "0 0 -1px 0",
            color: "#1f1f21",
            transition: "background-color 0.2s linear",
        },
        ".list-item__top": {
            display: "flex",
            fallbacks: [
                {
                    display: "-webkit-flex",
                },
                {
                    display: "-webkit-box",
                },
            ],
            webkitBoxOrient: "horizontal",
            webkitBoxDirection: "normal",
            webkitFlexDirection: "row",
            flexDirection: "row",
            webkitBoxPack: "start",
            webkitJustifyContent: "flex-start",
            justifyContent: "flex-start",
            webkitBoxAlign: "center",
            webkitAlignItems: "center",
            alignItems: "center",
            webkitBoxOrdinalGroup: "1",
            webkitOrder: "0",
            order: "0",
            width: "100%",
        },
        ".list-item--expandable": {
            display: "flex",
            fallbacks: [
                {
                    display: "-webkit-flex",
                },
                {
                    display: "-webkit-box",
                },
            ],
            webkitBoxOrient: "vertical",
            webkitBoxDirection: "normal",
            webkitFlexDirection: "column",
            flexDirection: "column",
            borderBottom: "none",
            backgroundSize: "100% 1px",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "bottom",
            backgroundImage: "linear-gradient(0deg, #ccc, #ccc 100%)",
            backgroundPositionX: "14px",
        },
        ".list-item__expandable-content": {
            display: "none",
            width: "100%",
            padding: "12px 14px 12px 0",
            boxSizing: "border-box",
            webkitBoxOrdinalGroup: "2",
            webkitOrder: "1",
            order: "1",
            overflow: "hidden",
        },
        ".list-item.expanded > .list-item__expandable-content": {
            display: "block",
            height: "auto",
        },
        ".list-item__left": {
            boxSizing: "border-box",
            display: "flex",
            fallbacks: [
                {
                    display: "-webkit-flex",
                },
                {
                    display: "-webkit-box",
                },
            ],
            padding: "12px 14px 12px 0",
            webkitBoxOrdinalGroup: "1",
            webkitOrder: "0",
            order: "0",
            webkitBoxAlign: "center",
            webkitAlignItems: "center",
            alignItems: "center",
            webkitAlignSelf: "stretch",
            alignSelf: "stretch",
            lineHeight: "1.2em",
            minHeight: "44px",
        },
        ".list-item__left:empty": {
            width: "0",
            minWidth: "0",
            padding: "0",
            margin: "0",
        },
        ".list-item__center": {
            boxSizing: "border-box",
            display: "flex",
            fallbacks: [
                {
                    display: "-webkit-flex",
                },
                {
                    display: "-webkit-box",
                },
            ],
            webkitBoxFlex: "1",
            webkitFlexGrow: "1",
            flexGrow: "1",
            webkitFlexWrap: "wrap",
            flexWrap: "wrap",
            webkitBoxOrient: "horizontal",
            webkitBoxDirection: "normal",
            webkitFlexDirection: "row",
            flexDirection: "row",
            webkitBoxOrdinalGroup: "2",
            webkitOrder: "1",
            order: "1",
            marginRight: "auto",
            webkitBoxAlign: "center",
            webkitAlignItems: "center",
            alignItems: "center",
            webkitAlignSelf: "stretch",
            alignSelf: "stretch",
            marginLeft: "0",
            borderBottom: "none",
            backgroundSize: "100% 1px",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "bottom",
            backgroundImage: "linear-gradient(0deg, #ccc, #ccc 100%)",
            padding: "12px 6px 12px 0",
            lineHeight: "1.2em",
            minHeight: "44px",
        },
        ".list-item__right": {
            boxSizing: "border-box",
            display: "flex",
            fallbacks: [
                {
                    display: "-webkit-flex",
                },
                {
                    display: "-webkit-box",
                },
            ],
            marginLeft: "auto",
            padding: "12px 12px 12px 0",
            webkitBoxOrdinalGroup: "3",
            webkitOrder: "2",
            order: "2",
            webkitBoxAlign: "center",
            webkitAlignItems: "center",
            alignItems: "center",
            webkitAlignSelf: "stretch",
            alignSelf: "stretch",
            borderBottom: "none",
            backgroundSize: "100% 1px",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "bottom",
            backgroundImage: "linear-gradient(0deg, #ccc, #ccc 100%)",
            lineHeight: "1.2em",
            minHeight: "44px",
        },
        ".list-header": {
            margin: "0",
            listStyle: "none",
            textAlign: "left",
            display: "block",
            boxSizing: "border-box",
            padding: "0 0 0 15px",
            fontSize: "12px",
            fontWeight: "500",
            color: "#1f1f21",
            minHeight: "24px",
            lineHeight: "25px",
            textTransform: "uppercase",
            position: "relative",
            backgroundColor: "#eee",
            backgroundSize: "100% 1px",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "top",
            backgroundImage: "linear-gradient(0deg, #ccc, #ccc 100%)",
        },
        ".list--noborder": {
            borderTop: "none",
            borderBottom: "none",
            backgroundImage: "none",
        },
        ".list-item--tappable:active": {
            transition: "none",
            backgroundColor: "#d9d9d9",
        },
        ".list--inset": {
            margin: "0 8px",
            border: "1px solid #ccc",
            borderRadius: "4px",
            backgroundImage: "none",
        },
        ".list-item__label": {
            fontSize: "14px",
            padding: "0 4px",
            opacity: "0.6",
        },
        ".list-item__title": {
            webkitFlexBasis: "100%",
            flexBasis: "100%",
            webkitAlignSelf: "flex-end",
            alignSelf: "flex-end",
            webkitBoxOrdinalGroup: "1",
            webkitOrder: "0",
            order: "0",
        },
        ".list-item__subtitle": {
            opacity: "0.75",
            fontSize: "14px",
            webkitBoxOrdinalGroup: "2",
            webkitOrder: "1",
            order: "1",
            webkitFlexBasis: "100%",
            flexBasis: "100%",
            webkitAlignSelf: "flex-start",
            alignSelf: "flex-start",
        },
        ".list-item__thumbnail": {
            width: "40px",
            height: "40px",
            borderRadius: "6px",
            display: "block",
            margin: "0",
        },
        ".list-item__icon": {
            fontSize: "22px",
            padding: "0 6px",
        },
        ".list--material": {
            fontFamily: '"Roboto", "Noto", sans-serif',
            webkitFontSmoothing: "antialiased",
            fontWeight: "400",
            backgroundImage: "none",
            backgroundColor: "#fff",
        },
        ".list-item--material": {
            border: "0",
            padding: "0 0 0 16px",
            lineHeight: "normal",
        },
        ".list-item--material__subtitle": {
            marginTop: "4px",
        },
        ".list-item--material:first-child": {
            boxShadow: "none",
        },
        ".list-item--material__left": {
            padding: "14px 0",
            minWidth: "56px",
            lineHeight: "1",
            minHeight: "48px",
        },
        ".list-item--material__left:empty, .list-item--material__center": {
            padding: "14px 6px 14px 0",
            borderColor: "#eee",
            borderBottom: "none",
            backgroundSize: "100% 1px",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "bottom",
            backgroundImage: "linear-gradient(0deg, #eee, #eee 100%)",
            minHeight: "48px",
        },
        ".list-item--material__right": {
            padding: "14px 16px 14px 0",
            lineHeight: "1",
            borderColor: "#eee",
            borderBottom: "none",
            backgroundSize: "100% 1px",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "bottom",
            backgroundImage: "linear-gradient(0deg, #eee, #eee 100%)",
            minHeight: "48px",
        },
        ".list-item--material.list-item--expandable": {
            borderBottom: "none",
            fallbacks: [
                {
                    borderBottom: "1px solid #eee",
                },
            ],
            backgroundSize: "100% 1px",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "bottom",
            backgroundImage: "linear-gradient(0deg, #eee, #eee 100%)",
            backgroundPositionX: "16px",
        },
        ".list-item--material.list-item--longdivider, .list-item--material.list-item--expandable.list-item--longdivider": {
            borderBottom: "none",
            fallbacks: [
                {
                    borderBottom: "1px solid #eee",
                },
            ],
            backgroundSize: "100% 1px",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "bottom",
            backgroundImage: "linear-gradient(0deg, #eee, #eee 100%)",
        },
        ".list-header--material": {
            background: "#fff",
            border: "none",
            fontSize: "14px",
            textTransform: "none",
            margin: "-1px 0 0 0",
            color: "#757575",
            fontWeight: "500",
            padding: "8px 16px",
        },
        ".list-header--material:not(:first-of-type)": {
            borderTop: "none",
            backgroundSize: "100% 1px",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "top",
            backgroundImage: "linear-gradient(180deg, #eee, #eee 100%)",
            paddingTop: "16px",
        },
        ".list-item--material__thumbnail": {
            width: "40px",
            height: "40px",
            borderRadius: "100%",
        },
        ".list-item--material__icon": {
            fontSize: "20px",
            padding: "0 4px",
        },
        ".list-item--chevron:before, .list-item__expand-chevron": {
            borderRight: "2px solid #c7c7cc",
            borderBottom: "2px solid #c7c7cc",
            width: "7px",
            height: "7px",
            backgroundColor: "transparent",
            zIndex: "5",
        },
        ".list-item--chevron:before": {
            position: "absolute",
            content: '""',
            right: "16px",
            top: "50%",
            webkitTransform: "translateY(-50%) rotate(-45deg)",
            transform: "translateY(-50%) rotate(-45deg)",
        },
        ".list-item__expand-chevron": {
            webkitTransform: "rotate(45deg)",
            transform: "rotate(45deg)",
            margin: "1px",
        },
        ".list-item--expandable.expanded .list-item__expand-chevron": {
            webkitTransform: "rotate(225deg)",
            transform: "rotate(225deg)",
        },
        ".list-item--chevron__right": {
            paddingRight: "30px",
        },
        ".list-item--nodivider__center, .list-item--nodivider__right, .list-item--nodivider.list-item--expandable, .list-item--expandable .list-item__center, .list-item--expandable .list-item__right": {
            border: "none",
            backgroundImage: "none",
        },
        ".list-item--longdivider": {
            borderBottom: "none",
            fallbacks: [
                {
                    borderBottom: "1px solid #ccc",
                },
            ],
            backgroundSize: "100% 1px",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "bottom",
            backgroundImage: "linear-gradient(0deg, #ccc, #ccc 100%)",
        },
        ".list-item--longdivider:last-of-type": {
            border: "none",
            backgroundImage: "none",
        },
        ".list-item--longdivider__center": {
            border: "none",
            backgroundImage: "none",
        },
        ".list-item--longdivider__right": {
            border: "none",
            backgroundImage: "none",
        },
        ".list-title": {
            padding: "0 0 0 16px",
            margin: "0",
            font: "inherit",
            color: "#6d6d72",
            background: "transparent",
            border: "none",
            lineHeight: "24px",
            webkitUserSelect: "none",
            mozUserSelect: "none",
            msUserSelect: "none",
            userSelect: "none",
            fontFamily: '-apple-system, "Helvetica Neue", "Helvetica", "Arial", "Lucida Grande", sans-serif',
            webkitFontSmoothing: "antialiased",
            mozOsxFontSmoothing: "grayscale",
            fontWeight: "500",
            display: "block",
            fallbacks: [
                {
                    lineHeight: "normal",
                },
                {
                    fontWeight: "400",
                },
                {
                    margin: "0",
                },
                {
                    padding: "0",
                },
                {
                    color: "inherit",
                },
            ],
            textAlign: "left",
            boxSizing: "border-box",
            fontSize: "13px",
            textTransform: "uppercase",
            letterSpacing: "0.04em",
        },
        ".list-title--material": {
            fontFamily: '"Roboto", "Noto", sans-serif',
            webkitFontSmoothing: "antialiased",
            fontWeight: "500",
            color: "#757575",
            fontSize: "14px",
            margin: "0",
            padding: "12px 0 12px 16px",
            fallbacks: [
                {
                    fontWeight: "400",
                },
            ],
            lineHeight: "24px",
        },
        ".search-input": {
            boxSizing: "border-box",
            backgroundClip: "padding-box",
            padding: "0 8px 0 28px",
            margin: "0",
            "border-radius": "8px",
            font: "inherit",
            color: "#1f1f21",
            background: "transparent",
            border: "none",
            verticalAlign: "top",
            outline: "none",
            lineHeight: "1.3",
            fontFamily: '-apple-system, "Helvetica Neue", "Helvetica", "Arial", "Lucida Grande", sans-serif',
            webkitFontSmoothing: "antialiased",
            mozOsxFontSmoothing: "grayscale",
            fontWeight: "400",
            webkitAppearance: "textfield",
            mozAppearance: "textfield",
            appearance: "textfield",
            fallbacks: [
                {
                    fontWeight: "400",
                },
                {
                    margin: "0",
                },
                {
                    padding: "0",
                },
                {
                    lineHeight: "1",
                },
                {
                    color: "inherit",
                },
                {
                    backgroundColor: "#030303",
                },
                {
                    boxSizing: "border-box",
                },
            ],
            height: "28px",
            fontSize: "14px",
            backgroundColor: "rgba(3, 3, 3, 0.09)",
            boxShadow: "none",
            borderRadius: "5.5px",
            backgroundImage: 'url("data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iMTNweCIgaGVpZ2h0PSIxNHB4IiB2aWV3Qm94PSIwIDAgMTMgMTQiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgICA8IS0tIEdlbmVyYXRvcjogU2tldGNoIDQyICgzNjc4MSkgLSBodHRwOi8vd3d3LmJvaGVtaWFuY29kaW5nLmNvbS9za2V0Y2ggLS0+CiAgICA8dGl0bGU+aW9zLXNlYXJjaC1pbnB1dC1pY29uPC90aXRsZT4KICAgIDxkZXNjPkNyZWF0ZWQgd2l0aCBTa2V0Y2guPC9kZXNjPgogICAgPGRlZnM+PC9kZWZzPgogICAgPGcgaWQ9ImNvbXBvbmVudHMiIHN0cm9rZT0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIxIiBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPgogICAgICAgIDxnIGlkPSJpb3Mtc2VhcmNoLWlucHV0IiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtNDguMDAwMDAwLCAtNDMuMDAwMDAwKSIgZmlsbD0iIzdBNzk3QiI+CiAgICAgICAgICAgIDxnIGlkPSJHcm91cCIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoNDAuMDAwMDAwLCAzNi4wMDAwMDApIj4KICAgICAgICAgICAgICAgIDxwYXRoIGQ9Ik0xNi45OTcyNDgyLDE1LjUwNDE0NjYgQzE3LjA3NzM2NTcsMTUuNTQwNTkzOCAxNy4xNTIyNzMxLDE1LjU5MTYxMjkgMTcuMjE3NzUxNiwxNS42NTcwOTE0IEwyMC42NDk5OTEsMTkuMDg5MzMwOCBDMjAuOTQ0ODQ0OSwxOS4zODQxODQ3IDIwLjk0ODQ3NjQsMTkuODU4NjA2IDIwLjY1MzU0MTIsMjAuMTUzNTQxMiBDMjAuMzYwNjQ4LDIwLjQ0NjQzNDQgMTkuODgxMjcxNiwyMC40NDE5MzE3IDE5LjU4OTMzMDgsMjAuMTQ5OTkxIEwxNi4xNTcwOTE0LDE2LjcxNzc1MTYgQzE2LjA5MTM3LDE2LjY1MjAzMDEgMTYuMDQwMTE3MSwxNi41NzczODc0IDE2LjAwMzQxNDEsMTYuNDk3Nzk5NSBDMTUuMTY3MTY5NCwxNy4xMjcwNDExIDE0LjEyNzEzOTMsMTcuNSAxMywxNy41IEMxMC4yMzg1NzYzLDE3LjUgOCwxNS4yNjE0MjM3IDgsMTIuNSBDOCw5LjczODU3NjI1IDEwLjIzODU3NjMsNy41IDEzLDcuNSBDMTUuNzYxNDIzNyw3LjUgMTgsOS43Mzg1NzYyNSAxOCwxMi41IEMxOCwxMy42Mjc0Njg1IDE3LjYyNjgyMzIsMTQuNjY3Nzc2OCAxNi45OTcyNDgyLDE1LjUwNDE0NjYgWiBNMTMsMTYuNSBDMTUuMjA5MTM5LDE2LjUgMTcsMTQuNzA5MTM5IDE3LDEyLjUgQzE3LDEwLjI5MDg2MSAxNS4yMDkxMzksOC41IDEzLDguNSBDMTAuNzkwODYxLDguNSA5LDEwLjI5MDg2MSA5LDEyLjUgQzksMTQuNzA5MTM5IDEwLjc5MDg2MSwxNi41IDEzLDE2LjUgWiIgaWQ9Imlvcy1zZWFyY2gtaW5wdXQtaWNvbiI+PC9wYXRoPgogICAgICAgICAgICA8L2c+CiAgICAgICAgPC9nPgogICAgPC9nPgo8L3N2Zz4=")',
            backgroundPosition: "8px center",
            backgroundRepeat: "no-repeat",
            backgroundSize: "13px",
            display: "inline-block",
            textIndent: "0",
        },
        ".search-input::-webkit-search-cancel-button": {
            webkitAppearance: "textfield",
            appearance: "textfield",
            display: "none",
        },
        ".search-input::-webkit-search-decoration": {
            display: "none",
        },
        ".search-input:focus": {
            outline: "none",
        },
        ".search-input::-webkit-input-placeholder": {
            color: "#7a797b",
            fontSize: "14px",
            textIndent: "0",
        },
        ".search-input:-ms-input-placeholder": {
            color: "#7a797b",
            fontSize: "14px",
            textIndent: "0",
        },
        ".search-input::-ms-input-placeholder": {
            color: "#7a797b",
            fontSize: "14px",
            textIndent: "0",
        },
        ".search-input::placeholder": {
            color: "#7a797b",
            fontSize: "14px",
            textIndent: "0",
        },
        ".search-input:placeholder-shown": {},
        ".search-input:disabled": {
            opacity: "0.3",
            pointerEvents: "none",
        },
        ".search-input--material": {
            fontFamily: '"Roboto", "Noto", sans-serif',
            webkitFontSmoothing: "antialiased",
            fontWeight: "400",
            borderRadius: "8px",
            height: "48px",
            backgroundColor: "#fafafa",
            backgroundImage: 'url("data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iMThweCIgaGVpZ2h0PSIxOHB4IiB2aWV3Qm94PSIwIDAgMTggMTgiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgICA8IS0tIEdlbmVyYXRvcjogU2tldGNoIDQzLjIgKDM5MDY5KSAtIGh0dHA6Ly93d3cuYm9oZW1pYW5jb2RpbmcuY29tL3NrZXRjaCAtLT4KICAgIDx0aXRsZT5TaGFwZTwvdGl0bGU+CiAgICA8ZGVzYz5DcmVhdGVkIHdpdGggU2tldGNoLjwvZGVzYz4KICAgIDxkZWZzPjwvZGVmcz4KICAgIDxnIGlkPSJQYWdlLTEiIHN0cm9rZT0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIxIiBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPgogICAgICAgIDxnIGlkPSJhbmRyb2lkLXNlYXJjaC1pbnB1dC1pY29uIiBmaWxsLXJ1bGU9Im5vbnplcm8iIGZpbGw9IiM4OTg5ODkiPgogICAgICAgICAgICA8ZyBpZD0iY29tcG9uZW50cyI+CiAgICAgICAgICAgICAgICA8ZyBpZD0ibWF0ZXJpYWwtc2VhcmNoIj4KICAgICAgICAgICAgICAgICAgICA8ZyBpZD0ic2VhcmNoIj4KICAgICAgICAgICAgICAgICAgICAgICAgPGcgaWQ9Ik1hdGVyaWFsL0ljb25zLWJsYWNrL3NlYXJjaCI+CiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8cGF0aCBkPSJNMTIuNTAyLDYuNDkxIEwxMS43MDgsNi40OTEgTDExLjQzMiw2Ljc2NSBDMTIuNDA3LDcuOTAyIDEzLDkuMzc2IDEzLDEwLjk5MSBDMTMsMTQuNTgxIDEwLjA5LDE3LjQ5MSA2LjUsMTcuNDkxIEMyLjkxLDE3LjQ5MSAwLDE0LjU4MSAwLDEwLjk5MSBDMCw3LjQwMSAyLjkxLDQuNDkxIDYuNSw0LjQ5MSBDOC4xMTUsNC40OTEgOS41ODgsNS4wODMgMTAuNzI1LDYuMDU3IEwxMS4wMDEsNS43ODMgTDExLjAwMSw0Ljk5MSBMMTUuOTk5LDAgTDE3LjQ5LDEuNDkxIEwxMi41MDIsNi40OTEgTDEyLjUwMiw2LjQ5MSBaIE02LjUsNi40OTEgQzQuMDE0LDYuNDkxIDIsOC41MDUgMiwxMC45OTEgQzIsMTMuNDc2IDQuMDE0LDE1LjQ5MSA2LjUsMTUuNDkxIEM4Ljk4NSwxNS40OTEgMTEsMTMuNDc2IDExLDEwLjk5MSBDMTEsOC41MDUgOC45ODUsNi40OTEgNi41LDYuNDkxIEw2LjUsNi40OTEgWiIgaWQ9IlNoYXBlIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSg4Ljc0NTAwMCwgOC43NDU1MDApIHNjYWxlKC0xLCAxKSByb3RhdGUoLTE4MC4wMDAwMDApIHRyYW5zbGF0ZSgtOC43NDUwMDAsIC04Ljc0NTUwMCkgIj48L3BhdGg+CiAgICAgICAgICAgICAgICAgICAgICAgIDwvZz4KICAgICAgICAgICAgICAgICAgICA8L2c+CiAgICAgICAgICAgICAgICA8L2c+CiAgICAgICAgICAgIDwvZz4KICAgICAgICA8L2c+CiAgICA8L2c+Cjwvc3ZnPg==")',
            backgroundSize: "18px",
            backgroundPosition: "18px center",
            fontSize: "14px",
            padding: "0 24px 0 64px",
            boxShadow: "0 0 2px 0 rgba(0, 0, 0, 0.12), 0 2px 2px 0 rgba(0, 0, 0, 0.24),\r\n    0 1px 0 0 rgba(255, 255, 255, 0.06) inset",
        },
        ".text-input": {
            boxSizing: "border-box",
            backgroundClip: "padding-box",
            padding: "0",
            margin: "0",
            font: "inherit",
            color: "#1f1f21",
            background: "transparent",
            border: "none",
            verticalAlign: "top",
            outline: "none",
            lineHeight: "1",
            fontFamily: '-apple-system, "Helvetica Neue", "Helvetica", "Arial", "Lucida Grande", sans-serif',
            webkitFontSmoothing: "antialiased",
            mozOsxFontSmoothing: "grayscale",
            fontWeight: "400",
            fallbacks: [
                {
                    boxSizing: "border-box",
                },
                {
                    fontWeight: "400",
                },
                {
                    margin: "0",
                },
                {
                    padding: "0",
                },
                {
                    color: "inherit",
                },
                {
                    border: "none",
                },
            ],
            backgroundColor: "transparent",
            letterSpacing: "0",
            boxShadow: "none",
            width: "auto",
            fontSize: "16px",
            height: "31px",
        },
        ".text-input::-ms-clear": {
            display: "none",
        },
        ".text-input:disabled": {
            opacity: "0.3",
            pointerEvents: "none",
        },
        ".text-input::-webkit-input-placeholder": {
            color: "#999",
        },
        ".text-input:-ms-input-placeholder": {
            color: "#999",
        },
        ".text-input::-ms-input-placeholder": {
            color: "#999",
        },
        ".text-input::placeholder": {
            color: "#999",
        },
        ".text-input:disabled::-webkit-input-placeholder": {
            border: "none",
            backgroundColor: "transparent",
            color: "#999",
        },
        ".text-input:disabled:-ms-input-placeholder": {
            border: "none",
            backgroundColor: "transparent",
            color: "#999",
        },
        ".text-input:disabled::-ms-input-placeholder": {
            border: "none",
            backgroundColor: "transparent",
            color: "#999",
        },
        ".text-input:disabled::placeholder": {
            border: "none",
            backgroundColor: "transparent",
            color: "#999",
        },
        ".text-input:invalid": {
            border: "none",
            backgroundColor: "transparent",
            color: "#1f1f21",
        },
        ".text-input--underbar": {
            boxSizing: "border-box",
            backgroundClip: "padding-box",
            padding: "0",
            margin: "0",
            font: "inherit",
            color: "#1f1f21",
            background: "transparent",
            border: "none",
            verticalAlign: "top",
            outline: "none",
            lineHeight: "1",
            fontFamily: '-apple-system, "Helvetica Neue", "Helvetica", "Arial", "Lucida Grande", sans-serif',
            webkitFontSmoothing: "antialiased",
            mozOsxFontSmoothing: "grayscale",
            fontWeight: "400",
            fallbacks: [
                {
                    backgroundColor: "transparent",
                },
                {
                    border: "none",
                },
                {
                    boxSizing: "border-box",
                },
                {
                    fontWeight: "400",
                },
                {
                    margin: "0",
                },
                {
                    padding: "0",
                },
                {
                    color: "inherit",
                },
                {
                    border: "none",
                },
            ],
            backgroundColor: "transparent",
            letterSpacing: "0",
            boxShadow: "none",
            width: "auto",
            fontSize: "16px",
            height: "31px",
            borderBottom: "1px solid #ccc",
            borderRadius: "0",
        },
        ".text-input--underbar:disabled": {
            opacity: "0.3",
            pointerEvents: "none",
            border: "none",
            backgroundColor: "transparent",
            borderBottom: "1px solid #ccc",
        },
        ".text-input--underbar:disabled::-webkit-input-placeholder": {
            border: "none",
            backgroundColor: "transparent",
            color: "#999",
            fallbacks: [
                {
                    backgroundColor: "transparent",
                },
                {
                    border: "none",
                },
            ],
        },
        ".text-input--underbar:disabled:-ms-input-placeholder": {
            border: "none",
            backgroundColor: "transparent",
            color: "#999",
            fallbacks: [
                {
                    backgroundColor: "transparent",
                },
                {
                    border: "none",
                },
            ],
        },
        ".text-input--underbar:disabled::-ms-input-placeholder": {
            border: "none",
            backgroundColor: "transparent",
            color: "#999",
            fallbacks: [
                {
                    backgroundColor: "transparent",
                },
                {
                    border: "none",
                },
            ],
        },
        ".text-input--underbar:disabled::placeholder": {
            border: "none",
            backgroundColor: "transparent",
            color: "#999",
            fallbacks: [
                {
                    backgroundColor: "transparent",
                },
                {
                    border: "none",
                },
            ],
        },
        ".text-input--underbar:invalid": {
            border: "none",
            backgroundColor: "transparent",
            color: "#1f1f21",
            fallbacks: [
                {
                    backgroundColor: "transparent",
                },
                {
                    border: "none",
                },
            ],
            borderBottom: "1px solid #ccc",
        },
        ".text-input--material": {
            boxSizing: "border-box",
            backgroundClip: "padding-box",
            padding: "0",
            margin: "0",
            font: "inherit",
            color: "#212121",
            background: "transparent",
            border: "none",
            verticalAlign: "middle",
            outline: "none",
            lineHeight: "1",
            fontFamily: '"Roboto", "Noto", sans-serif',
            webkitFontSmoothing: "antialiased",
            mozOsxFontSmoothing: "grayscale",
            fontWeight: "400",
            fallbacks: [
                {
                    verticalAlign: "top",
                },
                {
                    border: "none",
                },
                {
                    fontWeight: "400",
                },
                {
                    color: "inherit",
                },
                {
                    fontWeight: "400",
                },
                {
                    webkitFontSmoothing: "antialiased",
                },
                {
                    fontFamily: '-apple-system, "Helvetica Neue", "Helvetica", "Arial", "Lucida Grande", sans-serif',
                },
            ],
            backgroundImage: "linear-gradient(to top, transparent 1px, #afafaf 1px)",
            backgroundSize: "100% 2px",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center bottom",
            backgroundColor: "transparent",
            fontSize: "16px",
            paddingBottom: "2px",
            borderRadius: "0",
            height: "24px",
            webkitTransform: "translate3d(0, 0, 0)",
        },
        ".text-input--material__label": {
            fontFamily: '"Roboto", "Noto", sans-serif',
            webkitFontSmoothing: "antialiased",
            fontWeight: "400",
            color: "#afafaf",
            position: "absolute",
            left: "0",
            top: "2px",
            fontSize: "16px",
            fallbacks: [
                {
                    fontWeight: "400",
                },
            ],
            pointerEvents: "none",
        },
        ".text-input--material__label--active": {
            color: "#3d5afe",
            webkitTransform: "translate(0, -75%) scale(0.75)",
            transform: "translate(0, -75%) scale(0.75)",
            webkitTransformOrigin: "left top",
            transformOrigin: "left top",
            transition: "transform 0.1s ease-in, color 0.1s ease-in, -webkit-transform 0.1s ease-in",
            fallbacks: [
                {
                    transition: "transform 0.1s ease-in, color 0.1s ease-in",
                },
                {
                    transition: "color 0.1s ease-in, -webkit-transform 0.1s ease-in",
                },
            ],
        },
        ".text-input--material:focus": {
            backgroundImage: "linear-gradient(#3d5afe, #3d5afe),\r\n    linear-gradient(to top, transparent 1px, #afafaf 1px)",
            webkitAnimation: "material-text-input-animate 0.3s forwards",
            animation: "material-text-input-animate 0.3s forwards",
        },
        ".text-input--material::-webkit-input-placeholder": {
            color: "#afafaf",
            lineHeight: "20px",
        },
        ".text-input--material:-ms-input-placeholder": {
            color: "#afafaf",
            lineHeight: "20px",
        },
        ".text-input--material::-ms-input-placeholder": {
            color: "#afafaf",
            lineHeight: "20px",
        },
        ".text-input--material::placeholder": {
            color: "#afafaf",
            lineHeight: "20px",
        },
        "@keyframes material-text-input-animate": {
            "0%": {
                backgroundSize: "0% 2px, 100% 2px",
            },
            "100%": {
                backgroundSize: "100% 2px, 100% 2px",
            },
        },
        ".textarea": {
            boxSizing: "border-box",
            backgroundClip: "padding-box",
            padding: "5px 5px 5px 5px",
            margin: "0",
            font: "inherit",
            color: "#1f1f21",
            background: "transparent",
            border: "1px solid #ccc",
            lineHeight: "normal",
            fontFamily: '-apple-system, "Helvetica Neue", "Helvetica", "Arial", "Lucida Grande", sans-serif',
            webkitFontSmoothing: "antialiased",
            mozOsxFontSmoothing: "grayscale",
            fontWeight: "400",
            verticalAlign: "top",
            resize: "none",
            outline: "none",
            fallbacks: [
                {
                    color: "inherit",
                },
                {
                    backgroundColor: "#ffffff",
                },
                {
                    border: "none",
                },
                {
                    fontWeight: "400",
                },
                {
                    padding: "0",
                },
            ],
            fontSize: "16px",
            borderRadius: "4px",
            backgroundColor: "rgba(255, 255, 255, 1)",
            letterSpacing: "0",
            boxShadow: "none",
            webkitAppearance: "none",
            mozAppearance: "none",
            appearance: "none",
            width: "auto",
        },
        ".textarea:disabled": {
            opacity: "0.3",
            pointerEvents: "none",
        },
        ".textarea::-webkit-input-placeholder": {
            color: "#999",
        },
        ".textarea:-ms-input-placeholder": {
            color: "#999",
        },
        ".textarea::-ms-input-placeholder": {
            color: "#999",
        },
        ".textarea::placeholder": {
            color: "#999",
        },
        ".textarea--transparent": {
            boxSizing: "border-box",
            backgroundClip: "padding-box",
            padding: "5px 5px 5px 5px",
            margin: "0",
            font: "inherit",
            color: "#1f1f21",
            background: "transparent",
            border: "none",
            lineHeight: "normal",
            fontFamily: '-apple-system, "Helvetica Neue", "Helvetica", "Arial", "Lucida Grande", sans-serif',
            webkitFontSmoothing: "antialiased",
            mozOsxFontSmoothing: "grayscale",
            fontWeight: "400",
            verticalAlign: "top",
            resize: "none",
            outline: "none",
            fallbacks: [
                {
                    color: "inherit",
                },
                {
                    border: "none",
                },
                {
                    fontWeight: "400",
                },
                {
                    padding: "0",
                },
            ],
            paddingLeft: "0",
            paddingRight: "0",
            fontSize: "16px",
            borderRadius: "4px",
            backgroundColor: "transparent",
            letterSpacing: "0",
            boxShadow: "none",
            webkitAppearance: "none",
            mozAppearance: "none",
            appearance: "none",
            width: "auto",
        },
        ".textarea--transparent:disabled": {
            opacity: "0.3",
            pointerEvents: "none",
        },
        ".textarea--transparent::-webkit-input-placeholder": {
            color: "#999",
        },
        ".textarea--transparent:-ms-input-placeholder": {
            color: "#999",
        },
        ".textarea--transparent::-ms-input-placeholder": {
            color: "#999",
        },
        ".textarea--transparent::placeholder": {
            color: "#999",
        },
        ".dialog": {
            boxSizing: "border-box",
            backgroundClip: "padding-box",
            padding: "0",
            margin: "auto auto",
            font: "inherit",
            color: "inherit",
            background: "transparent",
            border: "none",
            lineHeight: "normal",
            webkitUserSelect: "none",
            mozUserSelect: "none",
            msUserSelect: "none",
            userSelect: "none",
            fontFamily: '-apple-system, "Helvetica Neue", "Helvetica", "Arial", "Lucida Grande", sans-serif',
            webkitFontSmoothing: "antialiased",
            mozOsxFontSmoothing: "grayscale",
            fontWeight: "400",
            position: "absolute",
            top: "50%",
            left: "50%",
            webkitTransform: "translate(-50%, -50%)",
            transform: "translate(-50%, -50%)",
            fallbacks: [
                {
                    margin: "0",
                },
            ],
            overflow: "hidden",
            minWidth: "270px",
            minHeight: "100px",
            textAlign: "left",
        },
        ".dialog-container": {
            height: "inherit",
            minHeight: "inherit",
            overflow: "hidden",
            borderRadius: "4px",
            backgroundColor: "#f4f4f4",
            webkitMaskImage: 'url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAIAAACQd1PeAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAA5JREFUeNpiYGBgAAgwAAAEAAGbA+oJAAAAAElFTkSuQmCC")',
            color: "#1f1f21",
        },
        ".dialog-mask": {
            padding: "0",
            margin: "0",
            font: "inherit",
            color: "inherit",
            background: "transparent",
            border: "none",
            lineHeight: "normal",
            webkitUserSelect: "none",
            mozUserSelect: "none",
            msUserSelect: "none",
            userSelect: "none",
            position: "absolute",
            top: "0",
            right: "0",
            left: "0",
            bottom: "0",
            backgroundColor: "rgba(0, 0, 0, 0.2)",
            fallbacks: [
                {
                    backgroundColor: "#000000",
                },
            ],
        },
        ".dialog--material": {
            fontFamily: '"Roboto", "Noto", sans-serif',
            webkitFontSmoothing: "antialiased",
            fontWeight: "400",
            textAlign: "left",
            boxShadow: "0 16px 24px 2px rgba(0, 0, 0, 0.14), 0 6px 30px 5px rgba(0, 0, 0, 0.12),\r\n    0 8px 10px -5px rgba(0, 0, 0, 0.4)",
        },
        ".dialog-container--material": {
            borderRadius: "8px",
            backgroundColor: "#ffffff",
            color: "#1f1f21",
        },
        ".dialog-mask--material": {
            backgroundColor: "rgba(0, 0, 0, 0.3)",
            fallbacks: [
                {
                    backgroundColor: "#000000",
                },
            ],
        },
        ".alert-dialog": {
            boxSizing: "border-box",
            backgroundClip: "padding-box",
            padding: "0",
            margin: "auto",
            font: "inherit",
            color: "#1f1f21",
            background: "transparent",
            border: "none",
            lineHeight: "normal",
            webkitUserSelect: "none",
            mozUserSelect: "none",
            msUserSelect: "none",
            userSelect: "none",
            fontFamily: '-apple-system, "Helvetica Neue", "Helvetica", "Arial", "Lucida Grande", sans-serif',
            webkitFontSmoothing: "antialiased",
            mozOsxFontSmoothing: "grayscale",
            fontWeight: "400",
            position: "absolute",
            top: "50%",
            left: "50%",
            webkitTransform: "translate(-50%, -50%)",
            transform: "translate(-50%, -50%)",
            width: "270px",
            fallbacks: [
                {
                    color: "inherit",
                },
                {
                    margin: "0",
                },
            ],
            backgroundColor: "#f4f4f4",
            borderRadius: "8px",
            overflow: "visible",
            maxWidth: "95%",
        },
        ".alert-dialog-container": {
            height: "inherit",
            paddingTop: "16px",
            overflow: "hidden",
        },
        ".alert-dialog-title": {
            fontFamily: '-apple-system, "Helvetica Neue", "Helvetica", "Arial", "Lucida Grande", sans-serif',
            webkitFontSmoothing: "antialiased",
            mozOsxFontSmoothing: "grayscale",
            fontWeight: "500",
            fontSize: "17px",
            fallbacks: [
                {
                    fontWeight: "400",
                },
            ],
            padding: "0 8px",
            textAlign: "center",
            color: "#1f1f21",
        },
        ".alert-dialog-content": {
            boxSizing: "border-box",
            backgroundClip: "padding-box",
            padding: "4px 12px 8px",
            fontSize: "14px",
            minHeight: "36px",
            textAlign: "center",
            color: "#1f1f21",
        },
        ".alert-dialog-footer": {
            width: "100%",
        },
        ".alert-dialog-button": {
            boxSizing: "border-box",
            backgroundClip: "padding-box",
            padding: "0 8px",
            margin: "0",
            font: "inherit",
            color: "#4a148c",
            background: "transparent",
            border: "none",
            lineHeight: "44px",
            fontFamily: '-apple-system, "Helvetica Neue", "Helvetica", "Arial", "Lucida Grande", sans-serif',
            webkitFontSmoothing: "antialiased",
            mozOsxFontSmoothing: "grayscale",
            fontWeight: "400",
            webkitUserSelect: "none",
            mozUserSelect: "none",
            msUserSelect: "none",
            userSelect: "none",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textDecoration: "none",
            letterSpacing: "0",
            verticalAlign: "middle",
            fallbacks: [
                {
                    color: "inherit",
                },
                {
                    lineHeight: "normal",
                },
                {
                    margin: "0",
                },
                {
                    padding: "0",
                },
                {
                    border: "none",
                },
            ],
            borderTop: "1px solid #ddd",
            fontSize: "16px",
            display: "block",
            width: "100%",
            backgroundColor: "transparent",
            textAlign: "center",
            height: "44px",
            outline: "none",
        },
        ".alert-dialog-button:active": {
            backgroundColor: "rgba(0, 0, 0, 0.05)",
            fallbacks: [
                {
                    backgroundColor: "#000000",
                },
            ],
        },
        ".alert-dialog-button--primal": {
            fontWeight: "500",
        },
        ".alert-dialog-footer--rowfooter": {
            whiteSpace: "nowrap",
            display: "flex",
            fallbacks: [
                {
                    display: "-webkit-flex",
                },
                {
                    display: "-webkit-box",
                },
            ],
            webkitFlexWrap: "wrap",
            flexWrap: "wrap",
        },
        ".alert-dialog-button--rowfooter": {
            webkitBoxFlex: "1",
            webkitFlex: "1",
            flex: "1",
            display: "block",
            width: "100%",
            borderLeft: "1px solid #ddd",
        },
        ".alert-dialog-button--rowfooter:first-child": {
            borderLeft: "none",
        },
        ".alert-dialog-mask": {
            padding: "0",
            margin: "0",
            font: "inherit",
            color: "inherit",
            background: "transparent",
            border: "none",
            lineHeight: "normal",
            webkitUserSelect: "none",
            mozUserSelect: "none",
            msUserSelect: "none",
            userSelect: "none",
            position: "absolute",
            top: "0",
            right: "0",
            left: "0",
            bottom: "0",
            backgroundColor: "rgba(0, 0, 0, 0.2)",
            fallbacks: [
                {
                    backgroundColor: "#000000",
                },
            ],
        },
        ".alert-dialog--material": {
            borderRadius: "8px",
            backgroundColor: "#ffffff",
        },
        ".alert-dialog-container--material": {
            borderRadius: "8px",
            padding: "22px 0 0 0",
            boxShadow: "0 16px 24px 2px rgba(0, 0, 0, 0.14), 0 6px 30px 5px rgba(0, 0, 0, 0.12),\r\n    0 8px 10px -5px rgba(0, 0, 0, 0.4)",
        },
        ".alert-dialog-title--material": {
            fontFamily: '"Roboto", "Noto", sans-serif',
            webkitFontSmoothing: "antialiased",
            fontWeight: "500",
            textAlign: "left",
            fontSize: "20px",
            fallbacks: [
                {
                    fontWeight: "400",
                },
            ],
            padding: "0 24px",
            color: "#31313a",
        },
        ".alert-dialog-content--material": {
            fontFamily: '"Roboto", "Noto", sans-serif',
            webkitFontSmoothing: "antialiased",
            fontWeight: "400",
            textAlign: "left",
            fontSize: "16px",
            fallbacks: [
                {
                    color: "#31313a",
                },
                {
                    fontWeight: "400",
                },
            ],
            lineHeight: "20px",
            padding: "0 24px",
            margin: "24px 0 10px 0",
            minHeight: "0",
            color: "rgba(49, 49, 58, 0.85)",
        },
        ".alert-dialog-footer--material": {
            display: "block",
            padding: "0",
            height: "52px",
            boxSizing: "border-box",
            margin: "0",
            lineHeight: "1",
        },
        ".alert-dialog-button--material": {
            fontFamily: '"Roboto", "Noto", sans-serif',
            webkitFontSmoothing: "antialiased",
            fontWeight: "500",
            textTransform: "uppercase",
            display: "inline-block",
            width: "auto",
            float: "right",
            background: "none",
            border: "none",
            borderRadius: "2px",
            fontSize: "14px",
            fallbacks: [
                {
                    fontWeight: "400",
                },
            ],
            outline: "none",
            height: "36px",
            lineHeight: "36px",
            padding: "0 8px",
            margin: "8px 8px 8px 0",
            boxSizing: "border-box",
            minWidth: "50px",
            color: "#4a148c",
        },
        ".alert-dialog-button--material:active": {
            backgroundColor: "initial",
            fallbacks: [
                {
                    backgroundColor: "transparent",
                },
            ],
        },
        ".alert-dialog-button--rowfooter--material, .alert-dialog-button--rowfooter--material:first-child": {
            border: "0",
        },
        ".alert-dialog-button--primal--material": {
            fontWeight: "500",
        },
        ".alert-dialog-mask--material": {
            backgroundColor: "rgba(0, 0, 0, 0.3)",
            fallbacks: [
                {
                    backgroundColor: "#000000",
                },
            ],
        },
        ".popover": {
            position: "absolute",
            zIndex: "20001",
        },
        ".popover--bottom": {
            bottom: "0",
        },
        ".popover--top": {
            top: "0",
        },
        ".popover--left": {
            left: "0",
        },
        ".popover--right": {
            right: "0",
        },
        ".popover-mask": {
            left: "0",
            right: "0",
            top: "0",
            bottom: "0",
            backgroundColor: "rgba(0, 0, 0, 0.2)",
            fallbacks: [
                {
                    backgroundColor: "#000000",
                },
            ],
            position: "absolute",
            zIndex: "19999",
        },
        ".popover__content": {
            boxSizing: "border-box",
            backgroundClip: "padding-box",
            padding: "0",
            margin: "0",
            font: "inherit",
            color: "#1f1f21",
            background: "transparent",
            border: "none",
            lineHeight: "normal",
            webkitUserSelect: "none",
            mozUserSelect: "none",
            msUserSelect: "none",
            userSelect: "none",
            fontFamily: '-apple-system, "Helvetica Neue", "Helvetica", "Arial", "Lucida Grande", sans-serif',
            webkitFontSmoothing: "antialiased",
            mozOsxFontSmoothing: "grayscale",
            fontWeight: "400",
            display: "block",
            width: "220px",
            overflow: "auto",
            minHeight: "100px",
            maxHeight: "100%",
            backgroundColor: "white",
            borderRadius: "8px",
            fallbacks: [
                {
                    color: "inherit",
                },
            ],
            pointerEvents: "auto",
        },
        ".popover--top__content": {},
        ".popover--bottom__content": {},
        ".popover--left__content": {},
        ".popover--right__content": {},
        ".popover__arrow": {
            position: "absolute",
            width: "18px",
            height: "18px",
            webkitTransformOrigin: "50% 50% 0",
            transformOrigin: "50% 50% 0",
            backgroundColor: "transparent",
            backgroundImage: "linear-gradient(45deg, white, white 50%, transparent 50%)",
            borderRadius: "0 0 0 4px",
            margin: "0",
            zIndex: "20001",
        },
        ".popover--bottom__arrow": {
            webkitTransform: "translateY(6px) translateX(-9px) rotate(-45deg)",
            transform: "translateY(6px) translateX(-9px) rotate(-45deg)",
            bottom: "0",
            marginRight: "-18px",
        },
        ".popover--top__arrow": {
            webkitTransform: "translateY(-6px) translateX(-9px) rotate(135deg)",
            transform: "translateY(-6px) translateX(-9px) rotate(135deg)",
            top: "0",
            marginRight: "-18px",
        },
        ".popover--left__arrow": {
            webkitTransform: "translateX(-6px) translateY(-9px) rotate(45deg)",
            transform: "translateX(-6px) translateY(-9px) rotate(45deg)",
            left: "0",
            marginBottom: "-18px",
        },
        ".popover--right__arrow": {
            webkitTransform: "translateX(6px) translateY(-9px) rotate(225deg)",
            transform: "translateX(6px) translateY(-9px) rotate(225deg)",
            right: "0",
            marginBottom: "-18px",
        },
        ".popover--material": {},
        ".popover-mask--material": {
            backgroundColor: "transparent",
        },
        ".popover--material__content": {
            backgroundColor: "#fafafa",
            borderRadius: "2px",
            color: "#1f1f21",
            boxShadow: "0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12),\r\n    0 3px 1px -2px rgba(0, 0, 0, 0.2)",
        },
        ".popover--material__arrow": {
            display: "none",
        },
        ".progress-bar": {
            position: "relative",
            height: "2px",
            display: "block",
            width: "100%",
            backgroundColor: "transparent",
            backgroundClip: "padding-box",
            margin: "0",
            overflow: "hidden",
            borderRadius: "4px",
        },
        ".progress-bar__primary, .progress-bar__secondary": {
            position: "absolute",
            backgroundColor: "#4a148c",
            top: "0",
            bottom: "0",
            transition: "width 0.3s linear",
            zIndex: "100",
            borderRadius: "4px",
        },
        ".progress-bar__secondary": {
            backgroundColor: "#65adff",
            zIndex: "0",
        },
        ".progress-bar--indeterminate:before": {
            content: '""',
            position: "absolute",
            backgroundColor: "#4a148c",
            top: "0",
            left: "0",
            bottom: "0",
            willChange: "left, right",
            webkitAnimation: "progress-bar__indeterminate 2.1s cubic-bezier(0.65, 0.815, 0.735, 0.395)\r\n    infinite",
            animation: "progress-bar__indeterminate 2.1s cubic-bezier(0.65, 0.815, 0.735, 0.395) infinite",
            borderRadius: "4px",
        },
        ".progress-bar--indeterminate:after": {
            content: '""',
            position: "absolute",
            backgroundColor: "#4a148c",
            top: "0",
            left: "0",
            bottom: "0",
            willChange: "left, right",
            webkitAnimation: "progress-bar__indeterminate-short 2.1s cubic-bezier(0.165, 0.84, 0.44, 1)\r\n    infinite",
            animation: "progress-bar__indeterminate-short 2.1s cubic-bezier(0.165, 0.84, 0.44, 1) infinite",
            webkitAnimationDelay: "1.15s",
            animationDelay: "1.15s",
            borderRadius: "4px",
        },
        "@keyframes progress-bar__indeterminate": {
            "0%": {
                left: "-35%",
                right: "100%",
            },
            "60%": {
                left: "100%",
                right: "-90%",
            },
            "100%": {
                left: "100%",
                right: "-90%",
            },
        },
        "@keyframes progress-bar__indeterminate-short": {
            "0%": {
                left: "-200%",
                right: "100%",
            },
            "60%": {
                left: "107%",
                right: "-8%",
            },
            "100%": {
                left: "107%",
                right: "-8%",
            },
        },
        ".progress-bar--material": {
            height: "4px",
            backgroundColor: "transparent",
            borderRadius: "0",
        },
        ".progress-bar--material__primary, .progress-bar--material__secondary": {
            backgroundColor: "#4a148c",
            borderRadius: "0",
        },
        ".progress-bar--material__secondary": {
            backgroundColor: "#12005e",
            zIndex: "0",
        },
        ".progress-bar--material.progress-bar--indeterminate:before": {
            backgroundColor: "#4a148c",
            borderRadius: "0",
        },
        ".progress-bar--material.progress-bar--indeterminate:after": {
            backgroundColor: "#4a148c",
            borderRadius: "0",
        },
        ".progress-circular": {
            height: "32px",
            position: "relative",
            width: "32px",
            webkitTransform: "rotate(270deg)",
            transform: "rotate(270deg)",
            webkitAnimation: "none",
            animation: "none",
        },
        ".progress-circular__background, .progress-circular__primary, .progress-circular__secondary": {
            cx: "50%",
            cy: "50%",
            r: "40%",
            webkitAnimation: "none",
            animation: "none",
            fill: "none",
            strokeWidth: "5%",
            strokeMiterlimit: "10",
        },
        ".progress-circular__background": {
            stroke: "transparent",
        },
        ".progress-circular__primary": {
            strokeDasharray: "1, 200",
            strokeDashoffset: "0",
            stroke: "#4a148c",
            transition: "all 1s cubic-bezier(0.4, 0, 0.2, 1)",
        },
        ".progress-circular__secondary": {
            stroke: "#65adff",
        },
        ".progress-circular--indeterminate": {
            webkitAnimation: "progress__rotate 2s linear infinite",
            animation: "progress__rotate 2s linear infinite",
            webkitTransform: "none",
            transform: "none",
        },
        ".progress-circular--indeterminate__primary": {
            webkitAnimation: "progress__dash 1.5s ease-in-out infinite",
            animation: "progress__dash 1.5s ease-in-out infinite",
        },
        ".progress-circular--indeterminate__secondary": {
            display: "none",
        },
        "@keyframes progress__rotate": {
            "100%": {
                webkitTransform: "rotate(360deg)",
                transform: "rotate(360deg)",
            },
        },
        "@keyframes progress__dash": {
            "0%": {
                strokeDasharray: "10%, 241.32%",
                strokeDashoffset: "0",
            },
            "50%": {
                strokeDasharray: "201%, 50.322%",
                strokeDashoffset: "-100%",
            },
            "100%": {
                strokeDasharray: "10%, 241.32%",
                strokeDashoffset: "-251.32%",
            },
        },
        ".progress-circular--material__background, .progress-circular--material__primary, .progress-circular--material__secondary": {
            strokeWidth: "9%",
        },
        ".progress-circular--material__background": {
            stroke: "transparent",
        },
        ".progress-circular--material__primary": {
            stroke: "#4a148c",
        },
        ".progress-circular--material__secondary": {
            stroke: "#12005e",
        },
        "ons-fab.fab, ons-speed-dial-item.fab, button.fab": {
            position: "relative",
            display: "inline-block",
            boxSizing: "border-box",
            backgroundClip: "padding-box",
            padding: "0",
            margin: "0",
            font: "inherit",
            color: "#ffffff",
            background: "transparent",
            border: "0 solid currentColor",
            lineHeight: "56px",
            fontFamily: '-apple-system, "Helvetica Neue", "Helvetica", "Arial", "Lucida Grande", sans-serif',
            webkitFontSmoothing: "antialiased",
            mozOsxFontSmoothing: "grayscale",
            fontWeight: "400",
            webkitUserSelect: "none",
            mozUserSelect: "none",
            msUserSelect: "none",
            userSelect: "none",
            width: "56px",
            height: "56px",
            textDecoration: "none",
            fontSize: "25px",
            fallbacks: [
                {
                    border: "none",
                },
                {
                    color: "inherit",
                },
                {
                    lineHeight: "normal",
                },
            ],
            letterSpacing: "0",
            verticalAlign: "middle",
            textAlign: "center",
            backgroundColor: "#4a148c",
            borderRadius: "50%",
            overflow: "hidden",
            boxShadow: "0 3px 6px rgba(0, 0, 0, 0.12)",
            transition: "all 0.1s linear",
        },
        "ons-fab.fab:active, ons-speed-dial-item.fab:active, button.fab:active": {
            boxShadow: "0 0 6 rgba(0, 0, 0, 0.12)",
            backgroundColor: "color-mod(#4a148c a(70%))",
            transition: "all 0.2s ease",
            fallbacks: [
                {
                    boxShadow: "0 3px 6 rgba(0, 0, 0, 0.12)",
                },
            ],
        },
        "ons-fab.fab:focus, ons-speed-dial-item.fab:focus, button.fab:focus": {
            outline: "0",
        },
        "ons-fab.fab:disabled, ons-fab.fab[disabled], ons-speed-dial-item.fab:disabled, ons-speed-dial-item.fab[disabled], button.fab:disabled, button.fab[disabled]": {
            backgroundColor: "color-mod(black alpha(50%))",
            boxShadow: "none",
            opacity: "0.3",
            pointerEvents: "none",
        },
        "ons-fab.fab__icon, ons-speed-dial-item.fab__icon, button.fab__icon": {
            position: "relative",
            overflow: "hidden",
            height: "100%",
            width: "100%",
            display: "block",
            borderRadius: "100%",
            padding: "0",
            zIndex: "100",
            lineHeight: "56px",
        },
        "ons-fab.fab--material, ons-speed-dial-item.fab--material, button.fab--material": {
            position: "relative",
            display: "inline-block",
            boxSizing: "border-box",
            backgroundClip: "padding-box",
            padding: "0",
            margin: "0",
            font: "inherit",
            color: "rgba(255, 255, 255, 1)",
            background: "transparent",
            border: "0 solid currentColor",
            lineHeight: "56px",
            fontFamily: '"Roboto", "Noto", sans-serif',
            webkitFontSmoothing: "antialiased",
            mozOsxFontSmoothing: "grayscale",
            fontWeight: "400",
            webkitUserSelect: "none",
            mozUserSelect: "none",
            msUserSelect: "none",
            userSelect: "none",
            width: "56px",
            height: "56px",
            textDecoration: "none",
            fontSize: "25px",
            fallbacks: [
                {
                    transition: "all 0.1s linear",
                },
                {
                    boxShadow: "0 3px 6px rgba(0, 0, 0, 0.12)",
                },
                {
                    backgroundColor: "#4a148c",
                },
                {
                    color: "#ffffff",
                },
                {
                    color: "#ffffff",
                },
                {
                    lineHeight: "56px",
                },
                {
                    fontSize: "25px",
                },
                {
                    textDecoration: "none",
                },
                {
                    height: "56px",
                },
                {
                    width: "56px",
                },
                {
                    fontWeight: "400",
                },
                {
                    webkitFontSmoothing: "antialiased",
                },
                {
                    fontFamily: '-apple-system, "Helvetica Neue", "Helvetica", "Arial", "Lucida Grande", sans-serif',
                },
                {
                    border: "none",
                },
                {
                    color: "inherit",
                },
                {
                    lineHeight: "normal",
                },
            ],
            letterSpacing: "0",
            verticalAlign: "middle",
            textAlign: "center",
            backgroundColor: "#4a148c",
            borderRadius: "50%",
            overflow: "hidden",
            boxShadow: "0 4px 5px 0 rgba(0, 0, 0, 0.14), 0 1px 10px 0 rgba(0, 0, 0, 0.12),\r\n    0 2px 4px -1px rgba(0, 0, 0, 0.4)",
            transition: "all 0.2s ease-in-out",
        },
        "ons-fab.fab--material:active, ons-speed-dial-item.fab--material:active, button.fab--material:active": {
            boxShadow: "0 8px 10px 1px rgba(0, 0, 0, 0.14), 0 3px 14px 2px rgba(0, 0, 0, 0.12),\r\n    0 5px 5px -3px rgba(0, 0, 0, 0.4)",
            backgroundColor: "rgba(255, 255, 255, 0.75)",
            fallbacks: [
                {
                    backgroundColor: "#ffffff",
                },
            ],
            transition: "all 0.2s ease",
        },
        "ons-fab.fab--material:focus, ons-speed-dial-item.fab--material:focus, button.fab--material:focus": {
            outline: "0",
        },
        "ons-fab.fab--material__icon, ons-speed-dial-item.fab--material__icon, button.fab--material__icon": {
            position: "relative",
            overflow: "hidden",
            height: "100%",
            width: "100%",
            display: "block",
            borderRadius: "100%",
            padding: "0",
            zIndex: "100",
            lineHeight: "56px",
        },
        "ons-fab.fab--material:disabled, ons-fab.fab--material[disabled], ons-speed-dial-item.fab--material:disabled, ons-speed-dial-item.fab--material[disabled], button.fab--material:disabled, button.fab--material[disabled]": {
            backgroundColor: "color-mod(black alpha(50%))",
            boxShadow: "none",
            opacity: "0.3",
            pointerEvents: "none",
        },
        "ons-fab.fab--mini, ons-speed-dial-item.fab--mini, button.fab--mini": {
            width: "40px",
            height: "40px",
            lineHeight: "40px",
        },
        "ons-fab.fab--mini__icon, ons-speed-dial-item.fab--mini__icon, button.fab--mini__icon": {
            lineHeight: "40px",
        },
        "ons-fab.speed-dial__item, ons-speed-dial-item.speed-dial__item, button.speed-dial__item": {
            position: "absolute",
            webkitTransform: "scale(0)",
            transform: "scale(0)",
        },
        "ons-fab.fab--top__right, button.fab--top__right, .speed-dial.fab--top__right": {
            top: "20px",
            bottom: "auto",
            right: "20px",
            left: "auto",
            position: "absolute",
        },
        "ons-fab.fab--bottom__right, button.fab--bottom__right, .speed-dial.fab--bottom__right": {
            top: "auto",
            bottom: "20px",
            right: "20px",
            left: "auto",
            position: "absolute",
        },
        "ons-fab.fab--top__left, button.fab--top__left, .speed-dial.fab--top__left": {
            top: "20px",
            bottom: "auto",
            right: "auto",
            left: "20px",
            position: "absolute",
        },
        "ons-fab.fab--bottom__left, button.fab--bottom__left, .speed-dial.fab--bottom__left": {
            top: "auto",
            bottom: "20px",
            right: "auto",
            left: "20px",
            position: "absolute",
        },
        "ons-fab.fab--top__center, button.fab--top__center, .speed-dial.fab--top__center": {
            top: "20px",
            bottom: "auto",
            marginLeft: "-28px",
            left: "50%",
            right: "auto",
            position: "absolute",
        },
        "ons-fab.fab--bottom__center, button.fab--bottom__center, .speed-dial.fab--bottom__center": {
            top: "auto",
            bottom: "20px",
            marginLeft: "-28px",
            left: "50%",
            right: "auto",
            position: "absolute",
        },
        ".modal": {
            boxSizing: "border-box",
            backgroundClip: "padding-box",
            whiteSpace: "nowrap",
            overflow: "hidden",
            wordSpacing: "0",
            padding: "0",
            margin: "0",
            font: "inherit",
            color: "inherit",
            background: "transparent",
            border: "none",
            lineHeight: "normal",
            fallbacks: [
                {
                    backgroundColor: "#000000",
                },
                {
                    overflow: "hidden",
                },
                {
                    backgroundClip: "padding-box",
                },
                {
                    boxSizing: "border-box",
                },
            ],
            fontFamily: '-apple-system, "Helvetica Neue", "Helvetica", "Arial", "Lucida Grande", sans-serif',
            webkitFontSmoothing: "antialiased",
            mozOsxFontSmoothing: "grayscale",
            fontWeight: "400",
            backgroundColor: "rgba(0, 0, 0, 0.7)",
            position: "absolute",
            left: "0",
            right: "0",
            top: "0",
            bottom: "0",
            width: "100%",
            height: "100%",
            display: "table",
            zIndex: "2147483647",
        },
        ".modal__content": {
            boxSizing: "border-box",
            backgroundClip: "padding-box",
            whiteSpace: "normal",
            overflow: "hidden",
            wordSpacing: "0",
            padding: "0",
            margin: "0",
            font: "inherit",
            color: "#fff",
            background: "transparent",
            border: "none",
            lineHeight: "normal",
            fallbacks: [
                {
                    whiteSpace: "nowrap",
                },
                {
                    color: "inherit",
                },
                {
                    backgroundClip: "padding-box",
                },
                {
                    boxSizing: "border-box",
                },
            ],
            fontFamily: '-apple-system, "Helvetica Neue", "Helvetica", "Arial", "Lucida Grande", sans-serif',
            webkitFontSmoothing: "antialiased",
            mozOsxFontSmoothing: "grayscale",
            fontWeight: "400",
            display: "table-cell",
            verticalAlign: "middle",
            textAlign: "center",
        },
        ".select-input": {
            boxSizing: "border-box",
            backgroundClip: "padding-box",
            padding: "0 20px 0 0",
            margin: "0",
            font: "inherit",
            color: "#1f1f21",
            background: "transparent",
            border: "none",
            verticalAlign: "top",
            outline: "none",
            lineHeight: "32px",
            fontFamily: '-apple-system, "Helvetica Neue", "Helvetica", "Arial", "Lucida Grande", sans-serif',
            webkitFontSmoothing: "antialiased",
            mozOsxFontSmoothing: "grayscale",
            fontWeight: "400",
            fallbacks: [
                {
                    backgroundColor: "transparent",
                },
                {
                    padding: "0",
                },
                {
                    border: "none",
                },
                {
                    color: "inherit",
                },
                {
                    lineHeight: "1",
                },
                {
                    border: "none",
                },
            ],
            backgroundColor: "transparent",
            position: "relative",
            fontSize: "17px",
            height: "32px",
            borderColor: "#ccc",
            webkitAppearance: "none",
            mozAppearance: "none",
            appearance: "none",
            display: "inline-block",
            borderRadius: "0",
            backgroundImage: 'url("data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iMTBweCIgaGVpZ2h0PSI1cHgiIHZpZXdCb3g9IjAgMCAxMCA1IiB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiPgogICAgPCEtLSBHZW5lcmF0b3I6IFNrZXRjaCA0My4yICgzOTA2OSkgLSBodHRwOi8vd3d3LmJvaGVtaWFuY29kaW5nLmNvbS9za2V0Y2ggLS0+CiAgICA8dGl0bGU+c2VsZWN0LWFsbG93PC90aXRsZT4KICAgIDxkZXNjPkNyZWF0ZWQgd2l0aCBTa2V0Y2guPC9kZXNjPgogICAgPGRlZnM+PC9kZWZzPgogICAgPGcgaWQ9InNlbGVjdCIgc3Ryb2tlPSJub25lIiBzdHJva2Utd2lkdGg9IjEiIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCI+CiAgICAgICAgPGcgaWQ9Imlvcy1zZWxlY3QiIHRyYW5zZm9ybT0idHJhbnNsYXRlKC0xOTguMDAwMDAwLCAtMTE0LjAwMDAwMCkiIGZpbGw9IiM3NTc1NzUiPgogICAgICAgICAgICA8ZyBpZD0ibWVudS1iYXItKy1vcGVuLW1lbnUiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDEyMy4wMDAwMDAsIDEwMC4wMDAwMDApIj4KICAgICAgICAgICAgICAgIDxnIGlkPSJtZW51LWJhciI+CiAgICAgICAgICAgICAgICAgICAgPHBvbHlnb24gaWQ9InNlbGVjdC1hbGxvdyIgcG9pbnRzPSI3NSAxNCA4MCAxOSA4NSAxNCI+PC9wb2x5Z29uPgogICAgICAgICAgICAgICAgPC9nPgogICAgICAgICAgICA8L2c+CiAgICAgICAgPC9nPgogICAgPC9nPgo8L3N2Zz4=")',
            backgroundRepeat: "no-repeat",
            backgroundPosition: "right center",
            borderBottom: "none",
        },
        ".select-input::-ms-clear": {
            display: "none",
        },
        ".select-input::-webkit-input-placeholder": {
            color: "#999",
        },
        ".select-input:-ms-input-placeholder": {
            color: "#999",
        },
        ".select-input::-ms-input-placeholder": {
            color: "#999",
        },
        ".select-input::placeholder": {
            color: "#999",
        },
        ".select-input:disabled": {
            opacity: "0.3",
            pointerEvents: "none",
            border: "none",
            backgroundColor: "transparent",
        },
        ".select-input:disabled::-webkit-input-placeholder": {
            border: "none",
            backgroundColor: "transparent",
            color: "#999",
        },
        ".select-input:disabled:-ms-input-placeholder": {
            border: "none",
            backgroundColor: "transparent",
            color: "#999",
        },
        ".select-input:disabled::-ms-input-placeholder": {
            border: "none",
            backgroundColor: "transparent",
            color: "#999",
        },
        ".select-input:disabled::placeholder": {
            border: "none",
            backgroundColor: "transparent",
            color: "#999",
        },
        ".select-input:invalid": {
            border: "none",
            backgroundColor: "transparent",
            color: "#1f1f21",
        },
        ".select-input[multiple]": {
            height: "64px",
        },
        ".select-input--material": {
            fontFamily: '"Roboto", "Noto", sans-serif',
            webkitFontSmoothing: "antialiased",
            fontWeight: "400",
            color: "#1f1f21",
            fontSize: "15px",
            backgroundImage: 'url("data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iMTBweCIgaGVpZ2h0PSI1cHgiIHZpZXdCb3g9IjAgMCAxMCA1IiB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiPgogICAgPCEtLSBHZW5lcmF0b3I6IFNrZXRjaCA0My4yICgzOTA2OSkgLSBodHRwOi8vd3d3LmJvaGVtaWFuY29kaW5nLmNvbS9za2V0Y2ggLS0+CiAgICA8dGl0bGU+c2VsZWN0LWFsbG93PC90aXRsZT4KICAgIDxkZXNjPkNyZWF0ZWQgd2l0aCBTa2V0Y2guPC9kZXNjPgogICAgPGRlZnM+PC9kZWZzPgogICAgPGcgaWQ9InNlbGVjdCIgc3Ryb2tlPSJub25lIiBzdHJva2Utd2lkdGg9IjEiIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCI+CiAgICAgICAgPGcgaWQ9Imlvcy1zZWxlY3QiIHRyYW5zZm9ybT0idHJhbnNsYXRlKC0xOTguMDAwMDAwLCAtMTE0LjAwMDAwMCkiIGZpbGw9IiM3NTc1NzUiPgogICAgICAgICAgICA8ZyBpZD0ibWVudS1iYXItKy1vcGVuLW1lbnUiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDEyMy4wMDAwMDAsIDEwMC4wMDAwMDApIj4KICAgICAgICAgICAgICAgIDxnIGlkPSJtZW51LWJhciI+CiAgICAgICAgICAgICAgICAgICAgPHBvbHlnb24gaWQ9InNlbGVjdC1hbGxvdyIgcG9pbnRzPSI3NSAxNCA4MCAxOSA4NSAxNCI+PC9wb2x5Z29uPgogICAgICAgICAgICAgICAgPC9nPgogICAgICAgICAgICA8L2c+CiAgICAgICAgPC9nPgogICAgPC9nPgo8L3N2Zz4="),\r\n    linear-gradient(to top, color-mod(black a(12%)) 50%, color-mod(black a(12%)) 50%)',
            backgroundSize: "auto, 100% 1px",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "right center, left bottom",
            border: "none",
            fallbacks: [
                {
                    fontWeight: "400",
                },
            ],
            webkitTransform: "translate3d(0, 0, 0)",
            transform: "translate3d(0, 0, 0)",
        },
        ".select-input--material__label": {
            fontFamily: '"Roboto", "Noto", sans-serif',
            webkitFontSmoothing: "antialiased",
            fontWeight: "400",
            color: "rgba(0, 0, 0, 0.81)",
            fallbacks: [
                {
                    color: "#000000",
                },
            ],
            position: "absolute",
            left: "0",
            top: "2px",
            fontSize: "16px",
            pointerEvents: "none",
        },
        ".select-input--material__label--active": {
            color: "rgba(0, 0, 0, 0.15)",
            fallbacks: [
                {
                    transition: "transform 0.1s ease-in, color 0.1s ease-in",
                },
                {
                    transition: "color 0.1s ease-in, -webkit-transform 0.1s ease-in",
                },
                {
                    color: "#000000",
                },
            ],
            webkitTransform: "translate(0, -75%) scale(0.75)",
            transform: "translate(0, -75%) scale(0.75)",
            webkitTransformOrigin: "left top",
            transformOrigin: "left top",
            transition: "transform 0.1s ease-in, color 0.1s ease-in, -webkit-transform 0.1s ease-in",
        },
        ".select-input--material::-webkit-input-placeholder": {
            color: "rgba(0, 0, 0, 0.81)",
            fallbacks: [
                {
                    color: "#000000",
                },
            ],
            lineHeight: "20px",
        },
        ".select-input--material:-ms-input-placeholder": {
            color: "rgba(0, 0, 0, 0.81)",
            fallbacks: [
                {
                    color: "#000000",
                },
            ],
            lineHeight: "20px",
        },
        ".select-input--material::-ms-input-placeholder": {
            color: "rgba(0, 0, 0, 0.81)",
            fallbacks: [
                {
                    color: "#000000",
                },
            ],
            lineHeight: "20px",
        },
        ".select-input--material::placeholder": {
            color: "rgba(0, 0, 0, 0.81)",
            fallbacks: [
                {
                    color: "#000000",
                },
            ],
            lineHeight: "20px",
        },
        "@keyframes material-select-input-animate": {
            "0%": {
                backgroundSize: "0% 2px, 100% 2px",
            },
            "100%": {
                backgroundSize: "100% 2px, 100% 2px",
            },
        },
        ".select-input--underbar": {
            border: "none",
            borderBottom: "1px solid #ccc",
        },
        ".select-input--underbar:disabled": {
            opacity: "0.3",
            pointerEvents: "none",
            border: "none",
            backgroundColor: "transparent",
            fallbacks: [
                {
                    backgroundColor: "transparent",
                },
                {
                    border: "none",
                },
            ],
            borderBottom: "1px solid #ccc",
        },
        ".select-input--underbar:disabled::-webkit-input-placeholder": {
            border: "none",
            backgroundColor: "transparent",
            color: "#999",
            fallbacks: [
                {
                    backgroundColor: "transparent",
                },
                {
                    border: "none",
                },
            ],
        },
        ".select-input--underbar:disabled:-ms-input-placeholder": {
            border: "none",
            backgroundColor: "transparent",
            color: "#999",
            fallbacks: [
                {
                    backgroundColor: "transparent",
                },
                {
                    border: "none",
                },
            ],
        },
        ".select-input--underbar:disabled::-ms-input-placeholder": {
            border: "none",
            backgroundColor: "transparent",
            color: "#999",
            fallbacks: [
                {
                    backgroundColor: "transparent",
                },
                {
                    border: "none",
                },
            ],
        },
        ".select-input--underbar:disabled::placeholder": {
            border: "none",
            backgroundColor: "transparent",
            color: "#999",
            fallbacks: [
                {
                    backgroundColor: "transparent",
                },
                {
                    border: "none",
                },
            ],
        },
        ".select-input--underbar:invalid": {
            border: "none",
            backgroundColor: "transparent",
            color: "#1f1f21",
            fallbacks: [
                {
                    backgroundColor: "transparent",
                },
                {
                    border: "none",
                },
            ],
            borderBottom: "1px solid #ccc",
        },
        ".action-sheet": {
            fontFamily: '-apple-system, "Helvetica Neue", "Helvetica", "Arial", "Lucida Grande", sans-serif',
            webkitFontSmoothing: "antialiased",
            mozOsxFontSmoothing: "grayscale",
            fontWeight: "400",
            position: "absolute",
            left: "10px",
            right: "10px",
            bottom: "10px",
            zIndex: "2",
        },
        ".action-sheet-button": {
            boxSizing: "border-box",
            height: "56px",
            fontSize: "20px",
            textAlign: "center",
            color: "#4a148c",
            backgroundColor: "rgba(255, 255, 255, 0.9)",
            fallbacks: [
                {
                    backgroundColor: "#ffffff",
                },
            ],
            borderRadius: "0",
            lineHeight: "56px",
            border: "none",
            webkitAppearance: "none",
            mozAppearance: "none",
            appearance: "none",
            display: "block",
            width: "100%",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
            overflow: "hidden",
            backgroundSize: "100% 1px",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "bottom",
            backgroundImage: "linear-gradient(0deg, rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.1) 100%)",
        },
        ".action-sheet-button:first-child": {
            borderTopLeftRadius: "12px",
            borderTopRightRadius: "12px",
        },
        ".action-sheet-button:active": {
            backgroundColor: "#e9e9e9",
            backgroundImage: "none",
        },
        ".action-sheet-button:focus": {
            outline: "none",
        },
        ".action-sheet-button:nth-last-of-type(2)": {
            borderBottomRightRadius: "12px",
            borderBottomLeftRadius: "12px",
            backgroundImage: "none",
        },
        ".action-sheet-button:last-of-type": {
            borderRadius: "12px",
            margin: "8px 0 0 0",
            backgroundColor: "#fff",
            backgroundImage: "none",
            fontWeight: "600",
        },
        ".action-sheet-button:last-of-type:active": {
            backgroundColor: "#e9e9e9",
        },
        ".action-sheet-button--destructive": {
            color: "#fe3824",
        },
        ".action-sheet-title": {
            boxSizing: "border-box",
            height: "56px",
            fontSize: "13px",
            color: "#8f8e94",
            textAlign: "center",
            backgroundColor: "rgba(255, 255, 255, 0.9)",
            fallbacks: [
                {
                    backgroundColor: "#ffffff",
                },
            ],
            lineHeight: "56px",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
            overflow: "hidden",
            backgroundSize: "100% 1px",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "bottom",
            backgroundImage: "linear-gradient(0deg, rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.1) 100%)",
        },
        ".action-sheet-title:first-child": {
            borderTopLeftRadius: "12px",
            borderTopRightRadius: "12px",
        },
        ".action-sheet-icon": {
            display: "none",
        },
        ".action-sheet-mask": {
            position: "absolute",
            left: "0",
            top: "0",
            right: "0",
            bottom: "0",
            backgroundColor: "rgba(0, 0, 0, 0.1)",
            fallbacks: [
                {
                    backgroundColor: "#000000",
                },
            ],
            zIndex: "1",
        },
        ".action-sheet--material": {
            left: "0",
            right: "0",
            bottom: "0",
            boxShadow: "0 16px 24px 2px rgba(0, 0, 0, 0.14), 0 6px 30px 5px rgba(0, 0, 0, 0.12),\r\n    0 8px 10px -5px rgba(0, 0, 0, 0.4)",
        },
        ".action-sheet-title--material": {
            fontFamily: '"Roboto", "Noto", sans-serif',
            webkitFontSmoothing: "antialiased",
            fontWeight: "400",
            borderRadius: "0",
            backgroundImage: "none",
            textAlign: "left",
            height: "56px",
            lineHeight: "56px",
            fontSize: "16px",
            padding: "0 0 0 16px",
            color: "#686868",
            backgroundColor: "white",
            fallbacks: [
                {
                    fontWeight: "400",
                },
            ],
        },
        ".action-sheet-title--material:first-child": {
            borderRadius: "0",
        },
        ".action-sheet-button--material": {
            fontFamily: '"Roboto", "Noto", sans-serif',
            webkitFontSmoothing: "antialiased",
            fontWeight: "400",
            borderRadius: "0",
            backgroundImage: "none",
            height: "52px",
            lineHeight: "52px",
            textAlign: "left",
            fontSize: "16px",
            padding: "0 0 0 16px",
            color: "#686868",
            fallbacks: [
                {
                    fontWeight: "400",
                },
            ],
            backgroundColor: "white",
        },
        ".action-sheet-button--material:first-child": {
            borderRadius: "0",
        },
        ".action-sheet-button--material:nth-last-of-type(2)": {
            borderRadius: "0",
        },
        ".action-sheet-button--material:last-of-type": {
            margin: "0",
            borderRadius: "8px",
            backgroundColor: "white",
        },
        ".action-sheet-icon--material": {
            display: "inline-block",
            float: "left",
            height: "52px",
            lineHeight: "52px",
            marginRight: "32px",
            fontSize: "26px",
            width: "0.8em",
            textAlign: "center",
        },
        ".action-sheet-mask--material": {
            backgroundColor: "rgba(0, 0, 0, 0.2)",
            fallbacks: [
                {
                    backgroundColor: "#000000",
                },
            ],
        },
        ".card": {
            fontFamily: '-apple-system, "Helvetica Neue", "Helvetica", "Arial", "Lucida Grande", sans-serif',
            webkitFontSmoothing: "antialiased",
            mozOsxFontSmoothing: "grayscale",
            fontWeight: "400",
            boxShadow: "0 1px 2px rgba(0, 0, 0, 0.12)",
            borderRadius: "8px",
            backgroundColor: "white",
            boxSizing: "border-box",
            display: "block",
            margin: "8px",
            padding: "16px",
            textAlign: "left",
            wordWrap: "break-word",
        },
        ".card__content": {
            margin: "0",
            fontSize: "14px",
            lineHeight: "1.4",
            color: "#030303",
        },
        ".card__title": {
            fontFamily: '-apple-system, "Helvetica Neue", "Helvetica", "Arial", "Lucida Grande", sans-serif',
            webkitFontSmoothing: "antialiased",
            mozOsxFontSmoothing: "grayscale",
            fontWeight: "400",
            fallbacks: [
                {
                    fontWeight: "400",
                },
            ],
            fontSize: "20px",
            margin: "4px 0 8px 0",
            padding: "0",
            display: "block",
            boxSizing: "border-box",
        },
        ".card--material": {
            backgroundColor: "white",
            borderRadius: "8px",
            boxShadow: "0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12),\r\n    0 3px 1px -2px rgba(0, 0, 0, 0.2)",
            fontFamily: '"Roboto", "Noto", sans-serif',
            webkitFontSmoothing: "antialiased",
            fontWeight: "400",
        },
        ".card--material__content": {
            fontSize: "14px",
            lineHeight: "1.4",
            color: "rgba(0, 0, 0, 0.54)",
            fallbacks: [
                {
                    color: "#000000",
                },
            ],
        },
        ".card--material__title": {
            fontFamily: '"Roboto", "Noto", sans-serif',
            webkitFontSmoothing: "antialiased",
            fontWeight: "400",
            fontSize: "24px",
            margin: "8px 0 12px 0",
        },
        ".toast": {
            fontFamily: '-apple-system, "Helvetica Neue", "Helvetica", "Arial", "Lucida Grande", sans-serif',
            webkitFontSmoothing: "antialiased",
            mozOsxFontSmoothing: "grayscale",
            fontWeight: "400",
            position: "absolute",
            zIndex: "2",
            left: "8px",
            right: "8px",
            bottom: "0",
            margin: "8px 0",
            borderRadius: "8px",
            backgroundColor: "rgba(0, 0, 0, 0.8)",
            fallbacks: [
                {
                    display: "-webkit-flex",
                },
                {
                    display: "-webkit-box",
                },
                {
                    backgroundColor: "#000000",
                },
            ],
            display: "flex",
            minHeight: "48px",
            lineHeight: "1.5",
            boxSizing: "border-box",
            padding: "16px 16px",
        },
        ".toast__message": {
            fontSize: "14px",
            color: "white",
            webkitBoxFlex: "1",
            webkitFlexGrow: "1",
            flexGrow: "1",
            textAlign: "left",
            margin: "0 16px 0 0",
            whiteSpace: "normal",
        },
        ".toast__button": {
            fontSize: "14px",
            color: "white",
            webkitBoxFlex: "0",
            webkitFlexGrow: "0",
            flexGrow: "0",
            webkitAppearance: "none",
            mozAppearance: "none",
            appearance: "none",
            border: "none",
            backgroundColor: "transparent",
            textTransform: "uppercase",
        },
        ".toast__button:focus": {
            outline: "none",
        },
        ".toast__button:active": {
            opacity: "0.4",
        },
        ".toast--material": {
            left: "0",
            right: "0",
            bottom: "0",
            margin: "0",
            backgroundColor: "rgba(0, 0, 0, 0.8)",
            fallbacks: [
                {
                    backgroundColor: "#000000",
                },
            ],
            borderRadius: "0",
            padding: "16px 24px",
        },
        ".toast--material__message": {
            fontFamily: '"Roboto", "Noto", sans-serif',
            webkitFontSmoothing: "antialiased",
            fontWeight: "400",
            margin: "0 24px 0 0",
        },
        ".toast--material__button": {
            fontFamily: '"Roboto", "Noto", sans-serif',
            webkitFontSmoothing: "antialiased",
            fontWeight: "400",
            color: "#4a148c",
        },
        ".toolbar + .page__background": {
            top: "44px",
        },
        ".toolbar + .page__background + .page__content": {
            top: "44px",
            paddingTop: "0",
        },
        ".page-with-bottom-toolbar > .page__content": {
            bottom: "44px",
        },
        ".toolbar.toolbar--material + .page__background": {
            top: "56px",
        },
        ".toolbar.toolbar--material + .page__background + .page__content": {
            top: "56px",
            paddingTop: "0",
        },
        ".toolbar.toolbar--transparent + .page__background": {
            top: "0",
        },
        ".toolbar.toolbar--transparent.toolbar--cover-content + .page__background + .page__content, .toolbar.toolbar--transparent.toolbar--cover-content\r\n  + .page__background\r\n  + .page__content\r\n  .page_content": {
            top: "0",
            paddingTop: "44px",
        },
        ".toolbar.toolbar--material.toolbar--transparent.toolbar--cover-content\r\n  + .page__background\r\n  + .page__content, .toolbar.toolbar--material.toolbar--transparent.toolbar--cover-content\r\n  + .page__background\r\n  + .page__content\r\n  .page_content": {
            top: "0",
            paddingTop: "56px",
        },
        ".tabbar:not(.tabbar--top)": {
            paddingBottom: "0",
        },
        "@media (orientation: landscape)": {
            "html[onsflag-iphonex-landscape] .page__content": {
                paddingLeft: "44px",
                paddingRight: "44px",
                bottom: "0",
                paddingBottom: "21px",
            },
            "html[onsflag-iphonex-landscape] .dialog .page__content, html[onsflag-iphonex-landscape] .modal .page__content": {
                paddingLeft: "0",
                paddingRight: "0",
            },
            "html[onsflag-iphonex-landscape] .toolbar__left": {
                paddingLeft: "44px",
            },
            "html[onsflag-iphonex-landscape] .toolbar__right": {
                paddingRight: "44px",
            },
            "html[onsflag-iphonex-landscape] .bottom-bar": {
                paddingRight: "44px",
                paddingLeft: "44px",
                bottom: "0",
                boxSizing: "content-box",
                paddingBottom: "21px",
            },
            "html[onsflag-iphonex-landscape] .tabbar": {
                paddingLeft: "44px",
                paddingRight: "44px",
                width: "calc(100% - 88px)",
            },
            "html[onsflag-iphonex-landscape] .fab--bottom__left, html[onsflag-iphonex-landscape] .fab--bottom__center, html[onsflag-iphonex-landscape] .fab--bottom__right": {
                bottom: "21px",
            },
            "html[onsflag-iphonex-landscape] .fab--top__left, html[onsflag-iphonex-landscape] .fab--bottom__left": {
                left: "44px",
            },
            "html[onsflag-iphonex-landscape] .fab--top__right, html[onsflag-iphonex-landscape] .fab--bottom__right": {
                right: "44px",
            },
            "html[onsflag-iphonex-landscape] .action-sheet": {
                left: "calc((100vw - 100vh + 20px) / 2)",
                right: "calc((100vw - 100vh + 20px) / 2)",
                bottom: "33px",
            },
            "html[onsflag-iphonex-landscape] .toast": {
                left: "52px",
                right: "52px",
                bottom: "21px",
            },
            "html[onsflag-iphonex-landscape] .dialog .bottom-bar, html[onsflag-iphonex-landscape] .page-with-bottom-toolbar > .page__content .bottom-bar, html[onsflag-iphonex-landscape] .tabbar__content:not(.tabbar--top__content) .bottom-bar": {
                bottom: "0",
                boxSizing: "border-box",
                paddingBottom: "0",
            },
            "html[onsflag-iphonex-landscape] .dialog .page__content, html[onsflag-iphonex-landscape] .page-with-bottom-toolbar > .page__content .page__content, html[onsflag-iphonex-landscape] .tabbar__content:not(.tabbar--top__content) .page__content, html[onsflag-iphonex-landscape] .page-with-bottom-toolbar > .page__content": {
                bottom: "0",
                paddingBottom: "0",
            },
            "html[onsflag-iphonex-landscape] .page-with-bottom-toolbar > .page__content": {
                bottom: "65px",
                paddingBottom: "0",
            },
            "html[onsflag-iphonex-landscape] .dialog .page-with-bottom-toolbar > .page__content, html[onsflag-iphonex-landscape] .page-with-bottom-toolbar > .page__content .page-with-bottom-toolbar > .page__content, html[onsflag-iphonex-landscape] .tabbar__content:not(.tabbar--top__content) .page-with-bottom-toolbar > .page__content": {
                bottom: "44px",
                paddingBottom: "0",
            },
            "html[onsflag-iphonex-landscape] .tabbar:not(.tabbar--top)": {
                paddingBottom: "21px",
            },
            "html[onsflag-iphonex-landscape] .dialog .tabbar:not(.tabbar--top), html[onsflag-iphonex-landscape] .page-with-bottom-toolbar > .page__content .tabbar:not(.tabbar--top), html[onsflag-iphonex-landscape] .tabbar__content:not(.tabbar--top__content) .tabbar:not(.tabbar--top)": {
                paddingBottom: "0",
            },
            "html[onsflag-iphonex-landscape] .tabbar__content:not(.tabbar--top__content)": {
                bottom: "70px",
            },
            "html[onsflag-iphonex-landscape] .dialog .tabbar__content:not(.tabbar--top__content), html[onsflag-iphonex-landscape] .page-with-bottom-toolbar > .page__content .tabbar__content:not(.tabbar--top__content), html[onsflag-iphonex-landscape] .tabbar__content:not(.tabbar--top__content) .tabbar__content:not(.tabbar--top__content)": {
                bottom: "49px",
            },
            "html[onsflag-iphonex-landscape] .page__content > .list:not(.list--inset)": {
                marginLeft: "-44px",
                marginRight: "-44px",
            },
            "html[onsflag-iphonex-landscape] .page__content > .list:not(.list--inset) > .list-header": {
                paddingLeft: "59px",
            },
            "html[onsflag-iphonex-landscape] .page__content > .list:not(.list--inset) > .list-item": {
                paddingLeft: "58px",
            },
            "html[onsflag-iphonex-landscape]\r\n    .page__content\r\n    > .list:not(.list--inset)\r\n    > .list-item--chevron:before": {
                right: "60px",
            },
            "html[onsflag-iphonex-landscape]\r\n    .page__content\r\n    > .list:not(.list--inset)\r\n    > .list-item\r\n    > .list-item__center:last-child": {
                paddingRight: "50px",
            },
            "html[onsflag-iphonex-landscape]\r\n    .page__content\r\n    > .list:not(.list--inset)\r\n    > .list-item\r\n    > .list-item__right": {
                paddingRight: "56px",
            },
            "html[onsflag-iphonex-landscape]\r\n    .page__content\r\n    > .list:not(.list--inset)\r\n    > .list-item\r\n    > .list-item--chevron__right": {
                paddingRight: "74px",
            },
            "html[onsflag-iphonex-landscape] .dialog .page__content > .list:not(.list--inset)": {
                marginLeft: "0",
                marginRight: "0",
            },
            "html[onsflag-iphonex-landscape] .dialog .page__content > .list:not(.list--inset) > .list-header": {
                paddingLeft: "15px",
            },
            "html[onsflag-iphonex-landscape] .dialog .page__content > .list:not(.list--inset) > .list-item": {
                paddingLeft: "14px",
            },
            "html[onsflag-iphonex-landscape]\r\n    .dialog\r\n    .page__content\r\n    > .list:not(.list--inset)\r\n    > .list-item--chevron:before": {
                right: "16px",
            },
            "html[onsflag-iphonex-landscape]\r\n    .dialog\r\n    .page__content\r\n    > .list:not(.list--inset)\r\n    > .list-item\r\n    > .list-item__center:last-child": {
                paddingRight: "6px",
            },
            "html[onsflag-iphonex-landscape]\r\n    .dialog\r\n    .page__content\r\n    > .list:not(.list--inset)\r\n    > .list-item\r\n    > .list-item__right": {
                paddingRight: "12px",
            },
            "html[onsflag-iphonex-landscape]\r\n    .dialog\r\n    .page__content\r\n    > .list:not(.list--inset)\r\n    > .list-item\r\n    > .list-item--chevron__right": {
                paddingRight: "30px",
            },
        },
        "@media (orientation: portrait)": {
            "html[onsflag-iphonex-portrait] .fab--top__left, html[onsflag-iphonex-portrait] .fab--top__center, html[onsflag-iphonex-portrait] .fab--top__right": {
                top: "64px",
            },
            "html[onsflag-iphonex-portrait] .fab--bottom__left, html[onsflag-iphonex-portrait] .fab--bottom__center, html[onsflag-iphonex-portrait] .fab--bottom__right": {
                bottom: "34px",
            },
            "html[onsflag-iphonex-portrait] .action-sheet": {
                bottom: "48px",
            },
            "html[onsflag-iphonex-portrait] .toast": {
                bottom: "34px",
            },
            "html[onsflag-iphonex-portrait] .toolbar": {
                top: "0",
                boxSizing: "content-box",
                paddingTop: "44px",
            },
            "html[onsflag-iphonex-portrait] .dialog .toolbar, html[onsflag-iphonex-portrait] .toolbar:not(.toolbar--cover-content)+.page__background+.page__content .toolbar, html[onsflag-iphonex-portrait] .tabbar--top__content .toolbar": {
                top: "0",
                boxSizing: "border-box",
                paddingTop: "0",
            },
            "html[onsflag-iphonex-portrait] .bottom-bar": {
                bottom: "0",
                boxSizing: "content-box",
                paddingBottom: "34px",
            },
            "html[onsflag-iphonex-portrait] .dialog .bottom-bar, html[onsflag-iphonex-portrait] .page-with-bottom-toolbar > .page__content .bottom-bar, html[onsflag-iphonex-portrait] .tabbar__content:not(.tabbar--top__content) .bottom-bar": {
                bottom: "0",
                boxSizing: "border-box",
                paddingBottom: "0",
            },
            "html[onsflag-iphonex-portrait] .page__content": {
                top: "0",
                paddingTop: "44px",
                bottom: "0",
                paddingBottom: "34px",
            },
            "html[onsflag-iphonex-portrait] .dialog .page__content, html[onsflag-iphonex-portrait] .toolbar:not(.toolbar--cover-content)+.page__background+.page__content .page__content, html[onsflag-iphonex-portrait] .tabbar--top__content .page__content, html[onsflag-iphonex-portrait] .toolbar:not(.toolbar--cover-content)+.page__background+.page__content": {
                top: "0",
                paddingTop: "0",
            },
            "html[onsflag-iphonex-portrait] .dialog .page__content, html[onsflag-iphonex-portrait] .page-with-bottom-toolbar > .page__content .page__content, html[onsflag-iphonex-portrait] .tabbar__content:not(.tabbar--top__content) .page__content, html[onsflag-iphonex-portrait] .page-with-bottom-toolbar > .page__content": {
                bottom: "0",
                paddingBottom: "0",
            },
            "html[onsflag-iphonex-portrait] .toolbar:not(.toolbar--cover-content) + .page__background, html[onsflag-iphonex-portrait]\r\n    .toolbar:not(.toolbar--cover-content)\r\n    + .page__background\r\n    + .page__content": {
                top: "88px",
                paddingTop: "0",
            },
            "html[onsflag-iphonex-portrait] .dialog .toolbar:not(.toolbar--cover-content)+.page__background, html[onsflag-iphonex-portrait] .dialog .toolbar:not(.toolbar--cover-content)+.page__background+.page__content, html[onsflag-iphonex-portrait] .toolbar:not(.toolbar--cover-content)+.page__background+.page__content .toolbar:not(.toolbar--cover-content)+.page__background, html[onsflag-iphonex-portrait] .toolbar:not(.toolbar--cover-content)+.page__background+.page__content .toolbar:not(.toolbar--cover-content)+.page__background+.page__content, html[onsflag-iphonex-portrait] .tabbar--top__content .toolbar:not(.toolbar--cover-content)+.page__background, html[onsflag-iphonex-portrait] .tabbar--top__content .toolbar:not(.toolbar--cover-content)+.page__background+.page__content": {
                top: "44px",
                paddingTop: "0",
            },
            "html[onsflag-iphonex-portrait] .page-with-bottom-toolbar > .page__content": {
                bottom: "78px",
                paddingBottom: "0",
            },
            "html[onsflag-iphonex-portrait] .dialog .page-with-bottom-toolbar > .page__content, html[onsflag-iphonex-portrait] .page-with-bottom-toolbar > .page__content .page-with-bottom-toolbar > .page__content, html[onsflag-iphonex-portrait] .tabbar__content:not(.tabbar--top__content) .page-with-bottom-toolbar > .page__content": {
                bottom: "44px",
                paddingBottom: "0",
            },
            "html[onsflag-iphonex-portrait]\r\n    .toolbar.toolbar--transparent.toolbar--cover-content\r\n    + .page__background\r\n    + .page__content, html[onsflag-iphonex-portrait]\r\n    .toolbar.toolbar--transparent.toolbar--cover-content\r\n    + .page__background\r\n    + .page__content\r\n    .page_content": {
                top: "0",
                paddingTop: "88px",
            },
            "html[onsflag-iphonex-portrait] .dialog .toolbar.toolbar--transparent.toolbar--cover-content+.page__background+.page__content, html[onsflag-iphonex-portrait] .dialog .toolbar.toolbar--transparent.toolbar--cover-content+.page__background+.page__content .page_content, html[onsflag-iphonex-portrait] .toolbar:not(.toolbar--cover-content)+.page__background+.page__content .toolbar.toolbar--transparent.toolbar--cover-content+.page__background+.page__content, html[onsflag-iphonex-portrait] .toolbar:not(.toolbar--cover-content)+.page__background+.page__content .toolbar.toolbar--transparent.toolbar--cover-content+.page__background+.page__content .page__content, html[onsflag-iphonex-portrait] .tabbar--top__content .toolbar.toolbar--transparent.toolbar--cover-content+.page__background+.page__content, html[onsflag-iphonex-portrait] .tabbar--top__content .toolbar.toolbar--transparent.toolbar--cover-content+.page__background+.page__content .page_content": {
                top: "0",
                paddingTop: "44px",
            },
            "html[onsflag-iphonex-portrait] .tabbar--top": {
                paddingTop: "44px",
            },
            "html[onsflag-iphonex-portrait] .dialog .tabbar--top, html[onsflag-iphonex-portrait] .toolbar:not(.toolbar--cover-content)+.page__background+.page__content .tabbar--top, html[onsflag-iphonex-portrait] .tabbar--top__content .tabbar--top": {
                paddingTop: "0",
            },
            "html[onsflag-iphonex-portrait] .tabbar--top__content": {
                top: "93px",
            },
            "html[onsflag-iphonex-portrait] .dialog .tabbar--top__content, html[onsflag-iphonex-portrait] .toolbar:not(.toolbar--cover-content)+.page__background+.page__content .tabbar--top__content, html[onsflag-iphonex-portrait] .tabbar--top__content .tabbar--top__content": {
                top: "49px",
            },
            "html[onsflag-iphonex-portrait] .tabbar:not(.tabbar--top):not(.tabbar--top)": {
                paddingBottom: "34px",
            },
            "html[onsflag-iphonex-portrait] .dialog .tabbar:not(.tabbar--top):not(.tabbar--top), html[onsflag-iphonex-portrait] .page-with-bottom-toolbar > .page__content .tabbar:not(.tabbar--top), html[onsflag-iphonex-portrait] .tabbar__content:not(.tabbar--top__content) .tabbar:not(.tabbar--top)": {
                paddingBottom: "0",
            },
            "html[onsflag-iphonex-portrait] .tabbar__content:not(.tabbar--top__content)": {
                bottom: "83px",
            },
            "html[onsflag-iphonex-portrait] .dialog .tabbar__content:not(.tabbar--top__content), html[onsflag-iphonex-portrait] .page-with-bottom-toolbar > .page__content .tabbar__content:not(.tabbar--top__content), html[onsflag-iphonex-portrait] .tabbar__content:not(.tabbar--top__content) .tabbar__content:not(.tabbar--top__content)": {
                bottom: "49px",
            },
        },
    },
};
/* harmony default export */ const styles_theme = (theme);

// EXTERNAL MODULE: ./node_modules/react-toastify/dist/ReactToastify.css
var ReactToastify = __webpack_require__(7302);
;// CONCATENATED MODULE: ./src/index.tsx









// Webpack CSS import








var Bootloader = /** @class */ (function () {
    function Bootloader() {
        this.mountNode = document.querySelector("app");
        this.prefMan = new native_PreferencesManager();
        this.log = new native_LoggerManager(this.constructor.name);
    }
    Bootloader.prototype.loadStyle = function () {
        this.log.info("Setup theme");
        jss_esm/* default.setup */.ZP.setup((0,jss_preset_default_esm/* default */.Z)());
        jss_esm/* default.createStyleSheet */.ZP.createStyleSheet(styles_theme).attach();
    };
    Bootloader.prototype.loadActivity = function () {
        this.log.info("Loading MainActivty");
        react_dom.render((0,jsx_runtime.jsxs)(jsx_runtime.Fragment, { children: [(0,jsx_runtime.jsx)(activitys_MainActivity, {}), (0,jsx_runtime.jsx)(react_toastify_esm/* ToastContainer */.Ix, {})] }), this.mountNode);
    };
    Bootloader.prototype.init = function () {
        this.log.info("Intitialze repo");
        if (this.prefMan.getPref("repo") == native_Constants.undefined) {
            this.log.error("No repo was found, set https://repo.dergoogler.com/modules.json as default repo");
            this.prefMan.setPref("repo", "https://repo.dergoogler.com/modules.json");
        }
        this.log.info("Selecting platform: Android");
        esm["default"].platform.select("android");
        this.loadStyle();
        this.loadActivity();
    };
    return Bootloader;
}());
new Bootloader().init();


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			loaded: false,
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/chunk loaded */
/******/ 	(() => {
/******/ 		var deferred = [];
/******/ 		__webpack_require__.O = (result, chunkIds, fn, priority) => {
/******/ 			if(chunkIds) {
/******/ 				priority = priority || 0;
/******/ 				for(var i = deferred.length; i > 0 && deferred[i - 1][2] > priority; i--) deferred[i] = deferred[i - 1];
/******/ 				deferred[i] = [chunkIds, fn, priority];
/******/ 				return;
/******/ 			}
/******/ 			var notFulfilled = Infinity;
/******/ 			for (var i = 0; i < deferred.length; i++) {
/******/ 				var [chunkIds, fn, priority] = deferred[i];
/******/ 				var fulfilled = true;
/******/ 				for (var j = 0; j < chunkIds.length; j++) {
/******/ 					if ((priority & 1 === 0 || notFulfilled >= priority) && Object.keys(__webpack_require__.O).every((key) => (__webpack_require__.O[key](chunkIds[j])))) {
/******/ 						chunkIds.splice(j--, 1);
/******/ 					} else {
/******/ 						fulfilled = false;
/******/ 						if(priority < notFulfilled) notFulfilled = priority;
/******/ 					}
/******/ 				}
/******/ 				if(fulfilled) {
/******/ 					deferred.splice(i--, 1)
/******/ 					var r = fn();
/******/ 					if (r !== undefined) result = r;
/******/ 				}
/******/ 			}
/******/ 			return result;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/create fake namespace object */
/******/ 	(() => {
/******/ 		var getProto = Object.getPrototypeOf ? (obj) => (Object.getPrototypeOf(obj)) : (obj) => (obj.__proto__);
/******/ 		var leafPrototypes;
/******/ 		// create a fake namespace object
/******/ 		// mode & 1: value is a module id, require it
/******/ 		// mode & 2: merge all properties of value into the ns
/******/ 		// mode & 4: return value when already ns object
/******/ 		// mode & 16: return value when it's Promise-like
/******/ 		// mode & 8|1: behave like require
/******/ 		__webpack_require__.t = function(value, mode) {
/******/ 			if(mode & 1) value = this(value);
/******/ 			if(mode & 8) return value;
/******/ 			if(typeof value === 'object' && value) {
/******/ 				if((mode & 4) && value.__esModule) return value;
/******/ 				if((mode & 16) && typeof value.then === 'function') return value;
/******/ 			}
/******/ 			var ns = Object.create(null);
/******/ 			__webpack_require__.r(ns);
/******/ 			var def = {};
/******/ 			leafPrototypes = leafPrototypes || [null, getProto({}), getProto([]), getProto(getProto)];
/******/ 			for(var current = mode & 2 && value; typeof current == 'object' && !~leafPrototypes.indexOf(current); current = getProto(current)) {
/******/ 				Object.getOwnPropertyNames(current).forEach((key) => (def[key] = () => (value[key])));
/******/ 			}
/******/ 			def['default'] = () => (value);
/******/ 			__webpack_require__.d(ns, def);
/******/ 			return ns;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/harmony module decorator */
/******/ 	(() => {
/******/ 		__webpack_require__.hmd = (module) => {
/******/ 			module = Object.create(module);
/******/ 			if (!module.children) module.children = [];
/******/ 			Object.defineProperty(module, 'exports', {
/******/ 				enumerable: true,
/******/ 				set: () => {
/******/ 					throw new Error('ES Modules may not assign module.exports or exports.*, Use ESM export syntax, instead: ' + module.id);
/******/ 				}
/******/ 			});
/******/ 			return module;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	(() => {
/******/ 		// no baseURI
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			143: 0
/******/ 		};
/******/ 		
/******/ 		// no chunk on demand loading
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		__webpack_require__.O.j = (chunkId) => (installedChunks[chunkId] === 0);
/******/ 		
/******/ 		// install a JSONP callback for chunk loading
/******/ 		var webpackJsonpCallback = (parentChunkLoadingFunction, data) => {
/******/ 			var [chunkIds, moreModules, runtime] = data;
/******/ 			// add "moreModules" to the modules object,
/******/ 			// then flag all "chunkIds" as loaded and fire callback
/******/ 			var moduleId, chunkId, i = 0;
/******/ 			if(chunkIds.some((id) => (installedChunks[id] !== 0))) {
/******/ 				for(moduleId in moreModules) {
/******/ 					if(__webpack_require__.o(moreModules, moduleId)) {
/******/ 						__webpack_require__.m[moduleId] = moreModules[moduleId];
/******/ 					}
/******/ 				}
/******/ 				if(runtime) var result = runtime(__webpack_require__);
/******/ 			}
/******/ 			if(parentChunkLoadingFunction) parentChunkLoadingFunction(data);
/******/ 			for(;i < chunkIds.length; i++) {
/******/ 				chunkId = chunkIds[i];
/******/ 				if(__webpack_require__.o(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 					installedChunks[chunkId][0]();
/******/ 				}
/******/ 				installedChunks[chunkIds[i]] = 0;
/******/ 			}
/******/ 			return __webpack_require__.O(result);
/******/ 		}
/******/ 		
/******/ 		var chunkLoadingGlobal = self["webpackChunkgooglers_magisk_repo_website"] = self["webpackChunkgooglers_magisk_repo_website"] || [];
/******/ 		chunkLoadingGlobal.forEach(webpackJsonpCallback.bind(null, 0));
/******/ 		chunkLoadingGlobal.push = webpackJsonpCallback.bind(null, chunkLoadingGlobal.push.bind(chunkLoadingGlobal));
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module depends on other loaded chunks and execution need to be delayed
/******/ 	var __webpack_exports__ = __webpack_require__.O(undefined, [736], () => (__webpack_require__(9494)))
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	
/******/ })()
;