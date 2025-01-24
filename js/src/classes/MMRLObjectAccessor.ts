import { AccessorScope } from "../util/AccessorScope";

/**
 * The `MMRLObjectAccessor` class provides a base class for accessing MMRL objects.
 * It handles the parsing of the scope and provides utility methods for interacting with the MMRL environment.
 *
 * @template I - The type of the internal interface.
 */
export class MMRLObjectAccessor<I = any> {
  /**
   * The internal interface instance.
   * @private
   */
  private _internal_interface: I;

  /**
   * A static reference to the current instance of `MMRLObjectAccessor`.
   * @public
   * @static
   */
  public static static: MMRLObjectAccessor<any>;


  /**
   * Creates an instance of `MMRLObjectAccessor`.
   *
   * @param {AccessorScope.ObjectScope} scope - The scope to initialize the internal interface with.
   */
  public constructor(
    scope: AccessorScope.ObjectScope
  ) {
    MMRLObjectAccessor.static = this;
    this._internal_interface = scope as I;
  }

  /**
   * Gets the user agent name.
   *
   * @returns {string} The user agent name.
   * @private
   * @static
   */
  private static get userAgentName(): string {
    return "DON'T TRACK ME DOWN MOTHERFUCKER!";
  }

  /**
   * Gets the user agent string from the window navigator.
   *
   * @returns {string} The user agent string.
   * @protected
   * @static
   */
  protected static get userAgent(): string {
    return window.navigator.userAgent;
  }

  /**
   * Checks if the current environment is MMRL.
   *
   * @returns {boolean} `true` if the environment is MMRL, otherwise `false`.
   * @protected
   * @static
   */
  protected static get isMMRL(): boolean {
    return this.userAgentName === this.userAgent;
  }

  /**
   * Checks if the current environment is MMRL.
   *
   * @returns {boolean} `true` if the environment is MMRL, otherwise `false`.
   * @protected
   */
  protected get isMMRL(): boolean {
    return MMRLObjectAccessor.isMMRL;
  }

  /**
   * Gets the internal interface instance.
   *
   * @returns {I} The internal interface instance.
   * @protected
   */
  protected get interface(): I {
    return this._internal_interface;
  }

  /**
   * Gets the internal interface instance.
   *
   * @returns {I} The internal interface instance.
   * @protected
   * @static
   */
  protected static get interface() {
    return MMRLObjectAccessor.prototype.interface;
  }

  /**
   * Parses a JSON string and returns the corresponding object.
   *
   * @template T - The type of the parsed object.
   * @param {string | null} value - The JSON string to parse.
   * @returns {T | null} The parsed object, or `null` if parsing fails.
   * @protected
   */
  protected parseJSON<T>(value: string | null): T | null {
    try {
      return value === "undefined" ? undefined : JSON.parse(value ?? "");
    } catch (e) {
      console.error("Parsing error on", { value });
      return null;
    }
  }
}
