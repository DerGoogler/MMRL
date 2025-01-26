import { Const } from "../util/Const";
import { NativeDecoratorOptions } from "./NativeMethod";

export function NativeProperty<T = void>(options?: NativeDecoratorOptions<T>) {
  return function (target: any, propertyKey: string) {
    let value: any;

    const isMMRL = Const.mmrlUserAgent === window.navigator.userAgent;

    const defaultValue = options?.default;
    const deprecated = options?.deprecated;
    const deprecatedMessage = options?.deprecatedMessage;
    const requireVersion = options?.requireVersion;

    const getter = () => {
      if (deprecated) {
        console.warn(
          `Method ${propertyKey} is deprecated! ${deprecatedMessage}`
        );
      }

      if (!isMMRL) {
        return defaultValue;
      }

      const access = window["mmrl"] as MMRL | undefined;

      if (
        typeof requireVersion === "number" &&
        access &&
        access.getBuildConfig().getVersionCode() < requireVersion
      ) {
        console.warn(
          `Method ${propertyKey} requires MMRL version ${requireVersion} or higher!`
        );
        return defaultValue;
      }

      return value;
    };

    const setter = (newValue: any) => {
      if (deprecated) {
        console.warn(
          `Method ${propertyKey} is deprecated! ${deprecatedMessage}`
        );
      }

      if (!isMMRL) {
        return;
      }

      if (typeof requireVersion === "number" && 33050 < requireVersion) {
        console.warn(
          `Method ${propertyKey} requires MMRL version ${requireVersion} or higher!`
        );
        return;
      }

      value = newValue;
    };

    Object.defineProperty(target, propertyKey, {
      get: getter,
      set: setter,
      enumerable: true,
      configurable: true,
    });
  };
}
