export declare type Dispatch<A, B> = (value: A, callback?: (state: B) => void) => void;
export declare type SetStateAction<S> = S | ((prevState: S) => S);
export declare function useStateCallback<S>(initialState: S | (() => S)): [S, Dispatch<SetStateAction<S>, S>];
