import SelectField from "material-ui/SelectField";
import MenuItem from "material-ui/MenuItem";
import React from "react";

export default class EnhancedTableFilterSelect extends React.Component {
  constructor() {
    super();
    this.state = {
      value: null,
    };
  }

  handleChange = (event, index, value) => {
    this.setState({value});
    this.props.changeFilter(this.props.name, value);
  };


  render() {
    const {label, values} = this.props;
    return (
      <SelectField
        floatingLabelText={label}
        floatingLabelFixed={false}
        value={this.state.value}
        onChange={this.handleChange}
        style={{width: '100%', paddingLeft: 0, paddingRight: '5px'}}
      >
        {values.map((val) => <MenuItem key={val.value} value={val.value} primaryText={val.label}/>)}
      </SelectField>
    );
  }
}

