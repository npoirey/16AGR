import TextField from "material-ui/TextField";
import React from "react";

export default class EnhancedTableFilterTextField extends React.Component {
  constructor() {
    super();
  }

  render() {
    const {name, label} = this.props;
    return (
      <TextField
        floatingLabelText={label}
        onChange={(event) => this.props.changeFilter(name, event.target.value)}
        style={{width: '80%', paddingLeft: 0, paddingRight: '5px'}}
      />
    );
  }
}

