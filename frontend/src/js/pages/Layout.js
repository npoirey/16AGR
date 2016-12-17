import Snackbar from "material-ui/Snackbar";
import React from "react";
import {Link} from "react-router";
import Footer from "../components/layout/Footer";
import Navbar from "../components/layout/Navbar/Navbar";
import "../../style/core.scss";
import "./layout.scss";

export default class Layout extends React.Component {
  render() {
    const {location} = this.props;
    const error = false;

    return (
      <div>
        <Navbar location={location}/>
        <div class="row layout-container">
          <div class="col-xs-12
             col-sm-10 col-sm-offset-1
             col-md-8 col-md-offset-2
             center-xs">
            {this.props.children}
          </div>
        </div>
        <div class="row">
          <Footer/>
        </div>
        <Snackbar
          open={Boolean(error)}
          message={error && Boolean(error.message) && error.message || 'Something went wrong'}
          autoHideDuration={4000}
          onRequestClose={this.handleRequestClose}
        />
      </div>

    );
  }
}
