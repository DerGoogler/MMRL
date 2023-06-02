import { SVGAttributes } from "react";

interface Props {
  size: string | int;
  color: `#${string}`;
  className?: SVGAttributes<SVGSVGElement>;
}

const Warnmark = ({ color, size, className }: Props) => {
  return (
    <svg
      height={size}
      aria-hidden="true"
      viewBox="0 0 16 16"
      version="1.1"
      width={size}
      data-view-component="true"
      className={"octicon octicon-alert mr-1 " + className}
      style={{
        verticalAlign: "baseline",
      }}
    >
      <path
        fill={color}
        fill-rule="evenodd"
        d="M8.22 1.754a.25.25 0 00-.44 0L1.698 13.132a.25.25 0 00.22.368h12.164a.25.25 0 00.22-.368L8.22 1.754zm-1.763-.707c.659-1.234 2.427-1.234 3.086 0l6.082 11.378A1.75 1.75 0 0114.082 15H1.918a1.75 1.75 0 01-1.543-2.575L6.457 1.047zM9 11a1 1 0 11-2 0 1 1 0 012 0zm-.25-5.25a.75.75 0 00-1.5 0v2.5a.75.75 0 001.5 0v-2.5z"
      ></path>
    </svg>
  );
};

Warnmark.defaultProps = {
  size: "14",
  color: "#d29922",
};

export default Warnmark;
