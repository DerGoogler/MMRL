import Toolbar from "@Builders/ToolbarBuilder";
import ErrorBoundary from "@Components/ErrorBoundary";
import Constants from "@Native/Constants";
import { os } from "@Native/os";
import SharedPreferences from "@Native/SharedPreferences";
import { Context, createContext, CSSProperties } from "react";
import { ActivityX, Page } from "react-onsenuix";

export const AppCompatActivityContext: Context<string> = createContext("null");

class AppCompatActivity<P = {}, S = {}, SS = any> extends ActivityX<P, S, SS> {
  public readonly isAndroid: bool = Constants.isAndroid;

  private darkColor: string = "#1f1f1f";
  private lightColor: string = "#4a148c";

  public static contextType: Context<string> = AppCompatActivityContext;

  public constructor(props: P | Readonly<P>) {
    super(props);
    this.onlyAndroid();

    window["onBackButton"] = new Event("onBackButton");

    this.onCreate = this.onCreate.bind(this);
    this.onCreateToolbar = this.onCreateToolbar.bind(this);
  }

  public onBackButton(): void {}

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
    os.addNativeEventListener("onBackButton", this.onBackButton);
    this.onlyAndroid();
  }

  public componentDidUpdate(): void {
    this.onlyAndroid();
  }

  public componentWillUnmount(): void {
    os.removeNativeEventListener("onBackButton", this.onBackButton);
  }

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
   * Renders the Toolbar
   */
  public onCreateToolbar(): Toolbar.Props | any {
    return {
      title: "Default",
    };
  }

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
            <this.onCreate p={this.props} s={this.state} />
          </Page>
        </ErrorBoundary>
      </AppCompatActivityContext.Provider>
    );
  };
}

export default AppCompatActivity;
