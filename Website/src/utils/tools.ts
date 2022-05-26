import SharedPreferences from "@Native/SharedPreferences";

class tools {
  /**
   * Retuns the current page link
   * @param url string
   * @returns {string} string
   */
  public static getSubPath(url: string) {
    return window.location.href.replace(/(\?(.*?)=(.*)|\?)/gm, "") + url;
  }

  public static getUrlParam(param: string) {
    param = param.replace(/([\[\](){}*?+^$.\\|])/g, "\\$1");
    var regex = new RegExp("[?&]" + param + "=([^&#]*)");
    var url = decodeURIComponent(window.location.href);
    var match = regex.exec(url);
    return match ? match[1] : "";
  }

  /**
   * @param id Given element or ref
   * @param callback HTMLElement or React.RefObject
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
  public static ref<Object = any>(id: string | React.RefObject<Object>, callback: (...props: any) => void) {
    if (typeof id == "string") {
      var element: HTMLElement | null;
      if ((element = document.getElementById(id))) {
        if (typeof callback == "function") {
          callback(element);
        }
      }
    } else {
      var reff: React.RefObject<Object>;
      if ((reff = id)) {
        if (reff && reff.current) {
          if (typeof callback == "function") {
            callback(reff.current);
          }
        }
      }
    }
  }

  /**
   * Checks if an string link is valid
   * @param input string
   * @returns {boolean} boolean
   */
  public static validURL(input: string): boolean {
    var pattern = new RegExp(
      "^(https?:\\/\\/)?" + // protocol
        "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // domain name
        "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR ip (v4) address
        "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
        "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
        "(\\#[-a-z\\d_]*)?$",
      "i"
    ); // fragment locator
    return !!pattern.test(input);
  }

  public static stringToBoolean(value: string) {
    if (typeof value == "boolean") return value;
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
  }

  /**
   * @deprecated
   */
  public static typeIF(_: any, __: any, ___: any) {
    if (this.stringToBoolean(_)) {
      return __;
    } else {
      return ___;
    }
  }

  public static typeCheck(_: any, __: any) {
    if (_ === undefined || _ === null || _ === "" || __ === 0 || _ === "0" || _ === false || _ === "false") {
      return __;
    } else {
      return _;
    }
  }

  public static getSettingsSwitch(key: string): boolean {
    if (new SharedPreferences().getPref(key) === "true") {
      return true;
    } else {
      return false;
    }
  }

  public static returnUndefined(value: undefined | any, theReturn: string | boolean | int): any {
    if (value === undefined) {
      return theReturn;
    } else {
      return false;
    }
  }
}

export default tools;
