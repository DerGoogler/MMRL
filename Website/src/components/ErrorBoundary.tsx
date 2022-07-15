import Log from "@Native/Log";
import { ErrorInfo, ReactNode } from "react";
import { ViewX, ViewXRenderData } from "react-onsenuix";

interface Props {
  children: ReactNode;
  logger: string;
}

interface States {
  hasError: boolean;
  error: Error | string | null;
  errorInfo: ErrorInfo | string | null;
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

  public createView(data: ViewXRenderData<Props, States, HTMLElement>): JSX.Element {
    if (data.s.hasError) {
      return (
        <div>
          <h2>Something went wrong.</h2>
          <details style={{ whiteSpace: "pre-wrap" }}>
            {data.s.hasError && data.s.hasError.toString()}
            <br />

            {
              // @ts-ignore
              data.s.errorInfo?.componentStack
            }
          </details>
        </div>
      );
    }
    return data.p.children as any;
  }
}

export default ErrorBoundary;
