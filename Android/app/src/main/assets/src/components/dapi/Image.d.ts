declare type Props = JSX.IntrinsicElements["img"] & {
    shadow?: string;
    title?: string;
    caption?: string;
};
declare function Image(props: Props): import("react/jsx-runtime").JSX.Element;
declare function ImageWithCaption(props: Props): import("react/jsx-runtime").JSX.Element;
export { Image, ImageWithCaption };
