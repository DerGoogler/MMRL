import Constants from "@Native/Constants";

class SuFile {
  private pathname: string;

  public constructor(pathname: string) {
    this.pathname = pathname;
  }

  readonly storage = {
    /**
     * Read files in the external storage
     * @returns string
     */
    read: (): string => {
      if (Constants.isAndroid) {
        return android.SuFile(this.pathname).storage().read();
      } else {
        return "";
      }
    },
  };
  readonly system = {
    /**
     * Read files from the system and external storage
     * @returns string
     */
    read: (): string => {
      if (Constants.isAndroid) {
        return android.SuFile(this.pathname).system().read();
      } else {
        return "";
      }
    },

    list: (): string => {
      if (Constants.isAndroid) {
        return android.SuFile(this.pathname).system().list();
      } else {
        return "";
      }
    },

    exists: (): boolean => {
      if (Constants.isAndroid) {
        return android.SuFile(this.pathname).system().exists();
      } else {
        return false;
      }
    },

    createNewFile: (): boolean => {
      if (Constants.isAndroid) {
        return android.SuFile(this.pathname).system().createNewFile();
      } else {
        return false;
      }
    },

    delete: (): boolean => {
      if (Constants.isAndroid) {
        return android.SuFile(this.pathname).system().delete();
      } else {
        return false;
      }
    },

    deleteRecursive: (): void => {
      if (Constants.isAndroid) {
        return android.SuFile(this.pathname).system().deleteRecursive();
      } else {
        return;
      }
    },
  };
}

export default SuFile;
