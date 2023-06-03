import React from "react";

export namespace ModuleProps {
  export interface RootObject {
    id: string;
    last_update: number;
    zip_url: string;
    notes_url: string;
    prop_url: string;
    props?: Props;
  }

  export interface Extra {
    name?: string;
    downloadUrl?: string;
    id: string;
    author?: string;
    notes: string;
    stars?: string | number;
    module_options: Options;
    module_props: Props;
  }

  export interface Props {
    id: string;
    name: string;
    author: string;
    version: string;
    versionCode: string;
    description: string;
    image: string;
    minApi?: int;
    maxApi?: int;
    minMagisk?: string | int;
    needRamdisk?: boolean;
    support?: string;
    donate?: string;
    config?: string;
    changeBoot?: boolean;
  }

  export interface FoxProps {}

  export interface Options {
    verified?: boolean;
    low?: boolean;
    display?: string;
  }
}

export interface PushPropsCore<E = {}> {
  activity: React.ElementType;
  props: {
    key: string;
    extra?: E;
    readonly popPage?: () => void;
    readonly pushPage?: (...args: [props: PushPropsCore<E>]) => void;
  };
}

export interface PushProps<E = {}> {
  readonly extra: E;
  readonly popPage: () => void;
  readonly pushPage: <T = {}>(props: PushPropsCore<T>) => void;
  // readonly onBackPressed: (callback: () => void) => void;
  //   readonly onResume: (callback: () => void) => void;
}

export interface UseActivity<E = {}> {
  readonly context: {
    readonly popPage: () => void;
    readonly pushPage: <T>(props: PushPropsCore<T>) => void;
  };
}

export const Context = React.createContext({});
export const Extra = React.createContext({});

export function useActivity<E = {}>() {
  const ctx = React.useContext(Context) as PushProps<E>;
  const etx = React.useContext(Extra) as E;
  return {
    context: ctx,
    extra: etx,
  };
}
