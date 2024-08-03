import React from "react";

export interface ErrorBoundaryProps extends React.PropsWithChildren {
  fallback(error: Error, errorInfo: React.ErrorInfo, resetErrorBoundary: () => void): JSX.Element;
}

export interface ErrorBoundaryState {
  hasError: boolean;
  error: Error;
  errorInfo: React.ErrorInfo;
}

export const errorBoundaryInitialState = {
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

export class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  public constructor(props: ErrorBoundaryProps) {
    super(props);
    this.resetErrorBoundary = this.resetErrorBoundary.bind(this);
    this.state = errorBoundaryInitialState;
  }

  public static getDerivedStateFromError(error: any) {
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    this.setState({ error, errorInfo });
  }

  public resetErrorBoundary() {
    const { error } = this.state;

    if (error !== null) {
      this.setState(errorBoundaryInitialState);
    }
  }

  public render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return this.props.fallback(this.state.error, this.state.errorInfo, this.resetErrorBoundary);
    }

    return this.props.children;
  }
}
