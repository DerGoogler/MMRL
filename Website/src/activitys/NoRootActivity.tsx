import { Button, Card, Toolbar } from "react-onsenui";
import AppCompatActivity from "./AppCompatActivity";
import Toast from "@Native/Toast";

class NoRootActivity extends AppCompatActivity {
  private readonly magiskPackageName: string = "com.topjohnwu.magisk";

  protected onCreateToolbar = () => {
    return (
      // @ts-ignore
      <Toolbar>
        <div className="center">No Root</div>
        {/**
        // @ts-ignore */}
      </Toolbar>
    );
  };

  protected onCreate = () => {
    return (
      <div style={{ padding: "8px" }}>
        {/*
          //@ts-ignore*/}
        <Card>
          <div className="title">Failed!</div>
          <div className="content">
            It seems that this device has no root? Please check the Magisk app and enable root permission. If you don't have root, then
            search in the internet for your device.
          </div>
        </Card>
        {nos.isPackageInstalled(this.magiskPackageName) ? (
          // @ts-ignore
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
          // @ts-ignore
          <Button modifier="large" disabled>
            Magisk Not Found
          </Button>
        )}
      </div>
    );
  };
}

export default NoRootActivity;
