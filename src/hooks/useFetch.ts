import {useEffect, useReducer, useRef} from 'react';

interface State<T = any, K extends Type = 'json'> {
  data?: K extends 'json' ? T : K extends 'text' ? string : T;
  error?: Error;
}

type Cache<T> = {[url: string]: T | string};

// discriminated union type

type Action<T> =
  | {type: 'loading'}
  | {type: 'fetched'; payload: T | string}
  | {type: 'error'; payload: Error};

type Type = 'json' | 'text';

function useFetch<T = unknown, K extends Type = 'json'>(
  url?: string,
  type?: K,
  options?: RequestInit,
): State<T, K> {
  const cache = useRef<Cache<T>>({});

  // Used to prevent state update if the component is unmounted

  const cancelRequest = useRef<boolean>(false);

  const initialState: State<T, K> = {
    error: undefined,

    data: undefined,
  };

  // Keep state logic separated

  const fetchReducer = (state: State<T, K>, action: Action<T>): State<T, K> => {
    switch (action.type) {
      case 'loading':
        return {...initialState};

      case 'fetched':
        return {...initialState, data: action.payload as any};

      case 'error':
        return {...initialState, error: action.payload};

      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(fetchReducer, initialState);

  useEffect(() => {
    // Do nothing if the url is not given

    if (!url) return;

    cancelRequest.current = false;

    const fetchData = async () => {
      dispatch({type: 'loading'});

      // If a cache exists for this url, return it

      if (cache.current[url]) {
        dispatch({type: 'fetched', payload: cache.current[url]});

        return;
      }

      try {
        const response = await fetch(url, options);

        if (!response.ok) {
          throw new Error(response.statusText);
        }

        const data =
          type === 'text'
            ? ((await response.text()) as string)
            : ((await response.json()) as T);

        cache.current[url] = data;

        if (cancelRequest.current) return;

        dispatch({type: 'fetched', payload: data});
      } catch (error) {
        if (cancelRequest.current) return;

        dispatch({type: 'error', payload: error as Error});
      }
    };

    void fetchData();

    // Use the cleanup function for avoiding a possibly...

    // ...state update after the component was unmounted

    return () => {
      cancelRequest.current = true;
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [url]);

  return state;
}

export default useFetch;

export function useMapFetch<T>(url: string[]) {
  return url.map(u => useFetch<T>(u))[0]
}
