import Checkbox from 'material-ui/Checkbox'
import { Table, TableBody, TableHeader, TableRow, TableRowColumn } from 'material-ui/Table'
import React from 'react'
import Loader from '../loader/Loader'
import EnhancedTableHeaderColumn from './EnhancedTableHeaderColumn'
import './enhancedTable.scss'
import proptypes from '../../../core/proptypes/index'


class EnhancedTable extends React.Component {

  componentWillMount() {
    this.setState({
      request: this.props.initialRequest,
    })
  }

  changeSort = (name) => {
    const order = (name === this.state.request.sort.name && this.state.request.sort.order === 'ASC') ? 'DESC' : 'ASC'

    const newRequest = {
      ...this.state.request,
      sort: {
        name,
        order,
      },
    }
    this.changeRequest(newRequest)
  };

  changeFilter = (name, value) => {
    const newFilters = this.state.request.filters
    const existingFilter = newFilters.find(filter => filter.name === name)
    if (existingFilter) {
      if (value && value.length > 0) {
        existingFilter.pattern = value
      } else {
        newFilters.splice(newFilters.findIndex(filter => filter.name === name), 1)
      }
    } else {
      newFilters.push({
        name,
        pattern: value,
        type: 'contains',
      })
    }
    const newRequest = {
      ...this.state.request,
      filters: newFilters,
    }
    this.changeRequest(newRequest)
  };

  changeFilterBoolean = (name, value) => {
    const newFilters = this.state.request.filters
    const existingFilter = newFilters.find(filter => filter.name === name)
    if (existingFilter) {
      if (value !== null) {
        existingFilter.pattern = value
      } else {
        newFilters.splice(newFilters.findIndex(filter => filter.name === name), 1)
      }
    } else if (value !== null) {
      newFilters.push({
        name,
        pattern: value,
        type: 'boolean',
      })
    }
    const newRequest = {
      ...this.state.request,
      filters: newFilters,
    }
    this.changeRequest(newRequest)
  };

  changeRequest = (newRequest) => {
    this.props.onRequestChange(newRequest)
    this.setState({
      ...this.state,
      request: newRequest,
    })
  };

  render() {
    const { data, loading, columns } = this.props
    return (
      <div className="table-container">
        <Table >
          <TableHeader displaySelectAll={false}>
            <TableRow>
              {columns.map((column) => {
                const filterChange = column.type === 'boolean' ? this.changeFilterBoolean : this.changeFilter
                return (<EnhancedTableHeaderColumn
                  key={column.name}
                  name={column.name}
                  label={column.label}
                  type={column.type}
                  sortable={column.sortable}
                  filterable={column.filterable}
                  changeFilter={filterChange}
                  changeSort={this.changeSort}
                  sort={this.state.request.sort}
                  style={column.style}
                />)
              })}
            </TableRow>
          </TableHeader>
          <TableBody
            displayRowCheckbox
            deselectOnClickaway
            showRowHover
            stripedRows
          >
            {!loading && data && data.map(row => (
              <TableRow key={row.id} selected={row.selected}>
                {columns.map((column) => {
                  let columnContent
                  switch (column.type) {
                    case 'boolean':
                      columnContent = (<Checkbox
                        defaultChecked={row[column.name]}
                        disabled
                      />)
                      break
                    default:
                      columnContent = row[column.name]
                  }
                  return (<TableRowColumn
                    key={column.name}
                    style={column.style}
                  >
                    {columnContent}
                  </TableRowColumn>)
                })}
              </TableRow>
            ))}
          </TableBody>
        </Table>
        {!loading && (!data || data.length === 0) && <div>No results</div>}
        {loading && <Loader />}
      </div>
    )
  }
}

EnhancedTable.propTypes = {
  initialRequest: proptypes.synthesisRequest.request,
  onRequestChange: React.PropTypes.func,
  data: React.PropTypes.arrayOf(React.PropTypes.any),
  loading: React.PropTypes.bool,
  columns: React.PropTypes.arrayOf(proptypes.table.column),
}

export default EnhancedTable
