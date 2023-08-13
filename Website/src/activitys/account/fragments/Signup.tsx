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

import { getDatabase, set, ref, update, onValue } from "firebase/database";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { firebaseApp } from "@Util/firebase";
const auth = getAuth(firebaseApp);
const db = getDatabase(firebaseApp);

import React from "react";
import { useTheme } from "@Hooks/useTheme";
import { os } from "@Native/Os";

const Signup = () => {
  const { context } = useActivity();
  const { settings } = useSettings();

  const { scheme } = useTheme();

  const paperStyle = { padding: 20, width: "80%", margin: "20px auto" };
  const avatarStyle = { backgroundColor: scheme[900] };
  const btnstyle = { margin: "8px 0" };

  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  // const mmru_id = React.useMemo(() => {
  //   // always start with a letter (for DOM friendlyness)
  //   let idstr = String.fromCharCode(Math.floor(Math.random() * 25 + 65));
  //   do {
  //     // between numbers and characters (48 is 0 and 90 is Z (42-48 = 90)
  //     let ascicode = Math.floor(Math.random() * 42 + 48);
  //     if (ascicode < 58 || ascicode > 64) {
  //       // exclude all chars between : (58) and @ (64)
  //       idstr += String.fromCharCode(ascicode);
  //     }
  //   } while (idstr.length < 32);

  //   return "MMRU_" + idstr;
  // }, []);

  const username = React.useMemo(() => {
    const a = ["Small", "Blue", "Ugly"];
    const b = ["Bear", "Dog", "Banana"];

    const rA = Math.floor(Math.random() * a.length);
    const rB = Math.floor(Math.random() * b.length);
    return a[rA] + b[rB];
  }, []);

  return (
    <Page>
      <Page.Content>
        <Paper variant="outlined" elevation={0} style={paperStyle}>
          <Grid>
            <Avatar style={avatarStyle}>
              <LockOutlined />
            </Avatar>
            <h2>Sign up</h2>
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
              createUserWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                  set(ref(db, `users/${userCredential.user.uid}`), {
                    username: username,
                  });
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
            Sign up
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

export default Signup;
