import FormsyText from "formsy-material-ui/lib/FormsyText";
import FlatButton from "material-ui/FlatButton";
import Paper from "material-ui/Paper";
import RaisedButton from "material-ui/RaisedButton";
import React from "react";
import {connect} from "react-redux";
import {login} from "../../actions/userActions";

@connect()
export default class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      canSubmit: false,
    };
  };

  componentWillMount() {

  }

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
      <Paper zDepth={1}
             class="login">
        <Formsy.Form
          onValid={this.enableButton}
          onInvalid={this.disableButton}
          onValidSubmit={this.submit}
        >
          <div class="col-xs-12 col-md-6 col-md-offset-3">
            <FormsyText
              ref="email" type="text" name="email"
              required
              fullWidth={true}
              hintText="email"
            />
          </div>
          <div class="col-xs-12 col-md-6 col-md-offset-3">
            <FormsyText
              ref="password" type="password" name="password"
              required
              fullWidth={true}
              hintText="password"
            />
          </div>
          <div class="col-xs-12 col-md-6 col-md-offset-3">
            <FlatButton
              primary={true}
              label="Reset password" type="submit"
              disabled={!this.state.canSubmit}
            />
            <RaisedButton
              primary={true}
              label="Login" type="submit"
              disabled={!this.state.canSubmit}
            />
          </div>
        </Formsy.Form>
      </Paper>
    );
  }
}
