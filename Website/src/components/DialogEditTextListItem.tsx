import { useStrings } from "@Hooks/useStrings";
import { useTheme } from "@Hooks/useTheme";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { InputBaseProps } from "@mui/material/InputBase";
import ListItemButton from "@mui/material/ListItemButton";
import TextField from "@mui/material/TextField";
import React from "react";
import { CustomTextField } from "./TextField";

export interface DialogEditTextListItemProps extends React.PropsWithChildren {
  inputLabel: React.ReactNode;
  title: React.ReactNode;
  disabled?: boolean;
  initialValue: string;
  description?: React.ReactNode;
  type?: React.HTMLInputTypeAttribute;
  onSuccess: (value: string) => void;
  InputProps?: Partial<InputBaseProps>;
  counter?: boolean;
  helperText?: string;
  maxLength?: number;
  multiline?: boolean;
  maxRows?: number;
}

export const DialogEditTextListItem = (props: DialogEditTextListItemProps) => {
  const { strings } = useStrings();
  const { scheme, shade } = useTheme();

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
      <ListItemButton disabled={props.disabled} onClick={handleClickOpen}>
        {props.children}
      </ListItemButton>
      <Dialog open={open} maxWidth="md" fullWidth onClose={handleClose}>
        <DialogTitle>{props.title}</DialogTitle>
        <DialogContent>
          {props.description && <DialogContentText>{props.description}</DialogContentText>}

          <CustomTextField
            autoFocus
            fullWidth
            margin="dense"
            type={props.type || "text"}
            label={props.inputLabel}
            value={textInput}
            variant="outlined"
            onChange={handleRepoLinkChange}
            InputProps={props.InputProps}
            counter={props.counter}
            helperText={props.helperText}
            inputProps={{ maxLength: props.maxLength }}
            multiline={props.multiline}
            maxRows={props.maxRows}
          />
        </DialogContent>
        <DialogActions>
          <Button
            sx={{
              color: scheme[500],
            }}
            onClick={handleClose}
          >
            {strings("cancel")}
          </Button>
          <Button
            sx={{
              color: scheme[500],
            }}
            onClick={() => (props.onSuccess(textInput), handleClose())}
          >
            Apply
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
