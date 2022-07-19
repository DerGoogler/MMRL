import ViewX from "@Components/ViewX";
import { util } from "googlers-tools";
import { CSSProperties } from "react";
import { isDesktop } from "react-device-detect";

declare type Type = `video/${string}`;

interface VideoProps {
  src: string;
  type: Type;
  controls?: boolean;
  poster?: string;
  noSupportText?: string;
  style?: CSSProperties | string | undefined;
}

interface State {}

type E = HTMLVideoElement | HTMLIFrameElement;

class Video extends ViewX<VideoProps, State, E> {
  public createView(): JSX.Element {
    const { src, type, controls, noSupportText, style, poster } = this.props;
    const Style = {
      width: "100%",
      height: isDesktop ? "445px" : "181.500px",
      padding: "0px",
      margin: "0px",
    };

    switch (type) {
      case "video/youtube":
        return (
          <>
            <iframe
              className="Video--Custom card"
              style={util.typeCheck(style, Style)}
              src={`https://www.youtube.com/embed/${src.replace("https://www.youtube.com/watch?v=", "")}`}
            ></iframe>
          </>
        );

      default:
        return (
          <>
            <video
              className="Video--Custom card"
              style={util.typeCheck(style, Style)}
              controls={util.typeCheck(controls, true)}
              poster={poster}
            >
              <source src={src} type={util.typeCheck(type, "video/mp4")} />
              {util.typeCheck(noSupportText, "Your browser does not support HTML video.")}
            </video>
          </>
        );
    }
  }
}

export default Video;
