import React, { Component } from "react";
import Chatting from "./components/Chatting";
import ErrorBoundary from "./components/ErrorBoundary";
import UserList from "./components/UserList";

type Props = {};

type State = {};

export default class App2 extends Component<Props, State> {
  state = {};

  render() {
    return (
      <ErrorBoundary>
        <div>
          참여 사용자 :
          <UserList users={["jhso", "yuricho"]} />
          <Chatting />
        </div>
      </ErrorBoundary>
    );
  }
}
