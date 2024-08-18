import React from "react";
import { useStrings } from "./useStrings";
import { useConfirm } from "material-ui-confirm";
import { os } from "@Native/Os";
import { Download } from "@Native/Download";

const useDownloadModule = (): [(url?: string, dest?: string) => void, number] => {
  const { strings } = useStrings();
  const konfirm = useConfirm();

  const [progress, setProgress] = React.useState(0);

  const start = (url?: string, dest?: string) => {
    if (!url || !dest) return;

    const dl = new Download(url, dest);

    dl.onChange = (obj) => {
      switch (obj.type) {
        case "downloading":
          setProgress(obj.state);
          break;
        case "finished":
          setProgress(0);
          konfirm({
            title: strings("download"),
            description: strings("file_downloaded", { path: dest }),
          })
            .then(() => {})
            .catch(() => {});

          break;
      }
    };

    dl.onError = (err) => {
      setProgress(0);
      os.toast(err, Toast.LENGTH_SHORT);
    };

    dl.start();
  };

  return [start, progress];
};

export { useDownloadModule };
