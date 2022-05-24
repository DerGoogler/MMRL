import * as React from "react";
import LinkManager from "../../native/LinkManager";
import tools from "../../utils/tools";

interface AInterface {
  download?: any;
  href?: string | undefined;
  hrefLang?: string | undefined;
  media?: string | undefined;
  ping?: string | undefined;
  rel?: string | undefined;
  target?: string | undefined;
  type?: string | undefined;
  children: React.ReactNode | undefined;
}

class A extends React.Component<AInterface> {
  public render() {
    const { download, href, hrefLang, media, ping, rel, target, type, children } = this.props;
    return (
      <>
        <a
          download={download}
          hrefLang={hrefLang}
          media={media}
          ping={ping}
          rel={rel}
          target={tools.typeCheck(target, "_blank")}
          type={type}
          title={"Open " + href}
          onClick={() => {
            LinkManager.open(href);
          }}
          style={{ cursor: "pointer", color: "#4a148c" }}
        >
          {children}
        </a>
      </>
    );
  }
}

export default A;
