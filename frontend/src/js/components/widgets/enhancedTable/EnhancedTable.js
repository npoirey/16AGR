import Checkbox from "material-ui/Checkbox";
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from "material-ui/Table";
import React from "react";
import Loader from "../../../components/widgets/loader/Loader";
import EnhancedTableHeaderColumn from "./EnhancedTableHeaderColumn";
import "./enhancedTable.scss";

export default class EnhancedTable extends React.Component {
  constructor() {
    super();
  };

  componentWillMount() {
    this.setState({
      request: this.props.initialRequest
    });
  }

  changeSort = (name) => {
    let order = 'ASC';
    if (name === this.state.request.sort.name && this.state.request.sort.order === 'ASC') {
      order = 'DESC';
    }

    const newRequest = {
      ...this.state.request,
      sort: {
        name: name,
        order: order
      }
    };
    this.changeRequest(newRequest);
  };

  changeFilter = (name, value) => {
    const newFilters = this.state.request.filters;
    let existingFilter = newFilters.find((filter) => filter.name === name);
    if (existingFilter) {
      if (value && value.length > 0) {
        existingFilter.pattern = value;
      } else {
        newFilters.splice(newFilters.findIndex((filter) => filter.name === name), 1);
      }
    } else {
      newFilters.push({
        name: name,
        pattern: value,
        type: 'contains'
      })
    }
    const newRequest = {
      ...this.state.request,
      filters: newFilters
    };
    this.changeRequest(newRequest);
  };

  changeFilterBoolean = (name, value) => {
    const newFilters = this.state.request.filters;
    let existingFilter = newFilters.find((filter) => filter.name === name);
    if (existingFilter) {
      if (value !== null) {
        existingFilter.pattern = value;
      } else {
        newFilters.splice(newFilters.findIndex((filter) => filter.name === name), 1);
      }
    } else if (value !== null) {
      newFilters.push({
        name: name,
        pattern: value,
        type: 'boolean'
      })
    }
    console.log('filters', newFilters);
    const newRequest = {
      ...this.state.request,
      filters: newFilters
    };
    this.changeRequest(newRequest);
  };

  changeRequest = (newRequest) => {
    this.props.onRequestChange(newRequest);
    this.setState({
      ...this.state,
      request: newRequest
    });
  };

  render() {
    const {data, loading, columns} = this.props;
    return (
      <div class="table-container">
        <Table >
          <TableHeader displaySelectAll={false}>
            <TableRow>
              {columns.map((column) => {
                const filterChange = column.type === 'boolean' ? this.changeFilterBoolean : this.changeFilter;
                return <EnhancedTableHeaderColumn name={column.name}
                                                  label={column.label}
                                                  type={column.type}
                                                  sortable={column.sortable}
                                                  filterable={column.filterable}
                                                  changeFilter={filterChange}
                                                  changeSort={this.changeSort}
                                                  sort={this.state.request.sort}
                                                  style={column.style}
                />
              })}
            </TableRow>
          </TableHeader>
          <TableBody
            displayRowCheckbox={true}
            deselectOnClickaway={true}
            showRowHover={true}
            stripedRows={true}>
            {!loading && data && data.map((row) => (
              <TableRow key={row.id} selected={row.selected}>
                {columns.map((column) => {
                  let columnContent;
                  switch (column.type) {
                    case 'boolean':
                      columnContent = <Checkbox defaultChecked={row[column.name]}
                                                disabled={true}/>;
                      break;
                    default:
                      columnContent = row[column.name];
                  }
                  return <TableRowColumn style={column.style}>{columnContent}</TableRowColumn>;
                })}
              </TableRow>
            ))}
          </TableBody>
        </Table>
        {!loading && (!data || data.length === 0) && <div>No results</div>}
        {loading && <Loader/>}
      </div>
    );
  }
}

