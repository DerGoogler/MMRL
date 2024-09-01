import { alpha, Box, Grid, Button, Divider, Typography, Stack, Card } from "@mui/material";
import { Google, GitHub } from "@mui/icons-material";
import { useTheme } from "@Hooks/useTheme";
import { Image } from "@Components/dapi/Image";
import { Anchor } from "@Components/dapi/Anchor";
import React from "react";
import { useConfirm } from "material-ui-confirm";
import { Page } from "@Components/onsenui/Page";
import { os } from "@Native/Os";
import { useSettings } from "@Hooks/useSettings";
import { useActivity } from "@Hooks/useActivity";
import MainApplication from "./MainApplication";

interface GridCardProps {
  title?: string;
  description?: string;
}

const GridCard = (props: GridCardProps) => {
  const { theme } = useTheme();

  return (
    <Grid
      item
      xs={12}
      sm={6}
      md={4}
      lg={5}
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Card
        sx={{
          p: 2,
          height: "100%",
          backgroundImage: "none",
          backgroundColor: alpha(theme.palette.background.paper, 0.6),
          backdropFilter: "saturate(180%) blur(20px)",
          outlineOffset: -1,
          outline: `1px solid ${theme.palette.divider} !important`,
        }}
      >
        <Typography sx={{ color: "text.secondary", mb: 1.5 }}>{props.title}</Typography>
        <Typography variant="body2">{props.description}</Typography>
      </Card>
    </Grid>
  );
};

interface GridImageProps {
  src?: string;
}

const GridImage = (props: GridImageProps) => {
  const { theme } = useTheme();

  return (
    <Grid
      item
      xs={6}
      sm={6}
      md={4}
      lg={4}
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Card
        sx={{
          p: 2,
          height: "100%",
          backgroundImage: "none",
          backgroundColor: alpha(theme.palette.background.paper, 0.6),
          backdropFilter: "saturate(180%) blur(20px)",
          borderRadius: theme.shape.borderRadius / theme.shape.borderRadius,
          outlineOffset: -1,
          outline: `1px solid ${theme.palette.divider} !important`,
        }}
      >
        <Image
          noOutline
          src={props.src}
          sx={{
            width: "100%",
            height: "100%",
            borderRadius: theme.shape.borderRadius / theme.shape.borderRadius,
          }}
        />
      </Card>
    </Grid>
  );
};

export const LandingActivity = () => {
  const { theme } = useTheme();
  const confirm = useConfirm();
  const [landing, setLanding] = useSettings("landingEnabled");
  const { context } = useActivity();

  const acceptCallback = React.useCallback((callback) => {
    confirm({
      title: "Your privacy is more worth!",
      description: (
        <>
          Please make sure to read our{" "}
          <Anchor href="https://dergoogler.com/legal/privacy-policy" noIcon>
            Privacy Policy
          </Anchor>{" "}
          and{" "}
          <Anchor href="https://dergoogler.com/legal/tos" noIcon>
            Terms of Service
          </Anchor>{" "}
          before you continue.
        </>
      ),
      acknowledgement: "Accept",
    })
      .then(callback)
      .catch(() => {});
  }, []);

  return (
    <Page
      backgroundStyle={{
        "&:before": {
          content: '""',
          position: "absolute",
          inset: -5,
          zIndex: -1,
          background: "linear-gradient(-17deg, rgba(0,0,0,0) 41%, rgba(188,2,194,0.5) 100%)",
        },

        background: " linear-gradient(17deg, rgba(0,0,0,0) 41%, rgba(92,15,186,0.5) 100%)",
      }}
    >
      <Page.RelativeContent>
        <Box
          sx={{
            p: 5,
            position: "relative",
          }}
        >
          <Typography
            component="h1"
            sx={{
              [theme.breakpoints.up("md")]: {
                fontSize: "60px",
              },
              fontSize: "2.5rem",
              textAlign: "center",
            }}
          >
            Magisk Module Repo Loader
          </Typography>

          <Typography
            sx={{
              [theme.breakpoints.up("md")]: {
                fontSize: "24px",
              },

              fontSize: "1.1rem",
              textAlign: "center",
            }}
          >
            Your highly customizable module manager
          </Typography>
        </Box>

        <Stack
          sx={{
            width: "100%",
            [theme.breakpoints.down("md")]: {
              pr: 3,
              pl: 3,
            },
            [theme.breakpoints.up("sm")]: {
              width: "50%",
              m: 0,
            },
            alignSelf: "center",
            gap: theme.spacing(2),
          }}
          direction="column"
          justifyContent="space-between"
        >
          <Button
            fullWidth
            variant="contained"
            onClick={() => {
              acceptCallback(() => {
                setLanding(false);
                context.replacePage({
                  component: MainApplication,
                  key: "main",
                });
              });
            }}
          >
            OPEN IN BROWSER
          </Button>

          <Divider>or</Divider>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <Button
              fullWidth
              variant="outlined"
              startIcon={<Google />}
              onClick={() => {
                acceptCallback(() => {
                  os.openURL("https://play.google.com/store/apps/details?id=com.dergoogler.mmrl", "_mmrlOwn");
                });
              }}
            >
              GET IT ON GOOGLE PLAY
            </Button>
            <Button
              fullWidth
              variant="outlined"
              startIcon={<GitHub />}
              onClick={() => {
                acceptCallback(() => {
                  os.openURL("https://github.com/DerGoogler/MMRL/releases", "_mmrlOwn");
                });
              }}
            >
              GET IT ON GITHUB
            </Button>
          </Box>
        </Stack>

        <Typography
          sx={{
            mt: 8,
            [theme.breakpoints.up("md")]: {
              fontSize: "25px",
            },

            fontSize: "1.5rem",
            textAlign: "center",
          }}
        >
          Screenshots
        </Typography>

        <Box
          sx={{
            m: 3,
          }}
        >
          <Grid
            container
            spacing={3}
            sx={{
              justifyContent: "center",
              alignItems: "stretch",
            }}
          >
            {Array.from(Array(7), (_, i) => i + 1).map((num) => (
              <GridImage src={`https://raw.githubusercontent.com/DerGoogler/MMRL/master/assets/store_ready/${num}.png`} />
            ))}
          </Grid>
        </Box>

        <Typography
          sx={{
            mt: 8,
            [theme.breakpoints.up("md")]: {
              fontSize: "25px",
            },

            fontSize: "1.5rem",
            textAlign: "center",
          }}
        >
          Key Features
        </Typography>

        <Box
          sx={{
            m: 3,
          }}
        >
          <Grid
            container
            spacing={3}
            sx={{
              justifyContent: "center",
              alignItems: "stretch",
            }}
          >
            <GridCard
              title="Repositories"
              description="MMRL supports many repositories like Magisk Modules Alt Repo, IzzyonDroid Magisk Repo and Googlers Magisk Repo"
            />
            <GridCard title="ModConf" description="Build advanced configuration pages with React and JavaScript. " />
            <GridCard title="ModFS" description="With ModFS you can customize MMRL to fit any root solution." />
            <GridCard
              title="Wide Root Support"
              description="MMRL supports a wide range of root solutions. This includes Magisk, KernelSU and APatch."
            />
          </Grid>
        </Box>
      </Page.RelativeContent>

      <Stack
        direction={{ xs: "column", sm: "row" }}
        spacing={2}
        sx={{
          p: 3,
          justifyContent: "space-between",
          alignItems: "center",

          borderTop: `1px ${theme.palette.divider} solid`,
        }}
      >
        <Typography variant="caption" color="text.secondary">
          &copy; {new Date().getUTCFullYear()} Der_Googler & Googlers Repo. All rights reserved.
        </Typography>

        <Stack
          direction="row"
          spacing={2}
          sx={{
            justifyContent: "flex-end",

            alignItems: "center",
          }}
        >
          <Anchor href="https://dergoogler.com/legal/privacy-policy" target="_blank" noIcon color="unset">
            <Typography variant="caption" color="text.secondary">
              Privacy Policy
            </Typography>
          </Anchor>
          <Anchor href="https://dergoogler.com/legal/tos" target="_blank" noIcon color="unset">
            <Typography variant="caption" color="text.secondary">
              Terms of Service
            </Typography>
          </Anchor>
        </Stack>
      </Stack>
    </Page>
  );
};
