import { os } from "@Native/os";
import { useDarkmode } from "@Hooks/useDarkmode";
import { CSSProperties } from "react";
import { isMobile } from "react-device-detect";

/**
 * ContentBody is an optional component, to make the view better on desktop
 */
const ContentBody = (props: any) => {
  const isDarkmode = useDarkmode();

  const stlye: CSSProperties = {
    boxSizing: "border-box",
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    minWidth: "200px",
    maxWidth: "580px",
    margin: "0px auto",
    padding: isMobile ? "" : "45px",
    ...props.style,
  };

  const checkDevice = (designWeb: any, designAndroid: any) => {
    if (os.isAndroid) {
      return designAndroid;
    } else {
      return designWeb;
    }
  };

  return (
    <content-body
      className={props.className === "markdownBody" ? (isDarkmode ? "markdown-body-dark" : "markdown-body-light") : props.className}
      style={checkDevice({ padding: isMobile ? "" : "16px" }, {})}
    >
      <content-body-inner style={checkDevice(stlye, {})}>{props.children}</content-body-inner>
    </content-body>
  );
};

export default ContentBody;
