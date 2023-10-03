import NShell from "./android/shell";
import NOS from "./android/os";
import NBuildConfig from "./android/buildconfig";

export {};

declare global {
  type arr<T> = Array<T>;
  type str = string;
  type Str = String;
  type int = number;
  type Int = Number;
  type Void = void;
  type Any = any;
  type bool = boolean;

  type HTMLAttributes<E, P = {}> = React.DetailedHTMLProps<React.HTMLAttributes<E> & P, E>;
  type AnchorHTMLAttributes<E, P = {}> = React.DetailedHTMLProps<React.AnchorHTMLAttributes<E> & P, E>;

  type VersionType = `${string}.${string}.${string}`;

  namespace JSX {
    interface IntrinsicElements {
      "module-container": HTMLAttributes<HTMLDivElement>;
      "lib-container": HTMLAttributes<HTMLDivElement>;
      "settings-container": HTMLAttributes<HTMLDivElement>;
      "content-body": HTMLAttributes<HTMLDivElement>;
      "content-body-inner": HTMLAttributes<HTMLDivElement>;

      // ./components/Item.tsx
      "item-card-wrapper": HTMLAttributes<HTMLDivElement>;
      "item-title": HTMLAttributes<HTMLDivElement>;
      "item-version-author": HTMLAttributes<HTMLSpanElement>;
      "item-description": HTMLAttributes<HTMLSpanElement>;
      "item-last-update": HTMLAttributes<HTMLSpanElement>;
      "item-module-name": HTMLAttributes<HTMLSpanElement>;
      "item-name": HTMLAttributes<HTMLSpanElement>;
      "item-switch": HTMLAttributes<HTMLSpanElement>;
      "item-module-button-wrapper": HTMLAttributes<HTMLDivElement>;
      "item-module-button": HTMLAttributes<HTMLSpanElement>;

      // License cards
      "license-card-wrapper": HTMLAttributes<HTMLDivElement>;
      "license-card-title": HTMLAttributes<HTMLDivElement>;
      "license-card-name": HTMLAttributes<HTMLSpanElement>;
      "license-card-author": HTMLAttributes<HTMLSpanElement>;
      "license-card-description": HTMLAttributes<HTMLSpanElement>;
      "license-card-diver": HTMLAttributes<HTMLHRElement>;
      "license-card-infos": HTMLAttributes<HTMLDivElement>;
      "license-card-version": HTMLAttributes<HTMLSpanElement>;
      "license-card-license": HTMLAttributes<HTMLSpanElement>;

      "mmrl-anchor": React.DetailedHTMLProps<React.AnchorHTMLAttributes<HTMLAnchorElement> & { page?: string }, HTMLAnchorElement>;

      // Onsen Elements
      "ons-toolbar-button": HTMLAttributes<HTMLElement>;
      "ons-toolbar": HTMLAttributes<HTMLElement>;
      "ons-page": HTMLAttributes<HTMLElement>;
      "ons-splitter": HTMLAttributes<HTMLElement>;
      "ons-splitter-content": HTMLAttributes<HTMLElement>;
      "ons-splitter-side": HTMLAttributes<HTMLElement>;
      "ons-navigator": HTMLAttributes<HTMLElement>;
      "ons-tabbar": HTMLAttributes<HTMLElement>;
      "ons-tab": HTMLAttributes<HTMLElement>;
      "ons-gesture-detector": HTMLAttributes<HTMLElement>;
      "ons-bottom-toolbar": HTMLAttributes<HTMLElement>;
    }
  }

  /**
   * Native window properties for Android
   */
  interface AndroidWindow<I = any> {
    /**object
     * This is an Android only window object
     */
    readonly __sufile__: I;
    /**
     * This is an Android only window object
     */
    readonly __environment__: I;

    /**
     * This is an Android only window object
     */
    readonly __shell__: I;
    /**
     * This is an Android only window object
     */
    readonly __buildconfig__: I;
    /**
     * This is an Android only window object
     */
    readonly __os__: I;
    readonly __log__: I;
    readonly __properties__: I;
    /**
     * `localStorage` like object to make support better with `useLocalStorage`.
     *
     * - This interface is not configurable
     */
    readonly __nativeStorage__: Pick<Storage, "getItem" | "setItem" | "removeItem" | "clear"> & { defineName: (name: string) => void };
  }

  interface Window extends AndroidWindow<any> {}

  const Toast: {
    LENGTH_LONG: "long";
    LENGTH_SHORT: "short";
  };

  const WEB_BUILD_DATE: number;

  const __webpack__mode__: "production" | "development";

  type PushPropsExtra<E = {}> = E & {
    param?: {
      name: string;
      value: string;
    };
  };

  interface PushPropsCore<E = {}, P = {}> {
    component: React.ElementType;

    props: P & {
      key: string;
      extra: PushPropsExtra<E>;
      readonly popPage?: () => void;
      readonly pushPage?: (...args: [props: PushPropsCore<PushPropsExtra<E>>]) => void; //
    };
  }

  interface PushProps<E = {}> {
    readonly extra: PushPropsExtra<E>;
    // readonly context: {
    readonly popPage: (options?: any) => void;
    readonly pushPage: <E, P>(props: PushPropsCore<E, P>) => void;
    readonly splitter: {
      readonly show: () => void;
      readonly hide: () => void;
      readonly state: boolean;
    };
    readonly onBackPressed: (handler: EventListener) => void;
    readonly onResume: (handler: EventListener) => void;
    // };
  }

  interface UseActivity<E = {}> {
    readonly context: {
      readonly popPage: (options?: any) => void;
      readonly pushPage: <T>(props: PushPropsCore<T>) => void;
      readonly splitter: {
        readonly show: () => void;
        readonly hide: () => void;
        readonly state: () => boolean;
      };
    };
  }

  interface StoredRepo extends Omit<Repo, "modules"> {
    modules: string;
  }

  interface Repo {
    id: str;
    /**
     * An required filed, to disply the repository name
     */
    name: str;
    mmrlOwner?: str;
    /**
     * An given website link for the repository
     */
    website?: str;
    /**
     * Given support link i.g. Telegram, Xda, GitHub or something
     */
    support?: str;
    donate?: str;
    submitModule?: str;
    last_update: int;
    modules: Module[];
  }

  export interface Root {
    last_update: number;
    name: string;
    website: any;
    support: any;
    donate: any;
    submitModule: string;
    modules: Module[];
  }

  export interface Module {
    id: str;
    name: str;
    version?: int;
    versionCode?: int;
    author?: str;
    description?: str;
    valid: bool;
    download: str;
    last_update: int;
    readme: str;
    stars: int;
    about: About;
    mmrl: Mmrl;
    fox: Fox;
  }

  export interface About {
    issues?: string;
    source: string;
  }

  export interface Mmrl {
    cover?: str;
    logo?: str;
    screenshots?: arr<str>;
    categories?: arr<str>;
  }

  export interface Fox {
    minApi?: int;
    maxApi?: int;
    minMagisk?: int;
    needRamdisk?: bool;
    support?: str;
    donate?: str;
    config?: str;
    changeBoot?: bool;
    mmtReborn?: bool;
  }
}
