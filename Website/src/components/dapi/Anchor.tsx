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
import ModuleViewActivity from "@Activitys/ModuleViewActivity";
import { useSettings } from "@Hooks/useSettings";
import { GestureDetector } from "@Components/onsenui/GestureDetector";
import ons from "onsenui";

interface AnchorProps {
  noIcon?: boolean;
  module?: string;
}

const Xda = createSvgIcon(
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1026 1024" version="1.1">
    <path d="M0 716.373333l138.24-162.986666-138.24-162.986667L66.133333 335.36l128 151.466667 128-151.466667 66.133334 55.04-138.24 162.986667 138.24 162.986666-66.133334 54.613334-128-152.32-128 152.32-66.133333-54.613334M1026.133333 725.333333a42.666667 42.666667 0 0 1-42.666666 42.666667h-128a85.333333 85.333333 0 0 1-85.333334-85.333333v-85.333334a85.333333 85.333333 0 0 1 85.333334-85.333333h85.333333v-85.333333h-170.666667V341.333333h213.333334a42.666667 42.666667 0 0 1 42.666666 42.666667m-85.333333 213.333333h-85.333333v85.333334h85.333333v-85.333334m-256 128a42.666667 42.666667 0 0 1-42.666667 42.666667h-128a85.333333 85.333333 0 0 1-85.333333-85.333333v-256a85.333333 85.333333 0 0 1 85.333333-85.333334h85.333334V213.333333h85.333333v512m-85.333333-42.666666v-256h-85.333334v256h85.333334z" />
  </svg>,
  "Xda"
);

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

function Anchor(props) {
  const confirm = useConfirm();
  const { theme } = useTheme();
  const { context } = useActivity();
  const { settings } = useSettings();
  const { strings } = useStrings();
  const { href, children, noIcon, module, color = theme.palette.text.link, target = "_blank" } = props;

  const { modules } = useRepos();
  const findModule = React.useMemo(() => modules.find((m) => m.id === module), [module]);
  const icon = useIcon(href);

  const s = React.useMemo(
    () => ({
      display: "inline-block",
      "& ons-gesture-detector[href]": {
        cursor: "pointer",
        color: color,
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
    os.open(__href, {
      target: target,
      features: {
        color: theme.palette.background.default,
      },
    });
  }, [__href]);

  return (
    <Tooltip title={__href} placement="bottom" arrow disableInteractive>
      <Box sx={s}>
        <Stack
          component={GestureDetector as any}
          direction="row"
          spacing={0.5}
          href={__href}
          // onHold={() => {
          //   ons
          //     .openActionSheet({
          //       cancelable: true,
          //       buttons: ["Copy link"],
          //     })
          //     .then((index) => {
          //       switch (index) {
          //         case 0:
          //           console.log("link copied");
          //           break;
          //       }
          //     });
          // }}
          onTap={() => {
            if (__href && module && findModule) {
              context.pushPage({
                component: ModuleViewActivity,
                key: "ModuleViewActivity",
                extra: findModule,
              });
            } else {
              if (settings.link_protection) {
                confirm({
                  title: strings("anchor_confirm_title"),
                  description: strings("anchor_confirm_desc"),
                  confirmationText: strings("yes"),
                }).then(() => openLink());
              } else {
                openLink();
              }
            }
          }}
          color={color}
        >
          <Typography
            component="span"
            sx={{
              fontSize: "unset",
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
    </Tooltip>
  );
}

export default Anchor;
