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
import MainApplication from "../MainApplication";
import { GridCard } from "./components/GridCard";
import { GridImage } from "./components/GridImage";
import { LandingToolbar } from "./components/LandingToolbar";
import { SectionHeader } from "./components/SectionHeader";
// @ts-ignore
import { FAQ } from "./components/FAQ";
import { useLanguageMap } from "./../../locales/declaration";
import { view } from "@Native/View";

export const LandingActivity = () => {
  const { theme } = useTheme();
  const confirm = useConfirm();
  const [, setLanding] = useSettings("landingEnabled");
  const { context } = useActivity();
  const availableLangs = useLanguageMap();

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

  const randomGradientAngle = React.useMemo(() => Math.floor(Math.random() * (20 - 15 + 1) + 15), []);

  return (
    <Page
      backgroundStyle={{
        "&:before": {
          content: '""',
          position: "absolute",
          inset: -5,
          zIndex: -1,
          background: `linear-gradient(-${randomGradientAngle}deg, rgba(0,0,0,0) 50%, rgba(188,2,194,0.5) 100%)`,
        },

        background: `linear-gradient(${randomGradientAngle}deg, rgba(0,0,0,0) 50%, rgba(92,15,186,0.5) 100%)`,
      }}
    >
      <LandingToolbar
        menuItems={[
          {
            title: "GMR Guidelines",
            onClick() {
              os.openURL("https://dergoogler.com/gmr/guidelines", "_blank");
            },
          },
          {
            title: "MMAR Guidelines",
            onClick() {
              os.openURL("https://github.com/Magisk-Modules-Alt-Repo/submission", "_blank");
            },
          },
          {
            title: "Blog",
            onClick() {
              os.openURL("https://dergoogler.com", "_blank");
            },
          },
        ]}
      />

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
                  os.openURL("https://play.google.com/store/apps/details?id=com.dergoogler.mmrl", "_blank");
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
                  os.openURL("https://github.com/DerGoogler/MMRL/releases", "_blank");
                });
              }}
            >
              GET IT ON GITHUB
            </Button>
          </Box>
        </Stack>

        <SectionHeader>Key Features</SectionHeader>

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
            <GridCard title="Anti-Features" description="MMRL shows you if a module is not FOSS which set repo owners by their own." />
          </Grid>
        </Box>

        <SectionHeader>Screenshots</SectionHeader>

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
              <GridImage
                alt={`Screenshot ${num} of MMRL`}
                src={`https://raw.githubusercontent.com/DerGoogler/MMRL/master/assets/store_ready/${num}.png`}
              />
            ))}
          </Grid>
        </Box>

        <SectionHeader>Frequently Asked Questions</SectionHeader>

        <Box
          sx={{
            m: 3,
          }}
        >
          <FAQ
            items={[
              {
                q: "What are the requirements to use MMRL?",
                a: 'The app require Android 8 and above, at least **4-6 GB of RAM**. if you using MMRL below you also require <a module="mmrl" href="https://github.com/DerGoogler/MMRL-CLI">MMRL-CLI</a> to use it',
              },
              {
                q: "What are currently known repos that will work in MMRL?",
                a: `Currently there are three repos that can be used in MMRL.
- Magisk Modules Alt Repo
- IzzyOnDroid Magisk Repo
- Googlers Magisk Repo`,
              },
              {
                q: "I want to use the Androidacy Magisk Repo here, does it work?",
                a: "No. The Androidacy Magisk Repo does not work in MMRL, and there are currently no plant to support it.",
              },
              {
                q: "How to use ModConf's from Magisk Modules?",
                a: `1. Open MMRL
2. switch to the Installed tab
3. scroll to your choosen module
4. click on "CONFIG"

> [!WARNING]
> The module developer develop the ModConf and errors that show up there has mainly nothing to do with MMRL`,
              },

              {
                q: "In what programming language is MMRL written?",
                a: "MMRL is written in Java, JavaScript and TypeScript. It uses React as framework and uses Onsen UI and MUI for front-end design.",
              },
              {
                q: "How can I build my own repo?",
                a: "Check out [magisk-modules-repo-util](https://github.com/Googlers-Repo/magisk-modules-repo-util.git) for more.",
              },

              {
                q: "ModFS seems to be broken, cannot install modules",
                a: "If you receive error like `/system/bin/sh: /data/adb/magisk/magisk32: inaccessible or not found` while installing your modules, this can be sometimes ModFS related.\n\nCommon root solutions:\n- `MSUINI` Magisk\n- `KSUINI` KernelSU\n- `ASUINI` APatch",
              },

              {
                q: "In what languages is MMRL available?",
                a: `MMRL is in ${Object.keys(availableLangs).length} languages available.

<grid container spacing={3} sx={{ justifyContent: "center", alignItems: "stretch"}}>
${Object.entries(availableLangs)
  .map(
    ([_, lang]) =>
      `<grid item xs={12} sm={6} md={4} lg={5} sx={{display: "flex",alignItems: "center",justifyContent: "center"}}>\`${lang.name}\`</grid>`
  )
  .join("")}
</grid>
                `,
              },
            ]}
          />
        </Box>
      </Page.RelativeContent>

      <Stack
        direction={{ xs: "column", sm: "row" }}
        spacing={2}
        sx={{
          p: 3,
          mb: `${view.getWindowBottomInsets()}px`,
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
