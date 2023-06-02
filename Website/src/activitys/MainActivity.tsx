import { Component } from "react";
import { Page, RouterNavigator, RouterUtil } from "react-onsenui";
import MainApplication from "@Activitys/MainApplication";
import NoRootActivity from "./NoRootActivity";
import Shell from "@Native/Shell";
import { os } from "@Native/os";
import { RepoProvider } from "@Hooks/useRepos";
import { LanguageProvider } from "@Hooks/useLanguage";

import german from "./../language/de.json";
import english from "./../language/en.json";

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

  private langs = {
    de: german,
    en: english,
  };

  public render = () => {
    return (
      <>
        <LanguageProvider langs={this.langs} defaultLang="en">
          <RepoProvider>
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
          </RepoProvider>
        </LanguageProvider>
      </>
    );
  };
}

export default MainActivity;
