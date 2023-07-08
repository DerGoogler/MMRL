import { ProgressCircular } from "react-onsenui";
import { Markup } from "@Components/Markdown";
import { useActivity } from "@Hooks/useActivity";
import React from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Toolbar } from "@Components/onsenui/Toolbar";
import { Page } from "@Components/onsenui/Page";
import Ajv, { ErrorObject, JSONSchemaType } from "ajv";
import { ChangelogSchema, ChangelogTimeline } from "./components/Timeline";

const schema: JSONSchemaType<ChangelogSchema[]> = {
  type: "array",
  items: {
    type: "object",
    required: ["title", "version", "color", "changes"],
    items: {
      title: {
        type: "string",
      },
      color: {
        enum: ["inherit", "grey", "primary", "secondary", "error", "info", "success", "warning"],
      },
      version: {
        type: "string",
      },
      changes: {
        type: "array",
      },
    },
  },
  additionalProperties: false,
};

type Extra = {
  title: string;
  desc: string | undefined;
  request: { type: "text" | "json"; url: string } | undefined;
};

interface State<T> {
  data?: T;
  error?: Error;
}
type Cache<T> = { [url: string]: T };
type Action<T> = { type: "loading" } | { type: "fetched"; payload: T } | { type: "error"; payload: Error };

function ChangelogActivity() {
  const { context, extra } = useActivity<Extra>();
  const { desc, title, request } = extra;

  const initialState: State<ChangelogSchema[]> = {
    error: undefined,
    data: [],
  };

  // Keep state logic separated
  const fetchReducer = (state: State<ChangelogSchema[]>, action: Action<ChangelogSchema[]>): State<ChangelogSchema[]> => {
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

  if (request) {
    const url = request.url;
    const cache = React.useRef<Cache<ChangelogSchema[]>>({});

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

          const data = (await response.json()) as ChangelogSchema[];

          cache.current[url] = data;
          if (cancelRequest.current) return;

          if (request.type === "json") {
            const ajv = new Ajv(); // options can be passed, e.g. {allErrors: true}
            const validate = ajv.compile(schema);
            const valid = validate(data) as boolean;

            if (!valid) {
              throw new Error((validate as any).errors);
            }
          }

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
        <ChangelogTimeline data={state.data} />
      )}
    </Page>
  );
}

export default ChangelogActivity;
