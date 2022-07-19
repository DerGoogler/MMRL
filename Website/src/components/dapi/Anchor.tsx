import SharedPreferences from "@Native/SharedPreferences";
import { os } from "@Native/os";
import { util } from "googlers-tools";
import ViewX from "@Components/ViewX";

interface AnchorProps {
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

class Anchor extends ViewX<AnchorProps> {
  public createView(): JSX.Element {
    const { download, href, hrefLang, media, ping, rel, target, type, children } = this.props;
    return (
      <>
        <a
          download={download}
          hrefLang={hrefLang}
          media={media}
          ping={ping}
          rel={rel}
          target={util.typeCheck(target, "_blank")}
          type={type}
          onClick={() => {
            os.open(href);
          }}
          style={{ cursor: "pointer", color: SharedPreferences.getBoolean("enableDarkmode_switch", false) ? "#bb86fc" : "#4a148c" }}
        >
          {children}
        </a>
      </>
    );
  }
}

export default Anchor;
