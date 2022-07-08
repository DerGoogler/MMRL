import Log from "@Native/Log";
import { Component, ErrorInfo, ReactNode } from "react";

interface Props {
  children: ReactNode;
  logger: string;
}

interface States {
  hasError: boolean;
  error: Error | string | null;
  errorInfo: ErrorInfo | string | null;
}

class ErrorBoundary extends Component<Props, States> {
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

  public render() {
    if (this.state.hasError) {
      return (
        <div>
          <h2>Something went wrong.</h2>
          <details style={{ whiteSpace: "pre-wrap" }}>
            {this.state.hasError && this.state.hasError.toString()}
            <br />

            {
              // @ts-ignore
              this.state.errorInfo?.componentStack
            }
          </details>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
