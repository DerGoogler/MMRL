import { Page } from "@Components/onsenui/Page";
import { useActivity } from "@Hooks/useActivity";
import { useSettings } from "@Hooks/useSettings";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";

import LockOutlined from "@mui/icons-material/LockOutlined";

import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

import React from "react";
import { useTheme } from "@Hooks/useTheme";
import { firebaseApp } from "@Util/firebase";
import { os } from "@Native/Os";

const auth = getAuth(firebaseApp);

const Signin = () => {
  const { context } = useActivity();
  const { settings } = useSettings();

  const { scheme } = useTheme();

  const paperStyle = { padding: 20, width: "80%", margin: "20px auto" };
  const avatarStyle = { backgroundColor: scheme[900] };
  const btnstyle = { margin: "8px 0" };

  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  return (
    <Page>
      <Page.Content>
        <Paper variant="outlined" elevation={0} style={paperStyle}>
          <Grid>
            <Avatar style={avatarStyle}>
              <LockOutlined />
            </Avatar>
            <h2>Sign in</h2>
          </Grid>
          <TextField
            onChange={(event) => {
              setEmail(event.target.value);
            }}
            label="E-Mail"
            placeholder="Enter email"
            type="email"
            variant="outlined"
            fullWidth
            value={email}
            required
          />
          <TextField
            onChange={(event) => {
              setPassword(event.target.value);
            }}
            label="Password"
            margin="dense"
            placeholder="Enter password"
            type="password"
            variant="outlined"
            fullWidth
            value={password}
            required
          />
          <FormControlLabel control={<Checkbox disabled name="checkedB" color="primary" />} label="Remember me" />
          <Button
            onClick={() => {
              signInWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                  context.popPage();
                })
                .catch((error) => {
                  os.toast(error.message, Toast.LENGTH_SHORT);
                });
            }}
            type="submit"
            color="primary"
            variant="contained"
            style={btnstyle}
            fullWidth
          >
            Sign in
          </Button>
          {/*
                <Typography >
                      <Link href="#" >
                        Forgot password ?
                </Link> 
                </Typography>
                */}
        </Paper>
      </Page.Content>
    </Page>
  );
};

export default Signin;
