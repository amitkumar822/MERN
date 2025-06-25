import React from "react";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    // Update state to show fallback UI
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // You can log the error to an error reporting service here
    console.error("Caught by ErrorBoundary:", error, errorInfo);
    this.setState({ error, errorInfo });
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="w-full min-h-screen flex flex-col items-center justify-center bg-red-50 text-red-700 p-6">
          <h1 className="text-2xl font-bold mb-2">Something went wrong 😢</h1>
          <p className="text-sm mb-4">Please try refreshing the page or contact support.</p>
          {this.state.error && (
            <details className="text-xs whitespace-pre-wrap">
              {this.state.error.toString()}
              <br />
              {this.state.errorInfo?.componentStack}
            </details>
          )}
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
