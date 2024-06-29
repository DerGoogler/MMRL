import { AlertColor } from "@mui/material/Alert";
import { AvailableStrs, strs } from "./../locales/declaration";
import { Theme } from "@mui/material";
import { en_antifeatures } from "locales/antifeatures/en";

export {};

declare module "*.d.ts" {
  const value: string;
  export default value;
}

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
      "ons-fab": HTMLAttributes<HTMLElement>;
      "ons-carousel": HTMLAttributes<HTMLElement>;
      "ons-carousel-item": HTMLAttributes<HTMLElement>;
    }
  }

  interface NativeStorage extends Storage {
    getItem(key: string, def?: string): string;
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
    /**
     * TODO
     */
    readonly __view__: I;
    readonly __log__: I;
    readonly __properties__: I;
    /**
     * `localStorage` like object to make support better with `useLocalStorage`.
     *
     * - This interface is not configurable
     */
    readonly __nativeStorage__: NativeStorage;

    readonly __terminal__: I;
    readonly __chooser__: I;
  }

  export type MMRLTheme = Theme & {
    palette?: {
      primary?: {
        header?: string;
      };
      menuoutline?: string;
      text?: {
        link?: string;
      };
    };
  };

  interface Window extends AndroidWindow<any> {
    localStorage: NativeStorage;
  }

  const Toast: {
    LENGTH_LONG: "long";
    LENGTH_SHORT: "short";
  };

  const WEB_BUILD_DATE: number;

  const __webpack__mode__: "production" | "development";

  export interface RepoConfig {
    name: string;
    website?: string;
    support?: string;
    donate?: string;
    submission?: any;
    base_url: string;
    max_num?: number;
    enable_log?: boolean;
    log_dir?: string;
  }

  export interface Repo {
    name: string;
    website: string;
    support: string;
    donate: string;
    submission: any;
    metadata: Metadata;
    modules: Module[];
  }

  export interface Metadata {
    version: number;
    timestamp: number;
  }

  export interface Module {
    id: string;
    name: string;
    version: string;
    versionCode: number;
    author: string;
    description: string;
    updateJson?: string;
    added: number;
    timestamp?: number;
    track: Track;
    versions: Version[];

    license?: string;
    homepage?: string;
    support?: string;
    donate?: string;
    cover?: string;
    icon?: string;
    require?: string[];
    screenshots?: string[];
    category?: string;
    categories?: string[];
    stars?: number;
    readme?: string;

    /**
     * Non-user definable
     */
    verified: boolean;

    /**
     * Local modules only
     */
    __mmrl__local__module__?: boolean;
  }

  export interface Track {
    type: string;
    added: number;
    source: string;
    verified: boolean;
    antifeatures?: string | string[];

    /**
     * @deprecated
     */
    license: string;
    /**
     * @deprecated
     */
    homepage: string;
    /**
     * @deprecated
     */
    support: string;
    /**
     * @deprecated
     */
    donate: string;
    /**
     * @deprecated
     */
    cover?: string;
    /**
     * @deprecated
     */
    icon?: string;
    /**
     * @deprecated
     */
    require?: string[];
    /**
     * @deprecated
     */
    screenshots?: string[];
    /**
     * @deprecated
     */
    category?: string;
    /**
     * @deprecated
     */
    categories?: string[];
    /**
     * @deprecated
     */
    readme?: string;

    /**
     * Not Supported
     */
    stars?: number;
  }

  export interface Version {
    timestamp: number;
    version: string;
    versionCode: number;
    zipUrl: string;
    changelog: string;
  }

  export interface UpdateJson {
    version: string;
    versionCode: number;
    zipUrl: string;
    changelog: string;
  }

  export interface LicenseSPX {
    isDeprecatedLicenseId: boolean;
    isFsfLibre: boolean;
    licenseText: string;
    standardLicenseTemplate: string;
    name: string;
    licenseId: string;
    crossRef: CrossRef[];
    seeAlso: string[];
    isOsiApproved: boolean;
    licenseTextHtml: string;
  }

  export interface CrossRef {
    match: string;
    url: string;
    isValid: boolean;
    isLive: boolean;
    timestamp: string;
    isWayBackLink: boolean;
    order: number;
  }

  // OnsenUI Types
  /**
   * @extends {Event}
   */
  export interface DeviceBackButtonEvent extends Event {
    /**
     * Runs the handler for the immediate parent that supports device back button.
     * @returns {void}
     */
    callParentHandler: () => void;
  }
}
