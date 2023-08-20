import { Menu } from "@mui/icons-material";
import { useActivity } from "@Hooks/useActivity";
import { Toolbar } from "@Components/onsenui/Toolbar";
import { os } from "@Native/Os";
import { Page } from "@Components/onsenui/Page";
import { useStrings } from "@Hooks/useStrings";
import { Tabbar, TabbarRenderTab } from "@Components/onsenui/Tabbar";
import Register from "./fragments/Register";
import Login from "./fragments/Login";
import Paper from "@mui/material/Paper";
import { CustomTextField } from "@Components/TextField";
import React from "react";
import { set, ref, update, onValue, get, query } from "firebase/database";
import { updateEmail } from "firebase/auth";
import { useFirebase } from "@Hooks/useFirebase";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";

const ChangeEmailActivity = () => {
  const { strings } = useStrings();
  const { context } = useActivity();
  const { auth, firebaseVoid } = useFirebase();

  const [email, setEmail] = React.useState("");
  const [currentEmail] = React.useState(auth?.currentUser?.email);

  const renderToolbar = () => {
    return (
      <Toolbar modifier="noshadow">
        <Toolbar.Left>
          <Toolbar.BackButton onClick={context.popPage} />
        </Toolbar.Left>
        <Toolbar.Center>Change email</Toolbar.Center>
      </Toolbar>
    );
  };

  const handleSaveChanges = () => {
    firebaseVoid((auth, db) => {
      if (auth.currentUser) {
        updateEmail(auth.currentUser, email)
          .then(() => {
            os.toast("Email has been updated successfully", Toast.LENGTH_SHORT);
          })
          .catch((error) => {
            os.toast(error, Toast.LENGTH_SHORT);
          });
      } else {
        os.toast("Current user is null", Toast.LENGTH_SHORT);
      }
    });
  };

  return (
    <Page modifier="noshadow" renderToolbar={renderToolbar}>
      <Page.RelativeContent>
        <Card sx={{ p: 1 }} variant="outlined">
          <div>
            <CustomTextField disabled fullWidth type="text" value={currentEmail} label="Current Email" variant="outlined" />
            <CustomTextField
              fullWidth
              margin="dense"
              onChange={(event) => {
                setEmail(event.target.value);
              }}
              type="email"
              value={email}
              label="Email"
              variant="outlined"
            />
          </div>

          <Button variant="contained" disableElevation onClick={handleSaveChanges}>
            Change email
          </Button>
        </Card>
      </Page.RelativeContent>
    </Page>
  );
};

export default ChangeEmailActivity;
