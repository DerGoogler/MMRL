import * as React from "react";
import { Button, SearchInput } from "react-onsenui";
import { FormControl, SxProps, styled } from "@mui/material";
import useShadeColor from "../hooks/useShadeColor";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import { useTheme } from "@Hooks/useTheme";
import { useSettings } from "@Hooks/useSettings";
import FilterListIcon from "@mui/icons-material/FilterList";

type SearchbarProps = {
  sx?: SxProps;
  onFilterClick?: React.MouseEventHandler<HTMLButtonElement>;
  onChange: React.ChangeEventHandler<HTMLTextAreaElement | HTMLInputElement>;
  placeholder: string;
};

export const Searchbar = ({ sx, placeholder, onChange, onFilterClick }: SearchbarProps) => {
  return (
    <Paper
      elevation={0}
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
            // onKeyDown: (e: any) => {
            //   if (e.key === "Enter") {
            //     e.preventDefault();
            //     onSearch(value);
            //   }
            // },
          }}
          onChange={onChange}
          fullWidth
        />
      </FormControl>
    </Paper>
  );
};
