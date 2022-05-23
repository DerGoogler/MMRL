class tools {
  static getSubPath(url: string) {
    return window.location.href.replace(/(\?(.*?)=(.*)|\?)/gm, "") + url;
  }

  static getUrlParam(param: string) {
    param = param.replace(/([\[\](){}*?+^$.\\|])/g, "\\$1");
    var regex = new RegExp("[?&]" + param + "=([^&#]*)");
    var url = decodeURIComponent(window.location.href);
    var match = regex.exec(url);
    return match ? match[1] : "";
  }

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
  public static ref(id: string | React.RefObject<any>, callback: (...props: any) => void) {
    if (typeof id == "string") {
      var element /*: HTMLElement | null*/;
      if ((element = document.getElementById(id))) {
        if (typeof callback == "function") {
          callback(element);
        }
      }
    } else {
      var reff /*: React.RefObject<any>*/;
      if ((reff = id)) {
        if (reff && reff.current) {
          if (typeof callback == "function") {
            const ref /*: typeof reff*/ = reff.current;
            callback(ref);
          }
        }
      }
    }
  }

  static validURL(input: string) {
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

  static stringToBoolean(value: string) {
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

  static typeIF(_: any, __: any, ___: any) {
    if (this.stringToBoolean(_)) {
      return __;
    } else {
      return ___;
    }
  }

  static typeCheck(_: any, __: any) {
    if (_ === undefined || _ === null || _ === "" || __ === 0 || _ === "0" || _ === false || _ === "false") {
      return __;
    } else {
      return _;
    }
  }
}

export default tools;
