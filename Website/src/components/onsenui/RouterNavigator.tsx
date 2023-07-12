import React from "react";
import ReactDOM from "react-dom";
import "onsenui/esm/elements/ons-navigator";
import onsCustomElement from "@Util/onsCustomElement";

interface HTMLNavigator {
  renderPage: (route: object) => JSX.Element;
  routeConfig: {
    routeStack: any[];
    processStack: any[];
  };
  onPrePush?: Function;
  onPostPush?: Function;
  onPrePop?: Function;
  onPostPop?: Function;
  animation?: string;
  animationOptions?: object;
  swipeable?: boolean | string;
  swipePop?: Function;
  onDeviceBackButton?: Function;
}

interface HTMLNavigatorClass extends HTMLNavigator {
  innerRef: any;
}

interface State {
  internalStack: any[];
  currentStack: any;
}

type Noop = () => void;

const HTMLNavigator = onsCustomElement<HTMLElement, Partial<HTMLNavigator>>("ons-navigator");

class RouterNavigatorClass extends React.Component<HTMLNavigatorClass, State> {
  private cancelUpdate: boolean;
  private ref: React.RefObject<any>;
  private onPrePush: (event: any) => any;
  private onPostPush: (event: any) => any;
  private onPrePop: (event: any) => any;
  private onPostPop: (event: any) => any;
  private _url: URL;

  public constructor(props: HTMLNavigatorClass | Readonly<HTMLNavigatorClass>) {
    super(props);

    this.cancelUpdate = false;

    const callback = (name, event) => {
      if (this.props[name]) {
        return this.props[name](event);
      }
    };
    this.onPrePush = callback.bind(this, "onPrePush");
    this.onPostPush = callback.bind(this, "onPostPush");
    this.onPrePop = callback.bind(this, "onPrePop");
    this.onPostPop = callback.bind(this, "onPostPop");

    this.ref = React.createRef();

    this._url = new URL(window.location.href);

    this.state = {
      internalStack: [],
      currentStack: {},
    };
  }

  private update(cb?: () => void) {
    if (!this.cancelUpdate) {
      this.setState({}, cb);
    }
  }

  private resetPageStack(routes: object[], options = {}) {
    if (this.isRunning()) {
      return;
    }

    const update = () => {
      return new Promise((resolve) => {
        this.setState({ internalStack: [...this.state.internalStack, routes[routes.length - 1]] }, resolve as Noop);
      });
    };

    return this.ref.current._pushPage(options, update).then(() => {
      this.setState({ internalStack: [...routes] });
    });
  }

  private pushPage(route: any, options = {}) {
    if (this.isRunning()) {
      return;
    }

    const update = () => {
      return new Promise((resolve) => {
        if (route.props.extra?.param) {
          this._url.searchParams.set(route.props.extra.param.name, route.props.extra.param.value);
          window.history.replaceState(null, null as unknown as string, this._url);
        }
        this.setState({ internalStack: [...this.state.internalStack, route], currentStack: route }, resolve as Noop);
      });
    };

    return this.ref.current._pushPage(options, update);
  }

  private isRunning() {
    return this.ref.current._isRunning;
  }

  private replacePage(route: object, options = {}) {
    if (this.isRunning()) {
      return;
    }

    const update = () => {
      return new Promise((resolve) => {
        this.setState({ internalStack: [...this.state.internalStack, route] }, resolve as Noop);
      });
    };

    return this.ref.current._pushPage(options, update).then(() => {
      this.setState({ internalStack: [...this.state.internalStack.slice(0, -2), route] });
    });
  }

  private popPage(options = {}) {
    if (this.isRunning()) {
      return;
    }

    const update = () => {
      return new Promise((resolve) => {
        ReactDOM.flushSync(() => {
          // prevents flickering caused by React 18 batching
          const route = this.state.currentStack;
          if (route.props.extra?.param) {
            this._url.searchParams.delete(route.props.extra?.param.name);
            window.history.replaceState(null, null as unknown as string, this._url);
          }
          this.setState({ internalStack: this.state.internalStack.slice(0, -1) }, resolve as Noop);
        });
      });
    };

    return this.ref.current._popPage(options, update);
  }

  private _onDeviceBackButton(event?: any) {
    if (this.props.routeConfig.routeStack.length > 1) {
      this.popPage();
    } else {
      event.callParentHandler();
    }
  }

  public componentDidMount() {
    const node = this.ref.current;

    this.cancelUpdate = false;

    node.addEventListener("prepush", this.onPrePush);
    node.addEventListener("postpush", this.onPostPush);
    node.addEventListener("prepop", this.onPrePop);
    node.addEventListener("postpop", this.onPostPop);

    if (!this.props.routeConfig) {
      throw new Error("In RouterNavigator the property routeConfig needs to be set");
    }

    node.swipeMax = this.props.swipePop;
    node.onDeviceBackButton = this.props.onDeviceBackButton || this._onDeviceBackButton.bind(this);

    this.setState({ internalStack: this.props.routeConfig.routeStack });
  }

  public componentWillUnmount() {
    const node = this.ref.current;
    node.removeEventListener("prepush", this.onPrePush);
    node.removeEventListener("postpush", this.onPostPush);
    node.removeEventListener("prepop", this.onPrePop);
    node.removeEventListener("postpop", this.onPostPop);
    this.cancelUpdate = true;
  }

  public componentDidUpdate(prevProps: Readonly<HTMLNavigator>) {
    if (this.props.onDeviceBackButton !== undefined) {
      this.ref.current.onDeviceBackButton = this.props.onDeviceBackButton;
    }

    const processStack = [...this.props.routeConfig.processStack];

    /**
     * Fix for Redux Timetravel.
     */
    if (
      prevProps.routeConfig.processStack.length < this.props.routeConfig.processStack.length &&
      prevProps.routeConfig.routeStack.length > this.props.routeConfig.routeStack.length
    ) {
      return;
    }

    if (processStack.length > 0) {
      const { type, route, options } = processStack[0];

      switch (type) {
        case "push":
          this.pushPage(route, options);
          break;
        case "pop":
          this.popPage(options);
          break;
        case "reset":
          if (Array.isArray(route)) {
            this.resetPageStack(route, options);
          } else {
            this.resetPageStack([route], options);
          }
          break;
        case "replace":
          this.replacePage(route, options);
          break;
        default:
          throw new Error(`Unknown type ${type} in processStack`);
      }
    }
  }

  public render() {
    const {
      innerRef,
      renderPage,

      // these props should not be passed down
      onPrePush,
      onPostPush,
      onPrePop,
      onPostPop,
      swipePop,
      onDeviceBackButton,

      ...rest
    } = this.props;

    const pagesToRender = this.state.internalStack.map((route) => renderPage(route));

    if (innerRef && innerRef !== this.ref) {
      this.ref = innerRef;
    }

    return <HTMLNavigator {...rest} ref={this.ref} children={pagesToRender} />;
  }
}

const _RouterNavigator = React.forwardRef<HTMLElement, HTMLNavigator>((props, ref) => <RouterNavigatorClass innerRef={ref} {...props} />);

const RouterNavigator = Object.assign(_RouterNavigator, {});

export { RouterNavigator };
