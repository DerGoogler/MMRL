import { Divider, IconButton, Paper, InputBase, SxProps } from "@mui/material";
import { Search, Clear, FilterList } from "@mui/icons-material";
import React from "react";
import { OverridableComponent } from "@mui/material/OverridableComponent";
import { SvgIconTypeMap } from "@mui/material/SvgIcon";

interface SearchBarProps {
  placeholder?: string;
  filterIcon?: OverridableComponent<SvgIconTypeMap>;
  onFilterIconClick?: (event: React.MouseEvent<HTMLElement>) => void;
  onSearch: (value: string) => void;
  sx?: SxProps;
}

const SearchBar = React.forwardRef<HTMLDivElement, SearchBarProps>((props, ref) => {
  const [searchTerm, setSearchTerm] = React.useState("");
  const isNotEmpty = React.useMemo(() => searchTerm.trim().length !== 0, [searchTerm]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleClear = React.useCallback(() => {
    setSearchTerm("");
    if (props.onSearch) {
      props.onSearch("");
    }
  }, [searchTerm]);

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  const handleSearch = React.useCallback(() => {
    if (props.onSearch && isNotEmpty) {
      props.onSearch(searchTerm);
    }
  }, [searchTerm, isNotEmpty]);

  return (
    <Paper ref={ref} elevation={0} sx={{ p: "2px 4px", display: "flex", alignItems: "center", ...props.sx }}>
      {props.onFilterIconClick && (
        <IconButton onClick={props.onFilterIconClick} sx={{ p: "10px" }} aria-label="filter">
          {React.createElement(props.filterIcon || FilterList)}
        </IconButton>
      )}

      <InputBase
        sx={{ ml: 1, flex: 1 }}
        placeholder={props.placeholder}
        inputProps={{ "aria-label": props.placeholder?.toLowerCase() }}
        value={searchTerm}
        onChange={handleInputChange}
        onKeyDown={handleKeyPress}
      />
      <IconButton onClick={handleSearch} sx={{ p: "10px" }} aria-label="search">
        <Search />
      </IconButton>
      {isNotEmpty && (
        <>
          <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
          <IconButton onClick={handleClear} color="primary" sx={{ p: "10px" }} aria-label="directions">
            <Clear />
          </IconButton>
        </>
      )}
    </Paper>
  );
});

export { SearchBar, SearchBarProps };
