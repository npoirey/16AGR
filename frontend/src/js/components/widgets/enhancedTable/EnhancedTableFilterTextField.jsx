import TextField from 'material-ui/TextField'
import React from 'react'

const EnhancedTableFilterTextField = ({ name, label, changeFilter }) => (
  <TextField
    floatingLabelText={label}
    onChange={(event) => changeFilter(name, event.target.value)}
    style={{ width: '80%', paddingLeft: 0, paddingRight: '5px' }}
  />
)

EnhancedTableFilterTextField.propTypes = {
  changeFilter: React.PropTypes.func,
  label: React.PropTypes.string,
  name: React.PropTypes.string,
}

export default EnhancedTableFilterTextField
