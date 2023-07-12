import styled from "@emotion/styled";
import { Theme } from "@mui/material";
import React from "react";
import { useSettings } from "../../hooks/useSettings";
import useShadeColor from "../../hooks/useShadeColor";
import { useTheme } from "@Hooks/useTheme";

interface Props {
  children?: React.ReactNode;
  style?: React.CSSProperties;
}

interface T {
  theme: Theme;
}

export const StyledMarkdown = React.forwardRef((props: Props, ref) => {
  const { theme, scheme } = useTheme();
  const { settings, setSettings } = useSettings();
  const shade = useShadeColor();

  const Article = styled.article(({ theme }: T) => ({
    msTextSizeAdjust: "100%",
    WebkitTextSizeAdjust: "100%",
    margin: "0",
    color: theme.palette.text.primary,
    // backgroundColor: "#ffffff",
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji",\n    "Segoe UI Emoji"',
    fontSize: "16px",
    lineHeight: 1.5,
    wordWrap: "break-word",
    ".octicon": {
      display: "inline-block",
      fill: "currentColor",
      verticalAlign: "text-bottom",
      overflow: "visible !important",
    },
    "h1:hover .anchor .octicon-link:before,\n  h2:hover .anchor .octicon-link:before,\n  h3:hover .anchor .octicon-link:before,\n  h4:hover .anchor .octicon-link:before,\n  h5:hover .anchor .octicon-link:before,\n  h6:hover .anchor .octicon-link:before":
      {
        width: "16px",
        height: "16px",
        content: '" "',
        display: "inline-block",
        backgroundColor: "currentColor",
        WebkitMaskImage:
          "url(\"data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16' version='1.1' aria-hidden='true'><path fill-rule='evenodd' d='M7.775 3.275a.75.75 0 001.06 1.06l1.25-1.25a2 2 0 112.83 2.83l-2.5 2.5a2 2 0 01-2.83 0 .75.75 0 00-1.06 1.06 3.5 3.5 0 004.95 0l2.5-2.5a3.5 3.5 0 00-4.95-4.95l-1.25 1.25zm-4.69 9.64a2 2 0 010-2.83l2.5-2.5a2 2 0 012.83 0 .75.75 0 001.06-1.06 3.5 3.5 0 00-4.95 0l-2.5 2.5a3.5 3.5 0 004.95 4.95l1.25-1.25a.75.75 0 00-1.06-1.06l-1.25 1.25a2 2 0 01-2.83 0z'></path></svg>\")",
        maskImage:
          "url(\"data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16' version='1.1' aria-hidden='true'><path fill-rule='evenodd' d='M7.775 3.275a.75.75 0 001.06 1.06l1.25-1.25a2 2 0 112.83 2.83l-2.5 2.5a2 2 0 01-2.83 0 .75.75 0 00-1.06 1.06 3.5 3.5 0 004.95 0l2.5-2.5a3.5 3.5 0 00-4.95-4.95l-1.25 1.25zm-4.69 9.64a2 2 0 010-2.83l2.5-2.5a2 2 0 012.83 0 .75.75 0 001.06-1.06 3.5 3.5 0 00-4.95 0l-2.5 2.5a3.5 3.5 0 004.95 4.95l1.25-1.25a.75.75 0 00-1.06-1.06l-1.25 1.25a2 2 0 01-2.83 0z'></path></svg>\")",
      },
    "details,\n  figcaption,\n  figure": { display: "block" },
    summary: { display: "list-item" },
    "[hidden]": { display: "none !important" },
    a: {
      backgroundColor: "transparent",
      color: "#4a148c",
      textDecoration: "none",
      "&:active,\n    &:hover": { outlineWidth: "0" },
    },
    "abbr[title]": { borderBottom: "none", textDecoration: "underline dotted" },
    "b,\n  strong": { fontWeight: 600 },
    dfn: { fontStyle: "italic" },
    h1: {
      margin: "0.67em 0",
      fontWeight: 600,
      paddingBottom: "0.3em",
      fontSize: "2em",
      borderBottom: `thin solid ${theme.palette.divider}`,
      "tt,\n    code": { padding: "0 0.2em", fontSize: "inherit" },
    },
    mark: { backgroundColor: "#fff8c5", color: "#24292f" },
    small: { fontSize: "90%" },
    "sub,\n  sup": {
      fontSize: "75%",
      lineHeight: 0,
      position: "relative",
      verticalAlign: "baseline",
    },
    sub: { bottom: "-0.25em" },
    sup: { top: "-0.5em" },
    img: {
      borderStyle: "none",
      maxWidth: "100%",
      boxSizing: "content-box",
      backgroundColor: "#ffffff",
      '&[align="right"]': { paddingLeft: "20px" },
      '&[align="left"]': { paddingRight: "20px" },
    },
    "code,\n  kbd,\n  pre,\n  samp": {
      fontFamily: "monospace, monospace",
      fontSize: "1em",
    },
    figure: { margin: "1em 40px" },
    hr: {
      boxSizing: "content-box",
      overflow: "hidden",
      background: "transparent",
      borderBottom: `thin solid ${theme.palette.divider}`,
      height: "0.25em",
      padding: "0",
      margin: "24px 0",
      backgroundColor: theme.palette.divider,
      border: "0",
      "&::before": { display: "table", content: '""' },
      "&::after": { display: "table", clear: "both", content: '""' },
    },
    input: {
      font: "inherit",
      margin: "0",
      overflow: "visible",
      fontFamily: "inherit",
      fontSize: "inherit",
      lineHeight: "inherit",
      "&::-webkit-outer-spin-button,\n    &::-webkit-inner-spin-button": {
        margin: "0",
        WebkitAppearance: "none",
        appearance: "none",
      },
    },
    '[type="button"],\n  [type="reset"],\n  [type="submit"]': {
      WebkitAppearance: "button",
    },
    '[type="button"]::-moz-focus-inner,\n  [type="reset"]::-moz-focus-inner,\n  [type="submit"]::-moz-focus-inner': {
      borderStyle: "none",
      padding: "0",
    },
    '[type="button"]:-moz-focusring,\n  [type="reset"]:-moz-focusring,\n  [type="submit"]:-moz-focusring': {
      outline: "1px dotted ButtonText",
    },
    '[type="checkbox"],\n  [type="radio"]': {
      boxSizing: "border-box",
      padding: "0",
    },
    '[type="number"]': {
      "&::-webkit-inner-spin-button,\n    &::-webkit-outer-spin-button": {
        height: "auto",
      },
    },
    '[type="search"]': {
      WebkitAppearance: "textfield",
      outlineOffset: "-2px",
      "&::-webkit-search-cancel-button,\n    &::-webkit-search-decoration": {
        WebkitAppearance: "none",
      },
    },
    "::-webkit-input-placeholder": { color: "inherit", opacity: 0.54 },
    "::-webkit-file-upload-button": {
      WebkitAppearance: "button",
      font: "inherit",
    },
    "a:hover": { textDecoration: "underline" },
    table: {
      borderSpacing: "0",
      borderCollapse: "collapse",
      display: "block",
      width: "max-content",
      maxWidth: "100%",
      overflow: "auto",
      th: { fontWeight: 600, padding: "6px 13px", border: `1px solid ${theme.palette.divider}` },
      td: { padding: "6px 13px", border: `1px solid ${theme.palette.divider}` },
      tr: {
        backgroundColor: theme.palette.background.default,
        borderTop: `thin solid ${theme.palette.divider}`,
        "&:nth-child(2n)": {
          backgroundColor: settings.darkmode ? shade(scheme[900], -85) : "#f6f8fa",
        },
      },
      img: { backgroundColor: "transparent" },
    },
    "td,\n  th": { padding: "0" },
    details: {
      summary: { cursor: "pointer" },
      "&:not([open]) > *:not(summary)": { display: "none !important" },
    },
    kbd: {
      display: "inline-block",
      padding: "3px 5px",
      font: "11px ui-monospace, SFMono-Regular, SF Mono, Menlo, Consolas, Liberation Mono, monospace",
      lineHeight: "10px",
      color: "#24292f",
      verticalAlign: "middle",
      backgroundColor: "#f6f8fa",
      border: "solid 1px rgba(175, 184, 193, 0.2)",
      borderBottomColor: "rgba(175, 184, 193, 0.2)",
      borderRadius: "6px",
      boxShadow: "inset 0 -1px 0 rgba(175, 184, 193, 0.2)",
    },
    "h1,\n  h2,\n  h3,\n  h4,\n  h5,\n  h6": {
      marginTop: "24px",
      marginBottom: "16px",
      fontWeight: 600,
      lineHeight: 1.25,
    },
    h2: {
      fontWeight: 600,
      paddingBottom: "0.3em",
      fontSize: "1.5em",
      borderBottom: `thin solid ${theme.palette.divider}`,
      "tt,\n    code": { padding: "0 0.2em", fontSize: "inherit" },
    },
    h3: {
      fontWeight: 600,
      fontSize: "1.25em",
      "tt,\n    code": { padding: "0 0.2em", fontSize: "inherit" },
    },
    h4: {
      fontWeight: 600,
      fontSize: "1em",
      "tt,\n    code": { padding: "0 0.2em", fontSize: "inherit" },
    },
    h5: {
      fontWeight: 600,
      fontSize: "0.875em",
      "tt,\n    code": { padding: "0 0.2em", fontSize: "inherit" },
    },
    h6: {
      fontWeight: 600,
      fontSize: "0.85em",
      color: "#57606a",
      "tt,\n    code": { padding: "0 0.2em", fontSize: "inherit" },
    },
    p: { marginTop: "0", marginBottom: "10px" },
    blockquote: {
      margin: "0",
      padding: "0 1em",
      color: "#57606a",
      borderLeft: "0.25em solid #d0d7de",
    },
    ul: {
      marginTop: "0",
      marginBottom: "0",
      paddingLeft: "2em",
      ol: { listStyleType: "lower-roman" },
      "ul ol,\n    ol ol": { listStyleType: "lower-alpha" },
      "ul,\n    ol": { marginTop: "0", marginBottom: "0" },
    },
    ol: {
      marginTop: "0",
      marginBottom: "0",
      paddingLeft: "2em",
      ol: { listStyleType: "lower-roman" },
      "ul ol,\n    ol ol": { listStyleType: "lower-alpha" },
      "&.no-list": { padding: "0", listStyleType: "none" },
      '&[type="1"]': { listStyleType: "decimal" },
      '&[type="a"]': { listStyleType: "lower-alpha" },
      '&[type="i"]': { listStyleType: "lower-roman" },
      "ol,\n    ul": { marginTop: "0", marginBottom: "0" },
    },
    dd: { marginLeft: "0" },
    "tt,\n  code": {
      fontFamily: "ui-monospace, SFMono-Regular, SF Mono, Menlo, Consolas, Liberation Mono, monospace",
      fontSize: "12px",
    },
    pre: {
      marginTop: "0",
      marginBottom: "0",
      fontFamily: "ui-monospace, SFMono-Regular, SF Mono, Menlo, Consolas, Liberation Mono, monospace",
      fontSize: "85%",
      wordWrap: "normal",
      code: { fontSize: "100%" },
      "> code": {
        padding: "0",
        margin: "0",
        wordBreak: "normal",
        whiteSpace: "pre",
        background: "transparent",
        border: "0",
      },
      padding: "16px",
      overflow: "auto",
      lineHeight: 1.45,
      backgroundColor: settings.darkmode ? shade(scheme[900], -85) : "#f6f8fa",
      borderRadius: theme.shape.borderRadius,
      "code,\n    tt": {
        display: "inline",
        maxWidth: "auto",
        padding: "0",
        margin: "0",
        overflow: "visible",
        lineHeight: "inherit",
        wordWrap: "normal",
        backgroundColor: "transparent",
        border: "0",
      },
    },
    "::placeholder": { color: "#6e7781", opacity: 1 },
    ".pl-c": { color: "#6e7781" },
    ".pl-c1,\n  .pl-s .pl-v": { color: "#0550ae" },
    ".pl-e,\n  .pl-en": { color: "#8250df" },
    ".pl-smi,\n  .pl-s .pl-s1": { color: "#24292f" },
    ".pl-ent": { color: "#116329" },
    ".pl-k": { color: "#cf222e" },
    ".pl-s,\n  .pl-pds,\n  .pl-s .pl-pse .pl-s1": { color: "#0a3069" },
    ".pl-sr": {
      color: "#0a3069",
      ".pl-cce,\n    .pl-sre,\n    .pl-sra": { color: "#0a3069" },
    },
    ".pl-v,\n  .pl-smw": { color: "#953800" },
    ".pl-bu": { color: "#82071e" },
    ".pl-ii": { color: "#f6f8fa", backgroundColor: "#82071e" },
    ".pl-c2": { color: "#f6f8fa", backgroundColor: "#cf222e" },
    ".pl-sr .pl-cce": { fontWeight: "bold", color: "#116329" },
    ".pl-ml": { color: "#3b2300" },
    ".pl-mh": {
      fontWeight: "bold",
      color: "#0550ae",
      ".pl-en": { fontWeight: "bold", color: "#0550ae" },
    },
    ".pl-ms": { fontWeight: "bold", color: "#0550ae" },
    ".pl-mi": { fontStyle: "italic", color: "#24292f" },
    ".pl-mb": { fontWeight: "bold", color: "#24292f" },
    ".pl-md": { color: "#82071e", backgroundColor: "#ffebe9" },
    ".pl-mi1": { color: "#116329", backgroundColor: "#dafbe1" },
    ".pl-mc": { color: "#953800", backgroundColor: "#ffd8b5" },
    ".pl-mi2": { color: "#eaeef2", backgroundColor: "#0550ae" },
    ".pl-mdr": { fontWeight: "bold", color: "#8250df" },
    ".pl-ba": { color: "#57606a" },
    ".pl-sg": { color: "#8c959f" },
    ".pl-corl": { textDecoration: "underline", color: "#0a3069" },
    "[data-catalyst]": { display: "block" },
    "g-emoji": {
      fontFamily: '"Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
      fontSize: "1em",
      fontStyle: "normal !important",
      fontWeight: 400,
      lineHeight: 1,
      verticalAlign: "-0.075em",
      img: { width: "1em", height: "1em" },
    },
    "&::before": { display: "table", content: '""' },
    "&::after": { display: "table", clear: "both", content: '""' },
    "> *": {
      "&:first-of-type": { marginTop: "0 !important" },
      "&:last-child": { marginBottom: "0 !important" },
    },
    "a:not([href])": { color: "inherit", textDecoration: "none" },
    ".absent": { color: "#cf222e" },
    ".anchor": {
      cssFloat: "left",
      paddingRight: "4px",
      marginLeft: "-20px",
      lineHeight: 1,
      "&:focus": { outline: "none" },
    },
    "p,\n  blockquote,\n  ul,\n  ol,\n  dl,\n  table,\n  pre,\n  details": {
      marginTop: "0",
      marginBottom: "16px",
    },
    "blockquote >": {
      ":first-of-type": { marginTop: "0" },
      ":last-child": { marginBottom: "0" },
    },
    "sup > a": {
      "&::before": { content: '"["' },
      "&::after": { content: '"]"' },
    },
    "h1 .octicon-link,\n  h2 .octicon-link,\n  h3 .octicon-link,\n  h4 .octicon-link,\n  h5 .octicon-link,\n  h6 .octicon-link": {
      color: "#24292f",
      verticalAlign: "middle",
      visibility: "hidden",
    },
    "h1:hover .anchor,\n  h2:hover .anchor,\n  h3:hover .anchor,\n  h4:hover .anchor,\n  h5:hover .anchor,\n  h6:hover .anchor": {
      textDecoration: "none",
    },
    "h1:hover .anchor .octicon-link,\n  h2:hover .anchor .octicon-link,\n  h3:hover .anchor .octicon-link,\n  h4:hover .anchor .octicon-link,\n  h5:hover .anchor .octicon-link,\n  h6:hover .anchor .octicon-link":
      {
        visibility: "visible",
      },
    "ul.no-list": { padding: "0", listStyleType: "none" },
    "div > ol:not([type])": { listStyleType: "decimal" },
    li: { "> p": { marginTop: "16px" }, "+ li": { marginTop: "0.25em" } },
    dl: {
      padding: "0",
      dt: {
        padding: "0",
        marginTop: "16px",
        fontSize: "1em",
        fontStyle: "italic",
        fontWeight: 600,
      },
      dd: { padding: "0 16px", marginBottom: "16px" },
    },
    ".emoji": {
      maxWidth: "none",
      verticalAlign: "text-top",
      backgroundColor: "transparent",
    },
    span: {
      "&.frame": {
        display: "block",
        overflow: "hidden",
        "> span": {
          display: "block",
          cssFloat: "left",
          width: "auto",
          padding: "7px",
          margin: "13px 0 0",
          overflow: "hidden",
          border: "1px solid #d0d7de",
        },
        span: {
          img: { display: "block", cssFloat: "left" },
          span: {
            display: "block",
            padding: "5px 0 0",
            clear: "both",
            color: "#24292f",
          },
        },
      },
      "&.align-center": {
        display: "block",
        overflow: "hidden",
        clear: "both",
        "> span": {
          display: "block",
          margin: "13px auto 0",
          overflow: "hidden",
          textAlign: "center",
        },
        "span img": { margin: "0 auto", textAlign: "center" },
      },
      "&.align-right": {
        display: "block",
        overflow: "hidden",
        clear: "both",
        "> span": {
          display: "block",
          margin: "13px 0 0",
          overflow: "hidden",
          textAlign: "right",
        },
        "span img": { margin: "0", textAlign: "right" },
      },
      "&.float-left": {
        display: "block",
        cssFloat: "left",
        marginRight: "13px",
        overflow: "hidden",
        span: { margin: "13px 0 0" },
      },
      "&.float-right": {
        display: "block",
        cssFloat: "right",
        marginLeft: "13px",
        overflow: "hidden",
        "> span": {
          display: "block",
          margin: "13px auto 0",
          overflow: "hidden",
          textAlign: "right",
        },
      },
    },
    "code,\n  tt": {
      padding: "0.2em 0.4em",
      margin: "0",
      fontSize: "85%",
      backgroundColor: "rgba(175, 184, 193, 0.2)",
      borderRadius: "6px",
    },
    "code br,\n  tt br": { display: "none" },
    "del code": { textDecoration: "inherit" },
    ".highlight": {
      marginBottom: "16px",
      pre: {
        marginBottom: "0",
        wordBreak: "normal",
        padding: "16px",
        overflow: "auto",
        fontSize: "85%",
        lineHeight: 1.45,
        backgroundColor: "#f6f8fa",
        borderRadius: "6px",
      },
    },
    ".csv-data": {
      "td,\n    th": {
        padding: "5px",
        overflow: "hidden",
        fontSize: "12px",
        lineHeight: 1,
        textAlign: "left",
        whiteSpace: "nowrap",
      },
      ".blob-num": {
        padding: "10px 8px 9px",
        textAlign: "right",
        background: "#ffffff",
        border: "0",
      },
      tr: { borderTop: "0" },
      th: { fontWeight: 600, background: "#f6f8fa", borderTop: "0" },
    },
    ".footnotes": {
      fontSize: "12px",
      color: "#57606a",
      borderTop: "1px solid #d0d7de",
      ol: { paddingLeft: "16px" },
      li: {
        position: "relative",
        "&:target": {
          "&::before": {
            position: "absolute",
            top: "-8px",
            right: "-8px",
            bottom: "-8px",
            left: "-24px",
            pointerEvents: "none",
            content: '""',
            border: "2px solid #0969da",
            borderRadius: "6px",
          },
          color: "#24292f",
        },
      },
      ".data-footnote-backref g-emoji": { fontFamily: "monospace" },
    },
    ".task-list-item": {
      listStyleType: "none",
      label: { fontWeight: 400 },
      "&.enabled label": { cursor: "pointer" },
      "+ .task-list-item": { marginTop: "3px" },
      ".handle": { display: "none" },
    },
    ".task-list-item-checkbox": {
      margin: "0 0.2em 0.25em -1.6em",
      verticalAlign: "middle",
    },
    ".contains-task-list:dir(rtl) .task-list-item-checkbox": {
      margin: "0 -1.6em 0.25em 0.2em",
    },
    "::-webkit-calendar-picker-indicator": { filter: "invert(50%)" },
    ".hljs": { color: "#24292e" },
    ".hljs-doctag,\n  .hljs-keyword,\n  .hljs-meta .hljs-keyword,\n  .hljs-template-tag,\n  .hljs-template-variable,\n  .hljs-type,\n  .hljs-variable.language_":
      {
        color: "#d73a49",
      },
    ".hljs-title": {
      color: "#6f42c1",
      "&.class_": { color: "#6f42c1", "&.inherited__": { color: "#6f42c1" } },
      "&.function_": { color: "#6f42c1" },
    },
    ".hljs-attr,\n  .hljs-attribute,\n  .hljs-literal,\n  .hljs-meta,\n  .hljs-number,\n  .hljs-operator,\n  .hljs-variable,\n  .hljs-selector-attr,\n  .hljs-selector-class,\n  .hljs-selector-id":
      {
        color: "#005cc5",
      },
    ".hljs-regexp,\n  .hljs-string,\n  .hljs-meta .hljs-string": {
      color: "#032f62",
    },
    ".hljs-built_in,\n  .hljs-symbol": { color: "#e36209" },
    ".hljs-comment,\n  .hljs-code,\n  .hljs-formula": { color: "#6a737d" },
    ".hljs-name,\n  .hljs-quote,\n  .hljs-selector-tag,\n  .hljs-selector-pseudo": {
      color: "#22863a",
    },
    ".hljs-subst": { color: "#24292e" },
    ".hljs-section": { color: "#005cc5", fontWeight: "bold" },
    ".hljs-bullet": { color: "#735c0f" },
    ".hljs-emphasis": { color: "#24292e", fontStyle: "italic" },
    ".hljs-strong": { color: "#24292e", fontWeight: "bold" },
    ".hljs-addition": { color: "#22863a", backgroundColor: "#f0fff4" },
    ".hljs-deletion": { color: "#b31d28", backgroundColor: "#ffeef0" },
    ".hljs-char.escape_,\n  .hljs-link,\n  .hljs-params,\n  .hljs-property,\n  .hljs-punctuation,\n  .hljs-tag": {},
  }));

  return <Article ref={ref as any} theme={theme} style={props.style} children={props.children} />;
});
