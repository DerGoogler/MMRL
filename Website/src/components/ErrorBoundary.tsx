import Log from "@Native/Log";
import { ErrorInfo, ReactNode } from "react";
import { Page, Toolbar } from "react-onsenui";
import ViewX from "./ViewX";

interface Props {
  children: ReactNode;
  logger: string;
}

interface States {
  hasError: boolean;
  error: Error | string | null;
  errorInfo: ErrorInfo | null;
}

class ErrorBoundary extends ViewX<Props, States> {
  private _log: Log;
  constructor(props: Props | Readonly<Props>) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
    };

    this._log = new Log(this.props.logger);
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    this.setState({
      hasError: true,
      error: error,
      errorInfo: errorInfo,
    });

    this._log.e(
      <>
        <span style={{ color: "red" }}>ERROR: </span>
        <span>{error.toString()}</span>
        <br /> <span style={{ color: "red" }}>INFO: </span>
        <span>{errorInfo.toString()}</span>
      </>
    );
  }

  public createView(): JSX.Element {
    const { hasError, errorInfo } = this.state;
    if (hasError) {
      return (
        <Page
          renderToolbar={() => (
            <Toolbar>
              <div className="center">Something went wrong</div>
            </Toolbar>
          )}
        >
          <p>{errorInfo?.componentStack}</p>
        </Page>
      );
    }
    return this.props.children as any;
  }
}

export default ErrorBoundary;
