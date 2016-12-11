import React from "react";
import {connect} from "react-redux";
import FlatButton from "material-ui/FlatButton";
import TextField from "material-ui/TextField";
import {login} from "../../../actions/userActions";

@connect()
export default class Login extends React.Component {

  submit(event) {
    event.preventDefault();
    this.props.dispatch(login(this.refs.email.getValue(), this.refs.password.getValue()));
  }

  render() {
    return (

      <form onSubmit={(event) => this.submit(event)}>
        <TextField
          ref="email" type="text" name="email"
          hintText="email"
          errorText=""
        />
        <TextField
          ref="password" type="password" name="password"
          hintText="password"
          errorText=""
        />
        <FlatButton label="Login" type="submit"/>
      </form>
    );
  }
}
