import Markdown from "markdown-to-jsx";
import { createRef, RefObject } from "react";
import { ViewX, ViewXRenderData } from "react-onsenuix";
import Anchor from "./dapi/Anchor";
import Video from "./dapi/Video";
import DiscordWidget from "./dapi/DiscordWidget";
import Checkmark from "./icons/Checkmark";
import Dangermark from "./icons/Dangermark";
import Warnmark from "./icons/Warnmark";
import hljs from "highlight.js";
import { dom } from "googlers-tools";

interface IProps {
  children: string;
}

class HighlightedMarkdown extends ViewX<IProps> {
  private ref: RefObject<HTMLDivElement>;
  public constructor(props: any) {
    super(props);

    this.ref = createRef();
  }

  public componentDidMount() {
    dom.findBy(this.ref, (ref: HTMLDivElement) => {
      ref.querySelectorAll("pre code").forEach((block: any) => {
        hljs.highlightBlock(block);
      });
    });
  }

  public createView(data: ViewXRenderData<IProps, {}, HTMLElement>): JSX.Element {
    return (
      <div ref={this.ref}>
        <Markdown
          options={{
            forceBlock: true,
            overrides: {
              a: {
                component: Anchor,
              },
              video: {
                component: Video,
              },
              discordwidget: {
                component: DiscordWidget,
              },
              checkmark: {
                component: Checkmark,
              },
              dangermark: {
                component: Dangermark,
              },
              warnmark: {
                component: Warnmark,
              },
            },
          }}
          children={data.p.children}
        />
      </div>
    );
  }
}

export { HighlightedMarkdown };
