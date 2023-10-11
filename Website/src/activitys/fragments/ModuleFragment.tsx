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
import { FilterDialog, useModuleFilter } from "@Hooks/useModulesFilter";
import { Disappear } from "react-disappear";
import { renderFunc } from "flatlist-react/lib/___subComponents/uiFunctions";
import Paper from "@mui/material/Paper";
import Pagination from "@mui/material/Pagination";
import { usePagination } from "@Hooks/usePagination";

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

const ModuleFragment = React.memo<ModuleFragmentProps>((props) => {
  const { context } = useActivity();
  const { strings } = useStrings();
  const { settings } = useSettings();
  const { theme } = useTheme();
  const { isNetworkAvailable } = useNetwork();
  const [open, setOpen] = React.useState(false);

  const renderItem = React.useCallback<renderFunc<Module>>((m, k) => props.renderItem(m, k), []);

  const [filter, _filter, setFilter] = useModuleFilter(`${props.id}_filter`);

  if (!isNetworkAvailable) {
    return (
      <Page>
        <MissingInternet />
      </Page>
    );
  }

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (value: string) => {
    setOpen(false);
    setFilter(value);
  };

  const [page, setPage] = React.useState(1);

  const modules = React.useMemo(() => props.modules, [props.modules]);

  return (
    <Page renderFixed={props.renderFixed}>
      <Page.RelativeContent>
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

      <FilterDialog selectedValue={_filter} open={open} onClose={handleClose} />
    </Page>
  );
});

export default ModuleFragment;
