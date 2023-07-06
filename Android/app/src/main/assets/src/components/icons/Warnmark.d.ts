import { SVGAttributes } from "react";
interface Props {
    size: string | int;
    color: `#${string}`;
    className?: SVGAttributes<SVGSVGElement>;
}
declare const Warnmark: {
    ({ color, size, className }: Props): import("react/jsx-runtime").JSX.Element;
    defaultProps: {
        size: string;
        color: string;
    };
};
export default Warnmark;
