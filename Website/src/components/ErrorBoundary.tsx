import React from "react";

interface Props extends React.PropsWithChildren {
  fallback: (error: Error, errorInfo: React.ErrorInfo, resetErrorBoundary: () => void) => JSX.Element;
}

interface State {
  hasError: boolean;
  error: Error;
  errorInfo: React.ErrorInfo;
}

const initialState = {
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

export class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.resetErrorBoundary = this.resetErrorBoundary.bind(this);
    this.state = initialState;
  }

  static getDerivedStateFromError(error: any) {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    this.setState({ error, errorInfo });
  }

  resetErrorBoundary() {
    const { error } = this.state;

    if (error !== null) {
      this.setState(initialState);
    }
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return this.props.fallback(this.state.error, this.state.errorInfo, this.resetErrorBoundary);
    }

    return this.props.children;
  }
}