import Markdown from "markdown-to-jsx";
import * as React from "react";
import Anchor from "./dapi/Anchor";
import Video from "./dapi/Video";
import { DiscordWidget } from "./dapi/DiscordWidget";
import Checkmark from "./icons/Checkmark";
import Dangermark from "./icons/Dangermark";
import Warnmark from "./icons/Warnmark";
import hljs from "highlight.js";
import { doc } from "googlers-tools";

interface IProps {
  children: string;
  style: React.CSSProperties;
}

const HighlightedMarkdown = (props: IProps) => {
  const ref = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    doc.findRef(ref, (ref) => {
      ref.querySelectorAll("pre code").forEach((block: any) => {
        hljs.highlightBlock(block);
      });
    });
  });

  return (
    <div ref={ref}>
      <Markdown
        style={props.style}
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
        children={props.children}
      />
    </div>
  );
};

export { HighlightedMarkdown };
