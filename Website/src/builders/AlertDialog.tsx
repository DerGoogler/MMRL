import ons from "onsenui";
import { isValidElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";

namespace AlertDialog {
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

  /**
   * Building dialogs
   */
  export class Builder {
    private dialog: Alert;

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

    /**
     * @prompt Not supported
     */
    public setTitle(value: string): Builder {
      this.dialog.title = value;
      return this;
    }

    public setMessage(value: string | JSX.Element): Builder {
      if (isValidElement(value)) {
        this.dialog.messageHTML = renderToStaticMarkup(value);
      } else {
        this.dialog.messageHTML = value;
      }
      return this;
    }

    /**
     * @prompt Not supported
     */
    public setPositiveButton(title: string, callback?: Function): Builder {
      this.dialog.buttons.positive.title = title;
      this.dialog.buttons.positive.callback = callback;
      return this;
    }

    /**
     * @prompt Not supported
     */
    public setNegativeButtom(title: string, callback?: Function): Builder {
      this.dialog.buttons.negative.title = title;
      this.dialog.buttons.negative.callback = callback;
      return this;
    }

    /**
     * Creates an custom callback for an prompt dialog
     * @alert Not supported
     * @deprecated
     */
    public setPromptCallback(callback: Function): Builder {
      this.dialog.callback = callback;
      return this;
    }

    public setCancelable(cancel: boolean): Builder {
      this.dialog.cancelable = cancel;
      return this;
    }

    public showAlert(): Alert & Void {
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

    public showPrompt(): Alert & Void {
      const { positive, negative } = this.dialog.buttons;
      const { title, callback, messageHTML, cancelable } = this.dialog;
      ons.notification
        .prompt({
          // @ts-ignore
          messageHTML: messageHTML,
          buttonLabels: [negative.title, positive.title],
          title: title,
          // @ts-ignore
          isPrompt: true,
          // @ts-ignore
          autofocus: true,
          // @ts-ignore
          submitOnEnter: true,
        })
        .then((input) => {
          if (typeof positive.callback == "function") {
            positive.callback(input);
          }
        });
    }
  }
}

export default AlertDialog;
