import Toast from "@Native/Toast";
import { Button, Card } from "react-onsenui";
import { Text, useText } from "@Hooks/useLanguage";

const NoRootActivity = () => {
  const magiskPackageName: string = "com.topjohnwu.magisk";
  const magiskDeltaPackageName: string = "io.github.huskydg.magisk";

  return (
    <div style={{ padding: "8px" }}>
      <Card>
        <div className="title">
          <Text string="failed" />!
        </div>
        <div className="content">
          <Text string="no_root_message" />
        </div>
      </Card>
      <Button
        modifier="large"
        style={{ marginLeft: "8px", marginRight: "8px" }}
        onClick={() => {
          if (nos.isPackageInstalled(magiskPackageName)) {
            nos.launchAppByPackageName(magiskPackageName);
          } else if (nos.isPackageInstalled(magiskDeltaPackageName)) {
            nos.launchAppByPackageName(magiskDeltaPackageName);
          } else {
            Toast.makeText("Magisk was not found.", Toast.LENGTH_LONG).show();
          }
        }}
      >
        <Text string="open_magisk" />
      </Button>
    </div>
  );
};

export default NoRootActivity;
