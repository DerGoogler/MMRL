import Markdown, { MarkdownToJSX, compiler } from "markdown-to-jsx";
import Anchor from "../dapi/Anchor";
import Video from "../dapi/Video";
import React from "react";
import { Alert, Divider, Paper, Stack, SxProps, Theme } from "@mui/material";
import styled from "@emotion/styled";
import hljs from "highlight.js";
import { Image } from "@Components/dapi/Image";
import { StyledMarkdown } from "./StyledMarkdown";
import { DiscordWidget } from "@Components/dapi/DiscordWidget";
import { AlertIcon, BugIcon, CheckIcon, IssueClosedIcon, IssueOpenedIcon, IssueReopenedIcon, XIcon } from "@primer/octicons-react";
import Code from "@Components/dapi/Code";
import Pre from "@Components/dapi/Pre";

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
  a: {
    component: Anchor,
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
};

export const Markup = (props: Props) => {
  const ref = React.useRef<HTMLDivElement>(null);
  const [text, setText] = React.useState<string>(props.children ? props.children : "");

  React.useEffect(() => {
    if (ref.current) {
      ref.current.querySelectorAll<HTMLElement>("pre code").forEach((block) => {
        hljs.highlightBlock(block);
      });
    }

    if (props.fetch) {
      fetch(props.fetch)
        .then((res) => res.text())
        .then((t) => {
          setText(t);
        });
    }
  }, [fetch]);

  return (
    <StyledMarkdown ref={ref} sx={props.sx}>
      <Markdown
        style={props.styleMd}
        options={{
          overrides: MarkdownOverrides,
        }}
        children={text}
      />
    </StyledMarkdown>
  );
};

export const MarkUpCompile = (children: string) => {
  return compiler(children, { overrides: MarkdownOverrides });
};
