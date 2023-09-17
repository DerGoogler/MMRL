import { ExploreModule } from "@Components/ExploreModule";
import { Searchbar } from "@Components/Searchbar";
import React from "react";
import { useActivity } from "@Hooks/useActivity";
import { useRepos } from "@Hooks/useRepos";
import Stack from "@mui/material/Stack";
import Pagination from "@mui/material/Pagination";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
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

export interface ExploreModuleProps {
  renderToolbar?: RenderFunction;
  applyFilter: (modules: Module[], search: string) => Module[];
}

const ExploreModuleFragment = (props: ExploreModuleProps) => {
  const { context } = useActivity();
  const { strings } = useStrings();
  const { settings } = useSettings();
  const { scheme, theme } = useTheme();
  const { modules, repos } = useRepos();
  const { isNetworkAvailable } = useNetwork();
  const [search, setSearch] = React.useState("");

  const [open, setOpen] = React.useState(false);
  const [exploreFilter, setExploreFilter] = React.useState<number | string>("none");

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

  const handleChange = (event: SelectChangeEvent<typeof exploreFilter>) => {
    setExploreFilter(event.target.value);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (event: React.SyntheticEvent<unknown>, reason?: string) => {
    if (reason !== "backdropClick") {
      setOpen(false);
    }
  };

  return (
    <Page
      renderToolbar={props.renderToolbar}
      renderBottomToolbar={() => {
        return (
          <BottomToolbar modifier="transparent">
            <Stack justifyContent="center" spacing={0.8} direction="row" alignItems="center" style={{ height: "100%" }}>
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
            </Stack>
          </BottomToolbar>
        );
      }}
    >
      <Page.RelativeContent>
        <Searchbar onFilterClick={handleClickOpen} placeholder={strings.search_modules} onChange={(e) => setSearch(e.target.value)} />

        <Stack sx={{ mt: 1 }} direction="column" justifyContent="flex-start" alignItems="center" spacing={1}>
          {_DATA.currentData().map((module, index) => (
            <ExploreModule index={index} key={module.id + index} moduleProps={module} />
          ))}
        </Stack>
      </Page.RelativeContent>

      <Dialog disableEscapeKeyDown open={open} onClose={handleClose}>
        <DialogTitle>Apply a filter</DialogTitle>
        <DialogContent>
          <Box component="form" sx={{ display: "flex", flexWrap: "wrap" }}>
            <FormControl sx={{ m: 1, minWidth: 120 }}>
              <InputLabel id="demo-dialog-select-label">Filter</InputLabel>
              <Select
                labelId="demo-dialog-select-label"
                id="demo-dialog-select"
                value={exploreFilter}
                onChange={handleChange}
                input={<OutlinedInput label="Filter" />}
              >
                <MenuItem value="none">
                  <em>No filter</em>
                </MenuItem>
                <MenuItem value="date_oldest">By date (oldest)</MenuItem>
                <MenuItem value="date_newest">By date (newest)</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button
            sx={{
              color: scheme[500],
            }}
            onClick={handleClose}
          >
            Cancel
          </Button>
          <Button
            sx={{
              color: scheme[500],
            }}
            onClick={handleClose}
          >
            Apply
          </Button>
        </DialogActions>
      </Dialog>
    </Page>
  );
};

export default ExploreModuleFragment;
