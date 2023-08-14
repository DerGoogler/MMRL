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
import { CardMedia, Box, Typography, Card, SxProps, Theme, Paper, List, ListItem, ListItemText, CardContent } from "@mui/material";
import { useTheme } from "@Hooks/useTheme";

import SecurityIcon from "@mui/icons-material/Security";
import BugReportIcon from "@mui/icons-material/BugReport";
import LocalPoliceIcon from "@mui/icons-material/LocalPolice";
import { colors } from "@Hooks/useSettings";
import { useFormatDate } from "@Hooks/useFormatDate";
import { useRepos } from "@Hooks/useRepos";
import { ExploreModule } from "@Components/ExploreModule";

const auth = getAuth(firebaseApp);
const db = getDatabase(firebaseApp);

const badgeStyle: (color: (typeof colors)["blue" | "teal" | "red" | "orange"]) => SxProps<Theme> = (color) => {
  return {
    ml: -1,
    px: 1,
    py: 0.5,
    borderRadius: 1,
    display: "flex",
    typography: "caption",
    bgcolor: (theme) => (theme.palette.mode === "dark" ? color[900] : color[50]),
    color: (theme) => (theme.palette.mode === "dark" ? "#fff" : color[700]),
  };
};

const AccountActivty = () => {
  const { strings } = useStrings();
  const { context, extra } = useActivity<any>();

  const [editUsername, setEditUsername] = React.useState(false);
  const [editPicurl, setEditPicurl] = React.useState(false);
  const [username, setUsername] = React.useState("");
  const [picurl, setPicurl] = React.useState("");
  const [options, setOptions] = React.useState<any>({});

  React.useEffect(() => {
    const dbRef = ref(db, "users/" + auth.currentUser.uid);
    onValue(query(dbRef), (snapshot) => {
      const snap = snapshot.val();
      setUsername(snap.username);
      setPicurl(snap.picurl);
      console.log(snap.options);
      setOptions(snap.options);
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

  const { modules } = useRepos();

  const filteredModules = modules.filter((module) => module.prop_url?.mmrlAuthor?.includes(auth.currentUser.uid));

  return (
    <Page modifier="noshadow" renderToolbar={renderToolbar}>
      <Page.RelativeContent>
        <Card
          variant="outlined"
          sx={{
            p: 1,
          }}
        >
          <Paper
            elevation={0}
            sx={{
              display: "flex",

              flexDirection: {
                xs: "column", // mobile
                sm: "row", // tablet and up
              },
            }}
          >
            <CardMedia
              component="img"
              width="100"
              height="100"
              alt={username}
              src={picurl}
              sx={{
                borderRadius: 0.5,
                width: { xs: "100%", sm: 100 },
                mr: { sm: 1.5 },
                mb: { xs: 1.5, sm: 0 },
              }}
            />
            <Box sx={{ alignSelf: "center", ml: 2, width: "100%" }}>
              <Typography component="div" fontWeight="bold">
                {username}
              </Typography>
              <Stack
                direction="row"
                justifyContent="flex-start"
                alignItems="center"
                sx={{
                  mt: 0.75,
                }}
                spacing={0.5}
              >
                {options?.roles?.verified && (
                  <Box sx={badgeStyle(colors.blue)}>
                    <VerifiedIcon sx={{ fontSize: 16, mr: 0.5, mt: "1px" }} />
                    Verified
                  </Box>
                )}
                {options?.roles?.mod && (
                  <Box sx={badgeStyle(colors.orange)}>
                    <LocalPoliceIcon sx={{ fontSize: 16, mr: 0.5, mt: "1px" }} />
                    MMRL Moderator
                  </Box>
                )}
                {options?.roles?.admin && (
                  <Box sx={badgeStyle(colors.red)}>
                    <SecurityIcon sx={{ fontSize: 16, mr: 0.5, mt: "1px" }} />
                    MMRL Admin
                  </Box>
                )}
                {options?.roles?.bughunter && (
                  <Box sx={badgeStyle(colors.teal)}>
                    <BugReportIcon sx={{ fontSize: 16, mr: 0.5, mt: "1px" }} />
                    Bug Hunter
                  </Box>
                )}
              </Stack>
            </Box>
          </Paper>

          <Paper
            elevation={0}
            sx={{
              mt: 3,
            }}
          >
            <Stack direction="column" justifyContent="flex-start" alignItems="flex-start" spacing={2}>
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
          </Paper>
        </Card>

        <Card
          variant="outlined"
          sx={{
            mt: 1,
            p: 1,
          }}
        >
          <CardContent>
            <Typography variant="h5" component="div">
              Participating
            </Typography>
          </CardContent>

          <Box sx={{ flexGrow: 1 }}>
            {/* @ts-ignore */}
            <Grid container justify="center" spacing={2}>
              {filteredModules.map((module, i) => (
                <Grid key={i} item {...{ xs: 12, sm: 6, md: 4, lg: 3 }}>
                  <ExploreModule index={i} moduleProps={module} disableLowQuality disableCovers />
                </Grid>
              ))}
            </Grid>
          </Box>
        </Card>
      </Page.RelativeContent>
    </Page>
  );
};

export default AccountActivty;
