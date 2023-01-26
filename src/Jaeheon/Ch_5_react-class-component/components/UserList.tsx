import React, { Component } from "react";

type Props = {
  users: string[];
};

type State = {};

export default class UserList extends Component<Props, State> {
  state = {};

  render() {
    return (
      <ul>
        {this.props.users.map((userId) => (
          <li key={userId}>{userId}</li>
        ))}
      </ul>
    );
  }
}
