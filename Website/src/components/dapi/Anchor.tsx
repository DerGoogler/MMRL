import { useTheme } from "@Hooks/useTheme";
import { Box, Stack, Tooltip, Typography, styled } from "@mui/material";
import { useActivity } from "../../hooks/useActivity";
import Icon from "@Components/Icon";
import NorthEastRoundedIcon from "@mui/icons-material/NorthEastRounded";
import LaunchRoundedIcon from "@mui/icons-material/LaunchRounded";
import { os } from "@Native/Os";
import SettingsActivity from "@Activitys/SettingsActivity";
import RepoActivity from "@Activitys/RepoActivity";
import { useSettings } from "@Hooks/useSettings";
import ModuleViewActivity from "@Activitys/ModuleViewActivity";
import ExtensionIcon from "@mui/icons-material/Extension";
import { useRepos } from "@Hooks/useRepos";
import FetchTextActivity from "@Activitys/FetchTextActivity";
import React from "react";

interface AnchorProps {
  noIcon?: boolean;
  module?: string;
}

const StyledAnchor = styled("div")(({ theme }) => {
  const { scheme } = useTheme();
  const { settings } = useSettings();

  const s = {
    cursor: "pointer",
    color: settings.darkmode ? scheme[200] : scheme[700],
    // color: !settings.darkmode ? "rgb(66, 66, 66)" : scheme[700],
    display: "flex",
    alignItems: "center",

    ":hover": {
      textDecoration: "underline",
    },
  };

  return {
    display: "inline-block",
    "& mmrl-anchor[href]": s,
    "& mmrl-anchor[page]": s,
  };
});

function Anchor(props: JSX.IntrinsicElements["a"] & AnchorProps) {
  const { href, children, noIcon, module, color } = props;

  const { theme, scheme } = useTheme();
  const { settings } = useSettings();
  const { modules } = useRepos();
  const { context } = useActivity();

  const _color = !color ? (settings.darkmode ? scheme[200] : scheme[700]) : color;

  const s = React.useMemo(
    () => ({
      cursor: "pointer",
      color: _color,
      display: "flex",
      alignItems: "center",
      ":hover": {
        textDecorationColor: _color,
        textDecoration: "underline",
      },
    }),
    [color]
  );

  const findModule = React.useMemo(() => modules.find((m) => m.id === module), [module]);

  const __href = !(module && findModule) ? href : module;

  return (
    <Tooltip title={__href} placement="bottom" arrow>
      <Box
        sx={{
          display: "inline-block",
          "& div[href]": s,
          "& div[page]": s,
        }}
      >
        <Stack
          component={"div" as any}
          direction="row"
          spacing={0.5}
          href={__href}
          onClick={() => {
            if (module && findModule) {
              context.pushPage({
                component: ModuleViewActivity,
                key: "ModuleViewActivity",
                extra: findModule,
              });
            } else {
              if (__href) {
                os.open(__href, {
                  target: "_blank",
                  features: {
                    color: theme.palette.primary.main,
                  },
                });
              }
            }
          }}
          color={_color}
        >
          <Typography
            component="span"
            sx={{
              fontSize: "unset",
            }}
            color={_color}
          >
            {children}
          </Typography>
          {!noIcon && (
            <Typography
              component={Icon}
              icon={!(module && findModule) ? LaunchRoundedIcon : ExtensionIcon}
              sx={{
                color: _color,
                fill: _color,
                fontSize: "unset",
              }}
            />
          )}
        </Stack>
      </Box>
    </Tooltip>
  );
}

interface OpenProps extends React.PropsWithChildren, AnchorProps {
  page: string;
  url?: string;
  title?: string;
}

export function Open(props: OpenProps) {
  const { page, children, noIcon } = props;
  const { context } = useActivity();

  return (
    <StyledAnchor>
      <Box
        component="mmrl-anchor"
        page={page}
        onClick={() => {
          switch (page) {
            case "settings":
              context.pushPage({
                component: SettingsActivity,
                key: "SettingsActivity",
              });
              break;

            case "repos":
              context.pushPage({
                component: RepoActivity,
                key: "RepoActivity",
              });
              break;
            case "request":
              if (!props.url) {
                os.toast("Missing Url!", "short");
              } else {
                context.pushPage({
                  component: FetchTextActivity,
                  key: "FetchTextActivity",
                  extra: {
                    url: props.url,
                    title: props.title,
                  },
                });
              }
              break;
            default:
              break;
          }
        }}
      >
        {children}
        {!noIcon && (
          <>
            {" "}
            <Icon
              icon={NorthEastRoundedIcon}
              sx={{
                fontSize: 16,
                marginLeft: "2px",
              }}
            />
          </>
        )}
      </Box>
    </StyledAnchor>
  );
}

export default Anchor;
