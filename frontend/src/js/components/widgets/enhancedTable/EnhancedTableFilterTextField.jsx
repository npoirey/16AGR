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
  changeFilter: React.PropTypes.func.isRequired,
  label: React.PropTypes.string.isRequired,
  name: React.PropTypes.string.isRequired,
}

export default EnhancedTableFilterTextField
