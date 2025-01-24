import type { Manager, MimeType, ObjectScope } from "../types";
import { AccessorScope } from "../util/AccessorScope";
import { MMRLObjectAccessor } from "./MMRLObjectAccessor";

/**
 * Interface defining the methods for MMRLInterface implementation.
 */
export interface MMRLInterfaceImpl {
  getManager(): string;
  getMMRL(): string;
  getHasAccessToFileSystem(): boolean;
  getHasAccessToAdvancedKernelSuAPI(): boolean;
  getWindowTopInset(): number;
  getWindowBottomInset(): number;
  isLightNavigationBars(): boolean;
  isDarkMode(): boolean;
  setLightNavigationBars(light: boolean): void;
  isLightStatusBars(): boolean;
  setLightStatusBars(light: boolean): void;
  getSdk(): number;
  shareText(text: string): void;
  shareText(text: string, type: MimeType): void;
  getRecomposeCount(): number;
  recompose(): number;
  requestAdvancedKernelSUAPI(): void;
  requestFileSystemAPI(): void;
}

/**
 * Class representing the MMRL interface.
 * Extends the MMRLObjectAccessor class to provide additional functionality specific to MMRL.
 * @example
 * const mmrl = MMRLInterfaceFactory("net-switch");
 * mmrl.injectStyleSheets();
 * console.log(mmrl.manager);
 */
export class MMRLInterface extends MMRLObjectAccessor<MMRLInterfaceImpl> {
  /**
   * Creates an instance of MMRLInterface.
   * @param {ObjectScope} scope - The scope to initialize the internal interface with.
   * @example
   * const mmrl = MMRLInterfaceFactory("net-switch");
   */
  public constructor(scope: ObjectScope) {
    const parsedScope = AccessorScope.parseScope(scope);
    super(parsedScope);
  }

  /**
   * Injects the required stylesheets into the document head.
   * @example
   * mmrl.injectStyleSheets();
   */
  public injectStyleSheets() {
    if (!this.isMMRL) {
      return;
    }

    const stylesheets = [
      "https://mui.kernelsu.org/mmrl/insets.css",
      "https://mui.kernelsu.org/mmrl/colors.css",
    ];

    stylesheets.forEach((href) => {
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.type = "text/css";
      link.href = href;
      document.head.appendChild(link);
    });
  }

  private readonly emptyManager: Manager = {
    name: "Unknown",
    versionName: "Unknown",
    versionCode: 0,
  };

  /**
   * Gets the manager information.
   * @returns {Manager | null} The manager information or null if not available.
   * @example
   * console.log(mmrl.manager);
   */
  public get manager(): Manager | null {
    if (this.isMMRL) {
      return this.parseJSON<Manager>(this.interface.getManager());
    } else {
      return this.emptyManager;
    }
  }

  /**
   * Gets the MMRL information.
   * @returns {Manager | null} The MMRL information or null if not available.
   * @example
   * console.log(mmrl.mmrl);
   */
  public get mmrl(): Manager | null {
    if (this.isMMRL) {
      return this.parseJSON<Manager>(this.interface.getMMRL());
    } else {
      return this.emptyManager;
    }
  }

  /**
   * Checks if the interface has access to the file system.
   * @returns {boolean} True if access is available, otherwise false.
   * @example
   * console.log(mmrl.hasAccessToFileSystem);
   */
  public get hasAccessToFileSystem(): boolean {
    if (this.isMMRL) {
      return this.interface.getHasAccessToFileSystem();
    } else {
      return false;
    }
  }

  /**
   * Checks if the interface has access to the advanced kernel SU API.
   * @returns {boolean} True if access is available, otherwise false.
   * @example
   * console.log(mmrl.hasAccessToAdvancedKernelSuAPI);
   */
  public get hasAccessToAdvancedKernelSuAPI(): boolean {
    if (this.isMMRL) {
      return this.interface.getHasAccessToAdvancedKernelSuAPI();
    } else {
      return true;
    }
  }

  /**
   * Gets the top inset of the window.
   * @returns {number} The top inset value.
   * @example
   * console.log(mmrl.windowTopInset);
   */
  public get windowTopInset(): number {
    if (this.isMMRL) {
      return this.interface.getWindowTopInset();
    } else {
      return 0;
    }
  }

  /**
   * Gets the bottom inset of the window.
   * @returns {number} The bottom inset value.
   * @example
   * console.log(mmrl.windowBottomInset);
   */
  public get windowBottomInset(): number {
    if (this.isMMRL) {
      return this.interface.getWindowBottomInset();
    } else {
      return 0;
    }
  }

  /**
   * Checks if the navigation bars are light.
   * @returns {boolean} True if the navigation bars are light, otherwise false.
   * @example
   * console.log(mmrl.lightNavigationBars);
   */
  public get lightNavigationBars(): boolean {
    if (this.isMMRL) {
      return this.interface.isLightNavigationBars();
    } else {
      return false;
    }
  }

  /**
   * Checks if the dark mode is enabled.
   * @returns {boolean} True if dark mode is enabled, otherwise false.
   * @example
   * console.log(mmrl.darkMode);
   */
  public get darkMode(): boolean {
    if (this.isMMRL) {
      return this.interface.isDarkMode();
    } else {
      return false;
    }
  }

  /**
   * Sets the navigation bars to light or dark.
   * @param {boolean} light - True to set the navigation bars to light, otherwise false.
   * @example
   * mmrl.lightNavigationBars = true;
   */
  public set lightNavigationBars(light: boolean) {
    if (this.isMMRL) {
      this.interface.setLightNavigationBars(light);
    }
  }

  /**
   * Checks if the status bars are light.
   * @returns {boolean} True if the status bars are light, otherwise false.
   * @example
   * console.log(mmrl.lightStatusBars);
   */
  public get lightStatusBars(): boolean {
    if (this.isMMRL) {
      return this.interface.isLightStatusBars();
    } else {
      return false;
    }
  }

  /**
   * Sets the status bars to light or dark.
   * @param {boolean} light - True to set the status bars to light, otherwise false.
   * @example
   * mmrl.lightStatusBars = true;
   */
  public set lightStatusBars(light: boolean) {
    if (this.isMMRL) {
      this.interface.setLightStatusBars(light);
    }
  }

  /**
   * Gets the SDK version.
   * @returns {number} The SDK version.
   * @example
   * console.log(mmrl.sdk);
   */
  public get sdk(): number {
    if (this.isMMRL) {
      return this.interface.getSdk();
    } else {
      return 0;
    }
  }

  /**
   * Shares text with an optional MIME type.
   * @param {string} text - The text to share.
   * @param {MimeType} [type] - The optional MIME type.
   * @example
   * mmrl.shareText("Hello, world!");
   * mmrl.shareText("Hello, world!", "text/plain");
   */
  public shareText(text: string, type?: MimeType) {
    if (this.isMMRL) {
      if (type === undefined) {
        this.interface.shareText(text);
        return;
      }

      this.interface.shareText(text, type);
    }
  }

  /**
   * Requests access to the advanced kernel SU API.
   *
   * This method checks if the current instance is an MMRL instance. If it is,
   * it proceeds to request the advanced kernel SU API through the interface.
   */
  public requestAdvancedKernelSUAPI() {
    if (this.isMMRL) {
      this.interface.requestAdvancedKernelSUAPI();
    }
  }

  /**
   * Requests access to the file system API if the current instance is an MMRL.
   * If access to the file system is granted, it triggers the recompose method.
   */
  public requestFileSystemAPI() {
    if (this.isMMRL) {
      this.interface.requestFileSystemAPI();
    }
  }
}

/**
 * Factory function to create an instance of MMRLInterface.
 * @param {ObjectScope} scope - The scope to initialize the MMRLInterface with.
 * @returns {MMRLInterface} The created MMRLInterface instance.
 * @example
 * const mmrl = MMRLInterfaceFactory("net-switch");
 */
export function MMRLInterfaceFactory(scope: ObjectScope): MMRLInterface {
  return new MMRLInterface(scope);
}
