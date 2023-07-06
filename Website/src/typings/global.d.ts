import NShell from "./android/shell";
import NOS from "./android/os";
import NBuildConfig from "./android/buildconfig";

export {};

declare global {
  type int = number;
  type Int = Number;
  type Void = void;
  type Any = any;
  type bool = boolean;

  type HTMLAttributes<E, P = {}> = React.DetailedHTMLProps<React.HTMLAttributes<E> & P, E>;
  type AnchorHTMLAttributes<E, P = {}> = React.DetailedHTMLProps<React.AnchorHTMLAttributes<E> & P, E>;

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
    }
  }

  /**
   * Native window properties for Android
   */
  interface AndroidWindow<I = any> {
    /**
     * This is an Android only window object
     */
    readonly __fs__: I;
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
    /**
     * `localStorage` like object to make support better with `useLocalStorage`.
     *
     * - This interface is not configurable
     */
    readonly __nativeStorage__: Pick<Storage, "getItem" | "setItem" | "removeItem" | "clear">;
  }

  interface Window extends AndroidWindow<any> {}

  const Toast: {
    LENGTH_LONG: "long";
    LENGTH_SHORT: "short";
  };

  const NODE_ENV: string | undefined;

  interface PushPropsCore<E = {}> {
    component: React.ElementType;
    props: {
      key: string;
      extra: E;
      readonly popPage?: () => void;
      readonly pushPage?: (...args: [props: PushPropsCore<E>]) => void; //
    };
  }

  interface PushProps<E = {}> {
    readonly extra: E;
    // readonly context: {
    readonly popPage: () => void;
    readonly pushPage: <T>(props: PushPropsCore<T>) => void;
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
      readonly popPage: () => void;
      readonly pushPage: <T>(props: PushPropsCore<T>) => void;
      readonly splitter: {
        readonly show: () => void;
        readonly hide: () => void;
        readonly state: () => boolean;
      };
    };
  }

  interface BuiltInRepo extends Omit<Repo, "modules"> {
    modules: string;
    /**
     * The setting enabled by default if the repo is built-in
     */
    readonly: boolean;
    isOn: boolean;
    built_in_type?: string;
  }

  interface Repo {
    id: string;
    /**
     * An required filed, to disply the repository name
     */
    name: string;
    /**
     * An given website link for the repository
     */
    website?: string | undefined;
    /**
     * Given support link i.g. Telegram, Xda, GitHub or something
     */
    support?: string | undefined;
    donate?: string | undefined;
    submitModule?: string | undefined;
    last_update?: string | number | undefined;
    modules: Module[];
  }

  interface Module {
    id: string;
    last_update: number;
    notes_url: string;
    prop_url: ModuleProps;
    stars: number;
    zip_url: string;
  }

  interface ModuleProps {
    // Magisk supported properties
    id: string;
    name: string;
    version: string;
    versionCode: number;
    author: string;
    description: string;
    // Fox's Mmm supported properties
    minApi?: number;
    maxApi?: number;
    minMagisk?: number;
    needRamdisk?: boolean;
    support?: string;
    donate?: string;
    config?: string;
    changeBoot?: boolean;
    mmtReborn?: boolean;
  }
}
