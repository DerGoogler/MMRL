import DeviceModule from "@Components/DeviceModule";
import { SuFile } from "@Native/SuFile";
import React from "react";
import { useActivity } from "@Hooks/useActivity";
import { formatString, useSettings } from "@Hooks/useSettings";
import { Page } from "@Components/onsenui/Page";
import Stack from "@mui/material/Stack";
import { Shell } from "@Native/Shell";
import { Box, Card, Paper, Typography } from "@mui/material";
import TerminalActivity from "@Activitys/TerminalActivity";
import { useTheme } from "@Hooks/useTheme";
import { Properties } from "properties-file";
import { Searchbar } from "@Components/Searchbar";
import { Disappear } from "react-disappear";
import { FilterDialog, useModuleFilter } from "@Hooks/useModulesFilter";
import { useStrings } from "@Hooks/useStrings";

export interface DeviceModuleProps {
  applyFilter: (modules: Module[], search: string) => Module[];
}

const DeviceModuleFragment = React.memo<DeviceModuleProps>((props) => {
  const { context } = useActivity();
  const { settings, modConf } = useSettings();
  const { strings } = useStrings();
  const { theme } = useTheme();
  const [modules, setModules] = React.useState<Module[]>([]);

  React.useEffect(() => {
    const folders = SuFile.list(modConf("MODULES")).split(",");
    folders.forEach((module) => {
      const properties = new SuFile(modConf("PROPS", { MODID: module }));
      if (properties.exist()) {
        setModules((prev) => {
          // Preventing duplicates
          const ids = new Set(prev.map((d) => d.id));
          const merged = [...prev, ...[new Properties(properties.read()).toObject() as unknown as Module].filter((d) => !ids.has(d.id))];
          return merged;
        });
      }
    });
  }, [settings]);

  const [scrolled, setScrolled] = React.useState(false);
  const [search, setSearch] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const [filteredModules, exploreFilter, setExploreFilter] = useModuleFilter("local_filter", props.applyFilter(modules, search));
  const hasInstallTools = SuFile.exist("/data/adb/modules/mmrl_install_tools/module.prop");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (value: string) => {
    setOpen(false);
    setExploreFilter(value);
  };

  return (
    <Page>
      <Page.RelativeContent>
        <Disappear
          onDisappear={(state) => {
            setScrolled(!state);
          }}
        >
          <></>
        </Disappear>
        <Paper
          elevation={scrolled ? 1 : 0}
          sx={
            !settings.disable_sticky_search_bar
              ? {
                  position: "sticky",
                  top: 8,
                }
              : {}
          }
        >
          <Searchbar
            sx={{
              borderRadius: theme.shape.borderRadius,
            }}
            onFilterClick={handleClickOpen}
            placeholder={strings("search_modules")}
            onChange={(e) => setSearch(e.target.value)}
          />
        </Paper>

        {hasInstallTools && (Shell.isMagiskSU() || Shell.isKernelSU()) && (
          <Card
            elevation={0}
            sx={{ mt: 1 }}
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
          {filteredModules.map((module) => (
            <DeviceModule module={module} />
          ))}
        </Stack>
      </Page.RelativeContent>

      <FilterDialog selectedValue={exploreFilter} open={open} onClose={handleClose} />
    </Page>
  );
});

export default DeviceModuleFragment;
