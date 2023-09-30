import { SetValue, useNativeStorage } from "./useNativeStorage";
import UpdateDisabledIcon from "@mui/icons-material/UpdateDisabled";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import AbcIcon from "@mui/icons-material/Abc";
import { useTheme } from "./useTheme";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";

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

export const useModuleFilter = (modules: arr<Module>): [arr<Module>, string, SetValue<string>] => {
  const [filter, setFilter] = useNativeStorage("filter", filters[0].value);

  switch (filter) {
    case "none":
      return [modules, filter, setFilter];
    case "date_oldest":
      return [
        modules.sort(function (a, b) {
          var da = new Date(a.last_update).getTime();
          var db = new Date(b.last_update).getTime();

          return da - db;
        }),
        filter,
        setFilter,
      ];
    case "date_newest":
      return [
        modules.sort(function (a, b) {
          var da = new Date(a.last_update).getTime();
          var db = new Date(b.last_update).getTime();

          return db - da;
        }),
        filter,
        setFilter,
      ];
    case "alphabetically":
      return [modules.sort((a, b) => a.name.localeCompare(b.name)), filter, setFilter];
    case "alphabetically_reverse":
      return [modules.sort((a, b) => b.name.localeCompare(a.name)), filter, setFilter];
    default:
      return [modules, filter, setFilter];
  }
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
