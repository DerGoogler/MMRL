import { useStrings } from "@Hooks/useStrings";
import Avatar from "@mui/material/Avatar";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import ImageIcon from "@mui/icons-material/Image";
import React from "react";

interface AntiFeatureListItemProps {
  type: string;
}

const AntiFeatureListItem = (props: AntiFeatureListItemProps) => {
  const { strings } = useStrings();

  return (
    <ListItem disablePadding>
      {/* @ts-ignore */}
      <ListItemText primary={props.type} secondary={strings(`AntiFeature_${props.type}_desc`)} />
    </ListItem>
  );
};

export default AntiFeatureListItem;
