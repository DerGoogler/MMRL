import { Button, Card } from "react-onsenui";
import AppCompatActivity from "./AppCompatActivity";
import Toast from "@Native/Toast";
import Toolbar from "@Builders/ToolbarBuilder";

class NoRootActivity extends AppCompatActivity {
  private readonly magiskPackageName: string = "com.topjohnwu.magisk";
  private readonly magiskDeltaPackageName: string = "io.github.huskydg.magisk";

  public onCreateToolbar(): Toolbar.Props {
    return {
      title: "No Root",
    };
  }

  public onCreate = () => {
    return (
      <div style={{ padding: "8px" }}>
        <Card>
          <div className="title">Failed!</div>
          <div className="content">
            It seems that this device has no root? Please check the Magisk app and enable root permission. If you don't have root, then
            search in the internet for your device.
          </div>
        </Card>
        <Button
          modifier="large"
          onClick={() => {
            if (nos.isPackageInstalled(this.magiskPackageName)) {
              nos.launchAppByPackageName(this.magiskPackageName);
            } else if (nos.isPackageInstalled(this.magiskDeltaPackageName)) {
              nos.launchAppByPackageName(this.magiskDeltaPackageName);
            } else {
              Toast.makeText("Magisk was not found.", Toast.LENGTH_LONG).show();
            }
          }}
        >
          Open Magisk
        </Button>
      </div>
    );
  };
}

export default NoRootActivity;
