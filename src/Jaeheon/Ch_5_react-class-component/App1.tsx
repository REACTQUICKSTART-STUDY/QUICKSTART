import React, { Component } from "react";
import Clock from "./components/Clock";

type Props = {};

type State = {
  formatString: string;
  clockVisible: boolean;
};

export default class App1 extends Component<Props, State> {
  state = {
    formatString: "HH:mm:ss",
    clockVisible: false,
  };

  render() {
    return (
      <div style={{ border: "1px solid gray", padding: "5px", margin: "5px" }}>
        <h2>간단한 디지털 시계</h2>
        <button
          onClick={() =>
            this.setState({ clockVisible: !this.state.clockVisible })
          }
        >
          시계 토글하기
        </button>
        <hr />
        {this.state.clockVisible ? (
          <Clock formatString={this.state.formatString} />
        ) : (
          ""
        )}
      </div>
    );
  }
}
