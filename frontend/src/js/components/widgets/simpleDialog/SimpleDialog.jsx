import React from 'react'
import { Dialog, FlatButton } from 'material-ui'


class SimpleDialog extends React.Component {
  static propTypes = {
    onCancel: React.PropTypes.func.isRequired,
    onValidate: React.PropTypes.func.isRequired,
    title: React.PropTypes.string,
    text: React.PropTypes.string,
    cancelLabel: React.PropTypes.string,
    submitLabel: React.PropTypes.string,
    open: React.PropTypes.bool,
  }

  static defaultProps = {
    cancelLabel: 'Cancel',
    submitLabel: 'Submit',
    text: undefined,
    title: 'Are you sure ?',
    open: false,
  }

  render() {
    const { cancelLabel, submitLabel, title, text, open, onCancel, onValidate } = this.props

    const actions = [
      <FlatButton
        label={cancelLabel}
        primary
        onTouchTap={onCancel}
      />,
      <FlatButton
        label={submitLabel}
        primary
        keyboardFocused
        onTouchTap={onValidate}
      />,
    ]

    return (
      <Dialog
        title={title}
        actions={actions}
        modal={false}
        open={open}
        onRequestClose={onCancel}
      >
        {text}
      </Dialog>
    )
  }
}

export default SimpleDialog

