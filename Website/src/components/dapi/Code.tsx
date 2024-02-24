import Box from "@mui/material/Box";
import React, { useRef } from "react";

const Code = React.forwardRef<HTMLElement, React.JSX.IntrinsicElements["code"]>((props, _ref) => {
  const ref = (_ref as React.MutableRefObject<HTMLElement | null>) || useRef<HTMLElement | null>(null);

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
      component="code"
      {...props}
    />
  );
});

export default Code;
