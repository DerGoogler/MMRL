import ViewX from "@Components/ViewX";
import { SVGAttributes } from "react";

interface Props {
  size: string | int;
  color: `#${string}`;
  className?: SVGAttributes<SVGSVGElement>;
}

class Dankermark extends ViewX<Props, {}, SVGSVGElement> {
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
        className={"octicon octicon-x color-fg-danger ml-n3 v-align-middle " + className}
        style={{
          verticalAlign: "baseline",
        }}
      >
        <path
          fill={color}
          fill-rule="evenodd"
          d="M3.72 3.72a.75.75 0 011.06 0L8 6.94l3.22-3.22a.75.75 0 111.06 1.06L9.06 8l3.22 3.22a.75.75 0 11-1.06 1.06L8 9.06l-3.22 3.22a.75.75 0 01-1.06-1.06L6.94 8 3.72 4.78a.75.75 0 010-1.06z"
        ></path>
      </svg>
    );
  }
}

Dankermark.defaultProps = {
  size: "14",
  color: "#cf222e",
};

export default Dankermark;
