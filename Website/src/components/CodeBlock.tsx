import React from "react";
import { StyledMarkdown } from "./Markdown/StyledMarkdown";
import Pre from "./dapi/Pre";
import Code from "./dapi/Code";
import { SxProps } from "@mui/material";
import hljs from "highlight.js";

interface CodeBlockProps {
  lang?: string;
  children?: string;
  sx?: SxProps;
}

const CodeBlock = React.forwardRef<HTMLDivElement, CodeBlockProps>(({ lang, children, sx }, ref) => {
  const _ref = React.useRef<HTMLDivElement | null>(null);

  const className = React.useMemo(() => `lang-${lang} hljs language-${lang}`, [lang]);

  if (typeof children !== "string") {
    throw new TypeError("CodeBlock children aren't a string");
  }

  React.useEffect(() => {
    if (_ref.current) {
      _ref.current.querySelectorAll<HTMLElement>("pre code").forEach((block) => {
        block.removeAttribute("data-highlighted");
        hljs.highlightElement(block);
      });
    }
  }, [children]);

  return (
    <StyledMarkdown ref={_ref} sx={sx}>
      <Pre>
        <Code className={className}>{children}</Code>
      </Pre>
    </StyledMarkdown>
  );
});

export { CodeBlock, CodeBlockProps };
