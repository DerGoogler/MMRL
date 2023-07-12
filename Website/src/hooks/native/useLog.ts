import { os } from "@Native/Os";

export function useLog(tag: string) {
  const DEBUG = 3;
  const INFO = 4;
  const WARN = 5;
  const ERROR = 6;

  return {
    d: (msg: string) => {
      if (os.isAndroid) {
        window.__log__.native_log(DEBUG, String(tag), msg);
      } else {
        console.debug(`D/${tag}: ${msg}`);
      }
    },
    i: (msg: string) => {
      if (os.isAndroid) {
        window.__log__.native_log(INFO, String(tag), msg);
      } else {
        console.info(`D/${tag}: ${msg}`);
      }
    },
    w: (msg: string) => {
      if (os.isAndroid) {
        window.__log__.native_log(WARN, String(tag), msg);
      } else {
        console.warn(`D/${tag}: ${msg}`);
      }
    },
    e: (msg: string) => {
      if (os.isAndroid) {
        window.__log__.native_log(ERROR, String(tag), msg);
      } else {
        console.error(`D/${tag}: ${msg}`);
      }
    },
  };
}
