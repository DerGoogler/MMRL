import { Util } from "googlers-tools";
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
declare const Disappear: (props: DisappearProps) => React.ReactElement<{
    ref: React.MutableRefObject<null>;
    className: string | undefined;
    style: Util.Undefineable<React.CSSProperties>;
}, string | React.JSXElementConstructor<any>>;
export { Disappear, DisappearProps };
