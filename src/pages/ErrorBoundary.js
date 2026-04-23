import React from 'react';
import '../pages/ErrorBoundary.css';

/**
 * ErrorBoundary Component
 * Catches React errors throughout the component tree and displays a fallback UI
 * Prevents entire app from crashing due to child component errors
 */
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
    };
  }

  /**
   * Update state so the next render will show the fallback UI
   */
  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  /**
   * Log error details for debugging
   */
  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary caught an error:', error);
    console.error('Error Info:', errorInfo);
    this.setState({
      error,
      errorInfo,
    });
  }

  /**
   * Reset error state to attempt recovery
   */
  handleReset = () => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null,
    });
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-boundary-container">
          <div className="error-content">
            <h1 className="error-title">⚠️ Something Went Wrong</h1>
            <p className="error-message">
              We're sorry, but something unexpected happened. Please try again.
            </p>
            {process.env.NODE_ENV === 'development' && this.state.error && (
              <details className="error-details">
                <summary>Error Details (Development Only)</summary>
                <pre>{this.state.error.toString()}</pre>
                <pre>{this.state.errorInfo?.componentStack}</pre>
              </details>
            )}
            <button className="error-btn" onClick={this.handleReset}>
              Try Again
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
