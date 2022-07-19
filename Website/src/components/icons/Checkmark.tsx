import ViewX from "@Components/ViewX";
import { SVGAttributes } from "react";

interface Props {
  size: string | int;
  color: `#${string}`;
  className?: SVGAttributes<SVGSVGElement>;
}

class Checkmark extends ViewX<Props, {}, SVGSVGElement> {
  public static defaultProps: Props;

  public createView() {
    const { color, size, className } = this.props;
    return (
      <svg
        width={size}
        viewBox="0 0 16 16"
        version="1.1"
        height={size}
        aria-hidden="true"
        className={"octicon octicon-check color-fg-success ml-n3 v-align-middle " + className}
        style={{
          verticalAlign: "baseline",
        }}
      >
        <path
          fill={color}
          fill-rule="evenodd"
          d="M13.78 4.22a.75.75 0 010 1.06l-7.25 7.25a.75.75 0 01-1.06 0L2.22 9.28a.75.75 0 011.06-1.06L6 10.94l6.72-6.72a.75.75 0 011.06 0z"
        ></path>
      </svg>
    );
  }
}

Checkmark.defaultProps = {
  size: "14",
  color: "#1a7f37",
};

export default Checkmark;
