import { SetValue, useNativeStorage } from "./useNativeStorage";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import AbcIcon from "@mui/icons-material/Abc";
import { useTheme } from "./useTheme";
import Avatar from "@mui/material/Avatar";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import FilterListOff from "@mui/icons-material/FilterListOff";
import React from "react";

export const filters = [
  {
    name: "No filter",
    icon: FilterListOff,
    value: "none",
    allowedIds: ["explore", "local", "update"],
  },
  {
    name: "Newest date first",
    icon: CalendarMonthIcon,
    value: "date_newest",
    allowedIds: ["explore", "local", "update"],
  },
  {
    name: "Oldest date first",
    icon: CalendarMonthIcon,
    value: "date_oldest",
    allowedIds: ["explore", "local", "update"],
  },
  {
    name: "Name (A to Z)",
    icon: AbcIcon,
    value: "alphabetically",
    allowedIds: ["explore", "local", "update"],
  },
  {
    name: "Name (Z to A)",
    icon: AbcIcon,
    value: "alphabetically_reverse",
    allowedIds: ["explore", "local", "update"],
  },
  // {
  //   name: "Most stars",
  //   icon: StarIcon,
  //   value: "most_stars",
  //   allowedIds: ["explore"],
  // },
  // {
  //   name: "Least stars",
  //   icon: StarBorderIcon,
  //   value: "least_stars",
  //   allowedIds: ["explore"],
  // },
];

export const useModuleFilter = (key: string): [Array<any>, string, SetValue<string>] => {
  const [filter, setFilter] = useNativeStorage(key, filters[0].value);

  const f = React.useMemo(
    () => ({
      none: [{}],
      date_oldest: [{ key: "timestamp", descending: false }],
      date_newest: [{ key: "timestamp", descending: true }],
      alphabetically: [{ key: "name", descending: false }],
      alphabetically_reverse: [{ key: "name", descending: true }],
      // least_stars: [{ key: "stars", descending: false }],
      // most_stars: [{ key: "stars", descending: true }],
    }),
    []
  );

  return [f[filter], filter, setFilter];
};

interface FilterDialogProps {
  id: string;
  open: boolean;
  selectedValue: string;
  onClose: (value: string) => void;
}

export const FilterDialog = (props: FilterDialogProps) => {
  const { theme } = useTheme();
  const { onClose, selectedValue, open } = props;

  const handleClose = () => {
    onClose(selectedValue);
  };

  const handleListItemClick = (value: string) => {
    onClose(value);
  };

  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle>Apply filter</DialogTitle>
      <List sx={{ pt: 0 }}>
        {filters.map((filter) => (
          <ListItem disableGutters key={filter.value}>
            <ListItemButton onClick={() => handleListItemClick(filter.value)}>
              <ListItemAvatar>
                <Avatar>
                  <filter.icon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary={filter.name} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Dialog>
  );
};
