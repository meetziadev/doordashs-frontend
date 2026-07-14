import React from 'react';

type State = { hasError: boolean };

class ErrorBoundary extends React.Component<React.PropsWithChildren<{}>, State> {
  constructor(props: any) { super(props); this.state = { hasError: false }; }
  static getDerivedStateFromError() { return { hasError: true }; }
  componentDidCatch() {}
  render() { return this.state.hasError ? <div className="max-w-2xl mx-auto p-10 text-center">Something went wrong.</div> : this.props.children; }
}

export default ErrorBoundary;

