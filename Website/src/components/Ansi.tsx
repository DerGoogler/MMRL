import Anser, { AnserJsonEntry } from "anser";
import { escapeCarriageReturn } from "escape-carriage";
import linkifyit from "linkify-it";
import * as React from "react";
import Code from "./dapi/Code";
import Anchor from "./dapi/Anchor";

function ansiToJSON(input: string, use_classes: boolean = false): AnserJsonEntry[] {
  input = escapeCarriageReturn(fixBackspace(input));
  return Anser.ansiToJson(input, {
    json: true,
    remove_empty: true,
    use_classes,
  });
}

function createClass(bundle: AnserJsonEntry): string | null {
  let classNames: string = "";

  if (bundle.bg) {
    classNames += `${bundle.bg}-bg `;
  }
  if (bundle.fg) {
    classNames += `${bundle.fg}-fg `;
  }
  if (bundle.decoration) {
    classNames += `ansi-${bundle.decoration} `;
  }

  if (classNames === "") {
    return null;
  }

  classNames = classNames.substring(0, classNames.length - 1);
  return classNames;
}

function createStyle(bundle: AnserJsonEntry): React.CSSProperties {
  const style: React.CSSProperties = {};
  if (bundle.bg) {
    style.backgroundColor = `rgb(${bundle.bg})`;
  }
  if (bundle.fg) {
    style.color = `rgb(${bundle.fg})`;
  }
  switch (bundle.decoration) {
    case "bold":
      style.fontWeight = "bold";
      break;
    case "dim":
      style.opacity = "0.5";
      break;
    case "italic":
      style.fontStyle = "italic";
      break;
    case "hidden":
      style.visibility = "hidden";
      break;
    case "strikethrough":
      style.textDecoration = "line-through";
      break;
    case "underline":
      style.textDecoration = "underline";
      break;
    case "blink":
      style.textDecoration = "blink";
      break;
    default:
      break;
  }
  return style;
}

function convertBundleIntoReact(linkify: boolean | "fuzzy", useClasses: boolean, bundle: AnserJsonEntry, key: number): JSX.Element {
  const style = useClasses ? null : createStyle(bundle);
  const className = useClasses ? createClass(bundle) : null;

  if (!linkify) {
    return React.createElement("span", { style, key, className }, bundle.content);
  }

  if (linkify === "fuzzy") {
    return linkWithLinkify(bundle, key, style, className);
  }

  return linkWithClassicMode(bundle, key, style, className);
}

function linkWithClassicMode(bundle: AnserJsonEntry, key: number, style: React.CSSProperties | null, className: string | null) {
  const content: React.ReactNode[] = [];
  const linkRegex = /(\s|^)(https?:\/\/(?:www\.|(?!www))[^\s.]+\.[^\s]{2,}|www\.[^\s]+\.[^\s]{2,})/g;

  let index = 0;
  let match: RegExpExecArray | null;
  while ((match = linkRegex.exec(bundle.content)) !== null) {
    const [, pre, url] = match;

    const startIndex = match.index + pre.length;
    if (startIndex > index) {
      content.push(bundle.content.substring(index, startIndex));
    }

    const href = url.startsWith("www.") ? `http://${url}` : url;
    content.push(
      React.createElement(
        Anchor,
        {
          noIcon: true,
          color: "unset",
          key: index,
          href,
          target: "_blank",
        },
        `${url}`
      )
    );

    index = linkRegex.lastIndex;
  }

  if (index < bundle.content.length) {
    content.push(bundle.content.substring(index));
  }

  return React.createElement("span", { style, key, className }, content);
}

function linkWithLinkify(bundle: AnserJsonEntry, key: number, style: React.CSSProperties | null, className: string | null): JSX.Element {
  const linker = linkifyit({ fuzzyEmail: false }).tlds(["io"], true);

  if (!linker.pretest(bundle.content)) {
    return React.createElement("span", { style, key, className }, bundle.content);
  }

  const matches = linker.match(bundle.content);

  if (!matches) {
    return React.createElement("span", { style, key, className }, bundle.content);
  }

  const content: React.ReactNode[] = [bundle.content.substring(0, matches[0]?.index)];

  matches.forEach((match, i) => {
    content.push(
      React.createElement(
        Anchor,
        {
          noIcon: true,
          color: "unset",
          href: match.url,
          target: "_blank",
          key: i,
        },
        bundle.content.substring(match.index, match.lastIndex)
      )
    );

    if (matches[i + 1]) {
      content.push(bundle.content.substring(matches[i].lastIndex, matches[i + 1]?.index));
    }
  });

  if (matches[matches.length - 1].lastIndex !== bundle.content.length) {
    content.push(bundle.content.substring(matches[matches.length - 1].lastIndex, bundle.content.length));
  }
  return React.createElement("span", { style, key, className }, content);
}

export interface AnsiProps {
  children?: string;
  linkify?: boolean | "fuzzy";
  className?: string;
  useClasses?: boolean;
}

export function Ansi(props: AnsiProps): JSX.Element {
  const { className, useClasses, children, linkify, ...rest } = props;
  return React.createElement(
    Code,
    { className, ...rest },
    ansiToJSON(children ?? "", useClasses ?? false).map(convertBundleIntoReact.bind(null, linkify ?? false, useClasses ?? false))
  );
}

function fixBackspace(txt: string) {
  let tmp = txt;
  do {
    txt = tmp;
    tmp = txt.replace(/[^\n]\x08/gm, "");
  } while (tmp.length < txt.length);
  return txt;
}
