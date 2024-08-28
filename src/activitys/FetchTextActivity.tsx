import { ProgressCircular } from "react-onsenui";
import { Markup } from "@Components/Markdown";
import { useActivity } from "@Hooks/useActivity";
import React from "react";
import { Toolbar } from "@Components/onsenui/Toolbar";
import { Page } from "@Components/onsenui/Page";
import { useNetwork } from "@Hooks/useNetwork";
import { MissingInternet } from "@Components/MissingInternet";
import { useFetch } from "@Hooks/useFetch";

export type FetchTextActivityExtra = {
  rendering?: React.FunctionComponent<any> | React.ComponentType<any>;
  modulename?: string;
  title?: string;
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
  const { title, modulename, url } = extra;

  const [data] = useFetch<string>(url, {
    type: "text",
  });

  const state = data || extra.raw_data;

  const renderToolbar = () => {
    return (
      <Toolbar modifier="noshadow">
        <Toolbar.Left>
          <Toolbar.BackButton onClick={context.popPage} />
        </Toolbar.Left>
        <Toolbar.Center>{title || modulename}</Toolbar.Center>
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

  if (!state) {
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
      <Page.RelativeContent>{!extra.rendering ? <Markup children={state} /> : <extra.rendering children={state} indexFile="index.txt" />}</Page.RelativeContent>
    </Page>
  );
}

export default FetchTextActivity;
