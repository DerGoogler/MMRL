import { Menu } from "@mui/icons-material";
import { useActivity } from "@Hooks/useActivity";
import { Toolbar } from "@Components/onsenui/Toolbar";
import { os } from "@Native/Os";
import { Page } from "@Components/onsenui/Page";
import { useStrings } from "@Hooks/useStrings";
import { Tabbar, TabbarRenderTab } from "@Components/onsenui/Tabbar";
import Register from "./fragments/Register";
import Login from "./fragments/Login";

const NoAccountActivty = () => {
  const { strings } = useStrings();
  const { context } = useActivity();

  const renderTabs = (): TabbarRenderTab[] => {
    return [
      {
        content: <Login />,
        tab: <Tabbar.Tab label={"Login"} />,
      },
      {
        content: <Register />,
        tab: <Tabbar.Tab label={"Register"} />,
      },
    ];
  };

  const renderToolbar = () => {
    return (
      <Toolbar modifier="noshadow">
        <Toolbar.Left>
          <Toolbar.BackButton onClick={context.popPage} />
        </Toolbar.Left>
        <Toolbar.Center>Account</Toolbar.Center>
      </Toolbar>
    );
  };

  return (
    <Page modifier="noshadow" renderToolbar={renderToolbar}>
      <Tabbar modifier="noshadow" swipeable={false} position={"top"} renderTabs={renderTabs} />
    </Page>
  );
};

export default NoAccountActivty;
