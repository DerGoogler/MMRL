import { useNativeStorage } from "@Hooks/useNativeStorage";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { Box, Divider, SxProps } from "@mui/material";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import Menu, { MenuProps } from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { alpha, styled } from "@mui/material/styles";
import * as React from "react";

interface DropdownButtonPropsOptions extends React.PropsWithChildren {
  type?: "divider" | "item";
  disabled?: boolean;
  onClick?: React.MouseEventHandler<HTMLElement>;
}

interface DropdownButtonProps {
  sx?: SxProps;
  options: DropdownButtonPropsOptions[];
}

export const StyledMenu = styled((props: MenuProps) => (
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

export const DropdownButton = (props: DropdownButtonProps) => {
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef<HTMLElement>(null);
  const [selectedIndex, setSelectedIndex] = useNativeStorage("module_page_button_action", 0);

  const handleMenuItemClick = (event: React.MouseEvent<HTMLLIElement, MouseEvent>, index: number) => {
    setSelectedIndex(index);
    setOpen(false);
  };

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event: Event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target as HTMLElement)) {
      return;
    }

    setOpen(false);
  };

  return (
    <Box sx={props.sx}>
      <ButtonGroup variant="contained" aria-label="Button group with a nested menu">
        {/* @ts-ignore */}
        <Button {...props.options[selectedIndex]} />
        <Button
          ref={anchorRef as any}
          size="small"
          aria-controls={open ? "split-button-menu" : undefined}
          aria-expanded={open ? "true" : undefined}
          aria-label="select merge strategy"
          aria-haspopup="menu"
          onClick={handleToggle}
        >
          <ArrowDropDownIcon />
        </Button>
      </ButtonGroup>

      <StyledMenu anchorEl={anchorRef.current} open={open} onClose={handleClose}>
        {props.options.map((option, index) => {
          switch (option.type) {
            case "divider":
              return <Divider sx={{ my: 0.5 }} />;

            default:
              return (
                <MenuItem
                  key={index}
                  disabled={option.disabled}
                  selected={index === selectedIndex}
                  onClick={(event) => handleMenuItemClick(event, index)}
                >
                  {option.children}
                </MenuItem>
              );
          }
        })}
      </StyledMenu>
    </Box>
  );
};
