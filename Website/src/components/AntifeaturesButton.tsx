import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, List, SxProps } from "@mui/material";
import Button from "@mui/material/Button";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import React from "react";
import { useStrings } from "@Hooks/useStrings";
import AntiFeatureListItem from "./AntiFeatureListItem";

type Props = {
  sx?: SxProps;
  antifeatures?: Track["antifeatures"];
};

export const AntifeatureButton = (props: Props) => {
  const [open, setOpen] = React.useState(false);

  const { strings } = useStrings();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Button onClick={handleClickOpen} sx={props.sx} variant="contained" color="error" startIcon={<WarningAmberIcon />}>
        {strings("antifeatures")}
      </Button>
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
