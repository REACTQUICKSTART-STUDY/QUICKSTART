import { Component } from "react";
import Clock from "./Clock";
import Chatting from "./Chatiing";

type State = {
  formatString: string;
  clockVisible: boolean;
};

export default class App extends Component<{}, State> {
  state = {
    formatString: "HH:mm:ss",
    clockVisible: false,
  };

  changeFormat = (format: string) => {
    this.setState({ formatString: format });
  };

  render() {
    return (
      <div className="boxStyle">
        <h2>간단한 디지털 시계</h2>{" "}
        <button
          onClick={() => {
            this.setState({ clockVisible: !this.state.clockVisible });
          }}
        >
          시계 토글하기
        </button>
        <hr />
        {this.state.clockVisible ? (
          <Clock formatString={this.state.formatString} />
        ) : (
          ""
        )}
        <Chatting></Chatting>
      </div>
    );
  }
}
