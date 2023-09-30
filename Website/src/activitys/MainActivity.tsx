import { CloseRounded } from "@mui/icons-material";
import { useState } from "react";
import { RouterUtil } from "@Util/RouterUtil";
import { Context, Extra, IntentPusher } from "../hooks/useActivity";
import { obj } from "googlers-tools";
import { useSettings } from "@Hooks/useSettings";
import React from "react";
import { Button, Typography } from "@mui/material";
import { os } from "@Native/Os";
import { Shell } from "@Native/Shell";
import MainApplication from "./MainApplication";
import NoRootActivity from "./NoRootActivity";
import { ErrorBoundary } from "@Components/ErrorBoundary";
import Icon from "@Components/Icon";
import SettingsActivity from "./SettingsActivity";
import { Splitter } from "@Components/onsenui/Splitter";
import { RouterNavigator } from "@Components/onsenui/RouterNavigator";
import { DrawerFragment } from "./fragments/DrawerFragment";
import { Toolbar } from "@Components/onsenui/Toolbar";
import CodeRoundedIcon from "@mui/icons-material/CodeRounded";
import { Page } from "@Components/onsenui/Page";
import eruda from "eruda";

const MainActivity = (): JSX.Element => {
  const { settings } = useSettings();

  const [isSplitterOpen, setIsSplitterOpen] = useState(false);

  const hideSplitter = () => {
    setIsSplitterOpen(false);
  };

  const showSplitter = () => {
    setIsSplitterOpen(true);
  };

  const erudaRef = React.useRef<HTMLElement | null>(null);

  React.useEffect(() => {
    if (settings.eruda_console_enabled) {
      eruda.init({
        container: erudaRef.current as HTMLElement,
        tool: ["console", "elements", "resources", "info"],
      });
    } else {
      if ((window as any).eruda) {
        eruda.destroy();
      }
    }
  }, [settings.eruda_console_enabled]);

  React.useEffect(() => {
    if (!os.hasStoragePermission()) {
      os.requestStoargePermission();
    }
  }, []);

  const CheckRoot = () => {
    if (os.isAndroid) {
      // Shell.isAppGrantedRoot() doesn't work on KSU
      if (Shell.isSuAvailable()) {
        return MainApplication;
      } else {
        return NoRootActivity;
      }
    } else {
      return MainApplication;
    }
  };

  const pushContext = {
    pushPage: (props: IntentPusher) => pushPage(props),
    popPage: (options?: any) => popPage(options),
    splitter: {
      show: () => showSplitter(),
      hide: () => hideSplitter(),
      state: isSplitterOpen,
    },
  };

  const ignoreThat = RouterUtil.init([
    {
      route: {
        component: CheckRoot(),
        props: {
          key: "main",
        },
      },
      key: "main",
      props: {
        key: "main",
      },
      context: pushContext,
    },
  ]);

  const [routeConfig, setRouteConfig] = useState<any>(ignoreThat);

  const popPage = (options?: any) => {
    setRouteConfig((prev: any) =>
      RouterUtil.pop({
        routeConfig: prev,
        key: prev.key,
        options: {
          ...options,
          animationOptions: {
            duration: 0.2,
            timing: "ease-in",
            animation: "fade-md",
          },
        },
      } as any)
    );
  };

  const pushPage = <E, P>(props: IntentPusher<E, P>): void => {
    const route = {
      component: props.component,
      props: {
        key: props.key || props.component.name,
      },
    };

    const options = {};

    setRouteConfig((prev: any) =>
      RouterUtil.push({
        routeConfig: prev,
        route: route,
        options: options,
        key: props.component.name || props.key,
        props: props.props,
        context: pushContext,
        extra: props.extra ? props.extra : {},
      })
    );
  };

  const onPostPush = () => {
    setRouteConfig((prev: any) => RouterUtil.postPush(prev));
  };

  const onPostPop = () => {
    setRouteConfig((prev: any) => RouterUtil.postPop(prev));
  };

  const renderPage = (route: any, props: any) => {
    return (
      <ErrorBoundary fallback={fallback}>
        <route.component {...props} />
      </ErrorBoundary>
    );
  };

  const renderSpliterToolbar = () => {
    return (
      <>
        <Toolbar modifier="noshadow">
          <Toolbar.Center
            sx={{
              display: "flex",
              alignSelf: "center",
              alignItems: "center",
            }}
          >
            <CodeRoundedIcon sx={{ display: "flex", mr: 1 }} />
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{
                mr: 2,
                display: "flex",
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              MMRL
            </Typography>
          </Toolbar.Center>
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
        key: "settings",
      });
    };

    return (
      <Page
        ref={erudaRef}
        renderToolbar={() => {
          return (
            <Toolbar modifier="noshadow">
              <Toolbar.Center>We hit a brick!</Toolbar.Center>
            </Toolbar>
          );
        }}
      >
        <Page.RelativeContent>
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
        </Page.RelativeContent>
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
