import { Component } from "react";
import tools from "@Utils/tools";

declare type Theme = "light" | "dark";

interface DiscordWidgetInterface {
  token: string | number;
  width: string | number;
  height: string | number;
  theme: Theme;
}

class DiscordWidget extends Component<DiscordWidgetInterface> {
  public render() {
    const { token, width, height, theme } = this.props;
    return (
      <>
        <iframe
          className="DiscordWidget--Custom card"
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: "0px",
          }}
          src={
            "https://discord.com/widget?id=" + tools.typeCheck(token, "753360232515764255") + " &theme=" + tools.typeCheck(theme, "dark")
          }
          width={tools.typeCheck(width, 350)}
          height={tools.typeCheck(height, 500)}
          allowTransparency={true}
          frameBorder="0"
          sandbox="allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts"
        ></iframe>
      </>
    );
  }
}

export default DiscordWidget;
