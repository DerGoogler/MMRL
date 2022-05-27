import Constants from "@Native/Constants";

class MvFile {
  private pathname: string;

  public constructor(pathname: string) {
    this.pathname = pathname;
  }

  read(): string {
    if (Constants.isAndroid) {
      return android.readFile(this.pathname);
    } else {
      return "";
    }
  }

  suRead(): string {
    if (Constants.isAndroid) {
      return android.suReadFile(this.pathname);
    } else {
      return "";
    }
  }
}

export default MvFile;
