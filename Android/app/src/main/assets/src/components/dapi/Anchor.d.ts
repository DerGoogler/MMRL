/// <reference types="react" />
declare function Anchor(props: JSX.IntrinsicElements["a"]): import("react/jsx-runtime").JSX.Element;
interface OpenProps extends React.PropsWithChildren {
    page: string;
    url?: string;
    title?: string;
}
export declare function Open(props: OpenProps): import("react/jsx-runtime").JSX.Element;
export default Anchor;
