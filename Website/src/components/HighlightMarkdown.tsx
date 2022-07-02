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
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { LightAsync as SyntaxHighlighter } from "react-syntax-highlighter";
import { github } from "react-syntax-highlighter/dist/cjs/styles/hljs";

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
    const { children } = this.props;

    return (
      <div ref={this.rootRef}>
        <ReactMarkdown
          children={children}
          remarkPlugins={[remarkGfm, require("remark-shortcodes"), { startBlock: "[[", endBlock: "]]", inlineMode: true }]}
          components={{
            //@ts-ignore kinda weird...
            code: this.codeblock,
            //@ts-ignore
            checkmark: CheckIcon,
            //@ts-ignore
            dangermark: DangerIcon,
          }}
        />
      </div>
    );
  }

  private codeblock({
    node,
    inline,
    className,
    children,
    ...props
  }: {
    node: Element;
    inline: boolean | undefined;
    className: string | undefined;
    children: React.ReactNode & React.ReactNode[];
  }) {
    const match = /language-(\w+)/.exec(className || "");
    return !inline && match ? (
      <SyntaxHighlighter
        children={String(children).replace(/\n$/, "")}
        style={github}
        language={match[1]}
        PreTag="div"
        // {...props}
      />
    ) : (
      <code className={className} {...props}>
        {children}
      </code>
    );
  }
}

export { HighlightedMarkdown };
