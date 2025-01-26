export type Scope = `$${string}` | string;
export type ObjectScope = Scope | object;
export type MimeType = `${string}/${string}`;

export interface Manager {
  name: string;
  versionName: string;
  versionCode: number;
}

export interface ToastImpl {
  setText(text: string): void;
  setDuration(duration: number): void;
  setGravity(gravity: number, xOffset: number, yOffset: number): void;
  show(): void;
  cancel(): void;
}

export {};

declare global {
  interface BuildConfigDetails {
    getApplicationId(): string;
    getVersionName(): string;
    getVersionCode(): number;
    getBuildType(): string;
    isDevVersion(): boolean;
    isGooglePlayBuild(): boolean;
  }

  interface RootConfigDetails {
    getPlatform(): string;
    getVersionName(): string;
    getVersionCode(): number;
  }

  interface MMRL {
    getBuildConfig(): BuildConfigDetails;
    getRootConfig(): RootConfigDetails;
    toastBuilder(): ToastImpl;
  }

  interface Window {
    mmrl?: MMRL;
    [key: Scope]: any;
  }
}
