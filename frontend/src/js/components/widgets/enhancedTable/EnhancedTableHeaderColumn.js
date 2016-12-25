import EnhancedTableSortButton from "./EnhancedTableSortButton";
import EnhancedTableFilterTextField from "./EnhancedTableFilterTextField";
import EnhancedTableFilterSelect from "./EnhancedTableFilterSelect";
import React from "react";
import {TableHeaderColumn} from "material-ui/Table";

export default class EnhancedTableHeaderColumn extends React.Component {
  constructor() {
    super();
  }

  render() {
    const {name, label, sort, sortable, filterable, changeFilter, changeSort, type} = this.props;
    let element = '';
    if (filterable) {
      switch (type) {
        case 'text':
          element = <EnhancedTableFilterTextField name={name}
                                                  label={label}
                                                  changeFilter={changeFilter}
          />;
          break;
        case 'boolean':
          element = <EnhancedTableFilterSelect name={name}
                                               label={label}
                                               changeFilter={changeFilter}
                                               values={[{value: null, label: ''}, {
                                                 value: true,
                                                 label: 'Yes'
                                               }, {value: false, label: 'No'}]}
          />;
          break;
        default:
          throw 'bad type specified'
      }
    } else {
      element = <div>{label}</div>
    }

    return (
      <TableHeaderColumn style={this.props && this.props.style}>
        {element}
        {sortable && <EnhancedTableSortButton sort={sort}
                                              name={name}
                                              changeSort={changeSort}
        />
        }
      </TableHeaderColumn>
    );
  }
}

