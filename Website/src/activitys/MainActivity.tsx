import { Component } from "react";
import { Page, Toolbar, BackButton, RouterNavigator, RouterUtil } from "react-onsenui";
import MainApplication from "@Activitys/MainApplication";
import Constants from "@Native/Constants";
import NoRootActivity from "./NoRootActivity";
import Shell from "@Native/ShellBuilder";

interface ModuleOptions {
  verified?: boolean;
  low?: boolean;
}

export interface ModuleProps {
  minMagisk?: int;
  minApi?: int;
  maxApi?: int;
  needRamdisk?: boolean;
  changeBoot?: boolean;
  alphaMMRLinstall?: boolean;
}

export interface PushProps {
  activity?: JSX.Element | any;
  key?: any;
  extras?: any;
  moduleOptions?: ModuleOptions;
  moduleProps?: ModuleProps;
}

interface States {
  currentPage: string;
  routeConfig: any;
}

class MainActivity extends Component<PushProps, States> {
  public constructor(props: PushProps | Readonly<PushProps>) {
    super(props);

    const CheckRoot = () => {
      if (Constants.isAndroid) {
        if (Shell.isAppGrantedRoot()) {
          return MainApplication;
        } else {
          return NoRootActivity;
        }
      } else {
        return MainApplication;
      }
    };

    const routeConfig = RouterUtil.init([
      {
        component: CheckRoot(),
        props: {
          key: "main",
          pushPage: (...args: any) => this.pushPage.apply(null, args),
        },
      },
    ]);

    this.state = { routeConfig, currentPage: "main" };
  }

  public componentDidMount = () => {
    window.addEventListener("load", this.windowLoadPush);
  };

  public componentWillUnmount = () => {
    window.removeEventListener("load", this.windowLoadPush);
  };

  private windowLoadPush = () => {
    if (typeof history.pushState === "function") {
      history.pushState("jibberish", "", null);
      window.onpopstate = () => {
        history.pushState("newjibberish", "", null);
        if (this.state.currentPage === "main") {
          if (Constants.isAndroid) {
            nos.close();
          }
        } else {
          this.popPage();
        }
      };
    } else {
      var ignoreHashChange = true;
      window.onhashchange = () => {
        if (!ignoreHashChange) {
          ignoreHashChange = true;
          window.location.hash = Math.random().toString();
        } else {
          ignoreHashChange = false;
        }
      };
    }
  };

  private pushPage = (props: any) => {
    const route = {
      component: props.activity,
      props: {
        key: props.key,
        extra: props?.extra,
        popPage: () => this.popPage(),
        pushPage: (...args: any) => this.pushPage.apply(null, args),
      },
    };

    let routeConfig = this.state.routeConfig;

    routeConfig = RouterUtil.push({
      routeConfig,
      route,
    });

    this.setState({ routeConfig, currentPage: props.key });
  };

  private popPage = (options = {}) => {
    let routeConfig = this.state.routeConfig;

    routeConfig = RouterUtil.pop({
      routeConfig,
      options: {
        ...options,
        animationOptions: {
          duration: 0.2,
          timing: "ease-in",
          animation: "fade-md",
        },
      },
    });

    this.setState({ routeConfig, currentPage: "main" });
  };

  private onPostPush = () => {
    const routeConfig = RouterUtil.postPush(this.state.routeConfig);
    this.setState({ routeConfig });
  };

  private onPostPop = () => {
    const routeConfig = RouterUtil.postPop(this.state.routeConfig);
    this.setState({ routeConfig });
  };

  private renderPage = (route: any) => {
    const props = route.props || {};
    return <route.component {...props} />;
  };

  private renderToolbar = () => {
    return (
      <Toolbar>
        <div className="left">
          <BackButton />
        </div>
        <div className="center">Stateless Navigator</div>
      </Toolbar>
    );
  };

  public render = () => {
    return (
      <>
        <Page>
          <RouterNavigator
            swipeable={true}
            swipePop={(options: any) => this.popPage(options)}
            routeConfig={this.state.routeConfig}
            renderPage={this.renderPage}
            onPostPush={() => this.onPostPush()}
            onPostPop={() => this.onPostPop()}
          />
        </Page>
      </>
    );
  };
}

export default MainActivity;
