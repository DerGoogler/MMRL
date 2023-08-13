import { useActivity } from "@Hooks/useActivity";
import { Toolbar } from "@Components/onsenui/Toolbar";
import { Page } from "@Components/onsenui/Page";
import { useStrings } from "@Hooks/useStrings";
import Stack from "@mui/material/Stack";

import { getDatabase, set, ref, update, onValue, get, query } from "firebase/database";
import { getAuth, signOut } from "firebase/auth";
import { firebaseApp } from "@Util/firebase";

import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import VerifiedIcon from "@mui/icons-material/Verified";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import React from "react";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Grid from "@mui/material/Grid";
import Avatar from "@mui/material/Avatar";
import { os } from "@Native/Os";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";

const auth = getAuth(firebaseApp);
const db = getDatabase(firebaseApp);

const AccountActivty = () => {
  const { strings } = useStrings();
  const { context, extra } = useActivity<any>();

  const [editUsername, setEditUsername] = React.useState(false);
  const [editPicurl, setEditPicurl] = React.useState(false);
  const [username, setUsername] = React.useState("");
  const [verified, setVerified] = React.useState(false);
  const [picurl, setPicurl] = React.useState("");

  React.useEffect(() => {
    const dbRef = ref(db, "users/" + auth.currentUser.uid);
    onValue(query(dbRef), (snapshot) => {
      const snap = snapshot.val();
      setUsername(snap.username);
      setPicurl(snap.picurl);
      setVerified(snap.options?.verified);
    });
  }, []);

  const renderToolbar = () => {
    return (
      <Toolbar modifier="noshadow">
        <Toolbar.Left>
          <Toolbar.BackButton onClick={context.popPage} />
        </Toolbar.Left>
        <Toolbar.Center>Account</Toolbar.Center>
        <Toolbar.Right>
          <Toolbar.Button
            icon={ExitToAppIcon}
            onClick={() => {
              signOut(auth)
                .then(() => {
                  context.popPage();
                })
                .catch((error) => {
                  os.toast(error, Toast.LENGTH_SHORT);
                });
            }}
          />
        </Toolbar.Right>
      </Toolbar>
    );
  };

  const handleClickShowUsername = () => setEditUsername((state) => !state);
  const handleClickShowPicurl = () => setEditPicurl((state) => !state);

  const handleMouseDownUsername = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  return (
    <Page modifier="noshadow" renderToolbar={renderToolbar}>
      <Page.RelativeContent>
        <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2}>
          <Stack direction="row" justifyContent="flex-start" alignItems="center" spacing={1}>
            <h3>{username}</h3> {verified && <VerifiedIcon />}
          </Stack>
          <Avatar alt={username} src={picurl} />
        </Stack>

        {verified && (
          <Alert severity="info">
            <AlertTitle>Verified</AlertTitle>
            You're a verified user/creator, this means that single module veification won't affect your modules. Single module verification
            symbol won't show while you're verified.
          </Alert>
        )}

        <Stack direction="column" style={{ marginTop: verified ? 18 : 0 }} justifyContent="flex-start" alignItems="flex-start" spacing={2}>
          <FormControl fullWidth variant="outlined">
            <InputLabel htmlFor="outlined-adornment-username">Username</InputLabel>
            <OutlinedInput
              disabled={!editUsername}
              fullWidth
              onChange={(event) => {
                setUsername(event.target.value);
              }}
              value={username}
              id="outlined-adornment-username"
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowUsername}
                    onMouseDown={handleMouseDownUsername}
                    edge="end"
                  >
                    {editUsername ? (
                      <SaveIcon
                        onClick={() => {
                          update(ref(db, `users/${auth.currentUser.uid}`), {
                            username: username,
                          });
                        }}
                      />
                    ) : (
                      <EditIcon />
                    )}
                  </IconButton>
                </InputAdornment>
              }
              label="Username"
            />
          </FormControl>

          <FormControl fullWidth variant="outlined">
            <InputLabel htmlFor="outlined-adornment-picurl">Picture URL</InputLabel>
            <OutlinedInput
              disabled={!editPicurl}
              fullWidth
              onChange={(event) => {
                setPicurl(event.target.value);
              }}
              value={picurl}
              id="outlined-adornment-picurl"
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPicurl}
                    onMouseDown={handleMouseDownUsername}
                    edge="end"
                  >
                    {editPicurl ? (
                      <SaveIcon
                        onClick={() => {
                          update(ref(db, `users/${auth.currentUser.uid}`), {
                            picurl: picurl,
                          });
                        }}
                      />
                    ) : (
                      <EditIcon />
                    )}
                  </IconButton>
                </InputAdornment>
              }
              label="Picture URL"
            />
          </FormControl>

          <TextField
            disabled
            label="E-Mail"
            placeholder="Edit your email"
            type="email"
            variant="outlined"
            value={auth.currentUser.email}
            fullWidth
          />
          <TextField disabled label="UID" variant="outlined" value={auth.currentUser.uid} fullWidth />
        </Stack>
      </Page.RelativeContent>
    </Page>
  );
};

export default AccountActivty;
