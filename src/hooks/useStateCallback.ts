import React from "react";
import { useCallback, useEffect, useRef, useState } from "react";

export type Dispatch<A, B> = (value: A, callback?: (state: B) => void) => void;
export type SetStateAction<S> = S | ((prevState: S) => S);

export function useStateCallback<S>(initialState: S | (() => S)): [S, Dispatch<SetStateAction<S>, S>] {
  const [state, setState] = useState(initialState);
  const cbRef = useRef<((state: S) => void) | undefined>(undefined); // init mutable ref container for callbacks

  const [uniqueState, setUniqueState] = useState(Symbol());

  const setStateCallback = useCallback((state: SetStateAction<S>, callback?: (state: S) => void) => {
    cbRef.current = callback; // store current, passed callback in ref
    setState(state);

    // Prevent unnecessary firing of the useEffect if there is no callback to fire
    if (callback) {
      setUniqueState(Symbol());
    }
  }, []); // keep object reference stable, exactly like `useState`

  useEffect(() => {
    // cb.current is `undefined` on initial render,
    // so we only invoke callback on state *updates*
    if (cbRef.current) {
      cbRef.current(state);
      cbRef.current = undefined; // reset callback after execution
    }
  }, [state, uniqueState]);

  return [state, setStateCallback];
}
