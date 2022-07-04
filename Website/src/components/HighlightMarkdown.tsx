import { Component, createRef, ReactNode, RefObject } from "react";
import hljs from "highlight.js";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { LightAsync as SyntaxHighlighter } from "react-syntax-highlighter";
import { github } from "react-syntax-highlighter/dist/cjs/styles/hljs";
import { Dom, Util } from "googlers-tools";

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
    Dom.findBy(this.rootRef, (ref: HTMLDivElement) => {
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
            checkmark: this.checkmark,
            //@ts-ignore
            dangermark: this.dangermark,
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

  private checkmark({
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
    size: string;
    color: string;
  }): ReactNode {
    return (
      <svg
        width={Util.typeCheck(props.size, "16")}
        viewBox="0 0 16 16"
        version="1.1"
        height={Util.typeCheck(props.size, "16")}
        aria-hidden="true"
        className={"octicon octicon-check color-fg-success ml-n3 v-align-middle " + className}
      >
        <path
          fill={Util.typeCheck(props.color, "#1a7f37")}
          fill-rule="evenodd"
          d="M13.78 4.22a.75.75 0 010 1.06l-7.25 7.25a.75.75 0 01-1.06 0L2.22 9.28a.75.75 0 011.06-1.06L6 10.94l6.72-6.72a.75.75 0 011.06 0z"
        ></path>
      </svg>
    );
  }

  private dangermark({
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
    size: string;
    color: string;
  }): ReactNode {
    return (
      <svg
        width={Util.typeCheck(props.size, "16")}
        viewBox="0 0 16 16"
        version="1.1"
        height={Util.typeCheck(props.size, "16")}
        aria-hidden="true"
        className={"octicon octicon-x color-fg-danger ml-n3 v-align-middle " + className}
      >
        <path
          fill={Util.typeCheck(props.color, "#1a7f37")}
          fill-rule="evenodd"
          d="M3.72 3.72a.75.75 0 011.06 0L8 6.94l3.22-3.22a.75.75 0 111.06 1.06L9.06 8l3.22 3.22a.75.75 0 11-1.06 1.06L8 9.06l-3.22 3.22a.75.75 0 01-1.06-1.06L6.94 8 3.72 4.78a.75.75 0 010-1.06z"
        ></path>
      </svg>
    );
  }
}

export { HighlightedMarkdown };
