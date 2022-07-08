import { Button, Card } from "react-onsenui";
import AppCompatActivity from "./AppCompatActivity";
import Toast from "@Native/Toast";
import Toolbar from "@Builders/ToolbarBuilder";

class NoRootActivity extends AppCompatActivity {
  private readonly magiskPackageName: string = "com.topjohnwu.magisk";

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
        {nos.isPackageInstalled(this.magiskPackageName) ? (
          <Button
            modifier="large"
            onClick={() => {
              if (nos.isPackageInstalled(this.magiskPackageName)) {
                nos.launchAppByPackageName(this.magiskPackageName);
              } else {
                Toast.makeText("Magisk was not found!", Toast.LENGTH_LONG).show();
              }
            }}
          >
            Open Magisk
          </Button>
        ) : (
          <Button modifier="large" disabled>
            Magisk Not Found
          </Button>
        )}
      </div>
    );
  };
}

export default NoRootActivity;
