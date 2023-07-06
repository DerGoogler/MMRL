import { CSSProperties } from "react";
declare type Type = `video/${string}`;
interface VideoProps {
    src: string;
    type: Type;
    controls?: boolean;
    poster?: string;
    noSupportText?: string;
    style?: CSSProperties | undefined;
}
declare const Video: (props: VideoProps) => import("react/jsx-runtime").JSX.Element;
export default Video;
