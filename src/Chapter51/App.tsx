import React, { Component } from "react";
// import Clock from './Clock'
import Chatting from "./Chatting";
import ErrorBoundary from "./ErrorBoundary";
import UserList from "./UserList";

// type State = {
//   formatString: string
//   clockVisible: boolean
// }

export default class App extends Component<{}, {}> {
  // state = {}
  // state = {
  //   // HH : mm : ss
  //   // H시 m분 s초
  //   formatString: "HH:mm:ss",
  //   clockVisible: false
  // }

  // changeFormat = (format: string) => {
  //   this.setState({ formatString: format })
  // }

  render() {
    return (
      // <div className="boxStyle">
      //   <h2>간단한 디지털 시계</h2>
      //   <button onClick={() => this.setState({ clockVisible: !this.state.clockVisible})}>
      //     시계 토글하기</button>
      //   <hr />
      //   {this.state.clockVisible ? <Clock formatString={this.state.formatString} /> : ""}
      // </div>
      <ErrorBoundary>
        <div>
          참여 사용자 :
          <UserList users={["hsbae", "mrlee"]} />
          <hr />
          <Chatting />
        </div>
      </ErrorBoundary>
    );
  }
}
