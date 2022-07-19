import ons from "onsenui";
import { isValidElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";

interface Alert {
  title: string;
  messageHTML: string | JSX.Element;
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

interface AlertOptions {
  message?: string;
  messageHTML?: string | JSX.Element;
  buttonLabel?: string;
  buttonLabels?: string[];
  primaryButtonIndex?: number;
  cancelable?: boolean;
  animation?: string;
  title?: string;
  modifier?: string;
  callback?: any;
  id?: string;
}

abstract class AlertDialog {
  public static Builder = class {
    dialog: Alert;

    public constructor() {
      this.dialog = {
        title: "",
        messageHTML: "",
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

    public setTitle(value: string): this {
      this.dialog.title = value;
      return this;
    }

    public setMessage(value: string | JSX.Element): this {
      if (isValidElement(value)) {
        this.dialog.messageHTML = renderToStaticMarkup(value);
      } else {
        this.dialog.messageHTML = value;
      }
      return this;
    }

    public setPositiveButton(title: string, callback?: Function): this {
      this.dialog.buttons.positive.title = title;
      this.dialog.buttons.positive.callback = callback;
      return this;
    }

    public setNegativeButtom(title: string, callback?: Function): this {
      this.dialog.buttons.negative.title = title;
      this.dialog.buttons.negative.callback = callback;
      return this;
    }

    public setCancelable(cancel: boolean): this {
      this.dialog.cancelable = cancel;
      return this;
    }

    public show(): void {
      const { positive, negative } = this.dialog.buttons;
      const { title, messageHTML } = this.dialog;
      const pla: AlertOptions = {
        buttonLabels: [],
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
      };
      pla.messageHTML = messageHTML;
      pla.title = title;
      if (positive.title) {
        pla.buttonLabels?.push(positive.title);
      }
      if (negative.title) {
        pla.buttonLabels?.push(negative.title);
      }
      // @ts-ignore
      ons.notification.confirm(pla);
    }
  };
}

export default AlertDialog;
