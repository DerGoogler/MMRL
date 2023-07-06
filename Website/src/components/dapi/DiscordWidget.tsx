import { util } from "googlers-tools";

type Theme = "light" | "dark";

interface DiscordWidgetProps {
  token: string | number;
  width?: string | number | undefined;
  height?: string | number | undefined;
  theme?: Theme | undefined;
}

const DiscordWidget = (props: DiscordWidgetProps) => {
  const { token, width, height, theme } = props;

  return (
    <>
      <iframe
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "0px",
        }}
        src={"https://discord.com/widget?id=" + util.typeCheck(token, "753360232515764255") + " &theme=" + util.typeCheck(theme, "dark")}
        width={util.typeCheck(width, 350)}
        height={util.typeCheck(height, 500)}
        allowTransparency={true}
        frameBorder="0"
        sandbox="allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts"
      ></iframe>
    </>
  );
};

export { DiscordWidget };
