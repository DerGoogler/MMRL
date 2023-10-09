import { ExploreModule } from "@Components/ExploreModule";
import { Searchbar } from "@Components/Searchbar";
import React from "react";
import { useActivity } from "@Hooks/useActivity";
import { useRepos } from "@Hooks/useRepos";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import { useStrings } from "@Hooks/useStrings";
import { useSettings } from "@Hooks/useSettings";
import { useTheme } from "@Hooks/useTheme";
import { Page, RenderFunction } from "@Components/onsenui/Page";
import { MissingInternet } from "@Components/MissingInternet";
import { useNetwork } from "@Hooks/useNetwork";
import { Button, Paper } from "@mui/material";
import { FilterDialog, useModuleFilter } from "@Hooks/useModulesFilter";
import ModuleViewActivity from "@Activitys/ModuleViewActivity";
import { Disappear } from "react-disappear";
import { SuFile } from "@Native/SuFile";
import { Properties } from "properties-file";
import TerminalActivity from "@Activitys/TerminalActivity";

export interface ExploreModuleProps {
  renderToolbar?: RenderFunction;
  applyFilter: (modules: Module[], search: string) => Module[];
}

const UpdateModuleFragment = React.memo<ExploreModuleProps>((props) => {
  const { context } = useActivity();
  const { strings } = useStrings();
  const { settings, modConf } = useSettings();
  const { scheme, theme, shade } = useTheme();
  const { modules, repos } = useRepos();
  const { isNetworkAvailable } = useNetwork();
  const [search, setSearch] = React.useState("");
  const [updateableModule, setUpdateableModule] = React.useState<Module[]>(modules);

  React.useEffect(() => {
    setUpdateableModule((prev) => {
      const t = prev.filter(({ id, versionCode }) => {
        const properties = new SuFile(modConf("PROPS", { MODID: id }));
        if (properties.exist()) {
          const props = new Properties(properties.read()).toObject() as unknown as Module;
          return props.versionCode < versionCode;
        } else {
          return false;
        }
      });

      console.log(t);
      return t;
    });
  }, []);

  const [open, setOpen] = React.useState(false);

  const [filteredModules, exploreFilter, setExploreFilter] = useModuleFilter("update_filter", props.applyFilter(updateableModule, search));

  if (!isNetworkAvailable) {
    return (
      <Page>
        <MissingInternet />
      </Page>
    );
  }

  if (modules.length === 0) {
    return (
      <Page>
        <Stack
          component="h4"
          sx={{
            color: theme.palette.secondary.dark,
            width: "100%",
            height: "100%",
            m: "unset",
          }}
          direction="row"
          justifyContent="center"
          alignItems="center"
          spacing={1}
        >
          <Box>There are no updates</Box>
        </Stack>
      </Page>
    );
  }

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (value: string) => {
    setOpen(false);
    setExploreFilter(value);
  };

  React.useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get("module");
    const m_ = modules.find((m) => m.id === id);
    if (m_) {
      context.pushPage({
        component: ModuleViewActivity,
        key: "",
        extra: m_,
      });
    }
  }, [modules]);

  const [scrolled, setScrolled] = React.useState(false);

  return (
    <Page renderToolbar={props.renderToolbar}>
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

        <Stack sx={{ mt: 1 }} direction="column" justifyContent="flex-start" alignItems="center" spacing={1}>
          {filteredModules.map((module, index) => (
            <Box sx={{ width: "100%" }}>
              <ExploreModule
                sx={{ borderRadius: `${theme.shape.borderRadius}px ${theme.shape.borderRadius}px 0px 0px` }}
                index={index}
                key={module.id + index}
                moduleProps={module}
              />
              <Button
                sx={{
                  borderRadius: `0px 0px ${theme.shape.borderRadius}px ${theme.shape.borderRadius}px`,
                }}
                fullWidth
                variant="contained"
                disableElevation
                onClick={() => {
                  context.pushPage({
                    component: TerminalActivity,
                    key: "update_install",
                    extra: {
                      exploreInstall: true,
                      path: module.download,
                    },
                  });
                }}
              >
                {strings("update")}
              </Button>
            </Box>
          ))}
        </Stack>
      </Page.RelativeContent>

      <FilterDialog selectedValue={exploreFilter} open={open} onClose={handleClose} />
    </Page>
  );
});

export default UpdateModuleFragment;
