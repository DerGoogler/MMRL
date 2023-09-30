import { ExploreModule } from "@Components/ExploreModule";
import { Searchbar } from "@Components/Searchbar";
import React from "react";
import { useActivity } from "@Hooks/useActivity";
import { useRepos } from "@Hooks/useRepos";
import Stack from "@mui/material/Stack";
import Pagination from "@mui/material/Pagination";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import PersonIcon from "@mui/icons-material/Person";
import AddIcon from "@mui/icons-material/Add";
import Typography from "@mui/material/Typography";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import { useStrings } from "@Hooks/useStrings";
import { usePagination } from "@Hooks/usePagination";
import RepoActivity from "@Activitys/RepoActivity";
import { useSettings } from "@Hooks/useSettings";
import NorthEastRoundedIcon from "@mui/icons-material/NorthEastRounded";
import { useTheme } from "@Hooks/useTheme";
import { Page, RenderFunction } from "@Components/onsenui/Page";
import { BottomToolbar } from "@Components/onsenui/BottomToolbar";
import Icon from "@Components/Icon";
import { MissingInternet } from "@Components/MissingInternet";
import { useNetwork } from "@Hooks/useNetwork";
import { useNativeStorage } from "@Hooks/useNativeStorage";
import UpdateDisabledIcon from "@mui/icons-material/UpdateDisabled";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import AbcIcon from "@mui/icons-material/Abc";
import { Card } from "@mui/material";

export interface ExploreModuleProps {
  renderToolbar?: RenderFunction;
  applyFilter: (modules: Module[], search: string) => Module[];
}

const filters = [
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

const ExploreModuleFragment = (props: ExploreModuleProps) => {
  const { context } = useActivity();
  const { strings } = useStrings();
  const { settings } = useSettings();
  const { scheme, theme } = useTheme();
  const { modules, repos } = useRepos();
  const { isNetworkAvailable } = useNetwork();
  const [search, setSearch] = React.useState("");

  const [open, setOpen] = React.useState(false);

  const [exploreFilter, setExploreFilter] = useNativeStorage("filter", filters[0].value);

  const filterSystem = () => {
    const applyFilter = props.applyFilter(modules, search);

    switch (exploreFilter) {
      case "none":
        return applyFilter;
      case "date_oldest":
        return applyFilter.sort(function (a, b) {
          var da = new Date(a.last_update).getTime();
          var db = new Date(b.last_update).getTime();

          return da - db;
        });
      case "date_newest":
        return applyFilter.sort(function (a, b) {
          var da = new Date(a.last_update).getTime();
          var db = new Date(b.last_update).getTime();

          return db - da;
        });
      case "alphabetically":
        return applyFilter.sort((a, b) => a.name.localeCompare(b.name));
      case "alphabetically_reverse":
        return applyFilter.sort((a, b) => b.name.localeCompare(a.name));
      default:
        return applyFilter;
    }
  };

  const [page, setPage] = React.useState(1);

  const PER_PAGE = 20;
  const count = Math.ceil(filterSystem().length / PER_PAGE);
  const _DATA = usePagination(filterSystem(), PER_PAGE);

  if (!isNetworkAvailable) {
    return (
      <Page>
        <MissingInternet />
      </Page>
    );
  }

  if (repos.length === 0) {
    return (
      <Page>
        <Stack
          component="h4"
          sx={{
            color: theme.palette.secondary.dark,
            width: "100%",
            height: "100%",
            m: "unset",
          }}
          direction="row"
          justifyContent="center"
          alignItems="center"
          spacing={1}
        >
          <Box>Looks empty here... Add an</Box>
          <Stack
            direction="row"
            justifyContent="center"
            alignItems="center"
            spacing={0.5}
            sx={{
              color: theme.palette.primary.dark,
              ":hover": {
                cursor: "pointer",
              },
            }}
            onClick={() => {
              context.pushPage({
                component: RepoActivity,
                key: "repos",
                extra: {},
              });
            }}
          >
            <Box>{strings.repository}</Box>
            <Icon
              icon={NorthEastRoundedIcon}
              sx={{
                fontSize: 18,
              }}
            />
          </Stack>
        </Stack>
      </Page>
    );
  }

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (value: string) => {
    setOpen(false);
    setExploreFilter(value);
  };

  return (
    <Page renderToolbar={props.renderToolbar}>
      <Page.RelativeContent>
        <Searchbar
          sx={{
            borderRadius: `${theme.shape.borderRadius}px ${theme.shape.borderRadius}px 0px 0px`,
          }}
          onFilterClick={handleClickOpen}
          placeholder={strings.search_modules}
          onChange={(e) => setSearch(e.target.value)}
        />

        <Card
          component={Stack}
          elevation={0}
          justifyContent="center"
          spacing={0.8}
          direction="row"
          alignItems="center"
          sx={{
            borderRadius: `0px 0px ${theme.shape.borderRadius}px ${theme.shape.borderRadius}px`,
            pr: 1,
            pl: 1,
            pb: 1,
            display: "flex",
            alignItems: "center",
            width: "100%",
          }}
        >
          <Pagination
            count={count}
            color="primary"
            page={page}
            variant="outlined"
            shape="rounded"
            onChange={(e, p) => {
              setPage(p);
              _DATA.jump(p);
            }}
          />
        </Card>

        <Stack sx={{ mt: 1 }} direction="column" justifyContent="flex-start" alignItems="center" spacing={1}>
          {_DATA.currentData().map((module, index) => (
            <ExploreModule index={index} key={module.id + index} moduleProps={module} />
          ))}
        </Stack>
      </Page.RelativeContent>

      <FilterDialog selectedValue={exploreFilter} open={open} onClose={handleClose} />
    </Page>
  );
};

interface FilterDialogProps {
  open: boolean;
  selectedValue: string;
  onClose: (value: string) => void;
}

const FilterDialog = (props: FilterDialogProps) => {
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

export default ExploreModuleFragment;
