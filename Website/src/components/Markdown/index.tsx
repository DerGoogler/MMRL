import Markdown, { MarkdownToJSX, compiler } from "markdown-to-jsx";
import Anchor, { Open } from "../dapi/Anchor";
import Video from "../dapi/Video";
import Checkmark from "../icons/Checkmark";
import Dangermark from "../icons/Dangermark";
import Warnmark from "../icons/Warnmark";
import Icon from "@mui/material/Icon";
import Typography from "@mui/material/Typography";
import React from "react";
import {
  Alert,
  Box,
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Chip,
  Container,
  Divider,
  Grid,
  Paper,
  Stack,
} from "@mui/material";
import styled from "@emotion/styled";
import hljs from "highlight.js";
import { doc } from "googlers-tools";
import { Image } from "@Components/dapi/Image";
import { StyledMarkdown } from "./StyledMarkdown";
import { DiscordWidget } from "@Components/dapi/DiscordWidget";

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
  grid: {
    component: Grid,
  },
  chip: {
    component: Chip,
  },
  paper: {
    component: Paper,
  },
  box: {
    component: Box,
  },
  container: {
    component: Container,
  },
  stack: {
    component: Stack,
  },
  icon: {
    component: (props: { i: string }) => {
      return <Icon {...props}>{props.i}</Icon>;
    },
  },
  p: {
    component: Typography,
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
  discordwidget: {
    component: DiscordWidget,
  },
};

export const Markup = (props: Props) => {
  const ref = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    doc.findRef(ref, (ref) => {
      ref.querySelectorAll("pre code").forEach((block: any) => {
        hljs.highlightBlock(block);
      });
    });
  });

  return (
    <StyledMarkdown ref={ref} style={{ display: "inline-block", padding: "8px", width: "100%", ...props.style }}>
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
