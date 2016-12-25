import React from "react";
import "./loader.scss";

export default class Loader extends React.Component {
  render() {
    const style = {
      margin: 0
    };

    return (
      <div class='row preloader-dots' style={this.props.noMargin && style}>
        <div class='dot'></div>
        <div class='dot'></div>
        <div class='dot'></div>
        <div class='dot'></div>
        <div class='dot'></div>
      </div>
    );
  }
}
