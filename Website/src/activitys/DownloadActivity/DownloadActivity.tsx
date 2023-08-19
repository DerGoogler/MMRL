import { Phones } from "./components/Phones";
import { Toolbar } from "@Components/onsenui/Toolbar";
import { Page } from "@Components/onsenui/Page";
import { Carousel, CarouselItem } from "react-onsenui";
import { useActivity } from "@Hooks/useActivity";
import { useTheme } from "@Hooks/useTheme";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import Grow from "@mui/material/Grow";
import Popper from "@mui/material/Popper";
import MenuItem from "@mui/material/MenuItem";
import MenuList from "@mui/material/MenuList";
import React from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import CardMedia from "@mui/material/CardMedia";

function DownloadActivity() {
  const { context, extra } = useActivity();
  const { scheme, theme } = useTheme();

  const { _1, _2 } = Phones({
    screenColor: scheme[500],
    caseColor: scheme[600],
  });

  const renderToolbar = () => {
    return (
      <Toolbar modifier="noshadow">
        <Toolbar.Center>Download MMRL</Toolbar.Center>
      </Toolbar>
    );
  };

  return (
    <Page renderToolbar={renderToolbar}>
      <Page.RelativeContent>
        <CardMedia component="img" image="https://mmrl.dergoogler.com/assets/MMRL-Cover.png" alt="MMRL" />
        <ButtonGroup>
          <Button
            onClick={() => {
              window.open();
            }}
          >
            Latest
          </Button>
          <Button
            onClick={() => {
              window.open();
            }}
          >
            Releases
          </Button>
        </ButtonGroup>
      </Page.RelativeContent>
    </Page>
  );
}

export { DownloadActivity };
