import React from "react";
import { Card, Page, RouterNavigator, RouterUtil } from "react-onsenui";
import MainApplication from "@Activitys/MainApplication";
import NoRootActivity from "./NoRootActivity";
import Shell from "@Native/Shell";
import { os } from "@Native/os";
import { RepoProvider } from "@Hooks/useRepos";
import { LanguageProvider } from "@Hooks/useLanguage";

import german from "./../language/de.json";
import english from "./../language/en.json";
import { Context, Extra, PushPropsCore } from "@Hooks/useActivity";
import { obj } from "googlers-tools";
import { ErrorBoundary } from "@Components/ErrorBoundary";
import ToolbarBuilder from "@Builders/ToolbarBuilder";

const MainActivity = () => {
  const CheckRoot = () => {
    if (os.isAndroid) {
      if (Shell.isAppGrantedRoot()) {
        return MainApplication;
      } else {
        return NoRootActivity;
      }
    } else {
      return MainApplication;
    }
  };

  const ignoreThat = RouterUtil.init([
    {
      component: CheckRoot(),
      props: {
        key: "main",
        context: {
          pushPage: (props: PushPropsCore) => pushPage(props),
        },
      },
    },
  ]);

  const [routeConfig, setRouteConfig] = React.useState(ignoreThat);
  const [currentPage, setCurrentPage] = React.useState("main");

  const pushPage = (props: PushPropsCore): void => {
    const route = {
      component: props.activity,
      props: {
        key: props.props.key,
        extra: props.props?.extra,
        context: {
          popPage: (options = {}) => popPage(options),
          pushPage: (props: PushPropsCore) => pushPage(props),
        },
      },
    };

    const options = {};

    setRouteConfig((prev) =>
      RouterUtil.push({
        routeConfig: prev,
        route: route,
        options: options,
        key: props.props.key,
      })
    );
    setCurrentPage(props.props.key!);
  };

  const popPage = (options = {}) => {
    setRouteConfig((prev) =>
      RouterUtil.pop({
        routeConfig: prev,
        options: {
          ...options,
          animationOptions: {
            duration: 0.2,
            timing: "ease-in",
            animation: "fade-md",
          },
        },
      })
    );

    setCurrentPage("main");
  };

  const onPostPush = () => {
    setRouteConfig((prev) => RouterUtil.postPush(prev));
  };

  const onPostPop = () => {
    setRouteConfig((prev) => RouterUtil.postPop(prev));
  };

  const renderPage = (route: any) => {
    const props = route.props || {};
    const newProps = obj.omit(["extra", "context"], props);
    return (
      <LanguageProvider langs={langs} defaultLang="en">
        <RepoProvider deps={[props.key + "_modules"]}>
          <Extra.Provider key={props.key + "_extra"} value={props.extra}>
            <Context.Provider key={props.key + "_context"} value={props.context}>
              <route.component {...newProps} />
            </Context.Provider>
          </Extra.Provider>
        </RepoProvider>
      </LanguageProvider>
    );
  };

  const langs = {
    de: german,
    en: english,
  };

  return (
    <ErrorBoundary
      fallback={(err, errInf) => {
        return (
          <Page
            renderToolbar={() => {
              return <ToolbarBuilder title="Crashed" />;
            }}
          >
            <Card>{err.message}</Card>
            <Card>{errInf.componentStack}</Card>
          </Page>
        );
      }}
    >
      <Page>
        <RouterNavigator
          swipeable={true}
          swipePop={(options: any) => popPage(options)}
          routeConfig={routeConfig}
          renderPage={renderPage}
          onPostPush={() => onPostPush()}
          onPostPop={() => onPostPop()}
        />
      </Page>
    </ErrorBoundary>
  );
};

export default MainActivity;
