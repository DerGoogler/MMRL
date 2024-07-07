import ons from "onsenui";
import React, { useCallback } from "react";
import { useEventListener } from "usehooks-ts";
import { Native } from "./Native";
import { Build } from "./Build";

export type OpenOptions = {
  target?: string | undefined;
  features?:
    | {
        window?: string | undefined;
        /**
         * Only for Android
         */
        color?: string | undefined;
      }
    | undefined;
};

class OsClass extends Native {
  public constructor() {
    super(window.__os__);
  }

  readonly WindowMMRLOwn = "_mmrlOwn";
  readonly WindowBlank = "_blank";
  readonly WindowSelf = "_self";
  readonly WindowParent = "_parent";
  readonly WindowTop = "_top";
  readonly WindowUnfancedTop = "_unfencedTop";

  /**
   * @deprecated Use `os.openURL()` instead
   */
  public open(url?: string | URL | undefined, options?: OpenOptions): Window | null {
    if (this.isAndroid) {
      return this.interface.open(url, options?.features?.color || "#101010");
    } else {
      return window.open(url, options?.target, options?.features?.window);
    }
  }

  private _windowObjectReference: Window | null = null;
  private _previousURL: string | URL | null | undefined = null;

  /**
   * Handle opening link on Android and browsers. Android supports additional `color=#101010` feature
   * @param url
   * @param target
   * @param features
   * @returns
   */
  public openURL(url?: string | URL, target?: string, features?: string): void {
    const openRequestedSingleTab = (url?: string | URL, features?: string) => {
      if (this._windowObjectReference === null || this._windowObjectReference.closed) {
        this._windowObjectReference = open(url, this.WindowMMRLOwn, features);
      } else if (this._previousURL !== url) {
        this._windowObjectReference = open(url, this.WindowMMRLOwn, features);
        /* if the resource to load is different,
           then we load it in the already opened secondary window and then
           we bring such window back on top/in front of its parent window. */
        this._windowObjectReference && this._windowObjectReference.focus();
      } else {
        this._windowObjectReference.focus();
      }
      this._previousURL = url;
      /* explanation: we store the current url in order to compare url
         in the event of another call of this function. */
    };

    function parseWindowFeatures(features?: string) {
      if (!features) return {};
      const featurePairs = features.split(",");
      const featureObject = {};

      featurePairs.forEach((pair) => { 
        const [key, value] = pair.split("=");
        featureObject[key.trim()] = parseInt(value.trim()); // Parse value as integer
      });

      return featureObject;
    }

    if (this.isAndroid) {
      const parseFetures: Record<string, number | string> = parseWindowFeatures(features);
      this.interface.open(url, parseFetures.color || "#101010");
    } else {
      if (target === this.WindowMMRLOwn) {
        openRequestedSingleTab(url, features);
      } else {
        window.open(url, target, features);
      }
    }
  }

  public hasStoragePermission(): boolean {
    if (this.isAndroid) {
      return this.interface.hasStoragePermission();
    } else {
      return true;
    }
  }

  public requestStoargePermission(): void {
    if (this.isAndroid) {
      this.interface.requestStoargePermission();
    } else {
      name;
    }
  }

  /**
   * Closes the window. On Android closes the App
   */
  public close(): void {
    this.isAndroid ? this.interface.close() : window.close();
  }

  public shareText(title: string, body: string): void {
    if (this.isAndroid) {
      this.interface.shareText(title, body);
    }
  }

  /**
   * Makes an toast, even on Android
   * @param text
   * @param duration
   */
  public toast(text: string, duration: "long" | "short"): void {
    const _duration = duration === "short" ? (this.isAndroid ? 0 : 2000) : this.isAndroid ? 1 : 5000;
    if (this.isAndroid) {
      this.interface.makeToast(text, _duration);
    } else {
      ons.notification.toast(text, { timeout: _duration, animation: "ascend" });
    }
  }

  /**
   * The SDK version of the software currently running on this hardware device.
   * @returns {number}
   */
  public get sdk(): number {
    if (this.isAndroid) {
      return this.interface.sdk();
    } else {
      return 40;
    }
  }

  public getMonetColor(id: string): string {
    if (this.isAndroid && this.sdk >= Build.VERSION_CODES.S) {
      return this.interface.getMonetColor(id);
    } else {
      return "#ffffff";
    }
  }

  /**
   * Get the current status bar height from the current device. Has an automatic fallback for browsers
   * @returns
   */
  public getStatusBarHeight(): number {
    if (this.isAndroid) {
      return this.interface.getStatusBarHeight() / 2;
    } else {
      return 0;
    }
  }

  // public getSafeAreaInsets(typr: "top" | "bottom"): number {
  //   if (this.isAndroid) {
  //     return this.interface.getSafeAreaInsets() / 2;
  //   } else {
  //     return 0;
  //   }
  // }

  /**
   * Changes the status bar color
   * @deprecated
   * @param color Your color
   * @param white `true` makes the status bar white
   */
  public setStatusBarColor(color: string, white: boolean = false): void {
    this.isAndroid ? this.interface.setStatusBarColor(color, white) : null;
  }

  /**
   * @deprecated
   * @param color
   */
  public setNavigationBarColor(color: string): void {
    this.isAndroid ? this.interface.setNavigationBarColor(color) : null;
  }

  public addNativeEventListener<K extends keyof WindowEventMap>(
    type: K,
    callback: () => void,
    options?: boolean | AddEventListenerOptions
  ): void {
    (window as any)[type] = new Event(type.toLowerCase());
    window.addEventListener(type.toLowerCase(), callback, options);
  }

  public removeNativeEventListener<K extends keyof WindowEventMap>(
    type: K,
    callback: () => void,
    options?: boolean | AddEventListenerOptions
  ): void {
    (window as any)[type] = new Event(type.toLowerCase());
    window.removeEventListener(type.toLowerCase(), callback, options);
  }

  public getSchemeParam(param: string): string {
    if (this.isAndroid) {
      return this.interface.getSchemeParam(param);
    } else {
      return new URLSearchParams(window.location.search).get(param) || "";
    }
  }
}

const os: OsClass = new OsClass();

export { os, OsClass };
