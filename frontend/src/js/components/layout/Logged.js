import React from "react";
import {connect} from "react-redux";
import FlatButton from "material-ui/FlatButton";
import {logout} from "../../actions/userActions";

@connect()
export default class Login extends React.Component {

  submitLogout() {
    this.props.dispatch(logout());

  }

  render() {
    const {email} = this.props;
    return (
      <span>
        Welcome {email} <FlatButton label="Logout" onClick={() => this.submitLogout()}/>
      </span>
    );
  }
}
