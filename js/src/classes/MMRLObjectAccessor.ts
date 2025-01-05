import type { ObjectScope } from "../types";

export class MMRLObjectAccessor<I = any> {
  private _internal_interface: I;
  public static static: MMRLObjectAccessor<any>;

  private _parseScope(scope: ObjectScope): object {
    if (typeof scope === "string") {
      return window[`$${scope.replace(/[-.]/g, "_")}`];
    }

    return scope;
  }

  public constructor(i: ObjectScope) {
    this._parseScope = this._parseScope.bind(this);
    this._internal_interface = this._parseScope(i) as I;
    MMRLObjectAccessor.static = this;
  }

  private static get userAgentName(): string {
    return "DON'T TRACK ME DOWN MOTHERFUCKER!";
  }

  protected static get userAgent(): string {
    return window.navigator.userAgent;
  }

  protected static get isMMRL(): boolean {
    return this.userAgentName === this.userAgent;
  }

  protected get isMMRL(): boolean {
    return MMRLObjectAccessor.isMMRL;
  }

  protected get interface(): I {
    return this._internal_interface;
  }

  protected static get interface() {
    return MMRLObjectAccessor.prototype.interface;
  }

  protected parseJSON<T>(value: string | null): T | null {
    try {
      return value === "undefined" ? undefined : JSON.parse(value ?? "");
    } catch (e) {
      console.error("Parsing error on", { value });
      return null;
    }
  }
}
