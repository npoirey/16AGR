import MenuItem from 'material-ui/MenuItem'
import SelectField from 'material-ui/SelectField'
import React from 'react'
import proptypes from '../../../core/proptypes/index'


const EnhancedTableFilterSelect = ({ changeFilter, name, label, values }) => (
  <SelectField
    floatingLabelText={label}
    floatingLabelFixed={false}
    onChange={(event, index, value) => changeFilter(name, value)}
    style={{ width: '100%', paddingLeft: 0, paddingRight: '5px' }}
  >
    {values.map(val => <MenuItem key={val.value} value={val.value} primaryText={val.label} />)}
  </SelectField>
)

EnhancedTableFilterSelect.propTypes = {
  changeFilter: React.PropTypes.func,
  label: React.PropTypes.string,
  name: React.PropTypes.string,
  values: React.PropTypes.arrayOf(proptypes.table.columnFilterSelectValue),
}

export default EnhancedTableFilterSelect
