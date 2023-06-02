import { Button, Dialog, Page, ToolbarButton } from "react-onsenui";
import ons from "onsenui";
import axios from "axios";
import { DownloadRounded, InfoRounded, InstallMobileRounded, VerifiedRounded } from "@mui/icons-material";
import { HighlightedMarkdown } from "@Components/HighlightMarkdown";
import { os } from "@Native/os";
import Alert from "@mui/material/Alert";
import { string } from "@Strings";
import Magisk from "@Native/Magisk";
import ModuleProps from "@Types/ModuleProps";
import AlertDialog from "@Builders/AlertDialog";
import React from "react";
import ToolbarBuilder from "@Builders/ToolbarBuilder";
import { useDarkmode } from "@Hooks/useDarkmode";

interface Props {
  extra: {
    moduleProps: ModuleProps.PropUrl;
    [x: string]: any;
  };
  popPage: any;
}

interface States {
  notes: string;
  dialogShown: boolean;
  mProps: ModuleProps.PropUrl;
  mFoxProps: ModuleProps.FoxProps;
}

const ViewModuleActivity = (props: Props) => {
  const [notes, setNotes] = React.useState("");
  const [dialogShown, setDialogShown] = React.useState(false);
  const [mProps, setMProps] = React.useState(props.extra.moduleProps);
  const [mFoxProps, setMFoxProps] = React.useState(props.extra.moduleProps.foxprops);

  const isDarkmode = useDarkmode();

  // Normal props
  const { name } = mProps;
  // FoxProps
  const { minMagisk, minApi, maxApi, needRamdisk, changeBoot } = mFoxProps;
  const { download, id } = props.extra;
  const { verified, low } = props.extra?.moduleOptions;

  React.useEffect(() => {
    axios
      .get(props.extra?.notes)
      .then((response) => {
        setNotes(response.data);
      })
      .catch((error) => {
        if (error.response.status === 404) {
          setNotes(
            `# 404: Not Found\n\n The author doesn't have created or uploaded an \`README.md\`, please try again later.\n\n\n## About Readme's\n\n- <dangermark/> readme.md\n- <checkmark/> README.md`
          );
        }
      })
      .then(() => {
        // always executed
      });

    if (minApi && minApi > 20) {
      const builder = AlertDialog.Builder;
      builder.setTitle("Unsupported!");
      builder.setMessage("This module target api is higher than your device api.");
      builder.setPositiveButton("Ok");
      builder.setCancelable(false);
      builder.show();
    }
  }, []);

  const showDialog = () => {
    setDialogShown(true);
  };

  const hideDialog = () => {
    setDialogShown(false);
  };

  return (
    <Page
      style={{ marginBottom: "28px" }}
      renderToolbar={() => {
        return (
          <ToolbarBuilder
            title={props.extra?.name}
            onBackButton={props.popPage}
            addToolbarButton={
              <>
                {((minMagisk && minMagisk) ||
                  (minApi && minApi) ||
                  (maxApi && maxApi) ||
                  (needRamdisk && needRamdisk) ||
                  (changeBoot && changeBoot)) != (null || undefined) ? (
                  <div className="right">
                    <ToolbarButton style={{ padding: "0px 10px" }} className="back-button--material__icon" onClick={showDialog}>
                      <InfoRounded />
                    </ToolbarButton>
                  </div>
                ) : null}
              </>
            }
            addToolbarButtonPosition="right"
          />
        );
      }}
    >
      <div style={{ padding: "8px", height: "100%" }} className={isDarkmode ? "markdown-body-dark" : "markdown-body-light"}>
        {verified && (
          <Alert key="verified-module" icon={<VerifiedRounded fontSize="inherit" />} severity="success">
            {string.module_verified}
          </Alert>
        )}
        <HighlightedMarkdown style={{ marginBottom: "8px", height: "100%" }} children={notes} />
      </div>
      <div style={{ height: "56px", width: "100%" }}></div>
      <div
        style={{
          position: "fixed",
          display: "flex",
          height: "52px",
          left: 0,
          bottom: 0,
          padding: "8px",
          width: "100%",
          textAlign: "center",
          backgroundColor: isDarkmode ? "rgba(18, 18, 18, .85)" : "rgba(256, 256, 256, .85)",
        }}
      >
        <Button
          modifier="large"
          onClick={() => {
            os.open(download);

            // Toast.makeText(`Download ${id!}`, Toast.LENGTH_LONG).show();
            // fs.download(`${id!}.zip`, download);
          }}
        >
          {string.download} <DownloadRounded sx={{ color: "white" }} />
        </Button>
        <div style={{ padding: "4px", display: !os.isAndroid ? "none" : "" }}></div>
        <Button
          modifier="large"
          disabled={!os.isAndroid}
          style={{
            display: !os.isAndroid ? "none" : "",
          }}
          onClick={() => {
            ons.notification.alert("The option will be available in the future");
          }}
        >
          {string.install} <InstallMobileRounded sx={{ color: "white" }} />
        </Button>
      </div>
      {/*
       // @ts-ignore */}
      <Dialog visible={dialogShown} cancelable={true} onDialogCancel={hideDialog}>
        <div style={{ margin: "20px" }} className="markdown-body-light">
          <table style={{ width: "100%" }}>
            <th>Informations</th>
            {minMagisk != (null || undefined) && (
              <tr>
                <td
                  style={{
                    width: "100%",
                  }}
                >
                  Min. Magisk
                </td>
                <td
                  style={{
                    color: os.isAndroid ? (Magisk.PARSE_VERSION(minMagisk as any) > Magisk.VERSION_CODE ? "red" : "") : "",
                  }}
                >
                  {minMagisk}
                </td>
              </tr>
            )}
            {minApi != (null || undefined) && (
              <tr>
                <td style={{ width: "100%" }}>Min. Android</td>
                <td>{minApi}</td>
              </tr>
            )}
            {maxApi != (null || undefined) && (
              <tr>
                <td style={{ width: "100%" }}>Max. Android</td>
                <td>{maxApi}</td>
              </tr>
            )}
            {needRamdisk != (null || undefined) && (
              <tr>
                <td style={{ width: "100%" }}>needsRamdisk</td>
                <td>{needRamdisk}</td>
              </tr>
            )}
            {changeBoot != (null || undefined) && (
              <tr>
                <td style={{ width: "100%" }}>changeBoot</td>
                <td>{changeBoot}</td>
              </tr>
            )}
          </table>
        </div>
      </Dialog>
    </Page>
  );
};

export default ViewModuleActivity;
