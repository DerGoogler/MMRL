import { useActivity } from "@Hooks/useActivity";
import { Toolbar } from "@Components/onsenui/Toolbar";
import { Page } from "@Components/onsenui/Page";
import { useStrings } from "@Hooks/useStrings";
import Stack from "@mui/material/Stack";
import VerifiedIcon from "@mui/icons-material/Verified";
import Grid from "@mui/material/Grid";
import { CardMedia, Box, Typography, Card, SxProps, Theme, Paper, CardContent } from "@mui/material";
import { colors } from "@Hooks/useSettings";
import { useRepos } from "@Hooks/useRepos";
import { ExploreModule } from "@Components/ExploreModule";
import React from "react";

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

const ProfileActivty = React.memo(() => {
  const { strings } = useStrings();
  const { modules } = useRepos();
  const { context, extra } = useActivity<MmrlAuthor>();

  const { name, bio, avatar, verified } = extra;

  const renderToolbar = () => {
    return (
      <Toolbar modifier="noshadow">
        <Toolbar.Left>
          <Toolbar.BackButton onClick={context.popPage} />
        </Toolbar.Left>
        <Toolbar.Center>{name}</Toolbar.Center>
      </Toolbar>
    );
  };

  return (
    <Page modifier="noshadow" renderToolbar={renderToolbar}>
      <Page.RelativeContent>
        <Card elevation={0}>
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
                alt={name}
                src={avatar}
                sx={{
                  borderRadius: 0.5,
                  width: { xs: "100%", sm: 100 },
                  mb: { xs: 1.5, sm: 0 },
                }}
              />
              <Box sx={{ alignSelf: "center", ml: 2, width: "100%" }}>
                <Typography component="div" fontWeight="bold">
                  {name}
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
                  {verified && (
                    <Box sx={badgeStyle(colors.blue)}>
                      <VerifiedIcon sx={{ fontSize: 16, mr: 0.5, mt: "1px" }} />
                      Verified
                    </Box>
                  )}
                </Stack>
              </Box>
            </Paper>
          </Paper>
        </Card>

        {bio && (
          <Card
            elevation={0}
            sx={{
              mt: 1,
              p: 1,
            }}
          >
            <CardContent>
              <Typography variant="h5" component="div">
                Biography
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {bio}
              </Typography>
            </CardContent>
          </Card>
        )}

        <Card
          elevation={0}
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

          {modules
            .filter((m) => m.mmrl.author?.name.includes(name) || m.mmrl.contributors?.find((con) => name == con.name))
            .map((module) => (
              <ExploreModule moduleProps={module} disableLowQuality disableCovers />
            ))}
        </Card>
      </Page.RelativeContent>
    </Page>
  );
});

export default ProfileActivty;
