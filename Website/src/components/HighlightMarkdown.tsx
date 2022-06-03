import { Component, createRef, RefObject } from "react";
import Markdown from "markdown-to-jsx";
import hljs from "highlight.js";
import tools from "@Utils/tools";
import Video from "./dapi/Video";
import DiscordWidget from "./dapi/DiscordWidget";
import A from "./dapi/A";
import Changelog from "./dapi/Changelog";
import CheckIcon from "./icons/CheckIcon";
import DangerIcon from "./icons/DangerIcon";
import "highlight.js/styles/atom-one-dark.css";

interface IProps {
  children: string;
}

class HighlightedMarkdown extends Component<IProps> {
  private rootRef: RefObject<HTMLDivElement>;

  public constructor(props: any) {
    super(props);
    this.rootRef = createRef();
  }

  public componentDidMount() {
    tools.ref(this.rootRef, (ref: HTMLDivElement) => {
      ref.querySelectorAll("pre code").forEach((block: any) => {
        hljs.highlightElement(block);
      });
    });
  }

  public render() {
    return (
      <div ref={this.rootRef}>
        <Markdown
          options={{
            overrides: {
              a: {
                component: A,
              },
              video: {
                component: Video,
              },
              discordwidget: {
                component: DiscordWidget,
              },
              changelog: {
                component: Changelog,
              },
              checkicon: {
                component: CheckIcon,
              },
              dangericon: {
                component: DangerIcon,
              },
            },
          }}
        >
          {this.props.children}
        </Markdown>
      </div>
    );
  }
}

export { HighlightedMarkdown };
