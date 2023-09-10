import DeviceModule from "@Components/DeviceModule";
import { SuFile } from "@Native/SuFile";
import React from "react";
import { useActivity } from "@Hooks/useActivity";
import { useSettings } from "@Hooks/useSettings";
import { Page } from "@Components/onsenui/Page";

const DeviceModuleFragment = () => {
  const { context } = useActivity();
  const { settings } = useSettings();
  const [modules, setModules] = React.useState<string[]>([]);

  React.useEffect(() => {
    const dir = SuFile.list(settings.def_mod_path).split(",");

    const regex = settings.mod_filt.map(function (re) {
      return new RegExp("\\b" + re + "\\b", "i");
    });

    setModules(
      dir.filter(function (t) {
        return (
          regex.filter(function (re) {
            return re.test(t);
          }).length === 0
        );
      })
    );
  }, [settings.def_mod_path, settings.mod_filt]);

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
