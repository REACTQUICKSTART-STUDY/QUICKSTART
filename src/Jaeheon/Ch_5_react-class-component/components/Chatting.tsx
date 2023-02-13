import React, { ChangeEvent, Component, KeyboardEvent } from "react";

type Props = {};

type State = {
  msg: string;
  msgList: string[];
};

export default class Chatting extends Component<Props, State> {
  chatRef = React.createRef<HTMLDivElement>();
  state = {
    msg: "",
    msgList: [],
  };

  getSnapshotBeforeUpdate(prevProps: {}, prevState: State): number {
    const chat = this.chatRef.current;
    if (prevState.msgList !== this.state.msgList && chat !== null)
      return chat.offsetHeight;
    return 0;
  }

  componentDidUpdate(prevProps: {}, prevState: State, snapshot: number) {
    const chat = this.chatRef.current;
    if (snapshot > 0 && chat !== null)
      chat.scrollTop = chat.scrollHeight - snapshot;
  }

  setMsg = (e: ChangeEvent<HTMLInputElement>) => {
    this.setState({ ...this.state, msg: e.target.value });
  };

  msgKeyup = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter")
      this.setState({
        msg: "",
        msgList: [...this.state.msgList, this.state.msg],
      });
  };

  render() {
    return (
      <div>
        채팅 목록 : <br />
        <div
          ref={this.chatRef}
          style={{
            width: 400,
            height: 120,
            overflow: "auto",
            border: "1px solid black",
          }}
        >
          {this.state.msgList.map((item, index) => (
            <h2 key={index}>{item}</h2>
          ))}
        </div>
        입력 메세지 :{" "}
        <input
          type="text"
          value={this.state.msg}
          onChange={this.setMsg}
          onKeyUp={this.msgKeyup}
        />
      </div>
    );
  }
}
