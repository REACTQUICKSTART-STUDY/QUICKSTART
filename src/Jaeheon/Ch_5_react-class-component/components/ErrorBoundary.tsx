import React, { Component, ErrorInfo } from "react";

type Props = { children: JSX.Element };

type State = { hasError: boolean; errorMessage: string };

export default class ErrorBoundary extends Component<Props, State> {
  state = {
    hasError: false,
    errorMessage: "",
  };

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, errorMessage: error.message };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.log("에러 발생!");
    console.log("에러명 : ", error.name);
    console.log("에러 메세지 : ", error.message);
    console.log("컴포넌트 스택 : ", errorInfo.componentStack);
  }

  render() {
    if (this.state.hasError)
      return (
        <div>
          <h2>에러 발생</h2>
          <hr />
          <p>에러 메세지 : {this.state.errorMessage}</p>
        </div>
      );
    return this.props.children;
  }
}
