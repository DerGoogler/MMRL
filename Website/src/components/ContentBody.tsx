import { os } from "@Native/os";
import SharedPreferences from "@Native/SharedPreferences";
import * as React from "react";
import { CSSProperties } from "react";
import { isMobile } from "react-device-detect";

/**
 * ContentBody is an optional component, to make the view better on desktop
 */
class ContentBody extends React.Component<React.HTMLAttributes<Element>, Element> {
  private stlye: CSSProperties = {
    boxSizing: "border-box",
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    minWidth: "200px",
    maxWidth: "580px",
    margin: "0px auto",
    padding: isMobile ? "" : "45px",
  };

  private checkDevice(designWeb: any, designAndroid: any) {
    if (os.isAndroid) {
      return designAndroid;
    } else {
      return designWeb;
    }
  }

  public render() {
    const { className } = this.props;
    return (
      <content-body
        className={
          className === "markdownBody"
            ? SharedPreferences.getBoolean("enableDarkmode_switch", false)
              ? "markdown-body-dark"
              : "markdown-body-light"
            : className
        }
        style={this.checkDevice({ padding: isMobile ? "" : "16px" }, {})}
      >
        <content-body-inner style={this.checkDevice(this.stlye, {})}>{this.props.children}</content-body-inner>
      </content-body>
    );
  }
}

export default ContentBody;
