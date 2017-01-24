import Formsy from 'formsy-react'
import FormsyText from 'formsy-material-ui/lib/FormsyText'
import FlatButton from 'material-ui/FlatButton'
import Paper from 'material-ui/Paper'
import RaisedButton from 'material-ui/RaisedButton'
import React from 'react'
import { connect } from 'react-redux'
import { login } from '../../actions/user/userActions'
import './loggin.scss'

@connect()
class Login extends React.Component {
  constructor() {
    super()
    this.state = {
      canSubmit: false,
    }
  }

  componentWillMount() {

  }

  enableButton = () => {
    this.setState({
      canSubmit: true,
    })
  };

  disableButton = () => {
    this.setState({
      canSubmit: false,
    })
  };

  submit = (model) => {
    this.props.dispatch(login(model.email, model.password))
  };

  render() {
    return (
      <Paper
        zDepth={1}
        class="login"
      >
        <Formsy.Form
          onValid={this.enableButton}
          onInvalid={this.disableButton}
          onValidSubmit={this.submit}
        >
          <div className="col-xs-12 col-md-6 col-md-offset-3">
            <FormsyText
              type="text" name="email"
              required
              fullWidth
              hintText="email"
            />
          </div>
          <div className="col-xs-12 col-md-6 col-md-offset-3">
            <FormsyText
              type="password" name="password"
              required
              fullWidth
              hintText="password"
            />
          </div>
          <div className="col-xs-12 col-md-6 col-md-offset-3">
            <FlatButton
              primary
              label="Reset password" type="submit"
              disabled={!this.state.canSubmit}
            />
            <RaisedButton
              primary
              label="Login" type="submit"
              disabled={!this.state.canSubmit}
            />
          </div>
        </Formsy.Form>
      </Paper>
    )
  }
}

Login.propTypes = {
  dispatch: React.PropTypes.func,
}

export default Login
