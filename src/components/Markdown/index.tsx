import Markdown, { MarkdownToJSX, RuleType, compiler } from "markdown-to-jsx";
import { Video } from "@Components/dapi/Video";
import React from "react";
import { Alert, AlertTitle, Divider, Grid, Paper, Stack, SxProps, Theme } from "@mui/material";
import styled from "@emotion/styled";
import hljs from "highlight.js";
import { Image } from "@Components/dapi/Image";
import { StyledMarkdown } from "./StyledMarkdown";
import { DiscordWidget } from "@Components/dapi/DiscordWidget";
import { AlertIcon, BugIcon, CheckIcon, IssueClosedIcon, IssueOpenedIcon, IssueReopenedIcon, XIcon } from "@primer/octicons-react";
import { Code } from "@Components/dapi/Code";
import { Pre } from "@Components/dapi/Pre";
import { Anchor } from "@Components/dapi/Anchor";
import { useFetch } from "@Hooks/useFetch";

export type AlertType = {
  title: string;
  render: (content: React.ReactNode) => JSX.Element;
};
const sx = {
  mb: 2,
};
export const admonitionTypes = {
  "[!NOTE]": {
    title: "Note",
    render: (content: string) => (
      <Alert sx={sx} severity="info">
        <AlertTitle>Note</AlertTitle>
        {content}
      </Alert>
    ),
  },
  "[!TIP]": {
    title: "Tip",
    render: (content: string) => (
      <Alert sx={sx} severity="success">
        <AlertTitle>Tip</AlertTitle>
        {content}
      </Alert>
    ),
  },
  "[!IMPORTANT]": {
    title: "Important",
    render: (content: string) => (
      <Alert sx={sx} severity="info">
        <AlertTitle>Important</AlertTitle>
        {content}
      </Alert>
    ),
  },
  "[!WARNING]": {
    title: "Warning",
    render: (content: string) => (
      <Alert sx={sx} severity="warning">
        <AlertTitle>Warning</AlertTitle>
        {content}
      </Alert>
    ),
  },
  "[!CAUTION]": {
    title: "Caution",
    render: (content: string) => (
      <Alert sx={sx} severity="error">
        <AlertTitle>Caution</AlertTitle>
        {content}
      </Alert>
    ),
  },
};

type Props = {
  fetch?: string;
  children?: string;
  sx?: SxProps<Theme>;
  styleMd?: React.CSSProperties;
};

const StyledDivider = styled(Divider)({
  "h1, & h2, & h3, & h4, & h5, & h6": {
    border: "none",
  },
});

export const MarkdownOverrides: MarkdownToJSX.Overrides | undefined = {
  // Icons
  BugIcon: {
    component: BugIcon,
  },
  IssueOpenedIcon: {
    component: IssueOpenedIcon,
  },
  IssueClosedIcon: {
    component: IssueClosedIcon,
  },
  IssueReopenedIcon: {
    component: IssueReopenedIcon,
  },
  CheckIcon: {
    component: CheckIcon,
  },
  XIcon: {
    component: XIcon,
  },
  AlertIcon: {
    component: AlertIcon,
  },
  alert: {
    component: (props) => {
      return (
        <Alert severity={props.info ? "info" : props.warning ? "warning" : props.error ? "error" : props.success ? "success" : "info"}>
          {props.children}
        </Alert>
      );
    },
  },
  img: {
    component: Image,
  },
  video: {
    component: Video,
  },
  divider: {
    component: StyledDivider,
  },
  paper: {
    component: Paper,
  },
  stack: {
    component: Stack,
  },
  code: {
    component: Code,
  },
  pre: {
    component: Pre,
  },
  discordwidget: {
    component: DiscordWidget,
  },
  grid: {
    component: Grid,
  },
};

export const Markup = (props: Props) => {
  const ref = React.useRef<HTMLDivElement>(null);

  const [fetchedText] = useFetch<string>(props.fetch, { type: "text" });
  const text = fetchedText || props.children;

  React.useEffect(() => {
    if (ref.current) {
      ref.current.querySelectorAll<HTMLElement>("pre code").forEach((block) => {
        block.removeAttribute("data-highlighted");
        hljs.highlightElement(block);
      });
    }
  }, []);

  return (
    <StyledMarkdown ref={ref} sx={props.sx}>
      <Markdown
        style={props.styleMd}
        options={{
          overrides: MarkdownOverrides,
          createElement(type: any, props: any, ...children: any[]) {
            switch (type) {
              case "a":
                return React.createElement(Anchor, props, ...children);
              default:
                return React.createElement(type, props, ...children);
            }
          },
          renderRule(next, node, renderChildren, state) {
            if (node.type != RuleType.blockQuote) return next();

            const blockquote = node as MarkdownToJSX.BlockQuoteNode;
            if (blockquote.children[0].type != RuleType.paragraph) return next();
            const paragraph = blockquote.children[0];
            if (paragraph.children[0].type != RuleType.text) return next();
            let text = paragraph.children.flatMap((p: any) => p.text).join("");

            let title: string;
            let admonitionType: AlertType | null = null;
            // A link break after the title is explicitly required by GitHub
            const titleEnd = text.indexOf("\n");
            if (titleEnd < 0) {
              // But if the following one is a block, the newline would be trimmed by the upstream.
              // To start a new block, a newline is required.
              // So we just need to addtionally check if the following one is a block.
              // The legacy title variant is not affected since it checks an inline and does not care about the newline.

              // Considering the reason why the paragraph ends here, the following one should be a children of the blockquote, which means it is always a block.
              // So no more check is required.
              title = text;
              admonitionType = admonitionTypes[title];

              if (!admonitionType) {
                return next();
              }

              // No addtional inlines can exist in this paragraph for the title...
              if (paragraph.children.length > 1) {
                // Unless it is an inline break, which can be transformed to from 2 spaces with a newline.
                if (paragraph.children.at(1)?.type == RuleType.breakLine) {
                  // When it is, we actually have already found the line break required by GitHub.
                  // So we just strip the additional `<br>` element.
                  // The title element will be removed later.
                  paragraph.children.splice(1, 1);
                } else {
                  return next();
                }
              }
              // strip the title
              paragraph.children.shift();
            } else {
              const textBody = text.substring(titleEnd + 1);
              title = text.substring(0, titleEnd);
              // Handle whitespaces after the title.
              // Whitespace characters are defined by GFM.
              const m = /[ \t\v\f\r]+$/.exec(title);
              if (m) {
                title = title.substring(0, title.length - m[0].length);
              }

              admonitionType = admonitionTypes[title];
              if (!admonitionType) return next();
              // Update the text body to remove the title
              text = textBody;
            }

            return admonitionType.render(text);
          },
        }}
        children={text || ""}
      />
    </StyledMarkdown>
  );
};

export const MarkUpCompile = (children: string) => {
  return compiler(children, { overrides: MarkdownOverrides });
};
