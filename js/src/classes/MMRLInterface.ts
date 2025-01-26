import { NativeMethod } from "../decorators/NativeMethod";
import { NativeProperty } from "../decorators/NativeProperty";
import type { Manager, MimeType, ObjectScope } from "../types";
import { AccessorScope } from "../util/AccessorScope";
import { MMRLObjectAccessor } from "./MMRLObjectAccessor";

/**
 * Interface defining the methods for MMRLInterface implementation.
 */
export interface MMRLInterfaceImpl {
  getManager(): string;
  getMmrl(): string;
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
  @NativeMethod()
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
  @NativeProperty({
    default: null,
    deprecated: true,
    deprecatedMessage: "Please use the new MMRL Version API.",
  })
  public readonly manager: Manager | null = this.parseJSON<Manager>(
    this.interface.getManager()
  );

  /**
   * Gets the MMRL information.
   * @returns {Manager | null} The MMRL information or null if not available.
   * @example
   * console.log(mmrl.mmrl);
   */
  @NativeProperty({
    default: null,
    deprecated: true,
    deprecatedMessage: "Please use the new MMRL Version API.",
  })
  public readonly mmrl: Manager | null = this.parseJSON<Manager>(
    this.interface.getMmrl()
  );

  /**
   * Checks if the interface has access to the file system.
   * @returns {boolean} True if access is available, otherwise false.
   * @example
   * console.log(mmrl.hasAccessToFileSystem);
   */
  @NativeProperty({ default: false })
  public hasAccessToFileSystem: boolean =
    this.interface.getHasAccessToFileSystem();

  /**
   * Checks if the interface has access to the advanced kernel SU API.
   * @returns {boolean} True if access is available, otherwise false.
   * @example
   * console.log(mmrl.hasAccessToAdvancedKernelSuAPI);
   */
  @NativeProperty({ default: true })
  public hasAccessToAdvancedKernelSuAPI: boolean =
    this.interface.getHasAccessToAdvancedKernelSuAPI();

  /**
   * Gets the top inset of the window.
   * @returns {number} The top inset value.
   * @example
   * console.log(mmrl.windowTopInset);
   */
  @NativeProperty({ default: 0 })
  public readonly windowTopInset: number = this.interface.getWindowTopInset();

  /**
   * Gets the bottom inset of the window.
   * @returns {number} The bottom inset value.
   * @example
   * console.log(mmrl.windowBottomInset);
   */
  @NativeProperty({ default: 0 })
  public readonly windowBottomInset: number =
    this.interface.getWindowBottomInset();

  /**
   * Checks if the navigation bars are light.
   * @returns {boolean} True if the navigation bars are light, otherwise false.
   * @example
   * console.log(mmrl.lightNavigationBars);
   */
  public get lightNavigationBars(): boolean {
    if (!this.isMMRL) return false;

    return this.interface.isLightNavigationBars();
  }

  /**
   * Checks if the dark mode is enabled.
   * @returns {boolean} True if dark mode is enabled, otherwise false.
   * @example
   * console.log(mmrl.darkMode);
   */
  @NativeProperty({ default: false })
  public readonly darkMode: boolean = this.interface.isDarkMode();

  /**
   * Sets the navigation bars to light or dark.
   * @param {boolean} light - True to set the navigation bars to light, otherwise false.
   * @example
   * mmrl.lightNavigationBars = true;
   */
  public set lightNavigationBars(light: boolean) {
    if (!this.isMMRL) return;

    this.interface.setLightNavigationBars(light);
  }

  /**
   * Checks if the status bars are light.
   * @returns {boolean} True if the status bars are light, otherwise false.
   * @example
   * console.log(mmrl.lightStatusBars);
   */
  public get lightStatusBars(): boolean {
    if (!this.isMMRL) return false;

    return this.interface.isLightStatusBars();
  }

  /**
   * Sets the status bars to light or dark.
   * @param {boolean} light - True to set the status bars to light, otherwise false.
   * @example
   * mmrl.lightStatusBars = true;
   */
  public set lightStatusBars(light: boolean) {
    if (!this.isMMRL) return;

    this.interface.setLightStatusBars(light);
  }

  /**
   * Gets the SDK version.
   * @returns {number} The SDK version.
   * @example
   * console.log(mmrl.sdk);
   */
  @NativeProperty({ default: 0 })
  public readonly sdk: number = this.interface.getSdk();

  /**
   * Shares text with an optional MIME type.
   * @param {string} text - The text to share.
   * @param {MimeType} [type] - The optional MIME type.
   * @example
   * mmrl.shareText("Hello, world!");
   * mmrl.shareText("Hello, world!", "text/plain");
   */
  @NativeMethod()
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
   * @requires MMRL version `33045` or higher.
   */
  @NativeMethod({ requireVersion: 33045 })
  public requestAdvancedKernelSUAPI() {
    this.interface.requestAdvancedKernelSUAPI();
  }

  /**
   * Requests access to the file system API if the current instance is an MMRL.
   * If access to the file system is granted, it triggers the recompose method.
   * @requires MMRL version `33045` or higher.
   */
  @NativeMethod({ requireVersion: 33045 })
  public requestFileSystemAPI() {
    this.interface.requestFileSystemAPI();
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
