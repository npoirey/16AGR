import Snackbar from "material-ui/Snackbar";
import React from "react";
import {connect} from "react-redux";
import {Link} from "react-router";
import Footer from "../components/layout/Footer";
import Navbar from "../components/layout/Navbar/Navbar";
import actions from "../actions/actionTypes";
import "../../style/core.scss";
import "./layout.scss";

@connect((store) => {
  return {
    error: store.alerts.error,
    success: store.alerts.success
  };
})
export default class Layout extends React.Component {

  handleRequestClose = () => {
    this.props.dispatch({type: actions.alerts.reset})
  };

  render() {
    const {location, error, success} = this.props;

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
          open={Boolean(success)}
          message={success}
          autoHideDuration={4000}
          onRequestClose={this.handleRequestClose}
        />
        <Snackbar
          open={Boolean(error)}
          message={error}
          autoHideDuration={4000}
          bodyStyle={{backgroundColor: '#850000'}}
          onRequestClose={this.handleRequestClose}
        />
      </div>
    );
  }
}
