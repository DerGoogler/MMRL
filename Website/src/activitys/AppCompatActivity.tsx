import Toolbar from "@Builders/ToolbarBuilder";
import ContentBody from "@Components/ContentBody";
import ErrorBoundary from "@Components/ErrorBoundary";
import Constants from "@Native/Constants";
import Log from "@Native/Log";
import { os } from "@Native/os";
import SharedPreferences from "@Native/SharedPreferences";
import { Context, createContext, CSSProperties, ErrorInfo, PureComponent } from "react";
import { Page } from "react-onsenui";

export const AppCompatActivityContext: Context<string> = createContext("null");

class AppCompatActivity<P = {}, S = {}, SS = any> extends PureComponent<P, S, SS> {
  public readonly isAndroid: bool = Constants.isAndroid;

  private darkColor: string = "#1f1f1f";
  private lightColor: string = "#4a148c";

  public static contextType: Context<string> = AppCompatActivityContext;

  public constructor(props: P | Readonly<P>) {
    super(props);
    this.onlyAndroid();
  }

  private onlyAndroid(): void {
    os.setStatusBarColor(this.setStatusbarColor(), false);
    if (SharedPreferences.getBoolean("enableBottomTabs_switch", false)) {
      if (SharedPreferences.getBoolean("enableDarkmode_switch", false)) {
        os.setNavigationBarColor(this.darkColor);
      } else {
        os.setNavigationBarColor(this.lightColor);
      }
    }
  }

  /**
   * Set an custom style for centent-body
   */
  public style: CSSProperties = {};

  public componentDidMount(): void {
    this.onlyAndroid();
  }

  public componentDidUpdate(): void {
    this.onlyAndroid();
  }

  public componentWillUnmount(): void {}

  /**
   * Sets an custom status bar color for the activity
   */
  public setStatusbarColor(): string {
    if (SharedPreferences.getBoolean("enableDarkmode_switch", false)) {
      return this.darkColor;
    } else {
      return this.lightColor;
    }
  }

  /**
   * Creates the activity
   */
  public onCreate(): JSX.Element {
    return <></>;
  }

  /**
   * Renders the Toolbar
   */
  public onCreateToolbar(): Toolbar.Props {
    return {
      title: "Default",
    };
  }

  public onCreateModal(): JSX.Element {
    return <></>;
  }

  public onCreateBottomToolbar(): JSX.Element {
    return <></>;
  }

  public onCreateFAB(): JSX.Element {
    return <></>;
  }

  public onInit(): void {}

  public onShow(): void {}

  public onHide(): void {}

  public onInfiniteScroll(): void {}

  public get pageModifier(): string {
    return "";
  }

  /**
   * @deprecated
   */
  public render = (): JSX.Element => {
    return (
      <AppCompatActivityContext.Provider value="new null">
        <ErrorBoundary logger={this.constructor.name}>
          <Page
            modifier={this.pageModifier}
            renderBottomToolbar={this.onCreateBottomToolbar}
            renderFixed={this.onCreateFAB}
            renderModal={this.onCreateModal}
            onInfiniteScroll={this.onInfiniteScroll}
            onHide={this.onHide}
            onShow={this.onShow}
            onInit={this.onInit}
            renderToolbar={() => {
              return <Toolbar.Builder {...this.onCreateToolbar()} />;
            }}
          >
            <ContentBody style={this.style}>
              <this.onCreate />
            </ContentBody>
          </Page>
        </ErrorBoundary>
      </AppCompatActivityContext.Provider>
    );
  };
}

export default AppCompatActivity;
