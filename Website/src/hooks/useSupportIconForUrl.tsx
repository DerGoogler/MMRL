import SupportIcon from "@mui/icons-material/Support";
import GitHubIcon from "@mui/icons-material/GitHub";
import TelegramIcon from "@mui/icons-material/Telegram";
import { useRef } from "react";

interface Support {
  SupportIcon: typeof SupportIcon;
  supportText: string;
}

export function useSupportIconForUrl(url: string | undefined) {
  const icon = useRef<Support>({
    SupportIcon: SupportIcon,
    supportText: "Support",
  });

  if (!url) {
    return icon.current;
  } else if (url.startsWith("https://t.me/")) {
    icon.current = {
      SupportIcon: SupportIcon,
      supportText: "Telegram",
    };
  } else if (url.startsWith("https://discord.gg/") || url.startsWith("https://discord.com/invite/")) {
    icon.current = {
      SupportIcon: SupportIcon,
      supportText: "Discord",
    };
  } else if (url.startsWith("https://github.com/")) {
    icon.current = {
      SupportIcon: GitHubIcon,
      supportText: "GitHub",
    };
  } else if (url.startsWith("https://gitlab.com/")) {
    icon.current = {
      SupportIcon: SupportIcon,
      supportText: "GitLab",
    };
  } else if (url.startsWith("https://xdaforums.com/") || url.startsWith("https://forum.xda-developers.com/")) {
    icon.current = {
      SupportIcon: SupportIcon,
      supportText: "XDA Developers",
    };
  }

  return icon.current;
}
