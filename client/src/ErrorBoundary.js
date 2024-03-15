import React from 'react';


class ErrorBoundary extends React.Component {
  state = { hasError: false };

  static getDerivedStateFromError (error) {
    console.error('Error caught in ErrorBoundary:', error);
    return { hasError: true };
  }

  componentDidCatch (error, errorInfo) {
    console.log('ErrorBoundary caught an error: ', error, 'Info: ', errorInfo);
  }

  render () {
    if (this.state.hasError) {
      return this.props?.fallback || <h1>Something went wrong.</h1>;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;