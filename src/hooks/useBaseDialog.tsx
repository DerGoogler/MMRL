import { DialogProps } from "@mui/material/Dialog";
import React from "react";
import ReactDOM from "react-dom";
import { useTheme } from "./useTheme";
import { os } from "@Native/Os";
import { useSettings } from "./useSettings";

interface PortalDialog extends DialogProps {
  statusbarColor?: string;
}

class Portal extends React.Component<React.PropsWithChildren, {}> {
  private _container: HTMLDivElement;

  public constructor(props: React.PropsWithChildren) {
    super(props);
    this._container = document.createElement("div");
  }

  public componentDidMount() {
    document.body.appendChild(this._container);
  }

  public componentWillUnmount() {
    document.body.removeChild(this._container);
  }

  public render() {
    return ReactDOM.createPortal(this.props.children, this._container);
  }
}

const useBaseDialog = (DialogComponent: React.ElementType<DialogProps>) =>
  React.forwardRef<any, PortalDialog>((props, ref) => {
    const { theme } = useTheme();
    const { settings } = useSettings();
    const { open, statusbarColor, children, ...rest } = props;

    if (statusbarColor) {
      React.useEffect(() => {
        os.setStatusBarColor(statusbarColor, !settings.darkmode);
        return () => {
          os.setStatusBarColor(theme.palette.primary.main, false);
        };
      }, [open]);
    }

    return (
      <Portal>
        <DialogComponent {...rest} open={open} ref={ref} children={children} />
      </Portal>
    );
  });

export { useBaseDialog };
