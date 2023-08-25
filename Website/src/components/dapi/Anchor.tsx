import { useTheme } from "@Hooks/useTheme";
import { styled } from "@mui/material";
import { useActivity } from "../../hooks/useActivity";
import Icon from "@Components/Icon";
import NorthEastRoundedIcon from "@mui/icons-material/NorthEastRounded";
import LaunchRoundedIcon from "@mui/icons-material/LaunchRounded";
import { os } from "@Native/Os";
import SettingsActivity from "@Activitys/SettingsActivity";
import RepoActivity from "@Activitys/RepoActivity";
import DescriptonActivity from "@Activitys/DescriptonActivity";
import { useSettings } from "@Hooks/useSettings";

interface AnchorProps {
  noIcon?: boolean;
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
    "& div[href]": s,
    "& div[page]": s,
  };
});

function Anchor(props: JSX.IntrinsicElements["a"] & AnchorProps) {
  const { href, children, noIcon, ...rest } = props;

  const { theme, scheme } = useTheme();

  return (
    <StyledAnchor>
      <div
        href={href}
        // @ts-ignore
        onClick={() => {
          href
            ? os.open(href, {
                target: "_blank",
                features: {
                  color: theme.palette.primary.main,
                },
              })
            : null;
        }}
        {...rest}
      >
        {children}
        {!noIcon && (
          <>
            {" "}
            <Icon
              icon={LaunchRoundedIcon}
              sx={{
                fontSize: 16,
                marginLeft: "2px",
              }}
            />
          </>
        )}
      </div>
    </StyledAnchor>
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
      <div
        // @ts-ignore
        page={page}
        // @ts-ignore
        onClick={() => {
          switch (page) {
            case "settings":
              context.pushPage({
                component: SettingsActivity,
                key: "settings",
              });
              break;

            case "repos":
              context.pushPage({
                component: RepoActivity,
                key: "repo",
              });
              break;
            case "request":
              if (!props.url) {
                os.toast("Missing Url!", "short");
              } else {
                context.pushPage({
                  component: DescriptonActivity,
                  key: `desc_open${Math.round(Math.random() * 56)}`,
                  extra: {
                    request: {
                      use: true,
                      url: props.url,
                    },
                    shortDesc: props.title,
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
      </div>
    </StyledAnchor>
  );
}

export default Anchor;
