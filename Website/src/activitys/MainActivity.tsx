import { CloseRounded } from "@mui/icons-material";
import { useState } from "react";
import { RouterUtil } from "react-onsenui";
import { Context, Extra } from "../hooks/useActivity";
import { obj } from "googlers-tools";
import { useSettings } from "@Hooks/useSettings";
import React from "react";
import { Button } from "@mui/material";
import { os } from "@Native/Os";
import { Shell } from "@Native/Shell";
import MainApplication from "./MainApplication";
import NoRootActivity from "./NoRootActivity";
import { ErrorBoundary } from "@Components/ErrorBoundary";
import Icon from "@Components/Icon";
import SettingsActivity from "./SettingsActivity";
import { StyledSection } from "@Components/StyledSection";
import { Splitter } from "@Components/onsenui/Splitter";
import { RouterNavigator } from "@Components/onsenui/RouterNavigator";
import { DrawerFragment } from "./fragments/DrawerFragment";
import { Toolbar } from "@Components/onsenui/Toolbar";
import { Page } from "@Components/onsenui/Page";

const MainActivity = (): JSX.Element => {
  const { settings } = useSettings();

  const [isSplitterOpen, setIsSplitterOpen] = useState(false);

  const hideSplitter = () => {
    setIsSplitterOpen(false);
  };

  const showSplitter = () => {
    setIsSplitterOpen(true);
  };

  const url = React.useMemo(() => new URL(window.location.href), [window.location.href]);

  React.useEffect(() => {
    if (!os.hasStoragePermission()) {
      os.requestStoargePermission();
    }
  }, []);

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
          splitter: {
            show: () => showSplitter(),
            hide: () => hideSplitter(),
            state: isSplitterOpen,
          },
        },
      },
    },
  ]);

  const [routeConfig, setRouteConfig] = useState<any>(ignoreThat);

  const popPage = (options = {}) => {
    setRouteConfig((prev: any) => {
      console.log(prev);

      // if (prev.props.extra?.param) {
      //   url.searchParams.delete(prev.param.name);
      //   window.history.replaceState(null, null as unknown as string, url);
      // }
      return RouterUtil.pop({
        routeConfig: prev,
        options: {
          ...options,
          animationOptions: {
            duration: 0.2,
            timing: "ease-in",
            animation: "fade-md",
          },
        },
      });
    });
  };

  const pushPage = (props: PushPropsCore): void => {
    const route = {
      component: props.component,

      props: {
        key: props.props.key,
        extra: props.props.extra ? props.props.extra : {},

        context: {
          popPage: (options = {}) => popPage(options),
          pushPage: (props: PushPropsCore) => pushPage(props),
          splitter: {
            show: () => showSplitter(),
            hide: () => hideSplitter(),
            state: isSplitterOpen,
          },
        },
      },
    };

    const options = {};

    setRouteConfig((prev: any) => {
      if (props.props.extra?.param) {
        url.searchParams.set(props.props.extra.param.name, props.props.extra.param.value);
        window.history.replaceState(null, null as unknown as string, url);
      }

      return RouterUtil.push({
        routeConfig: prev,
        route: route,
        options: options,
        key: props.props.key,
      });
    });
  };

  const onPostPush = () => {
    setRouteConfig((prev: any) => RouterUtil.postPush(prev));
  };

  const onPostPop = () => {
    setRouteConfig((prev: any) => RouterUtil.postPop(prev));
  };

  const renderPage = (route: any) => {
    const props = route.props || {};
    const newProps = obj.omit(["extra", "context"], props);
    return (
      <ErrorBoundary fallback={fallback}>
        <Extra.Provider key={props.key + "_extra"} value={props.extra}>
          <Context.Provider key={props.key + "_context"} value={props.context}>
            <route.component {...newProps} />
          </Context.Provider>
        </Extra.Provider>
      </ErrorBoundary>
    );
  };

  const renderSpliterToolbar = () => {
    return (
      <>
        <Toolbar modifier="noshadow">
          <Toolbar.Center>MMRL</Toolbar.Center>
          <Toolbar.Right>
            <Toolbar.Button onClick={hideSplitter}>
              <Icon icon={CloseRounded} keepLight />
            </Toolbar.Button>
          </Toolbar.Right>
        </Toolbar>
      </>
    );
  };

  const fallback = (error: Error, errorInfo: React.ErrorInfo, resetErrorBoundary) => {
    const style = {
      backgroundColor: "#ebeced",
      borderRadius: 6,
      lineHeight: 1.45,
      overflow: "auto",
      padding: 16,
    };

    const handleOpenSettings = () => {
      pushPage({
        component: SettingsActivity,
        props: {
          key: "settings",
          extra: {},
        },
      });
    };

    return (
      <Page
        renderToolbar={() => {
          return (
            <Toolbar modifier="noshadow">
              <Toolbar.Center>We hit a brick!</Toolbar.Center>
            </Toolbar>
          );
        }}
      >
        <StyledSection>
          <pre style={style}>
            <span>{error.message}</span>
          </pre>

          <Button fullWidth variant="contained" disableElevation onClick={resetErrorBoundary}>
            Try again
          </Button>
          <Button style={{ marginTop: 16 }} fullWidth variant="contained" disableElevation onClick={handleOpenSettings}>
            Open settings
          </Button>

          <pre style={style}>
            <code>{errorInfo.componentStack}</code>
          </pre>
        </StyledSection>
      </Page>
    );
  };

  return (
    <Page>
      <Splitter>
        <Splitter.Side
          side="left"
          width={250}
          collapse={true}
          swipeable={false}
          isOpen={isSplitterOpen}
          onClose={hideSplitter}
          onOpen={showSplitter}
        >
          <DrawerFragment renderToolbar={renderSpliterToolbar} hideSplitter={hideSplitter} pushPage={pushPage} />
        </Splitter.Side>
        <Splitter.Content>
          <RouterNavigator
            swipeable={true}
            swipePop={(options: any) => popPage(options)}
            routeConfig={routeConfig}
            renderPage={renderPage}
            onPostPush={() => onPostPush()}
            onPostPop={() => onPostPop()}
          />
        </Splitter.Content>
      </Splitter>
    </Page>
  );
};

export { MainActivity };
