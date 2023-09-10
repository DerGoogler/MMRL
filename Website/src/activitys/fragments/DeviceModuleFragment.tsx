import DeviceModule from "@Components/DeviceModule";
import { SuFile } from "@Native/SuFile";
import { StyledCard } from "@Components/StyledCard";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { os } from "@Native/Os";
import React from "react";
import { useActivity } from "@Hooks/useActivity";
import TerminalActivity from "@Activitys/TerminalActivity";
import { useSettings } from "@Hooks/useSettings";
import { Page } from "@Components/onsenui/Page";

const DeviceModuleFragment = () => {
  const { context } = useActivity();
  const { settings } = useSettings();
  const [modules, setModules] = React.useState<string[]>([]);

  React.useEffect(() => {
    setModules(SuFile.list("/data/adb/modules").split(","));
  }, []);

  return (
    <Page>
      <Page.RelativeContent>
        {/* {settings.__experimental_local_install && (
          <StyledCard
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
          </StyledCard>
        )} */}

        {modules.map((module) => (
          <DeviceModule module={module} />
        ))}
      </Page.RelativeContent>
    </Page>
  );
};

export default DeviceModuleFragment;
