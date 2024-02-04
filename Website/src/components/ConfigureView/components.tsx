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
