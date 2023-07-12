import { os } from "@Native/Os";
import { useTheme } from "./useTheme";

export default function useShadeColor() {
  const { scheme } = useTheme();

  return (color: any, percent: any) => {
    // Ignore shading if monet is enabled.
    if (scheme === "monet") {
      return color;
    } else {
      var R = parseInt(color.substring(1, 3), 16);
      var G = parseInt(color.substring(3, 5), 16);
      var B = parseInt(color.substring(5, 7), 16);

      // @ts-ignore
      R = parseInt((R * (100 + percent)) / 100);
      // @ts-ignore
      G = parseInt((G * (100 + percent)) / 100);
      // @ts-ignore
      B = parseInt((B * (100 + percent)) / 100);

      R = R < 255 ? R : 255;
      G = G < 255 ? G : 255;
      B = B < 255 ? B : 255;

      var RR = R.toString(16).length == 1 ? "0" + R.toString(16) : R.toString(16);
      var GG = G.toString(16).length == 1 ? "0" + G.toString(16) : G.toString(16);
      var BB = B.toString(16).length == 1 ? "0" + B.toString(16) : B.toString(16);

      return "#" + RR + GG + BB;
    }
  };
}
