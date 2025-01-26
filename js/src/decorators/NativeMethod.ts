import { Const } from "../util/Const";

export type NativeDecoratorOptions<T = void> = {
  default?: T;
  deprecated?: boolean;
  deprecatedMessage?: string;
  requireVersion?: number;
};

export function NativeMethod<T = void>(options?: NativeDecoratorOptions<T>) {
  return function (target: any, key: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;

    descriptor.value = function (...args: any[]) {
      const isMMRL = Const.mmrlUserAgent === window.navigator.userAgent;

      const defaultValue = options?.default;
      const deprecated = options?.deprecated;
      const deprecatedMessage = options?.deprecatedMessage;
      const requireVersion = options?.requireVersion;

      const access = window["mmrl"] as MMRL | undefined;

      if (deprecated) {
        console.warn(`Method ${key} is deprecated! ${deprecatedMessage}`);
      }

      if (!isMMRL) {
        return defaultValue;
      }

      if (
        typeof requireVersion === "number" &&
        access &&
        access.getBuildConfig().getVersionCode() < requireVersion
      ) {
        console.warn(
          `Method ${key} requires MMRL version ${requireVersion} or higher!`
        );
        return defaultValue;
      }

      return originalMethod.apply(this, args);
    };
  };
}
