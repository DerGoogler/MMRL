import { StyledMenu } from "@Components/DropdownButton";
import { MissingInternet } from "@Components/MissingInternet";
import { SearchBar } from "@Components/Searchbar";
import { Page, RenderFunction } from "@Components/onsenui/Page";
import { filters, useModuleFilter } from "@Hooks/useModulesFilter";
import { useNetwork } from "@Hooks/useNetwork";
import { useStrings } from "@Hooks/useStrings";
import { useTheme } from "@Hooks/useTheme";
import Box from "@mui/material/Box";
import MenuItem from "@mui/material/MenuItem";
import FlatList, { FlatListProps } from "flatlist-react";
import { renderFunc } from "flatlist-react/lib/___subComponents/uiFunctions";
import React from "react";

const RenderWhenEmpty = React.memo(() => {
  const { theme } = useTheme();
  return (
    <Box
      component="h4"
      sx={{
        color: theme.palette.text.secondary,
        position: "absolute",
        left: "50%",
        top: "50%",
        WebkitTransform: "translate(-50%, -50%)",
        transform: "translate(-50%, -50%)",
      }}
    >
      No modules were found
    </Box>
  );
});

export interface ModuleFragmentProps {
  id: "explore" | "update" | "local";
  modules: Array<Module>;
  group?: FlatListProps<Module>["group"];
  disableNoInternet?: boolean;
  renderItem: renderFunc<Module>;
  renderFixed?: RenderFunction;
}

const ModuleFragment = React.memo<ModuleFragmentProps>((props) => {
  const { isNetworkAvailable } = useNetwork();
  const { theme } = useTheme();
  const { strings } = useStrings();
  const renderItem = React.useCallback<renderFunc<Module>>((m, k) => props.renderItem(m, k), []);
  const [filter, _filter, setFilter] = useModuleFilter(`${props.id}_filter`);
  const [search, setSearch] = React.useState("");

  if (!isNetworkAvailable && !props.disableNoInternet) {
    return (
      <Page>
        <MissingInternet />
      </Page>
    );
  }

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
        <SearchBar
          placeholder={strings("search_modules") as string}
          onSearch={(value) => {
            setSearch(value);
            console.log(value);
          }}
          filterIcon={findCurrentFilter?.icon}
          onFilterIconClick={handleClick}
        />
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
          {filters.map((fil) => {
            if (fil.allowedIds.includes(props.id)) {
              return (
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
              );
            } else {
              return null;
            }
          })}
        </StyledMenu>

        <Box sx={{ mt: 1 }}>
          <FlatList
            list={modules}
            renderItem={renderItem}
            renderOnScroll
            renderWhenEmpty={() => <RenderWhenEmpty />}
            sortBy={filter}
            search={{
              term: search,
              by: ["id", "name", "author"],
              //onEveryWord: true,
              caseInsensitive: true,
            }}
            display={{
              row: true,
              rowGap: "8px",
            }}
            group={props.group}
          />
        </Box>
      </Page.RelativeContent>
    </Page>
  );
});

export default ModuleFragment;
