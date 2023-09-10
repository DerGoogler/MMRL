import { useStrings } from "@Hooks/useStrings";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import ListItemButton from "@mui/material/ListItemButton";
import TextField from "@mui/material/TextField";
import React from "react";

interface DialogEditTextListItemProps extends React.PropsWithChildren {
  inputLabel: string;
  title: string;
  initialValue: string;
  description?: string;
  onSuccess: (value: string) => void;
}

export const DialogEditTextListItem = (props: DialogEditTextListItemProps) => {
  const { strings } = useStrings();

  const [textInput, setTextInput] = React.useState(props.initialValue);
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleRepoLinkChange = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    setTextInput(event.target.value);
  };

  return (
    <>
      <ListItemButton onClick={handleClickOpen}>{props.children}</ListItemButton>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{props.title}</DialogTitle>
        <DialogContent>
          {props.description && <DialogContentText>{props.description}</DialogContentText>}

          <TextField
            autoFocus
            fullWidth
            margin="dense"
            type="text"
            label={props.inputLabel}
            value={textInput}
            variant="outlined"
            onChange={handleRepoLinkChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>{strings.cancel}</Button>
          <Button onClick={() => (props.onSuccess(textInput), handleClose())}>Ok</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
