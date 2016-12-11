import React from "react";
import {Link} from "react-router";
import Footer from "../components/layout/Footer";
import Navbar from "../components/layout/Navbar/Navbar";

export default class Layout extends React.Component {
  render() {
    const {location} = this.props;
    const containerStyle = {
      marginTop: "60px"
    };

    return (
      <div>
        <Navbar location={location}/>
        <div class="layout-container container" style={containerStyle}>
          <div class="row">
            <div class="col-lg-12">
              {this.props.children}
            </div>
          </div>
          <Footer/>
        </div>
      </div>

    );
  }
}
