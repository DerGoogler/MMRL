import { List, ListItem } from "@mui/material";
import { Toolbar } from "@Components/onsenui/Toolbar";
import { Page } from "@Components/onsenui/Page";
import { useStrings } from "@Hooks/useStrings";
import { useActivity } from "@Hooks/useActivity";
import TextField from "@mui/material/TextField";
import Card from "@mui/material/Card";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import Alert from "@mui/material/Alert";
import IconButton from "@mui/material/IconButton";
import { useSettings } from "@Hooks/useSettings";
import { StyledListItemText } from "@Components/StyledListItemText";
import React from "react";
import { os } from "@Native/Os";
import { useConfirm } from "material-ui-confirm";

interface Extra {
  prop_url: ModuleProps;
}

function ModuleFilterConfActivity() {
  const { context, extra } = useActivity<Extra>();
  const { strings } = useStrings();
  const { settings, setSettings } = useSettings();
  const confirm = useConfirm();

  const [textInput, setTextInput] = React.useState("");

  const disallowed = /(lost\+found|lost\\\+found|lost\\\\\+found)/;

  const renderToolbar = () => {
    return (
      <Toolbar modifier="noshadow">
        <Toolbar.Left>
          <Toolbar.BackButton onClick={context.popPage} />
        </Toolbar.Left>
        <Toolbar.Center>Configure</Toolbar.Center>
      </Toolbar>
    );
  };

  const addFilter = () => {
    if (!disallowed.test(textInput)) {
      if (textInput) {
        setSettings(
          "mod_filt",
          (prev) => {
            if (prev.some((elem) => elem !== textInput)) {
              return [textInput, ...prev];
            } else {
              return prev;
            }
          },
          (state) => setTextInput("")
        );
      } else {
        os.toast("Please enter a valid filter", Toast.LENGTH_SHORT);
      }
    } else {
      os.toast("Disallowed filter", Toast.LENGTH_SHORT);
    }
  };

  return (
    <Page renderToolbar={renderToolbar}>
      <Page.RelativeContent>
        <Stack spacing={1} direction="column">
          <Card elevation={0} sx={{ p: 1.5 }}>
            <Stack spacing={1} direction="row">
              <TextField
                fullWidth
                label="New regex filter"
                value={textInput}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                  setTextInput(event.target.value);
                }}
              />
              <Button onClick={addFilter} variant="contained" disableElevation>
                Add
              </Button>
            </Stack>
          </Card>

          <Alert severity="info"><strong>lost\+found</strong> is a KernelSU filter to prevent empty modules</Alert>

          <Card elevation={0} sx={{ p: 1.5 }}>
            <List disablePadding>
              {settings.mod_filt.map((rule) => (
                <ListItem
                  secondaryAction={
                    !disallowed.test(rule) && (
                      <IconButton
                        onClick={() => {
                          confirm({
                            title: "Delete filter?",
                            confirmationText: "Sure",
                            description: "Are you sure that you want delete this filter?",
                          }).then(() => {
                            setSettings(
                              "mod_filt",
                              (prev) => prev.filter((item) => item !== rule),
                              (state) => os.toast("Filter removed", Toast.LENGTH_SHORT)
                            );
                          });
                        }}
                        edge="end"
                        aria-label="delete"
                      >
                        <DeleteIcon />
                      </IconButton>
                    )
                  }
                >
                  <StyledListItemText primary={String.raw`${rule}`} />
                </ListItem>
              ))}
            </List>
          </Card>
        </Stack>
      </Page.RelativeContent>
    </Page>
  );
}

export default ModuleFilterConfActivity;
