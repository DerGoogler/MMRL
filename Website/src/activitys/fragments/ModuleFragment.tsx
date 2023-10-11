import React from "react";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import FlatList from "flatlist-react";
import { Searchbar } from "@Components/Searchbar";
import { useActivity } from "@Hooks/useActivity";
import { useStrings } from "@Hooks/useStrings";
import { useSettings } from "@Hooks/useSettings";
import { useTheme } from "@Hooks/useTheme";
import { Page, RenderFunction } from "@Components/onsenui/Page";
import { MissingInternet } from "@Components/MissingInternet";
import { useNetwork } from "@Hooks/useNetwork";
import { FilterDialog, filters, useModuleFilter } from "@Hooks/useModulesFilter";
import { Disappear } from "react-disappear";
import { renderFunc } from "flatlist-react/lib/___subComponents/uiFunctions";
import Paper from "@mui/material/Paper";
import Pagination from "@mui/material/Pagination";
import { usePagination } from "@Hooks/usePagination";

import { styled, alpha } from "@mui/material/styles";
import Button from "@mui/material/Button";
import Menu, { MenuProps } from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import EditIcon from "@mui/icons-material/Edit";
import Divider from "@mui/material/Divider";
import ArchiveIcon from "@mui/icons-material/Archive";
import FileCopyIcon from "@mui/icons-material/FileCopy";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

const RenderWhenEmpty = React.memo(() => {
  const { theme } = useTheme();
  return (
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
      <Box>No modules were found</Box>
    </Stack>
  );
});

export interface ModuleFragmentProps {
  search: string;
  id: "explore" | "update" | "local";
  modules: Array<Module>;
  renderItem: renderFunc<Module>;
  renderFixed?: RenderFunction;
}

const StyledMenu = styled((props: MenuProps) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "right",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "right",
    }}
    {...props}
  />
))(({ theme }) => ({
  "& .MuiPaper-root": {
    borderRadius: 6,
    marginTop: theme.spacing(1),
    minWidth: 180,
    color: theme.palette.mode === "light" ? "rgb(55, 65, 81)" : theme.palette.grey[300],
    boxShadow:
      "rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px",
    "& .MuiMenu-list": {
      padding: "4px 0",
    },
    "& .MuiMenuItem-root": {
      "& .MuiSvgIcon-root": {
        fontSize: 18,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5),
      },
      "&:active": {
        backgroundColor: alpha(theme.palette.primary.main, theme.palette.action.selectedOpacity),
      },
    },
  },
}));

const ModuleFragment = React.memo<ModuleFragmentProps>((props) => {
  const { context } = useActivity();
  const { strings } = useStrings();
  const { settings } = useSettings();
  const { theme } = useTheme();
  const { isNetworkAvailable } = useNetwork();

  const renderItem = React.useCallback<renderFunc<Module>>((m, k) => props.renderItem(m, k), []);
  const [filter, _filter, setFilter] = useModuleFilter(`${props.id}_filter`);

  if (!isNetworkAvailable) {
    return (
      <Page>
        <MissingInternet />
      </Page>
    );
  }

  // const handleClickOpen = () => {
  //   setOpen(true);
  // };

  // const handleClose = (value: string) => {
  //   setOpen(false);
  //   setFilter(value);
  // };

  const [page, setPage] = React.useState(1);

  const modules = React.useMemo(() => props.modules, [props.modules]);

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const findCurrentFilter = React.useMemo(() => filters.find((f) => f.value === _filter), [_filter]);

  return (
    <Page renderFixed={props.renderFixed}>
      <Page.RelativeContent>
        <Stack direction="row" justifyContent="flex-end" alignItems="center" spacing={1}>
          <Button
            id="demo-customized-button"
            aria-controls={open ? "demo-customized-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            variant="contained"
            disableElevation
            onClick={handleClick}
            endIcon={<KeyboardArrowDownIcon />}
          >
            {findCurrentFilter ? findCurrentFilter.name : "None"}
          </Button>
          <StyledMenu
            id="demo-customized-menu"
            MenuListProps={{
              "aria-labelledby": "demo-customized-button",
            }}
            anchorEl={anchorEl}
            open={open}
            onClose={() => {
              setAnchorEl(null);
            }}
          >
            {filters.map((fil) => (
              <MenuItem
                onClick={() => {
                  setFilter(fil.value);
                  setAnchorEl(null);
                }}
                disableRipple
              >
                <fil.icon />
                {fil.name}
              </MenuItem>
            ))}
          </StyledMenu>
        </Stack>
        {/* <Paper
          component={Stack}
          elevation={0}
          justifyContent="center"
          spacing={0.8}
          direction="row"
          alignItems="center"
          sx={{
            borderRadius: theme.shape.borderRadius / theme.shape.borderRadius,
            p: 1,
            display: "flex",
            alignItems: "center",
            width: "100%",
          }}
        >
          <Pagination
            count={count}
            page={page}
            color={settings.darkmode ? "secondary" : "standard"}
            shape="rounded"
            onChange={(e, p) => {
              setPage(p);
              modules.jump(p);
            }}
          />
        </Paper> */}

        <Box sx={{ mt: 1 }}>
          <FlatList
            list={modules}
            renderItem={renderItem}
            renderOnScroll
            renderWhenEmpty={() => <RenderWhenEmpty />}
            search={{
              by: ["id", "name", "author", "description"],
              term: props.search,
            }}
            sortBy={filter}
            display={{
              row: true,
              rowGap: "8px",
            }}
          />
        </Box>
      </Page.RelativeContent>
    </Page>
  );
});

export default ModuleFragment;
