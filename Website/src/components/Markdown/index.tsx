import Markdown, { MarkdownToJSX, compiler } from "markdown-to-jsx";
import Anchor, { Open } from "../dapi/Anchor";
import Video from "../dapi/Video";
import React from "react";
import { Alert, Divider, Paper, Stack } from "@mui/material";
import styled from "@emotion/styled";
import hljs from "highlight.js";
import { doc } from "googlers-tools";
import { Image } from "@Components/dapi/Image";
import { StyledMarkdown } from "./StyledMarkdown";
import { DiscordWidget } from "@Components/dapi/DiscordWidget";
import { AlertIcon, BugIcon, CheckIcon, IssueClosedIcon, IssueOpenedIcon, IssueReopenedIcon, XIcon } from "@primer/octicons-react";

type Props = {
  children: string;
  style?: React.CSSProperties;
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
  open: {
    component: Open,
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

  discordwidget: {
    component: DiscordWidget,
  },
};

export const Markup = (props: Props) => {
  const ref = React.useRef<HTMLDivElement>(null);

  // Disabled due lack of darkmode support
  // React.useEffect(() => {
  //   doc.findRef(ref, (ref) => {
  //     ref.querySelectorAll("pre code").forEach((block: any) => {
  //       hljs.highlightBlock(block);
  //     });
  //   });
  // });

  return (
    <StyledMarkdown ref={ref} style={{ display: "inline-block", width: "100%", ...props.style }}>
      <Markdown
        style={props.styleMd}
        options={{
          overrides: MarkdownOverrides,
        }}
        children={props.children}
      />
    </StyledMarkdown>
  );
};

export const MarkUpCompile = (children: string) => {
  return compiler(children, { overrides: MarkdownOverrides });
};
