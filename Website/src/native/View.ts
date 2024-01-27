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
}

export const view: View = new View();
