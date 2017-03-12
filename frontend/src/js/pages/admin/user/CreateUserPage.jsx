import { FormsyCheckbox, FormsyText } from 'formsy-material-ui'
import Formsy from 'formsy-react'
import { FlatButton, Paper, RaisedButton, FontIcon } from 'material-ui'
import React from 'react'
import { connect } from 'react-redux'
import { browserHistory, IndexLink } from 'react-router'
import { createUser } from '../../../actions/users/usersActions'

class CreateUserPage extends React.Component {
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
        <div className="row create-user-title">
          <div className="col-xs-12">
            <h1>Create new user</h1>
          </div>
        </div>
        <div className="row">
          <Formsy.Form
            className="col-xs-12 create-user-form"
            onValid={this.enableButton}
            onInvalid={this.disableButton}
            onValidSubmit={this.submit}
          >
            <div className="row">
              <div className="col-xs-12">
                <FormsyText
                  hintText="email" floatingLabelText="email *"
                  name="email" type="email" required
                  validations="isEmail" validationError="This is not an email"
                  fullWidth
                />
                <FormsyText
                  hintText="callsign, 2 to 20 chars" floatingLabelText="callsign *"
                  name="callsign" type="text" required
                  validations="minLength:2,maxLength:20,isAlphanumeric" validationError="Should be between 2 and 20 characters"
                  fullWidth
                />
                <FormsyText
                  hintText="password, 8 to 30 chars" floatingLabelText="password *"
                  type="password" name="password" required
                  validations="minLength:8,maxLength:30" validationError="Should be between 8 and 30 characters"
                  fullWidth
                />
                <FormsyText
                  hintText="repeat your password" floatingLabelText="repeat password *"
                  type="password" name="passwordRepeat" required
                  validations="equalsField:password" validationError="Not equal to password"
                  fullWidth
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
              <div className="col-xs-12 create-user-form-actions">
                <IndexLink to="/admin/users" className="create-user-form-actions-cancel">
                  <FlatButton
                    label="cancel"
                    icon={<FontIcon className="material-icons">clear</FontIcon>}
                  />
                </IndexLink>
                <RaisedButton
                  primary
                  label="Create this user" type="submit"
                  className="create-user-form-actions-create"
                  disabled={!this.state.buttonEnabled}
                  icon={<FontIcon className="material-icons">done</FontIcon>}
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
  user: store.user.user,
}))(CreateUserPage)
