import { os } from "@Native/os";
import SharedPreferences from "@Native/SharedPreferences";
import { CSSProperties } from "react";
import { isMobile } from "react-device-detect";
import ViewX from "./ViewX";

/**
 * ContentBody is an optional component, to make the view better on desktop
 */
class ContentBody extends ViewX {
  private stlye: CSSProperties = {
    boxSizing: "border-box",
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    minWidth: "200px",
    maxWidth: "580px",
    margin: "0px auto",
    padding: isMobile ? "" : "45px",
    ...this.props.style,
  };

  private checkDevice(designWeb: any, designAndroid: any) {
    if (os.isAndroid) {
      return designAndroid;
    } else {
      return designWeb;
    }
  }

  public createView(): JSX.Element {
    return (
      <content-body
        className={
          this.props.className === "markdownBody"
            ? SharedPreferences.getBoolean("enableDarkmode_switch", false)
              ? "markdown-body-dark"
              : "markdown-body-light"
            : this.props.className
        }
        style={this.checkDevice({ padding: isMobile ? "" : "16px" }, {})}
      >
        <content-body-inner style={this.checkDevice(this.stlye, {})}>{this.props.children}</content-body-inner>
      </content-body>
    );
  }
}

export default ContentBody;
