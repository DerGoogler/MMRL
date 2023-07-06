import React from "react";

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
