import Button from "@mui/material/Button";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Dialog from "@mui/material/Dialog";
import RadioGroup from "@mui/material/RadioGroup";
import Radio from "@mui/material/Radio";
import FormControlLabel from "@mui/material/FormControlLabel";
import React from "react";

import { ListItemButton } from "@mui/material";
import { Settings, useSettings } from "@Hooks/useSettings";
import { StyledListItemText } from "./StyledListItemText";

type ContentMap = {
  name: string;
  value: string;
};

interface PickerItemProps {
  id: string;
  contentMap: ContentMap[];
  targetSetting: "language" | "accent_scheme";
  title: string;
}

/**
 * Remembers! The first item in the array will be the default.
 * @param props
 * @returns
 */
export function ListPickerItem(props: PickerItemProps) {
  const [open, setOpen] = React.useState(false);
  const { settings, setSettings } = useSettings();
  const [value, setValue] = React.useState<ContentMap>(settings[props.targetSetting]);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = (val: any) => {
    setOpen(false);

    if (val.name && val.value) {
      setValue(val);
      setSettings(props.targetSetting, val);
    }
  };

  return (
    <>
      <ListItemButton onClick={handleOpen}>
        <StyledListItemText primary={props.title} secondary={settings[props.targetSetting].name} />
      </ListItemButton>
      <ConfirmationDialogRaw
        id={props.id}
        title={props.title}
        keepMounted
        open={open}
        contentMap={props.contentMap}
        onClose={handleClose}
        value={value}
      />
    </>
  );
}

export interface ConfirmationDialogRawProps {
  id: string;
  keepMounted: boolean;
  title: string;
  value: ContentMap;
  open: boolean;
  contentMap: ContentMap[];
  onClose: (val: ContentMap | null) => void;
}

export function ConfirmationDialogRaw(props: ConfirmationDialogRawProps) {
  const { onClose, value: valueProp, open, ...other } = props;
  const [value, setValue] = React.useState<ContentMap>(valueProp);
  const radioGroupRef = React.useRef<HTMLElement>(null);

  React.useEffect(() => {
    if (!open) {
      setValue(valueProp);
    }
  }, [valueProp, open]);

  const handleEntering = () => {
    if (radioGroupRef.current != null) {
      radioGroupRef.current.focus();
    }
  };

  const handleCancel = () => {
    onClose(null);
  };

  const handleOk = () => {
    onClose(value);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(JSON.parse((event.target as HTMLInputElement).value));
  };

  return (
    <Dialog
      sx={{ "& .MuiDialog-paper": { width: "80%", maxHeight: 435 } }}
      maxWidth="xs"
      TransitionProps={{ onEntering: handleEntering }}
      open={open}
    >
      <DialogTitle>{props.title}</DialogTitle>
      <DialogContent dividers>
        <RadioGroup ref={radioGroupRef} aria-label="ringtone" name="ringtone" value={JSON.stringify(value)} onChange={handleChange}>
          {props.contentMap.map((option) => (
            <FormControlLabel
              // checked={option.value === value.value}
              value={JSON.stringify({ name: option.name, value: option.value })}
              key={option.value}
              control={<Radio checked={option.value === value.value} />}
              label={option.name}
            />
          ))}
        </RadioGroup>
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={handleCancel}>
          Cancel
        </Button>
        <Button onClick={handleOk}>Ok</Button>
      </DialogActions>
    </Dialog>
  );
}
