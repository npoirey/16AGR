import MenuItem from 'material-ui/MenuItem'
import SelectField from 'material-ui/SelectField'
import React, { Component } from 'react'
import proptypes from '../../../core/proptypes/index'


class EnhancedTableFilterSelect extends Component {
  componentWillMount() {
    this.setState({ value: null })
  }

  handleChange = (event, index, value) => {
    this.setState({ value })
    this.props.changeFilter(this.props.name, value)
  }

  iconStyle = {
    padding: 0,
    width: '16px',
  }

  render() {
    const { label, values } = this.props
    return (<SelectField
      floatingLabelText={label}
      value={this.state.value}
      onChange={this.handleChange}
      fullWidth
      style={this.style}
      iconStyle={this.iconStyle}
    >
      {values.map((val) => <MenuItem key={val.key} value={val.value} primaryText={val.label} />)}
    </SelectField>)
  }
}


EnhancedTableFilterSelect.propTypes = {
  changeFilter: React.PropTypes.func.isRequired,
  label: React.PropTypes.string.isRequired,
  name: React.PropTypes.string.isRequired,
  values: React.PropTypes.arrayOf(proptypes.table.columnFilterSelectValue).isRequired,
}

export default EnhancedTableFilterSelect
