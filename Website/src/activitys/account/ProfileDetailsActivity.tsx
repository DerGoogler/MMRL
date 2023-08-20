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
import { useFirebase } from "@Hooks/useFirebase";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";

const ProfileDetailsActivity = () => {
  const { strings } = useStrings();
  const { context, extra } = useActivity<any>();
  const { auth, firebaseVoid } = useFirebase();

  const [username, setUsername] = React.useState(extra.username);
  const [picurl, setPicurl] = React.useState(extra.picurl);
  const [bio, setBio] = React.useState(extra.bio);
  const [options, setOptions] = React.useState<any>(extra.options);

  const renderToolbar = () => {
    return (
      <Toolbar modifier="noshadow">
        <Toolbar.Left>
          <Toolbar.BackButton onClick={context.popPage} />
        </Toolbar.Left>
        <Toolbar.Center>Profile details</Toolbar.Center>
      </Toolbar>
    );
  };

  const handleSaveChanges = () => {
    firebaseVoid((auth, db) => {
      update(ref(db, `users/${auth.currentUser?.uid}`), {
        username: username,
        picurl: picurl,
      })
        .then(() => {
          // context.popPage()
          os.toast("Your changes have been saved", Toast.LENGTH_SHORT);
        })
        .catch((err) => {
          os.toast(err, Toast.LENGTH_SHORT);
        });
    });
  };

  return (
    <Page modifier="noshadow" renderToolbar={renderToolbar}>
      <Page.RelativeContent>
        <Card sx={{ p: 1 }} variant="outlined">
          <div>
            <CustomTextField
              fullWidth
              counter
              onChange={(event) => {
                setUsername(event.target.value);
              }}
              inputProps={{
                maxLength: 20,
              }}
              type="text"
              value={username}
              label="Username"
              variant="outlined"
            />
            <CustomTextField
              margin="dense"
              fullWidth
              onChange={(event) => {
                setPicurl(event.target.value);
              }}
              type="text"
              value={picurl}
              label="Picture URL"
              variant="outlined"
            />
            <CustomTextField
              inputProps={{
                maxLength: 200,
              }}
              counter
              type="text"
              margin="dense"
              fullWidth
              value={bio}
              disabled
              label="Description"
              multiline
              rows={4}
            />
          </div>

          <Button variant="contained" disableElevation onClick={handleSaveChanges}>
            Save changes
          </Button>
        </Card>
      </Page.RelativeContent>
    </Page>
  );
};

export default ProfileDetailsActivity;
