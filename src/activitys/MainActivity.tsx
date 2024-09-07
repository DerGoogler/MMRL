import { Code } from "@Components/dapi/Code";
import { Pre } from "@Components/dapi/Pre";
import { ErrorBoundary } from "@Components/ErrorBoundary";
import Icon from "@Components/Icon";
import { Page } from "@Components/onsenui/Page";
import { RouterNavigator } from "@Components/onsenui/RouterNavigator";
import { Splitter } from "@Components/onsenui/Splitter";
import { Toolbar } from "@Components/onsenui/Toolbar";
import { useSettings } from "@Hooks/useSettings";
import { useTheme } from "@Hooks/useTheme";
import { CloseRounded } from "@mui/icons-material";
import CodeRoundedIcon from "@mui/icons-material/CodeRounded";
import { Button, Typography } from "@mui/material";
import { os } from "@Native/Os";
import { Shell } from "@Native/Shell";
import { RouterUtil } from "@Util/RouterUtil";
import eruda from "eruda";
import React, { useState } from "react";
import { IntentPusher } from "../hooks/useActivity";
import { DrawerFragment } from "./fragments/DrawerFragment";
import MainApplication from "./MainApplication";
import NoRootActivity from "./NoRootActivity";
import SettingsActivity from "./SettingsActivity";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useModFS } from "@Hooks/useModFS";
import { useStrings } from "@Hooks/useStrings";
import { SuFile } from "@Native/SuFile";
import pkg from "@Package";
import { LogcatActivity } from "./LogcatActivity";
import UnverifiedHostActivity from "./UnverifiedHostActivity";
import { LandingActivity } from "./LandingActivity";
import { ModulesQueue } from "@Components/ModulesQueue";

const getLocation = () => {
  if (window.location !== window.parent.location) {
    return window.parent.location;
  } else if (window.self !== window.top && window.top) {
    return window.top.location;
  } else {
    return window.location;
  }
};

const useCheckRoot = () => {
  const [landing] = useSettings("landingEnabled");

  return React.useMemo(() => {
    if (pkg.config.verified_hosts.some((e) => new RegExp(e[0], e[1]).test(getLocation().hostname))) {
      if (os.isAndroid) {
        // Shell.isAppGrantedRoot() doesn't work on KSU
        if (Shell.isSuAvailable()) {
          return React.memo(MainApplication);
        } else {
          return React.memo(NoRootActivity);
        }
      } else {
        if (landing) {
          return React.memo(LandingActivity);
        } else {
          return React.memo(MainApplication);
        }
      }
    } else {
      return React.memo(UnverifiedHostActivity);
    }
  }, []);
};

const MainActivity = (): JSX.Element => {
  const { strings } = useStrings();
  const { theme } = useTheme();
  const { modFS } = useModFS();
  const InitialActivity = useCheckRoot();

  const [isSplitterOpen, setIsSplitterOpen] = useState(false);

  const hideSplitter = () => {
    setIsSplitterOpen(false);
  };

  const showSplitter = () => {
    setIsSplitterOpen(true);
  };

  const [erudaConsoleEnabled] = useSettings("eruda_console_enabled");

  const erudaRef = React.useRef<HTMLElement | null>(null);

  const _eruda = React.useMemo(() => eruda, [erudaConsoleEnabled]);

  React.useEffect(() => {
    if (erudaConsoleEnabled) {
      _eruda.init({
        container: erudaRef.current as HTMLElement,
        tool: ["console", "elements", "resources", "info"],
      });
    } else {
      if ((window as any).eruda) {
        _eruda.destroy();
      }
    }
  }, [erudaConsoleEnabled]);

  const pushContext = {
    pushPage: (props: IntentPusher) => pushPage(props),
    popPage: (options?: any) => popPage(options),
    replacePage: (props: IntentPusher) => replacePage(props),
    splitter: {
      show: () => showSplitter(),
      hide: () => hideSplitter(),
      state: isSplitterOpen,
    },
  };

  const ignoreThat = RouterUtil.init([
    {
      route: {
        component: InitialActivity,
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

  const replacePage = <E, P>(props: IntentPusher<E, P>): void => {
    const route = {
      component: !props.noMemo ? React.memo(props.component) : props.component,
      props: {
        key: props.key,
      },
    };

    const options = {};

    setRouteConfig((prev: any) =>
      RouterUtil.replace({
        routeConfig: prev,
        route: route,
        options: options,
        key: props.key,
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
              <Toolbar.Center>{strings("we_hit_a_brick")}</Toolbar.Center>
            </Toolbar>
          );
        }}
      >
        <Page.RelativeContent>
          <Pre sx={style}>
            <Code>{error.message}</Code>
          </Pre>

          <Button fullWidth variant="contained" disableElevation onClick={resetErrorBoundary}>
            {strings("try_again")}
          </Button>
          <Button sx={{ mt: 2 }} fullWidth variant="contained" disableElevation onClick={handleOpenSettings}>
            {strings("open_settings")}
          </Button>
          {os.isAndroid && (
            <Button sx={{ mt: 2 }} fullWidth variant="contained" disableElevation onClick={handleOpenLogcat}>
              {strings("open_logcat")}
            </Button>
          )}

          <Pre sx={style}>
            <Code>{errorInfo.componentStack}</Code>
          </Pre>
        </Page.RelativeContent>
      </Page>
    );
  };

  const matches = useMediaQuery("(max-width: 767px)");

  return (
    <ModulesQueue context={pushContext as any}>
      <Page
        onInit={() => {
          const mmrlFolder = new SuFile(modFS("MMRLFOL"));

          if (Shell.isSuAvailable() && !mmrlFolder.exist()) {
            mmrlFolder.create(SuFile.NEW_FOLDERS);
          }
        }}
      >
        <Splitter>
          <Splitter.Side
            side="left"
            width={matches ? "calc(100% - 21%)" : "25%"}
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
    </ModulesQueue>
  );
};

export { MainActivity };
