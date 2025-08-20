import React from "react";
import { useNavigate } from "react-router-dom";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({
      error: error,
      errorInfo: errorInfo,
    });

    console.error("Error caught by boundary:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <ErrorFallback resetError={() => this.setState({ hasError: false, error: null, errorInfo: null })} error={this.state.error} errorInfo={this.state.errorInfo} />;
    }

    return this.props.children;
  }
}

function ErrorFallback({ resetError, error, errorInfo }) {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0a0a0a] to-[#1a1f2e] flex items-center justify-center p-6">
      <div className="max-w-lg w-full bg-white/5 backdrop-blur-md rounded-2xl shadow-2xl p-8 text-center border border-white/10">
        
        {/* Icon */}
        <div className="mb-6">
          <div className="w-20 h-20 mx-auto mb-4 bg-red-500/20 rounded-full flex items-center justify-center animate-pulse">
            <svg
              className="w-12 h-12 text-red-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01M5 19h14a2 2 0 001.732-3L13.732 5a2 2 0 00-3.464 0L3.268 16a2 2 0 001.732 3z"
              />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">Oops! Something went wrong</h1>
          <p className="text-gray-400">
            An unexpected error occurred. You can refresh, try again, or return home.
          </p>
        </div>

        {/* Buttons */}
        <div className="space-y-3 sm:space-y-0 sm:space-x-3 flex flex-col sm:flex-row justify-center">
          <button
            onClick={() => window.location.reload()}
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
          >
            🔄 Refresh Page
          </button>

          <button
            onClick={resetError}
            className="flex-1 bg-gray-600 hover:bg-gray-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
          >
            ♻️ Try Again
          </button>

          <button
            onClick={() => navigate("/")}
            className="flex-1 bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
          >
            🏠 Go Home
          </button>
        </div>

        {/* Dev Mode Error Details */}
        {process.env.NODE_ENV === "development" && error && (
          <details className="mt-6 text-left">
            <summary className="text-gray-400 cursor-pointer hover:text-white">
              Error Details (Development)
            </summary>
            <div className="mt-2 p-3 bg-gray-800 rounded text-xs text-gray-300 overflow-auto max-h-40">
              <div className="mb-2">
                <strong>Error:</strong> {error.toString()}
              </div>
              <div>
                <strong>Stack:</strong> {errorInfo?.componentStack}
              </div>
            </div>
          </details>
        )}
      </div>
    </div>
  );
}

export default ErrorBoundary;
