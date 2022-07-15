import Markdown from "markdown-to-jsx";
import { LightAsync as SyntaxHighlighter } from "react-syntax-highlighter";
import { github } from "react-syntax-highlighter/dist/cjs/styles/hljs";
import { ViewX, ViewXRenderData } from "react-onsenuix";
import Anchor from "./dapi/Anchor";
import Video from "./dapi/Video";
import DiscordWidget from "./dapi/DiscordWidget";
import Checkmark from "./icons/Checkmark";
import Dangermark from "./icons/Dangermark";
import Warnmark from "./icons/Warnmark";

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

    return (
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
    );
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
