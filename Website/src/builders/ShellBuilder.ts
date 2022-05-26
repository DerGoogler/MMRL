import Constants from "@Native/Constants";
import Log from "./Log";

interface ShellInterface {
  command: string;
}

class ShellBuilder {
  private dialog: ShellInterface;
  private log: Log;

  public constructor() {
    this.log = new Log(this.constructor.name);
    this.dialog = {
      command: "",
    };
  }

  /**
   * Runs an Android native shell cmd
   * Should never used multiple
   */
  public cmd(cmd: string): ShellBuilder {
    this.dialog.command = cmd;
    return this;
  }

  /**
   * Executes an command without result
   */
  public exec(): void {
    const { command } = this.dialog;
    if (Constants.isAndroid) {
      android.exec(command);
    } else {
      this.log.w(command);
    }
  }

  /**
   * Executes an command with result
   */
  public result(): string {
    const { command } = this.dialog;
    if (Constants.isAndroid) {
      return android.execResult(command);
    } else {
      return command;
    }
  }
}

const Shell: ShellBuilder = new ShellBuilder();

export default Shell;
