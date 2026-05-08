import { Component, type ErrorInfo, type ReactNode } from "react";

type Props = {
  children: ReactNode;
  onError?: (error: Error, info: ErrorInfo) => void;
};

type State = {
  hasError: boolean;
};

export class AppErrorBoundary extends Component<Props, State> {
  state: State = {
    hasError: false
  };

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo): void {
    this.props.onError?.(error, info);
  }

  componentDidMount(): void {
    window.addEventListener("hashchange", this.handleRouteChange);
    window.addEventListener("popstate", this.handleRouteChange);
  }

  componentWillUnmount(): void {
    window.removeEventListener("hashchange", this.handleRouteChange);
    window.removeEventListener("popstate", this.handleRouteChange);
  }

  private handleRouteChange = (): void => {
    if (this.state.hasError) {
      this.setState({ hasError: false });
    }
  };

  private handleReload = (): void => {
    window.location.reload();
  };

  private handleGoHome = (): void => {
    this.setState({ hasError: false }, () => {
      window.location.hash = "app/sip-academy";
    });
  };

  render() {
    if (this.state.hasError) {
      return (
        <main className="app-shell-state app-shell-error" role="alert">
          <h2>Something went wrong</h2>
          <p>The app hit an unexpected issue. Reload to continue or jump back to Sip Academy.</p>
          <div className="app-shell-actions">
            <button type="button" className="btn btn-primary" onClick={this.handleReload}>
              Reload App
            </button>
            <button type="button" className="btn btn-light" onClick={this.handleGoHome}>
              Go to Sip Academy
            </button>
          </div>
        </main>
      );
    }

    return this.props.children;
  }
}
