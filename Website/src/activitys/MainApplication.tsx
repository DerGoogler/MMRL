import { Menu } from "@mui/icons-material";
import DeviceModuleFragment from "./fragments/DeviceModuleFragment";
import ExploreModuleFragment from "./fragments/ExploreModuleFragment";
import { useActivity } from "@Hooks/useActivity";
import { Toolbar } from "@Components/onsenui/Toolbar";
import { os } from "@Native/Os";
import { Page } from "@Components/onsenui/Page";
import { useStrings } from "@Hooks/useStrings";
import { Tabbar, TabbarRenderTab } from "@Components/onsenui/Tabbar";
import { useRepos } from "@Hooks/useRepos";
import React from "react";

const MainApplication = () => {
  const { strings } = useStrings();
  const { context } = useActivity();
  const [index, setIndex] = React.useState(0);

  const filteredModules = (modules: Module[], search: string) =>
    modules.filter(
      (module) =>
        module.prop_url.id.toLowerCase().includes(search.toLowerCase()) ||
        module.prop_url.name.toLowerCase().includes(search.toLowerCase()) ||
        module.prop_url.author.toLowerCase().includes(search.toLowerCase()) ||
        module.prop_url.description.toLowerCase().includes(search.toLowerCase())
    );

  const renderTabs = (): TabbarRenderTab[] => {
    return [
      {
        content: <ExploreModuleFragment applyFilter={filteredModules} />,
        tab: <Tabbar.Tab label={strings.explore} />,
      },
      ...(os.isAndroid
        ? [
            {
              content: <DeviceModuleFragment />,
              tab: <Tabbar.Tab label={strings.installed} />,
            },
          ]
        : []),
    ];
  };

  const renderToolbar = () => {
    return (
      <Toolbar modifier="noshadow">
        <Toolbar.Left>
          <Toolbar.Button
            icon={Menu}
            onClick={() => {
              context.splitter.show();
            }}
          />
        </Toolbar.Left>
        <Toolbar.Center>MMRL</Toolbar.Center>
      </Toolbar>
    );
  };

  return (
    <Page modifier="noshadow" renderToolbar={renderToolbar}>
      <Tabbar
        modifier="noshadow"
        hideTabs={!os.isAndroid}
        swipeable={false}
        position={"top"}
        index={index}
        onPreChange={(event) => {
          if (event.index != index) {
            setIndex(event.index);
          }
        }}
        renderTabs={renderTabs}
      />
    </Page>
  );
};

export default MainApplication;
