import { useTheme } from "@Hooks/useTheme";
import { Box, Stack, Tooltip, Typography, createSvgIcon } from "@mui/material";
import { os } from "@Native/Os";
import { useRepos } from "@Hooks/useRepos";
import React from "react";
import { useConfirm } from "material-ui-confirm";
import { createRegexURL } from "@Util/createRegexURL";

import {
  VolunteerActivism,
  LaunchRounded,
  Extension,
  GitHub,
  Telegram,
  YouTube,
  X,
  Facebook,
  Instagram,
  Email,
  LocalPhone,
} from "@mui/icons-material";
import { useStrings } from "@Hooks/useStrings";
import { useActivity } from "@Hooks/useActivity";
import { ModuleViewActivity } from "@Activitys/ModuleViewActivity";
import { useSettings } from "@Hooks/useSettings";
import { GestureDetector } from "@Components/onsenui/GestureDetector";
import { Xda } from "@Components/icons/Xda";
import { CodeBlock } from "@Components/CodeBlock";

type AnchorProps = React.JSX.IntrinsicElements["a"] & {
  noIcon?: boolean;
  icon?: typeof Xda;
  module?: string;
};

function useIcon(link) {
  if (createRegexURL("github", "com").test(link)) {
    return GitHub;
  } else if (createRegexURL(["xdaforums", "forum.xda-developers"], "com").test(link)) {
    return Xda;
  } else if (createRegexURL("(\\/[w-]+\\.)?t", "me").test(link)) {
    return Telegram;
  } else if (createRegexURL("paypal", ["me", "com"]).test(link)) {
    return VolunteerActivism;
  } else if (createRegexURL(["youtube", "youtu"], ["com", "be"]).test(link)) {
    return YouTube;
  } else if (createRegexURL(["x", "twitter"], "com").test(link)) {
    return X;
  } else if (createRegexURL("facebook", "com").test(link)) {
    return Facebook;
  } else if (createRegexURL(["instagram", "ig"], ["com", "me"]).test(link)) {
    return Instagram;
  } else if (/mailto:[\w-]+/i.test(link)) {
    return Email;
  } else if (/tel:\+?[\d-]+/i.test(link)) {
    return LocalPhone;
  } else {
    return LaunchRounded;
  }
}

function increase_brightness(hex, percent) {
  // strip the leading # if it's there
  hex = hex.replace(/^\s*#|\s*$/g, "");

  // convert 3 char codes --> 6, e.g. `E0F` --> `EE00FF`
  if (hex.length == 3) {
    hex = hex.replace(/(.)/g, "$1$1");
  }

  var r = parseInt(hex.substr(0, 2), 16),
    g = parseInt(hex.substr(2, 2), 16),
    b = parseInt(hex.substr(4, 2), 16);

  return (
    "#" +
    (0 | ((1 << 8) + r + ((256 - r) * percent) / 100)).toString(16).substr(1) +
    (0 | ((1 << 8) + g + ((256 - g) * percent) / 100)).toString(16).substr(1) +
    (0 | ((1 << 8) + b + ((256 - b) * percent) / 100)).toString(16).substr(1)
  );
}

const Anchor: React.FC<AnchorProps> = (props) => {
  const confirm = useConfirm();
  const { theme } = useTheme();
  const { context } = useActivity();
  const { strings } = useStrings();
  const { href, children, noIcon, module, color = theme.palette.text.link, target = os.WindowMMRLOwn } = props;

  const { modules } = useRepos();
  const findModule = React.useMemo(() => modules.find((m) => m.id === module), [module]);
  const icon = !props.icon ? useIcon(href) : props.icon;

  const [linkProtection] = useSettings("link_protection");

  const s = React.useMemo(
    () => ({
      display: "inline-block",
      "& a[href]": {
        cursor: "pointer",
        color: color,
        textDecoration: "none",
        display: "flex",
        alignItems: "center",
        fontWeight: "unset",
        ":hover": {
          background: `linear-gradient(${color}, ${color}) 0 100% / 0.1em 0.1em repeat-x`,
        },
        "& code": {
          color: increase_brightness(color, 75.09),
          backgroundColor: `${color}4d`,
        },
      },
    }),
    [color]
  );

  const __href = React.useMemo(() => (!(module && findModule) ? href : module), [href]);

  const openLink = React.useCallback(() => {
    os.openURL(__href, target, `color=${theme.palette.background.default}`);
  }, [__href]);

  const handleLinkClick = React.useCallback(
    (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
      e.stopPropagation();
      e.preventDefault();
      if (__href && module && findModule) {
        context.pushPage({
          component: ModuleViewActivity,
          key: "ModuleViewActivity",
          extra: findModule,
        });
      } else {
        if (linkProtection) {
          confirm({
            title: strings("anchor_confirm_title"),
            description: strings("anchor_confirm_desc", {
              codeblock: (
                <CodeBlock sx={{ mt: 1 }} lang="url">
                  {__href}
                </CodeBlock>
              ),
            }),
            confirmationText: strings("yes"),
          }).then(() => openLink());
        } else {
          openLink();
        }
      }
    },
    [__href]
  );

  return (
    <Box sx={s}>
      <Stack component="a" direction="row" spacing={0.5} href={__href} onClick={handleLinkClick} color={color}>
        <Typography
          component="span"
          sx={{
            fontSize: "unset",
            fontFamily: "unset",
          }}
          color={color}
        >
          {children}
        </Typography>
        {!noIcon && (
          <Box
            component={!(module && findModule) ? icon : Extension}
            sx={{
              color: color,
              fill: color,
              fontSize: "unset",
            }}
          />
        )}
      </Stack>
    </Box>
  );
};

export { Anchor };
