import FlatButton from "material-ui/FlatButton";
import React from "react";

export default class EnhancedTableSortButton extends React.Component {
  constructor() {
    super();
    //todo check required props
  }

  render() {
    const {sort, name} = this.props;
    return (
      <FlatButton onClick={() => this.props.changeSort(this.props.name)} style={{width: '20%', minWidth: 'none'}}>
        {sort && sort.name === name && sort.order === 'ASC' &&
        <i class="fa fa-sort-asc"/>
        }
        {sort && sort.name === name && sort.order === 'DESC' &&
        <i class="fa fa-sort-desc"/>
        }
        {(sort && sort.name != name || !sort) &&
        <i class="fa fa-sort"/>
        }
      </FlatButton>
    );
  }
}

