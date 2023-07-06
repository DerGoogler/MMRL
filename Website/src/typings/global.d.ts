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

  interface Function {
    readonly name: string;
  }

  interface Window {
    [x: string]: any;
    nshell: NShell;
    nos: NOS;
    nversion: NBuildConfig;
  }

  const nshell: NShell;
  const nos: NOS;
  const nbuildconfig: NBuildConfig;

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
    }
  }

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

  interface Keep {
    [x: string]: any;
  }
}
