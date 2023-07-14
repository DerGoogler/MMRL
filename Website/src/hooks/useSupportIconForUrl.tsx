import SupportIcon from "@mui/icons-material/Support";
import GitHubIcon from "@mui/icons-material/GitHub";
import TelegramIcon from "@mui/icons-material/Telegram";
import { useRef } from "react";

export function useSupportIconForUrl(url: string | undefined) {
  const icon = useRef(SupportIcon);

  if (!url) {
    return icon.current;
  } else if (url.startsWith("https://t.me/")) {
    icon.current = TelegramIcon;
  } else if (url.startsWith("https://github.com/")) {
    icon.current = GitHubIcon;
  }
  return icon.current;
}
