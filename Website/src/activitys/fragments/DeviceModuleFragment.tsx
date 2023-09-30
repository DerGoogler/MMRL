import DeviceModule from "@Components/DeviceModule";
import { SuFile } from "@Native/SuFile";
import React from "react";
import { useActivity } from "@Hooks/useActivity";
import { useSettings } from "@Hooks/useSettings";
import { Page } from "@Components/onsenui/Page";
import Stack from "@mui/material/Stack";
import { Shell } from "@Native/Shell";
import { Box, Card, Typography } from "@mui/material";
import TerminalActivity from "@Activitys/TerminalActivity";
import { useTheme } from "@Hooks/useTheme";

const DeviceModuleFragment = () => {
  const { context } = useActivity();
  const { settings, modConf } = useSettings();
  const { theme } = useTheme();
  const [modules, setModules] = React.useState<string[]>([]);

  React.useEffect(() => {
    setModules(SuFile.list(modConf("MODULES")).split(","));
  }, [settings]);

  return (
    <Page>
      <Page.RelativeContent>
        {settings.__experimental_local_install && (Shell.isMagiskSU() || Shell.isKernelSU()) && (
          <Card
            elevation={0}
            onClick={() => {
              // @ts-ignore
              Chooser.getFile(
                "application/zip",
                (file) => {
                  if (file) {
                    context.pushPage({
                      component: TerminalActivity,
                      key: "local_install",
                      extra: {
                        exploreInstall: false,
                        path: file.path,
                      },
                    });
                  }
                },
                null
              );
            }}
          >
            <Box sx={{ p: 2, display: "flex" }}>
              <Stack spacing={0.5} style={{ flexGrow: 1 }}>
                <Typography fontWeight={700} color="text.primary">
                  Install from local
                </Typography>
              </Stack>
            </Box>
          </Card>
        )}
        <Stack sx={{ mt: 1 }} direction="column" justifyContent="flex-start" alignItems="center" spacing={1}>
          {modules.map((module) => (
            <DeviceModule module={module} />
          ))}
        </Stack>
      </Page.RelativeContent>
    </Page>
  );
};

export default DeviceModuleFragment;
