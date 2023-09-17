import * as React from "react";
import MuiTextField, { TextFieldProps as MuiTextFieldProps } from "@mui/material/TextField";
import Box from "@mui/material/Box";
import OutlinedInput from "@mui/material/OutlinedInput";
import { InputBaseProps } from "@mui/material/InputBase";

const CustomTextField = React.forwardRef<HTMLInputElement, MuiTextFieldProps & { counter?: boolean }>((props, ref) => {
  const { counter = false, helperText, ...other } = props;

  if (counter && !props.inputProps?.maxLength) {
    throw new Error("counter needs maxLength to be set on inputProps");
  }
  if (counter && props.type !== "text") {
    throw new Error("invalid input type");
  }

  return (
    <MuiTextField
      ref={ref}
      {...other}
      helperText={
        <Box component="span" sx={{ display: "flex", justifyContent: "space-between" }}>
          <span>{helperText}</span>
          {counter && <span>{`${(props.value as string).length} / ${props.inputProps?.maxLength}`}</span>}
        </Box>
      }
    />
  );
});

export { CustomTextField };
