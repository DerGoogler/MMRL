import Constants from "@Native/Constants";
import LoggerManager from "@Native/LoggerManager";

interface ShellInterface {
  command: string;
}

class ShellBuilder {
  private dialog: ShellInterface;
  private log: LoggerManager;

  public constructor() {
    this.log = new LoggerManager(this.constructor.name);
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
  public exec(): ShellBuilder & Void {
    const { command } = this.dialog;
    if (Constants.isAndroid) {
      android.exec(command);
    } else {
      this.log.warn(command);
    }
  }

  /**
   * Executes an command with result
   */
  public result(): ShellBuilder | string | undefined {
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
