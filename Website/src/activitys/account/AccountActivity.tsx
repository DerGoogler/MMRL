import { useActivity } from "@Hooks/useActivity";
import { Toolbar } from "@Components/onsenui/Toolbar";
import { Page } from "@Components/onsenui/Page";
import { useStrings } from "@Hooks/useStrings";
import Stack from "@mui/material/Stack";
import { set, ref, update, onValue, get, query } from "firebase/database";
import { signOut, sendEmailVerification } from "firebase/auth";
import EditIcon from "@mui/icons-material/Edit";
import PersonIcon from "@mui/icons-material/Person";
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";
import PasswordIcon from "@mui/icons-material/Password";
import SaveIcon from "@mui/icons-material/Save";
import VerifiedIcon from "@mui/icons-material/Verified";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import ViewModuleIcon from "@mui/icons-material/ViewModule";
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
import {
  CardMedia,
  Box,
  Typography,
  Card,
  SxProps,
  Theme,
  Paper,
  List,
  ListItem,
  ListItemText,
  CardContent,
  Button,
  ListSubheader,
  ListItemIcon,
  ListItemButton,
} from "@mui/material";
import { useTheme } from "@Hooks/useTheme";

import SecurityIcon from "@mui/icons-material/Security";
import BugReportIcon from "@mui/icons-material/BugReport";
import LocalPoliceIcon from "@mui/icons-material/LocalPolice";
import { colors } from "@Hooks/useSettings";
import { useFormatDate } from "@Hooks/useFormatDate";
import { useRepos } from "@Hooks/useRepos";
import { ExploreModule } from "@Components/ExploreModule";
import { CustomTextField } from "@Components/TextField";
import { useFirebase } from "@Hooks/useFirebase";
import ProfileDetailsActivity from "./ProfileDetailsActivity";
import ChangeEmailActivity from "./ChangeEmailActivity";
import ExploreModuleFragment, { ExploreModuleProps } from "@Activitys/fragments/ExploreModuleFragment";

const badgeStyle: (color: (typeof colors)["blue" | "teal" | "red" | "orange"]) => SxProps<Theme> = (color) => {
  return {
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
  const { auth, firebaseVoid } = useFirebase();

  const [username, setUsername] = React.useState("");
  const [picurl, setPicurl] = React.useState("");
  const [options, setOptions] = React.useState<any>({});

  React.useEffect(() => {
    firebaseVoid((auth, db) => {
      const dbRef = ref(db, "users/" + auth.currentUser?.uid);
      onValue(query(dbRef), (snapshot) => {
        const snap = snapshot.val();
        setUsername(snap.username);
        setPicurl(snap.picurl);
        console.log(snap.options);
        setOptions(snap.options);
      });
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
              firebaseVoid((auth) => {
                signOut(auth)
                  .then(() => {
                    context.popPage();
                  })
                  .catch((error) => {
                    os.toast(error, Toast.LENGTH_SHORT);
                  });
              });
            }}
          />
        </Toolbar.Right>
      </Toolbar>
    );
  };

  return (
    <Page modifier="noshadow" renderToolbar={renderToolbar}>
      <Page.RelativeContent>
        <Card variant="outlined">
          <Paper
            elevation={0}
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

            {!auth?.currentUser?.emailVerified && (
              <Alert
                severity="warning"
                sx={{ mt: 3 }}
                action={
                  <Button
                    onClick={() => {
                      firebaseVoid((auth) => {
                        sendEmailVerification(auth.currentUser as any)
                          .then(() => {
                            os.toast("E-Mail has been sent", Toast.LENGTH_SHORT);
                          })
                          .catch((error) => {
                            os.toast(error.message, Toast.LENGTH_SHORT);
                          });
                      });
                    }}
                    color="inherit"
                    size="small"
                  >
                    VERIFY
                  </Button>
                }
              >
                Your email haven't been verified yet. You won't able to edit your profile information
              </Alert>
            )}
          </Paper>

          <List subheader={<ListSubheader>{"Account"}</ListSubheader>}>
            <ListItem disablePadding>
              <ListItemButton
                onClick={() => {
                  context.pushPage({
                    component: ProfileDetailsActivity,
                    props: {
                      key: "profile_details_1",
                      extra: {
                        username: username,
                        picurl: picurl,
                        options: options,
                      },
                    },
                  });
                }}
              >
                <ListItemIcon>
                  <PersonIcon />
                </ListItemIcon>
                <ListItemText primary="Profile details" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton
                onClick={() => {
                  context.pushPage<{}, ExploreModuleProps>({
                    component: ExploreModuleFragment,
                    props: {
                      renderToolbar: (ref, ctx) => (
                        <Toolbar modifier="noshadow">
                          <Toolbar.Left>
                            <Toolbar.BackButton onClick={ctx.popPage} />
                          </Toolbar.Left>
                          <Toolbar.Center>Participating</Toolbar.Center>
                        </Toolbar>
                      ),
                      applyFilter: (modules, search) =>
                        modules.filter((module) => module.prop_url?.mmrlAuthor?.includes(auth?.currentUser?.uid as any)),
                      key: "profile_details_1",
                      extra: {},
                    },
                  });
                }}
              >
                <ListItemIcon>
                  <ViewModuleIcon />
                </ListItemIcon>
                <ListItemText primary="Participating modules" />
              </ListItemButton>
            </ListItem>
          </List>

          <List subheader={<ListSubheader>{"Account"}</ListSubheader>}>
            <ListItem disablePadding>
              <ListItemButton
                onClick={() => {
                  // context.pushPage({
                  //   component: ChangeEmailActivity,
                  //   props: {
                  //     key: "change_email_0",
                  //     extra: {},
                  //   },
                  // });
                }}
              >
                <ListItemIcon>
                  <AlternateEmailIcon />
                </ListItemIcon>
                <ListItemText primary="Change email" />
              </ListItemButton>
            </ListItem>

            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <PasswordIcon />
                </ListItemIcon>
                <ListItemText primary="Reset password" />
              </ListItemButton>
            </ListItem>
          </List>

          {/* <Paper
            elevation={0}
            sx={{
              mt: 3,
            }}
          >
            <Stack direction="column" justifyContent="flex-start" alignItems="flex-start" spacing={2}>
              <CustomTextField
                
              />

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
                              firebaseVoid((auth, db) => {
                                update(ref(db, `users/${auth.currentUser?.uid}`), {
                                  picurl: picurl,
                                });
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
                value={auth?.currentUser?.email}
                fullWidth
              />
              <TextField disabled label="UID" variant="outlined" value={auth?.currentUser?.uid} fullWidth />
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
            <Grid container justify="center" spacing={2}>
              {filteredModules.map((module, i) => (
                <Grid key={i} item {...{ xs: 12, sm: 6, md: 4, lg: 3 }}>
                  <ExploreModule index={i} moduleProps={module} disableLowQuality disableCovers />
                </Grid>
              ))}
            </Grid>
          </Box>*/}
        </Card>
      </Page.RelativeContent>
    </Page>
  );
};

export default AccountActivty;
