import ons from "onsenui";

interface Alert {
  title: string;
  message: string;
  cancelable: boolean;
  callback: Function;
  buttons: AlertButtons;
}

interface AlertButtons {
  positive: AlertButton;
  negative: AlertButton;
}

interface AlertButton {
  title: string;
  callback: Function | undefined;
}

class AlertBuilder {
  private readonly dialog: Alert;

  public constructor() {
    this.dialog = {
      title: "",
      message: "",
      cancelable: true,
      callback: () => {},
      buttons: {
        positive: {
          title: "",
          callback: () => {},
        },
        negative: {
          title: "",
          callback: () => {},
        },
      },
    };
  }

  /**
   * @prompt Not supported
   */
  public setTitle(value: string): AlertBuilder {
    this.dialog.title = value;
    return this;
  }

  public setMessage(value: string): AlertBuilder {
    this.dialog.message = value;
    return this;
  }

  /**
   * @prompt Not supported
   */
  public setPositiveButton(title: string, callback?: Function): AlertBuilder {
    this.dialog.buttons.positive.title = title;
    this.dialog.buttons.positive.callback = callback;
    return this;
  }

  /**
   * @prompt Not supported
   */
  public setNegativeButtom(title: string, callback?: Function): AlertBuilder {
    this.dialog.buttons.negative.title = title;
    this.dialog.buttons.negative.callback = callback;
    return this;
  }

  /**
   * Creates an custom callback for an prompt dialog
   * @alert Not supported
   */
  public setPromptCallback(callback: Function): AlertBuilder {
    this.dialog.callback = callback;
    return this;
  }

  public setCancelable(cancel: boolean): AlertBuilder {
    this.dialog.cancelable = cancel;
    return this;
  }

  public showAlert(): Alert & Void {
    const { positive, negative } = this.dialog.buttons;
    ons.notification.confirm({
      message: this.dialog.message,
      title: this.dialog.title,
      buttonLabels: [this.dialog.buttons.positive.title, this.dialog.buttons.negative.title],
      animation: "default",
      primaryButtonIndex: 0,
      cancelable: true,
      callback: (index: number) => {
        switch (index) {
          case 0:
            if (typeof positive.callback == "function") positive.callback();
            break;
          case 1:
            if (typeof negative.callback == "function") negative.callback();
            break;

          default:
            // Nothing
            break;
        }
      },
    });
  }

  public showPrompt(): Alert & Void {
    const { callback, message, cancelable } = this.dialog;
    ons.notification.prompt(message).then((input) => {
      if (typeof callback == "function") {
        callback(input);
      }
    });
  }
}

export default AlertBuilder;
