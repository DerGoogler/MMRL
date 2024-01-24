import React, { useRef } from "react";

const Pre = React.forwardRef<HTMLElement, React.JSX.IntrinsicElements["pre"]>((props, _ref) => {
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

  return <pre ref={ref} {...props} />;
});

export default Pre;
