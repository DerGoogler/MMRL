import AppCompatActivity from "./AppCompatActivity";
import Toast from "@Native/Toast";
import { string } from "@Strings";
import { Button, Card } from "react-onsenui";

class NoRootActivity extends AppCompatActivity {
  private readonly magiskPackageName: string = "com.topjohnwu.magisk";
  private readonly magiskDeltaPackageName: string = "io.github.huskydg.magisk";

  public onCreateToolbar() {
    return {
      title: string.no_root,
    };
  }

  public onCreate() {
    return (
      <div style={{ padding: "8px" }}>
        <Card>
          <div className="title">{string.failed}!</div>
          <div className="content">{string.no_root_message}</div>
        </Card>
        <Button
          modifier="large"
          style={{ marginLeft: "8px", marginRight: "8px" }}
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
          {string.open_magisk}
        </Button>
      </div>
    );
  }
}

export default NoRootActivity;
