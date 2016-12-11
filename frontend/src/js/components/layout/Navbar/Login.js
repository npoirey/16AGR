import React from "react";
import {connect} from "react-redux";
import FlatButton from "material-ui/FlatButton";
import FormsyText from "formsy-material-ui/lib/FormsyText";
import {login} from "../../../actions/userActions";

@connect()
export default class Login extends React.Component {

  constructor() {
    super();
    this.state = {
      canSubmit: false,
    };
  };

  enableButton = () => {
    this.setState({
      canSubmit: true,
    });
  };

  disableButton = () => {
    this.setState({
      canSubmit: false,
    });
  };

  submit = () => {
    this.props.dispatch(login(this.refs.email.getValue(), this.refs.password.getValue()));
  };

  render() {
    return (
      <Formsy.Form
        onValid={this.enableButton}
        onInvalid={this.disableButton}
        onValidSubmit={this.submit}
      >
        <FormsyText
          ref="email" type="text" name="email"
          required
          hintText="email"
        />
        <FormsyText
          ref="password" type="password" name="password"
          required
          hintText="password"
        />
        <FlatButton label="Login" type="submit"
                    disabled={!this.state.canSubmit}
        />
      </Formsy.Form>
    );
  }
}
