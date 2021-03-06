import Markdown from "marked-react";
import { LightAsync as SyntaxHighlighter } from "react-syntax-highlighter";
import { github } from "react-syntax-highlighter/dist/cjs/styles/hljs";
import { ViewX, ViewXRenderData } from "react-onsenuix";

interface IProps {
  children: string;
}

class HighlightedMarkdown extends ViewX<IProps> {
  public constructor(props: any) {
    super(props);
  }

  public componentDidMount() {}

  public createView(data: ViewXRenderData<IProps, {}, HTMLElement>): JSX.Element {
    const renderer = {
      code(snippet: any, lang: any) {
        return <SyntaxHighlighter children={String(snippet).replace(/\n$/, "")} style={github} language={lang} />;
      },
    };

    return <Markdown children={data.p.children} renderer={renderer} />;
  }

  private codeblock({
    code,
    lang,
    className,
    children,
    ...props
  }: {
    code: any;
    lang: any;
    className: string | undefined;
    children: React.ReactNode & React.ReactNode[];
  }) {
    const match = /language-(\w+)/.exec(className || "");
    return !lang && match ? (
      <SyntaxHighlighter children={String(children).replace(/\n$/, "")} style={github} language={match[1]} PreTag="div" {...props} />
    ) : (
      <code className={className} {...props}>
        {children}
      </code>
    );
  }
}

export { HighlightedMarkdown };
