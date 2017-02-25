import React from 'react'
import { TableHeaderColumn } from 'material-ui/Table'
import EnhancedTableSortButton from './EnhancedTableSortButton'
import EnhancedTableFilterTextField from './EnhancedTableFilterTextField'
import EnhancedTableFilterSelect from './EnhancedTableFilterSelect'
import proptypes from '../../../core/proptypes/index'

const EnhancedTableHeaderColumn = ({ name, label, sort, sortable, filterable, changeFilter, changeSort, type, style }) => {
  let element = ''
  if (filterable) {
    switch (type) {
      case 'text':
        element = (<EnhancedTableFilterTextField
          name={name}
          label={label}
          changeFilter={changeFilter}
        />)
        break
      case 'boolean':
        element = (<EnhancedTableFilterSelect
          name={name}
          label={label}
          changeFilter={changeFilter}
          values={[{ value: null, label: '' }, {
            value: true,
            label: 'Yes',
          }, { value: false, label: 'No' }]}
        />)
        break
      default:
        throw new Error('bad type specified')
    }
  } else {
    element = <div>{label}</div>
  }

  return (
    <TableHeaderColumn style={style}>
      {element}
      {sortable && <EnhancedTableSortButton
        sort={sort}
        name={name}
        changeSort={changeSort}
      />
      }
    </TableHeaderColumn>
  )
}

EnhancedTableHeaderColumn.defaultProps = {
  changeFilter: () => {},
  changeSort: () => {},
  sort: {},
  sortable: false,
  filterable: false,
  style: {},
}

EnhancedTableHeaderColumn.propTypes = {
  changeFilter: React.PropTypes.func,
  changeSort: React.PropTypes.func,
  label: React.PropTypes.string.isRequired,
  name: React.PropTypes.string.isRequired,
  sort: proptypes.synthesisRequest.sort,
  sortable: React.PropTypes.bool,
  filterable: React.PropTypes.bool,
  type: proptypes.table.columnType.isRequired,
  style: React.PropTypes.object, // eslint-disable-line react/forbid-prop-types
}

export default EnhancedTableHeaderColumn
