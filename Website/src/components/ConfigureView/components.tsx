import * as React from "react";
import ListSubheader from "@mui/material/ListSubheader";
import Box from "@mui/material/Box";
import { Paper, SxProps, Typography, styled } from "@mui/material";
import CodeOutlinedIcon from "@mui/icons-material/CodeOutlined";

import { DialogEditTextListItem, DialogEditTextListItemProps } from "@Components/DialogEditTextListItem";
import { Markup } from "@Components/Markdown";
import { useTheme } from "@Hooks/useTheme";

export const StyledListSubheader = styled(ListSubheader)({ backgroundColor: "transparent" });

export const DialogEditListItem = ({ children, ...rest }: DialogEditTextListItemProps) => (
  <DialogEditTextListItem {...rest} counter maxLength={92} children={children} />
);

export const PromoBanner = (props: React.PropsWithChildren & { sx?: SxProps }) => {
  const { theme, scheme } = useTheme();

  return (
    <Paper
      sx={{
        ...props.sx,
        color: theme.palette.text.primary,
        borderRadius: "12px",
        transition: "border 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, box-shadow 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
        overflow: "hidden",
        // minWidth: "280px",
        // maxWidth: "360px",
        // minHeight: "280px",
        display: "flex",
        flexDirection: "column",
        padding: "24px",
        background: `linear-gradient(to right bottom, ${scheme[500]}, ${scheme[600]} 120%)`,
        boxShadow: "rgba(0, 0, 0, 0.1) 0px 20px 25px, rgba(0, 0, 0, 0.04) 0px 10px 10px",
      }}
    >
      <Box
        sx={{
          marginTop: "auto",
          marginBottom: "auto",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "left",
            alignSelf: "center",
            alignItems: "center",
          }}
        >
          <CodeOutlinedIcon
            sx={{
              display: "flex",
              mr: 0.5,
              WebkitUserSelect: "none",
              MozUserSelect: "none",
              MsUserSelect: "none",
              userSelect: "none",
              width: "1em",
              height: "1em",
              fill: "#fff",
              WebkitFlexShrink: "0",
              MsFlexNegative: "0",
              flexShrink: "0",
              WebkitTransition: "fill 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
              transition: "fill 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
              fontSize: "1.5rem",
            }}
          />
          <Typography
            sx={{
              color: "#fff",
              display: "flex",
              justifyContent: "left",
              alignContent: "center",
              alignSelf: "center",
              mr: 2,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              textDecoration: "none",
            }}
          >
            MMRL
          </Typography>
        </Box>

        <Typography
          sx={{
            color: "#fff",
          }}
          variant="body1"
        >
          {props.children ? props.children : "The only high customizable root module manager. Always check our releases!"}
        </Typography>
      </Box>
    </Paper>
  );
};

export const Markdown = (props: { children?: string; fetch?: string }) => {
  const [text, setText] = React.useState<string>(props.children ? props.children : "");

  React.useEffect(() => {
    if (props.fetch) {
      fetch(props.fetch)
        .then((res) => res.text())
        .then((t) => {
          setText(t);
        });
    }
  }, [fetch]);

  return <Markup children={text} />;
};
