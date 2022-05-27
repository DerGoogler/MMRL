import * as React from "react";
import { Page, Toolbar, BackButton, RouterNavigator, RouterUtil } from "react-onsenui";
import MainApplication from "@Activitys/MainApplication";
import ExploreModuleFragment from "./MainApplication";
import Constants from "@Native/Constants";

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

class MainActivity extends React.Component<PushProps, States> {
  public constructor(props: PushProps | Readonly<PushProps>) {
    super(props);
    const routeConfig = RouterUtil.init([
      {
        //component: MainApplication,
        component: MainApplication,
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
            android.close();
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

    this.setState({ routeConfig });
    this.setState({ currentPage: "main" });
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
      // @ts-ignore
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
            // @ts-ignore
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
