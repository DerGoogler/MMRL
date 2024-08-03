import { doc, Util } from "googlers-tools";
import * as React from "react";

interface DisappearProps {
  children: React.ReactNode;
  style?: Util.Undefineable<React.CSSProperties>;
  className?: string;
  /**
   * @return The current state of the disappear component
   */
  onDisappear: (visible: boolean) => void;
  /**
   * Used to wrap the inner children
   */
  wrapper: keyof JSX.IntrinsicElements;
}

const Disappear = (props: DisappearProps) => {
  const [isIntersecting, setIntersecting] = React.useState(false);
  const ref = React.useRef(null);

  const observer = new IntersectionObserver(([entry]) => setIntersecting(entry.isIntersecting));

  React.useEffect(() => {
    doc.findRef(ref, (r) => {
      observer.observe(r as any);
    });
    return () => {
      observer.disconnect();
    };
  }, []);

  const { children, className, style, wrapper } = props;
  return React.createElement(
    wrapper,
    {
      ref: ref,
      className: className,
      style: style,
    },
    children
  );
};

export { Disappear, DisappearProps };
