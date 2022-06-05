import { Component } from "react";
import tools from "@Utils/tools";
import SharedPreferences from "@Native/SharedPreferences";

interface AInterface {
  download?: any;
  href: string;
  hrefLang?: string | undefined;
  media?: string | undefined;
  ping?: string | undefined;
  rel?: string | undefined;
  target?: string | undefined;
  type?: string | undefined;
  children: React.ReactNode | undefined;
}

class A extends Component<AInterface> {
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
            window.open(href);
          }}
          style={{ cursor: "pointer", color: new SharedPreferences().getBoolean("enableDarkmode", false) ? "#bb86fc" : "#4a148c" }}
        >
          {children}
        </a>
      </>
    );
  }
}

export default A;
