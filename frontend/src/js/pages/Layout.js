import React from "react";
import {Link} from "react-router";
import Footer from "../components/layout/Footer";
import Navbar from "../components/layout/Navbar/Navbar";
import Snackbar from "material-ui/Snackbar";

export default class Layout extends React.Component {
  render() {
    const {location} = this.props;
    const containerStyle = {
      marginTop: "60px"
    };
    const error = false;

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
