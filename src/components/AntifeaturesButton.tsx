import { Chip, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, List, SxProps } from "@mui/material";
import Button from "@mui/material/Button";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import React from "react";
import { useStrings } from "@Hooks/useStrings";
import AntiFeatureListItem from "./AntiFeatureListItem";
import { GestureDetector } from "./onsenui/GestureDetector";

type Props = {
  sx?: SxProps;
  useChip?: boolean;
  antifeatures?: Track["antifeatures"];
};

export const AntifeatureButton = (props: Props) => {
  const [open, setOpen] = React.useState(false);

  const { strings } = useStrings();

  const handleClickOpen = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.preventDefault();
    e.stopPropagation();
    setOpen(true);
  };

  const handleClose = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    e.stopPropagation();
    setOpen(false);
  };

  return (
    <>
      {props.useChip ? (
        <Chip
          size="small"
          onClick={handleClickOpen}
          sx={props.sx}
          color="error"
          icon={<WarningAmberIcon sx={{ fontSize: "large" }} />}
          label={strings("antifeatures")}
        />
      ) : (
        // @ts-ignore
        <Button onClick={handleClickOpen} sx={props.sx} variant="contained" color="error" size="small">
          <WarningAmberIcon />
        </Button>
      )}
      <Dialog open={open} onClose={handleClose} scroll="paper">
        <DialogTitle>{strings("antifeatures")}</DialogTitle>
        <DialogContent dividers>
          <List disablePadding>
            {typeof props.antifeatures === "string" ? (
              <AntiFeatureListItem type={props.antifeatures} />
            ) : (
              Array.isArray(props.antifeatures) && props.antifeatures.map((anti) => <AntiFeatureListItem type={anti} />)
            )}
          </List>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>{strings("cancel")}</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
