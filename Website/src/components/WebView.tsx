import objectAssign from "object-assign";
import { ViewX, ViewXRenderData } from "react-onsenuix";

interface Props {
  url: string;
  src?: string;
  allowFullScreen?: boolean;
  position?: "relative" | "absolute" | "fixed" | "sticky" | "static" | "inherit" | "initial" | "unset";
  display?: "block" | "none" | "inline";
  height?: string;
  width?: string;
  loading?: "auto" | "eager" | "lazy";
  target?: string;
  importance?: "auto" | "high" | "low";
  overflow?: string;
  styles?: object;
  name?: string;
  allowpaymentrequest?: boolean;
  referrerpolicy?:
    | "no-referrer"
    | "no-referrer-when-downgrade"
    | "origin"
    | "origin-when-cross-origin"
    | "same-origin"
    | "strict-origin"
    | "strict-origin-when-cross-origin"
    | "unsafe-url";
  onLoad?: () => void;
  onMouseOver?: () => void;
  onMouseOut?: () => void;
  frameBorder?: number;
  scrolling?: "auto" | "yes" | "no";
  id?: string;
  ariaHidden?: boolean;
  ariaLabel?: string;
  ariaLabelledby?: string;
  sandbox?:
    | "allow-forms"
    | "allow-modals"
    | "allow-orientation-lock"
    | "allow-pointer-lock"
    | "allow-popups"
    | "allow-popups-to-escape-sandbox"
    | "allow-presentation"
    | "allow-same-origin"
    | "allow-scripts"
    | "allow-storage-access-by-user-activation"
    | "allow-top-navigation"
    | "allow-top-navigation-by-user-activation";
  allow?: string;
  className?: string;
  title?: string;
}

class WebView extends ViewX<Props> {
  public constructor(props: Props | Readonly<Props>) {
    super(props);
  }

  public createView(data: ViewXRenderData<Props, {}, HTMLElement>): JSX.Element {
    const {
      url,
      allowFullScreen,
      position,
      display,
      height,
      width,
      overflow,
      styles,
      onLoad,
      onMouseOver,
      onMouseOut,
      scrolling,
      id,
      frameBorder,
      ariaHidden,
      sandbox,
      allow,
      className,
      title,
      ariaLabel,
      ariaLabelledby,
      name,
      target,
      loading,
      importance,
      referrerpolicy,
      allowpaymentrequest,
      src,
    } = this.props;

    const defaultProps = objectAssign({
      src: src || url,
      target: target || null,
      style: {
        position: position || null,
        display: display || "block",
        overflow: overflow || null,
      },
      scrolling: scrolling || null,
      allowpaymentrequest: allowpaymentrequest || null,
      importance: importance || null,
      sandbox: sandbox || null,
      loading: loading || null,
      styles: styles || null,
      name: name || null,
      className: className || null,
      referrerpolicy: referrerpolicy || null,
      title: title || null,
      allow: allow || null,
      id: id || null,
      "aria-labelledby": ariaLabelledby || null,
      "aria-hidden": ariaHidden || null,
      "aria-label": ariaLabel || null,
      width: width || null,
      height: height || null,
      onLoad: onLoad || null,
      onMouseOver: onMouseOver || null,
      onMouseOut: onMouseOut || null,
    });

    let props = Object.create(null);
    for (let prop of Object.keys(defaultProps)) {
      if (defaultProps[prop] != null) {
        props[prop] = defaultProps[prop];
      }
    }

    for (let i of Object.keys(props.style)) {
      if (props.style[i] == null) {
        delete props.style[i];
      }
    }

    if (allowFullScreen) {
      if ("allow" in props) {
        const currentAllow = props.allow.replace("fullscreen", "");
        props.allow = `fullscreen ${currentAllow.trim()}`.trim();
      } else {
        props.allow = "fullscreen";
      }
    }

    if (frameBorder! >= 0) {
      if (!props.style.hasOwnProperty("border")) {
        props.style.border = frameBorder;
      }
    }

    return <iframe {...props} />;
  }
}

export default WebView;
