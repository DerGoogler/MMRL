import { Component } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { LightAsync as SyntaxHighlighter } from "react-syntax-highlighter";
import { github } from "react-syntax-highlighter/dist/cjs/styles/hljs";

interface IProps {
  children: string;
}

class HighlightedMarkdown extends Component<IProps> {
  public constructor(props: any) {
    super(props);
  }

  public componentDidMount() {}

  public render() {
    const { children } = this.props;

    return (
      <ReactMarkdown
        children={children}
        remarkPlugins={[remarkGfm]}
        components={{
          //@ts-ignore kinda weird...
          code: this.codeblock,
        }}
      />
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
