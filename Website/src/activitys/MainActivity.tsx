import { CloseRounded } from "@mui/icons-material";
import { useState } from "react";
import { RouterUtil } from "@Util/RouterUtil";
import { IntentPusher } from "../hooks/useActivity";
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
import { useTheme } from "@Hooks/useTheme";
import Pre from "@Components/dapi/Pre";
import Code from "@Components/dapi/Code";

import pkg from "@Package";
import UnverifiedHostActivity from "./UnverifiedHostActivity";
import { useModFS } from "@Hooks/useModFS";
import { SuFile } from "@Native/SuFile";
import { LogcatActivity } from "./LogcatActivity";
import { view } from "@Native/View";

const getLocation = () => {
  if (window.location !== window.parent.location) {
    return window.parent.location;
  } else if (window.self !== window.top && window.top) {
    return window.top.location;
  } else {
    return window.location;
  }
};

const CheckRoot = () => {
  if (pkg.config.verified_hosts.some((e) => new RegExp(e[0], e[1]).test(getLocation().hostname))) {
    if (os.isAndroid) {
      // Shell.isAppGrantedRoot() doesn't work on KSU
      if (Shell.isSuAvailable()) {
        return React.memo(MainApplication);
      } else {
        return React.memo(NoRootActivity);
      }
    } else {
      return React.memo(MainApplication);
    }
  } else {
    return React.memo(UnverifiedHostActivity);
  }
};

const MainActivity = (): JSX.Element => {
  const { settings } = useSettings();
  const { theme } = useTheme();
  const { modFS } = useModFS();

  const [isSplitterOpen, setIsSplitterOpen] = useState(false);

  const hideSplitter = () => {
    setIsSplitterOpen(false);
  };

  const showSplitter = () => {
    setIsSplitterOpen(true);
  };

  const erudaRef = React.useRef<HTMLElement | null>(null);

  const _eruda = React.useMemo(() => eruda, [settings.eruda_console_enabled]);

  React.useEffect(() => {
    if (settings.eruda_console_enabled) {
      _eruda.init({
        container: erudaRef.current as HTMLElement,
        tool: ["console", "elements", "resources", "info"],
      });
    } else {
      if ((window as any).eruda) {
        _eruda.destroy();
      }
    }
  }, [settings.eruda_console_enabled]);

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
      component: !props.noMemo ? React.memo(props.component) : props.component,
      props: {
        key: props.component.name || props.key,
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
      backgroundColor: theme.palette.background.paper,
      color: theme.palette.text.primary,
      borderRadius: theme.shape.borderRadius / theme.shape.borderRadius,
      lineHeight: 1.45,
      overflow: "auto",
      padding: 2,
    };

    const handleOpenSettings = () => {
      pushPage({
        component: SettingsActivity,
        key: "SettingsActivity",
      });
    };

    const handleOpenLogcat = () => {
      pushPage({
        component: LogcatActivity,
        key: "LogcatActivity",
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
          <Pre sx={style}>
            <Code>{error.message}</Code>
          </Pre>

          <Button fullWidth variant="contained" disableElevation onClick={resetErrorBoundary}>
            Try again
          </Button>
          <Button sx={{ mt: 2 }} fullWidth variant="contained" disableElevation onClick={handleOpenSettings}>
            Open settings
          </Button>
          {os.isAndroid && (
            <Button sx={{ mt: 2 }} fullWidth variant="contained" disableElevation onClick={handleOpenLogcat}>
              Open Logcat
            </Button>
          )}

          <Pre sx={style}>
            <Code>{errorInfo.componentStack}</Code>
          </Pre>
        </Page.RelativeContent>
      </Page>
    );
  };

  return (
    <Page
      onInit={() => {
        const mmrlFolder = new SuFile(`${modFS("ADB")}/mmrl`);

        if (!mmrlFolder.exist()) {
          mmrlFolder.create(SuFile.NEW_FOLDERS);
        }
      }}
    >
      <Splitter>
        <Splitter.Side
          side="left"
          sx={{
            borderColor: theme.palette.menuoutline,
            borderStyle: "solid",
            borderLeft: "0px",
            borderWidth: "1px",
            borderRadius: `0px ${theme.shape.borderRadius}px ${theme.shape.borderRadius}px 0px`,
            mt: `calc(${view.getWindowTopInsets() || 8}px + 0.5% - 2px)`,
            mb: `calc(${view.getWindowBottomInsets() || 8}px + 0.5% - 2px)`,
            ".page--material": {
              borderRadius: `0px ${theme.shape.borderRadius}px ${theme.shape.borderRadius}px 0px`,
            },
          }}
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
