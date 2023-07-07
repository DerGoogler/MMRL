import React from "react";
interface Props extends React.PropsWithChildren {
    fallback: (error: Error, errorInfo: React.ErrorInfo, resetErrorBoundary: () => void) => JSX.Element;
}
interface State {
    hasError: boolean;
    error: Error;
    errorInfo: React.ErrorInfo;
}
export declare class ErrorBoundary extends React.Component<Props, State> {
    constructor(props: Props);
    static getDerivedStateFromError(error: any): {
        hasError: boolean;
    };
    componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void;
    resetErrorBoundary(): void;
    render(): string | number | boolean | React.ReactFragment | JSX.Element | null | undefined;
}
export {};
