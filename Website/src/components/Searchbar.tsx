import * as React from "react";
import { Button, SearchInput } from "react-onsenui";
import { FormControl, styled } from "@mui/material";
import useShadeColor from "../hooks/useShadeColor";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import { useTheme } from "@Hooks/useTheme";
import { useSettings } from "@Hooks/useSettings";

type SearchbarProps = {
  onChange: React.ChangeEventHandler<HTMLTextAreaElement | HTMLInputElement>;
  placeholder: string;
};

export const Searchbar = ({ placeholder, onChange }: SearchbarProps) => {
  const { scheme } = useTheme();
  const shade = useShadeColor();
  const { settings } = useSettings();

  return (
    <div
      style={{
        textAlign: "center",
        display: "inline-flex",
        justifyContent: "center",
        padding: "0px 0px 8px",
        width: "100%",
      }}
    >
      <Paper
        component="form"
        variant="outlined"
        sx={{
          p: "2px 4px",
          display: "flex",
          alignItems: "center",
          width: "100%",
          bgcolor: settings.darkmode ? shade(scheme[900], -70) : "rgb(255, 255, 255)",
        }}
      >
        <IconButton
          // onClick={() => {
          //   onSearch(value);
          // }}
          sx={{ p: "10px" }}
          aria-label="menu"
        >
          <SearchIcon />
        </IconButton>
        <FormControl>
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
    </div>
  );
};
