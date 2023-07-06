import { ProgressCircular } from "react-onsenui";
import { Markup } from "@Components/Markdown";
import { useActivity } from "@Hooks/useActivity";
import React from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Toolbar } from "@Components/onsenui/Toolbar";
import { Page } from "@Components/onsenui/Page";

type Extra = { title: string; desc: string | undefined; request: { use: boolean; url: string } | undefined };
interface State<T> {
  data?: T;
  error?: Error;
}
type Cache<T> = { [url: string]: T };
type Action<T> = { type: "loading" } | { type: "fetched"; payload: T } | { type: "error"; payload: Error };

function DescriptonActivity() {
  const { context, extra } = useActivity<Extra>();
  const { desc, title, request } = extra;

  const initialState: State<string> = {
    error: undefined,
    data: desc,
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

  if (request?.use) {
    const url = request.url;
    const cache = React.useRef<Cache<string>>({});

    // Used to prevent state update if the component is unmounted
    const cancelRequest = React.useRef<boolean>(false);

    React.useEffect(() => {
      // Do nothing if the url is not given
      if (!url) return;

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
  }

  const renderToolbar = () => {
    return (
      <Toolbar modifier="noshadow">
        <Toolbar.Left>
          <Toolbar.Button icon={ArrowBackIcon} onClick={context.popPage} />
        </Toolbar.Left>
        <Toolbar.Center>{title}</Toolbar.Center>
      </Toolbar>
    );
  };

  return (
    <Page renderToolbar={renderToolbar}>
      {!state.data ? (
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
      ) : (
        <Markup children={state.data} />
      )}
    </Page>
  );
}

export default DescriptonActivity;
