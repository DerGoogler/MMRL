import { SetValue, useNativeStorage } from "./useNativeStorage";
import UpdateDisabledIcon from "@mui/icons-material/UpdateDisabled";
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
import React from "react";

export const filters = [
  {
    name: "No filter",
    icon: UpdateDisabledIcon,
    value: "none",
  },
  {
    name: "By date (newest)",
    icon: CalendarMonthIcon,
    value: "date_newest",
  },
  {
    name: "By date (oldest)",
    icon: CalendarMonthIcon,
    value: "date_oldest",
  },
  {
    name: "Alphabetically",
    icon: AbcIcon,
    value: "alphabetically",
  },
  {
    name: "Alphabetically (reverse)",
    icon: AbcIcon,
    value: "alphabetically_reverse",
  },
];

export const useModuleFilter = (key: string): [Array<any>, string, SetValue<string>] => {
  const [filter, setFilter] = useNativeStorage(key, filters[0].value);

  const f = React.useMemo(
    () => ({
      none: [{}],
      date_oldest: [{ key: "last_update", descending: false }],
      date_newest: [{ key: "last_update", descending: true }],
      alphabetically: [{ key: "name", descending: false }],
      alphabetically_reverse: [{ key: "name", descending: true }],
    }),
    []
  );

  return [f[filter], filter, setFilter];
};

interface FilterDialogProps {
  open: boolean;
  selectedValue: string;
  onClose: (value: string) => void;
}

export const FilterDialog = (props: FilterDialogProps) => {
  const { scheme, theme } = useTheme();
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
                <Avatar
                  sx={{
                    bgcolor: scheme[100],
                    color: scheme[600],
                    border: filter.value === selectedValue ? `2px solid ${scheme[600]}` : "unset",
                  }}
                >
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
