import { Page } from "@Components/onsenui/Page";
import { Toolbar } from "@Components/onsenui/Toolbar";
import { useStrings } from "@Hooks/useStrings";
import { Button, Card } from "react-onsenui";

const NoRootActivity = () => {
  const { strings } = useStrings();
  const magiskPackageName: string = "com.topjohnwu.magisk";
  const magiskDeltaPackageName: string = "io.github.huskydg.magisk";

  const renderToolbar = () => {
    return (
      <Toolbar modifier="noshadow">
        <Toolbar.Center>Missing root</Toolbar.Center>
      </Toolbar>
    );
  };

  return (
    <Page modifier="noshadow" renderToolbar={renderToolbar}>
      <div style={{ padding: "8px" }}>
        <Card>
          <div className="title">{strings.failed}!</div>
          <div className="content">{strings.no_root_message}</div>
        </Card>
        <Button
          modifier="large"
          style={{ marginLeft: "8px", marginRight: "8px" }}
          onClick={() => {
            if (window.__os__.isPackageInstalled(magiskPackageName)) {
              window.__os__.launchAppByPackageName(magiskPackageName);
            } else if (window.__os__.isPackageInstalled(magiskDeltaPackageName)) {
              window.__os__.launchAppByPackageName(magiskDeltaPackageName);
            } else {
              window.__os__.toast("Magisk was not found.", Toast.LENGTH_LONG).show();
            }
          }}
        >
          {strings.open_magisk}
        </Button>
      </div>
    </Page>
  );
};

export default NoRootActivity;
