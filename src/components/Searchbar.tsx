import * as React from "react";
import { FormControl, SxProps, styled } from "@mui/material";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import FilterListIcon from "@mui/icons-material/FilterList";

export interface SearchbarProps {
  elevation?: number | undefined;
  sx?: SxProps;
  onFilterClick?: React.MouseEventHandler<HTMLButtonElement>;
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  placeholder: string;
}

export const Searchbar = React.memo<SearchbarProps>((props) => {
  const { elevation, onFilterClick, sx, placeholder, value, setValue } = props;

  const handleChange = React.useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setValue(e.target.value);
  }, []);

  return (
    <Paper
      elevation={elevation || 0}
      component="form"
      sx={{
        ...sx,
        p: "2px 4px",
        display: "flex",
        alignItems: "center",
        width: "100%",
      }}
    >
      <IconButton onClick={onFilterClick} sx={{ p: "10px" }} aria-label="menu">
        <FilterListIcon />
      </IconButton>
      <FormControl fullWidth>
        <InputBase
          sx={{ ml: 1, flex: 1 }}
          placeholder={placeholder}
          inputProps={{
            "aria-label": placeholder,
            onKeyDown: (e) => {
              if (e.key === "Enter") {
                e.preventDefault();
              }
            },
          }}
          value={value}
          onChange={handleChange}
          fullWidth
        />
      </FormControl>
    </Paper>
  );
});
