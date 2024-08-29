import { Native } from "./Native";

interface NativeView {
  getWindowTopInsets(): number;
  getWindowRightInsets(): number;
  getWindowBottomInsets(): number;
  getWindowLeftInsets(): number;
  setStatusBarColor(color: string, white: boolean): void;
  setNavigationBarColor(color: string): void;
  isAppearanceLightNavigationBars(): boolean;
  setAppearanceLightNavigationBars(isLight: boolean): void;
  isAppearanceLightStatusBars(): boolean;
  setAppearanceLightStatusBars(isLight: boolean): void;
  showSystemBars(type: number): void;
  hideSystemBars(type: number): void;
  addFlag(flag: int): void;
  clearFlag(flag: int): void;
}

class ViewInsetsCompat {
  public static systemBars(): number {
    return this.Type.STATUS_BARS | this.Type.NAVIGATION_BARS | this.Type.CAPTION_BAR;
  }

  public static Type = class {
    public static readonly FIRST = 1;
    public static readonly STATUS_BARS = this.FIRST;
    public static readonly NAVIGATION_BARS = 1 << 1;
    public static readonly CAPTION_BAR = 1 << 2;
  };
}

class WindowManager {
  public static LayoutParams = class {
    public static readonly FLAG_KEEP_SCREEN_ON = 128;
  };
}

class View extends Native<NativeView> {
  public constructor() {
    super(window.__view__);
  }

  public getWindowTopInsets(): number {
    if (this.isAndroid) {
      return this.interface.getWindowTopInsets();
    } else {
      return 0;
    }
  }

  public getWindowRightInsets(): number {
    if (this.isAndroid) {
      return this.interface.getWindowRightInsets();
    } else {
      return 0;
    }
  }

  public getWindowBottomInsets(): number {
    if (this.isAndroid) {
      return this.interface.getWindowBottomInsets();
    } else {
      return 0;
    }
  }

  public getWindowLeftInsets(): number {
    if (this.isAndroid) {
      return this.interface.getWindowLeftInsets();
    } else {
      return 0;
    }
  }

  public fullscreen(enable: boolean) {
    if (this.isAndroid) {
      if (enable) {
        this.interface.hideSystemBars(ViewInsetsCompat.systemBars());
      } else {
        this.interface.showSystemBars(ViewInsetsCompat.systemBars());
      }
    }
  }
  /**
   * Checks if the foreground of the navigation bar is set to light.
   * ```
   * ```
   * This method always returns false on API < 26.
   *
   * @return true if the foreground is light
   */
  public isAppearanceLightNavigationBars(): boolean {
    if (this.isAndroid) {
      return this.interface.isAppearanceLightNavigationBars();
    } else {
      return false;
    }
  }

  /**
   * If true, changes the foreground color of the navigation bars to light so that the items on
   * the bar can be read clearly. If false, reverts to the default appearance.
   * ```
   * ```
   * This method has no effect on API < 26.
   */
  public setAppearanceLightNavigationBars(isLight: boolean = false): void {
    if (this.isAndroid) {
      this.interface.setAppearanceLightNavigationBars(isLight);
    }
  }

  /**
   * Checks if the foreground of the status bar is set to light.
   * ```
   * ```
   * This method always returns false on API < 23.
   *
   * @return true if the foreground is light
   */
  public isAppearanceLightStatusBars(): boolean {
    if (this.isAndroid) {
      return this.interface.isAppearanceLightStatusBars();
    } else {
      return false;
    }
  }

  /**
   * If true, changes the foreground color of the status bars to light so that the items on the
   * bar can be read clearly. If false, reverts to the default appearance.
   * ```
   * ```
   * This method has no effect on API < 23.
   */

  public setAppearanceLightStatusBars(isLight: boolean = true): void {
    if (this.isAndroid) {
      this.interface.setAppearanceLightStatusBars(isLight);
    }
  }

  /**
   * Changes the status bar color
   * @param color Your color
   * @param white `true` makes the status bar white
   */
  public setStatusBarColor(color: string, white: boolean = false): void {
    if (this.isAndroid) {
      this.interface.setStatusBarColor(color, white);
    }
  }

  /**
   *
   * @param color
   */
  public setNavigationBarColor(color: string): void {
    if (this.isAndroid) {
      this.interface.setNavigationBarColor(color);
    }
  }

  public addFlags(flags: list<int>) {
    if (this.isAndroid) {
      for (const flag of flags) {
        this.interface.addFlag(flag);
      }
    }
  }

  public clearFlags(flags: list<int>) {
    if (this.isAndroid) {
      for (const flag of flags) {
        this.interface.clearFlag(flag);
      }
    }
  }
}

const view: View = new View();
export { view, View, ViewInsetsCompat, WindowManager };
