import React from "react";

export const Context = React.createContext({});
export const Extra = React.createContext({});

export interface IntentPusher<E = {}, P = {}> {
  key: string;
  /**
   * Prevents the activity from being memoized
   */
  noMemo?: boolean;
  component: React.FunctionComponent<P> | React.ComponentType<P>;
  options?: any;
  extra?: E;
  props?: React.Attributes & P;
}

export interface ActivityContext {
  readonly popPage: (options?: any) => void;
  readonly pushPage: <E, P>(props: IntentPusher<E, P>) => void;
  readonly replacePage: <E, P>(props: IntentPusher<E, P>) => void;
  readonly splitter: {
    readonly show: () => void;
    readonly hide: () => void;
    readonly state: boolean;
  };
}

export function useActivity<E = {}>() {
  const ctx = React.useContext(Context) as ActivityContext;
  const etx = React.useContext(Extra) as E;
  return {
    context: ctx,
    extra: etx,
  };
}
