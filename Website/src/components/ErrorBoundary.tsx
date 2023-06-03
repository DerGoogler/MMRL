import React from "react";

interface Props extends React.PropsWithChildren {
  fallback: (error: Error, errorInfo: React.ErrorInfo) => JSX.Element;
}

interface State {
  hasError: boolean;
  error: Error;
  errorInfo: React.ErrorInfo;
}

export class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: {
        name: "string",
        message: "string",
        stack: "string",
      },
      errorInfo: {
        /**
         * Captures which component contained the exception, and its ancestors.
         */
        componentStack: "string",
      },
    };
  }

  static getDerivedStateFromError(error: any) {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    this.setState({ error, errorInfo });
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return this.props.fallback(this.state.error, this.state.errorInfo);
    }

    return this.props.children;
  }
}
