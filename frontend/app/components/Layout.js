import React from "react";

export default class Layout extends React.Component {
  constructor() {
    super();
    this.name = "Nicolas";
  }

  render() {
    return (
      <div className="App">
        <h1>THE NEW APP FROM {this.name}</h1>
      </div>
    )
  }
}
