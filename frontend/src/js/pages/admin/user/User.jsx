import { FormsyCheckbox, FormsyText } from 'formsy-material-ui'
import Formsy from 'formsy-react'
import { FlatButton, Paper, RaisedButton } from 'material-ui'
import React from 'react'
import { connect } from 'react-redux'
import { browserHistory, IndexLink } from 'react-router'
import { createUser } from '../../../actions/users/usersActions'

class User extends React.Component {
  static propTypes = {
    dispatch: React.PropTypes.func.isRequired,
  }

  componentWillMount() {
    this.setState({ buttonEnabled: false })
  }

  enableButton = () => {
    this.setState({ buttonEnabled: true })
  }

  disableButton = () => {
    this.setState({ buttonEnabled: false })
  }

  submit = (user) => {
    this.props.dispatch(createUser(user))
      .then(() => {
        browserHistory.push('/admin/users')
      })
  }

  render() {
    return (
      <Paper zDepth={1} style={{ padding: '1em' }}>
        <div className="row">
          <div className="col-xs-12">
            <h1>Create new user</h1>
          </div>
        </div>
        <div className="row">
          <Formsy.Form
            className="col-xs-12"
            onValid={this.enableButton}
            onInvalid={this.disableButton}
            onValidSubmit={this.submit}
          >
            <div className="row">
              <div className="col-xs-12">
                <FormsyText
                  type="email" name="email"
                  required
                  fullWidth
                  hintText="email"
                  floatingLabelText="email"
                />
                <FormsyText
                  type="text" name="callsign"
                  required
                  fullWidth
                  hintText="callsign"
                  floatingLabelText="callsign"
                />
                <FormsyText
                  type="password" name="password"
                  required
                  fullWidth
                  hintText="password"
                  floatingLabelText="password"
                />
                <FormsyText
                  type="password" name="passwordRepeat"
                  required
                  fullWidth
                  hintText="repeat password"
                  floatingLabelText="repeat password"
                />
                <FormsyCheckbox
                  name="admin"
                  label="is an admin"
                  style={{ marginTop: '1em' }}
                  className="start-xs"
                />
              </div>
            </div>
            <div className="row" style={{ marginTop: '1em' }}>
              <div className="col-xs-12">
                <IndexLink to="/admin/users">
                  <FlatButton
                    label="cancel"
                    icon={<i className="fa fa-cross" aria-hidden="true" />}
                  />
                </IndexLink>
                <RaisedButton
                  primary
                  label="Create this user" type="submit"
                  disabled={!this.state.buttonEnabled}
                />
              </div>
            </div>
          </Formsy.Form>
        </div>
      </Paper>
    )
  }
}

export default connect((store) => ({
  targetUser: store.users.targetUser,
  loading: true,
}))(User)
