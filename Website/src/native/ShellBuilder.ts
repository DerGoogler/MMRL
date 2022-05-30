import Constants from "@Native/Constants";
import Log from "@Native/Log";

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
      nshell.exec(command);
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
      return nshell.result(command);
    } else {
      return command;
    }
  }

  public isAppGrantedRoot(): boolean {
    return nshell.isAppGrantedRoot();
  }
}

const Shell: ShellBuilder = new ShellBuilder();

export default Shell;
