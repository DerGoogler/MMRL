declare type Theme = "light" | "dark";
interface DiscordWidgetProps {
    token: string | number;
    width?: string | number | undefined;
    height?: string | number | undefined;
    theme?: Theme | undefined;
}
declare const DiscordWidget: (props: DiscordWidgetProps) => import("react/jsx-runtime").JSX.Element;
export { DiscordWidget };
