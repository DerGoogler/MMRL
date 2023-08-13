import { Menu } from "@mui/icons-material";
import { useActivity } from "@Hooks/useActivity";
import { Toolbar } from "@Components/onsenui/Toolbar";
import { os } from "@Native/Os";
import { Page } from "@Components/onsenui/Page";
import { useStrings } from "@Hooks/useStrings";
import { Tabbar, TabbarRenderTab } from "@Components/onsenui/Tabbar";
import Signup from "./fragments/Signup";
import Signin from "./fragments/Signin";

const NoAccountActivty = () => {
  const { strings } = useStrings();
  const { context } = useActivity();

  const renderTabs = (): TabbarRenderTab[] => {
    return [
      {
        content: <Signup />,
        tab: <Tabbar.Tab label={"Sign up"} />,
      },
      {
        content: <Signin />,
        tab: <Tabbar.Tab label={"Sign in"} />,
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
