import { SxProps } from "@mui/material";
import Box from "@mui/material/Box";
import React, { useRef } from "react";

export type PreProps = React.JSX.IntrinsicElements["pre"] & {
  sx?: SxProps;
};

const Pre = React.forwardRef<HTMLElement, PreProps>((props, _ref) => {
  const ref = (_ref as React.MutableRefObject<HTMLPreElement | null>) || useRef<HTMLPreElement | null>(null);

  React.useEffect(() => {
    if (ref.current) {
      ref.current.addEventListener(
        "contextmenu",
        function (event) {
          event.returnValue = true;
          if (typeof event.stopPropagation === "function") {
            event.stopPropagation();
          }
          if (typeof event.cancelBubble === "function") {
            (event as any).cancelBubble();
          }
        },
        true
      );
    }
  }, []);

  return (
    <Box
      // @ts-ignore
      ref={ref}
      component="pre"
      {...props}
    />
  );
});

export default Pre;
