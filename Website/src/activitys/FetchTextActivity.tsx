import { ProgressCircular } from "react-onsenui";
import { Markup } from "@Components/Markdown";
import { useActivity } from "@Hooks/useActivity";
import React from "react";
import { Toolbar } from "@Components/onsenui/Toolbar";
import { Page } from "@Components/onsenui/Page";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Icon from "@Components/Icon";
import { useNetwork } from "@Hooks/useNetwork";
import { MissingInternet } from "@Components/MissingInternet";

export type FetchTextActivityExtra = {
  rendering?: React.FunctionComponent<any> | React.ComponentType<any>;
  modulename: string;
  raw_data?: string;
  url?: string;
};

interface State<T> {
  data?: T;
  error?: Error;
}

type Cache<T> = { [url: string]: T };
type Action<T> = { type: "loading" } | { type: "fetched"; payload: T } | { type: "error"; payload: Error };

function FetchTextActivity() {
  const { context, extra } = useActivity<FetchTextActivityExtra>();
  const { isNetworkAvailable } = useNetwork();
  const { modulename, url } = extra;

  const initialState: State<string> = {
    error: undefined,
    data: extra.raw_data || undefined,
  };

  // Keep state logic separated
  const fetchReducer = (state: State<string>, action: Action<string>): State<string> => {
    switch (action.type) {
      case "loading":
        return { ...initialState };
      case "fetched":
        return { ...initialState, data: action.payload };
      case "error":
        return { ...initialState, error: action.payload };
      default:
        return state;
    }
  };

  const [state, dispatch] = React.useReducer(fetchReducer, initialState);

  const cache = React.useRef<Cache<string>>({});

  // Used to prevent state update if the component is unmounted
  const cancelRequest = React.useRef<boolean>(false);

  React.useEffect(() => {
    // Do nothing if the url is not given
    if (!url || !isNetworkAvailable) return;

    cancelRequest.current = false;

    const fetchData = async () => {
      dispatch({ type: "loading" });

      // If a cache exists for this url, return it
      if (cache.current[url]) {
        dispatch({ type: "fetched", payload: cache.current[url] });
        return;
      }

      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(response.statusText);
        }

        const data = (await response.text()) as string;

        cache.current[url] = data;
        if (cancelRequest.current) return;

        dispatch({ type: "fetched", payload: data });
      } catch (error) {
        if (cancelRequest.current) return;

        dispatch({ type: "error", payload: error as Error });
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

  const renderToolbar = () => {
    return (
      <Toolbar modifier="noshadow">
        <Toolbar.Left>
          <Toolbar.BackButton onClick={context.popPage} />
        </Toolbar.Left>
        <Toolbar.Center>{modulename}</Toolbar.Center>
      </Toolbar>
    );
  };

  if (!isNetworkAvailable) {
    return (
      <Page renderToolbar={renderToolbar}>
        <MissingInternet />
      </Page>
    );
  }

  if (!state.data) {
    return (
      <Page renderToolbar={renderToolbar}>
        <ProgressCircular
          indeterminate
          style={{
            position: "absolute",
            left: "50%",
            top: "50%",
            WebkitTransform: "translate(-50%, -50%)",
            transform: "translate(-50%, -50%)",
          }}
        />
      </Page>
    );
  }

  return (
    <Page renderToolbar={renderToolbar}>
      <Page.RelativeContent>
        {!extra.rendering ? <Markup children={state.data} /> : <extra.rendering children={state.data} />}
      </Page.RelativeContent>
    </Page>
  );
}

export default FetchTextActivity;
