import { useStrings } from "@Hooks/useStrings";
import ListItem from "@mui/material/ListItem";
import { en_antifeatures } from "./../locales/antifeatures/en";
import React from "react";
import { ListItemText, SxProps } from "@mui/material";

interface AntiFeatureListItemProps {
  sx?: SxProps;
  type: string;
}

const AntiFeatureListItem = (props: AntiFeatureListItemProps) => {
  const find = React.useMemo(() => en_antifeatures.find((anti) => anti.id === props.type), []);

  if (!find) return null;

  return (
    <ListItem sx={props.sx} disablePadding>
      <ListItemText primary={find.name} secondary={find.desc} />
    </ListItem>
  );
};

export default AntiFeatureListItem;
