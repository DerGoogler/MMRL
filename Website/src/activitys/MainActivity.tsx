import { Component } from "react";
import { Page, Toolbar, BackButton, RouterNavigator, RouterUtil } from "react-onsenui";
import MainApplication from "@Activitys/MainApplication";
import Constants from "@Native/Constants";
import NoRootActivity from "./NoRootActivity";
import Shell from "@Native/ShellBuilder";
import { Link } from "googlers-tools";

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
  activity?: any;
  key?: string;
  extra?: any;
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
          pushPage: (...args: [props: PushProps]) => this.pushPage.apply(null, args),
        },
      },
    ]);

    this.state = { routeConfig, currentPage: "main" };
  }

  private pushPage = (props: PushProps): void & PushProps => {
    const route = {
      component: props.activity,
      props: {
        key: props.key,
        extra: props?.extra,
        popPage: () => this.popPage(),
        pushPage: (...args: [props: PushProps]) => this.pushPage.apply(null, args),
      },
    };

    // Make an fake path. Note: The page should not refreshed!
    Link.setURL((set, currentPath) => {
      const acty = props.activity;
      const getName = () => {
        return acty.name.toLowerCase().replace("activity", "");
      };
      if (!acty.ignoreURL) {
        set(props.key, props.key!, `/#${currentPath}/${getName()}`);
      }
    });

    let routeConfig = this.state.routeConfig;

    routeConfig = RouterUtil.push({
      routeConfig,
      route,
    });

    this.setState({ routeConfig, currentPage: props.key! });
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

    // Remove fake path
    window.history.back();

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
